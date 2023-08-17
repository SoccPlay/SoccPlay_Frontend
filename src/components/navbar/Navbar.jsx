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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="Nav">
        <div className="brand">
          <div className="container">
            <img src={logo} alt="" />
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
            <a href="/list/district/stadium">Ground</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
        </ul>
        {isLoggedIn ? (
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              {username}
            </Button>
            {open && (
              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{
                  ".MuiDialog-container": {
                    height: "unset",
                  },
                }}
              >
                <Profile onClosed={handleClose} />
              </Dialog>
            )}
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/signin">
            <button className="login" onClick={handleLogout}>
              Login
            </button>
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
        </ul>
      </div>
    </>
  );
}
