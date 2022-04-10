'use strict';
// this will handle any route for stores (CRUD)

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const Stores = requiure('../model/index.js')

router.post('/store', bearerAuth, acl('create'), addStore);
router.get('/stores', bearerAuth, acl('read'), getStores);
router.get('/store/:id', bearerAuth, acl('read'), getStore);
router.put('/store/:id', bearerAuth, acl('update'), updateStore);
router.delete('/store/:id', bearerAuth, acl('delete'), deleteStore);

async function addStore(req, res) {
  const reqBody = req.body;
  const addedStore = await Stores.create(reqBody);
  res.status(201).json(addedStore);
}

async function getStores(req, res) {
  res.status(200).json(await Stores.findAll());
}

async function getStore(req, res) {
  const id = req.params.id;
  res.status(200).json(await Stores.findOne({ where: { id: id } }));
}

async function updateStore(req, res) {
  const id = req.params.id;
  const reqBody = req.body;
  res.status(201).json(await Stores.update(reqBody, { where: { id: id } }));
}

async function deleteStore(req, res) {
  const id = req.params.id;
  res.status(200).json(await Stores.destroy({ where: { id: id } }));
}

module.exports = router;
