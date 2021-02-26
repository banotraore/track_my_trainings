import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./scss/style.scss";
import App from "./App";
import LoginContextProvider from "./context/LoginContext";
import SidebarAndHeaderContextProvider from "./context/SidebarAndHeaderContext";
ReactDOM.render(
  <BrowserRouter>
    <LoginContextProvider>
      <SidebarAndHeaderContextProvider>
        <App />
      </SidebarAndHeaderContextProvider>
    </LoginContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
