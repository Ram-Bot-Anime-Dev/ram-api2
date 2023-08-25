require("dotenv").config(); // calls the .env file
const CryptoJS = require("crypto-js");
var path = require("path");
var { expressjwt: jwt } = require("express-jwt");

const express = require("express");
var favicon = require("serve-favicon");
var cors = require("cors");
const mongoose = require("mongoose"); // the database used to store keys and such
var bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express"); // documentation

const ratelimit = require("express-rate-limit"); //handles the ratelimit
const session = require("express-session");
const ms = require("ms");
const Logs = require("../Requirerments/logger");
const Store = require("connect-mongo")(session);
const MemeryStore = require("express-rate-limit/lib/memory-store");
const validateToken = require("../Requirerments/apikeychecker");
const { versions } = require("../Requirerments/version");

var app = express();
app.use(favicon(path.join(__dirname, "assets", "favicon.png")));

mongoose
  .connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(new Logs().info("Mongo Db Connected!"));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1", // YOU NEED THIS
    info: {
      version: "v1",
      title: "Ram Api 2",
      head: "Gamearoo",
      description: `Like Ram Api But Better \n Versions: ${versions
        .map((v) => v)
        .join(", ")}`,

      toolbar: true,
      basePath: "/",
      contact: {
        name: "Support Team",
        email: "support@rambot.xyz",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [`${__dirname}/routes/**/*.js`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const { cssdark } = require("./darkcss");
var options = cssdark;

app.use("/docs", swaggerUi.serve, (req, res) => {
  let html = swaggerUi.generateHTML(swaggerDocs, options);
  res.send(html);
});

const fs = require("fs");

const port = "2023"; //used so the reverse proxy can communicate with the api

const routes = require("./routes");

const limiter = ratelimit({
  windowMS: 5 * 1000, // 2 seconds\
  max: 50, // 30 requests
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    Too_many_requests: "Please try again later. Its 50 requests per 5 Seconds",
    RATELIMITERROR: "Rate Limit Error",
    RETRY_AFTER: "Retry-After: 9S",
    error: {
      message:
        "Ratelimit reached Please try again later. Its 50 requests per 2 Seconds", // message will display if the limit was reached somehow
    },
  },
});

app.use(
  session({
    secret: process.env.se,
    cookie: {
      maxAge: ms("1D"),
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: mongoose.connection }),
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json()); // if i remember right this is how ram-api shows json objects not 100% sure what it does tho been a while

app.use("/", limiter);
app.use("/", routes);

app.get("*", function (req, res) {
  res.status(404).send({
    error: `this Endpoint ${req.baseUrl}/${req.url} is missing or no available!`, //if not a endpoint it will error with this error almost like a 404 page on a website
  });
});

app.listen(port, () => new Logs().info("running on port 80"));
