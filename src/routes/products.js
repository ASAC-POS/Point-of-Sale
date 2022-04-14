'use strict';
// this will handle any route for products (CRUD)

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const { products , stores } = require('../model/index.js')
const checkQuantity = require('../middlewares/checkquantity')


//endpoits
//post
router.post('/product', bearerAuth, acl('add'), addProduct);
//get
router.get('/product/:id', bearerAuth, acl('read'), getProduct);
//put
router.put('/product/:id', bearerAuth, acl('update'),checkQuantity, updateProduct);
//delete
router.delete('/product/:id', bearerAuth, acl('remove'), deleteProduct);
//get one store with the products associated with that store
router.get('/getProduct/:id',bearerAuth,acl('read') , getproductEmpsByID)


//add new product
async function addProduct(req, res) {
  const reqBody = req.body;
  const addedProduct = await products.create(reqBody);
  res.status(201).json(addedProduct);
}

//gete data of one type of product 
async function getProduct(req, res) {
  const id = req.params.id;
  res.status(200).json(await products.findOne({ where: { id: id } }));
}

//update product's data
async function updateProduct(req, res) {
  const id = req.params.id;
  const reqBody = req.body;
  res.status(201).json(await products.update(reqBody, { where: { id: id } }));
}

//delete a product
async function deleteProduct(req, res) {
  const id = req.params.id;
  res.status(200).json(await products.destroy({ where: { id: id } }));
}

//get one user product
async function getproductEmpsByID(req , res){
  const id = req.params.id;
  res.status(200).json(await stores.findOne({include : [products] , where:{id:id}}))
}

module.exports = router;
