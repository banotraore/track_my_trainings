import React, { useEffect, useRef, useContext } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Interceptors from "./utils/Interceptors";
import Homepage from "./layouts/Homepage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Teams from "./pages/Teams";
import PrivateRoute from "./components/routes/PrivateRoute";
import PerfectScrollbar from "perfect-scrollbar";
import Header from "./components/navbars/Header";
import { LoginContext } from "./context/LoginContext";
var ps;

const App = () => {
  const mainPanelRef = useRef(null);
  const { user } = useContext(LoginContext);
  var location = useLocation();
  const pathname = location.pathname;
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
  }, []);

  return (
    <div>
      <Interceptors />
      {pathname !== "/login" && user.isLogged && <Header />}
      <Switch>
        <PrivateRoute
          exact
          path="/"
          component={Homepage}
          mainPanelRef={mainPanelRef}
        />
        <PrivateRoute exact path="/teams/:id" component={Teams} />

        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
