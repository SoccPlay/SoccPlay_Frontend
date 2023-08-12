import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "./style.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [navbarState, setNavbarState] = useState(false);

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
                        <a href="/">Ground</a>
                    </li>
                    <li>
                        <a href="/">About</a>
                    </li>
                </ul>
                <Link to="/signin">
                    <button>Login</button>
                </Link>
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
                    <li>
                        <a
                            href="#recommend"
                            onClick={() => setNavbarState(false)}
                        >
                            Places
                        </a>
                    </li>
                    <li>
                        <a
                            href="#testimonials"
                            onClick={() => setNavbarState(false)}
                        >
                            Testimonials
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
