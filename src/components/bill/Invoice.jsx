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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import qrcode from "../../assets/qrcode.png";
import arrowBack from "../../assets/arrowBack.png";
import * as invoiceApi from "../Axios/InvoiceApi";
import { formatPrice } from "../../pages/profile/components/History";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const { bookingId } = useParams();
  const [invoice, setInvoice] = useState([]);
  const [bookingIdd, setBookingId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    async function fetchInvoice() {
      try {
        const res = await invoiceApi.getInvoiceByBookingId(bookingId);
        console.log("Invoice fetched", res.data);
        setInvoice(res.data);
        let string = res.data.bookingId;
        let result = string.split("-")[0];
        setStartTime(res.data.startTime.split("T")[1].slice(0, 5));
        setEndTime(res.data.endTime.split("T")[1].slice(0, 5));
        setPrice(formatPrice(res.data.totalPrice));
        setBookingId(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchInvoice();
  }, [bookingId]);

  return (
    <Box>
      <img
        src={arrowBack}
        alt="Company logo"
        style={{
          width: "100%",
          maxWidth: 100,
          padding: 10,
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => window.history.back()}
      />
      <div className="text-center text-black">
        <Typography variant="h3">Hóa đơn chi tiết</Typography>
        <Typography>Cảm ơn bạn đã tin tưởng chúng tôi</Typography>
      </div>
      <Box
        className="invoice-box"
        sx={{
          background: "rgba(222, 216, 213, 0.433)",
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
          borderRadius: 5,
          border: "1px solid #000",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="top">
                <TableCell colSpan={2}>
                  <Table>
                    <TableRow>
                      <TableCell className="title">
                        <img
                          src={invoice.images}
                          alt="Owner logo"
                          style={{
                            width: "80%",
                            // height: "100%",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        Hóa đơn: {invoice.bookingId}
                        <br />
                        Ngày tạo:{" "}
                        {dayjs(invoice.dateBooking).format("DD/MM/YYYY")}
                        <br />
                        Ghi chú: {invoice.note}
                        <br />
                        Địa chỉ: {invoice.location}
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow className="information">
                <TableCell colSpan={2} sx={{ paddingLeft: 20 }}>
                  <Table>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">Họ tên: </Typography>
                        <Typography variant="subtitle1">Tên Sân:</Typography>
                        <Typography variant="subtitle1">Chủ Sân: </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {invoice.customerName}
                        </Typography>
                        <Typography variant="subtitle1">
                          {invoice.landName}
                        </Typography>
                        <Typography>{invoice.nameOwner}</Typography>
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableCell>
              </TableRow>

              <TableRow className="heading"></TableRow>

              <TableRow className="heading">
                <TableCell sx={{ textAlign: "center" }}>
                  <b>Loại Sân</b>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <b>Giá Tiền</b>
                </TableCell>
              </TableRow>
              <TableRow className="item">
                <TableCell sx={{ textAlign: "center" }}>
                  <p>
                    {invoice.pitchName},{" "}
                    <b
                      style={{ borderBottom: "4px solid #4682b4   " }}
                      className="border-b-4"
                    >
                      Từ {startTime} đến {endTime}
                    </b>
                  </p>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{price}</TableCell>
              </TableRow>
              <hr />
              <TableRow className="total">
                <TableCell />
                <TableCell sx={{ textAlign: "center" }}>
                  Trạng thái:
                  {invoice.status === "Waiting" && (
                    <b className="text-yellow-600 ml-1">Đang chờ thanh toán</b>
                  )}
                  {invoice.status === "Done" && (
                    <b className="text-green-600 ml-1">Đã thanh toán</b>
                  )}
                  {invoice.status === "Cancel" && (
                    <b className="text-red-600 ml-1">Đã hủy</b>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
export default Invoice;
