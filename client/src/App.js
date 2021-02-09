import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Interceptors from "./utils/Interceptors";
import Homepage from "./layouts/Homepage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/routes/PrivateRoute";

const App = () => {
  return (
    <div>
      <Interceptors />
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Homepage} />

          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
