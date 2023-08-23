import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LandApi from "../../../components/Axios/LandApi";
import "./land.scss";
import {
  handleOpenDialogTest,
  handleCloseDialogTest,
  handleInputChangeTest,
} from "./Handler";
import HistoryBooking from "./HistoryBook";

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
const createButtonStyle = () => ({
  fontWeight: "bold",
  backgroundColor: "green",
  color: "aliceblue",
  borderRadius: "10px",
});

const Lands = () => {
  const [open, setOpen] = useState(false);
  const [lands, setLands] = useState([]);
  const onwerId = localStorage.getItem("OWNERID");
  const [formData, setFormData] = useState({
    nameLand: "",
    title: "",
    policy: "",
    location: "",
    description: "",
    ownerId: onwerId,
  });
  const resetForm = () => {
    setFormData({
      nameLand: "",
      title: "",
      policy: "",
      location: "",
      description: "",
      ownerId: onwerId,
    });
  };
  const fetchLands = async () => {
    try {
      const response = await LandApi.GetLandByOwner(onwerId);
      setLands(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    resetForm();
    setOpen(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      formData.policy = formData.nameLand;
      const response = await LandApi.CreateLands(formData);
      console.log(response.data);
      handleCloseDialog();
      fetchLands();
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------------------------------
  const [openPitch, setClosePitch] = useState(false);
  const [selectLandId, setLandId] = useState("");
  function handleOpenPitchDialog(landId) {
    setLandId(landId);
    setClosePitch(true);
  }
  const [pitch, setPitch] = useState({
    name: "",
    size: "",
    landId: "",
    ownerId: selectLandId,
  });
  const resetPitch = () => {
    setPitch({
      name: "",
      size: "",
      landId: "",
      ownerId: selectLandId,
    });
  };

  function handleClosePitchDialog() {
    resetPitch();
    setClosePitch(false);
    setLandId(null);
  }
  function handleInputPitchChange(event) {
    const { name, value } = event.target;
    setPitch((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const fetchPitch = async (event) => {
    event.preventDefault();
    try {
      pitch.ownerId = onwerId;
      pitch.landId = selectLandId;
      const response = await LandApi.CreatePitch(pitch);
      console.log(response.data);
      handleClosePitchDialog();
      fetchLands();
      setLandId(null);
    } catch (error) {
      console.error(error.response.data.Messages);
    }
  };
  //----------------------------------------------------------------
  const [openPrice, setOpenPrice] = useState(false);
  const handleOpenPriceDialog = (landId) => {
    setOpenPrice(true);
    setLandId(landId);
  };
  console.log("lan 2: ", selectLandId);
  const handleClosePriceDialog = () => {
    setOpenPrice(false);
    resetPrices();
  };

  const [prices, setPrices] = useState({
    size: "",
    landId: "",
    landLandId: "",
    date: "",
    starTime: "",
    endTime: "",
    price1: "",
  });
  const resetPrices = () => {
    setPrices({
      price1: "",
      size: "",
      landLandId: "",
      date: "",
      starTime: "",
      endTime: "",
    });
  };
  function handleInputPricesChange(event) {
    const { name, value } = event.target;
    setPrices((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "date") {
      const timeRang = value.split("-");
      setPrices((prevData) => ({
        ...prevData,
        starTime: timeRang[0].trim(),
        endTime: timeRang[1].trim(),
      }));
    }
  }

  const fetchPrices = async (event) => {
    event.preventDefault();
    try {
      prices.landLandId = selectLandId;
      prices.landLandId = selectLandId;
      prices.landLandId = selectLandId;

      const response = await LandApi.CreatePrice(prices);
      console.log(response.data);
      handleClosePriceDialog();
      fetchLands();
      setLandId(null);
    } catch (error) {
      console.error(error.response);
    }
  };
  const ChangePage = (landId) => {
    <HistoryBooking landId={landId} />;
  };
  //----------------------------------------------------------------

  const PER_PAGE = 4;
  let [page, setPage] = useState(1);
  const count = Math.ceil(lands.length / PER_PAGE);
  const _Data = lands.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  console.log("Pitch Size: ", pitch.size);
  console.log("Land Id: ", selectLandId);
  console.log("Start Date Price: ", prices.starTime);
  console.log("End Date Price: ", prices.endTime);

  function handlePageChanges(event, newValue) {
    setPage(newValue);
    console.log(_Data);
  }
  console.log("Size Price:", prices.size);
  useEffect(() => {
    fetchLands();
  }, [onwerId]);
  return (
    <div
      className="Table"
      style={{
        //   height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        //   justifyContent: "center",
        //   alignItems: "center",
        paddingTop: "100px",
        paddingLeft: "20px",
        marginLeft: "50px",
        paddingRight: "50px",
      }}
    >
      <div className="topManager">
        <Typography className="bold-and-large">Quản Lý Sân</Typography>
        <Button
          className="butonManager"
          onClick={() => handleOpenDialog(setOpen)}
        >
          Thêm Sân Lớn
        </Button>
      </div>

      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="bold-text">
                ID Sân Lớn
              </TableCell>
              <TableCell align="left" className="bold-text">
                Tên Sân Lớn
              </TableCell>
              <TableCell align="left" className="bold-text">
                Thông Tin Sân Lớn
              </TableCell>
              <TableCell align="left" className="bold-text">
                Địa Điểm
              </TableCell>
              <TableCell align="left" className="bold-text">
                Mô Tả Chi Tiết
              </TableCell>
              <TableCell align="left" className="bold-text">
                Tổng Số Sân Nhỏ
              </TableCell>
              <TableCell align="left" className="bold-text">
                Trạng Thái
              </TableCell>
              <TableCell align="left" className="bold-text">
                Thêm Sân Nhỏ
              </TableCell>
              <TableCell align="left" className="bold-text">
                Thêm Giá Tiền
              </TableCell>
              <TableCell align="left" className="bold-text">
                Xem Lịch
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {_Data &&
              _Data.map((row) => (
                <TableRow key={row.landId}>
                  <TableCell component="th" scope="row">
                    {row.landId}
                  </TableCell>
                  <TableCell align="left">{row.nameLand}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.totalPitch}</TableCell>

                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell align="left" className="Details">
                    <Button
                      className="butonManager"
                      name="pitch"
                      onClick={() => handleOpenPitchDialog(row.landId)}
                    >
                      Sân Nhỏ
                    </Button>
                  </TableCell>

                  <TableCell align="left" className="Details">
                    <Button
                      className="butonManager"
                      name="price"
                      onClick={() => handleOpenPriceDialog(row.landId)}
                    >
                      Giá Tiền
                    </Button>
                  </TableCell>
                  <TableCell align="left" className="Details">
                    <Button>Xem Lịch Đặt</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openPrice} onClose={handleClosePriceDialog}>
        <DialogTitle>Tạo Price Cho Sân</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập Giá Tiền Mỗi Giờ Trong Mỗi Khung Giờ
          </DialogContentText>
          <form onSubmit={fetchPitch} style={{ marginTop: "10px" }}>
            <TextField
              name="price1"
              label="Giá Tiền Mỗi Giờ"
              value={prices.price1}
              onChange={handleInputPricesChange}
              required
            />
            <Grid container spacing={2} style={{ marginTop: "2px" }}>
              <Grid item xs={12} sm={6}>
                <FormControl style={{ width: "150px" }}>
                  <InputLabel>Size</InputLabel>
                  <Select
                    name="size"
                    value={prices.size}
                    onChange={handleInputPricesChange}
                  >
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl style={{ width: "150px" }}>
                  <InputLabel>Date</InputLabel>
                  <Select
                    name="date"
                    value={prices.date}
                    onChange={handleInputPricesChange}
                  >
                    <MenuItem value="7-10">7h đến 10h</MenuItem>
                    <MenuItem value="14-22">14h đến 22h</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            className="pitch"
            onClick={handleClosePriceDialog}
            color="primary"
          >
            Hủy
          </Button>
          <Button onClick={fetchPrices} color="primary">
            Thêm Tiền
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---------------------------------------------------------------- */}

      <Dialog open={openPitch} onClose={handleClosePitchDialog}>
        <DialogTitle>Tạo Sân Nhỏ</DialogTitle>
        <DialogContent>
          <DialogContentText>Nhập thông tin Sân:</DialogContentText>
          <form onSubmit={fetchPitch}>
            <Grid container spacing={2} style={{ marginTop: "5px" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Tên Sân Nhỏ"
                  value={pitch.name}
                  onChange={handleInputPitchChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl style={{ width: "150px" }}>
                  <InputLabel>Size</InputLabel>
                  <Select
                    name="size"
                    value={pitch.size}
                    onChange={handleInputPitchChange}
                  >
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            className="pitch"
            onClick={handleClosePitchDialog}
            color="primary"
          >
            Hủy
          </Button>
          <Button onClick={fetchPitch} color="primary">
            Tạo Sân
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Tạo Sân Lớn</DialogTitle>
        <DialogContent>
          <DialogContentText>Nhập thông tin sân bóng:</DialogContentText>
          <form style={{ marginTop: "5px" }} onSubmit={handleSubmit}>
            <TextField
              name="nameLand"
              label="Tên Sân"
              value={formData.nameLand}
              onChange={handleInputChange}
              required
            />
            <TextField
              name="title"
              label="Thông Tin"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <TextField
              name="location"
              label="Địa Điểm"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <TextField
              name="description"
              label="Mô Tả Chi Tiết"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Tạo Sân
          </Button>
        </DialogActions>
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
    </div>
  );
};
export default Lands;
