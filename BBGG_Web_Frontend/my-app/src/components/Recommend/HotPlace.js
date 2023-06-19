import React, { useEffect, useState } from "react";
import axios from "axios";

const HotPlace = () => {
  const [category, setCategory] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (category !== "") {
      searchPlaces();
    }
  }, [category]);

  const searchPlaces = () => {
    const { kakao } = window;
    const map = new kakao.maps.Map(document.getElementById("map"), {
      center: new kakao.maps.LatLng(37.5665, 126.978),
      level: 13,
    });

    const placesService = new kakao.maps.services.Places();

    const searchOptions = {
      location: map.getCenter(),
      radius: 1000,
      category_group_code: category,
      useMapBounds: true,
    };

    placesService.categorySearch(
      category,
      (results, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(results);
        }
      },
      searchOptions
    );
  };

  return (
    <div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">카테고리 선택</option>
        <option value="MT1">대형마트</option>
        <option value="CS2">편의점</option>
        <option value="CE7">카페</option>
        <option value="AD5">학문/교육</option>
        <option value="FD6">음식점</option>
      </select>

      <div id="map" style={{ width: "100%", height: "500px" }}></div>

      <div>
        {places.map((place) => (
          <div key={place.id}>
            <h3>{place.place_name}</h3>
            <p>{place.address_name}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotPlace;
