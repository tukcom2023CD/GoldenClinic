
import React, { useEffect } from 'react';

const { kakao } = window;

const Kakao = () => {

    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);
        var markerPosition = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
    }, [])

    return (
        <div id="map"
            style={{
                width: "100%",
                height: '700px'
            }}></div>
    )
}

export default Kakao;