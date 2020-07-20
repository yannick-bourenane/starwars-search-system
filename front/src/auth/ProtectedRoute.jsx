import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading)
    return <div className="flex-center-column loading">LOADING...</div>;
  return isLoggedIn ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
};
