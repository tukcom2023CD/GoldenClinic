import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ColoringMap from "./components/Profile/ColoringMap";
import ClusterPage from "./components/Profile/ClusterPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CurrentLocation from "./components/Map/CurrentLocation";
import TestingPage from "./components/Profile/TestingPage";
import AreaFirst from "./components/Record/AreaFirst";
import RecordPost from "./components/Record/RecordPost";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/ColoringMap" element={<ColoringMap />}></Route>
        <Route path="/CurrentLocation" element={<CurrentLocation />}></Route>
        <Route path="/Cluster" element={<ClusterPage />}></Route>
        <Route path="/Testing" element={<TestingPage />}></Route>
        <Route path="/AreaFirst" element={<AreaFirst />}></Route>
        <Route path="/RecordPost" element={<RecordPost />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
