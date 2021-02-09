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
      // it he response is successful update the header with new values
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
      return response;
    },
    async (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch({ type: "LOGGING", user: { isLogged: false } });

        // toast.error("Unauthorized", {
        //   position: "top-right",
        //   autoClose: 1000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   progress: undefined,
        // });
      }
      if (error.response.status === 404) {
        toast.error("Not found", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
      return Promise.reject(error);
    }
  );
  return <React.Fragment />;
}

export default Interceptor;
