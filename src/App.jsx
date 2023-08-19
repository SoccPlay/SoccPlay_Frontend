import React, { useEffect } from "react";

import scrollreveal from "scrollreveal";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Home";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import List from "./pages/list/List";
import Detail from "./pages/detail/Detail";
import Profile from "./pages/profile/Profile";
export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route exact path="signin" element={<SignIn />} />
                <Route exact path="signup" element={<SignUp />} />
                <Route
                    path="/list/:selectedStreet/:groundName"
                    element={<List />}
                />
                <Route path="/detail/:landId" element={<Detail />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}
