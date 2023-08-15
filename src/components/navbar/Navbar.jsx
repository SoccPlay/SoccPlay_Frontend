import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import "./style.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Profile from "../../pages/profile/Profile";

export default function Navbar() {
    const [navbarState, setNavbarState] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("localtoken")
    );
    const [open, setOpen] = React.useState(false);

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
                        96 ground
                    </div>
                    <div className="toggle">
                        {navbarState ? (
                            <VscChromeClose
                                onClick={() => setNavbarState(false)}
                            />
                        ) : (
                            <GiHamburgerMenu
                                onClick={() => setNavbarState(true)}
                            />
                        )}
                    </div>
                </div>

                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/list">Ground</a>
                    </li>
                    <li>
                        <a href="/">About</a>
                    </li>
                </ul>
                {isLoggedIn ? (
                    <div>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Edit Profile
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
                        <a
                            href="#services"
                            onClick={() => setNavbarState(false)}
                        >
                            About
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
