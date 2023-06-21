import classes from './ClusterPage.module.css';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import DountChart from "./DountChart.js";

const ProfileForm = () => {

  const { kakao } = window;
  const [uniqueTextsCount, setUniqueTextsCount] = useState(0);

  useEffect(() => {
    var mapContainer = document.getElementById('map'),
      mapOption = {
        center: new kakao.maps.LatLng(37.566830959632526, 126.97864942713029),
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

      //지역들 이름 추출 후 저장
      const getData = () => {

        axios.get("http://localhost:8080/gps/mark", {
          params: {
            userId: localStorage.getItem('userId')
          }
        }).then((response) => {
          const parsedGps = response.data;
          const uniqueTexts = new Set();

          for (var i = 0; i < parsedGps.length; i++) {
            let lat = parsedGps[i].latitude,
              lon = parsedGps[i].longitude,
              text = parsedGps[i].text;

            if (!uniqueTexts.has(text)) {
              let locPosition = new kakao.maps.LatLng(lat, lon);
              console.log(text);
              displayMarker(locPosition, parsedGps[i].text);
              uniqueTexts.add(text);
            }
          } setUniqueTextsCount(uniqueTexts.size);
        })
      }; getData()


    });
  });

  const MarkSwitchBtn = () => {
    window.location.replace('/CurrentLocation')
  }
  const FillBtn = () => {
    window.location.replace('/ColoringMap')
  }

  return (
    <div>
      <div className={classes.headerSpacer}></div>
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
      </button><div className={classes.percent}>
        <DountChart color="#f62459" percent={(uniqueTextsCount / 500)} size="65px" /></div>
      {/* 원래 5056개임 */}
    </div>
  )
}

export default ProfileForm;