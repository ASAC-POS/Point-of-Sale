"use strict";
// this will handle any route for stores (CRUD)

const express = require("express");
const router = express.Router();
const bearerAuth = require("../middlewares/bearerAuth");
const acl = require("../middlewares/acl");
const { stores, Users } = require("../model/index.js");


//endpoints
//post
router.post("/store",  addStore);
//get
router.get("/stores", bearerAuth, acl("read"), getStores);
//get
router.get("/store/:id", bearerAuth, acl("read"), getStore);
//put
router.put("/store/:id", bearerAuth, acl("update"), updateStore);
//delete
router.delete("/store/:id", bearerAuth, acl("delete"), deleteStore);
//get
router.get("/storeEmps", getStoreEmps);
//get one 
router.get("/storeEmps/:id", getStoreEmpsByID);

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
async function getStoreEmpsByID(req , res){
  const id = req.params.id;
  res.status(200).json(await stores.findOne({include : [Users] , where:{id:id}}))
}

module.exports = router;
