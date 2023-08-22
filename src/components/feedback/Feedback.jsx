import { Rating, Stack, Typography } from "@mui/material";
import React from "react";
import "./Feedback.scss";
const Feedback = () => {
    return (
        <div className="container-feedback">
            <Stack sx={{ margin: "0px 0px 1% 12%", width: "100%" }} spacing={1}>
                <Rating name="half-rating" defaultValue={5} readOnly />
            </Stack>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={60}
                height={60}
                viewBox="0 0 60 60"
                fill="none"
            >
                <g clipPath="url(#clip0_1_6)">
                    <rect width={60} height={60} rx={30} fill="white" />
                    <rect
                        x={18}
                        y={10}
                        width={24}
                        height={24}
                        rx={12}
                        fill="#FFCB14"
                    />
                    <rect
                        x={-15}
                        y={40}
                        width={90}
                        height={90}
                        rx={45}
                        fill="#FFCB14"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1_6">
                        <rect width={60} height={60} rx={30} fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <div className="feedback-container">
                <Typography className="feedback-text">Sân tốt đó</Typography>
            </div>
        </div>
    );
};

export default Feedback;
