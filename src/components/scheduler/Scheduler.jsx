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
    const [schedule, setSchedule] = useState([]);
    const renderScheduler = (TIME) => {
        const result = [];
        for (let i = 0; i < TIME.length; i++) {
            const dataArr = [];
            for (let j = 0; j < schedule.length; j++) {
                const schedules = schedule[j].schedules;

                if (schedules.starTime === TIME[i]) {
                    dataArr.push(schedule[j]);
                }
            }
            result.push(createData(TIME[i], dataArr));
        }
        return result;
    };

    const result = renderScheduler(TIME);
    console.log("result", schedule);
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {schedule &&
                    schedule.map((item) => {
                        return (
                            <div>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Khung giờ</TableCell>
                                        <TableCell align="center">
                                            {item.name}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {result.map((result) => (
                                        <TableRow
                                            key={result.name}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {result.hour.slice(0, 5)}
                                            </TableCell>
                                            <TableCell align="center">
                                                {result.data.length > 0 ? (
                                                    <BookItem />
                                                ) : (
                                                    <p>chưa ai đặt</p>
                                                )}
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
