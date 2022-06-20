"use strict";
// this will handle any route for products (CRUD)

const express = require("express");
const router = express.Router();
const bearerAuth = require("../middlewares/bearerAuth");
const acl = require("../middlewares/acl");
const { products } = require("../model/index.js");
const checkQuantity = require("../middlewares/checkquantity");

///

const io = require("socket.io-client");
const host = `http://localhost:${process.env.PORT}`;

const socket = io.connect(host);

///

//endpoits
//post
router.post("/product", bearerAuth, acl("add"), addProduct);
//get a specific product
router.get("/product/:id", bearerAuth, acl("read"), getProduct);
//put
router.put(
  "/product/:id",
  bearerAuth,
  acl("update"),
  checkQuantity,
  updateProduct
);
//delete
router.delete("/product/:id", bearerAuth, acl("remove"), deleteProduct);

// get all products of a specific store
router.get("/products", bearerAuth, acl("read"), getAllProducts);

//add new product
async function addProduct(req, res) {
  try{
  const reqBody = req.body;
  reqBody.storeID = req.session.storeID;
  const addedProduct = await products.create(reqBody);

  socket.emit("add-product", addedProduct);

  res.status(201).json(addedProduct);}
  catch (e) {
    console.log("Exception thrown in add new product function, e: " + e);
  }
}

//gete data of one type of product
async function getProduct(req, res) {
  try{
  const id = req.params.id;
  const found = await products.findOne({ where: { id: id } });
  if (found === null) {
    res.status(200).json("this product might not exists");
  } else {
    if (found.storeID === req.session.storeID) {
      res.status(200).json(found);
    } else {
      res.status(403).send("Unauthorized access");
    }
  }}
  catch (e) {
    console.log("Exception thrown in get data of one type of product function, e: " + e);
  }
}

//update product's data
async function updateProduct(req, res) {
  try {
  const id = req.params.id;
  const oldProduct = await products.findOne({ where: { id: id } });
  if (oldProduct.storeID === req.session.storeID) {
    const reqBody = req.body;
    reqBody.storeID = req.session.storeID;
    await products.update(reqBody, { where: { id: id } });
    const updatedProduct = await products.findOne({ where: { id: id } });
    res.status(201).json({
      product: updatedProduct,
      message: `product with product id: ${id} was updated successfully`,
    });
  } else {
    res.status(403).send("Unauthorized access");
  }
}
catch (e) {
  console.log("Exception thrown in update product's data function, e: " + e);
}

}

//delete a product
async function deleteProduct(req, res) {
  try{
  const id = req.params.id;
  const deletedProduct = await products.findOne({ where: { id: id } });
  if (deletedProduct.storeID === req.session.storeID) {
    await products.destroy({ where: { id: id } });

    socket.emit("delete-product", deletedProduct);

    res
      .status(200)
      .json({ message: `product with id: ${id} was deleted successfully` });
  } else {
    res.status(403).json("Unauthorized access");
  }}
  catch (e) {
    console.log("Exception thrown in delete a product function, e: " + e);
  }
}

// get all products of a store
// This will retrieve the products for only the store of the signed in user
async function getAllProducts(req, res) {
  try{
  // const sessionStoreID = ;
  res
    .status(200)
    .json(await products.findAll({ where: { storeID: req.session.storeID } }));
}
catch (e) {
  console.log("Exception thrown in get all products of a store function, e: " + e);
}
}
module.exports = router;
