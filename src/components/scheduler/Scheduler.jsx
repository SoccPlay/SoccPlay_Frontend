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
import "../scheduler/scheduler.scss";
function createData(hour, dataArr) {
  return { hour, data: dataArr };
}

const TIME = [
  "07:00:00",
  "07:30:00",
  "08:00:00",
  "08:30:00",
  "09:00:00",
  "09:30:00",
  "10:00:00",
  "10:30:00",
  "11:00:00",
  "11:30:00",
  "12:00:00",
  "12:30:00",
  "13:00:00",
  "13:30:00",
  "14:00:00",
  "14:30:00",
  "15:00:00",
  "15:30:00",
  "16:00:00",
  "16:30:00",
  "17:00:00",
  "17:30:00",
  "18:00:00",
  "18:30:00",
  "19:00:00",
  "19:30:00",
  "20:00:00",
  "20:30:00",
  "21:00:00",
  "21:30:00",
  "22:00:00",
];

export default function Scheduler({ data }) {
  const [schedules, setSchedule] = useState([]);
  //   const renderScheduler = (TIME) => {
  //     const result = [];
  //     for (let i = 0; i < TIME.length; i++) {
  //       const dataArr = [];
  //       for (let j = 0; j < schedule.length; j++) {
  //         const schedules = schedule[j].schedules;

  //         if (schedules.starTime === TIME[i]) {
  //           dataArr.push(schedule[j]);
  //         }
  //       }
  //       result.push(createData(TIME[i], dataArr));
  //     }
  //     return result;
  //   };
  //   const allTimes = schedules.reduce((times, item) => {
  //     item.schedules.forEach((schedule) => {
  //       if (!times.includes(schedule.starTime)) {
  //         times.push(schedule.starTime);
  //       }
  //     });
  //     return times;
  //   }, []);
  //   const result = renderScheduler(TIME);
  //   console.log("result", schedule);
  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await SchedulerApi.getScheduler(
        data.landId,
        data.date,
        data.size
      );
      setSchedule(response);
    };
    fetchSchedule();
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Khung Giờ</TableCell>
            {schedules &&
              schedules.map((item) => (
                <TableCell key={item.pitchId}>{item.name}</TableCell>
              ))}
          </TableRow>
        </TableHead>

        {TIME.map((time) => (
          <TableRow key={time}>
            <TableCell>{time}</TableCell>
            {schedules &&
              schedules.map((item) => {
                const schedule = item.schedules.find(
                  (schedule) => schedule.starTime === time
                );
                return (
                  <TableCell key={item.pitchId}>
                    {schedule
                      ? `${schedule.starTime} - ${schedule.endTime}`
                      : "-"}
                  </TableCell>
                );
              })}
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
}
