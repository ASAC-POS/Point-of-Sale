'use strict';
// this will handle any route for receipts (CRUD)

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const { receipts , Users } = require('../model/index.js')
const detuct =require('../middlewares/detuct')
const checkQun = require('../middlewares/checkquantity')


//endpoints
//post
router.post('/receipt', bearerAuth, acl('add'),detuct, checkQun,addReceipt);
//get
router.get('/receipts', bearerAuth, acl('read'), getReceipts);
//get
router.get('/receipt/:id', bearerAuth, acl('read'), getReceipt);
//put
router.put('/receipt/:id', bearerAuth, acl('update'), updateReceipt);
//delete
router.delete('/receipt/:id', bearerAuth, acl('remove'), deleteReceipt);
//get
router.get('/getReceipt', bearerAuth, acl('read'),getReceiptEmps)
//get one user receipt
router.get('/getReceipt/:id', bearerAuth, acl('read'), getReceiptEmpsByID)



//functions
//add receipt
async function addReceipt(req, res) {
  const reqBody = req.body;
  const addedReceipt = await receipts.create(reqBody);
  res.status(201).json(addedReceipt);
}

//get all receipt
async function getReceipts(req, res) {
  res.status(200).json(await receipts.findAll());
}

// get receipt by id 
async function getReceipt(req, res) {
  const id = req.params.id;
  res.status(200).json(await receipts.findOne({ where: { id: id } }));
}

//update receipt by id
async function updateReceipt(req, res) {
  const id = req.params.id;
  const reqBody = req.body;
  res.status(201).json(await receipts.update(reqBody, { where: { id: id } }));
}

//delete receipt by id
async function deleteReceipt(req, res) {
  const id = req.params.id;
  res.status(200).json(await receipts.destroy({ where: { id: id } }));
}

//get users receipt
async function getReceiptEmps(req, res) {
  const receiptsEmps = await Users.findAll({ include: [receipts] });
  res.status(200).json(receiptsEmps);
}

//get one user receipt
async function getReceiptEmpsByID(req , res){
  const id = req.params.id;
  res.status(200).json(await Users.findOne({include : [receipts] , where:{id:id}}))
}

module.exports = router;
