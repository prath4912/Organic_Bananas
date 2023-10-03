const express = require("express");
const Fruit = require("../models/Fruits");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const JWT_SECRET = process.env.JWT_SECRET;

router.post(
  "/login",
  [
    body("email", "Plese enter proper email").isEmail(),
    body("password", "Enter correct Password").exists(),
  ],
  async (req, res) => {
    let success = false;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ success, errors: result.array() });  //update erroe code
    }
    const { email, password } = req.body ;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).send({ success, error: "Enter Correct credentials" });
      } else {
        const cpassword = await bcrypt.compare(password, user.password);

        if (cpassword && user.email === "prathmeshpawaru@gmail.com") {
          const data = {
            user: {
              id: user._id,
            },
          };

          const authtoken = jwt.sign(data, JWT_SECRET);

          success = true;

          res.status(200).json({ admin: true, success, authtoken });
        } else {
          success = false;
          res.status(400).json({ admin: false, success, error: "Incorrect Credentials" }); //Update status code
        }
      }
    } catch (error) {

      res
        .status(500)
        .send({ admin: false, success, error: "some error occured" });  //update message and erroe code
    }
  }
);

router.post("/insert", async (req, res) => {

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
  res.status(200).send("cjj");
}catch(error)
{
  res.status(500).send({ admin: false, success, message: "some error occured" , erroe });  //update message and erroe code
}
});


module.exports = router;