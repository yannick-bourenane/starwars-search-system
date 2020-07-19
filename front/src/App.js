import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home.jsx";
import NotFound from "./views/NotFound.jsx";
import Search from "./views/Search";
import Cookies from "js-cookie";
import DetailedSheet from "./components/DetailedSheet";

const axios = require("axios");

function App() {
  console.log(Cookies.get("username"));
  function testFetchBack() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL)
      .then((res) => console.log("res = ", res));
  }

  return (
    <div className="App">
      {testFetchBack()}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/detailed" component={DetailedSheet} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
