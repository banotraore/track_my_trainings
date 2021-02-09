import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { LoginContext } from "../../context/LoginContext";

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Table,
  Row,
  Col,
} from "reactstrap";
const Dashboard = () => {
  const { dispatch } = useContext(LoginContext);

  const [userInfos, setUserInfos] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = () => {
    axios
      .get("infos")
      .then((response) => {
        setUserInfos(response.data.user);
        if (response.data.user.coachID) {
          dispatch({
            type: "COACH",
            coachID: response.data.user.coachID,
          });
        }

        setLoading(false);
      })

      .catch((errors) => {
        console.error(errors);
      });
  };

  return (
    <div className="content">
      {!loading ? (
        <>
          <Row>
            <Col x2={12} sm={8} md={8}>
              <Row>
                <Card
                  body
                  inverse
                  // color="info"
                >
                  <Row>
                    {userInfos && userInfos.last_training && (
                      <>
                        <Col xs={12} sm={4}>
                          <CardBody>
                            <CardTitle tag="h5">Last pratice</CardTitle>

                            <CardTitle tag="h5">
                              {moment(userInfos.last_training.start).format(
                                "D"
                              )}{" "}
                              {moment(userInfos.last_training.start).format(
                                "MMM"
                              )}
                            </CardTitle>
                            <CardText>
                              {moment
                                .utc(userInfos.last_training.start)
                                .format("HH:mm")}
                            </CardText>
                            {userInfos.last_training.facility && (
                              <CardText tag="h6">
                                {userInfos.last_training.facility}
                              </CardText>
                            )}

                            {userInfos.last_training.title !== "Personal" && (
                              <CardText tag="h6">
                                {userInfos.last_training.title}
                              </CardText>
                            )}
                          </CardBody>
                        </Col>
                        <Col xs={12} sm={8}>
                          <Card>
                            <CardBody>
                              <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                  <tr>
                                    <th>Sets num</th>
                                    <th>Reps num</th>
                                    <th>Discipline</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userInfos.last_training &&
                                    userInfos.last_training.training_disciplines.map(
                                      (discipline, index) => (
                                        <tr key={index}>
                                          <td>{discipline.sets_num}</td>
                                          <td>{discipline.reps_num}</td>
                                          <td>{discipline.discipline}</td>
                                        
                                        </tr>
                                      )
                                    )}
                                </tbody>
                              </Table>
                            </CardBody>
                          </Card>
                        </Col>
                      </>
                    )}
                  </Row>
                </Card>
              </Row>
            </Col>

            {userInfos && userInfos.next_training && (
              <Col x2={12} sm={4} md={4} className="text-center">
                <Card body inverse color="info">
                  <CardBody>
                    <CardTitle tag="h5">Next pratice</CardTitle>

                    <CardTitle tag="h5">
                      {moment(userInfos.next_training.start).format("D")}{" "}
                      {moment(userInfos.next_training.start).format("MMM")}
                    </CardTitle>
                    <CardText>
                      {moment
                        .utc(userInfos.next_training.start)
                        .format("HH:mm")}
                    </CardText>
                    {userInfos.next_training.facility && (
                      <CardText tag="h6" className="text-dark">
                        {userInfos.next_training.facility}
                      </CardText>
                    )}
                    {userInfos.next_training.title !== "Personal" && (
                      <CardText tag="h6" className="text-dark">
                        {userInfos.next_training.title}
                      </CardText>
                    )}
                  </CardBody>
                  <Row>
                    <Col>col 1</Col>
                    <Col>col 2</Col>
                    <Col>col 3</Col>
                  </Row>
                </Card>
              </Col>
            )}
          </Row>

          {/* coach start */}
          {userInfos && userInfos.last_coach_training && (
            <Row>
              <Col x2={12} sm={8} md={8}>
                <Row>
                  <Card body inverse color="warning">
                    <Row>
                      <>
                        <Col xs={12} sm={4}>
                          <CardBody>
                            <CardTitle tag="h5">Last coach pratice</CardTitle>

                            <CardTitle tag="h5">
                              {moment(
                                userInfos.last_coach_training.start
                              ).format("D")}{" "}
                              {moment(
                                userInfos.last_coach_training.start
                              ).format("MMM")}
                            </CardTitle>
                            <CardText>
                              {moment
                                .utc(userInfos.last_coach_training.start)
                                .format("HH:mm")}
                            </CardText>
                            {userInfos.last_coach_training.facility && (
                              <CardText tag="h6">
                                {userInfos.last_coach_training.facility}
                              </CardText>
                            )}

                            {userInfos.last_coach_training.title !==
                              "Personal" && (
                              <CardText tag="h6">
                                {userInfos.last_coach_training.title}
                              </CardText>
                            )}
                          </CardBody>
                        </Col>
                        <Col xs={12} sm={8}>
                          <Card>
                            <CardBody>
                              <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                  <tr>
                                    <th>Sets num</th>
                                    <th>Reps num</th>
                                    <th>Discipline</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userInfos &&
                                    userInfos.last_coach_training &&
                                    userInfos.last_coach_training
                                      .training_disciplines &&
                                    userInfos.last_coach_training.training_disciplines.map(
                                      (discipline, index) => (
                                        <tr key={index}>
                                          <td>{discipline.sets_num}</td>
                                          <td>{discipline.reps_num}</td>
                                          <td>{discipline.discipline}</td>
                                         
                                        </tr>
                                      )
                                    )}
                                </tbody>
                              </Table>
                            </CardBody>
                          </Card>
                        </Col>
                      </>
                    </Row>
                  </Card>
                </Row>
              </Col>

              <Col x2={12} sm={4} md={4} className="text-center">
                <Card body inverse color="success">
                  <CardBody>
                    <CardTitle tag="h5">Next coach pratice</CardTitle>

                    <CardTitle tag="h5">
                      {moment(userInfos.next_coach_training.start).format("D")}{" "}
                      {moment(userInfos.next_coach_training.start).format(
                        "MMM"
                      )}
                    </CardTitle>
                    <CardText>
                      {moment
                        .utc(userInfos.next_coach_training.start)
                        .format("HH:mm")}
                    </CardText>
                    {userInfos.next_coach_training.facility && (
                      <CardText tag="h6" className="text-dark">
                        {userInfos.next_coach_training.facility}
                      </CardText>
                    )}
                    {userInfos.next_coach_training.title !== "Personal" && (
                      <CardText tag="h6" className="text-dark">
                        {userInfos.next_coach_training.title}
                      </CardText>
                    )}
                  </CardBody>
                  <Row>
                    <Col>col 1</Col>
                    <Col>col 2</Col>
                    <Col>col 3</Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          )}

          {/* coach end */}
        </>
      ) : (
        <Container>
          <Col>
            <h2> ...</h2>
          </Col>
        </Container>
      )}
    </div>
  );
};

export default Dashboard;
