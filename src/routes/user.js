"use strict";
// this will handle any route for users (CRUD)

const express = require("express");
const router = express.Router();
const bearerAuth = require("../middlewares/bearerAuth");
const acl = require("../middlewares/acl");
const { Users } = require("../model/index");
const bcrypt = require("bcrypt");

//endpoints
//post
router.post("/user", bearerAuth, acl("create"), addUser); // only the admin user can create new users
//get
router.get("/user/:id", bearerAuth, acl("read"), getUser); //we can change the endpoint to check both storeID and user ID ('/user/:storeID/:id)
//put
router.put("/user/:id", bearerAuth, acl("edit"), updateUser); //only the admin can edit user's information
//delete
router.delete("/user/:id", bearerAuth, acl("delete"), deleteUser); //only the admin ca delete a user (the role doesn't matter)

//functions
//add users
async function addUser(req, res) {
  const reqBody = req.body;
  reqBody.password = await bcrypt.hash(reqBody.password, 5);
  reqBody.storeID = req.session.storeID;
  const addedUser = await Users.create(reqBody);

  res.status(201).json(addedUser);
}

//get users by id
async function getUser(req, res) {
  const id = req.params.id;
  res.status(200).json(await Users.findOne({ where: { id: id } }));
}

//update user info
async function updateUser(req, res) {
  const id = req.params.id;
  const oldPass = await Users.findOne({ where: { id: id } }).password;
  const reqBody = req.body;
  if (reqBody.password !== oldPass) {
    reqBody.password = await bcrypt.hash(reqBody.password, 5);
  }
  res.status(201).json(await Users.update(reqBody, { where: { id: id } }));
}

//delete user
async function deleteUser(req, res) {
  const id = req.params.id;
  res.status(200).json(await Users.destroy({ where: { id: id } }));
}

module.exports = router;
