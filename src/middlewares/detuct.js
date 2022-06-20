'use strict';
// this will check id of the products and deducts the number of items sold
const { products } = require('../model/index');

module.exports = async (req, res, next) => {
  try{
  const reqBody = req.body; // {name:productsName,quantity:productQuantity,productID:productID}
  const productSold = reqBody.product;

  productSold.forEach(async (object) => {
    let product = await products.findOne({ where: { id: object.productID } });
    let check = object.quantity - product.quantity;
    if (check > 0) {
      next(
        `${product.productName} Does not have enough quantity please check with the inventory`
      );
    }
  });

  productSold.forEach(async (object) => {
    let product = await products.findOne({ where: { id: object.productID } });

    await products.update(
      {
        productName: object.name,
        quantity: product.quantity - object.quantity,
        description: product.description,
        price: product.price,
        minQuantity: product.minQuantity,
        storeID: product.storeID,
      },
      { where: { id: product.id } }
    );
  });
  next();}
  catch (e) {
    console.log("Exception thrown in detuct middleware, e: " + e);
  }
};
