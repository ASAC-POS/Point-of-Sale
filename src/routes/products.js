'use strict';
// this will handle any route for products (CRUD)

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const Products = requiure('../model/index.js')
const checkQuantity = require('../middlewares/checkQuantity')


//endpoits
router.post('/product', bearerAuth, acl('create'), addProduct);
router.get('/products', bearerAuth, acl('read'), getProducts);
router.get('/product/:id', bearerAuth, acl('read'), getProduct);
router.put('/product/:id', bearerAuth, acl('update'),checkQuantity, updateProduct);
router.delete('/product/:id', bearerAuth, acl('delete'), deleteProduct);


//add new product
async function addProduct(req, res) {
  const reqBody = req.body;
  const addedProduct = await Products.create(reqBody);
  res.status(201).json(addedProduct);
}

//get data for all products
async function getProducts(req, res) {
  res.status(200).json(await Products.findAll());
}

//gete data of one type of product 
async function getProduct(req, res) {
  const id = req.params.id;
  res.status(200).json(await Products.findOne({ where: { id: id } }));
}

//update product's data
async function updateProduct(req, res) {
  const id = req.params.id;
  const reqBody = req.body;
  res.status(201).json(await Products.update(reqBody, { where: { id: id } }));
}

//delete a product
async function deleteProduct(req, res) {
  const id = req.params.id;
  res.status(200).json(await Products.destroy({ where: { id: id } }));
}

module.exports = router;
