'use strict';
// this will handle any route for stores (CRUD)

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const { stores, Users, receipts } = require('../model/index.js');

//endpoints
//get
router.get('/store/:id', bearerAuth, acl('read'), getStore); // any user can check the store's information if the have the storeID = id.
//put
router.put('/store/:id', bearerAuth, acl('update'), updateStore); //only the admin that has a storeID of id can update that store's information!! (critical)
//delete
router.delete('/store/:id', bearerAuth, acl('delete'), deleteStore); //only the admin user that has that store id can delete the store!! (critical)
//get
router.get('/storeEmps', bearerAuth, acl('read'), getStoreEmps); // this won't be needed, or can be given to a super previledged user (site owner) ()
// get all the store's receipts
router.get('/storeReceipts', bearerAuth, acl('read'), getAllReceipts);

//functions

//get store by id
async function getStore(req, res) {
  const id = req.params.id;
  const found = await stores.findOne({ where: { id: id } });
  console.log(12121212, typeof found.id);
  console.log(12121212, typeof req.query.cookie);
  if (found.id == req.query.cookie) {
    res.status(200).json(found);
  } else {
    res.status(403).json('Unauthorized access');
  }
}

//update store by id
async function updateStore(req, res) {
  const id = req.params.id;

  const oldStore = await stores.findOne({ where: { id: id } });
  if (oldStore.id == req.query.cookie) {
    const reqBody = req.body;
    reqBody.id = req.query.cookie;
    await stores.update(reqBody, { where: { id: id } });
    const updatedStore = await stores.findOne({ where: { id: id } });
    console.log(updatedStore);
    res.status(201).json({
      updatedStore: updatedStore,
      message: `store with id: ${id} was updated successfully`,
    });
  } else {
    res.status(403).json('Unauthorized access');
  }
}

//delete store by id
async function deleteStore(req, res) {
  const id = req.params.id;
  const deletedStore = await stores.findOne({ where: { id: id } });
  if (deletedStore.id == req.query.cookie) {
    await stores.destroy({ where: { id: id } });
    res
      .status(200)
      .json({ message: `store with id: ${id} was deleted successfully` });
  } else {
    res.status(403).json('Unauthorized access');
  }
}

//get users from stores
async function getStoreEmps(req, res) {
  try {
    res.status(200).json(
      await stores.findAll({
        include: [Users],
        where: { id: req.query.cookie },
      })
    );
  } catch (err) {
    res.status(500).json(err);
  }
}

// get all of the store's receipts
async function getAllReceipts(req, res) {
  try {
    res.status(200).json(
      await stores.findAll({
        include: [receipts],
        where: { id: req.query.cookie },
      })
    );
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = router;
