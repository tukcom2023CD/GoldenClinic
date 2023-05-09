import React, { useState } from "react";
import axios from "axios";
import classes from "./HotPlace.module.css";

function Food() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const clientId = "tIYv4dIy_lgnmbEWd8Ws";
    const clientSecret = "6aQbFlm8kR";
    const apiUrl = `/v1/search/local.json?query=${searchTerm}&display=10`;

    axios
      .get(apiUrl, {
        headers: {
          "X-Naver-Client-Id": clientId,
          "X-Naver-Client-Secret": clientSecret,
        },
      })
      .then((response) => {
        setSearchResult(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleItemSelected = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const handleItemSend = () => {
    const sendData = {
      name: selectedItem.title,
      address: selectedItem.address,
      userid: localStorage.getItem("userId"),
    };
    axios
      .post("http://localhost:8080/bbgg/placesave", sendData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.Food}>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>

      {selectedItem && (
        <div>
          <div className={classes.Food}>
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.category}</p>
            <button
              className={`${classes.button} ${classes["button-close"]}`}
              onClick={handleCloseDetail}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {searchResult.map((item) => (
        <div className={classes.Food} key={item.title}>
          <div>
            <h2>{item.title}</h2>
            <p>{item.address}</p>
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
        </div>
      ))}
    </div>
  );
}

export default Food;
