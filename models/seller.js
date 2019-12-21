var orm = require("../config/orm.js");


var sellers = {
  all: function (cb) {
    orm.all("seller", function (res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function (cols, vals, cb) {
    orm.create("seller", cols, vals, function (res) {
      cb(res);
    });
  },
  update: function (objColVals, condition, cb) {
    orm.update("seller", objColVals, condition, function (res) {
      cb(res);
    });
  },
  delete: function (condition, cb) {
    orm.delete("seller", condition, function (res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = sellers;

