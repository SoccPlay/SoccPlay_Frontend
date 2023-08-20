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
            <a href="/" className="largeText">
              Home
            </a>
          </li>
          <li>
            <a href="/list/district/stadium" className="largeText">
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
          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={66}
                height={65}
                style={{ margin: "5px auto" }}
                viewBox="0 0 66 65"
                fill="none"
                cursor="pointer"
                onClick={handleClickOpen}
              >
                <mask
                  id="mask0_102_2"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={66}
                  height={65}
                >
                  <path
                    d="M65.5 32.5C65.5 50.4493 50.9493 65 33 65C15.0507 65 0.5 50.4493 0.5 32.5C0.5 14.5507 15.0507 0 33 0C50.9493 0 65.5 14.5507 65.5 32.5Z"
                    fill="#C4C4C4"
                  />
                </mask>
                <g mask="url(#mask0_102_2)">
                  <rect
                    x="-4.29508"
                    width="74.8566"
                    height="74.8566"
                    fill="#A4ECC7"
                  />
                  <rect
                    x="26.873"
                    y="47.1516"
                    width="13.0533"
                    height="14.6516"
                    fill="#F8BB46"
                  />
                  <path
                    d="M39.9262 54.6107C34.5309 62.0585 28.976 57.7139 26.873 54.6107L29.5244 63.936L33.0786 74.8566L37.0062 64.0587L39.9262 54.6107Z"
                    fill="#EEEEEE"
                  />
                  <path
                    d="M17.1346 37.6083C15.7877 33.0285 18.3001 30.6961 19.7246 30.1025L21.2787 40.4918C19.2161 40.1264 17.6212 39.2632 17.1346 37.6083Z"
                    fill="#F8BB46"
                  />
                  <path
                    d="M50.1974 38.1411C51.5442 33.5613 49.0319 31.2289 47.6073 30.6352L46.0533 41.0246C48.1159 40.6592 49.7107 39.796 50.1974 38.1411Z"
                    fill="#F8BB46"
                  />
                  <path
                    d="M16.5419 35.0655C16.5419 32.1188 18.7723 29.6504 21.7039 29.3527V29.3527L22.5643 41.6712L22.1557 41.6356C18.9795 41.3592 16.5419 38.7002 16.5419 35.5119V35.5119V35.0655Z"
                    fill="#F8BB46"
                  />
                  <path
                    d="M50.7599 35.0655C50.7599 32.1188 48.5295 29.6504 45.5979 29.3527V29.3527L44.7375 41.6712L45.1461 41.6356C48.3223 41.3592 50.7599 38.7002 50.7599 35.5119V35.5119V35.0655Z"
                    fill="#F8BB46"
                  />
                  <path
                    d="M46.9074 17.2239L48.0108 30.7541C48.0108 30.7541 48.5669 41.2892 42.7699 47.4277C40.6851 49.6355 38.0007 51.7571 33.8054 51.9378C30.2508 52.091 27.4783 50.2427 25.3925 48.3844C20.2896 43.4643 20.2534 39.2276 19.7379 35.2642C19.2224 31.3008 19.1863 28.7041 19.1863 28.7041L20.8412 18.0439L40.8391 10.3904L46.9074 17.2239Z"
                    fill="#FFCC80"
                  />
                  <path
                    d="M26.8371 54.3443L12.7541 60.6155L27.8004 74.8566H38.205L53.7787 60.6155L39.8561 54.3443L33.0027 73.55L26.8371 54.3443Z"
                    fill="#2F4FFF"
                  />
                  <circle cx="27.1393" cy="33.2992" r="1.06557" fill="black" />
                  <circle cx="39.1271" cy="33.2992" r="1.06557" fill="black" />
                  <path
                    d="M36.4261 29.9042C38.2754 28.8817 40.5547 29.5966 41.5982 30.1496C41.6777 30.1918 41.7704 30.2009 41.8556 30.172C42.0783 30.0964 42.1395 29.8116 41.9578 29.6624C39.6733 27.7859 37.2925 28.6076 36.0966 29.454C35.9344 29.5688 35.9574 29.8069 36.1299 29.9055C36.2214 29.9578 36.3339 29.9552 36.4261 29.9042Z"
                    fill="black"
                  />
                  <path
                    d="M30.0855 30.0225C28.3789 29.0009 26.1943 29.5514 25.1904 30.0078C25.1169 30.0412 25.0335 30.0453 24.9581 30.0165C24.7514 29.9377 24.7072 29.6665 24.887 29.5378C27.1042 27.9502 29.3054 28.7978 30.3996 29.6189C30.5487 29.7308 30.5171 29.954 30.3498 30.0362C30.2657 30.0776 30.166 30.0707 30.0855 30.0225Z"
                    fill="black"
                  />
                  <path
                    d="M32.3157 31.0865L30.8266 35.095C30.6328 35.6169 30.1348 35.9631 29.578 35.9631H24.5759C23.9614 35.9631 23.4266 35.5427 23.2816 34.9455L22.3443 31.0865H32.3157ZM32.3157 31.0865L32.632 30.377C32.7787 30.048 33.1052 29.8361 33.4654 29.8361V29.8361C33.8256 29.8361 34.1521 30.048 34.2988 30.377L34.6151 31.0865M34.6151 31.0865L36.1041 35.095C36.298 35.6169 36.796 35.9631 37.3527 35.9631H42.2232C42.8378 35.9631 43.3725 35.5427 43.5176 34.9455L44.4549 31.0865H34.6151Z"
                    stroke="black"
                    strokeWidth="0.665984"
                  />
                  <path
                    d="M32.0153 39.662L31.5086 39.066C31.3614 38.893 31.4844 38.6271 31.7115 38.6271H35.0404C35.2749 38.6271 35.395 38.9082 35.2329 39.0776L34.6338 39.7038C34.4981 39.8457 34.3401 39.9644 34.1661 40.0554L34.1309 40.0737C33.6298 40.3356 33.0322 40.3356 32.531 40.0737C32.3343 39.9709 32.1592 39.8311 32.0153 39.662Z"
                    fill="#FE9902"
                  />
                  <path
                    d="M21.8067 20.5981C21.5938 22.7779 20.6348 27.5702 19.1863 30.6262C18.3033 26.5195 18.3034 23.7013 19.1863 20.5981C18.3568 20.1774 18.0627 19.8914 18.0829 19.2207C19.8759 10.1296 42.9079 3.93113 44.1491 12.8845L44.1955 13.2191C44.285 13.4307 44.3982 13.4345 44.4234 13.4354L44.425 13.4354C49.7209 14.7578 49.0222 25.0978 48.0108 30.1025C45.4429 25.7396 43.8601 23.1727 42.9898 17.0492C40.3258 20.1127 30.0697 23.3094 21.8067 20.5981Z"
                    fill="black"
                  />
                  <path
                    d="M36.5554 44.0982C34.5213 44.7184 31.7604 44.4335 30.2981 44.1487C30.1035 44.1108 29.912 44.2302 29.8653 44.4227C29.8283 44.5752 29.8936 44.7351 30.0295 44.8134C32.7159 46.3617 35.3737 45.9143 36.9822 44.8733C37.1513 44.7639 37.2097 44.5483 37.1342 44.3616C37.0431 44.1362 36.788 44.0273 36.5554 44.0982Z"
                    fill="#FE9902"
                  />
                </g>
              </svg>
            </div>
            {open && (
              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{
                  ".MuiDialog-container": {
                    height: "780px",
                  },
                }}
              >
                <Profile className="profile" onClosed={handleClose} />
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
