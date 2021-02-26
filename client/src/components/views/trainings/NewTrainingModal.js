import React, { useEffect, useState, useContext } from "react";

import axios from "axios";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Modal,
  Col,
} from "reactstrap";
import classnames from "classnames";

import PersonalTraining from "./new_training/PersonalTraining";
import GroupTraining from "./new_training/GroupTraining";
import SpecialTraining from "./new_training/SpecialTraining";

import { LoginContext } from "../../../context/LoginContext";

const NewTrainingModal = (props) => {
  const { user } = useContext(LoginContext);

  const [groups, setGroups] = useState([]);
  const [athletes, setAthletes] = useState([]);

  const [activeTab, setActiveTab] = useState(
    user.coachID && user.coachID !== "" ? "1" : "3"
  );

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = () => {
    if (user.coachID && user.coachID !== "") {
      const requestOne = axios.get("groups");
      const requestTwo = axios.get("athletes");

      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];

            setGroups(responseOne.data.groups);
            setAthletes(responseTwo.data.athletes);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container>
      <Modal
        modalClassName="modal-black"
        isOpen={props.modal}
        toggle={props.toggle}
        className={props.className}
        size="lg"
      >
        <Col>
          <Nav tabs>
            {user.coachID && user.coachID !== "" && (
              <>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    Group training
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Special training
                  </NavLink>
                </NavItem>
              </>
            )}

            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  toggleTab("3");
                }}
              >
                Personal training
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} style={{ margin: 5 }}>
            {user.coachID && user.coachID !== "" && (
              <>
                <TabPane tabId="1">
                  <GroupTraining newTraining={props} groups={groups} />
                </TabPane>
                <TabPane tabId="2">
                  <SpecialTraining
                    newTraining={props}
                    groups={groups}
                    athletes={athletes}
                  />
                </TabPane>
              </>
            )}

            <TabPane tabId="3">
              <PersonalTraining newTraining={props} />
            </TabPane>
          </TabContent>
        </Col>
      </Modal>
    </Container>
  );
};

export default NewTrainingModal;
