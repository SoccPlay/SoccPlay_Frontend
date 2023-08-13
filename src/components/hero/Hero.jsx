import React, { useState } from "react";
import homeImage from "../../assets/sanbong.jpg";
import "./style.scss";
import { Typewriter, Cursor } from "react-simple-typewriter";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";

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

  const [selectedStreet, setSelectedStreet] = useState(null);
  const [groundName, setGroundName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const nagative = useNavigate();

  const handleSearch = () => {
    if (selectedStreet) {
      //   history.push(`/search?street=${selectedStreet}`);
      // nagative(`/search?street=${selectedStreet}`);
      console.log(selectedStreet, groundName, selectedDate);
    }
  };
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
          <p>Book a sports facility near you with a single click and get</p>
        </div>
        <div className="search">
          <div className="container">
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="color"
              options={street}
              placeholder="Select your district"
              onChange={(selectedOption) =>
                setSelectedStreet(selectedOption.label)
              }
            />
          </div>
          <div className="container">
            <label htmlFor="">Ground name</label>
            <input
              type="text"
              placeholder="Search ground name"
              value={groundName}
              onChange={(e) => setGroundName(e.target.value)}
            />
          </div>
          <div className="container">
            <label htmlFor="">Date</label>
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <button onClick={handleSearch}>Search</button>

          {/* <Link to="/search"></Link> */}
        </div>
      </div>
    </div>
  );
}
