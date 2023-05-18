import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./Area_first.module.css";

const Areaplace = () => {
  const [visitedHotPlaces, setVisitedHotPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/gps/place", {
        params: {
          dong: localStorage.getItem("text"),
        },
      })
      .then((response) => {
        const places = response.data.map((place) => place.title);
        setVisitedHotPlaces(places);
        // for (var i = 0; i < response.data.length; i++) {
        //   const text = response.data.title;
        //   setVisitedHotPlaces(response.data.title);
        //   console.log(text[i]);
        // }
        // const title = response.data.title;
        // setVisitedHotPlaces(response.data.title);
        // console.log(title[i]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = () => {
    console.log("Button Clicked");
  };

  return (
    <div className={classes.starting}>
      <h1>동별 방문지</h1>
      {visitedHotPlaces.map((title, index) => (
        <button key={index} onClick={handleClick}>
          {title}
        </button>
      ))}
    </div>
  );
};
export default Areaplace;
