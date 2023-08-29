import {
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
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axiosApi from "../../../components/Axios/AxiosApi";
import LandApi from "../../../components/Axios/LandApi";
import PitchApi from "../../../components/Axios/PitchApi";
import { withSnackbar } from "../../../hook/withSnackbar";
import dayjs from "dayjs";
const makeStyle = (status) => {
  if (status === "Active") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Inactive") {
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
const statusOptions = ["Active", "Inactive"];
function Pitch({ snackbarShowMessage }) {
  const [land, setLand] = useState([]);
  const onwerId = localStorage.getItem("OWNERID");
  const [loading, setLoading] = useState(false);
  const [selectedLand, setSelectedLand] = useState("");
  const [pitch, selectedPitch] = useState([]);
  const fetchLand = async () => {
    try {
      const response = await LandApi.GetLandByOwner(onwerId);
      setLand(response.data);
      console.log("Land Reponse: ", response.data);
      setLoading(true);
    } catch (error) {
      snackbarShowMessage(error.response.data.Exception, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (pitchId, newStatus) => {
    try {
      await axiosApi.put(
        `https://localhost:7186/api/Pitch/InActivePitch?id=${pitchId}&status=${newStatus}`
      );
      snackbarShowMessage("Thay đổi thành công", "success");
      selectedPitch((prevPitchs) =>
        prevPitchs.map((pitchs) =>
          pitchs.pitchId === pitchId ? { ...pitchs, status: newStatus } : pitchs
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      snackbarShowMessage("Không thể thay đổi", "error");
    }
  };

  const handleLandChange = (newLand) => {
    setSelectedLand(newLand);
    snackbarShowMessage("Tổng hợp danh sách sân", "success");
    console.log(newLand);
  };

  console.log("Land ID: ", selectedLand);
  console.log("Owner: ", onwerId);
  const fetchPitch = async (selectedLandd, onwerIdd) => {
    setLoading(true);
    try {
      const response = await PitchApi.GetPitchByOwnerAndNameLand(
        onwerIdd,
        selectedLandd
      );
      selectedPitch(response.data);
      console.log("Pitch: ", response.data);
    } catch (error) {
      // snackbarShowMessage(error.response.data.Exception, "error");
    } finally {
      setLoading(false);
    }
  };

  //----------------------------------------------------------------

  const PER_PAGE = 7;
  let [page, setPage] = useState(1);
  const count = Math.ceil(pitch.length / PER_PAGE);
  const sortfilterDataHistory = [...pitch].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const _Data = sortfilterDataHistory.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );
  function handlePageChanges(event, newValue) {
    setPage(newValue);
  }
  useEffect(() => {
    fetchLand();
    fetchPitch(selectedLand, onwerId);
  }, [onwerId, selectedLand]);

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
        <Typography className="bold-and-large">Quản Lý Sân Nhỏ</Typography>
      </div>
      <div>
        <Select
          value={selectedLand}
          onChange={(event) => {
            const selectedLandId = event.target.value;
            handleLandChange(selectedLandId);
          }}
          style={{
            borderRadius: "10px", // Độ cong viền tròn
            width: "250px", // Độ rộng thu nhỏ
            height: "50px",
          }}
          disabled={loading}
        >
          {land.map((lands) => (
            <MenuItem key={lands.landId} value={lands.landId}>
              {lands.nameLand}
            </MenuItem>
          ))}
        </Select>
      </div>

      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="bold-text">
                Sân nhỏ ID
              </TableCell>
              <TableCell align="center" className="bold-text">
                Tên sân
              </TableCell>
              <TableCell align="center" className="bold-text">
                Loại sân
              </TableCell>
              <TableCell align="center" className="bold-text">
                Giá Giờ Sáng 7h-10h
              </TableCell>
              <TableCell align="center" className="bold-text">
                Giá Giờ Chiều 14h-22h
              </TableCell>
              <TableCell align="center" className="bold-text">
                Ngày giờ tạo
              </TableCell>
              <TableCell align="center" className="bold-text">
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_Data &&
              _Data.map((pitchs) => {
                return (
                  <TableRow key={pitchs.pitchId}>
                    <TableCell align="left">{pitchs.pitchId}</TableCell>
                    <TableCell align="center">{pitchs.name}</TableCell>
                    <TableCell align="center">{pitchs.size}</TableCell>
                    <TableCell align="center">{pitchs.priceMin}</TableCell>
                    <TableCell align="center">{pitchs.priceMax}</TableCell>
                    <TableCell align="center">
                      {dayjs(pitchs.date).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell align="center">
                      <Select
                        value={pitchs.status}
                        onChange={(event) => {
                          const newStatus = event.target.value;
                          handleStatusChange(pitchs.pitchId, newStatus);
                        }}
                        className="status"
                        style={{
                          ...makeStyle(pitchs.status),
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
                    {/* <TableCell align="center">
                      <Orders data={pitchs.bookingId} />
                    </TableCell> */}
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
export default withSnackbar(Pitch);
