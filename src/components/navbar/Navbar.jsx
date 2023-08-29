import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Destination1 from "../../assets/Destination1.png";
import logo from "../../assets/logo.png";
import AuthenApi from "../Axios/AuthenApi";
import Avatar from "../avatar/Avatar";
import "./style.scss";
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
      if (role === "OWNER") {
        const ownerId = await AuthenApi.GetOwnerByAccountId(decodedData.sub);
        console.log("Owner ID:", ownerId.data.ownerId);
        localStorage.setItem("OWNERID", ownerId.data.ownerId);
      } else if (role === "CUSTOMER") {
        const customerId = await AuthenApi.GetCustomerByAccountId(
          decodedData.sub
        );
        console.log("Customer ID:", customerId.data.customerId);
        localStorage.setItem("CUSTOMERID", customerId.data.customerId);
      }
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
            Trang chủ
          </a>
        </li>
        <li>
          <Link
            onClick={() => Navigate("/list")}
            to={`/list`}
            className="largeText"
          >
            Sân
          </Link>
        </li>
        <li>
          <a href="/#" className="largeText">
            Thông tin
          </a>
        </li>
      </ul>
      {isLoggedIn ? (
        <div className="user">
          <Link to="/profile" className="avatar">
            <Avatar username={username} />
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
