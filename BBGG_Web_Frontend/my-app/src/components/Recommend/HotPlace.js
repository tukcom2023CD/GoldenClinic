import React, { useState } from "react";
import axios from "axios";
import classes from "./HotPlace.module.css";

function Food() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = async () => {
    const clientId = "tIYv4dIy_lgnmbEWd8Ws";
    const clientSecret = "6aQbFlm8kR";
    const apiLocalUrl = `/v1/search/local.json?query=${searchTerm}&display=10`;
    const apiBlogUrl = `/v1/search/blog.json?query=${searchTerm}&display=10`;

    try {
      const [localResponse, blogResponse] = await axios.all([
        axios.get(apiLocalUrl, {
          headers: {
            "X-Naver-Client-Id": clientId,
            "X-Naver-Client-Secret": clientSecret,
          },
        }),
        axios.get(apiBlogUrl, {
          headers: {
            "X-Naver-Client-Id": clientId,
            "X-Naver-Client-Secret": clientSecret,
          },
        }),
      ]);
      setSearchResult([
        ...localResponse.data.items,
        ...blogResponse.data.items,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemSelected = (item) => setSelectedItem(item);

  const handleCloseDetail = () => setSelectedItem(null);

  const handleItemSend = async () => {
    const sendData = {
      placeName: selectedItem.title,
      address: selectedItem.address,
      userId: localStorage.getItem("userId"),
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/bbgg/placesave",
        sendData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.Food}>
      <div className={classes.headerSpacer}></div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>

      {selectedItem && (
        <div className={classes.Food}>
          <h1>{selectedItem.title}</h1>
          <p>{selectedItem.category}</p>
          <p>{selectedItem.roadAddress}</p>

          <p>{selectedItem.description}</p>
          <button
            className={`${classes.button} ${classes["button-close"]}`}
            onClick={handleCloseDetail}
          >
            Close
          </button>
        </div>
      )}

      {searchResult.map((item) => (
        <div className={classes.Food} key={item.title}>
          <h2>{item.title}</h2>
          <p>{item.category}</p>
          <p>{item.roadAddress}</p>

          <button
            className={`${classes.button} ${classes["button-detail"]}`}
            onClick={() => handleItemSelected(item)}
          >
            View Detail
          </button>

          {selectedItem && selectedItem === item && (
            <button
              className={`${classes.button} ${classes["button-send"]}`}
              onClick={handleItemSend}
            >
              Send
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Food;
