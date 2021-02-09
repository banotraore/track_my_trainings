import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import Sidebar from "../components/sidebar/Sidebar";

// core components
import Header from "../components/navbars/Header";
import Dashboard from "../components/views/Dashboard";
import Calendar from "../components/views/Calendar";
import Profile from "../components/views/Profile";

import routes from "../components/routes/allroutes";
import { TabContent, TabPane, Row, Col } from "reactstrap";
import logo from "../assets/running.png";
var ps;

const Homepage = () => {
  const location = useLocation();
  const mainPanelRef = useRef(null);
  const [sidebarOpened, setsidebarOpened] = useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );

  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Track my Trainings";
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
        toggleSidebar={toggleSidebar}
        toggleTab={toggleTab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="main-panel" ref={mainPanelRef} data={"green"}>
        {/* top navbar */}
        <Header
          brandText={getBrandText(location.pathname)}
          toggleSidebar={toggleSidebar}
          sidebarOpened={sidebarOpened}
        />

        <div className="content">
          <TabContent activeTab={activeTab}>
            <TabPane tabId={0}>
              <Row noGutters>
                <Col>
                  <Dashboard />
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
                  <Profile />{" "}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
