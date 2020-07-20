import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";

import Axios from "axios";

import { withRouter } from "react-router-dom";
import UserContext from "../auth/UserContext";

import "../styles/login.css";

const Login = (props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("Luke");
  const [password, setPassword] = useState(process.env.REACT_APP_PASSWORD);

  const userContext = useContext(UserContext);
  const { setCurrentUser } = userContext;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiRes = await Axios.post(
        process.env.REACT_APP_BACKEND_URL + "/login",
        { username, password },
        { withCredentials: true }
      );
      if (!!apiRes.data) {
        setCurrentUser(apiRes.data);
        props.history.push("/search");
      } else {
        throw new Error("Error with the authentication");
      }
    } catch (err) {
      console.log(err);
      setCurrentUser(null);
    }
  };

  return (
    <form className="form">
      <input
        className={"input"}
        type="text"
        placeholder="Utilisateur"
        required
        onChange={(e) => setUsername(e.target.value)}
        defaultValue={username ? username : ""}
      />
      <input
        className={"input"}
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        defaultValue={password ? password : ""}
      />
      <button className={"button"} onClick={handleSubmit}>
        Se connecter
      </button>
    </form>
  );
};

export default withRouter(Login);
