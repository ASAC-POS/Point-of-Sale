// this file is to handle page not found errors
"use strict";

module.exports = (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "page not found",
    route: req.path,
  });
};
