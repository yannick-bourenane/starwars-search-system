"use strict";
require("dotenv").config();
const Hapi = require("@hapi/hapi");
const axios = require("axios");

const users = [
  {
    name: "Luke",
    password: process.env.PASSWORD,
    id: "1",
  },
];

const APIBaseUrl = "https://swapi.dev/api/";

const fetchRootUrls = (typesArr) => {
  return axios
    .get(APIBaseUrl) // get all the fetch links of the API
    .then((url) => {
      if (typesArr.length) {
        let filteredData = {};
        for (let key in url.data) {
          if (typesArr.includes(key)) {
            filteredData[key] = url.data[key];
          }
        }
        return filteredData;
      } else {
        return url.data;
      }
    }) // Fetch only selected types if necessary
    .catch((err) => console.log("Oops an error occured : " + err));
};

const getAllPagesUrl = async (url) => {
  const urlArr = [url];
  let currentUrl = url;
  while (currentUrl) {
    await axios
      .get(currentUrl)
      .then((res) => {
        if (res.data.next) {
          currentUrl = res.data.next;
          urlArr.push(currentUrl);
        } else {
          currentUrl = null;
        }
      })
      .catch((err) => console.log(err));
  }
  return urlArr;
};

const fetchListData = async (urlList, search) => {
  var promises = [];
  for (var property in urlList) {
    let urlToFetch = urlList[property];
    if (search) urlToFetch += "?search=" + search;
    let allPagesUrl = await getAllPagesUrl(urlToFetch);
    allPagesUrl.map((url) => {
      let type = property;
      promises.push(
        axios
          .get(url)
          .then((res) =>
            res.data.results.map((element) => {
              return {
                name: element.name || element.title,
                url: element.url,
                type: type,
                model: element.model || null,
              };
            })
          )
          .catch((err) => console.log(err))
      );
    });
  }
  var p = await Promise.all(promises)
    .then((all) =>
      all
        .reduce((acc, currentArray) => acc.concat(currentArray))
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
    )
    .catch((err) => {
      console.log("Oops an error occured : " + err);
    });
  return p;
};

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: "localhost",
  });

  await server.register([
    {
      plugin: require("hapi-cors"),
      options: {
        origins: [process.env.FRONTEND_URI],
      },
    },
    { plugin: require("@hapi/cookie") },
  ]);

  //await server.register(require("@hapi/cookie"));

  server.auth.strategy("session", "cookie", {
    // cookie: {
    //   name: "empireCookie",
    //   password: process.env.PASSWORD_COOKIE,
    //   // set to true in prod
    //   isSecure: false,
    //   ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
    // },
    cookie: {
      name: "sid-example",

      // Don't forget to change it to your own secret password!
      password: "password-should-be-32-characters",

      // For working via HTTP in localhost
      isSecure: false,
    },
    //redirectTo: false,

    validateFunc: async (request, session) => {
      console.log("in validate");
      const account = users.find((user) => (user.id = session.id));
      if (!account) {
        // Must return { valid: false } for invalid cookies
        return { valid: false };
      }

      return { valid: true, credentials: account };
    },
  });

  server.auth.default("session");

  server.route([
    {
      method: "GET",
      path: "/",
      options: {
        auth: "session",
        plugins: {
          "hapi-auth-cookie": {
            redirectTo: false,
          },
        },
        handler: (request, h) => {
          if (request.auth.isAuthenticated) {
            console.log("YES");
          }
          console.log("NOPE");
          return `Welcome to the website ! Rest of the content is private please login`;
        },
      },
    },
    {
      method: "POST",
      path: "/login",
      options: {
        auth: {
          mode: "try",
        },
        handler: (request, h) => {
          const { username, password } = request.payload;
          //console.log(request.payload);
          if (!username || !password) {
            return {
              msg:
                "Merci de renseigner un nom d'utilisateur ainsi qu'un mot de passe.",
            };
          }
          const account = users.find(
            (user) => user.name === username && user.password === password
          );
          if (!account) {
            return {
              msg: "Nom d'utilisateur ou mot de passe incorrect.",
            };
          }

          request.cookieAuth.set({ id: account.id });
          return { success: true, req: request.auth };
        },
      },
    },
    {
      method: ["GET", "POST"],
      path: "/search/{search?}",
      options: {
        auth: false,
        handler: async (request, h) => {
          let search = "";
          if (request.params.search && request.params.search !== "undefined") {
            search = request.params.search;
          }
          let types = [];
          if (request.payload) {
            if ("types" in request.payload) {
              types = request.payload.types;
            }
          }
          async function completeFetch() {
            let result = await fetchRootUrls(types);
            return fetchListData(result, search);
          }
          var data = await completeFetch();
          return { msg: "ok", data: data };
          if (request.auth.isAuthenticated) {
            console.log("AUTHENTICATED");
          } else {
            console.log("NOPE");
          }
          return "Private Content";
        },
      },
    },
    {
      method: "POST",
      path: "/specific",
      options: {
        auth: false,
        handler: async (request, h) => {
          console.log("payload = ", request.payload);
          const { url } = request.payload;
          let data = await axios
            .get(url)
            .then((res) => res.data)
            .catch((err) => console.log(err));
          return data;
        },
      },
    },
    {
      method: "GET",
      path: "/getTypes",
      handler: async (request, h) => {
        let result = await fetchRootUrls([]);
        return result;
      },
      options: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/logout",
      options: {
        handler: (request, h) => {
          request.cookieAuth.clear();
          return h.redirect("/");
        },
        auth: false,
      },
    },
  ]);

  try {
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
