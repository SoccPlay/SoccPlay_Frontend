// react-bootstrap components
import { Card, Col, Container, Row } from "react-bootstrap";
import { AiFillClockCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { SlGraph } from "react-icons/sl";
import "./Dashboard.scss";
import { useEffect, useState } from "react";
import DashboardApi from "components/Axios/DashboardApi";
import { formatPrice } from "pages/profile/components/History";
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import "./Top3Card.scss";
function Dashboard() {
  const onwerId = localStorage.getItem("OWNERID");
  const [bookingNumber, setBookingNumber] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [pitchNumber, setPitchNumber] = useState([]);
  const [summaryByMonth, setSummaryByMonth] = useState([]);
  const [totalPitch, setTotalPitch] = useState(0);
  const [top3Revenue, setTop3Revenue] = useState([]);
  const monthArr = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const resultMonthPrice = monthArr.map((month) => {
    const result = summaryByMonth.find((item) => item.bookingMonth == month);
    return result?.totalPriceSum ?? 0;
  });

  const barPriceData = {
    labels: monthArr.map((month) => `Tháng ${month}`),
    datasets: [
      {
        label: "Tổng tiền thu được (nghìn đồng)",
        data: resultMonthPrice.map((item) => item),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  console.log("result price month", resultMonthPrice);
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
      const top3RevenueResponse = await DashboardApi.GetTop3Revenue(onwerId);
      setBookingNumber(bookingNumberResponse.data);
      setRevenue(revenueResponse.data);
      setPitchNumber(pitchNumberResponse.data);
      setSummaryByMonth(summaryByMonthResponse.data);
      setTotalPitch(pitchNumberResponse.data[0] + pitchNumberResponse.data[1]);
      setTop3Revenue(top3RevenueResponse.data);
      console.log("month", summaryByMonthResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const pieData = {
    labels: ["Sân 5", "Sân 7"],
    datasets: [
      {
        label: "Tổng số sân",
        data: [pitchNumber[0], pitchNumber[1]],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

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
                <div style={{ width: "780px" }}>
                  <BarChart barPriceData={barPriceData} />
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
              <Card.Body>
                <div
                  style={{
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "20px",
                  }}
                >
                  <PieChart pitchNumber={pieData} />
                </div>

                <hr />
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
        <Row>
          <Col md="12">
            <Card className="top-courts-card">
              <Card.Header
                style={{
                  background: "rgba(255, 7, 7, 0.1)",
                }}
              >
                <Card.Title as="h2" className="top-title">
                  Top 3 Sân có doanh thu tốt nhất
                </Card.Title>
              </Card.Header>
              <Card.Body>
                {top3Revenue.map((court, index) => (
                  <div className="court-info" key={index}>
                    <div className="court-left">
                      <h3 className="court-name">{court.nameLand}</h3>
                      <p className="revenue">
                        Doanh thu: {formatPrice(court.summaryIncome)}
                      </p>
                      <p className="address">Địa chỉ: {court.location}</p>
                    </div>
                    <div className="court-right">
                      <img
                        className="court-image"
                        src={court.image}
                        alt={`Hình ảnh sân ${court.nameLand}`}
                      />
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
