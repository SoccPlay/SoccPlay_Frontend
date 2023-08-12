import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./style.scss";
export default function ScrollToTop() {
    const [scrollState, setScrollState] = useState(false);

    const toTop = () => {
        window.scrollTo({ top: 0 });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 200) {
                setScrollState(true);
            } else {
                setScrollState(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const divStyle = {
        display: scrollState ? "block" : "none",
    };

    return (
        <div className="ToTop" onClick={toTop} style={divStyle}>
            <img src={logo} alt="" />
        </div>
    );
}
