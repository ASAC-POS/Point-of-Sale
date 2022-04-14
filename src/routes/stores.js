"use strict";
// this will handle any route for stores (CRUD)

const express = require("express");
const router = express.Router();
const bearerAuth = require("../middlewares/bearerAuth");
const acl = require("../middlewares/acl");
const { stores, Users, receipts } = require("../model/index.js");

//endpoints
//post
router.post("/store", addStore); // we need to discuss what kind of acl needed in here (we can put it as a sign up instead and create 1 store and 1 user)
//get
router.get("/stores", bearerAuth, acl("read"), getStores); //this will not be needed, it's a critical security issue!
//get
router.get("/store/:id", bearerAuth, acl("read"), getStore); // any user can check the store's information if the have the storeID = id.
//put
router.put("/store/:id", bearerAuth, acl("update"), updateStore); //only the admin that has a storeID of id can update that store's information!! (critical)
//delete
router.delete("/store/:id", bearerAuth, acl("delete"), deleteStore); //only the admin user that has that store id can delete the store!! (critical)
//get
router.get("/storeEmps", getStoreEmps); // this won't be needed, or can be given to a super previledged user (site owner) ()
//get one
router.get("/storeEmps/:id", bearerAuth, acl("read"), getStoreEmpsByID); // any user can check the store's information if the have the storeID = id.
// get all the store's receipts
router.get("/storereceipts", bearerAuth, acl("read", getAllReceipts));

//functions
//add store
async function addStore(req, res) {
  const reqBody = req.body;
  const addedStore = await stores.create(reqBody);
  res.status(201).json(addedStore);
}

//get store
async function getStores(req, res) {
  res.status(200).json(await stores.findAll());
}

//get store by id
async function getStore(req, res) {
  const id = req.params.id;
  res.status(200).json(await stores.findOne({ where: { id: id } }));
}

//update store by id
async function updateStore(req, res) {
  const id = req.params.id;
  const reqBody = req.body;
  res.status(201).json(await stores.update(reqBody, { where: { id: id } }));
}

//delete store by id
async function deleteStore(req, res) {
  const id = req.params.id;
  res.status(200).json(await stores.destroy({ where: { id: id } }));
}

//get users from stores
async function getStoreEmps(req, res) {
  const storeEmps = await stores.findAll({ include: [Users] });
  res.status(200).json(storeEmps);
}

//get one user store
async function getStoreEmpsByID(req, res) {
  const id = req.params.id;
  res
    .status(200)
    .json(await stores.findOne({ include: [Users], where: { id: id } }));
}

// get all of the store's receipts

async function getAllReceipts(req, res) {
  res.status(200).json(await stores.findAll({ include: [receipts] }));
}

module.exports = router;
