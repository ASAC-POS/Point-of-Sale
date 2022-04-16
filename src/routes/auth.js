"use strict";

//this will include signup and signin routes

//require
const express = require("express");
const cors = require("cors");

const bcrypt = require("bcrypt");

const { Users, stores } = require("../model/index");

const basicAuth = require("../middlewares/basicAuth");
const validator = require("../middlewares/validator");

const Auth = express.Router();

//routes
Auth.post("/register", validator, signup);
Auth.post("/signin", basicAuth, signin);

//functions
// function register
async function signup(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const store = await stores.create({
      storename: req.body.storename,
      email: req.body.email,
      location: req.body.location,
      businessType: req.body.businessType,
    });
    const record = await Users.create({
      username: req.body.username,
      password: req.body.password,
      role: "admin",
      storeID: store.id,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(403).send(error);
  }
}

// function sign in
async function signin(req, res) {
  // saving the storeID in the session after a successfull sign-in
  req.session.storeID = req.user.storeID;
  res.status(201).send(req.user);
}

module.exports = Auth;
