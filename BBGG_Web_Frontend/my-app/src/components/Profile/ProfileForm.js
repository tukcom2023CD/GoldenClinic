import classes from './ProfileForm.module.css';
import axios from "axios";
import React, { useEffect } from 'react';

const ProfileForm = () => {

  const { kakao } = window;

  useEffect(() => {

    var mapContainer = document.getElementById('map'),
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 13
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude,
        lon = position.coords.longitude;

      if (navigator.geolocation) {

        var locPosition = new kakao.maps.LatLng(lat, lon),
          message = '<div style="padding:5px;"></div>';
        displayMarker(locPosition, message);

      } else {
        var locPosition2 = new kakao.maps.LatLng(33.450701, 126.570667),
          message2 = 'geolocation을 사용할 수 없어용'

        displayMarker(locPosition2, message2);
      }

      const getData = () => {

        axios.get("http://localhost:8080/gps/mark", {
          params: {
            userId: localStorage.getItem('userId')
          }
        }).then((response) => {
          const gpsJson = JSON.stringify(response.data)
          const parsedGps = JSON.parse(gpsJson);
          console.log(gpsJson)

          for (var i = 0; i < parsedGps.length; i++) {

            var lat = parsedGps[i].latitude,
              lon = parsedGps[i].longitude;

            var locPosition = new kakao.maps.LatLng(lat, lon);

            displayMarker(locPosition, parsedGps[i].text);
          }


        })
      };
      getData();

      function displayMarker(locPosition, message) {

        var marker = new kakao.maps.Marker({
          map: map,
          position: locPosition
        });

        var iwContent = message;

        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });

        infowindow.close(map, marker);

        map.setCenter(locPosition);
      }
    });
  });

  const MarkSwitchBtn = () => {
    window.location.replace('/KakaoMap')
  }

  return (
    <div>
      <div id="map"
        style={{
          width: "100%",
          height: '700px'
        }}>
      </div><button className={classes.top_btn} onClick={MarkSwitchBtn}>
        현재 위치 보기
      </button>
    </div>
  )
}

export default ProfileForm;