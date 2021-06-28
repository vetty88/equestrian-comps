import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // auth.isAuthenticated === true ? (
        <Component {...props} />
      // ) : (
      //   <Redirect to="/login" />
      // )
    }
  />
);


export default PrivateRoute;
