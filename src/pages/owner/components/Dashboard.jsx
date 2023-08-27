import React from "react";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { AiFillClockCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { SlGraph } from "react-icons/sl";
import ChartistGraph from "react-chartist";
import "./Dashboard.scss"; // You can keep your own styling here

function Dashboard() {
  return (
    <div
      className="Table"
      style={{
        height: "100vw",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Container fluid className="ml-12 p-4 main-color">
        <Grid container spacing={3}>
          <Grid item lg={4} sm={8}>
            <Card className="card-stats">
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={5}>
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Grid>
                  <Grid item xs={7}>
                    <div className="numbers">
                      <Typography variant="subtitle1" className="card-category">
                        Tổng số đơn đặt sân
                      </Typography>
                      <Typography variant="h4">17 đơn</Typography>
                    </div>
                  </Grid>
                </Grid>
                <hr />
                <div className="stats">
                  <Typography className="flex" variant="body2">
                    <AiFillClockCircle className="mr-1 mt-1" />
                    Hiện tại
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
          {/* Repeat the pattern for the other columns */}
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6">Đơn đặt theo giờ</Typography>
                <Typography variant="subtitle1" className="card-category">
                  phân tích tỉ lệ theo giờ
                </Typography>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "7:00",
                        "8:00",
                        "9:00",
                        "10:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                        "19:00",
                        "20:00",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846],
                        [67, 152, 143, 240, 287, 335, 435, 437, 435, 545, 582],
                        [23, 113, 67, 108, 190, 239, 307, 308, 439, 450, 499],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
                <div className="legend flex">
                  <div className="color mr-8">
                    <SlGraph className="text-red-500 w-8" />
                    <Typography className="text-center text-lg">
                      Cancel
                    </Typography>
                  </div>
                  <div className="color mr-8">
                    <SlGraph className="text-cyan-500 w-8" />
                    <Typography className="text-center text-lg">
                      Done
                    </Typography>
                  </div>
                  <div className="color">
                    <SlGraph className="text-orange-500 w-8" />
                    <Typography className="text-center text-lg">
                      Waiting
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Cỡ sân đang có</Typography>
                <Typography variant="subtitle1" className="card-category">
                  sân 5 người và sân 7 người
                </Typography>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["3", "7"],
                      series: [3, 7],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend flex">
                  <div className="color mr-4">
                    <BsCircleFill className="text-red-500 w-8" />
                    <Typography className="text-center text-xl">
                      sân 5
                    </Typography>
                  </div>
                  <div className="color">
                    <BsCircleFill className="text-cyan-500 w-8" />
                    <Typography className="text-center text-xl">
                      sân 7
                    </Typography>
                  </div>
                </div>
                <hr />
                <div className="stats">
                  <Typography className="flex" variant="body2">
                    <AiFillClockCircle className="mr-1" />
                    Hiện tại
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Doanh thu trong năm</Typography>
                <Typography variant="subtitle1" className="card-category">
                  Chưa hao trừ tri phí
                </Typography>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Tháng 1",
                        "Tháng 2",
                        "Tháng 3",
                        "Tháng 4",
                        "Tháng 5",
                        "Tháng 6",
                        "Tháng 7",
                        "Tháng 8",
                        "Tháng 9",
                        "Tháng 10",
                        "Tháng 11",
                        "Tháng 12",
                      ],
                      series: [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [
                          412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636,
                          920,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "270px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
