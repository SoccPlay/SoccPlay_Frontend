import React from "react";

import { Route, Routes } from "react-router-dom";
import Detail from "./pages/detail/Detail";
import Homepage from "./pages/homepage/Home";
import List from "./pages/list/List";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Profile from "./pages/profile/Profile";
import "./App.css";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route exact path="signin" element={<SignIn />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route path="/list/:selectedStreet/:groundName" element={<List />} />
        <Route path="/detail/:landId" element={<Detail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
