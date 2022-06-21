'use strict';
// this will handle any route for products (CRUD)

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const acl = require('../middlewares/acl');
const { products } = require('../model/index.js');
const checkQuantity = require('../middlewares/checkquantity');

///

const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}`;

const socket = io.connect(host);

///

//endpoits
//post
router.post('/product', bearerAuth, acl('add'), addProduct);
//get a specific product
router.get('/product/:id', bearerAuth, acl('read'), getProduct);
//put
router.put(
  '/product/:id',
  bearerAuth,
  acl('update'),
  checkQuantity,
  updateProduct
);
//delete
router.delete('/product/:id', bearerAuth, acl('remove'), deleteProduct);

// get all products of a specific store
router.get('/products', bearerAuth, acl('read'), getAllProducts);

//add new product
async function addProduct(req, res) {
  const reqBody = req.body;
  reqBody.storeID = req.query.cookie;
  try {
    const addedProduct = await products.create(reqBody);

    socket.emit('add-product', addedProduct);

    res.status(201).json(addedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
}

//gete data of one type of product
async function getProduct(req, res) {
  const id = req.params.id;
  try {
    const found = await products.findOne({ where: { id: id } });
    if (found === null) {
      res.status(200).json('this product might not exists');
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

//update product's data
async function updateProduct(req, res) {
  const id = req.params.id;
  try {
    const oldProduct = await products.findOne({ where: { id: id } });
    if (oldProduct.storeID === req.query.cookie) {
      const reqBody = req.body;
      reqBody.storeID = req.query.cookie;
      await products.update(reqBody, { where: { id: id } });
      const updatedProduct = await products.findOne({ where: { id: id } });
      res.status(201).json({
        product: updatedProduct,
        message: `product with product id: ${id} was updated successfully`,
      });
    } else {
      res.status(403).send('Unauthorized access');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

//delete a product
async function deleteProduct(req, res) {
  const id = req.params.id;
  try {
    const deletedProduct = await products.findOne({ where: { id: id } });
    if (deletedProduct.storeID === req.query.cookie) {
      await products.destroy({ where: { id: id } });

      socket.emit('delete-product', deletedProduct);

      res
        .status(200)
        .json({ message: `product with id: ${id} was deleted successfully` });
    } else {
      res.status(403).json('Unauthorized access');
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// get all products of a store
// This will retrieve the products for only the store of the signed in user
async function getAllProducts(req, res) {
  // const sessionStoreID = ;
  try {
    res.status(200).json(
      await products.findAll({
        where: { storeID: req.query.cookie },
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = router;
