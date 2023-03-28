import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import ClusterPage from "./components/Profile/ClusterPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import KakaoMap from "./components/Map/KakaoMap";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/KakaoMap" element={<KakaoMap />}></Route>
        <Route path="/Cluster" element={<ClusterPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
