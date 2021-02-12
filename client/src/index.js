import React from "react";
import ReactDOM from "react-dom";
import "./scss/style.scss";
import App from "./App";
import LoginContextProvider from "./context/LoginContext";
import SidebarAndHeaderContextProvider from "./context/SidebarAndHeaderContext";
ReactDOM.render(
  <React.StrictMode>
    <LoginContextProvider>
      <SidebarAndHeaderContextProvider>
        <App />
      </SidebarAndHeaderContextProvider>
    </LoginContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
