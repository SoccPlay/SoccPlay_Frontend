import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import "./style.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Profile from "../../pages/profile/Profile";
import AuthenApi from "../Axios/AuthenApi";
import Destination1 from "../../assets/Destination1.png";
export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("localtoken")
  );
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("localtoken");
    localStorage.clear();
    setIsLoggedIn(false);
  };
  const [username, setUsername] = useState();
  const decodeToken = async () => {
    try {
      const tokenlocal = localStorage.getItem("localtoken");
      const decodedData = await jwt_decode(tokenlocal);
      const role =
        decodedData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      const username = decodedData.unique_name;
      localStorage.setItem("USERNAME", username);
      localStorage.setItem("ACCOUNTID", decodedData.sub);
      setUsername(username);
      localStorage.setItem("ROLE", role);
      const customerId = await AuthenApi.GetCustomerByAccountId(
        decodedData.sub
      );
      console.log("Customer ID:", customerId.data.customerId);
      localStorage.setItem("CUSTOMERID", customerId.data.customerId);
      return decodedData;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  useEffect(() => {
    decodeToken();
  }, []);

  return (
    <div className="Nav">
      <div className="brand">
        <div className="container">
          <img src={logo} alt="" />
        </div>
      </div>
      <ul>
        <li>
          <a href="/" className="largeText">
            Home
          </a>
        </li>
        <li>
          <a href="/list/Quận/Sân Bóng" className="largeText">
            Ground
          </a>
        </li>
        <li>
          <a href="/#" className="largeText">
            About
          </a>
        </li>
      </ul>
      {isLoggedIn ? (
        // bạn có thể thêm image vào đây nếu đã đăng nhập được không
        // lí do tại sao báo lỗi
        // button profile phải nằm trên logout
        // bạn có thể chỉnh img nhỏ lại được không

        <div className="user">
          <Link to="/profile" className="avatar">
            <img src={Destination1} alt="avatar" className="avatar-img" />
          </Link>
          <div className="logout">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <Link to="/signin">
          <Button className="login" onClick={handleLogout}>
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}
