import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BookItem from "./bookItem/BookItem";
import * as SchedulerApi from "../Axios/Scheduler";

function createData(hour, size1, size2, size3) {
  return { hour, size1, size2, size3 };
}

const TIME = [
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];
const boldTextStyle = {
  fontWeight: "bold",
};
const rows = [createData(TIME[0], <BookItem />, <BookItem />, <BookItem />)];

export default function Scheduler({ data }) {
  const [schedule, setSchedule] = useState();

  const pushRowsData = (data) => {
    //get array schedules
    const arraySchedule = schedule.map((item) => item.schedules);
    //if array schedules have the same starTime, return array time
    const arrayStartTime = arraySchedule.filter((item) => item.starTime);
    //if array schedules have the same endTime, return array time
    const arrayEndTime = arraySchedule.filter((item) => item.endTime);
    //if array schedules have the same pitchId, return array time
    const arrayPitchId = arraySchedule.filter((item) => item.pitchId);
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await SchedulerApi.getScheduler(
        data.landId,
        data.date,
        data.size
      );
      setSchedule(response);
      console.log("Show list schedule: " + [response.data]);
    };
    fetchSchedule();
  }, []);
  //   console.log("Show Schedule: " + schedule);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {schedule &&
          schedule.map((item) => {
            return (
              <div>
                <TableHead>
                  <TableRow>
                    <TableCell style={boldTextStyle}>Khung giờ</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.schedules.map((row) => (
                    <TableRow
                      key={row.pitchId}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {/* {row.starTime} */}
                        Đã Booking
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <TableRow align="center">{row.starTime}</TableRow>
                        <TableRow align="center">{row.endTime}</TableRow>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </div>
            );
          })}
      </Table>
    </TableContainer>
  );
}
