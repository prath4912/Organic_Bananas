const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
const Order = require("../models/Orders") ;
const router = express.Router();

router.post("/get", fetchuser, async (req, res) => {
  try {
    u_id = req.user.id;

    let result = await Order.find({user : u_id}) 
      .populate("products.product") ;
    if (result) {
      res.status(200).json(result);
    } else {
      res.send("User not found");
    }
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send("Internal Sever error occured");
  }
});

module.exports = router ;