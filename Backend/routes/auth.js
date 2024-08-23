const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Token = require("../models/Token");
const crypto = require("crypto");

const router = express.Router();

const JWT_SECRET = "iamprathmesh";
const sendmail = require("../controller/Sendmail");

router.post(
  "/createuser",
  [
    body("email", "Plese enter proper email").isEmail(),
    body("name", "Enter correct name").isLength({ min: 3 }),
    body("password", "Enter correct Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      let success = false;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({
          success,
          errors: result.array(),
          error: "Enter Proper Information",
        });
      }
      let user = await User.findOne({
        email: req.body.email,
        verified: true,
      });
      if (user) {
        res.status(409).json({ success, error: "Enter Unique Email" });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const prathmesh = new User({
          name: req.body.name,
          firstName : req.body.name,
          email: req.body.email,
          password: hash,
          lastName : req.body.lastname 
        });

        prathmesh.save();

        let token = await Token.findOne({ userId: prathmesh._id });

        if (!token) {
          token = await new Token({
            userId: prathmesh._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${process.env.BASE_URL}users/${prathmesh._id}/verify/${token.token}`;
          await sendmail(
            prathmesh.email,
            "Verify Email",
            `<div style="padding: 50px; ;"><button style="background-color: yellow; padding: 10px; font-size: large;"><a style="text-decoration: none;" href="${url}">Verify Email</a></button><p>or</p><h1>Click on following Link To Verify</h1><p>${url}</p></div>`
          );
        }
        res.status(200).send({
          success: true,
          message: "An Email sent to your account please verify",
        });
      }
    } catch (error) {
      console.error({ error: error.message });
      res.status(500).send({ success, error: "Internal Server Error" });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Plese enter proper email").isEmail(),
    body("password", "Enter correct Password").exists(),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).send({ success: false, errors: result.array() });
      }
      const {email,password} = req.body;
      let user = await User.findOne({ email, verified: true });
      if (!user) {
        res.status(404).send({
          success: false,
          error: "We cannot find an account with that email address",
        });
      } else {
        const cpassword = await bcrypt.compare(password, user.password);

        if (cpassword) {
          const data = {
            user: {
              id: user.id,
            },
          };

          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({ success: true, authtoken });
        }else {
          res
            .status(401)
            .json({ success: false, error: "Incorrect Credentials" });
        }
      }
    } catch (error) {
      console.error({ error: error.message });
      res.status(500).send({ success, error: "Internal Server Error" });
    }
  }
);

//   getuser

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    u_id = req.user.id;
    let user = await User.findById(u_id).select("-name -password");
    if (user) {
      return res.json(user);
    } else {
      res.send("User not found");
    }
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send("Internal Servere Error");
  }
});

router.post("/deleteuser", fetchuser, async (req, res) => {
  try {
    if (req.user) {
      if (await User.findOne({ _id: req.user.id })) {
        await User.deleteOne({ _id: req.user.id });
        res.send("User Deleted Ssuccesfully");
      } else {
        res.send("User Already Deleted");
      }
    } else {
      res.send("User Not Found");
    }
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send("Internal Servere Error");
  }
});

router.get("/users/:id/verify/:token/", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid linkk" });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    
    if (!token) return res.status(400).send({ message: "Invalid link" });
    await User.updateOne({ _id: user._id }, { verified: true });
    await Token.deleteMany({ userId: user._id, token: req.params.token });
    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console, log(error);
    res.status(500).send({ error: error, message: "Internal Server Error" });
  }
});

router.post("/forgot", async (req, res) => {
  try {
    const email = req.body.email;
    if (!req.body.email) {
      res.status(400).send({ error: "Plese provide proper Email" });
    } else {
      const us1 = await User.findOne({ email, verified: true });
      if (!us1) {
        res
          .status(404)
          .json({ error: "We cannot find an account with that email address" });
      } else {
        let token = await Token.findOne({ userId: us1._id });
        if (!token) {
          token = await new Token({
            userId: us1._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
        }
        const url = `${process.env.BASE_URL}users/${us1._id}/forgot/${token.token}`;

        await sendmail(
          us1.email,
          "Reset Password",
          `<div style="padding: 50px; ;"><button style="background-color: yellow; padding: 10px; font-size: large;"><a style="text-decoration: none;" href="${url}">Reset Paaword</a></button><p>or</p><h1>Click on following Link To Reset Paaword</h1><p>${url}</p></div>`
        );
        res.send({ success: true });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error, error: "Internal Server Error" });
  }
});

router.post("/users/:id/forgot/:token/", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, verified: true });
    if (!user) return res.status(400).send({ error: "User Not Found" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token)
      return res
        .status(401)
        .send({ error: "Token Expired. Please Go back and Restart" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    await User.updateOne({ _id: user._id }, { password: hash });

    await Token.deleteMany({ userId: user._id, token: req.params.token });

    res.status(200).send({ message: "Password Chaned successfully" });
  } catch (error) {
    res.status(500).send({ message: error, error: "Internal Server Error" });
  }
});

router.post("/update", fetchuser, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, req.body, {
      new: true,
    }).select("firstName lastName email contact");
    res.status(200).send({ success: true, pdata: user });
  } catch (error) {
    res.status(500).send({ success: true, error: "Internal Server Error" });
  }
});

module.exports = router;
