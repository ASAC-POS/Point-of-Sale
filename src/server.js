"use strict";

// this will initiate the express server and handle home route.

//require
const express = require("express");
const cors = require("cors");
const error = require("./errorhandlers/500");
const notFound = require("./errorhandlers/404");
const userRoutes = require("./routes/user");
const storeRoutes = require("./routes/stores");
const productRoutes = require("./routes/products");
const receiptRoutes = require("./routes/receiptes");
const logger = require("./middlewares/logger");
const Auth = require("../src/routes/auth");

// The session part requirements
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { db } = require("./model/index");

const app = express();

// Realted to session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    store: new SequelizeStore({
      db,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Expires after one day
    },
  })
);

// use
app.use(express.json());
app.use(cors());
app.use(Auth);
app.use(userRoutes);
app.use(storeRoutes);
app.use(productRoutes);
app.use(receiptRoutes);
app.use(logger);

//routes
app.get("/", home);

//functions
function home(req, res) {
  res.send("home route");
}

function start(port) {
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
}

//error handlers use
app.use(error);
app.use("*", notFound);

//modeul
module.exports = {
  app: app,
  start: start,
};
