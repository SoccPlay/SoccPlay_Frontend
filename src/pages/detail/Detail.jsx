import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import "./detail.css";
import { useNavigate, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { Icon } from "@mui/material";
import FullWidthTabs from "./Tabs";
import LandApi from "../../components/Axios/LandApi";
export default function Detail() {
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const { landId } = useParams();
  const handleSearch = () => {
    console.log(selectedStartDate, selectedEndDate);
  };
  const [land, setLand] = useState();
  const [selectedImage, setSelectedImage] = useState(
    "https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong_1675817495.jpg"
  );
  const fetchLands = async ([]) => {
    try {
      const response = await LandApi.GetLandById(landId);
      if (response == null) {
      }
      console.log("Land ID:", [response.data]);
      setLand([response.data]);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  useEffect(() => {
    fetchLands([]);
  }, []);
  return (
    <div className="detail">
      <Navbar />
      {land &&
        land.map((lands) => {
          return (
            <div className="detail-all" key={lands.landId}>
              <h1>{lands.nameLand}</h1>
              <div className="address">
                5
                <Icon className="icon">
                  <StarIcon />
                </Icon>
                (1 đánh giá) - {lands.location}
              </div>

              <div className="img">
                <div className="main-image">
                  <img src={selectedImage} alt="Sân bóng Tiến Trường - TPHCM" />
                </div>
                <div className="sub-images">
                  <img
                    src="https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong-3_1675817810.jpg"
                    alt="Sân bóng Tiến Trường - TPHCM"
                    onClick={() =>
                      setSelectedImage(
                        "https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong-3_1675817810.jpg"
                      )
                    }
                  />
                  <img
                    src="https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong_1675817495.jpg"
                    alt="Sân bóng Tiến Trường - TPHCM"
                    onClick={() =>
                      setSelectedImage(
                        "https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong_1675817495.jpg"
                      )
                    }
                  />
                  <img
                    src="https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong-9_1675817811.jpg"
                    alt="Sân bóng Tiến Trường - TPHCM"
                    onClick={() =>
                      setSelectedImage(
                        "https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong-9_1675817811.jpg"
                      )
                    }
                  />
                  <img
                    src="https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong-10_1675817811.jpg"
                    alt="Sân bóng Tiến Trường - TPHCM"
                    onClick={() =>
                      setSelectedImage(
                        "https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong-10_1675817811.jpg"
                      )
                    }
                  />
                  <img
                    src="https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong-4_1675817812.jpg"
                    alt="Sân bóng Tiến Trường - TPHCM"
                    onClick={() =>
                      setSelectedImage(
                        "https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong-4_1675817812.jpg"
                      )
                    }
                  />
                </div>
              </div>
              <div className="tab">
                <FullWidthTabs key={lands.landId} landId={lands.landId} />
              </div>
            </div>
          );
        })}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
