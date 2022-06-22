'use strict';

//this will include signup and signin routes

//require
const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');

const { Users, stores } = require('../model/index');

const basicAuth = require('../middlewares/basicAuth');
const validator = require('../middlewares/validator');

const Auth = express.Router();

///////
const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}`;
// const socketServer = io.connect(host);

// // socketServer.on("connection");

// socketServer.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });

///////

//routes
Auth.post('/register', validator, signup);
Auth.post('/signin', basicAuth, signin);

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
      role: 'admin',
      storeID: store.id,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(403).send(error);
  }
}

// function sign in
async function signin(req, res) {
  // saving the storeID in the  after a successfull sign-in
  const socket = io.connect(host);
  socket.emit('sign-in', req.user);
  req.session.cookie.storeID = req.user.storeID;

  req.session.storeID = req.user.storeID;
  console.log(req.session);

  res.status(201).send({ user: req.user, storeID: req.session.storeID });
}

module.exports = Auth;
