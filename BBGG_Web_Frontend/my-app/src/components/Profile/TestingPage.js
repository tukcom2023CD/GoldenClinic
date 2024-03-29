import classes from './ColoringMap.module.css';
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


        // 지도에 클릭 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

            // 클릭한 위도, 경도 정보를 가져옵니다 
            var latlng = mouseEvent.latLng;

            var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';

            var resultDiv = document.getElementById('resultDiv');
            resultDiv.innerHTML = message;

            //위도 경도 이름 아이디 DB로 전송
            const GpsSave = () => {
                axios.post("http://localhost:8080/gps/save", {
                    latitude: latlng.getLat(),
                    longitude: latlng.getLng(),
                    text: localStorage.getItem('userName'),
                    userId: localStorage.getItem('userId')
                }).then(function () {
                    alert("클릭으로 현재 위치가 기록되었습니다.");
                    window.location.replace('/Testing');
                }).catch(function (error) {
                    console.log(error);
                });
            }; GpsSave()
        });




        navigator.geolocation.getCurrentPosition(function () {

            function displayMarker(locPosition) {

                var marker = new kakao.maps.Marker({
                    map: map,
                    position: locPosition
                });

                var markers = [];

                markers.push(marker);

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
                            getColoring(text);
                            displayMarker(locPosition, parsedGps[i].text);
                            uniqueTexts.add(text);
                        }

                    } setUniqueTextsCount(uniqueTexts.size);
                })
            }; getData()

            const getColoring = (text) => {
                const encodedText = encodeURIComponent(text);

                axios.get(`http://localhost:8080/api/vworld/req/data?parameter1=${encodedText}`, {

                }).then((vword) => {
                    const coordinates = vword.data.response.result.featureCollection.features[0].geometry.coordinates[0][0];
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
                        fillOpacity: 0.7
                    });
                    // 지도에 다각형을 표시합니다
                    polygon.setMap(map);
                });
            };


        });


    });

    const MarkSwitchBtn = () => {
        window.location.replace('/CurrentLocation')
    }
    const ClusterSwitchBtn = () => {
        window.location.replace('/Cluster')
    }

    return (
        <div>
            <div id="map"
                style={{
                    width: "100%",
                    height: '700px'
                }}>
            </div><button className={classes.top_btn} onClick={MarkSwitchBtn}>
                여긴 테스팅 페이지입니다
            </button>
            <button className={classes.top_side_btn} onClick={ClusterSwitchBtn}>
                여긴 테스팅 페이지입니다
            </button>
            <div id='resultDiv'>지도를 클릭하세요</div>
            <div className={classes.percent}>
                <DountChart color="#f62459" percent={uniqueTextsCount / 5065} size="65px" /></div>
        </div>
    )
}

export default ProfileForm;