const express = require("express");
const Fruit = require("../models/Fruits");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const fetchuser = require("../middleware/fetchuser");
const imageUpload = require("../middleware/Fileupload");

router.post("/get", async (req, res) => {
  try {
    // console.log(req.body);
    const Fruit1 = await Fruit.findById(req.body.id);
    res.status(200).send({ Fruit1, mess: "Done Fruit Inserted" });
  } catch (error) {
    res.status(500).send({
      admin: false,
      success: false,
      message: "some error occured",
      error,
    }); //update message and error code
  }
});

router.post("/insert", fetchuser, isAdmin, imageUpload, async (req, res) => {
  const { name, amount, desc, stock, category } = req.body;
  try {
    await Fruit.create({
      name,
      amount,
      desc,
      stock,
      category,
      image: req.url,
    });
    res.status(200).send("Done Fruit Inserted");
  } catch (error) {
    res.status(500).send({
      admin: false,
      success: false,
      message: "some error occured",
      error,
    }); //update message and error code
  }
});

router.get("/getproduct1", async (req, res) => {
  const l1 = 4; // limit value
  try {
    // console.log(req.query);
    const num = Number(req.query.page) * l1;
    const s1 = req.query.sort ? req.query.sort : "name";

    var cat = [];
    if (req.query.category) {
      cat = JSON.parse(req.query.category);
    } else {
      cat = ["fruit", "vegetable", "general"];
    }
    const queryobj = { ...req.query };

    const exculdef = ["page", "sort", "category"];

    exculdef.forEach((ele) => delete queryobj[ele]);

    const query1 = JSON.stringify(queryobj);
    const query2 = JSON.parse(
      query1.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );
    let fruits = null;
    fruits = await Fruit.find(query2)
      .where("category")
      .in(cat)
      .sort(s1)
      .skip(num)
      .limit(l1);

    const c1 = await Fruit.find(query2)
      .where("category")
      .in(cat)
      .countDocuments();

    const f1 = JSON.stringify(fruits);
    // console.log(f1);

    res.status(200).send({ success: true, f1: f1, count: c1 });
  } catch (error) {
    res
      .status(500)
      .send({ admin: false, message: "some error occured", error }); //update message and erroe code
  }
});

router.get("/getproduct", async (req, res) => {
  try {
    var cat = [];
    if (req.query.category) {
      cat = JSON.parse(req.query.category);
    } else {
      cat = ["fruit", "vegetable", "general"];
    }

    const queryobj = { ...req.query };

    const exculdef = ["page", "sort", "category"];

    exculdef.forEach((ele) => delete queryobj[ele]);

    const query1 = JSON.stringify(queryobj);

    const query2 = JSON.parse(
      query1.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );

    const sortOptions = {};
    // if (req.query.sort) {
    //   const s1 = req.query.sort;
    //   if (s1[0] == "-") {
    //     sortOptions[s1.slice(1)] = -1;
    //   } else {
    //     sortOptions[s1] = 1;
    //   }
    // } else {
      sortOptions["name"] = 1;
    // }
   
    const l1 = 8;
    const num = Number(req.query.page) * l1;

    const pipeline = [
      {
        $match: query2,
      },
      {
        $match: { category: { $in: cat } },
      },
      {
        $sort: sortOptions,
      },
      {
        $skip: num,
      },
      {
        $limit: 8,
      },
    ];
    const c1 = await Fruit.find(query2)
      .where("category")
      .in(cat)
      .countDocuments();

    const result = await Fruit.aggregate(pipeline);
    const products = JSON.stringify(result);

    res.send({ success: true, products: products, count: c1 });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "some error occured", error }); //update message and erroe code
  }
});

router.get("/getfruits", async (req, res) => {
  try {
    var cat = [];

    cat = ["fruit"];

    const pipeline = [
      {
        $match: { category: { $in: cat } },
      },
      {
        $limit: 8,
      },
    ];

    const result = await Fruit.aggregate(pipeline);
    const f1 = JSON.stringify(result);
    // console.log(result);
    res.send({ success: true, f1: f1 });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "some error occured", error }); //update message and erroe code
  }
});

router.get("/getvegetables", async (req, res) => {
  try {
    var cat = [];

    cat = ["vegetable"];

    const pipeline = [
      {
        $match: { category: { $in: cat } },
      },
      {
        $limit: 8,
      },
    ];

    const result = await Fruit.aggregate(pipeline);
    const f1 = JSON.stringify(result);
    // console.log(result);
    res.send({ success: true, f1: f1 });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "some error occured", error }); //update message and erroe code
  }
});

module.exports = router;
