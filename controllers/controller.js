var express = require("express");

var router = express.Router();


var path = require("path")
// Import the model (cat.js) to use its database functions.
var products = require("../models/product");
// var sellers= require("../models/seller");
// var buyers= require("../models/buyer");/

router.get("/", function (req, res) {
  // res.json({"test":"test"})
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});
router.get("/seller", function (req, res) {
  // res.json({"test":"test"})
  console.log("test")
  res.sendFile(path.join(__dirname, "/../public/seller.html"));
});
router.get("/buyer", function (req, res) {
  // res.json({"test":"test"})
  console.log("test")
  res.sendFile(path.join(__dirname, "/../public/buyer.html"));
});
router.get("/products", function (req, res) {
  products.all(function (data) {
    res.json({ product: data });
  });
});
router.post("/products", function(req, res) {
  products.create([
    "product_name", "product_description", "highest_bid", "seller_id", "buyer_id"
  ], [
    req.body.product_name, req.body.product_description, req.body.highest_bid, req.body.seller_id, req.body.buyer_id
  ], function(result) {
    // Send back the ID of the new quote
    // res.json({ id: result.insertId });
    console.log(result)
  });
});
module.exports = router;

