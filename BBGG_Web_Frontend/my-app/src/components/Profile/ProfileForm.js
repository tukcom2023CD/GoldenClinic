import classes from './ProfileForm.module.css';
import axios from "axios";
import React, { useEffect } from 'react';

const ProfileForm = () => {

  const { kakao } = window;

  useEffect(() => {

    let mapContainer = document.getElementById('map'),
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 13
      };
    let map = new kakao.maps.Map(mapContainer, mapOption);
    let mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    /*
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude,
        lon = position.coords.longitude;

      if (navigator.geolocation) {

        let locPosition = new kakao.maps.LatLng(lat, lon),
          message = '<div style="padding:5px;"></div>';
        displayMarker(locPosition, message);

      } else {
        let locPosition2 = new kakao.maps.LatLng(33.450701, 126.570667),
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

            let lat = parsedGps[i].latitude,
              lon = parsedGps[i].longitude;

            let locPosition = new kakao.maps.LatLng(lat, lon);

            displayMarker(locPosition, parsedGps[i].text);
          }


        })
      };
      getData();

      function displayMarker(locPosition, message) {

        let marker = new kakao.maps.Marker({
          map: map,
          position: locPosition
        });

        let iwContent = message;

        let infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });

        infowindow.close(map, marker);

        map.setCenter(locPosition);
      }
    });*/
      let geocoder = new kakao.maps.services.Geocoder();
      // 위도, 경도 값을 설정합니다.
      let lat = 37.566826;
      let lng = 126.9786567;

      /*geocoder.coord2RegionCode(lng, lat, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
              // 검색 결과에서 지번 주소를 가져옵니다.
              console.log(result[0].address_name)

              // 지번 주소에서 법정동/법정리 정보를 가져옵니다.
              let lawdCd = result[0].region_3depth_name+result[0];
                console.log(result[0].region_4depth_name)
                console.log(result[0].code)

              // 법정동/법정리에서 행정동 정보를 가져옵니다.
              let hCode = "";
              axios
                  .get("https://dapi.kakao.com/v2/local/search/area.json", {
                      params: {
                          query: result[0].region_1depth_name,
                          category_group_code: "HDNG",
                      },
                      headers: {
                          Authorization: "4578710e724f75ae007457b63f65e9ac",
                      },
                  })
                  .then(function (response) {
                      if (response.data.documents.length > 0) {
                          hCode = response.data.documents[0].code;
                      }

                      // 행정동에서 행정구역 정보를 가져옵니다.
                      var guCode = "";
                      axios
                          .get(
                              "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json",
                              {
                                  params: {
                                      x: lng,
                                      y: lat,
                                      input_coord: "WGS84",
                                      output_coord: "WGS84",
                                      codes: hCode,
                                  },
                                  headers: {
                                      Authorization: "4578710e724f75ae007457b63f65e9ac",
                                  },
                              }
                          )
                          .then(function (response) {
                              if (response.data.documents.length > 0) {
                                  guCode = response.data.documents[0].code.substring(0, 5);
                              }

                              // 행정구역에서 경계 좌표를 가져옵니다.
                              axios
                                  .get(
                                      "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json",
                                      {
                                          params: {
                                              id: guCode,
                                              output: "json",
                                              appkey: "4578710e724f75ae007457b63f65e9ac",
                                          },
                                          headers: {
                                              Authorization: "4578710e724f75ae007457b63f65e9ac",
                                          },
                                      }
                                  )
                                  .then(function (response) {
                                      // 경계 좌표를 파싱하여 배열 형태로 저장합니다.
                                      var coordinates = response.data.features[0].geometry
                                          .coordinates;
                                      var boundaryCoords = [];
                                      for (var i = 0; i < coordinates.length; i++) {
                                          for (var j = 0; j < coordinates[i].length; j++) {
                                              var coords = coordinates[i][j];
                                              var lngLat = new kakao.maps.LatLng(coords[1], coords[0]);
                                              boundaryCoords.push(lngLat);
                                          }
                                      }

                                      // 경계를 지도에 그립니다.
                                      var boundary = new kakao.maps.Polygon({
                                          map: map,
                                          path: boundaryCoords,
                                          strokeWeight: 2,
                                          strokeColor: "#FF0000",
                                          ColorOpacity: 0.7,
                                          fillColor: "#FF0000",
                                          fillOpacity: 0.3,
                                      });
                                  });
                          });
                  });
          }
      });*/

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