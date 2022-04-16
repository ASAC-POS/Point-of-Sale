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
// get All stores users
router.get("/users", bearerAuth, acl("read"), getAllusers);
//get
router.get("/user/:id", bearerAuth, acl("read"), getUser); //we can change the endpoint to check both storeID and user ID ('/user/:id)
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
  const found = await Users.findOne({ where: { id: id } });
  if (found.storeID === req.session.storeID) {
    res.status(200).json(found);
  } else {
    res.status(403).send("Unauthorized access");
  }
}

//update user info
async function updateUser(req, res) {
  const id = req.params.id;
  const oldPass = await Users.findOne({ where: { id: id } });
  if (oldPass.storeID === req.session.storeID) {
    const reqBody = req.body;
    reqBody.storeID = req.session.storeID;
    if (reqBody.password !== oldPass.password) {
      reqBody.password = await bcrypt.hash(reqBody.password, 5);
    }
    res.status(201).json(await Users.update(reqBody, { where: { id: id } }));
  } else {
    res.status(403).send("Unauthorized access");
  }
}

//delete user
async function deleteUser(req, res) {
  const id = req.params.id;
  const deletedUser = await Users.findOne({ where: { id } });
  if (deletedUser.storeID === req.session.storeID) {
    await Users.destroy({ where: { id: id } });
    res.status(200).json(deletedUser);
  } else res.status(403).send("Unauthorized access");
}

// Get all of the sotre users
async function getAllusers(req, res) {
  res
    .status(200)
    .json(await Users.findAll({ where: { storeID: req.session.storeID } }));
}

module.exports = router;
