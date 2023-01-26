import * as ReactDom from 'react-dom';
import { isPlainObject } from "@mui/utils";
import React from "react";

import {
  BrowserRouter,
  Routes,
  Route

} from "react-router-dom";
import styled from "styled-components";
//Pages
import HomePage from'./component/page/HomePage';
import MainPage from'./component/page/MainPage';
import SignInPage from'./component/page/SignInPage';
import SignUpPage from'./component/page/SignUpPage';

// const MainTitleText = styled.p`
// font-size: 24px;
// font-weight: borderLeft;
// text-align: clearInterval;
// `;
function App(props){
  return (
    <BrowserRouter>
    {/* <MainTitleText>방방곡곡</MainTitleText> */}
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="SignUp" element={<SignUpPage />} />
      <Route path="SignIn" element={<SignInPage />} />
      <Route path="/MainPage" element={<MainPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;