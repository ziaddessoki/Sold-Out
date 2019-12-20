var express = require("express");

var router = express.Router();


var path = require("path")
// Import the model (cat.js) to use its database functions.
var products= require("../models/product");
// var sellers= require("../models/seller");
// var buyers= require("../models/buyer");/

router.get("/", function(req, res) {
    // res.json({"test":"test"})
    res.sendFile(path.join(__dirname, "/../public/index.html"));
  });

  router.get("/products", function(req, res) {
    products.all(function(data) {
      res.json({ product: data });
    });
  });

  router.get("/seller", function(req, res) {
    // res.json({"test":"test"})
    console.log("test")
    res.sendFile(path.join(__dirname, "/../public/seller.html"));
  });
  router.get("/buyer", function(req, res) {
    // res.json({"test":"test"})
    console.log("test")
    res.sendFile(path.join(__dirname, "/../public/buyer.html"));
  });

  module.exports = router;

  