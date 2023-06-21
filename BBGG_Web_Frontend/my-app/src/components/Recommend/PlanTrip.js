import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./PlanTrip.module.css";

const PlanTrip = () => {
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/bbgg/re_place", {
        params: {
          userId: localStorage.getItem("userId"),
        },
      })
      .then((response) => {
        const cityJson = response.data;
        setVisitedPlaces(cityJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = (placeplan) => {
    console.log("Button Clicked");
    localStorage.setItem("placeplan", placeplan);
    console.log(placeplan);
    navigate("/Plan");
  };

  window.onbeforeunload = function () {
    localStorage.removeItem("placeplan");
  };
  return (
    <div className={classes.starting}>
      <h1>나의 장소</h1>
      {visitedPlaces.map((placeplan, index) => (
        <button key={index} onClick={() => handleClick(placeplan)}>
          {placeplan}
        </button>
      ))}
    </div>
  );
};

export default PlanTrip;
