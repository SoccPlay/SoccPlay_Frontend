import ChartistGraph from "react-chartist";
// react-bootstrap components
import { Card, Col, Container, Row } from "react-bootstrap";
import { AiFillClockCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { SlGraph } from "react-icons/sl";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import DashboardApi from "components/Axios/DashboardApi";
import { formatPrice } from "pages/profile/components/History";
function Dashboard() {
  const onwerId = localStorage.getItem("OWNERID");
  const [bookingNumber, setBookingNumber] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [pitchNumber, setPitchNumber] = useState([]);
  const [summaryByMonth, setSummaryByMonth] = useState([]);
  const [totalPitch, setTotalPitch] = useState(0);
  const monthArr = [
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
  ];
  const fetchSummary = async () => {
    try {
      const bookingNumberResponse = await DashboardApi.GetSummaryBooking(
        onwerId
      );
      const revenueResponse = await DashboardApi.GetSummaryProfit(onwerId);
      const pitchNumberResponse = await DashboardApi.GetSummarypitch(onwerId);
      const summaryByMonthResponse = await DashboardApi.GetSummaryByMonth(
        new Date().getFullYear(),
        onwerId
      );
      setBookingNumber(bookingNumberResponse.data);
      setRevenue(revenueResponse.data);
      setPitchNumber(pitchNumberResponse.data);
      setSummaryByMonth(summaryByMonthResponse.data);
      setTotalPitch(pitchNumberResponse.data[0] + pitchNumberResponse.data[1]);
      console.log("month", summaryByMonthResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <>
      <Container fluid className="ml-12 p-4 main-color ">
        <Row>
          <Col lg="4" sm="8">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Tổng số đơn đặt sân</p>
                      <Card.Title as="h4">{bookingNumber} đơn</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <p className="flex">
                    <AiFillClockCircle className="mr-1 mt-1" />
                    Hiện tại
                  </p>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="8">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Tổng doanh thu</p>
                      <Card.Title as="h4">{formatPrice(revenue)}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <p className="flex">
                    <AiFillClockCircle className="mr-1 mt-1" />
                    Hiện tại
                  </p>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="8">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Tổng số sân</p>
                      <Card.Title as="h4">{totalPitch} sân</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <p className="flex">
                    <AiFillClockCircle className="mr-1 mt-1" />
                    Hiện tại
                  </p>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Doanh thu trong năm</Card.Title>
                <p className="card-category">Chưa hao trừ tri phí</p>
              </Card.Header>
              <Card.Body>
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
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Cỡ sân đang có</Card.Title>
                <p className="card-category">sân 5 người và sân 7 người</p>
              </Card.Header>
              <Card.Body style={{ height: "391px" }}>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: pitchNumber.map((value, index) => `${value}`),
                      series: pitchNumber.map((value, index) => `${value}`),
                    }}
                    options={{
                      donutWidth: 60,
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend flex">
                  <div className="color mr-4">
                    <BsCircleFill className="text-cyan-500 w-8" />
                    <p className="text-center text-xl">sân 5</p>
                  </div>
                  <div className="color">
                    <BsCircleFill className="text-red-500 w-8" />
                    <p className="text-center text-xl">sân 7</p>
                  </div>
                </div>
                <hr></hr>
                <div className="stats">
                  <p className="flex">
                    <AiFillClockCircle className="mr-1 mt-1" />
                    Hiện tại
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
