import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const Plan = () => {
  const { kakao } = window;
  const [inputValue, setInputValue] = useState("");
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  useEffect(() => {
    console.log("map load");
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    mapContainer.style.width = "1200px";
    mapContainer.style.height = "800px";

    map.relayout();

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

      const getData = () => {
        axios
          .get("http://localhost:8080/bbgg/pp", {
            params: {
              dong: localStorage.getItem("placeplan"),
              userId: localStorage.getItem("userId"),
            },
          })
          .then((response) => {
            const gpsJson = JSON.stringify(response.data);
            const parsedGps = JSON.parse(gpsJson);
            console.log(gpsJson);

            parsedGps.forEach((gps) => {
              const locPosition = new kakao.maps.LatLng(gps.lat, gps.longitude);
              displayMarker(locPosition, "", gps.placeName);
            });
          });
      };
      getData();

      function displayMarker(locPosition, message, placeName) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
        });

        const content =
          '<div class="customoverlay">' +
          '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
          '    <span class="title">' +
          placeName +
          "</span>" +
          "  </a>" +
          "</div>";

        const infowindow = new kakao.maps.InfoWindow({
          content: content,
        });

        kakao.maps.event.addListener(marker, "click", function () {
          infowindow.open(map, marker);
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

          //displayMarker(locPosition, "", inputValue);
          //mapRef.current.relayout();
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
