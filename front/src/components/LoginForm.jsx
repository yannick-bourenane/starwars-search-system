import React, { useState, useContext } from "react";
import { FaKey } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Axios from "axios";

import { withRouter } from "react-router-dom";
import UserContext from "../auth/UserContext";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button/";

import "../styles/login.css";

const Login = (props) => {
  const [username, setUsername] = useState("stormtrooper#6879");
  const [password, setPassword] = useState(process.env.REACT_APP_PASSWORD);
  const [msg, setMsg] = useState(null);

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
      setMsg(err.response.data.msg);
      setCurrentUser(null);
    }
  };

  return (
    <form className="form">
      {msg && <p className="msg">{msg}</p>}
      <InputGroup className="input">
        <InputGroup.Prepend>
          <InputGroup.Text
            id="user-icon"
            className="bg-empire-color"
            style={{ border: "none" }}
          >
            <FaUserCircle size="1.2em" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          size="lg"
          type="text"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="user-icon"
          required
          onChange={(e) => setUsername(e.target.value)}
          defaultValue={username ? username : ""}
        />
      </InputGroup>
      <InputGroup className="input">
        <InputGroup.Prepend>
          <InputGroup.Text
            id="password-icon"
            className="bg-empire-color"
            style={{ border: "none" }}
          >
            <FaKey size="1.2em" />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          size="lg"
          type="password"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="password-icon"
          required
          onChange={(e) => setPassword(e.target.value)}
          defaultValue={password ? password : ""}
        />
      </InputGroup>
      <Button
        size="lg"
        variant="secondary"
        className={"button bg-empire-color hvr-fade"}
        onClick={handleSubmit}
      >
        ENTER
      </Button>
    </form>
  );
};

export default withRouter(Login);
