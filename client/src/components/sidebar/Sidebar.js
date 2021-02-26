import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Col, Nav, NavItem, NavLink, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var ps;

const Sidebar = (props) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const { routes, logo, activeTab, toggleTab } = props;
  let logoImg = null;
  if (logo && logo.outterLink) {
    logoImg = (
      <Link
        to={logo.outterLink}
        className="simple-text logo-mini"
        onClick={props.toggleSidebar}
      >
        <div className="logo-img">
          <img src={logo.imgSrc} alt="react-logo" />
        </div>
      </Link>
    );
  }

  return (
    <div className="sidebar" data={"green"}>
      <div className="sidebar-wrapper" ref={sidebarRef}>
        <Row>
          <Col>
            <div className="logo">{logoImg} </div>
          </Col>
        </Row>
        <Nav>
          {routes &&
            routes.map((route, index) => (
              <NavItem key={index}>
                <NavLink
                  style={{ color: "white" }}
                  className={classnames({ active: activeTab === index })}
                  onClick={() => {
                    toggleTab(index);
                  }}
                >
                  <FontAwesomeIcon size="3x" icon={route.icon} /> {route.name}
                </NavLink>
              </NavItem>
            ))}
        </Nav>
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // insde the links of this component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
  }),
};
export default Sidebar;
