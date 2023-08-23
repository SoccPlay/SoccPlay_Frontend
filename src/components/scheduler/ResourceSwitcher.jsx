import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React from "react";
import "./ResourceSwitcher.scss";
import Switcher from "./bookItem/Switcher";

const ResourceSwitcher = () => {
    return (
        <div>
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
                <div className="name-pitch">Sân demo 01</div>
                <div className="name-pitch">Sân demo 02</div>
                <div className="name-pitch">Sân demo 03</div>
                <div className="name-pitch">Sân demo 04</div>
                <div className="name-pitch">Sân demo 05</div>
            </div>
            <div className="ResourceSwitcher-detail">
                <div className="slot">
                    <div className="slot-item">Slot 01</div>
                    <div className="slot-item">Slot 02</div>
                    <div className="slot-item">Slot 03</div>
                    <div className="slot-item">Slot 04</div>
                    <div className="slot-item">Slot 05</div>
                    <div className="slot-item">Slot 06</div>
                    <div className="slot-item">Slot 07</div>
                    <div className="slot-item">Slot 08</div>
                    <div className="slot-item">Slot 09</div>
                    <div className="slot-item">Slot 10</div>
                    <div className="slot-item">Slot 11</div>
                </div>
                <Switcher />
                <Switcher />
                <Switcher />
                <Switcher />
                <Switcher />
            </div>
        </div>
    );
};

export default ResourceSwitcher;
