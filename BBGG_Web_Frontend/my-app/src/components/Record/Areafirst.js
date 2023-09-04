import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./Area_first.module.css";

const Areafirst = () => {
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();
  const cityImages = [
    "https://images.unsplash.com/photo-1516264665768-5525834929bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8JUVBJUIyJUJEJUVCJUIzJUI1JUVBJUI2JTgxJTIwJUVCJUFDJUI0JUVCJThBJUFDfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://t1.daumcdn.net/cfile/tistory/996EB03D5F06B5CD31",
    "https://youimg1.tripcdn.com/target/0105e1200089ltwhz1FE7_C_800_10000.jpg",
    "https://youimg1.tripcdn.com/target/100f1f000001gq90a8E91_C_640_320_R5_Q70.jpg_.webp?proc=source%2Ftrip",
    "https://cphoto.asiae.co.kr/listimglink/1/2023020114044210217_1675227882.jpg",
  ];
  
  const districtsImages = [
    "https://a.cdn-hotels.com/gdcs/production84/d288/5924730a-7ee1-4723-bc9e-f1be5b2ca901.jpg",
    "https://mblogthumb-phinf.pstatic.net/MjAyMzAzMjVfMTI2/MDAxNjc5NzI2NjQ5MzY0.tfJ3FzY9fvpIuMsjwzkpNUNhOo8fkmqjqQ9A0Y7ysbsg.fUxUxBF4zBvO-OvgoDIzibeEoLfaXq-gmp6TEaQzLDwg.JPEG.tonygina/20230325%EF%BC%BF101629.jpg?type=w800",
    "https://www.korea.kr/newsWeb/resources/attaches/2019.11/27/PYH2019091103240001300.jpg",
    "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/18m1/image/0S_DBylhRNHZzijKdylJRbEsgJI.jpg",
    "https://dimg.donga.com/wps/NEWS/IMAGE/2023/02/27/118086448.2.jpg",
    "https://a.cdn-hotels.com/gdcs/production90/d409/62c5b602-5db6-4f62-ba74-b9ddf1a805f6.jpg",
    "https://c.pxhere.com/images/87/cc/a4cf91484a17ec0cb80a9ddaa948-1616134.jpg!d",
    "http://www.conslove.co.kr/news/photo/202110/70881_209559_2036.jpg"

  ];

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
        const uniqueCities = Array.from(new Set(cityJson.map((place) => place.split(" ")[0])));
        setCities(uniqueCities);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCityClick = (city, index) => {
    const citiesInSelectedCity = visitedPlaces.filter((place) => place.startsWith(city));
    const cityDistricts = citiesInSelectedCity.map((place) => place.split(" ").slice(1).join(" "));
    setSelectedCity(city);
    setDistricts(cityDistricts);
  };

  const handleDistrictClick = (district, index) => {
    console.log("Button Clicked");
    localStorage.setItem("text", district);
    navigate("/Areaplace");
  };

  window.onbeforeunload = function () {
    localStorage.removeItem("text");
  };

  return (
    <div className= {classes.parent}>
      <div className={classes.headerSpacer}></div>
      <div className={classes.title}></div>
      <div className={classes.starting}>
        <div className={classes.cityList}>
          <h2>도시 목록</h2>
          <div className={classes.cityContainer}>
            {cities.map((city, index) => (
              <button
                key={index}
                onClick={() => handleCityClick(city, index)}
                style={{
                  backgroundImage: `url(${cityImages[index % cityImages.length]})`
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
        <div className={classes.districtList}>
          <h2>{selectedCity}</h2>
          {selectedCity && (
            <div className={classes.districtContainer}>
              {districts.map((district, index) => (
                <button
                  key={index}
                  onClick={() => handleDistrictClick(district, index)}
                  style={{
                    backgroundImage: `url(${districtsImages[index % districtsImages.length]})`
                  }}
                >
                  {district}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Areafirst;
