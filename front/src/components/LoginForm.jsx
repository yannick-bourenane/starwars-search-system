import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { currentUser } from "../actions";

import Axios from "axios";

import { withRouter } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("Luke");
  const [password, setPassword] = useState(process.env.REACT_APP_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiRes = await Axios.post(
        process.env.REACT_APP_BACKEND_URL + "/login",
        { username, password }
      );
      console.log(apiRes);
      if (!!apiRes.data) {
        //localStorage.setItem("sid-example", "Tom");
        dispatch(currentUser(apiRes.data));
        props.history.push("/search");
      } else {
        throw new Error("Error with the authentication");
      }
    } catch (err) {
      console.log(err);
      dispatch(currentUser({}));
    }
  };

  return (
    <form styleName={"form"}>
      <input
        styleName={"input"}
        type="text"
        placeholder="Utilisateur"
        required
        onChange={(e) => setUsername(e.target.value)}
        defaultValue={username ? username : ""}
      />
      <input
        styleName={"input"}
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        defaultValue={password ? password : ""}
      />
      <button styleName={"button"} onClick={handleSubmit}>
        Se connecter
      </button>
    </form>
  );
};

export default withRouter(Login);
