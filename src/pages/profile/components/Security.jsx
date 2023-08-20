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
import { Button, Typography } from "@mui/material";
import dayjs from "dayjs";

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

export default function CustomizedTables({ onClosed }) {
  const [data, setData] = React.useState([]);

  const [customer, setCustomer] = React.useState(
    localStorage.getItem("CUSTOMERID")
  );

  const formatPrice = (price) => {
    price = price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    return price;
  };

  const handleDelete = async (id) => {
    await BookingApi.deleteBooking(id);
  };

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await BookingApi.getAllBooking(customer);
      setData(response);
    };
    fetchBooking();
  }, [customer]);
  return (
    <TableContainer style={{ height: "100vh" }} component={Paper}>
      <Typography
        fontSize={"30px"}
        fontWeight={"bold"}
        color={"black"}
        marginLeft={2.5}
        marginTop={2.5}
      >
        Lịch sử đặt sân
      </Typography>
      <Table sx={{ margin: "20px", width: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên sân</StyledTableCell>
            <StyledTableCell width={200}>Địa chỉ</StyledTableCell>
            <StyledTableCell align="right">Ngày đặt sân</StyledTableCell>
            <StyledTableCell align="right">Loại sân</StyledTableCell>
            <StyledTableCell align="right">Ghi chú</StyledTableCell>
            <StyledTableCell align="right">giá tiền</StyledTableCell>
            <StyledTableCell align="right">Hủy đặt</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <StyledTableRow key={row.bookingId}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.location}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.schedules.map((item) => {
                    return (
                      <p>
                        {dayjs(row.dateBooking).format("DD-MM-YYYY")}
                        {" : "}
                        {dayjs(item.starTime).format("HH:MM")}
                        {"->"}
                        {dayjs(item.endTime).format("HH:MM")}
                      </p>
                    );
                  })}
                </StyledTableCell>
                <StyledTableCell align="right">{row.size}</StyledTableCell>
                <StyledTableCell align="right">{row.note}</StyledTableCell>
                <StyledTableCell align="right">
                  {/* format VND */}
                  {formatPrice(row.totalPrice)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    onClick={() => handleDelete(row.bookingId)}
                    variant="outlined"
                    color="error"
                  >
                    Hủy
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        sx={{
          background: "transparent",
          color: "#1976d2",
          border: "2px solid #1976d2",
          "&:hover": {
            color: "#FFF",
          },
          marginLeft: "50%",
          marginTop: "20px",
        }}
        onClick={onClosed}
      >
        Đóng
      </Button>
    </TableContainer>
  );
}
