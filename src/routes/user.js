'use strict';
// this will handle any route for users (CRUD)

// [admin, cashier, inventory]
// admin --> (read,delete,update,write)
// cashier ---> (read,update)
// inventory --> (read,update,write)

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const Users = require('../model/index');

router.post('/user', bearerAuth, acl('create'), addUser);
router.get('/users', bearerAuth, acl('read'), getUsers);
router.get('/user/:id', bearerAuth, acl('read'), getUser);
router.put('/user/:id', bearerAuth, acl('update'), updateUser);
router.delete('/user/:id', bearerAuth, acl('delete'), deleteUser);

async function addUser(req, res) {
  const reqBody = req.body;
  const addedUser = await Users.create(reqBody);
  res.status(201).json(addedUser);
}

async function getUsers(req, res) {
  res.status(200).json(await Users.findAll());
}

async function getUser(req, res) {
  const id = req.params.id;
  res.status(200).json(await Users.findOne({ where: { id: id } }));
}

async function updateUser(req, res) {
  const id = req.params.id;
  const reqBody = req.body;
  res.status(201).json(await Users.update(reqBody, { where: { id: id } }));
}

async function deleteUser(req, res) {
  const id = req.params.id;
  res.status(200).json(await Users.destroy({ where: { id: id } }));
}

module.exports = router;
