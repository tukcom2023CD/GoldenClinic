import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const Plan = () => {
  const { kakao } = window;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    mapContainer.style.width = "100%";
    mapContainer.style.height = "700px";

    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      if (navigator.geolocation) {
        const locPosition = new kakao.maps.LatLng(lat, lon);
        const message = '<div style="padding:5px;"></div>';
        displayMarker(locPosition, message, "Current Location");
      } else {
        const locPosition2 = new kakao.maps.LatLng(33.450701, 126.570667);
        const message2 = "geolocation을 사용할 수 없어용";
        displayMarker(locPosition2, message2);
      }

      const getData = async () => {
        try {
          const response = await axios.get("http://localhost:8080/bbgg/pp", {
            params: {
              dong: localStorage.getItem("placeplan"),
              userId: localStorage.getItem("userId"),
            },
          });
          const parsedGps = response.data;
          parsedGps.forEach((gps) => {
            const locPosition = new kakao.maps.LatLng(gps.longitude, gps.lat);
            displayMarker(locPosition, "", gps.placeName);
          });
        } catch (error) {
          console.log(error);
        }
      };
      getData();

      const saveCoordinates = (lat, lon, key) => {
        const coordinates = { lat, lon };
        localStorage.setItem(key, JSON.stringify(coordinates));
      };

      function displayMarker(locPosition, message, placeName) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
        });

        const content =
          '<div class="customoverlay">' +
          '    <div class="title">' +
          placeName +
          '    <div class="close" onclick="closeOverlay()" title="닫기">x</div>' +
          "  </div>" +
          '  <a href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=' +
          placeName +
          'target="_blank">' +
          '    <span class="title">' +
          placeName +
          "</span>" +
          " </a>" +
          '<div class="button">' +
          '<button id="startButton">출발지 설정</button>' +
          '<button id="destiButton">목적지 설정</button>' +
          "</div>";

        const infowindow = new kakao.maps.InfoWindow({
          content: content,
        });

        kakao.maps.event.addListener(marker, "click", function () {
          infowindow.open(map, marker);
          const closeButton = document.querySelector(".customoverlay .close");
          closeButton.addEventListener("click", function () {
            infowindow.close();
          });

          document
            .getElementById("startButton")
            .addEventListener("click", function () {
              saveCoordinates(
                locPosition.getLat(),
                locPosition.getLng(),
                "start"
              );
              alert(`출발지가 설정되었습니다!`);
            });
          document
            .getElementById("destiButton")
            .addEventListener("click", function () {
              saveCoordinates(
                locPosition.getLat(),
                locPosition.getLng(),
                "desti"
              );
              alert(`목적지가 설정되었습니다!`);
            });
        });

        map.setCenter(locPosition);
      }
    });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(inputValue, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const lat = result[0].y;
          const lon = result[0].x;
          const locPosition = new kakao.maps.LatLng(lat, lon);
          //saveCoordinates(lat, lon, "customMarker");
          // displayMarker(locPosition, "", inputValue);
        } else {
          console.log("Geocoding failed: " + status);
        }
      });
    }
  };

  const handleFindShortestPath = async () => {
    try {
      const REST_API_KEY = "e40b35dcd31ca39d7233a07618a1aae2"; // 카카오디벨로퍼스에서 발급 받은 API 키 값
      const getData = async () => {
        try {
          const response = await axios.get("http://localhost:8080/bbgg/pp", {
            params: {
              dong: localStorage.getItem("placeplan"),
              userId: localStorage.getItem("userId"),
            },
          });
          const parsedGps = response.data;
          return parsedGps.map((gps) => ({
            name: gps.placeName,
            x: gps.lat,
            y: gps.longitude,
          }));
        } catch (error) {
          console.log(error);
          return [];
        }
      };

      const waypoints = await getData();
      const data = {
        origin: {
          x: "127.11024293202674",
          y: "37.394348634049784",
        },
        destination: {
          x: "127.10860518470294",
          y: "37.401999820065534",
        },
        waypoints: waypoints,
        priority: "RECOMMEND",
        car_fuel: "GASOLINE",
        car_hipass: false,
        alternatives: false,
        road_details: false,
      };

      const response = await axios.post(
        "https://apis-navi.kakaomobility.com/v1/waypoints/directions",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `KakaoAK ${REST_API_KEY}`,
          },
        }
      );

      console.log(response.data); // 응답 데이터 처리 예시

      // TODO: 응답 데이터를 상태로 저장하거나 필요한 작업을 수행
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        id="map"
        style={{
          width: "100%",
          height: "700px",
        }}
      ></div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a location"
        />
        <button type="submit">Add Marker</button>
        <button onClick={handleFindShortestPath}>최단경로 찾기</button>
      </form>
    </div>
  );
};

export default Plan;
