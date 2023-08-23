import React, { useEffect, useState } from "react";
import {
  Button,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BookingApi from "../../../components/Axios/BookingApi";
import { FormControl, MenuItem, Select } from "@mui/base";
import { Box } from "@mui/system";
const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function HistoryBooking() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState([]);
  const onwerId = localStorage.getItem("OWNERID");

  const [selectedLandId, setSelectedLandId] = useState(""); // State to store the selected landId

  const handleChange = (event) => {
    setSelectedLandId(event.target.value); // Update the selected landId when a new one is chosen
  };

  const fetchBooking = async () => {
    try {
      const response = await BookingApi.GetAllBookingByOwnerId(onwerId);
      setBooking(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [onwerId]);

  return (
    <Box
      className="Table"
      style={{
        // height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        justifyContent: "left",
        // alignItems: "center",
        paddingTop: "100px",
        paddingLeft: "20px",
        marginLeft: "50px",
        paddingRight: "50px",
      }}
    >
      <div className="topManager">
        <Typography className="bold-and-large">Thông Tin Đặt Sân</Typography>
      </div>

      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="bold-text">
                Sân Lớn ID
              </TableCell>
              <TableCell align="left" className="bold-text">
                Tên Sân Lớn
              </TableCell>
              <TableRow>
                <TableCell align="left" className="bold-text">
                  Sân Nhỏ ID
                </TableCell>
                <TableCell align="left" className="bold-text">
                  Ngày Đặt
                </TableCell>
                <TableCell align="left" className="bold-text">
                  Bắt Đầu
                </TableCell>
                <TableCell align="left" className="bold-text">
                  Kết Thúc
                </TableCell>
                <TableCell align="left" className="bold-text">
                  Trạng Thái
                </TableCell>
                <TableCell align="left" className="bold-text">
                  Giá Tiền
                </TableCell>
                <TableCell align="left" className="bold-text">
                  Customer ID
                </TableCell>
              </TableRow>
            </TableRow>
          </TableHead>
          {booking &&
            booking.map((bookings) => {
              return (
                <TableRow>
                  <TableCell align="left" className="bold-text">
                    {bookings.landId}
                  </TableCell>
                  <TableCell align="left" className="bold-text">
                    {bookings.name}
                  </TableCell>
                </TableRow>
              );
            })}
        </Table>
      </TableContainer>
    </Box>
  );
}
