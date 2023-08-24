import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// import SwipeableViews from "react-swipeable-views";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import WifiIcon from "@mui/icons-material/Wifi";
import {
  Button,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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
import Feedback from "../../components/feedback/Feedback";
import Form from "../../components/feedback/Form";
import { withSnackbar } from "../../hook/withSnackbar";
import "../detail/tabs.css";
import Popup from "./Popup";
import { time } from "./TimeConstant";
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
  const fetchLands = async () => {
    try {
      const response = await LandApi.GetLandById(landId);
      if (response == null) {
      }
      console.log("Land ID:", [response.data]);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  console.log("Size: " + size);

  const [priceText, setPriceText] = useState();
  const [count, setCount] = useState(0);
  const [showBookingButton, setShowBookingButton] = useState(false);
  const [note, setNote] = useState("");
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleBookingType5 = async () => {
    setLoading(true);
    const start = `${dateBooking}T${time[selectedHours.hourFrom]}:00.000Z`;
    const end = `${dateBooking}T${time[selectedHours.hourTo]}:00.000Z`;
    const bookingData = {
      landId: landId,
      Note: note,
      Size: size,
      starTime: start,
      endTime: end,
      customerId: customerId,
      price: priceText,
    };
    console.log("Start: " + start);
    console.log("End: " + end);
    try {
      if (!customerId) {
        localStorage.setItem("bookingData", JSON.stringify(bookingData));
        localStorage.setItem("redirectPath", window.location.pathname);
        navigate("/signin");
        return;
      }
      const storedBookingData = localStorage.getItem("bookingData");

      // if (storedBookingData) {
      //   const parsedBookingData = JSON.parse(storedBookingData);

      //   // Gán dữ liệu vào các trường tương ứng
      //   landId = parsedBookingData.landId;
      //   note = parsedBookingData.Note;
      //   size = parsedBookingData.Size;
      //   start = parsedBookingData.starTime;
      //   end = parsedBookingData.endTime;
      //   priceText = parsedBookingData.price;
      //   const response = await BookingApi.CreateBooking(parsedBookingData);
      //   console.log("Booking response:", response.data);
      //   snackbarShowMessage("Đặt sân thành công", "success");
      //   // Xóa dữ liệu đã lưu sau khi đã sử dụng
      //   localStorage.removeItem("bookingData");
      // } else {
      const response = await BookingApi.CreateBooking(bookingData);
      console.log("Booking response:", response.data);
      snackbarShowMessage("Đặt sân thành công", "success");
      // }
    } catch (error) {
      console.error("Error creating booking:", error.response.data.Messages);

      snackbarShowMessage(error.response.data.Messages, "error");
    } finally {
      setLoading(false);
    }
  };

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

      //   snackbarShowMessage(error.response.data, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("CustomerId: " + customerId);
    setCustomerId(localStorage.getItem("CUSTOMERID"));
    if (count > 0) {
      handlePriceChange();
      fetchLands(customerId);
    }
  }, [
    customerId,
    selectedHours.hourFrom,
    selectedHours.hourTo,
    size,
    dateBooking,
  ]);
  return (
    <Box sx={{ bgcolor: "background.paper", width: 1200, paddingBottom: 22 }}>
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
              <Popup data={data} />
            </div>
            <div className="right-column">
              <div>
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
                </LocalizationProvider>
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
                      {Object.keys(time).map((item, pos) => {
                        return (
                          <MenuItem key={pos} value={item}>
                            {time[item]}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <div class="detailtop">
                    <Button
                      sx={{
                        width: "100px",
                        marginTop: "2%",
                      }}
                      className="detailbookingButton"
                      onClick={handlePriceChange}
                    >
                      Xem giá
                    </Button>
                    <Typography className="priceText">
                      {priceText} VND
                    </Typography>
                  </div>
                </Box>
              </div>
              {showBookingButton && (
                <div className="detailbooking">
                  <Button
                    style={{
                      width: "200px",
                      // margin: "10px 0px 0px 300px",
                    }}
                    className="detailbookingButton"
                    onClick={() => handleBookingType5()}
                    disabled={loading}
                  >
                    Đặt sân
                  </Button>
                </div>
              )}
            </div>
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
          <div className="left-feedback">
            <Feedback landId={landId} />
          </div>
          <div className="column-straight"></div>
          <div>
            <Form landId={landId} customerId={customerId} />
          </div>
        </div>
      </TabPanel>
      {/* </SwipeableViews> */}
    </Box>
  );
}

export default withSnackbar(FullWidthTabs);
