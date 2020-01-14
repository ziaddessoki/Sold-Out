var express = require("express");
var router = express.Router();
var path = require("path")
var products = require("../models/product");
var dotenv = require('dotenv');
var twilio = require('twilio');
dotenv.config({ path: '.env' });
//twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSid, authToken);
// HOME PAGE


// app.use(express.static('public'))

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});
// SELLER PAGE
router.get("/seller", function (req, res) {
  console.log("test")
  res.sendFile(path.join(__dirname, "/../public/seller.html"));
});
// BUYER PAGE
router.get("/buyer", function (req, res) {
  console.log("test")
  res.sendFile(path.join(__dirname, "/../public/buyer.html"));
});
// PRODUCT API
router.get("/products_api", function (req, res) {
  products.all(function (data) {
    res.json({ product: data });
  });
});
//POST PRODUCTS
router.post("/products_api", function (req, res) {
  console.log("Products Api")
  console.log(req.body)
  products.create([
    "product_name", "product_description", "product_image", "highest_bid", "seller_name", "seller_phone", "bid_length"
  ], [
      req.body.product_name, req.body.product_description, req.body.product_image, req.body.highest_bid, req.body.seller_name, req.body.seller_phone, req.body.bid_length
    ], function (result) {
      // Send back the ID of the new quote
      // res.json({ id: result.insertId });
      twilioClient.messages
        .create({
          body: `Hi ${req.body.seller_name}!\nThank you for posting ${req.body.product_name}, if a bid is placed you will be notified.`,
          from: '+12012672107',
          to: `+1${req.body.seller_phone}`
        })
        .then(message => console.log(message));

    });
});
//Twilio
router.post("/send_sms", function (req, res) {
  console.log(req.body.seller_phone)
  // twilio api 
  // var twilio = require('twilio');
  // console.log("seller phone ="+newProduct.seller_phone)
  console.log(process.env.TWILIO_ACCOUNT_SID)


  //   twilio api
});

//POST buyers
router.put("/products_api/:id", function (req, res) {
  console.log("Buyer Update")
  var condition = "product_id = " + req.params.id;
  console.log("condition", condition);
  products.update({
    // [
    highest_bid: req.body.highest_bid,
    buyer_name: req.body.buyer_name,
    buyer_phone: req.body.buyer_phone,
    // moment_bid: req.body.moment_bid
  }, condition, function (result) {
    twilioClient.messages
      .create({
        body: `Hi ${req.body.buyer_name}, \nThank you for placing a bid of $${req.body.highest_bid}!`,
        from: '+12012672107',
        to: `+1${req.body.buyer_phone}`
      })
      .then(message => {
        products.all(function (data) {
          console.log(data)
          const products = data;
          for (let index = 0; index < products.length; index++) {
            const aProduct = products[index];
            console.log(aProduct)
            console.log(req.params.id)
            if (aProduct.product_id == req.params.id) {
              twilioClient.messages
                .create({
                  body: `Hi ${aProduct.seller_name}, \n${req.body.buyer_name} placed a bid of $${req.body.highest_bid} on ${aProduct.product_name}!`,
                  from: '+12012672107',
                  to: `+1${aProduct.seller_phone}`
                }).then(message =>{
                  console.log(message)
                })
            }
          }
        });
      });


  });
});

// router.delete("/products_api/:id", function (req, res) {
//   console.log("Product SOLD OUT!!!!")
//   var condition = "product_id = " + req.params.id;

//   products.delete(condition, function (result) {
//     console.log("message should send now")
//     console.log(req.body.buyer_phone)
//     twilioClient.messages
//     .create({
//       body: `Congrats ${req.body.buyer_name}! \n You had the highest bid! `,
//       from: '+12012672107',
//       to: `+1${req.body.buyer_phone}`
//     }).then(message => {
      
//       products.all(function (data) {
//         console.log(data)
//         const products = data;
//         for (let index = 0; index < products.length; index++) {
//           const aProduct = products[index];
//           console.log(aProduct)
//           console.log(req.params.id)
//           if (aProduct.product_id == req.params.id) {
//             twilioClient.messages
//               .create({
//                 body: `Hi ${aProduct.seller_name}, \n ${req.body.buyer_name} bought ${aProduct.product_name}!`,
//                 from: '+12012672107',
//                 to: `+1${aProduct.seller_phone}`
//               }).then(message =>{
//                 console.log(message)
//               })
//           }
//         }
//       });
//     });
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });
router.delete("/test_products_api/:id", function (req, res) {
  const { id } = req.params;
  console.log(id)
  products.find(id, function (data) {
    const aProduct = data[0];
    console.log(aProduct)
    twilioClient.messages
      .create({
        body: `Hi ${aProduct.seller_name}, \n${aProduct.buyer_name} bought the ${aProduct.product_name} for $${aProduct.highest_bid}!`,
        from: '+12012672107',
        to: `+1${aProduct.seller_phone}`
      }).then(message => {
        console.log("Seller Message")
        console.log(message)
        // res.send(message)
        return twilioClient.messages
          .create({
            body: `Congrats ${aProduct.buyer_name}! \nYou had the highest bid! `,
            from: '+12012672107',
            to: `+1${aProduct.buyer_phone}`
          });
      // }).then(message => {
      //   console.log("buyer Message")
      //   console.log(message)
      //   // res.send(message)
      //   products.delete(id, function (result) {
      //     res.send(result)
      //   })
      }).catch(err => {
        res.send(err)
      })
  })
  products.delete(id, function (result) {
        res.send(result)
        if (result.affectedRows == 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
      })
})

module.exports = router;

