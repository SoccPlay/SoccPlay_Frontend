import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import "./list.css";
export default function List() {
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
          {/* <!-- Product Configuration --> */}
          <div className="product-configuration">
            {/* <!-- Product Color --> */}

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

          {/* <!-- Product Pricing --> */}
          <div class="product-price">
            <span>148$</span>
            <a href="#" class="cart-btn">
              Booking
            </a>
          </div>
        </div>
      </div>
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
          {/* <!-- Product Configuration --> */}
          <div className="product-configuration">
            {/* <!-- Product Color --> */}

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

          {/* <!-- Product Pricing --> */}
          <div class="product-price">
            <span>148$</span>
            <a href="#" class="cart-btn">
              Booking
            </a>
          </div>
        </div>
      </div>
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
          {/* <!-- Product Configuration --> */}
          <div className="product-configuration">
            {/* <!-- Product Color --> */}

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

          {/* <!-- Product Pricing --> */}
          <div class="product-price">
            <span>148$</span>
            <a href="#" class="cart-btn">
              Booking
            </a>
          </div>
        </div>
      </div>
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
          {/* <!-- Product Configuration --> */}
          <div className="product-configuration">
            {/* <!-- Product Color --> */}

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

          {/* <!-- Product Pricing --> */}
          <div class="product-price">
            <span>148$</span>
            <a href="#" class="cart-btn">
              Booking
            </a>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
