var express = require("express");

var router = express.Router();


var path = require("path")
// Import the model (cat.js) to use its database functions.
var products = require("../models/product");
var sellers= require("../models/seller");
var buyers= require("../models/buyer");

// HOME PAGE
router.get("/", function (req, res) {
  // res.json({"test":"test"})
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});
// SELLER PAGE
router.get("/seller", function (req, res) {
  // res.json({"test":"test"})
  console.log("test")
  res.sendFile(path.join(__dirname, "/../public/seller.html"));
});
// BUYER PAGE
router.get("/buyer", function (req, res) {
  // res.json({"test":"test"})
  console.log("test")
  res.sendFile(path.join(__dirname, "/../public/buyer.html"));
});
// PRODUCT API
router.get("/products_api", function (req, res) {
  products.all(function (data) {
    res.json({ product: data });
  });
});
// SELLER API
router.get("/seller_api", function (req, res) {
    sellers.all(function (data) {
      res.json({ seller: data });
    });
  });
 // BUYER API
  router.get("/buyer_api", function (req, res) {
    buyers.all(function (data) {
      res.json({ buyer: data });
    });
  });
  //POST PRODUCTS
router.post("/products", function(req, res) {
  products.create([
    "product_name", "product_description", "highest_bid", "seller_id", "buyer_id"
  ], [
    req.body.product_name, req.body.product_description, req.body.highest_bid, req.body.seller_id, req.body.buyer_id
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
    console.log(result)
  });
});
module.exports = router;

