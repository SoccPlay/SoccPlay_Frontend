import React, { useEffect } from "react";

import scrollreveal from "scrollreveal";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Home";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import List from "./pages/list/List";
import Detail from "./pages/detail/Detail";
export default function App() {
    useEffect(() => {
        const sr = scrollreveal({
            origin: "top",
            distance: "80px",
            duration: 2000,
            reset: true,
        });
        sr.reveal(
            `
        nav,
        #hero,
        #services,
        #recommend,
        #testimonials,
        footer
        `,
            {
                opacity: 0,
                interval: 300,
            }
        );
    }, []);
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route exact path="signin" element={<SignIn />} />
                <Route exact path="signup" element={<SignUp />} />
                <Route exact path="list" element={<List />} />
                <Route exact path="detail" element={<Detail />} />
            </Routes>
        </div>
    );
}
