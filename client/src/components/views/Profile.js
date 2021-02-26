import React from "react";

import { Row, Col, Card, CardHeader, CardText, CardBody } from "reactstrap";

import Image from "../../assets/track-lanes.jpg";

import { toast } from "react-toastify";
import Team from "../cards/team";
toast.configure();

const Profile = (props) => {
  const userInfos = props.userInfos;

  return (
    <div className="content ">
      <Row>
        <Col>
          <Card className="card-user">
            <CardBody>
              <CardText />
              <div className="author">
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                <div className="block block-four" />
                <img alt="..." className="avatar" src={Image} />
                <h5 className="title">
                  {userInfos.first_name} {userInfos.last_name}
                </h5>

                <p className="description">@{userInfos.username}</p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {userInfos &&
        userInfos.athlete_teams &&
        userInfos.athlete_teams.length > 0 && (
          <Card>
            <CardHeader> My Teams </CardHeader>

            <CardBody>
              <Row>
                {userInfos.athlete_teams.map((team, index) => (
                  <Col sm={6} md={4} key={index}>
                    <Team {...team} />
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        )}

      {userInfos && userInfos.coach_teams && userInfos.coach_teams.length > 0 && (
        <Card color="warning">
          <CardHeader> Coaching for </CardHeader>

          <CardBody>
            <Row>
              {userInfos.coach_teams.map((team, index) => (
                <Col sm={6} md={4} key={index}>
                  <Team {...team} />
                </Col>
              ))}
            </Row>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Profile;
