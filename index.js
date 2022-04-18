"use strict";

// this gile will run our server and initiate the database

require("dotenv").config();

const server = require("./src/server");

const { db } = require("./src/model/index");

db.sync()
  .then(() => {
    server.start(3001 || process.env.PORT);
  })
  .catch(console.error);
