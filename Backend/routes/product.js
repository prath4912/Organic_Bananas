const express = require("express");
const Fruit = require("../models/Fruits");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin") 
const fetchuser = require("../middleware/fetchuser")

router.post("/insert",fetchuser, isAdmin , async (req, res) => {

  const { name, amount, desc, stock, category } = req.body;
  try
{
  await Fruit.create({
    name,
    amount,
    desc,
    stock,
    category,
  });
  res.status(200).send("Done Fruit Inserted");
}catch(error)
{
  res.status(500).send({ admin: false, success:false, message: "some error occured" , error });  //update message and error code
}
});

router.get("/getproduct", async (req, res) => {
  const l1 = 4; // limit value
  try{
  const num = Number(req.query.page) * l1;

  const s1 = req.query.sort;
  var cat = [null];

  if (req.query.category) {
    cat = JSON.parse(req.query.category);
  }

  cat.forEach((element) => {
    console.log(element);
  });
  const queryobj = { ...req.query };

  const exculdef = ["page", "sort", "category"];

  exculdef.forEach((ele) => delete queryobj[ele]);

  const query1 = JSON.stringify(queryobj);
  const query2 = JSON.parse(
    query1.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
  );
    
  const fruits = await Fruit.find(query2)
    .where("category")
    .in(cat)
    .skip(num)
    .limit(l1)
    .sort(s1);
  const c1 = await Fruit.find(query2)
    .where("category")
    .in(cat)
    .countDocuments();


  const f1 = JSON.stringify(fruits);

  res.status(200).send({ f1: f1, count: c1 });

  }catch(error)
  {
    res.status(500).send({ admin: false, success, message: "some error occured",error });  //update message and erroe code
  }
});


module.exports = router;