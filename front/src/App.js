import React from "react";
import logo from "./logo.svg";
import "./App.css";
const axios = require("axios");

function App() {
  function testFetchBack() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL)
      .then((res) => console.log("res = ", res));
  }

  return (
    <div className="App">
      {testFetchBack()}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
