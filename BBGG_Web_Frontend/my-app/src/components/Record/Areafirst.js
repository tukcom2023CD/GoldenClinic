import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./Area_first.module.css";

const Areafirst = () => {
  const [visitedPlaces, setVisitedPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/gps/visited_place", {
        params: {
          userId: localStorage.getItem("userId"),
        },
      })
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          const cityJson = response.data;
          setVisitedPlaces(response.data);
          console.log(cityJson[i]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = () => {
    console.log("Button Clicked");
    localStorage.setItem("text");
  };

  return (
    <div className={classes.starting}>
      <h1>방문지역</h1>
      {visitedPlaces.map((place, index) => (
        <button key={index} onClick={handleClick}>
          {place}
        </button>
      ))}
    </div>
  );
};
export default Areafirst;
