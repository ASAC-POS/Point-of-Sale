"use strict";
// this will handle any route for products (CRUD)

const express = require("express");
const router = express.Router();
const bearerAuth = require("../middlewares/bearerAuth");
const acl = require("../middlewares/acl");
const { products, stores } = require("../model/index.js");
const checkQuantity = require("../middlewares/checkquantity");

//endpoits
//post
router.post("/product", bearerAuth, acl("add"), addProduct);
//get a specific product
router.get("/product/:id", bearerAuth, acl("read"), getProduct);
//put
router.put( "/product/:id",bearerAuth,acl("update"), checkQuantity,updateProduct);
//delete
router.delete("/product/:id", bearerAuth, acl("remove"), deleteProduct);
//get one store with the products associated with that store
//router.get("/getProduct/:id", bearerAuth, acl("read"), getproductEmpsByID);

// get all products of a specific store
router.get("/products", bearerAuth, acl("read"), getAllProducts);

//add new product
async function addProduct(req, res) {
  const reqBody = req.body;
  reqBody.storeID = req.session.storeID;
  const addedProduct = await products.create(reqBody);
  res.status(201).json(addedProduct);
}

//gete data of one type of product
async function getProduct(req, res) {
  const id = req.params.id;
  const found=await products.findOne({where: { id: id }})
  if(found===null){
    res.status(200).json("product has been deleted");
  }
  else{
  if (found.storeID === req.session.storeID) {
    res.status(200).json(found);
  } else {
    res.status(403).send("Unauthorized access");
  }
}}
 
//update product's data
async function updateProduct(req, res) {
  const id = req.params.id;
  const oldProduct=await products.findOne({ where: { id: id } });
  if (oldProduct.storeID === req.session.storeID) {
    const reqBody = req.body;
    reqBody.storeID = req.session.storeID;
    res.status(201).json(await products.update(reqBody, { where: { id: id } }));
  } else {
    res.status(403).send("Unauthorized access");
  }
}
  
//delete a product
async function deleteProduct(req, res) {
  const id = req.params.id;
  const deletedProduct =await products.findOne({where: { id: id }})
  if(deletedProduct.storeID===req.session.storeID){
  res.status(200).json(await products.destroy({ where: { id: id } }));
  }else {
    res.status(403).json('Unauthorized access');
    }
}

//get one store products
/*async function getproductEmpsByID(req, res) {
  const id = req.params.id;
  res
    .status(200)
    .json(await stores.findOne({ include: [products], where: { id: id } }));
}*/

// get all products of a store
// This will retrieve the products for only the store of the signed in user

async function getAllProducts(req, res) {
  // const sessionStoreID = ;
  res.status(200).json(await products.findAll({ where: { storeID: req.session.storeID } }));
}

module.exports = router;
