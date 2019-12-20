var orm = require("../config/orm.js");


var sellers = {
 // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("buyer", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("buyer", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("buyer", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = buyers;