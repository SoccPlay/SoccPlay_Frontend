import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import "./detail.css";
import { useNavigate } from "react-router-dom";

export default function Detail({ landId }) {
  const initialSize = [
    { id: "size5", count: 0 },
    { id: "size7", count: 0 },
  ];

  const handleIncrease = (id) => {
    const updatedSizes = sizes.map((size) =>
      size.id === id ? { ...size, count: size.count + 1 } : size
    );
    setSizes(updatedSizes);
  };

  const handleDecrease = (id) => {
    const updatedSizes = sizes.map((size) =>
      size.id === id ? { ...size, count: size.count - 1 } : size
    );
    setSizes(updatedSizes);
  };
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

  const nagative = useNavigate();

  const handleSearch = () => {
    //   history.push(`/search?street=${selectedStreet}`);
    // nagative(`/search?street=${selectedStreet}`);
    console.log(selectedStartDate, selectedEndDate);
  };
  const [sizes, setSizes] = useState(initialSize);
  const booking = [
    { id: 1, name: "Phòng Đơn", price: 100 },
    { id: 2, name: "Phòng Đôi", price: 150 },
    { id: 3, name: "Phòng Gia Đình", price: 200 },
  ];

  return (
    <div className="detail">
      <Navbar />
      <div className="detail-flex">
        <Card />
        {/* <!-- Right Column --> */}
        <div className="right-column">
          {/* <!-- Product Description --> */}
          <div className="product-description">
            <span>Ground</span>
            <h1>A28</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis facere, vel unde consectetur eaque omnis alias
              tenetur? Aliquid expedita at alias similique quod voluptates
              eligendi recusandae molestiae! Ullam, sint provident?
            </p>
          </div>
          <h4 className="sizeName">
            {sizes.map((size) => (
              <span className="size">{size.id}</span>
            ))}
          </h4>
          <div className="product-configuration">
            <div className="product-color">
              {sizes.map((size) => (
                <div key={size.id} className="counter">
                  <div className="counter">
                    <button onClick={() => handleDecrease(size.id)}>-</button>
                    <input type="text" value={size.count} readOnly />
                    <button onClick={() => handleIncrease(size.id)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            <div className="leftTime">
              <label htmlFor="">Start Time : </label>
              <input
                type="datetime-local"
                value={selectedStartDate}
                onChange={(e) => setSelectedStartDate(e.target.value)}
              />
            </div>
            <div className="rightTime">
              <label htmlFor=""> End Time : </label>
              <input
                type="datetime-local"
                value={selectedEndDate}
                onChange={(e) => setSelectedEndDate(e.target.value)}
              />
            </div>
          </div>
          {/* <!-- Product Pricing --> */}
          <div class="product-price">
            <span>148$</span>
            <button class="cart-btn">Booking</button>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
