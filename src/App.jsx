import React from "react";

import { Route, Routes } from "react-router-dom";
import Detail from "./pages/detail/Detail";
import Homepage from "./pages/homepage/Home";
import List from "./pages/list/List";
import Profile from "./pages/profile/Profile";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";

import "./App.css";
import Invoice from "./components/bill/Invoice";
import Feedback from "./components/feedback/Feedback";
import Order from "./components/bill/Order";
import Dashboard from "./pages/owner/components/Dashboard";

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
        <Route path="/invoice/:bookingId" element={<Invoice />} />
      </Routes>
    </div>
  );
}
