import React from "react";
import homeImage from "../../assets/sanbong.jpg";
import "./style.scss";
import { Typewriter, Cursor } from "react-simple-typewriter";
export default function Hero() {
    return (
        <div className="Section" id="hero">
            <div className="background">
                <img src={homeImage} alt="" />
            </div>
            <div className="content">
                <div className="title">
                    <h1>
                        Book a sports facility{" "}
                        <span style={{ fontWeight: "bold", color: "red" }}>
                            <Typewriter
                                words={["near you", "quality", "eassy"]}
                                loop={3}
                                typeSpeed={60}
                                deleteSpeed={40}
                                delaySpeed={2000}
                            />
                        </span>
                        <span style={{ color: "red" }}>
                            <Cursor cursorStyle="<"></Cursor>
                        </span>
                    </h1>
                    <p>
                        Book a sports facility near you with a single click and
                        get
                    </p>
                </div>
                <div className="search">
                    <div className="container">
                        <label htmlFor="">Where you to book</label>
                        <input type="text" placeholder="Search Your location" />
                    </div>
                    <div className="container">
                        <label htmlFor="">Date</label>
                        <input type="date" />
                    </div>
                    <button>Search</button>
                </div>
            </div>
        </div>
    );
}
