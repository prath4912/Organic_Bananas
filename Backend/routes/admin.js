const express = require("express") ;
const Fruit = require("../models/Fruits")
const { body, validationResult } = require('express-validator');
const User = require("../models/User")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fs = require('fs');
// const path = require("path") ;
// const multer = require('multer');


const router = express.Router() ;

const JWT_SECRET ="iamprathmesh";

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads/')
//   },

//   filename: (req, file, cb) => {
//     const uniqe = Date.now() ;
//       cb(null, uniqe + file.originalname)
//   }
// });

// var upload = multer({ storage: storage });

router.post('/login' ,   [body('email', 'Plese enter proper email' ).isEmail()  , body("password" ,"Enter correct Password").exists()], async (req ,res)=>{

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
    res.send({success , error : "Enter correcfffft credentials"}) ;
  }
  else
  {
    
    const cpassword = await bcrypt.compare(password , user.password);
    console.log(password) ;
    console.log(user.password) ;

  if(cpassword && (user.email === "prathmeshpawaru@gmail.com"))
  {
    const data = {
      user : {
        id : user._id
      }
      } ;
  
  const authtoken = jwt.sign(data, JWT_SECRET )
  
  success = true ;

  res.json({admin : true ,success ,authtoken})  ;
  }else{
    success = false
    res.json({admin : false ,success , error : "Incorrect Credentials"})  ;

  }
  }
  }catch(error)
  {
    console.error({error : error.message}) ;
    res.status(500).send({admin:false ,success ,error : "some error occured"});
  }
  
  }) ;


// router.post("/im" ,upload.single('image') , (req , res)=>{

//   console.log(req.body) ;
//   res.send("cj") ;
// } ); 


// router.post("/insert" ,upload.single('image') , async(req,res)=>{
  router.post("/insert" , async(req,res)=>{

  
  console.log(req.body) ;

    // we can use double cross verification using isadmins and fetchuser middeleware ;
    // if(req.admin === false)
    // console.log(req.body) ;
    const {name , amount , desc ,stock ,category   } = req.body ;

    // const fruit = await Fruit.create({
    //     name , amount , desc, stock ,image :{ data: fs.readFileSync( 'uploads/' + req.file.filename ),
    //     contentType: 'image/png' } 
    // }) ;
    const fruit = await Fruit.create({
      name , amount , desc, stock ,category }) ;
    // fruit.save() ;

    // console.log(fruit) ;
    res.send("cjj") ;

    

});


router.get("/getproduct" ,async (req,res)=>{
  const  l1 = 4 ;    // limit value
  console.log("start ") ;
  const num = (Number(req.query.page)*l1  );

   const s1 = req.query.sort  ;
    var cat = [null] ;
    if(req.query.category){   cat = JSON.parse( req.query.category) ;}
   cat.forEach(element => {
    console.log(element) ;
   });
   const queryobj ={...req.query} ;

   const exculdef = ["page" , "sort","category"] ;
  
   exculdef.forEach((ele)=>delete queryobj[ele]) ;

   const query1 = JSON.stringify(queryobj) ;
   const query2 = JSON.parse(query1.replace(/\b(gte|gt|lte|lt)\b/g , match=> `$${match}`) );

  const fruits =await  Fruit.find(query2).where('category').in( cat).skip(num).limit(l1).sort(s1) ;
  const c1 = await  Fruit.find(query2).where('category').in( cat).countDocuments() ;
  const f1 = JSON.stringify(fruits) ;
  res.status(200).send({f1 : f1 , count :c1});
}
);


module.exports = router ;