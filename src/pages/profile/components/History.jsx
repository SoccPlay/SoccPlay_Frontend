import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as BookingApi from "../../../components/Axios/BookingApi";
import {
  Alert,
  Button,
  Pagination,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { withSnackbar } from "../../../hook/withSnackbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = ({ snackbarShowMessage }) => {
  const [data, setData] = useState([]);

  const [customer, setCustomer] = useState(localStorage.getItem("CUSTOMERID"));

  const formatPrice = (price) => {
    price = price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    return price;
  };

  const handleDelete = async (id) => {
    try {
      await BookingApi.deleteBooking(id);
      snackbarShowMessage("Hủy thành công", "success");
      fetchGetallBooking();
    } catch (error) {
      snackbarShowMessage(error, "error");
    }
  };

  const fetchGetallBooking = async () => {
    try {
      const response = await BookingApi.getAllBooking(customer);
      updateData(response); // Call the update function instead of directly setting data
    } catch (error) {
      // Handle error
    }
  };

  const updateData = (newData) => {
    setData(newData);
  };

  const PER_PAGE = 6;
  let [page, setPage] = useState(1);
  const count = Math.ceil(data.length / PER_PAGE);
  const sortfilterDataHistory = [...data].sort(
    (a, b) => new Date(b.dateBooking) - new Date(a.dateBooking)
  );
  const _Data = sortfilterDataHistory.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  function handlePageChanges(event, newValue) {
    setPage(newValue);
  }
  useEffect(() => {
    const fetchBooking = async () => {
      const response = await BookingApi.getAllBooking(customer);
      setData(response);
      console.log(response);
    };
    fetchBooking();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TableContainer style={{ flex: 1 }} component={Paper}>
        <Typography
          fontSize={"30px"}
          fontWeight={"bold"}
          color={"black"}
          marginLeft={2.5}
          marginTop={2.5}
        >
          Lịch sử đặt sân
        </Typography>
        <Table
          sx={{ margin: "20px", width: "170vh" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Tên sân</StyledTableCell>
              <StyledTableCell width={200}>Địa chỉ</StyledTableCell>
              <StyledTableCell width={200} align="right">
                Ngày đặt sân
              </StyledTableCell>
              <StyledTableCell width={200} align="right">
                Giờ đá
              </StyledTableCell>
              <StyledTableCell align="right">Loại sân</StyledTableCell>
              <StyledTableCell align="right">Ghi chú</StyledTableCell>
              <StyledTableCell align="right">giá tiền</StyledTableCell>
              <StyledTableCell align="right">Hủy đặt</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_Data && _Data.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                }}
              >
                <Alert style={{ width: "100%" }} severity="warning">
                  Bạn chưa đặt sân nào
                </Alert>
              </div>
            )}
            {_Data &&
              _Data.map((row) => (
                <StyledTableRow key={row.bookingId}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.location}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dayjs(row.dateBooking).format("DD-MM-YYYY")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dayjs(row.startTime).format("DD-MM-YYYY")}
                    {":"}
                    {row.startTime.split("T")[1].slice(0, 5)}
                    {"->"}
                    {row.endTime.split("T")[1].slice(0, 5)}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.size}</StyledTableCell>
                  <StyledTableCell align="right">{row.note}</StyledTableCell>
                  <StyledTableCell align="right">
                    {/* format VND */}
                    {formatPrice(row.totalPrice)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.status === "Waiting" ? (
                      <Button
                        onClick={() => handleDelete(row.bookingId)}
                        variant="outlined"
                        color="error"
                      >
                        Hủy
                      </Button>
                    ) : (
                      <div
                        style={{
                          color: "red",
                          fontWeight: "600",
                        }}
                      >
                        Đã hủy
                      </div>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
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
      </TableContainer>
    </div>
  );
};
export default withSnackbar(CustomizedTables);
