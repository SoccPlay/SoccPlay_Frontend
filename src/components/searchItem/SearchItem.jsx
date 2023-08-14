import React, { useEffect, useState } from "react";
import "./searchItem.css";
import LandApi from "../Axios/LandApi";
import San1 from "../../assets/San1.jpg";
import San2 from "../../assets/San2.jpg";
import San3 from "../../assets/San3.jpg";
import San4 from "../../assets/San4.jpg";
import San5 from "../../assets/San5.jpg";
import San6 from "../../assets/San6.jpg";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ landId }) => {
  const [land, setLand] = useState();
  const [apiDataAvailable, setApiDataAvailable] = useState(false);

  const fetchLands = async ([]) => {
    try {
      const response = await LandApi.GetLandById(landId);
      if (response == null) {
        setApiDataAvailable(false);
      }
      console.log("Land ID:", [response.data]);
      setLand([response.data]);
      setApiDataAvailable(true);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const nagative = useNavigate();
  const handleDetailClick = (landId) => {
    nagative(`/detail/${landId}`);
  };
  useEffect(() => {
    fetchLands([]);
  }, []);

  return (
    <>
      {land &&
        land.map((lands) => {
          return (
            <div className="searchItem" key={lands.landId}>
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
                alt=""
                className="siImg"
              />
              <div className="siDesc">
                <div className="siDesc">
                  <h1 className="siTitle">{lands.nameLand}</h1>
                  <span className="siDistance">{lands.location}</span>
                  <span className="siTaxiOp">Policty</span>
                  <span className="siSubtitle">
                    Total Pitch: {lands.totalPitch}
                  </span>
                  {/* <span className="siFeatures">{lands.totalPitch}</span> */}
                  <span className="siCancelOp">Free cancellation </span>
                  <span className="siCancelOpSubtitle">
                    You can cancel your ticket after booking, book now to get
                    the best price
                  </span>
                </div>
              </div>
              <div className="siDetails">
                <div className="siRating">
                  <span>Rating points</span>
                  <button>8.9</button>
                </div>
                <div className="siDetailTexts">
                  <span className="siPrice">
                    {lands.minPrice} VND - {lands.maxPrice} VND
                  </span>
                  <div class="container">
                    <button
                      className="button"
                      key={lands.landId}
                      onClick={() => handleDetailClick(lands.landId)}
                    >
                      <div className="button__line"></div>
                      <div className="button__line"></div>
                      <span className="button__text">Detail</span>
                      <div className="button__drow1"></div>
                      <div className="button__drow2"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default SearchItem;
