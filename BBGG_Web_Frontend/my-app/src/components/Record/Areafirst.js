import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./Area_first.module.css";

const Areafirst = () => {
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/gps/visited_place", {
        params: {
          userId: localStorage.getItem("userId"),
        },
      })
      .then((response) => {
        const cityJson = response.data;
        setVisitedPlaces(cityJson);
        //localStorage.setItem("visitedPlaces", JSON.stringify(cityJson));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = (place) => {
    console.log("Button Clicked");
    localStorage.setItem("text", place);
    navigate("/Areaplace");
  };

  window.onbeforeunload = function () {
    localStorage.removeItem("text");
  };
  return (
    <div className={classes.starting}>
      <h1>방문지역</h1>
      {visitedPlaces.map((place, index) => (
        <button key={index} onClick={() => handleClick(place)}>
          {place}
        </button>
      ))}
    </div>
  );
};

export default Areafirst;
