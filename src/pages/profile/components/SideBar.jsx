import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarDataAdmin, SidebarDataCompany } from "../../../Pagination/Data";
// import { motion } from "framer-motion";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useHistory and useLocation
import HistoryBooking from "../../owner/components/HistoryBook";
import Lands from "../../owner/components/Land";
import Prices from "../../owner/components/Price";
import "../components/sideBar.css";
import EditProfile from "./EditProfile";
import CustomizedTables from "./History";
import Pitch from "pages/owner/components/Pitch";
import Dashboard from "pages/owner/components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import Feedback from "pages/owner/components/Feedback";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [showRightSide, setShowRightSide] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem("ROLE"));
  const [user, setUsername] = useState(localStorage.getItem("USERNAME"));
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  const currentSidebarData =
    userRole === "CUSTOMER" ? SidebarDataAdmin : SidebarDataCompany;
  const sidebarComponentsAdmin = [<CustomizedTables />, <EditProfile />];
  const sidebarComponentsCompany = [
    <Lands />,
    <Pitch />,
    <HistoryBooking />,
    <Dashboard />,
    <Feedback />,
  ];
  const renderRightSide = () => {
    if (userRole === "CUSTOMER") {
      return selected < 3;
    } else if (userRole === "OWNER") {
      return selected < 5;
    } else {
      return null;
    }
  };
  useEffect(() => {}, [selected, userRole]);

  const handleSidebarItemClick = (index) => {
    // console.log(token);
    setSelected(index);
  };

  const handleSubmitLogOut = (e) => {
    e.preventDefault();
    // localStorage.clear(); // Removes all data from localStorage
    // sessionStorage.clear();
    navigate("/");
  };
  const COMPANY = "OWNER";
  console.log(window.innerWidth);
  return (
    <>
      {/* <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div> */}
      <Box
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      ></Box>

      <div className="menu">
        <div className="logo">
          {/* <img src={Destination1} alt="logo" /> */}
          <span>
            {userRole === "CUSTOMER" ? (
              <span className="admin">{user}</span>
            ) : (
              <span className="company">{user}</span>
            )}
          </span>
        </div>
        {currentSidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => handleSidebarItemClick(index)} // Call the click handler with the index of the clicked item
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        <div className="menuItem">
          <UilSignOutAlt onClick={handleSubmitLogOut}></UilSignOutAlt>
        </div>
      </div>
      {userRole === "CUSTOMER"
        ? sidebarComponentsAdmin[selected]
        : sidebarComponentsCompany[selected]}

      {renderRightSide()}
    </>
  );
};

export default Sidebar;
