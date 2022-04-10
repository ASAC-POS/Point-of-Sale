'use strict';
// this will handle any route for receipts (CRUD)

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const Receipts = requiure('../model/index.js')

router.post('/receipt', bearerAuth, acl('create'), addReceipt);
router.get('/receipts', bearerAuth, acl('read'), getReceipts);
router.get('/receipt/:id', bearerAuth, acl('read'), getReceipt);
router.put('/receipt/:id', bearerAuth, acl('update'), updateReceipt);
router.delete('/receipt/:id', bearerAuth, acl('delete'), deleteReceipt);

async function addReceipt(req, res) {
  const reqBody = req.body;
  const addedReceipt = await Receipts.create(reqBody);
  res.status(201).json(addedReceipt);
}

async function getReceipts(req, res) {
  res.status(200).json(await Receipts.findAll());
}

async function getReceipt(req, res) {
  const id = req.params.id;
  res.status(200).json(await Receipts.findOne({ where: { id: id } }));
}

async function updateReceipt(req, res) {
  const id = req.params.id;
  const reqBody = req.body;
  res.status(201).json(await Receipts.update(reqBody, { where: { id: id } }));
}

async function deleteReceipt(req, res) {
  const id = req.params.id;
  res.status(200).json(await Receipts.destroy({ where: { id: id } }));
}

module.exports = router;
