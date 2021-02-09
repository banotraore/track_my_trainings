import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

// This route is accessible a signed user.
// If the user is not signed. He/She is redirect to the login page
function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(LoginContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
