import React from "react";
import classes from "./MainPage.module.css";
import IntroduceBBGG from "../../images/IntroduceBBGG.png";
import NightMarket from "../../images/NightMarket.png";
import yummy from "../../images/yummy.png";

const MainPage = () => {
  const imglist = [IntroduceBBGG, NightMarket, yummy];
  const delay = 2500;

  const [State, setState] = React.useState(0);
  const timeRef = React.useRef(null);

  function resetTimeout() {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeRef.current = setTimeout(
      () => setState((prevState) => (prevState === 3 - 1 ? 0 : prevState + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [State]);

  const replace1 = () => {
    window.location.href = "/CurrentLocation";
  };
  const replace2 = () => {
    window.location.href ="/ColoringMap";
  };
  const replace3 = () => {
    window.location.href ="/Areafirst";
  };

  const replace4 = () => {
    window.location.href ="/LocalFood";
  };
  const replace5 = () => {
    window.location.href ="/HotPlace";
  };

  return (
    <div>
      <div className={classes.headerSpacer}></div>
      <img
        src={imglist[State]}
        className={classes.marketimg}
        alt="banner"
      ></img>
      <div className={classes.underAdContainer}>
        <div className={classes.recommendString}>추천 여행지</div>
        <div className={classes.container}>
          <button className={classes.recommendImg1}>서울특별시</button>
          <button className={classes.recommendImg2}>경기도</button>
          <button className={classes.recommendImg3}>대전광역시</button>
          <button className={classes.recommendImg4}>대구광역시</button>
          <button className={classes.recommendImg5}>부산광역시</button>
        </div>
      </div>
      <div className={classes.underAdContainer}>
        <div className={classes.recommendString}>위치 기록</div>
        <div className={classes.container}>
          <button
            className={classes.locationRecordBtn}
            onClick={replace1}
          ></button>
        </div>
      </div>
      <div className={classes.underAdContainer}>
        <div className={classes.recommendString}>색칠 현황</div>
        <div className={classes.container}>
          <button
            className={classes.locationRecordBtn2}
            onClick={replace2}
          ></button>
        </div>
      </div>
      <div className={classes.underAdContainer}>
        <div className={classes.recommendString}>방문 확인</div>
        <div className={classes.container}>
          <button
            className={classes.locationRecordBtn3}
            onClick={replace3}
          ></button>
        </div>
      </div>

      <br />

      <div className={classes.fixedBox}>
            <button className = {classes.fixedBox1} onClick={replace4}>맛집 검색</button>
            <button className = {classes.fixedBox2} onClick={replace5}>명소 검색</button>
          </div>
    </div>
  );
};

export default MainPage;
