import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import * as SchedulerApi from "../Axios/Scheduler";
import "./ResourceSwitcher.scss";
import Switcher from "./bookItem/Switcher";

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

const ResourceSwitcher = ({ landId }) => {
    const [schedules, setSchedule] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [day, setDay] = useState(() => {
        return dayjs().format("DD-MM-YYYY");
    });
    const [size, setSize] = useState(5);

    const handleDayChange = (e) => {
        const element = e.toISOString().split("T")[0];
        const dateFormat = dayjs(element).format("DD-MM-YYYY");
        setDay(dateFormat);
        console.log(dateFormat);
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    useEffect(() => {
        const fetchSchedule = async () => {
            const response = await SchedulerApi.getScheduler(landId, day, size);
            const minPrice = response.map((item) => item.priceMin);
            const maxPrice = response.map((item) => item.priceMax);
            setMinPrice(minPrice[0]);
            setMaxPrice(maxPrice[0]);
            setSchedule(response);
        };
        fetchSchedule();
    }, [landId, day, size]);

    const formatPrice = (price) => {
        return price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    };

    const slot = [
        `Slot 01, 07:00 -> 08:00, ${formatPrice(minPrice)}`,
        `Slot 02, 08:00 -> 09:00, ${formatPrice(minPrice)}`,
        `Slot 03, 09:00 -> 10:00, ${formatPrice(minPrice)}`,
        `Slot 04, 15:00 -> 16:00, ${formatPrice(maxPrice)}`,
        `Slot 05, 16:00 -> 17:00, ${formatPrice(maxPrice)}`,
        `Slot 06, 17:00 -> 18:00, ${formatPrice(maxPrice)}`,
        `Slot 07, 18:00 -> 19:00, ${formatPrice(maxPrice)}`,
        `Slot 08, 19:00 -> 20:00, ${formatPrice(maxPrice)}`,
        `Slot 09, 21:00 -> 22:00, ${formatPrice(maxPrice)}`,
    ];

    return (
        <>
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
                                    name="date"
                                    label="DD-MM-YYYY"
                                    disablePast
                                    format="DD-MM-YYYY"
                                    defaultValue={dayjs()}
                                    onChange={handleDayChange}
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
                            <FormControl
                                sx={{ width: "40%", marginLeft: "15px" }}
                            >
                                <InputLabel id="demo-simple-select-label">
                                    Size
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={size}
                                    label="Size"
                                    onChange={handleSizeChange}
                                >
                                    <MenuItem value={5}>Sân 5</MenuItem>
                                    <MenuItem value={7}>Sân 7</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    {schedules &&
                        schedules.map((item) => (
                            <div key={item.pitchId} className="name-pitch">
                                {item.name}
                            </div>
                        ))}
                </div>
                {slot.map((time) => (
                    <div className="ResourceSwitcher-detail">
                        <div className="slot">
                            <>
                                <div
                                    key={time.split(",")[1]}
                                    className="slot-item"
                                >
                                    {time.split(",")[0]}:
                                    <span>{time.split(",")[1]}</span>
                                    <div
                                        className="slot-price"
                                        style={{
                                            color: "red",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {time.split(",")[2]}
                                    </div>
                                </div>
                            </>
                        </div>

                        {schedules &&
                            schedules.map((item) => {
                                let isBooked = false;

                                item.schedules.forEach((schedule) => {
                                    const startTime = schedule.starTime;
                                    const endTime = schedule.endTime;
                                    if (time >= startTime && time <= endTime) {
                                        isBooked = true;
                                    }
                                });
                                return (
                                    <div
                                        className="child"
                                        key={time.split(",")[1]}
                                    >
                                        {isBooked ? "-" : <Switcher />}
                                    </div>
                                );
                            })}
                    </div>
                ))}
            </div>
        </>
    );
};

// {TIME.map((time) => (
//     <TableRow key={time}>
//         <TableCell>{time}</TableCell>
//         {schedules &&
//             schedules.map((item) => {
//                 let isBooked = false;

//                 item.schedules.forEach((schedule) => {
//                     const startTime = schedule.starTime;
//                     const endTime = schedule.endTime;
//                     if (time >= startTime && time <= endTime) {
//                         isBooked = true;
//                     }
//                 });
//                 return (
//                     <TableCell key={item.pitchId}>
//                         {isBooked ? (
//                             <span style={{ color: "red" }}>
//                                 {BookItem()}
//                             </span>
//                         ) : (
//                             "-"
//                         )}
//                     </TableCell>
//                 );
//             })}
//     </TableRow>
// ))}

export default ResourceSwitcher;
