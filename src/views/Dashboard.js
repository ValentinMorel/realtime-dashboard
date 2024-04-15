import React, {useEffect, useState} from "react";
import ChartistGraph from "react-chartist";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
const AWS = require('aws-sdk');

import Users from "../assets/img/group.svg"
import BrokenHealth from "../assets/img/broken-heart.svg"
import Reboot from "../assets/img/reboot.svg"


function Dashboard() {
  const [count, setCount] = useState(0)
  const [playingFFA, setPlayingFFA] = useState(0)
  const [playing1v1, setPlaying1v1] = useState(0)
  const [latency, setLatency] = useState(0)
  const [errors, setErrors] = useState(0)

  useEffect(() => {
      const interval = setInterval(() => {
      const dynamodb = new AWS.DynamoDB({
          region: process.env.REACT_APP_region,
          credentials: {
            accessKeyId: process.env.REACT_APP_aws_access_key_id,
            secretAccessKey: process.env.REACT_APP_aws_secret_access_key,
          },
      })

      var paramPut = {
        Key: {
          "id": {
            S: "1"
          }
        },
        TableName: "summary"
      }
      let ret = dynamodb.getItem(paramPut).promise()
          .then((data, err) => {
            setCount(data.Item["total"].N !== undefined ? data.Item["total"].N : 0);
            setPlayingFFA(data.Item["playing_ffa"].N !== undefined ? data.Item["playing_ffa"].N : 0)
            setPlaying1v1(data.Item["playing_1v1"].N !== undefined ? data.Item["playing_1v1"].N: 0)
            setLatency(data.Item["latency"].N !== undefined ? data.Item["latency"].N : 0)
          })
          .catch(err => console.log(err))
    }, 7500) // would be 10s in real use case : sufficient
    return () => clearInterval(interval)
  }, [])








    return (
        <>
          <Container fluid>
            <Row>
              <Col lg="3" sm="6">
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
                          <p className="card-category">Playing FFA</p>
                          <Card.Title as="h4">{playingFFA}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-history"></i>
                      Updated every 5s
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="3" sm="6">
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
                          <p className="card-category">Playing 1v1</p>
                          <Card.Title as="h4">{playing1v1}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-history"></i>
                      Updated every 5s
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="3" sm="6">
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
                          <p className="card-category">Errors</p>
                          <Card.Title as="h4">23</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      From 0:00am to 11:59pm
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="3" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-favourite-28 text-primary"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Latency</p>
                          <Card.Title as="h4">{latency}ms</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-history"></i>

                      Updated every 5s
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="3" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <img src={Users} alt="UsersGroup" width={60} height={60}/>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Total Authentication/Multiplayer Entry</p>
                          <Card.Title as="h4">{count}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-history"></i>

                      Updated every 5s
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="3" sm="6">
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
                          <p className="card-category">Playing 1v1</p>
                          <Card.Title as="h4">1,345</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-history"></i>
                      Updated every 5s
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="3" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <img src={Reboot} width={50} height={50}/>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Restarts</p>
                          <Card.Title as="h4">23</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      From 0:00am to 11:59pm
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col lg="3" sm="6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <img src={BrokenHealth} width={70} height={70}/>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Highest Latency</p>
                          <Card.Title as="h4">842ms</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-history"></i>

                      Updated every 10s
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Users Today</Card.Title>
                    <p className="card-category">24 Hours History</p>
                  </Card.Header>
                  <Card.Body>
                    <div className="ct-chart" id="chartHours">
                      <ChartistGraph
                          data={{
                            labels: [
                              "0:00AM",
                              "3:00AM",
                              "6:00AM",
                              "9:00AM",
                              "12:00AM",
                              "3:00PM",
                              "6:00PM",
                              "9:00PM",
                              "12:00PM",

                            ],
                            series: [
                              [287, 385, 490, 492, 554, 586, 698, 695, 890],
                            ],
                          }}
                          type="Line"
                          options={{
                            low: 0,
                            high: 1000,
                            showArea: true,
                            height: "245px",
                            axisX: {
                              showGrid: true,
                            },
                            lineSmooth: false,
                            showLine: true,
                            showPoint: true,
                            fullWidth: true,
                            chartPadding: {
                              right: 80,
                              left: 20
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
                    <div className="legend">
                      <i className="fas fa-circle text-info"></i>
                      <i className="fas fa-circle text-danger"></i>
                      <i className="fas fa-circle text-warning"></i>

                    </div>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-history"></i>
                      Updated every minute
                    </div>
                  </Card.Footer>
                </Card>

              </Col>
              <Col md="6">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Recent Latency</Card.Title>
                    <p className="card-category">Last 2 Hours</p>
                  </Card.Header>
                  <Card.Body>
                    <div className="ct-chart" id="chartHours">
                      <ChartistGraph
                          data={{
                            labels: [
                              "-2h",
                              "-1h45",
                              "-1h30",
                              "-1h15",
                              "-1h",
                              "-45min",
                              "-30min",
                              "-15min",
                              "now",

                            ],
                            series: [
                              [42, 35, 30, 80, 65, 120, 280, 40, 38],
                            ],
                          }}
                          type="Line"
                          options={{
                            low: 0,
                            high: 290,
                            showArea: false,
                            height: "245px",
                            axisX: {
                              showGrid: false,
                            },
                            lineSmooth: false,
                            showLine: true,
                            showPoint: true,
                            fullWidth: true,
                            chartPadding: {
                              right: 80,
                              left: 50
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
                    <div className="legend">
                      <i className="fas fa-circle text-info"></i>
                      <i className="fas fa-circle text-danger"></i>
                      <i className="fas fa-circle text-warning"></i>

                    </div>
                    <hr></hr>
                    <div className="stats">
                      <i className="fas fa-history"></i>
                      Updated every minute
                    </div>
                  </Card.Footer>
                </Card>

              </Col>

            </Row>
            <Row>
              <Col md="7">
                <Card className="strpied-tabled-with-hover">
                  <Card.Header>
                    <Card.Title as="h4">Running Servers</Card.Title>
                    <p className="card-category">
                      Overview
                    </p>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                      <tr>
                        <th className="border-0">Server</th>
                        <th className="border-0">Number of players</th>
                        <th className="border-0">Latency Variation</th>
                        <th className="border-0">Status</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>eu-west-Goldorak-01</td>
                        <td>10000</td>
                        <td>Stable</td>
                        <td>Good / Online</td>
                      </tr>
                      <tr>
                        <td>eu-west-Goldorak-02</td>
                        <td>4000</td>
                        <td>Moderate</td>
                        <td>Good / Online</td>
                      </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

          </Container>
        </>
    );

}

export default Dashboard;
