import classes from './ColoringMap.module.css';
import axios from "axios";
import React, { useEffect } from 'react';

const ProfileForm = () => {

    const { kakao } = window;

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

                    for (var i = 0; i < parsedGps.length; i++) {
                        let lat = parsedGps[i].latitude,
                            lon = parsedGps[i].longitude,
                            text = parsedGps[i].text;

                        let locPosition = new kakao.maps.LatLng(lat, lon);
                        console.log(text);
                        getColoring(text);
                        displayMarker(locPosition, parsedGps[i].text);

                    }
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
                        fillColor: "#f0e9d3",
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
        </div>
    )
}

export default ProfileForm;