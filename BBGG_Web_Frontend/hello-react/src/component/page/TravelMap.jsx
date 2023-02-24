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
    let container = document.getElementById("map");

    let options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };

    let map = new window.kakao.maps.Map(container, options);

    console.log("loading kakaomap");
  }, []);

  return (
    <div className={"Map"}>
      <div className={"MapContainer"} id="map"></div>
    </div>
  );
};

export default TravelMap;
