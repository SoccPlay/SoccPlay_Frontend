import React from "react";
import homeImage from "../../assets/sanbong.jpg";
import "./style.scss";
import { Typewriter, Cursor } from "react-simple-typewriter";
import Select from "react-select";

export default function Hero() {
    const street = [
        { label: "Quan 1", year: 1994 },
        { label: "Quan 3", year: 1974 },
        { label: "Quan 4", year: 2008 },
        { label: "Quan 7", year: 1972 },
        { label: "Quan 8", year: 1972 },
        { label: "Quan 11", year: 1972 },
        { label: "Quan 12", year: 1972 },
        { label: "Quan Tan Binh", year: 1972 },
        { label: "Quan Binh Thanh", year: 1972 },
        { label: "Quan Go Vap", year: 1972 },
        { label: "Thu Duc", year: 1972 },
    ];
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
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            name="color"
                            options={street}
                            placeholder="Select your district"
                        />
                    </div>
                    <div className="container">
                        <label htmlFor="">Ground name</label>
                        <input type="text" placeholder="Search ground name" />
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
