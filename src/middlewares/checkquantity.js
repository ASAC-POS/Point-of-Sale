'use strict';
// this will check the quantity of products after each deduction and alert to inventory if the quantity is below a certain ammout
module.exports = function () {
  return (req, res, next) => {
    const reqBody = req.body;
    if (reqBody.quantity <= reqBody.minQuantity) {
      console.log('to inventory, please refill');
      next();
    } else {
      next();
    }
  };
};
