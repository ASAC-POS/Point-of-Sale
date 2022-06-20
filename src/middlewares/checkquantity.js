"use strict";
// this will check the quantity of products after each deduction and alert to inventory if the quantity is below a certain ammout
module.exports = (req, res, next) => {
  try{
    const reqBody = req.body;
    let check = reqBody.quantity - reqBody.minQuantity;
    if (check <= 0) {
      console.log("to inventory, please refill");
      next();
    } else {
      next();
    }}
    catch (e) {
      console.log("Exception thrown in checkquantity middleware, e: " + e);
    }
  };

