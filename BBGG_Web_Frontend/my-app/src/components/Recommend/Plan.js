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
      </form>
    </div>
  );
};

export default Plan;
