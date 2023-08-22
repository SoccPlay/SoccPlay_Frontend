import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
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
import "./land.css";
import { CheckBox } from "@mui/icons-material";

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
    resetForm();
    setOpen(true);
  };

  const handleCloseDialog = () => {
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
        <Typography className="bold-and-large">MANAGER LANDS</Typography>
        <Button className="butonManager" onClick={handleOpenDialog}>
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
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {lands.map((row) => (
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
                  <Button className="butonManager">Sân Nhỏ</Button>
                </TableCell>
                <TableCell align="left" className="Details">
                  <Button className="butonManager">Giá Tiền</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Tạo Sân Lớn</DialogTitle>
        <DialogContent>
          <DialogContentText>Nhập thông tin sân bóng:</DialogContentText>
          <form onSubmit={handleSubmit}>
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
            <CheckBox>
              <TextField
                name="description"
                label="Mô Tả Chi Tiết"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </CheckBox>
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
    </div>
  );
};
export default Lands;
