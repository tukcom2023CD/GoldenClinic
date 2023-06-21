import classes from "./ColoringMap.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DountChart from "./DountChart.js";

const ProfileForm = () => {
  const { kakao } = window;
  const [uniqueTextsCount, setUniqueTextsCount] = useState(0);

  useEffect(() => {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(37.45277794033423, 126.92151996899025),
        level: 9,
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    var markers = []; //폴리곤 중첩 방지 위한 선언

    navigator.geolocation.getCurrentPosition(function () {
      //지역들 이름 추출 후 저장
      const getData = () => {
        axios
          .get("http://localhost:8080/gps/visited_place", {
            params: {
              userId: localStorage.getItem("userId"),
            },
          })
          .then((response) => {
            const parsedGps = response.data;
            const uniqueTexts = new Set();

            for (var i = 0; i < parsedGps.length; i++) {
              let text = parsedGps[i];

              if (!uniqueTexts.has(text)) {
                console.log(text);
                getColoring(text);
                //displayMarker(locPosition, parsedGps[i].text);
                uniqueTexts.add(text);
              }
            }
            setUniqueTextsCount(uniqueTexts.size);
          });
      };
      getData();

      const getColoring = (text) => {
        //폴리곤 중첩 방지 위해
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];

        const encodedText = encodeURIComponent(text);

        axios
          .get(
            `http://localhost:8080/api/vworld/req/data?parameter1=${encodedText}`,
            {}
          )
          .then((vword) => {
            const coordinates =
              vword.data.response.result.featureCollection.features[0].geometry
                .coordinates[0][0];
            const points = [];
            for (let i = 0; i < coordinates.length; i++) {
              const lat = coordinates[i][1];
              const lng = coordinates[i][0];
              points.push(new kakao.maps.LatLng(lat, lng));
            }
            const polygon = new kakao.maps.Polygon({
              map: map,
              path: points,
              strokeWeight: 2,
              strokeColor: "#00509c",
              strokeOpacity: 0.8,
              fillColor: "#feffe8",
              fillOpacity: 0.7,
            });
            // 지도에 다각형을 표시합니다
            polygon.setMap(map);
          });
      };
    });
  });

  const MarkSwitchBtn = () => {
    window.location.replace("/CurrentLocation");
  };
  const ClusterSwitchBtn = () => {
    window.location.replace("/Cluster");
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
      <button className={classes.top_btn} onClick={MarkSwitchBtn}>
        현재 위치 보기
      </button>
      <button className={classes.top_side_btn} onClick={ClusterSwitchBtn}>
        클러스터로 보기
      </button>
      <div className={classes.percent}>
        <DountChart
          color="#f62459"
          percent={uniqueTextsCount / 5065}
          size="65px"
        />
      </div>
    </div>
  );
};

export default ProfileForm;
