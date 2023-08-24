import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BookingApi from "../Axios/BookingApi";

const Invoice = ({ data }) => {
  console.log("DataBookingID", data);
  const [booking, setBooking] = useState([]);
  const fetchBooking = async () => {
    try {
      const response = await BookingApi.GetBookingById(data);
      setBooking(response.data);
      console.log("Log Data Booking", response.data);
    } catch (error) {
      // Handle error
    }
  };
  function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    fetchBooking();
  }, [data]);

  return (
    <Box>
      {booking && (
        <Typography
          variant="h4"
          style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
        >
          {booking.landName}
        </Typography>
      )}
      <Box className="invoice-box">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="top">
                <TableCell colSpan={2}>
                  <Table>
                    {booking && (
                      <TableRow>
                        <TableCell className="title">
                          <img
                            src={booking.image}
                            alt="OWNER logo"
                            style={{ width: "100%", maxWidth: 300 }}
                          />
                        </TableCell>
                        <TableCell>
                          Booking ID: {booking.bookingId}
                          <br />
                          Ngày đặt: {booking.dateBooking}
                          <br />
                          Địa Điểm: {booking.location}
                          <br />
                        </TableCell>
                      </TableRow>
                    )}
                  </Table>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {booking && (
                <>
                  <TableRow className="information">
                    <TableCell colSpan={2}>
                      {booking && (
                        <Table>
                          <TableRow>
                            <TableCell>
                              <Typography variant="subtitle1">
                                <Typography
                                  style={{
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Thời Gian Booking
                                </Typography>
                                Sân ID: {booking.pitchId}
                              </Typography>
                              <Typography variant="subtitle1">
                                Tên Sân: {booking.pitchName}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle1">
                                Thời gian:
                                {new Date(
                                  booking.startTime
                                ).toLocaleDateString()}
                                <br />
                                Bắt Đầu:{" "}
                                {formatTime(new Date(booking.startTime))}
                                <br />
                                Kết Thúc:{" "}
                                {formatTime(new Date(booking.endTime))}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </Table>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow className="information">
                    <TableCell colSpan={2}>
                      <Table>
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle1">
                              <Typography
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                Người Đặt
                              </Typography>
                              Customer ID: {booking.customerId}
                            </Typography>
                            <Typography variant="subtitle1">
                              Tên Customer: {booking.customerName}
                            </Typography>
                            <Typography variant="subtitle1">
                              Thêm: {booking.note}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </Table>
                    </TableCell>
                  </TableRow>
                  <TableRow className="heading">
                    <TableCell>Trạng Thái</TableCell>
                    <TableCell>{booking.status}</TableCell>
                  </TableRow>
                  <TableRow className="heading">
                    <TableCell>Giá</TableCell>
                    <TableCell>{booking.totalPrice} VND</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Invoice;
