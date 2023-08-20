import React, { useState } from "react";
import homeImage from "../../assets/sanbong.jpg";
import "./style.scss";
import { Typewriter, Cursor } from "react-simple-typewriter";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const street = [
    { value: "Thu Duc District", label: "Thu Duc" },
    { value: "District 1, HCMC", label: "District 1" },
    { value: "District 2, HCMC", label: "District 2" },
    { value: "District 3, HCMC", label: "District 3" },
    { value: "District 4, HCMC", label: "District 4" },
    { value: "District 5, HCMC", label: "District 5" },
    { value: "District 6, HCMC", label: "District 6" },
    { value: "District 7, HCMC", label: "District 7" },
    { value: "District 8, HCMC", label: "District 8" },
    { value: "District 9, HCMC", label: "District 9" },
    { value: "District 10, HCMC", label: "District 10" },
    { value: "District 11, HCMC", label: "District 11" },
    { value: "District 12, HCMC", label: "District 12" },
    { value: "District Tan Binh", label: "Tan Binh" },
    { value: "Binh Thanh District", label: "Binh Thanh" },
    { value: "Go Vap District", label: "Go Vap" },
  ];
  const [selectedStreet, setSelectedStreet] = useState("district");
  const [groundName, setGroundName] = useState("stadium");
  const nagative = useNavigate();

  const handleSearch = async () => {
    if (selectedStreet) {
      nagative(`/list/${selectedStreet}/${groundName}`);
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
            Book a sports facility
            <span style={{ fontWeight: "bold", color: "red" }}>
              <Typewriter
                words={[" quality", " easy"]}
                loop={2}
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
            Book a sports facility near you with a single click and get to
            search
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
              onChange={(selectedOption) =>
                setSelectedStreet(selectedOption.value)
              }
            />
          </div>
          <div className="container">
            <label htmlFor="">Ground name</label>
            <input
              type="text"
              placeholder="Search ground name"
              //value={groundName}
              onChange={(e) => setGroundName(e.target.value)}
            />
          </div>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
}
