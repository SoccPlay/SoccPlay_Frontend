import {
  Box,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as invoiceApi from "../../components/Axios/InvoiceApi";
import { formatPrice } from "../../pages/profile/components/History";
import { withSnackbar } from "../../hook/withSnackbar";
function Order({ data, snackbarShowMessage }) {
  const [invoice, setInvoice] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    async function fetchInvoice() {
      try {
        const res = await invoiceApi.getInvoiceByBookingId(data);
        console.log("Invoice fetched", res.data);
        setInvoice(res.data);
        let string = res.data.bookingId;
        let result = string.split("-")[0];
        setStartTime(res.data.startTime.split("T")[1].slice(0, 5));
        setEndTime(res.data.endTime.split("T")[1].slice(0, 5));
        setPrice(formatPrice(res.data.totalPrice));
        setBookingId(result);
        snackbarShowMessage("Xem hóa đơn thành công", "success");
      } catch (error) {
        console.log(error.response.data.Exception);
        snackbarShowMessage(error.response.data.Exception, "error");
      }
    }
    fetchInvoice();
  }, [data]);

  return (
    <Box>
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
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography fontSize={"20px"} fontWeight={"bold"} color={"black"}>
                Thông tin Sân bóng
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Grid>Tên Sân bóng: {invoice.landName}</Grid>
              <Grid>Tên Chủ sân: {invoice.nameOwner}</Grid>
              <Grid>Địa chỉ: {invoice.location}</Grid>
            </Grid>
            <Grid item xs={4}>
              <img
                src={invoice.images}
                alt="Owner logo"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "20px",
                }}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Typography fontSize={"20px"} fontWeight={"bold"} color={"black"}>
                Thông tin đặt sân
              </Typography>
              <Grid>Hóa đơn: {invoice.bookingId}</Grid>
              <Grid>
                Ngày tạo: {dayjs(invoice.dateBooking).format("DD/MM/YYYY")}
              </Grid>
              <Grid>Họ tên người đặt: {invoice.customerName}</Grid>
              <Grid>Ghi chú: {invoice.note}</Grid>
            </Grid>
          </Grid>

          <Grid container spacing={3}
          mt={"10px"}
          >
            <Grid item xs={4}
            sx={{ textAlign: "center" }}>
              <Grid>
                <Typography
                  fontSize={"20px"}
                  fontWeight={"bold"}
                  color={"black"}
                >
                  Tên sân
                </Typography>
                <Grid>{invoice.pitchName}</Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}
            sx={{ textAlign: "center" }}>
            <Grid>
                <Typography
                  fontSize={"20px"}
                  fontWeight={"bold"}
                  color={"black"}
                >
                  Thời gian
                </Typography>
                <Grid>Từ {startTime} đến {endTime}</Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}
            sx={{ textAlign: "center" }}>
            <Grid>
                <Typography
                  fontSize={"20px"}
                  fontWeight={"bold"}
                  color={"black"}
                >
                  Giá tiền
                </Typography>
                <Grid>{price}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <hr />
        <Grid className="total">
          <Grid sx={{ textAlign: "center" }}
          mt={"10px"}>
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default withSnackbar(Order);
