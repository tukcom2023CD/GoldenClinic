import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [isLogin, setIsLogin] = useState(false); //로그인여부

  const LogoutRegister = () => {
    axios
      .get("http://localhost:8080/bbgg/logout")
      .then(function () {
        localStorage.clear();
        window.location.replace("http://localhost:3000/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userId") === null) {
    } else setIsLogin(true);
  }, []);

  const LoginLogoutBtn = () => {
    if (isLogin) {
      LogoutRegister();
    } else {
      window.location.replace("/auth");
    }
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>
          BBGG
          <br />
          <span className={classes.logo_under}>방방곡곡</span>
        </div>
      </Link>
      <nav>
        <ul>
          {/* <li>
            <Link to="/Testing">{isLogin ? "Testing" : ""}</Link>
          </li> */}
          <li>
            <Link to="/CurrentLocation">{isLogin ? "현재 위치" : ""}</Link>
          </li>
          <li>
            <Link to="/ColoringMap">{isLogin ? "지도 색칠" : ""}</Link>
          </li>
          <li>
            <Link to="/Areafirst">{isLogin ? "동별 방문지" : ""}</Link>
          </li>
          <li>
            <Link to="/PlanTrip">{isLogin ? "예정 장소" : ""}</Link>
          </li>
          <li>
            <Link to="/Plan">{isLogin ? "여행 계획" : ""}</Link>
          </li>
          <li className={classes.NavName}>
            {isLogin ? localStorage.getItem("userName") + " 님" : ""}
          </li>
          <li>
            <button onClick={LoginLogoutBtn}>
              {isLogin ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
