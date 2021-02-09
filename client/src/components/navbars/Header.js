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
} from "reactstrap";
import { LoginContext } from "../../context/LoginContext";
import { toast } from "react-toastify";
import Photo from "../../assets/track.webp";
import Photowebp from "../../assets/track.jpg";

toast.configure();
const Header = (props) => {
  //
  const [collapseOpen, setcollapseOpen] = useState(false);
  const [color, setcolor] = useState("navbar-transparent");

  //
  const { user, dispatch } = useContext(LoginContext);
  const [, setLoggedIn] = useState(false);
 


  //
  useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });

  useEffect(() => {
    if (user.isLogged === true) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

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

  const logout = () => {
    window.localStorage.removeItem("authHeaders");
    window.localStorage.removeItem("user");
    setLoggedIn(false);
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
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#bano" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
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
    </>
  );
};

export default Header;
