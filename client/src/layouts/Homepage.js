import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../context/LoginContext";

// javascript plugin used to create scrollbars on windows
import Sidebar from "../components/sidebar/Sidebar";

// core components
import Dashboard from "../components/views/Dashboard";
import Calendar from "../components/views/Calendar";
// import Profile from "../components/views/Profile";
import Profile from "../components/views/Profile";

import routes from "../components/routes/allroutes";
import { TabContent, TabPane, Row, Col, Container } from "reactstrap";
import logo from "../assets/running.png";

const Homepage = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
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
    <div className="wrapper">
      <Sidebar
        routes={routes}
        logo={{
          outterLink: "/",
          text: "Homepage",
          imgSrc: logo,
        }}
        toggleTab={toggleTab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="main-panel" ref={props.mainPanelRef} data={"green"}>
        <div className="content">
          {!loading ? (
            <TabContent activeTab={activeTab}>
              <TabPane tabId={0}>
                <Row noGutters>
                  <Col>
                    <Dashboard userInfos={userInfos} />
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId={1}>
                <Row noGutters>
                  <Col>
                    <Calendar />{" "}
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId={2}>
                <Row noGutters>
                  <Col>
                    <Profile userInfos={userInfos} />{" "}
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          ) : (
            <Container>
              <Col>
                <h2>Loading ...</h2>
              </Col>
            </Container>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
