import React, { useEffect, useState } from "react";
import "./style.scss";
import LandApi from "../Axios/LandApi";
import { Rating, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

export default function ShowListPitchNear() {
    const [value, setValue] = useState(5);
    const [land, setLand] = useState([]);
    const fetchLands = async ([]) => {
        try {
            const response = await LandApi.GetAllLand();
            if (response == null) {
            }
            console.log("Land Response:", [response.data]);
            setLand(response.data);
        } catch (error) {
            console.error("API Error:", error);
        }
    };
    const sortLand = [...land]
        .sort((a, b) => b.totalPitch - a.totalPitch)
        .slice(0, 6);
    const nagative = useNavigate();

    const handleClick = (landId) => {
        nagative(`/detail/${landId}`);
    };
    useEffect(() => {
        fetchLands([]);
    }, []);
    return (
        <div className="Section" id="recommend">
            <Typography className="typography" style={{ fontSize: 28 }}>
                SHOW LIST THE MOST TOTAL PITCH
            </Typography>
            <div className="destinations">
                {sortLand &&
                    sortLand.map((lands) => {
                        return (
                            <div
                                className="destination"
                                key={`${lands.landId}`}
                                onClick={() => handleClick(lands.landId)}
                            >
                                <img src={lands.image} alt="" />
                                <h1>{lands.nameLand}</h1>
                                <p>
                                    {lands.title.length >= 150
                                        ? `${lands.title.substring(0, 150)}...`
                                        : lands.title}
                                </p>
                                <div className="distance">
                                    <p>ToTal Pitch: {lands.totalPitch}</p>
                                    <Rating
                                        name="read-only"
                                        value={lands.averageRate}
                                        readOnly
                                        size="small"
                                    />
                                </div>

                                <div className="info">
                                    <p>Price</p>
                                    <b>
                                        {lands.minPrice} VND - {lands.maxPrice}{" "}
                                        VND / Trận
                                    </b>
                                </div>
                                <div className="distance">
                                    <span>{lands.location}</span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
