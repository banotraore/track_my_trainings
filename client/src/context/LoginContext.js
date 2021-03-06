import React, { createContext, useReducer, useEffect } from "react";
import { loginreducer } from "../reducers/LoginReducer";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [user, dispatch] = useReducer(loginreducer, {}, () => {
    // if the user exist on the localstorage use it or use ans empty object as default value
    const localLoginStatus = localStorage.getItem("user");
    return localLoginStatus ? JSON.parse(localLoginStatus) : {};
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <LoginContext.Provider value={{ user, dispatch }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
