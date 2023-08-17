import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WifiIcon from "@mui/icons-material/Wifi";
import { Icon, Button } from "@mui/material";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import "../detail/tabs.css";
import BookingApi from "../../components/Axios/BookingApi";
import LandApi from "../../components/Axios/LandApi";
import { useParams } from "react-router-dom";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [size5, setSize5] = useState({ count: 1 });
  const [size7, setSize7] = useState({ count: 1 });

  const handleIncreaseSize5 = (id) => {
    setSize5({ ...size5, count: size5.count + 1 });
  };

  const handleDecreaseSize5 = (id) => {
    setSize5({ ...size5, count: size5.count - 1 });
  };

  const handleIncreaseSize7 = (id) => {
    setSize7({ ...size7, count: size7.count + 1 });
  };

  const handleDecreaseSize7 = (id) => {
    setSize7({ ...size7, count: size7.count - 1 });
  };
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [customerId, setCustomerId] = useState(
    "3821B23D-0D0B-46B0-CF33-08DB9E860EBE"
  );
  const [sizeType5, setSizeR5] = useState([5]);
  const [sizeType7, setSizeR7] = useState([7]);

  console.log(startTime, "date", endTime, "dateend");

  const [bookings, setBooking] = useState();
  const fetchLands = async ([]) => {
    try {
      const response = await LandApi.GetLandById(landId);

      if (response == null) {
      }
      console.log("Land ID:", [response.data]);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const handleBookingType5 = async () => {
    const bookingData = {
      landId: landId,
      Note: "DUY",
      size: sizeType5,
      starTime: [startTime],
      endTime: [endTime],
      customerId: customerId,
    };
    const response = await BookingApi.CreateBooking(bookingData)
      .then((response) => response.text())
      .then((data) => {
        console.log("Booking response:", data);
        // You can handle the response here as needed
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
      });
  };
  const handleBookingType7 = async () => {
    const bookingData = {
      landId: landId,
      Note: "DUY",
      size: sizeType7,
      starTime: [startTime],
      endTime: [endTime],
      customerId: customerId,
    };
    const response = await BookingApi.CreateBooking(bookingData)
      .then((response) => response.text())
      .then((data) => {
        console.log("Booking response:", data);
        // You can handle the response here as needed
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
      });
  };
  useEffect(() => {
    fetchLands([]);
  }, []);
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
          <Tab label="Booking Size 5" {...a11yProps(0)} />
          <Tab label="Booking Size 7" {...a11yProps(1)} />
          <Tab label="TIỆN ÍCH" {...a11yProps(2)} />
          <Tab label="ĐÁNH GIÁ" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <div className="content-center">
          <div className="table-container">
            <h2>BOOKING PITCH SIZE 5</h2>
            <div className="product-color">
              <div key={size5} className="counter">
                <div className="counter">
                  <button onClick={() => handleDecreaseSize5(size5)}>-</button>
                  <input type="text" value={size5.count} readOnly />
                  <button onClick={() => handleIncreaseSize5(size5)}>+</button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="leftTime">
              <label htmlFor="">Start Time : </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="rightTime">
              <label htmlFor=""> End Time : </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="button-container">
            <Button className="button" onClick={() => handleBookingType5()}>
              BOOKING
            </Button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <div className="content-center">
          <div className="table-container">
            <h2>BOOKING PITCH SIZE 7</h2>
            <div className="product-color">
              <div key={size7} className="counter">
                <div className="counter">
                  <button onClick={() => handleDecreaseSize7(size7)}>-</button>
                  <input type="text" value={size7.count} readOnly />
                  <button onClick={() => handleIncreaseSize7(size7)}>+</button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="leftTime">
              <label htmlFor="">Start Time : </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="rightTime">
              <label htmlFor=""> End Time : </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="button-container">
            <Button
              className="button"
              onClick={() => handleBookingType7(size7)}
            >
              BOOKING
            </Button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
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
      <TabPanel value={value} index={3} dir={theme.direction}>
        ĐÁNH GIÁ
      </TabPanel>
      {/* </SwipeableViews> */}
    </Box>
  );
}
