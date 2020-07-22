import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { typeValues } from "../actions";
import { searchValue } from "../actions";
import UserContext from "../auth/UserContext";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import "../styles/header.css";

const Header = (props) => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const dispatch = useDispatch();

  const handleLogout = () => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + "/logout", {
      withCredentials: true,
    })
      .then((res) => {
        dispatch(typeValues([]));
        dispatch(searchValue(""));
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <header>
      {currentUser && (
        <div className="welcome-user">
          <strong>Logged in as {currentUser.name}</strong>{" "}
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <h1>Empire Database</h1>
    </header>
  );
};

export default withRouter(Header);
