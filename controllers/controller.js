var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
// var products= require("../models/product");
// var sellers= require("../models/seller");
// var buyers= require("../models/buyer");

router.get("/", function(req, res) {
    // res.json({"test":"test"})
    res.sendFile(path.join(__dirname, "public/home.html"));
  });

//   router.get("/products", function(req, res) {
//     products.all(function(data) {
//       res.json({ product: data });
//     });
//   });


  module.exports = router;

  