import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WifiIcon from "@mui/icons-material/Wifi";
import { Icon, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import "../detail/tabs.css";
import BookingApi from "../../components/Axios/BookingApi";
import LandApi from "../../components/Axios/LandApi";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { time } from "./TimeConstant";
import dayjs from "dayjs";
import Popup from "./Popup";
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

export default function FullWidthTabs({ landId }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [customerId, setCustomerId] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [dateBooking, setDateBooking] = useState("");
  const dateFormat = dayjs().format("DD-MM-YYYY");
  const [date, setDate] = useState(dateFormat);
  const [size, setSize] = useState(5);
  const [selectedHours, setSelectedHours] = useState({
    hourFrom: null,
    hourTo: null,
  });

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

  const handleHourChange = (event) => {
    const { name, value } = event.target;

    setSelectedHours((prevData) => {
      if (name === "from") {
        return {
          ...prevData,
          hourFrom: value,
        };
      } else if (name === "to" && Number(value) > Number(prevData.hourFrom)) {
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

  const [bookings, setBooking] = useState([]);
  const fetchLands = async () => {
    setError(null);
    try {
      const response = await LandApi.GetLandById(landId);
      setCustomerId(localStorage.getItem("CUSTOMERID"));
      if (response == null) {
      }
      console.log("Land ID:", [response.data]);
    } catch (error) {
      console.error("API Error:", error);
      setError(error.response);
    }
  };
  console.log("Size: " + size);

  const handleBookingType5 = async () => {
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
    };
    setError(null);
    try {
      const response = await BookingApi.CreateBooking(bookingData);
      console.log("Booking response:", response);
      setBooking("BOOKING SUSSESSFULL");
    } catch (error) {
      console.error("Error creating booking:", error.response.data.Messages);
      setError(error.response.data.Messages);
    }
  };

  useEffect(() => {
    console.log("CustomerId: " + customerId);
    fetchLands();
  }, [customerId]);
  return (
    <Box sx={{ bgcolor: "background.paper", width: 1200 }}>
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
                        <MenuItem value={5}>Sân 5</MenuItem>
                        <MenuItem value={7}>Sân 7</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </DemoContainer>
              </LocalizationProvider>
              <Popup data={data} />
            </div>

            <div className="right-column">
              <p
                style={{
                  paddingTop: "12.5px",
                  display: "inline",
                }}
                className="booking-time"
              >
                Giờ đặt
              </p>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <Box sx={{ width: 100, marginRight: 1 }}>
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
                      {Object.keys(time).map((item, pos) => {
                        return (
                          <MenuItem key={pos} value={item}>
                            {time[item]}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <span
                  style={{
                    margin: "auto 0",
                    fontSize: "20px",
                  }}
                >
                  ~
                </span>
                <Box sx={{ width: 100, marginLeft: 1 }}>
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
                      {Object.keys(time).map((item, pos) => {
                        return (
                          <MenuItem key={pos} value={item}>
                            {time[item]}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
          </div>
          {bookings && (
            <Typography
              variant="body1"
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "red",
              }}
            >
              {bookings}
            </Typography>
          )}
          {error && (
            <Typography
              variant="body1"
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "red",
              }}
            >
              {error}
            </Typography>
          )}
          <div className="button-booking">
            <button
              style={{ width: "200px", margin: "30px 460px" }}
              className="check-calender"
              onClick={() => handleBookingType5()}
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
        ĐÁNH GIÁ
      </TabPanel>
      {/* </SwipeableViews> */}
    </Box>
  );
}
