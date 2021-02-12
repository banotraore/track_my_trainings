import React, { useContext } from "react";

import axios from "axios";
import { config } from "./Constants";

import { LoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";
toast.configure();

// This component will take care of changing the value of the headers depending
// on the request and the status of the user with the server response
function Interceptor() {
  const { dispatch } = useContext(LoginContext);

  axios.defaults.baseURL = config.url.API_URL;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";

  // Update the headers credentials
  const upadateHeaders = (response) => {
    if (response.headers["access-token"]) {
      const authHeaders = {
        "access-token": response.headers["access-token"],
        client: response.headers["client"],
        uid: response.headers["uid"],
        expiry: response.headers["expiry"],
        "token-type": response.headers["token-type"],
      };
      window.localStorage.setItem("authHeaders", JSON.stringify(authHeaders));
    }
  };
  axios.interceptors.request.use(
    async (config) => {
      const authHeaders = JSON.parse(
        window.localStorage.getItem("authHeaders")
      );

      if (authHeaders) {
        config.headers[config.method] = {
          "access-token": authHeaders["access-token"],
          client: authHeaders["client"],
          uid: authHeaders["uid"],
        };
      }

      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    async (response) => {
      upadateHeaders(response);

      return response;
    },
    async (error) => {
      if (error.response.status !== 401) {
        upadateHeaders(error.response);
      }
      if (error.response.status === 401) {
        dispatch({ type: "LOGGING", user: { isLogged: false } });
      }
      return Promise.reject(error);
    }
  );
  return <React.Fragment />;
}

export default Interceptor;
