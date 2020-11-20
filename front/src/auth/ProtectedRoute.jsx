import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./useAuth";
import Spinner from "react-bootstrap/Spinner";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="loading-wrap">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  return isLoggedIn ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
};
