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
      window.location.replace('/Profile')
    } else {
      window.location.replace('/auth')
    }
  }

  return (
    <div className={classes.starting}>
      <h1>TO TRAVEL IS TO LIVE</h1>
      <button onClick={StartBBGGBtn}>start BBGG!</button>
    </div>
  );
};

export default StartingPageContent;