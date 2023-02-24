/* gloabl kakao*/
import * as React from "react";
import Footer from "../base/Footer";
import Gnb from "../base/Gnb";
import { Component } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const { kakao } = window;

const TravelMap = () => {
  useEffect(() => {
    var container = document.getElementById("map");

    var options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };

    var map = new window.kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    console.log("loading kakaomap");
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "800px", height: "700px" }}></div>
    </div>
  );
};

export default TravelMap;
