const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
const router = express.Router();
const Review = require("../models/Review");
const mongoose  = require("mongoose")

router.post("/insert", fetchuser, async (req, res) => {
  try {
    const u_id = req.user.id;
    console.log(req.body);

    let result1 = await Review.findOne({
      user: u_id,
      product: req.body.product,
    });
    if (result1) {
      console.log("edcf");
      console.log(result1);
      const message = req.body.message ? req.body.message : result1.message;
      const result = await Review.updateOne(
        { _id: result1._id },
        { review: req.body.review, message: message }
      );
      console.log(result);
    } else {
      const result = await Review.create({
        user: u_id,
        product: req.body.product,
        review: req.body.review,
        message : req.body.message
      });
      console.log("erf");
      console.log(result);
    }

    res.status(200).send({ success: true, Message: "True " });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error, message: "Internal Server Error" });
  }
});

router.post("/totalrating", async (req, res) => {
  try {


    const pipeline = [
      {
        $match:{ 'product' : new mongoose.Types.ObjectId(req.body.product) }
      },
      {
        $facet: {
          group1: [
            {
              $group : {_id : null , avgrating : {$avg : "$review"} ,  total_count :{ $sum: 1 } }
            }
          ]
,
          group2: [
            {
              $group : {_id : "$review" , count : { $sum: 1 } }
            }            
          ]
        }
      }
    ];
  
    const result = await Review.aggregate(pipeline);

    const arr = result[0].group2 ;
    if(result[0].group1.length>0)
    {
    res.status(200).send({ message: "Done" ,arr : arr, rating : result[0].group1[0].avgrating.toFixed(2) , total_count : result[0].group1[0].total_count});
    }else
    {
        res.status(200).send({ message: "Done",arr:[] , rating : 0 , total_count : 0});
    }


  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/getreview", async (req, res) => {
    try {
    
    const result = await Review.find({product : req.body.product}).populate({
        path: 'user',
        select: 'name -_id ' 
      }) ;
        console.log(result) ;
      if(result.length>0)
      {
      res.status(200).send({ message: "Done" , reviews : result});
      }else
      {
          res.status(200).send({ message: "Done" , reviews : [] });
      }
  
  
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

module.exports = router;
