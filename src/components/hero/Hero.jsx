import React, { useState } from "react";
import homeImage from "../../assets/sanbong.jpg";
import "./style.scss";
import { Typewriter, Cursor } from "react-simple-typewriter";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
export default function Hero() {
    const street = [
        { value: "Thủ Đức", label: "Thủ Đức" },
        {
            value: "Quận 2",
            label: "Quận 2",
        },
        { value: "Quận 3", label: "Quận 3" },
        { value: "Quận 4", label: "Quận 4" },
        { value: "Quận 5", label: "Quận 5" },
        { value: "Quận 6", label: "Quận 6" },
        { value: "Quận 7", label: "Quận 7" },
        { value: "Quận 8", label: "Quận 8" },
        { value: "Quận 9", label: "Quận 9" },
        { value: "Quận 10", label: "Quận 10" },
        { value: "Quận 11", label: "Quận 11" },
        { value: "Quận 12", label: "Quận 12" },
        { value: "Tân Bình", label: "Tân Bình" },
        { value: "Gò Vấp", label: "Gò Vấp" },
    ];
    const [selectedStreet, setSelectedStreet] = useState("Quận");
    const [groundName, setGroundName] = useState("Sân Bóng");
    const nagative = useNavigate();

    const handleSearch = async () => {
        if (selectedStreet) {
            nagative(`/list/${selectedStreet}/${groundName}`);
        }
    };
    return (
        <div className="Section" id="hero">
            <div className="background">
                <img src={homeImage} alt="" />
            </div>
            <div className="content">
                <div className="title">
                    <h1
                        style={{
                            fontFamily: "Montserrat, sans-serif",
                        }}
                    >
                        Đặt một nơi đá bóng{" "}
                        <span style={{ fontWeight: "bold", color: "red" }}>
                            <Typewriter
                                words={["chất lượng", "dễ dàng"]}
                                loop={2}
                                typeSpeed={60}
                                deleteSpeed={40}
                                delaySpeed={2000}
                            />
                        </span>
                        <span style={{ color: "red" }}>
                            <Cursor cursorStyle="<"></Cursor>
                        </span>
                    </h1>
                    <p
                        style={{
                            fontFamily: "Montserrat, sans-serif",
                        }}
                    >
                        Đặt một nơi sân đá bóng gần bạn chỉ cần ấn chuột vào
                        dưới đây để search
                    </p>
                </div>
                <div className="search">
                    <div className="container">
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            name="color"
                            options={street}
                            placeholder="Tìm nơi"
                            onChange={(selectedOption) =>
                                setSelectedStreet(selectedOption.value)
                            }
                        />
                    </div>
                    <div className="container">
                        <label htmlFor="">Sân Bóng</label>
                        <input
                            type="text"
                            placeholder="Tìm Sân Bóng"
                            //value={groundName}
                            onChange={(e) => setGroundName(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>
    );
}
