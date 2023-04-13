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

        var markers = []; //폴리곤 중첩 방지 위한 선언

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
                
                //폴리곤 중첩 방지 위해
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                markers = [];

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
                현재 위치 보기
            </button>
            <button className={classes.top_side_btn} onClick={ClusterSwitchBtn}>
                클러스터로 보기
            </button>
            <div className={classes.percent}>몇퍼</div>
        </div>
    )
}

export default ProfileForm;