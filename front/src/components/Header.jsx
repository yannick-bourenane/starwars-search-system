import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { withRouter } from "react-router-dom";
import Axios from "axios";

const Header = (props) => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const handleLogout = () => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + "/logout", {
      withCredentials: true,
    })
      .then((res) => {
        props.history.push("/");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      Bonjour : {currentUser ? currentUser.name : "Inconnu"}{" "}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default withRouter(Header);
