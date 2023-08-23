import StarIcon from "@mui/icons-material/Star";
import { Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LandApi from "../../components/Axios/LandApi";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import FullWidthTabs from "./Tabs";
import "./detail.css";
export default function Detail() {
    const { landId } = useParams();
    const [land, setLand] = useState();
    const [selectedImage, setSelectedImage] = useState("");
    const fetchLands = async ([]) => {
        try {
            const response = await LandApi.GetLandById(landId);
            if (response == null) {
            }
            console.log("Land ID:", [response.data]);
            setLand([response.data]);
            setSelectedImage(response.data.image);
        } catch (error) {
            console.error("API Error:", error);
        }
    };
    useEffect(() => {
        fetchLands([]);
    }, []);

    const formatPrice = (price) => {
        return price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    };
    return (
        <div className="detail">
            <Navbar />
            {land &&
                land.map((lands) => {
                    return (
                        <div className="detail-all" key={lands.landId}>
                            <h1 style={{ color: "#000" }}>{lands.nameLand}</h1>
                            <h1 style={{ color: "#000" }}>
                                {formatPrice(lands.minPrice).split("VND")[0]} -{" "}
                                {formatPrice(lands.maxPrice)}
                            </h1>
                            <div className="address">
                                {lands.averageRate}
                                <Icon className="icon">
                                    <StarIcon />
                                </Icon>
                                ({lands.totalPitch} đánh giá) - {lands.location}
                            </div>

                            <div className="img">
                                <div className="main-image">
                                    <img
                                        src={selectedImage}
                                        alt={lands.nameLand}
                                    />
                                </div>
                                <div className="sub-images">
                                    {lands.pitchImages.map((pitch) => (
                                        <img
                                            src={pitch}
                                            alt={lands.nameLand}
                                            onClick={() =>
                                                setSelectedImage(pitch)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="tab">
                                <FullWidthTabs
                                    key={lands.landId}
                                    landId={lands.landId}
                                />
                            </div>
                        </div>
                    );
                })}
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}
