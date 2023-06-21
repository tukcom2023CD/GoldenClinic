import React, { useEffect } from 'react';
import classes from './CurrentLocation.module.css';

const { kakao } = window;

const CurrentLocation = () => {

    useEffect(() => {
        var mapContainer = document.getElementById('map'),
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            };
        var map = new kakao.maps.Map(mapContainer, mapOption);
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude,
                lon = position.coords.longitude;

            if (navigator.geolocation) {

                var locPosition = new kakao.maps.LatLng(lat, lon),
                    message = '<div style="padding:5px;">기록하려면 클릭</div>';
                displayMarker(locPosition, message);

            } else {
                var locPosition2 = new kakao.maps.LatLng(33.450701, 126.570667),
                    message2 = 'geolocation을 사용할 수 없어용'

                displayMarker(locPosition2, message2);
            }
            function displayMarker(locPosition, message) {

                var marker = new kakao.maps.Marker({
                    map: map,
                    position: locPosition
                });

                // 마커에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(marker, 'click', function () {
                    localStorage.setItem("lat", lat);
                    localStorage.setItem("lon", lon);
                    window.location.href = '/PostWriting';
                });

                var iwContent = message;

                var infowindow = new kakao.maps.InfoWindow({
                    content: iwContent,
                });

                infowindow.open(map, marker);

                map.setCenter(locPosition);

                var mapTypeControl = new kakao.maps.MapTypeControl();
                map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


                var zoomControl = new kakao.maps.ZoomControl();
                map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
            }
        });
    });

    const MarkSwitchBtn = () => {
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
                방문한 지역 보기
            </button>
        </div>
    )
}

export default CurrentLocation;