"use strict";
// this will handle any route for stores (CRUD)

const express = require("express");
const router = express.Router();
const bearerAuth = require("../middlewares/bearerAuth");
const acl = require("../middlewares/acl");
const { stores, Users, receipts } = require("../model/index.js");

//endpoints
//get
router.get("/store/:id", bearerAuth, acl("read"), getStore); // any user can check the store's information if the have the storeID = id.
//put
router.put("/store/:id", bearerAuth, acl("update"), updateStore); //only the admin that has a storeID of id can update that store's information!! (critical)
//delete
router.delete("/store/:id", bearerAuth, acl("delete"), deleteStore); //only the admin user that has that store id can delete the store!! (critical)
//get
router.get("/storeEmps", bearerAuth, acl("read"), getStoreEmps); // this won't be needed, or can be given to a super previledged user (site owner) ()
// get all the store's receipts
router.get("/storeReceipts", bearerAuth, acl("read"), getAllReceipts);

//functions

//get store by id
async function getStore(req, res) {
  try{
  const id = req.params.id;
  const found = await stores.findOne({ where: { id: id } })
  if(found.id === req.session.storeID){
  res.status(200).json(found);
  } else {
  res.status(403).json('Unauthorized access');
  }}
  catch (e) {
    console.log("Exception thrown in get store by id function, e: " + e);
  }
  
}

//update store by id
async function updateStore(req, res) {
  try{
  const id = req.params.id;

  const oldStore = await stores.findOne({where: {id : id}})
  if(oldStore.id === req.session.storeID){
    const reqBody = req.body;
    reqBody.id = req.session.storeID
    await stores.update(reqBody, { where: { id: id } });
    const updatedStore = await stores.findOne({where: {id : id}})
    console.log(updatedStore)
    res.status(201).json({updatedStore: updatedStore , message: `store with id: ${id} was updated successfully`});
  }
  else {
    res.status(403).json('Unauthorized access');
    }
  }
  catch (e) {
    console.log("Exception thrown in update store by id function, e: " + e);
  }
}

//delete store by id
async function deleteStore(req, res) {
  try{
  const id = req.params.id;
  const deletedStore = await stores.findOne({ where: { id: id } })
  if(deletedStore.id === req.session.storeID){
    await stores.destroy({ where: { id: id } })
    res.status(200).json({message: `store with id: ${id} was deleted successfully`});
  }else {
    res.status(403).json('Unauthorized access');
    }}
    catch (e) {
      console.log("Exception thrown in delete store by id function, e: " + e);
    }
}

//get users from stores
async function getStoreEmps(req, res) {
  try{
  res.status(200).json(await stores.findAll({ include: [Users] , where: { id: req.session.storeID } }));
}
catch (e) {
  console.log("Exception thrown in get users from stores function, e: " + e);
}

}

// get all of the store's receipts
async function getAllReceipts(req, res) {
  try{
  res.status(200).json(await stores.findAll({ include: [receipts] , where: { id: req.session.storeID }}));
}
catch (e) {
  console.log("Exception thrown in get all of the store's receipts function, e: " + e);
}
}

module.exports = router;
