import React, { useState, useEffect } from "react";
import Image from "../assets/running.png";
import { Row, Col, Card, Container, CardText, CardBody } from "reactstrap";
import axios from "axios";
import Group from "../components/cards/group";
import { useHistory } from "react-router-dom";

const Teams = ({ match }) => {
  const id = match.params.id;
  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(true);
  const [giphy, setGiphy] = useState({});

  const history = useHistory();
  useEffect(() => {
    axios
      .get(`teams/${id}`)
      .then((response) => {
        setTeam(response.data.team);
        setLoading(false);
        if (response.data.team.groups_count === 0) {
          return axios.get("get_gif");
        }
      })
      .then((response) => {
        if (response) {
          console.log(response);
          setGiphy(response.data.data[0]);
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error && error.response && error.response.status === 404) {
          history.push("/404");
        }
      });
  }, [id]);

  return (
    <div className="content">
      {!loading ? (
        <>
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

                    <p className="description">{team.name}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {team && team.groups && team.groups.length > 0 ? (
            <>
              <Row style={{ justifyContent: "center", textAlign: "center" }}>
                <h2>Want to join a group? Click on the picture</h2>
              </Row>
              <Row style={{ justifyContent: "center", textAlign: "center" }}>
                {team.groups.map((group, index) => (
                  <Col
                    sm={6}
                    md={4}
                    key={index}
                    style={{
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    <Group data={group} />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            giphy &&
            giphy.embed_url && (
              <Row style={{ justifyContent: "center", textAlign: "center" }}>
                <Col>
                  <img
                    alt={giphy.embed_url}
                    width={giphy.images.fixed_width.width}
                    height={giphy.images.fixed_width.width}
                    src={giphy.images.fixed_width.url}
                  />
                </Col>{" "}
              </Row>
            )
          )}
        </>
      ) : null}
    </div>
  );
};

export default Teams;
