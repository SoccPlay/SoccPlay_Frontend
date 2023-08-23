import React from "react";
import "./Switcher.scss";
const Switcher = () => {
    return (
        <>
            <div className="switcher-container">
                <div className="switcher-title">Sân 5 tại sân gia phát</div>
                <div className="switcher-time">6:00-7:00</div>
                <div className="switcher-price">
                    100.000 <span className="switcher-currency">vnd</span>
                </div>
            </div>
        </>
    );
};

export default Switcher;
