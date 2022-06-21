'use strict';
// this will handle any route for receipts (CRUD)

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const { receipts, Users } = require('../model/index.js');
const detuct = require('../middlewares/detuct');
const checkQun = require('../middlewares/checkquantity');

///

const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}`;

const socket = io.connect(host);

///

//endpoints
//post
router.post('/receipt', bearerAuth, acl('sell'), detuct, checkQun, addReceipt);
//get
router.get('/receipt/:id', bearerAuth, acl('read'), getReceipt);
//put
router.put('/receipt/:id', bearerAuth, acl('update'), updateReceipt);
//delete
router.delete('/receipt/:id', bearerAuth, acl('remove'), deleteReceipt);
//get
router.get('/getReceipt', bearerAuth, acl('read'), getReceiptEmps);
//get one user receipt
router.get('/getReceipt/:id', bearerAuth, acl('read'), getReceiptEmpsByID);

//functions
//add receipt
async function addReceipt(req, res) {
  const reqBody = req.body;
  const total = reqBody.total;
  if (reqBody.discount) {
    const discount = reqBody.discount;
    reqBody.totalAfterDiscount = total - total * (discount / 100).toFixed(2);
  } else {
    reqBody.discount = 0;
    reqBody.totalAfterDiscount = total;
  }
  reqBody.storeID = req.query.cookie;
  try {
    const addedReceipt = await receipts.create(reqBody);

    socket.emit('add-receipt', addedReceipt);

    res.status(201).json(addedReceipt);
  } catch (err) {
    res.status(500).send(err);
  }
}

// get receipt by id
async function getReceipt(req, res) {
  const id = req.params.id;
  try {
    const found = await receipts.findOne({ where: { id: id } });
    if (found === null) {
      res.status(200).send('This item might not exists');
    } else {
      if (found.storeID === req.query.cookie) {
        res.status(200).json(found);
      } else {
        res.status(403).send('Unauthorized access');
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

//update receipt by id
async function updateReceipt(req, res) {
  const id = req.params.id;
  try {
    const oldReceipt = await receipts.findOne({ where: { id: id } });
    if (oldReceipt === null) {
      res.status(200).send('This item might not exists');
    } else {
      if (oldReceipt.storeID === req.query.cookie) {
        const reqBody = req.body;
        reqBody.storeID = req.query.cookie;
        await receipts.update(reqBody, { where: { id: id } });
        const updatedreceipt = await receipts.findOne({ where: { id: id } });
        res.status(201).json({
          receipt: updatedreceipt,
          message: `receipt with receipt id: ${id} was updated successfully`,
        });
      } else {
        res.status(403).send('Unauthorized access');
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

//delete receipt by id
async function deleteReceipt(req, res) {
  const id = req.params.id;
  const deletedReceipt = await receipts.findOne({ where: { id: id } });
  if (deletedReceipt === null) {
    res.status(200).send('This item might not exists');
  } else {
    if (deletedReceipt.storeID === req.query.cookie) {
      await receipts.destroy({ where: { id: id } });
      res
        .status(200)
        .json({ message: `receipt with id: ${id} was deleted successfully` });
    } else {
      res.status(403).json('Unauthorized access');
    }
  }
}

//get users receipt
async function getReceiptEmps(req, res) {
  const receiptsEmps = await Users.findAll({
    include: [receipts],
    where: { storeID: req.query.cookie },
  });
  res.status(200).json(receiptsEmps);
}

//get one user receipt
async function getReceiptEmpsByID(req, res) {
  const id = req.params.id;
  res.status(200).json(
    await Users.findOne({
      include: [receipts],
      where: { storeID: req.query.cookie, id: id },
    })
  );
}

module.exports = router;
