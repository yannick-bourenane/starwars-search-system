"use strict";
require("dotenv").config();
const Hapi = require("@hapi/hapi");
const axios = require("axios");

const fetchAllData = (search) => {
  return axios
    .get("https://swapi.dev/api/")
    .then((res) => res.data.people)
    .catch((err) => "Oops an error occured : " + err);
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
      return fetchAllData();
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
  try {
    await server.register({
      plugin: require("hapi-cors"),
      options: {
        origins: [process.env.FRONTEND_URI],
      },
    });
    await server.start();
    console.log("Server running on %s", server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
