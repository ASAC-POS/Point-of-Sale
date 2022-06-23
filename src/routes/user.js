'use strict';
// this will handle any route for users (CRUD)

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const { Users } = require('../model/index');
const bcrypt = require('bcrypt');

///

const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}`;

const socket = io.connect(host);

///

//endpoints
//post
router.post('/user', bearerAuth, acl('create'), addUser); // only the admin user can create new users
// get All stores users
router.get('/users', bearerAuth, acl('read'), getAllusers);
//get
router.get('/user/:id', bearerAuth, acl('read'), getUser); //we can change the endpoint to check both storeID and user ID ('/user/:id)
//put
router.put('/user/:id', bearerAuth, acl('edit'), updateUser); //only the admin can edit user's information
//delete
router.delete('/user/:id', bearerAuth, acl('delete'), deleteUser); //only the admin ca delete a user (the role doesn't matter)

//functions
//add users
async function addUser(req, res) {
  try {
    const reqBody = req.body;
    console.log(5555555555555, req.body);
    reqBody.password = await bcrypt.hash(reqBody.password, 5);
    reqBody.storeID = req.query.cookie;
    const addedUser = await Users.create(reqBody);
    console.log(111123131313131, 'i am here addUser function');
    socket.emit('add-user', addedUser);

    res.status(201).json(addedUser);
  } catch (err) {
    res.status(500).send(err);
  }
}

//get users by id
async function getUser(req, res) {
  const id = req.params.id;
  const found = await Users.findOne({ where: { id: id } });
  if (found.storeID == req.query.cookie) {
    res.status(200).json(found);
  } else {
    res.status(403).send('Unauthorized access');
  }
}

//update user info
async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const oldPass = await Users.findOne({ where: { id: id } });
    const reqBody = req.body;
    if (oldPass.storeID == req.query.cookie) {
      reqBody.storeID = req.query.cookie;
      if (reqBody.password !== oldPass.password) {
        reqBody.password = await bcrypt.hash(reqBody.password, 5);
      }
      await Users.update(reqBody, { where: { id: id } });
      const updatedUser = await Users.findOne({ where: { id: id } });
      res.status(201).json({
        updatedUser: updatedUser,
        message: `user with id: ${id} was updated successfully`,
      });
    } else {
      res.status(403).send('Unauthorized access');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//delete user
async function deleteUser(req, res) {
  const id = req.params.id;
  const deletedUser = await Users.findOne({ where: { id } });
  if (deletedUser.storeID == req.query.cookie) {
    await Users.destroy({ where: { id: id } });

    socket.emit('delete-user', deletedUser);

    res
      .status(200)
      .json({ message: `user with id: ${id} was deleted successfully` });
  } else res.status(403).send('Unauthorized access');
}

// Get all of the sotre users
async function getAllusers(req, res) {
  res.status(200).json(
    await Users.findAll({
      where: { storeID: req.query.cookie },
    })
  );
}

module.exports = router;
