import React, { useEffect, useState } from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  Pagination,
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
import { Select } from "@mui/material";
import { Box } from "@mui/system";
import axiosApi from "../../../components/Axios/AxiosApi";
const makeStyle = (status) => {
  if (status === "Done") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Cancel") {
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
const statusOptions = ["Cancel", "Done", "Waiting"];

export default function HistoryBooking() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState([]);
  const onwerId = localStorage.getItem("OWNERID");
  function handlePageChanges(event, newValue) {
    setPage(newValue);
  }
  const fetchBooking = async () => {
    try {
      const response = await BookingApi.GetAllBookingByOwnerId(onwerId);
      setBooking(response.data);
      console.log("Booking Reponse: ", response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  const PER_PAGE = 5;
  let [page, setPage] = useState(1);
  const count = Math.ceil(booking.length / PER_PAGE);
  const sortfilterDataHistory = [...booking].sort(
    (a, b) => new Date(b.dateBooking) - new Date(a.dateBooking)
  );
  const _Data = sortfilterDataHistory.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axiosApi.delete(
        `https://localhost:7186/api/Booking/ChangeStatusBooking?id=${bookingId}&status=${newStatus}`
      );
      fetchBooking();
      // You might want to update the UI or state accordingly
    } catch (error) {
      console.error("Error updating status:", error);
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
                Đặt Sân ID
              </TableCell>
              <TableCell align="left" className="bold-text">
                Tên Sân Lớn
              </TableCell>
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
          </TableHead>
          <TableBody>
            {_Data &&
              _Data.map((bookings) => {
                return (
                  <TableRow key={bookings.bookingId}>
                    <TableCell align="left" className="bold-text">
                      {bookings.bookingId}
                    </TableCell>
                    <TableCell align="left" className="bold-text">
                      {bookings.name}
                    </TableCell>
                    <TableCell align="left" className="bold-text">
                      {bookings.pitchName}
                    </TableCell>
                    <TableCell align="left" className="bold-text">
                      {bookings.dateBooking}
                    </TableCell>
                    <TableCell align="left" className="bold-text">
                      {bookings.startTime}
                    </TableCell>
                    <TableCell align="left" className="bold-text">
                      {bookings.endTime}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={bookings.status}
                        onChange={(event) => {
                          const newStatus = event.target.value;
                          handleStatusChange(bookings.bookingId, newStatus);
                        }}
                        className="status"
                        style={{
                          ...makeStyle(bookings.status),
                          borderRadius: "10px", // Độ cong viền tròn
                          width: "121px", // Độ rộng thu nhỏ
                          fontSize: "12px", // Cỡ chữ nhỏ
                          height: "50px",
                        }}
                      >
                        {statusOptions.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="left" className="bold-text">
                      {bookings.totalPrice}
                    </TableCell>
                    <TableCell align="left" className="bold-text">
                      {bookings.customerId}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        variant="outlined"
        color="primary"
        showFirstButton
        showLastButton
        count={count}
        size="large"
        page={page}
        onChange={handlePageChanges}
      />
    </Box>
  );
}
