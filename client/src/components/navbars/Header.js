import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames";

import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  NavbarToggler,
  ModalBody,
  Modal,
  Button,
  InputGroup,
  Badge,
  Row,
  Col,
} from "reactstrap";

import { LoginContext } from "../../context/LoginContext";
import { SidebarAndHeaderContext } from "../../context/SidebarAndHeaderContext";
import { toast } from "react-toastify";
import Photo from "../../assets/track.webp";
import Photowebp from "../../assets/track.jpg";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import NotificationWebSocket from "../NotificationWebSocket";

import Autocomplete from "../../utils/Autocomplete";
import { API_WS_ROOT } from "../../utils/Constants";
import actionCable from "actioncable";
import axios from "axios";

toast.configure();
const Header = () => {
  const [collapseOpen, setcollapseOpen] = useState(false);
  const [color, setcolor] = useState("navbar-transparent");

  const { dispatch } = useContext(LoginContext);
  const {
    sidebarOpened,
    toggleSidebar,
    teams,
    modalSearch,
    toggleModalSearch,
  } = useContext(SidebarAndHeaderContext);

  const location = useLocation();

  const [notifications, setNotifications] = useState([]);
  const CableApp = {};
  CableApp.cable = actionCable.createConsumer(`${API_WS_ROOT}`);

  useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };

  useEffect(() => {
    getNotifications();
  }, []);
  const getNotifications = () => {
    axios
      .get("notifications")
      .then((response) => {
        setNotifications(response.data.notifications);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const updateNotificationStatus = (e) => {
    axios
      .patch(`notifications/${e}`, { is_opened: true })

      .catch((error) => {
        console.log(error.response);
      });
  };
  const removeNotification = (e) => {
    updateNotificationStatus(e);
    setNotifications((prevState) =>
      prevState.filter((person) => person.id !== e)
    );
  };

  const logout = () => {
    window.localStorage.removeItem("authHeaders");
    window.localStorage.removeItem("user");
    dispatch({
      type: "LOGGING",
      user: {
        isLogged: false,
      },
    });

    toast.warning("Disconnected", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
  };

  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            {location.pathname === "/" && (
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: sidebarOpened,
                })}
              >
                <NavbarToggler onClick={toggleSidebar}>
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </NavbarToggler>
              </div>
            )}

            <NavbarBrand tag={Link} to="/">
              Track my Trainings{" "}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <FontAwesomeIcon icon={faSearch} size="2x" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup>
              {notifications && notifications.length > 0 && (
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                  >
                    <Badge color="warning" pill>
                      {notifications.length}
                    </Badge>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    {notifications &&
                      notifications.map((notif, index) => (
                        <NavLink tag="li" key={index}>
                          <DropdownItem
                            className="nav-item"
                            onClick={() => {
                              removeNotification(notif.id);
                            }}
                          >
                            {notif.content}
                          </DropdownItem>
                        </NavLink>
                      ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              <UncontrolledDropdown nav>
                <DropdownToggle caret color="default" nav>
                  <div className="photo">
                    <picture>
                      <source srcSet={Photowebp} />

                      <img src={Photo} alt="..." />
                    </picture>
                  </div>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={logout}>
                      Log out
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
        autoFocus={false}
      >
        <ModalBody>
          <Row>
            <Col>
              <Autocomplete suggestions={teams} />
            </Col>
            <Col xs={1}>
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={toggleModalSearch}
                size="2x"
              />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <NotificationWebSocket
        cableApp={CableApp}
        setNotifications={setNotifications}
      />
    </>
  );
};

export default Header;
