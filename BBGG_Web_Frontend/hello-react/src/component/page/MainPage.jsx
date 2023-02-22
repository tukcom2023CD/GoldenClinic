import * as React from "react";
import Footer from "../base/Footer";
import Gnb from "../base/Gnb";
import { Component } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function TravelMap(props) {
  // const isLogin = props.isLogin;
  // axios
  //   .get("http://localhost:8080/sessioninfo", {})
  //   .then(function (t) {
  //     //   localStorage.setItem("userName", response.data.userName);
  //     //   alert("userName 님 안녕하세요");
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  //   useEffect(() => {
  //     axios.get("http://localhost:8080/bbgg/login"
  //     .then((response) => setPosts(response.data));
  //   });

  return (
    <div>메인이다!</div>
    // <div>{posts.length}</div>
    // <ul>
    //     {posts.map(post => (
    //         <li key = {post.Id}>{post.Name}</li>
    //     ))}
    // </ul>
  );
}

export default TravelMap;
