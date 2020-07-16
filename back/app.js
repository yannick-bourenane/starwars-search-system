"use strict";
require("dotenv").config();
const Hapi = require("@hapi/hapi");
const axios = require("axios");

const fetchAllData = (search) => {
  axios
    .get("https://swapi.dev/api/", {
      mode: "cors",
    })
    .then((res) => {
      console.log(res.data.people);
    });
};

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      console.log("1");
      fetchAllData();
      console.log("2");
      return { "a nice object": {} };
    },
  });
  server.route({
    method: "GET",
    //path: "/search/{search?}", // optional search parameters
    path: "/search/{search}",
    handler: (request, h) => {
      return `Search is ${request.params.search}`;
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
