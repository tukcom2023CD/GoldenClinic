import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./PlanTrip.module.css";

const PlanTrip = () => {
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const navigate = useNavigate();
  const foodImages = [
    "https://mblogthumb-phinf.pstatic.net/MjAxNzA4MDJfMjkz/MDAxNTAxNjM3NDczNTc5.59_H9qhS5Tlu9Z0iG9e8M9HSq2zXtuChcM54oqAi_CEg.VQT-NraQgJW3SmsdLwApTNaEPwK9GqI2PPtV5wAyq_og.JPEG.missjoody/IMG_0068.jpg?type=w800",
    "https://static.hubzum.zumst.com/hubzum/2019/04/08/11/3e1a24b9c2ba46379d5e7d006b201b68.jpg",
    "https://mp-seoul-image-production-s3.mangoplate.com/1026054_1629447421501826.jpg?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80",
    "https://blog.kakaocdn.net/dn/oo9am/btq7SEIuUk6/uyrIBigp2gKA0pKrncckw1/img.jpg",
    "https://t1.daumcdn.net/cfile/tistory/99AE23335C84FF1F20",
    "https://d12zq4w4guyljn.cloudfront.net/750_750_20221209040057320_photo_ba616760f4e0.jpg",
    "https://mp-seoul-image-production-s3.mangoplate.com/195983/1081768_1536757121900_8151?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80",
    "https://mp-seoul-image-production-s3.mangoplate.com/278822/fg4f1mtrvazukm.jpg?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80",
    "https://mp-seoul-image-production-s3.mangoplate.com/368184/hizyp4cwp_h5t_.jpg?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80"
  ];

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
    <div>
      <div className={classes.headerSpacer}></div>
      <div className={classes.starting}>
        <div className={classes.title}></div>
        {visitedPlaces.map((placeplan, index) => (
          <button
            key={index}
            onClick={() => handleClick(placeplan)}
            style={{ backgroundImage: `url(${foodImages[index % foodImages.length]})` }}
          >
            {placeplan}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanTrip;
