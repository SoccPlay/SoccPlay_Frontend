import React from "react";
import "./style.scss";
import { BsLinkedin, BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
export default function Footer() {
    return (
        <div className="FooterContainer">
            <span>Copyright &copy; 2023 SWP391. All rights reserved</span>
            <ul className="links">
                <li>
                    <a href="#hero">Home</a>
                </li>
                <li>
                    <a href="#recommend">Ground</a>
                </li>
                <li>
                    <a href="#services">About</a>
                </li>
            </ul>
            <ul className="social__links">
                <li>
                    <BsFacebook />
                </li>
                <li>
                    <AiFillInstagram />
                </li>
                <li>
                    <BsLinkedin />
                </li>
            </ul>
        </div>
    );
}
