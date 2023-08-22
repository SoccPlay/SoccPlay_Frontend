import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarDataAdmin } from "../../../Pagination/Data";
import { SidebarDataCompany } from "../../../Pagination/Data";
// import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import "../components/sideBar.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import EditProfile from "./EditProfile";
import CustomizedTables from "./History";
const Sidebar = () => {
    const [selected, setSelected] = useState(0);
    const [showRightSide, setShowRightSide] = useState(false);
    const [userRole, setUserRole] = useState(localStorage.getItem("ROLE"));
    const [user, setUsername] = useState(localStorage.getItem("USERNAME"));
    const navigate = useNavigate();

    const [expanded, setExpaned] = useState(true);

    const sidebarVariants = {
        true: {
            left: "0",
        },
        false: {
            left: "-60%",
        },
    };
    console.log(userRole);
    const [id, setId] = useState("");
    const currentSidebarData =
        userRole === "CUSTOMER" ? SidebarDataAdmin : SidebarDataCompany;
    const sidebarComponentsAdmin = [
        // <CustomizedTable />,
        <CustomizedTables />,
        <EditProfile />,
    ];
    const sidebarComponentsCompany = [<CustomizedTables />];
    const renderRightSide = () => {
        if (userRole === "CUSTOMER") {
            return selected < 6;
        } else if (userRole === "COMPANY") {
            return selected === 1;
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
    const ADMIN = "CUSTOMER";
    const COMPANY = "Company";
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
                            <span className="company">{COMPANY}</span>
                        )}
                    </span>
                </div>
                {currentSidebarData.map((item, index) => {
                    return (
                        <div
                            className={
                                selected === index
                                    ? "menuItem active"
                                    : "menuItem"
                            }
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
