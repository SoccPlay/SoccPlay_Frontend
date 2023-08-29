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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { withSnackbar } from "../../../hook/withSnackbar";
import { Orders } from "../../detail/Popup";
import { Link, useNavigate } from "react-router-dom";
import Form from "components/feedback/Form";

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
export const formatPrice = (price) => {
  price = price.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return price;
};

const CustomizedTables = ({ snackbarShowMessage }) => {
  const [data, setData] = useState([]);

  const [customer, setCustomer] = useState(localStorage.getItem("CUSTOMERID"));

  const handleDelete = async (id) => {
    try {
      await BookingApi.deleteBooking(id);
      snackbarShowMessage("Hủy thành công", "success");
      fetchGetallBooking();
    } catch (error) {
      snackbarShowMessage(error, "error");
    }
  };
  const nagative = useNavigate();
  const handleFeedback = async (landId) => {
    nagative(`detail/${landId}`);
  };

  const fetchGetallBooking = async () => {
    try {
      const response = await BookingApi.getAllBooking(customer);
      updateData(response); // Call the update function instead of directly setting data
    } catch (error) {
      // Handle error
    }
  };

  //------------------------------------------------------------------------------------------

  const [openForm, setCloseForm] = useState(false);
  const [selectLandId, setLandId] = useState("");
  function handleOpenFormFeedBackDialog(landId) {
    setLandId(landId);
    setCloseForm(true);
  }
  // const [pitch, setPitch] = useState({
  //   name: "",
  //   size: "",
  //   landId: "",
  //   ownerId: selectLandId,
  // });
  // const resetPitch = () => {
  //   setPitch({
  //     name: "",
  //     size: "",
  //     landId: "",
  //     ownerId: selectLandId,
  //   });
  // };

  function handleCloseFormFeedBackDialog() {
    // resetPitch();
    setCloseForm(false);
    setLandId(null);
  }
  // function handleInputFormChange(event) {
  //   const { name, value } = event.target;
  //   setPitch((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // }

  //-------------------------------------------------------------------------------------------
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
      console.log("GET ALL BOOKING: ", response);
      setData(response);
    };
    fetchBooking();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        paddingLeft: "20px",
        marginLeft: "50px",
        paddingRight: "50px",
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
          Lịch Sử Đặt Sân
        </Typography>
        <Table
          sx={{ margin: "20px", width: "170vh" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Đặt Sân ID</StyledTableCell>
              <StyledTableCell align="center">Tên Sân</StyledTableCell>
              <StyledTableCell width={200} align="center">
                Địa Chỉ
              </StyledTableCell>
              <StyledTableCell width={200} align="center">
                Ngày Đặt Sân
              </StyledTableCell>
              <StyledTableCell width={200} align="center">
                Giờ Đá
              </StyledTableCell>
              <StyledTableCell align="center">Loại Sân</StyledTableCell>
              <StyledTableCell align="center">Ghi Chú</StyledTableCell>
              <StyledTableCell align="center">Giá Tiền</StyledTableCell>
              <StyledTableCell align="center">Hủy Đặt</StyledTableCell>
              <StyledTableCell align="center">Hóa Đơn</StyledTableCell>
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
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.bookingId}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.location}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dayjs(row.dateBooking).format("DD-MM-YYYY")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dayjs(row.startTime).format("DD-MM-YYYY")}
                    {":"}
                    {row.startTime.split("T")[1].slice(0, 5)}
                    {"->"}
                    {row.endTime.split("T")[1].slice(0, 5)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.size}</StyledTableCell>
                  <StyledTableCell align="center">{row.note}</StyledTableCell>
                  <StyledTableCell align="center">
                    {/* format VND */}
                    {formatPrice(row.totalPrice)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.status === "Done" ? (
                      <></>
                    ) : (
                      <>
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
                      </>
                    )}
                    {row.status === "Done" && (
                      // <Link to={`/detail/${row.landId}`}>
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => handleOpenFormFeedBackDialog(row.landId)}
                      >
                        Đánh giá
                      </Button>
                      // </Link>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Orders data={row.bookingId} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Dialog
          open={openForm}
          onClose={handleCloseFormFeedBackDialog}
          fullWidth={true}
          maxWidth="xs"
          style={{
            maxHeight: "90%",
            minHeight: "70%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DialogTitle>Tạo Form FeedBack</DialogTitle>
          <DialogContent style={{ flex: "1", overflowY: "auto" }}>
            <DialogContentText>Form FeedBack</DialogContentText>
            <Form
              landId={selectLandId}
              customerId={customer}
              handleCloseFormFeedBackDialog={handleCloseFormFeedBackDialog}
            />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
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
