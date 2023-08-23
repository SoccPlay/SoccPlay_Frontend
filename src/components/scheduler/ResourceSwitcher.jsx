import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

import "./ResourceSwitcher.scss";
import Switcher from "./bookItem/Switcher";
import { useState } from "react";

const slot = [
    "Slot 01, 07:00 -> 08:00, 100.000vnd",
    "Slot 02, 08:00 -> 09:00, 100.000vnd",
    "Slot 03, 09:00 -> 10:00, 100.000vnd",
    "Slot 04, 15:00 -> 16:00, 100.000vnd",
    "Slot 05, 16:00 -> 17:00, 100.000vnd",
    "Slot 06, 17:00 -> 18:00, 100.000vnd",
    "Slot 07, 18:00 -> 19:00, 100.000vnd",
    "Slot 08, 19:00 -> 20:00, 100.000vnd",
    "Slot 09, 21:00 -> 22:00, 100.000vnd",
];

const TIME = [
    "07:00 -> 08:00",
    "08:00 -> 09:00",
    "09:00 -> 10:00",
    "15:00 -> 16:00",
    "16:00 -> 17:00",
    "17:00 -> 18:00",
    "18:00 -> 19:00",
    "19:00 -> 20:00",
    "20:00 -> 21:00",
    "21:00 -> 22:00",
];

const NamePitch = [
    "Sân demo 01",
    "Sân demo 02",
    "Sân demo 03",
    "Sân demo 04",
    "Sân demo 05",
];

// const handleName

const ResourceSwitcher = () => {
    return (
        <div className="cssTotal">
            <div className="resourceSwitcher">
                <div className="select-flex">
                    <LocalizationProvider
                        dateFormats={"DD/MM/YYYY"}
                        dateAdapter={AdapterDayjs}
                    >
                        <DemoContainer
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                paddingBottom: "3%",
                                borderBottom: "1px solid #ffffff",
                            }}
                            components={["DatePicker"]}
                        >
                            <p
                                style={{
                                    paddingTop: "12.5px",
                                }}
                            >
                                Ngày đặt:{" "}
                            </p>
                            <DatePicker
                                label="DD-MM-YYYY"
                                disablePast
                                format="DD-MM-YYYY"
                                defaultValue={dayjs()}
                                // onChange={handleDateChange}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Box
                        sx={{
                            minWidth: 80,
                            marginTop: 2,
                        }}
                    >
                        Chọn sân:
                        <FormControl sx={{ width: "40%", marginLeft: "15px" }}>
                            <InputLabel id="demo-simple-select-label">
                                Size
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={size}
                                label="Size"
                                // onChange={handleSize}
                            >
                                <MenuItem value={5}>Sân 5</MenuItem>
                                <MenuItem value={7}>Sân 7</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                {NamePitch.map((item) =>
                    item ? (
                        <div className="name-pitch">{item}</div>
                    ) : (
                        <div className="name-null">null</div>
                    )
                )}
            </div>
            <div className="ResourceSwitcher-detail">
                <div className="slot">
                    {slot.map((item) => (
                        <>
                            <div className="slot-item">
                                {item.split(",")[0]}:
                                <span>{item.split(",")[1]}</span>
                                <div
                                    className="slot-price"
                                    style={{ color: "red", fontWeight: "600" }}
                                >
                                    {item.split(",")[2]}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <div className="child">
                    <Switcher />
                    <Switcher />
                    <Switcher />
                    <Switcher />
                    <Switcher />
                    <Switcher />
                </div>
            </div>
        </div>
    );
};

export default ResourceSwitcher;
