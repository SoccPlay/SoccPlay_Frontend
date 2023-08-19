import { Grid } from "@mui/material";
import React from "react";
import "./BookItem.scss";
import arrow from "../../../assets/arrowRight.png";
import confirm from "../../../assets/confirm.png";
const BookItem = () => {
    return (
        <div>
            <Grid>
                <Grid
                    style={{ width: "100px", height: "100px" }}
                    className="scheduler"
                    xs={12}
                >
                    <Grid className="check-confirm" xs={4}>
                        <p className="desc">Đã được đặt</p>
                        <center>
                            <img className="confirm" src={confirm} alt="" />
                        </center>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default BookItem;
