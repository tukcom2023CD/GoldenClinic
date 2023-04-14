import axios from "axios";
import React, { useEffect, useState } from "react";

const Area_first = () => {
  const [, setVisitedPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/gps/visited_place", {
        params: {
          userId: localStorage.getItem("userId"),
        },
      })
      .than((response) => {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
          const cityJson = response.data;
          setVisitedPlaces(response.data);
          console.log(cityJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {/* <h1>방문지역</h1>
      <ul>
        {visitedPlaces.map(({ place }) => (
          <li key={place.id}>{place.name}</li>
        ))}
      </ul> */}
    </div>
  );
};
export default Area_first;
