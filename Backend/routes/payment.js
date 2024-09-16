const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const PAYMENT = require("../models/PayId");
const Order = require("../models/Orders");
const User = require("../models/User") ;
const dotenv = require("dotenv");
const fetchuser = require("../middleware/fetchuser");
dotenv.config({ path: "./config/config.env" });

const router = express.Router();

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

router.get("/key", (req, res) => {
  // console.log("key") ;
  // console.log(process.env.RAZORPAY_API_KEY)
  res.send(process.env.RAZORPAY_API_KEY);
});

router.post("/checkout", async (req, res) => {
  try {
    var options = {
      amount: Number(req.body.amount * 100),
      // amount in the smallest currency unit
      // amount : 30000,
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await instance.orders.create(options);
    // console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "some error occured", error }); //update message and erroe code
  }
});

router.post("/verification", fetchuser, async (req, res) => {
  try {
    // console.log(req.body);
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      address,
      amount
    } = req.body;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isMatch = razorpay_signature === generated_signature;
    if (isMatch) {
      const pay = await PAYMENT.create({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });

      console.log("payment created");

      try {
        const cart = await User.findById( req.user.id , 'cart') ;
        // console.log(cart) ;
        const order = await Order.create({
          products: cart.cart ,
          payment: pay.id,
          user: req.user.id,
          pay_status: true,
          shipping_address : address ,
          amount : amount
        });
        await User.findByIdAndUpdate(
          req.user.id ,
          { $set: { cart: [] } },
          
        );
        console.log(order);
      } catch (error) {
        console.log(error);
      }

      res.status(200).json({ success: true });
    } else {
      
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "some error occured", error }); //update message and erroe code
  }
});

module.exports = router ;
