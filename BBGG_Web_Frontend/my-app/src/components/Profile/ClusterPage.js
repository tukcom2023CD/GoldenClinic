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

    var clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 10,
    });

    navigator.geolocation.getCurrentPosition(function () {

      function displayMarker(locPosition) {

        var marker = new kakao.maps.Marker({
          map: map,
          position: locPosition
        });

        var markers = [];

        markers.push(marker);
        clusterer.addMarkers(markers);

        map.setCenter(locPosition);
      };

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
    });
  });

  const MarkSwitchBtn = () => {
    window.location.replace('/KakaoMap')
  }
  const FillBtn = () => {
    window.location.replace('/Profile')
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
      <button className={classes.top_side_btn} onClick={FillBtn}>
        색칠하기로 보기
      </button>
    </div>
  )
}

export default ProfileForm;