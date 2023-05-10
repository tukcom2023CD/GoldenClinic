import classes from './StartingPageContent.module.css';
import { useState, useEffect } from "react";

const StartingPageContent = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [page, setPage] = useState(1);

  const posTop = (page - 1) * window.innerHeight;
  window.scrollTo({ top: posTop, behavior: 'smooth' });

  const handleScroll = (e) => {
    const h1Elements = document.querySelectorAll("h1");
    
    if (e.deltaY > 0) {
      if (page === 3) return;
      setPage(page + 1);
      h1Elements.forEach((h1Element) => {
        h1Element.style.transition = "left 2s, opacity 2s";
        h1Element.style.left = "0";
        h1Element.style.opacity = "1";
      });
    } else if (e.deltaY < 0) {
      if (page === 1) return;
      setPage(page - 1);
      h1Elements.forEach((h1Element) => {
        h1Element.style.transition = "left 2s, opacity 2s";
        h1Element.style.left = "-100px";
        h1Element.style.opacity = "0";
      });
    }
  };
  

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

  window.addEventListener("wheel", function (e) {
    e.preventDefault();
  }, { passive: false });


  return (
    <div onWheel={handleScroll}><div className={classes.headerSpacer}>.</div>
      <button className={classes.yellow}>앱 다운로드 ⤓</button>
      <div className={classes.starting2}>
        <h1>TO TRAVEL IS TO LIVE</h1>
      </div>
      <div className={classes.starting3}>
        <h1>한번쯤<br />꿈에 그리던<br />전국일주</h1>
      </div>
      <div className={classes.starting}>
        <h1>웹사이트에서 시작하기</h1>
        <button onClick={StartBBGGBtn}>start BBGG!</button>
      </div>
    </div>
  );
};

export default StartingPageContent;