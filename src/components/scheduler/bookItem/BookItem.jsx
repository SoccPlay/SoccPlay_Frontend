import { Grid } from "@mui/material";
import React from "react";
import "./BookItem.scss";
import arrow from "../../../assets/arrowRight.png";
import confirm from "../../../assets/confirm.png";
const BookItem = () => {
  return (
    <div
    // style={{ backgroundColor: "red" }}
    >
      <img
        className="confirm"
        src={confirm}
        alt=""
        style={{ width: "20px", height: "20px" }}
      />
    </div>
  );
};

export default BookItem;
