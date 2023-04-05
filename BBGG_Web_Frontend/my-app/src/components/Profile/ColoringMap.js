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

        navigator.geolocation.getCurrentPosition(function () {

            const getData = () => {
                axios.get("http://localhost:8080/api/vworld/req/data?parameter1=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%9C%EC%B4%88%EA%B5%AC%20%EC%84%9C%EC%B4%88%EB%8F%99", {
                    params: {
                        dong: "서울특별시 서초구 서초동"
                    }
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
                        strokeColor: "#004c80",
                        strokeOpacity: 0.8,
                        fillColor: "#fff8e1",
                        fillOpacity: 0.7
                    });
                    // 지도에 다각형을 표시합니다
                    polygon.setMap(map);
                })
            };
            getData();
        });

        // // 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다
        // var polygonPath = [
        //   new kakao.maps.LatLng(37.32912247557823, 126.67091174887754),
        //   new kakao.maps.LatLng(37.30350064095492, 126.82478476872446),
        //   new kakao.maps.LatLng(37.40152337758723, 126.8187742026357),
        // ];

        // // 지도에 표시할 다각형을 생성합니다
        // var polygon = new kakao.maps.Polygon({
        //   path: polygonPath, // 그려질 다각형의 좌표 배열입니다
        //   strokeWeight: 3, // 선의 두께입니다
        //   strokeColor: '#39DE2A', // 선의 색깔입니다
        //   strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        //   strokeStyle: 'longdash', // 선의 스타일입니다
        //   fillColor: '#A2FF99', // 채우기 색깔입니다
        //   fillOpacity: 0.7 // 채우기 불투명도 입니다
        // });

        // // 지도에 다각형을 표시합니다
        // polygon.setMap(map);

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
        </div>
    )
}

export default ProfileForm;