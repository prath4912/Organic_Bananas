const express = require("express")
const bcrypt = require('bcryptjs');
const User = require("../models/User")
const fetchuser = require("../middleware/fetchuser")
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');




const router = express.Router() ;

const JWT_SECRET ="iamprathmesh";

router.post('/createuser' ,   [body('email', 'Plese enter proper email' ).isEmail() , body("name" ,"Enter correct name").isLength({min:3}) , body("password" ,"Enter correct Password").isLength({min:5})], async (req ,res)=>{

  try{
    let success = false ;

    const result = validationResult(req);
  if (!result.isEmpty()) {
   return res.send({success , errors: result.array() });
    
  }
try { 
  let user = await User.findOne({email : req.body.email}) ;
  if(user)
  {
        console.log(user.name) ;
      res.json({ success, error : "Enter Unique email" })
  }
  else
  {
      const salt =  bcrypt.genSaltSync(10);
      const hash =  bcrypt.hashSync( req.body.password , salt);
// Store hash in your password DB.
    const prathmesh = new User({ "name" : req.body.name , 
      "email" : req.body.email ,  "password" : hash
  }) ; 
    console.log({ "name" : req.body.name , 
    "email" : req.body.email ,  "password" : hash
}) ;

  prathmesh.save() ;
//  var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const data = {
  user : {
    id : prathmesh.id
  }
} ;

const authtoken = jwt.sign(data, JWT_SECRET )
success = true ;
 res.json({success ,authtoken})  ;
  }
  
}catch(error)
{
    console.error({error : error.message}) ;
    res.status(500).send({success ,error :"some errrrror occured"});
}
  }catch(error){
    console.error({error : error.message}) ;
    res.status(500).send({success ,error :"some error occured"});
  }
}) ;


router.post('/login' ,   [body('email', 'Plese enter proper email' ).isEmail()  , body("password" ,"Enter correct Password").exists()], async (req ,res)=>{

  try{
    let success = false ;


    const result = validationResult(req);
  if (!result.isEmpty()) {
   return res.status(400).send({success , errors: result.array() });
   
  }
  const {email , password} = req.body  ;
  console.log(req.body) ;
  try {
  let user = await User.findOne({email}) ;
  if(!user)
  {
    res.send({success , error : "Enter correct credentials"}) ;
  }
  else
  {
    
    const cpassword = await bcrypt.compare(password , user.password);
    console.log(password) ;
    console.log(user.password) ;

  if(cpassword)
  {
    const data = {
      user : {
        id : user.id
      }
      } ;
  
  const authtoken = jwt.sign(data, JWT_SECRET )
  success = true ;
  res.json({success ,authtoken})  ;
  }else{
    success = false
    res.json({success , error : "Incorrect Password"})  ;

  }
  }
  }catch(error)
  {
    console.error({error : error.message}) ;
    res.status(500).send({success ,error : "some error occured"});
  }
}catch(error)
{
  console.error({error : error.message}) ;
  res.status(500).send({success ,error :"some errrrror occured"});
}
  }) ;


//   getuser

  router.post('/getuser' ,fetchuser, async (req ,res)=>{
  try {
    u_id = req.user.id ;
    let user = await User.findById(u_id).select("-password") ;
    if(user)
    {
        console.log(user) ;
      return res.json(user) ;
    }else
    {
      res.send("User not found")
    }
  }catch(error)
  {
    console.error({error : error.message}) ;
    res.status(500).send("some error occured");
  }
  
  }) ;

module.exports = router ;