import ChartistGraph from "react-chartist";
// react-bootstrap components
import { Card, Col, Container, Row } from "react-bootstrap";
import { AiFillClockCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { SlGraph } from "react-icons/sl";
import "./Dashboard.scss";
function Dashboard() {
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
                      <Card.Title as="h4">17 đơn</Card.Title>
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
                      <Card.Title as="h4">15.000.000 VND</Card.Title>
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
                      <Card.Title as="h4">12</Card.Title>
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
          <Col md="7">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Đơn đặt theo giờ</Card.Title>
                <p className="card-category">phân tích tỉ lệ theo giờ</p>
              </Card.Header>
              <Card.Body>
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
              </Card.Body>
              <Card.Footer>
                <div className="legend flex">
                  <div className="color mr-8">
                    <SlGraph className="text-red-500 w-8" />
                    <p className="text-center text-lg">Cancel</p>
                  </div>
                  <div className="color mr-8">
                    <SlGraph className="text-cyan-500 w-8" />
                    <p className="text-center text-lg">Done</p>
                  </div>
                  <div className="color">
                    <SlGraph className="text-orange-500 w-8" />
                    <p className="text-center text-lg">Waiting</p>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Cỡ sân đang có</Card.Title>
                <p className="card-category">sân 5 người và sân 7 người</p>
              </Card.Header>
              <Card.Body>
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
                    <p className="text-center text-xl">sân 5</p>
                  </div>
                  <div className="color">
                    <BsCircleFill className="text-cyan-500 w-8" />
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
        <Row>
          <Col md="7">
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
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
