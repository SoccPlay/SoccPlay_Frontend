import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// import SwipeableViews from "react-swipeable-views";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import WifiIcon from "@mui/icons-material/Wifi";
import { FormControl, Icon, InputLabel, MenuItem, Select } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import BookingApi from "../../components/Axios/BookingApi";
import LandApi from "../../components/Axios/LandApi";
import { withSnackbar } from "../../hook/withSnackbar";
import "../detail/tabs.css";
import Popup from "./Popup";
import { time } from "./TimeConstant";
import Feedback from "../../components/feedback/Feedback";
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

function FullWidthTabs({ landId, snackbarShowMessage }) {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [customerId, setCustomerId] = useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [dateBooking, setDateBooking] = useState(() => {
        return dayjs().toISOString().split("T")[0];
    });
    const [date, setDate] = useState(() => {
        return dayjs().format("DD-MM-YYYY");
    });
    const [size, setSize] = useState(5);
    const [selectedHours, setSelectedHours] = useState({
        hourFrom: null,
        hourTo: null,
    });
    const [note, setNote] = useState("");

    const data = {
        landId: landId,
        date: date,
        size: size,
    };

    const handleDateChange = (date) => {
        const element = date.toISOString().split("T")[0];
        const dateFormat = dayjs(element).format("DD-MM-YYYY");
        setDate(dateFormat);
        setDateBooking(element);

        console.log("Element: " + element);
    };

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    const handleHourChange = (event) => {
        const { name, value } = event.target;

        setSelectedHours((prevData) => {
            if (name === "from") {
                return {
                    ...prevData,
                    hourFrom: value,
                };
            } else if (
                name === "to" &&
                Number(value) > Number(prevData.hourFrom)
            ) {
                return {
                    ...prevData,
                    hourTo: value,
                };
            }
            //   const startTime = time[prevData.hourFrom];
            //   const endTime = time[prevData.hourTo];

            return prevData;
        });
    };

    const handleSize = (event) => {
        setSize(event.target.value);
    };
    //   console.log("DateFormat: " + date);
    //   console.log("Size: " + size);
    //   console.log("StartTime:", time[selectedHours.hourFrom]);
    //   console.log("EndTime:", time[selectedHours.hourTo]);

    const fetchLands = async () => {
        try {
            const response = await LandApi.GetLandById(landId);
            setCustomerId(localStorage.getItem("CUSTOMERID"));
            if (response == null) {
            }
            console.log("Land ID:", [response.data]);
        } catch (error) {
            console.error("API Error:", error);
        }
    };
    console.log("Size: " + size);

    const handleBookingType5 = async () => {
        setLoading(true);
        if (!customerId) {
            navigate("/signin");
            return;
        }
        const start = `${dateBooking}T${time[selectedHours.hourFrom]}:00.000Z`;
        const end = `${dateBooking}T${time[selectedHours.hourTo]}:00.000Z`;

        console.log("Start: " + start);
        console.log("End: " + end);

    const bookingData = {
      landId: landId,
      Note: "DUY",
      Size: size,
      starTime: start,
      endTime: end,
      customerId: customerId,
      price: priceText,
    };
    try {
      const response = await BookingApi.CreateBooking(bookingData);
      console.log("Booking response:", response.data);
      snackbarShowMessage("Đặt sân thành công", "success");
    } catch (error) {
      console.error("Error creating booking:", error.response.data.Messages);

      snackbarShowMessage(error.response.data.Messages, "error");
    } finally {
      setLoading(false);
    }
  };
  const [priceText, setPriceText] = useState();
  const [count, setCount] = useState(0);
  const [showBookingButton, setShowBookingButton] = useState(false);

  const handlePriceChange = async () => {
    // Calculate the price difference and update the state
    const start = `${dateBooking}T${time[selectedHours.hourFrom]}:00.000Z`;
    const end = `${dateBooking}T${time[selectedHours.hourTo]}:00.000Z`;
    const bookingData = {
      landId: landId,
      size: size,
      starTime: start,
      endTime: end,
    };
    try {
      const response = await BookingApi.Calculator(bookingData);
      console.log("Giá Tiền:", response.data);
      snackbarShowMessage("Xem Giá Thành Công", "success");
      setPriceText(response.data);
      setShowBookingButton(true);
      setCount(count + 1);
    } catch (error) {
      console.error("Error creating booking:", error.response.data);

    useEffect(() => {
        console.log("CustomerId: " + customerId);
        fetchLands();
    }, [customerId]);
    return (
        <Box
            sx={{ bgcolor: "background.paper", width: 1200, paddingBottom: 22 }}
        >
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Đặt sân" {...a11yProps(0)} />
                    <Tab label="TIỆN ích" {...a11yProps(1)} />
                    <Tab label="ĐÁNH giá" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} dir={theme.direction}>
                <div className="content-center">
                    <div className="table-container">
                        <h3>Đặt sân</h3>
                    </div>
                    <div className="flex">
                        <div className="left-column">
                            <LocalizationProvider
                                dateFormats={"DD/MM/YYYY"}
                                dateAdapter={AdapterDayjs}
                            >
                                <DemoContainer
                                    style={{ display: "contents" }}
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
                                        onChange={handleDateChange}
                                    />
                                    <Box sx={{ minWidth: 80 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Size
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={size}
                                                label="Size"
                                                onChange={handleSize}
                                            >
                                                <MenuItem value={5}>
                                                    Sân 5
                                                </MenuItem>
                                                <MenuItem value={7}>
                                                    Sân 7
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </DemoContainer>
                            </LocalizationProvider>
                            <textarea
                                style={{
                                    margin: "1rem 0px 0px 5rem",
                                    width: "65%",
                                    height: "50%",
                                    border: "1px solid #ccc",
                                }}
                                placeholder="Ghi chú cho chủ sân"
                                minRows={4}
                                size="lg"
                                onChange={handleNoteChange}
                            />
                            <Popup data={data} />
                        </div>
                        <div className="right-column">
                            <div>
                                <p
                                    style={{
                                        margin: "0.5rem",
                                        fontSize: "16px",
                                        textAlign: "center",
                                    }}
                                    className="booking-time"
                                >
                                    Giờ đặt
                                </p>

                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel id="from">From</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="from-select"
                                            value={selectedHours.hourFrom}
                                            label="from"
                                            name="from"
                                            onChange={handleHourChange}
                                        >
                                            {Object.keys(time).map(
                                                (item, pos) => {
                                                    return (
                                                        <MenuItem
                                                            key={pos}
                                                            value={item}
                                                        >
                                                            {time[item]}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <span
                                    style={{
                                        margin: "auto auto",
                                        fontSize: "20px",
                                    }}
                                >
                                    -
                                </span>
                                <Box>
                                    <FormControl fullWidth>
                                        <InputLabel id="to">To</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="to-select"
                                            value={selectedHours.hourTo}
                                            label="to"
                                            name="to"
                                            onChange={handleHourChange}
                                        >
                                            {Object.keys(time).map(
                                                (item, pos) => {
                                                    return (
                                                        <MenuItem
                                                            key={pos}
                                                            value={item}
                                                        >
                                                            {time[item]}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                    </div>

                    <div className="button-booking">
                        <button
                            style={{ width: "200px", margin: "30px 460px" }}
                            className="check-calender"
                            onClick={() => handleBookingType5()}
                            disabled={loading}
                        >
                            BOOKING
                        </button>
                    </div>
                </div>
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
                <div className="tienIch">
                    <div>
                        <Icon className="icon">
                            <WifiIcon />
                        </Icon>{" "}
                        Wifi
                    </div>
                    <div>
                        <Icon className="icon">
                            <MicrowaveIcon />
                        </Icon>{" "}
                        Căn tin
                    </div>
                    <div>
                        <Icon className="icon">
                            <LiveTvIcon />
                        </Icon>{" "}
                        Trực tiêp
                    </div>
                    <div>
                        <Icon className="icon">
                            <DirectionsCarIcon />
                        </Icon>{" "}
                        Giữ xe
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <div className="feedback">
                    <Feedback />
                    <div className="column-straight"></div>

                    <div className="form-feedback">
                        <h1>Đánh giá của bạn</h1>
                    </div>
                </div>
            </TabPanel>
            {/* </SwipeableViews> */}
        </Box>
    );
}

export default withSnackbar(FullWidthTabs);
