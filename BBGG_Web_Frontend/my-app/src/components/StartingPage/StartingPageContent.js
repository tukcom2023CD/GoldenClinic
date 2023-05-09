import classes from './StartingPageContent.module.css';
import { useState, useEffect } from "react";

const StartingPageContent = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userId') === null) {
    } else setIsLogin(true);

  }, []);

  const StartBBGGBtn = () => {
    if (isLogin) {
      window.location.replace('/MainPage')
    } else {
      window.location.replace('/auth')
    }
  }


  return (
    <div><div className={classes.headerSpacer}>.</div>
    <button className={classes.yellow}>앱 다운로드 ⤓</button>
      <div className={classes.starting2}>
        <h1>TO TRAVEL IS TO LIVE</h1>
      </div>
      <div className={classes.starting3}>
        <h1>한번쯤<br/>꿈에 그리던<br/>전국일주</h1>
      </div>
      <div className={classes.starting}>
        <h1>웹사이트에서 시작하기</h1>
        <button onClick={StartBBGGBtn}>start BBGG!</button>
      </div>
    </div>
  );
};

export default StartingPageContent;