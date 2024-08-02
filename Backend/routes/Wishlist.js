const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Wish = require("../models/WishItems")

 

router.post("/insert", fetchuser,async (req, res) => {
  try
{
  console.log(req.body) ;
    const user_id = req.user.id ;
    const product =  req.body.product ;
    const w1 = await Wish.findOne({product , user : user_id}) ;
    // console.log(w1) ;
    if(w1)
    {
      res.status(200).send("Already Exists in wishlist");

    }else
    {
      await Wish.create({
        product , user : user_id  
       });
     
       res.status(200).send("Done");
    }
 
}catch(error)
{
  res.status(500).send({ success : false, message: error  });  //update message and erroe code
}
});



router.post("/remove", fetchuser,async (req, res) => {

  try
{
    const user_id = req.user.id ;
    const product =  req.body.product ;
    const w1 = await Wish.findOne({  product , user : user_id}) ;
    
    if(w1)
    {
      await Wish.deleteOne({
        user : user_id , product
       });
     
       res.status(200).send("Done");

    }else{
      res.status(200).send("Not Exist in wishlist");

    }

}catch(error)
{
  res.status(500).send({ success : false, message: error  });  //update message and erroe code
}
});

router.get("/getwishlist", fetchuser ,async (req, res) => {
    // const l1 = 4; // limit value
    try{
    // const num = Number(req.query.page) * l1;
    // const s1 = req.query.sort;
    // var cat = [null];

    // if (req.query.category) {
    //   cat = JSON.parse(req.query.category);
    // }

    // cat.forEach((element) => {
    //   console.log(element);
    // });
    // const queryobj = { ...req.query };
  
    // const exculdef = ["page", "sort", "category"];
  
    // exculdef.forEach((ele) => delete queryobj[ele]);
  
    // const query1 = JSON.stringify(queryobj);
    // const query2 = JSON.parse(
    //   query1.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    // );
      
    // const fruits = await Fruit.find(query2)
    //   .where("category")
    //   .in(cat)
    //   .skip(num)
    //   .limit(l1)
    //   .sort(s1);
    // const c1 = await Fruit.find(query2)
    //   .where("category")
    //   .in(cat)
    //   .countDocuments();
  
  
    // const f1 = JSON.stringify(fruits);
console.log("rewf") ; 
    const user_id  = req.user.id ;
    console.log(user_id) ;
    const fruits = await Wish.find( { user : user_id } ).populate('product').select("-user -_id") ;
    const f1 = JSON.stringify(fruits);
    res.status(200).send({f1 : f1 ,count: fruits.length });
    }catch(error)
    {
      res.status(500).send({ success: false , message: error });  //update message and erroe code
    }
  });
  

module.exports = router;