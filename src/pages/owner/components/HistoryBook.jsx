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
import { Orders } from "../../detail/Popup";
import { withSnackbar } from "../../../hook/withSnackbar";
import dayjs from "dayjs";
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
function HistoryBooking({ snackbarShowMessage }) {
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
      snackbarShowMessage("Show data thành công", "success");
    } catch (error) {
      setError(error);
      setIsLoading(false);
      snackbarShowMessage(error.response.data.Exception, "error");
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
      snackbarShowMessage("Thay đổi thành công", "success");
      // You might want to update the UI or state accordingly
    } catch (error) {
      console.error("Error updating status:", error);
      snackbarShowMessage("Không thể thay đổi", "error");
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
              <TableCell align="center" className="bold-text">
                Đặt Sân ID
              </TableCell>
              <TableCell align="center" className="bold-text">
                Tên Sân Lớn
              </TableCell>
              <TableCell align="center" className="bold-text">
                Sân Nhỏ
              </TableCell>
              <TableCell align="center" className="bold-text">
                Ngày Đặt
              </TableCell>
              <TableCell align="center" className="bold-text">
                Bắt Đầu
              </TableCell>
              <TableCell align="center" className="bold-text">
                Kết Thúc
              </TableCell>
              <TableCell align="center" className="bold-text">
                Trạng Thái
              </TableCell>
              <TableCell align="center" className="bold-text">
                Giá Tiền
              </TableCell>
              <TableCell align="center" className="bold-text">
                Customer ID
              </TableCell>
              <TableCell align="center" className="bold-text">
                Hóa Đơn
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_Data &&
              _Data.map((bookings) => {
                return (
                  <TableRow key={bookings.bookingId}>
                    <TableCell align="center">{bookings.bookingId}</TableCell>
                    <TableCell align="center">{bookings.name}</TableCell>
                    <TableCell align="center">{bookings.pitchName}</TableCell>
                    <TableCell align="center">
                      {dayjs(bookings.dateBooking).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(bookings.startTime).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(bookings.endtime).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell align="center">
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
                    <TableCell align="center">{bookings.totalPrice}</TableCell>
                    <TableCell align="center">{bookings.customerId}</TableCell>
                    <TableCell align="center">
                      <Orders data={bookings.bookingId} />
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
export default withSnackbar(HistoryBooking);
