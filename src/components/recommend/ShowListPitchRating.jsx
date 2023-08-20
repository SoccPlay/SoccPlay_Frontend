import React, { useEffect, useState } from "react";
import San1 from "../../assets/San1.jpg";
import San2 from "../../assets/San2.jpg";
import San3 from "../../assets/San3.jpg";
import San4 from "../../assets/San4.jpg";
import San5 from "../../assets/San5.jpg";
import San6 from "../../assets/San6.jpg";

import info1 from "../../assets/info1.png";
import info2 from "../../assets/info2.png";
import info3 from "../../assets/info3.png";
import "./style.scss";
import LandApi from "../Axios/LandApi";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Button, Rating, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

export default function ShowListPitchNear() {
  const data = [
    {
      image: San1,
      title: "Singapore",
      subTitle: "Singapore, officialy thr Republic of Singapore, is a",
      cost: "38,800",
      duration: "Approx 2 night trip",
    },
    {
      image: San2,
      title: "Thailand",
      subTitle: "Thailand is a Southeast Asia country. It's known for",
      cost: "54,200",
      duration: "Approx 2 night trip",
    },
    {
      image: San3,
      title: "Paris",
      subTitle: "Paris, France's capital, is a major European city and a",
      cost: "45,500",
      duration: "Approx 2 night trip",
    },
    {
      image: San4,
      title: "New Zealand",
      subTitle: "New Zealand is an island country in the",
      cost: "24,100",
      duration: "Approx 1 night trip",
    },
    {
      image: San5,
      title: "Bora Bora",
      subTitle: "Bora Bora is a small South Pacific island northwest of",
      cost: "95,400",
      duration: "Approx 2 night 2 day trip",
    },
    {
      image: San6,
      title: "London",
      subTitle: "London, the capital of England and the United",
      cost: "38,800",
      duration: "Approx 3 night 2 day trip",
    },
  ];
  const [apiDataAvailable, setApiDataAvailable] = useState(false);
  const [value, setValue] = React.useState(5);

  const [land, setLand] = useState("");
  const fetchLands = async ([]) => {
    try {
      const response = await LandApi.GetAllLand();
      if (response == null) {
        setApiDataAvailable(false);
      }
      console.log("Land Response:", [response.data]);
      setLand(response.data);
      setApiDataAvailable(true);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const sortLand = [...land]
    .sort((a, b) => b.totalPitch - a.totalPitch)
    .slice(0, 6);
  const nagative = useNavigate();

  const handleClick = (street, groundName) => {
    nagative(`/list/${street}/${groundName}`);
    console.log(street, groundName);
  };
  useEffect(() => {
    fetchLands([]);
  }, []);
  if (apiDataAvailable) {
    return (
      <div className="Section" id="recommend">
        <Typography className="typography">LIST PITCH MOST RATING</Typography>
        <div className="destinations">
          {sortLand.map((lands) => {
            return (
              <div
                className="destination"
                key={`${lands.landId}`}
                onClick={() => handleClick(lands.location, lands.nameLand)}
              >
                <img src={lands.image} alt="" />
                <h1>{lands.nameLand}</h1>
                <p>
                  {lands.title.length >= 150
                    ? `${lands.title.substring(0, 150)}...`
                    : lands.title}
                </p>
                <div className="distance">
                  <p>ToTal Pitch: {lands.totalPitch}</p>
                  <Rating
                    name="read-only"
                    value={value}
                    readOnly
                    size="small"
                  />
                </div>

                <div className="info">
                  <p>Price</p>
                  <b>
                    {lands.minPrice} VND - {lands.maxPrice} VND / Trận
                  </b>
                </div>
                <div className="distance">
                  <span>{lands.location}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="Section" id="recommend">
        <div className="destinations">
          {data.map((lands) => {
            <div className="destination" key={lands.landId}>
              <img src={lands.image} alt="" />
              <h3>{lands.title}</h3>
              <p>{lands.subTitle}</p>
              <div className="info">
                <div className="services">
                  <img src={info1} alt="" />
                  <img src={info2} alt="" />
                  <img src={info3} alt="" />
                </div>
                <h4>{lands.cost}</h4>
              </div>
              <div className="distance">
                <span>1200 kms</span>
                <span>{lands.totalPitch}</span>
              </div>
            </div>;
          })}
        </div>
      </div>
    );
  }
}
