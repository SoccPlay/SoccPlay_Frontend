import { Rating, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as FeedbackApi from "../Axios/FeedBackApi";
import "./Feedback.scss";
const Feedback = ({ landId }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await FeedbackApi.getFeedBackByLandId(landId);
            setData(res.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            {data &&
                data.map((item) => {
                    return (
                        <div className="container-feedback">
                            <Stack
                                sx={{ margin: "0px 0px 1% 12%", width: "100%" }}
                                spacing={1}
                            >
                                <Rating
                                    name="half-rating"
                                    defaultValue={item.rate}
                                    readOnly
                                />
                            </Stack>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={60}
                                height={60}
                                viewBox="0 0 60 60"
                                fill="none"
                            >
                                <g clipPath="url(#clip0_1_6)">
                                    <rect
                                        width={60}
                                        height={60}
                                        rx={30}
                                        fill="white"
                                    />
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
                                        <rect
                                            width={60}
                                            height={60}
                                            rx={30}
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div className="feedback-container">
                                <Typography className="feedback-text">
                                    {item.description === ""
                                        ? "Lần đầu đặt sân ở đây, mặc dù thiết kế hơi xấu nhưng chất lượng tuyệt vời, cho 5 sao để ủng hộ UI"
                                        : item.description}
                                </Typography>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Feedback;
