import React from "react";
import { Col, Card, CardTitle, CardBody, Row } from "reactstrap";
import Pic from "../../assets/track.jpg";
import Picwebp from "../../assets/track.webp";
import NoCoachPicwebp from "../../assets/cross.webp";
import NoCoachPic from "../../assets/cross.png";
import axios from "axios";
import { toast } from "react-toastify";
toast.configure();
const group = (props) => {
  const group = props.data;

  const joinGroup = () => {
    var result = window.confirm(`Do you want to join this awesome group?`);

    if (result) {
      axios
        .post("group_athletes", { group_id: group.id })
        .then((response) => {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          toast.error(error.response.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <Card
      style={{ padding: "15px" }}
      onClick={() => {
        joinGroup();
      }}
    >
      <CardTitle tag="h5">{group.name} </CardTitle>
      <CardBody>
        <Row noGutters>
          {group &&
            group.coaches &&
            group.coaches.map((coach, index) => (
              <Col key={index} xs="4" style={{ margin: "auto" }}>
                <div>
                  <picture>
                    <source srcSet={Picwebp} />

                    <img
                      src={Pic}
                      className="img-thumbnail img-fluid rounded-circle mb-3 shadow-sm"
                    />
                  </picture>
                  <h6 className="mb-1">{coach.first_name} </h6>
                </div>
              </Col>
            ))}
          {group && !group.coaches && (
            <Col xs="4" style={{ margin: "auto" }}>
              <div>
                <picture>
                  <source srcSet={NoCoachPicwebp} />

                  <img
                    src={NoCoachPic}
                    className="img-thumbnail img-fluid rounded-circle mb-3 shadow-sm"
                  />
                </picture>
                <h6 className="mb-1">Coach needed</h6>
              </div>
            </Col>
          )}
        </Row>
      </CardBody>
    </Card>
  );
};

export default group;
