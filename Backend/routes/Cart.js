const express = require("express") ;
const fetchuser = require("../middleware/fetchuser");
const Cart_item = require("../models/cartitem")
const User = require("../models/User")
const Product = require("../models/Fruits")
const router = express.Router() ;

router.get("/products" , async(req ,res)=>{

})


router.post("/getcart" , fetchuser  , async(req,res)=>{
    try {
        u_id = req.user.id ;
        let user = await User.findById(u_id).select("-password") ;
        if(user)
        {
            const items = await Cart_item.find({ user_id : req.user.id });
            console.log(items) ;
            res.json(items)
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

      router.post("/insertitem" , fetchuser  , async(req,res)=>{
        try {
           const  u_id = req.user.id ;
            const {product_id , quantity} =  req.body ;

            let user = await User.findById(u_id).select("-password") ;
            
            if(user)
            {
              let product  = await Cart_item.findOne({product_id : product_id}) ;
              if(product)
              {
                console.log(product) ;
                const item1 = {
                  product_id :"64c553fc79e98d3be80c6a8d" ,
                user_id : product_id,
                quantity: 4

                } ;
                const item = await Cart_item.findByIdAndUpdate(product._id, { $set: {quantity : product.quantity + quantity}}, { new: true })
                console.log(item) ;
                res.status(200).send("ok1") ;

              }
              else
              {
                Cart_item.create({ product_id  : product_id ,user_id : req.user.id ,quantity : quantity})
                res.status(200).send("ok") ;
              }
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