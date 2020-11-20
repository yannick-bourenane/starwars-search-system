import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { typeValues } from "../actions";
import { searchValue } from "../actions";
import UserContext from "../auth/UserContext";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import "../styles/header.css";

import { BsPower } from "react-icons/bs";

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
          <div
            aria-label="Logout"
            aria-describedby="logout-icon"
            className="logout"
            onClick={handleLogout}
          >
            Logout
            <BsPower />
          </div>
        </div>
      )}
      <h1>Galaxy Database</h1>
    </header>
  );
};

export default withRouter(Header);
