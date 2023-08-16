import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import "./detail.css";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { Icon } from "@mui/material";
import FullWidthTabs from "./Tabs";

export default function Detail({ landId }) {
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

  const handleSearch = () => {
    console.log(selectedStartDate, selectedEndDate);
  };

  const [selectedImage, setSelectedImage] = useState(
    "https://thegioithethao.vn/images/products_soccer/2023/02/08/large/san-bong-tien-truong_1675817495.jpg"
  );

  return (
    <div className="detail">
      <Navbar />
      <hr />
      <div className="detail-all">
        <h1>Sân bóng Tiến Trường - TPHCM</h1>
        <div className="address">
          5
          <Icon className="icon">
            <StarIcon />
          </Icon>
          (1 đánh giá) - 206 Vườn Lài, An Phú Đông, Quận 12
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
          <FullWidthTabs />
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
