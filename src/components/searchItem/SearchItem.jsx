import React, { useEffect, useState } from "react";
import "./searchItem.css";
import LandApi from "../Axios/LandApi";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ landId }) => {
    const [land, setLand] = useState();
    const [apiDataAvailable, setApiDataAvailable] = useState(false);

    const fetchLands = async ([]) => {
        try {
            const response = await LandApi.GetLandById(landId);
            if (response == null) {
                setApiDataAvailable(false);
            }
            console.log("Land ID:", [response.data]);
            setLand([response.data]);
            setApiDataAvailable(true);
        } catch (error) {
            console.error("API Error:", error);
        }
    };
    const formatPrice = (price) => {
        price = price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
        return price;
    };
    const nagative = useNavigate();
    const handleDetailClick = (landId) => {
        nagative(`/detail/${landId}`);
    };
    useEffect(() => {
        fetchLands([]);
    }, []);

    return (
        <>
            {land &&
                land.map((lands) => {
                    return (
                        <div className="searchItem" key={lands.landId}>
                            <img
                                src={lands.pitchImages}
                                alt=""
                                className="siImg"
                            />
                            <div className="siDesc">
                                <div className="siDesc">
                                    <h1 className="siTitle">
                                        {lands.nameLand}
                                    </h1>
                                    <span className="siDistance">
                                        {lands.location}
                                    </span>
                                    <span className="siTaxiOp">
                                        {lands.description}
                                    </span>
                                    <span className="siSubtitle">
                                        Tổng sân: {lands.totalPitch}
                                    </span>
                                    {/* <span className="siFeatures">{lands.totalPitch}</span> */}
                                    <span className="siCancelOp">
                                        Hủy miễn phí{" "}
                                    </span>
                                    <span className="siCancelOpSubtitle">
                                        Bạn có thể hủy sau khi đặt, đặt ngay hôm
                                        nay để được giá tốt
                                    </span>
                                </div>
                            </div>
                            <div className="siDetails">
                                <div className="siRating">
                                    <span>Khoảng cách</span>
                                    <button>1.2km{lands.km}</button>
                                </div>
                                <div className="siRating">
                                    <span>Đánh giá</span>
                                    <button>{lands.averageRate}</button>
                                </div>
                                <div className="siDetailTexts">
                                    <span className="siPrice">
                                        {
                                            formatPrice(lands.minPrice).split(
                                                "VND"
                                            )[0]
                                        }
                                        - {formatPrice(lands.maxPrice)}
                                    </span>
                                    <div class="container">
                                        <button
                                            className="button"
                                            key={lands.landId}
                                            onClick={() =>
                                                handleDetailClick(lands.landId)
                                            }
                                        >
                                            <div className="button__line"></div>
                                            <div className="button__line"></div>
                                            <span className="button__text">
                                                Chi tiết
                                            </span>
                                            <div className="button__drow1"></div>
                                            <div className="button__drow2"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

export default SearchItem;
