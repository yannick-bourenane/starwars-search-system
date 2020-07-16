import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home.jsx";
import NotFound from "./views/NotFound.jsx";

const axios = require("axios");

function App() {
  function testFetchBack() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL)
      .then((res) => console.log("res = ", res));
  }

  return (
    <div className="App">
      {/*testFetchBack()*/}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
