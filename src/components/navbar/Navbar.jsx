import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import "./style.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import jwt_decode from "jwt-decode";
export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("localtoken")
  );

  const tokenlocal = localStorage.getItem("localtoken");
  const handleLogout = () => {
    localStorage.removeItem(tokenlocal);
    setIsLoggedIn(false);
  };
  const [username, setUsername] = useState();
  const decodeToken = (token) => {
    try {
      const decodedData = jwt_decode(token);
      const role =
        decodedData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      const username = decodedData.unique_name;
      localStorage.setItem("USERNAME", username);
      setUsername(username);
      localStorage.setItem("ROLE", role);
      return decodedData;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  useEffect(() => {
    decodeToken(tokenlocal);
    setIsLoggedIn(!!localStorage.getItem("localtoken")); // Update login status when localtoken changes
  }, []);

  return (
    <>
      <div className="Nav">
        <div className="brand">
          <div className="container">
            <img src={logo} alt="" />
            96 ground
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>

        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/ground">Ground</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
        </ul>
        {isLoggedIn ? (
          <div>
            <h2> {username}</h2>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Link to="/signin">
            <button>Login</button>
          </Link>
        )}
      </div>
      <div className={`ResponsiveNav ${navbarState ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#home" onClick={() => setNavbarState(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#services" onClick={() => setNavbarState(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#recommend" onClick={() => setNavbarState(false)}>
              Places
            </a>
          </li>
          <li>
            <a href="#testimonials" onClick={() => setNavbarState(false)}>
              Testimonials
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
