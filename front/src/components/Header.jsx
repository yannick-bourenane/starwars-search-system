import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import "../styles/header.css";
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
    <header>
      <h1>Base de données de l'empire</h1>
      {currentUser && (
        <div className="welcome-user">
          <strong>Bienvenue {currentUser.name}</strong>{" "}
          <button className="button" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      )}
    </header>
  );
};

export default withRouter(Header);
