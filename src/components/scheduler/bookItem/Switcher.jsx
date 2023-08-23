import React, { useState } from "react";
import "./Switcher.scss";
const Switcher = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className={`switcher-container ${isClicked ? "clicked" : ""}`}
      >
        <div className="switcher-con">
          <div className="switcher-title">Sân 5 </div>
          <div className="switcher-time">Còn trống</div>
        </div>
      </div>
    </>
  );
};

export default Switcher;
