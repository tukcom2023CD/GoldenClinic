
import React, { useEffect } from 'react';

const { kakao } = window;

const Kakao = () => {

    useEffect(() => {
        var mapContainer = document.getElementById('map'),
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            };
        var map = new kakao.maps.Map(mapContainer, mapOption);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude,
                    lon = position.coords.longitude;

                var locPosition = new kakao.maps.LatLng(lat, lon),
                    message = '<div style="padding:5px;">현재 위치</div>';
                displayMarker(locPosition, message);
            });
        } else {
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                message = 'geolocation을 사용할 수 없어용'

            displayMarker(locPosition, message);
        }
        function displayMarker(locPosition, message) {

            var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition
            });

            var iwContent = message,
                iwRemoveable = true;

            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable
            });

            infowindow.close(map, marker);

            map.setCenter(locPosition);
        }
    });

    return (
        <div id="map"
            style={{
                width: "100%",
                height: '700px'
            }}></div>
    )
}

export default Kakao;