import * as ReactDom from "react-dom";
import { isPlainObject } from "@mui/utils";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
//Pages
import HomePage from "./component/page/HomePage";
import SignInPage from "./component/page/SignInPage";
import SignUpPage from "./component/page/SignUpPage";
import Destination from "./component/page/Destination";
import Restaurant from "./component/page/Restaurant";
import TravelMap from "./component/page/TravelMap";
import HeaderContainer from "./component/base/HeaderContainer";

// const MainTitleText = styled.p`
// font-size: 24px;
// font-weight: borderLeft;
// text-align: clearInterval;
// `;
function App(props) {
  return (
    <BrowserRouter>
      <HeaderContainer />
      {/* <MainTitleText>방방곡곡</MainTitleText> */}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/Destination" element={<Destination />} />
        <Route path="/Restaurant" element={<Restaurant />} />
        <Route path="/TravelMap" element={<TravelMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
