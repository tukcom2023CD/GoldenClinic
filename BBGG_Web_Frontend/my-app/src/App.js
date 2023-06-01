import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ColoringMap from "./components/Profile/ColoringMap";
import ClusterPage from "./components/Profile/ClusterPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CurrentLocation from "./components/Map/CurrentLocation";
import TestingPage from "./components/Profile/TestingPage";
import MainPage from "./components/StartingPage/MainPage";
import AreaFirst from "./components/Record/Areafirst";

import PostWriting from "./components/Record/PostWriting";
import Areaplace from "./components/Record/Areaplace";
import HotPlace from "./components/Recommend/HotPlace";
import LocalFood from "./components/Recommend/LocalFood";
import Plan from "./components/Recommend/Plan";
import PlanTrip from "./components/Recommend/PlanTrip";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/MainPage" element={<MainPage />}></Route>
        <Route path="/ColoringMap" element={<ColoringMap />}></Route>
        <Route path="/CurrentLocation" element={<CurrentLocation />}></Route>
        <Route path="/Cluster" element={<ClusterPage />}></Route>
        <Route path="/Testing" element={<TestingPage />}></Route>
        <Route path="/Areafirst" element={<AreaFirst />}></Route>
        <Route path="/Areaplace" element={<Areaplace />}></Route>
        <Route path="/PostWriting" element={<PostWriting />}></Route>
        <Route path="/HotPlace" element={<HotPlace />}></Route>
        <Route path="/LocalFood" element={<LocalFood />}></Route>
        <Route path="/Plan" element={<Plan />}></Route>
        <Route path="/PlanTrip" element={<PlanTrip />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
