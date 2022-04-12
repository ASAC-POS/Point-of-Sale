'use strict';
// this file will include access control list middleware (checks role's action)

// [admin, cashier, inventory]
// admin --> (read,delete,update,write)
// cashier ---> (read,update)
// inventory --> (read,update,write)

module.exports = function (action) {
  return (req, res, next) => {
    try {
      if (req.user.actions.includes(action)) {
        next();
      } else {
        next('access denied');
      }
    } catch (error) {
      next('LEEN');
    }
  };
};
