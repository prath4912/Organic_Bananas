const express = require("express") ;
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User")
const router = express.Router() ;

 

router.get("/get" , fetchuser  , async(req,res)=>{
    try {
        console.log("in Cart Get") ;
        u_id = req.user.id ;
        let result = await User.findById(u_id).populate("cart.product").select("cart") ;
        if(result)
        {        
            const productsInCart = result.cart.map(item => ({
              product: item.product,
              quantity: item.quantity ,
            }));
            res.status(200).json(productsInCart)
        }else
        {
          res.send("User not found")
        }
      }catch(error)
      {
        console.error({error : error.message}) ;
        res.status(500).send("Internal Sever error occured");
      }
      }) ;

      router.post("/insert" , fetchuser  , async(req,res)=>{
        try{
            console.log("In cart Insert") ;
           const  u_id = req.user.id ;
            const {productId, quantity} =  req.body ;

            let user = await User.findById(u_id).select("-password") ;
            
            if(user)
            {
              
              const existingCartItem =  user.cart.find(item => item.product.equals(productId));

              if (existingCartItem) {
                console.log("fdr") ;
                console.log(existingCartItem.quantity ) ;
                console.log(quantity);
                existingCartItem.quantity +=  quantity || 1;
                console.log(existingCartItem.quantity ) ;

              } else {
                user.cart.push({ product: productId, quantity: quantity || 1 ,_id: undefined });
              }
              await user.save();


              res.status(200).send({product : user} ) ;
          }else
          {
            res.send("User not found") ;
          }

        }catch(e)
        {
          res.status(500) ;
        }
          
        }) ;

        router.post("/reduce" , fetchuser  , async(req,res)=>{
          try{
              console.log("In cart reduce") ;
             const  u_id = req.user.id ;
              const {productId, quantity} =  req.body ;
  
              let user = await User.findById(u_id).select("-password") ;
              
              if(user)
              { 
                
                const existingCartItem =  user.cart.find(item => item.product.equals(productId));
  
                if (existingCartItem) {
                 
                  existingCartItem.quantity -=  quantity || 1;
  
                } else {
                  console.log("Cart Item Not Found") ;
                }
                await user.save();
  
  
                res.status(200).send({product : user} ) ;
            }else
            {
              res.send("User not found") ;
            }
  
          }catch(e)
          {
            res.status(500) ;
          }
            
          }) ;

        router.post("/delete" , fetchuser, async(req , res)=>{
          try{

            const  u_id = req.user.id ;

          const updatedUser = await User.findOneAndUpdate(
              { _id: u_id },
              { $pull: { cart: {product : req.body.product} } },
              { new: true }
            ) ;
                if (updatedUser) {
                  console.log('Product deleted successfully:', updatedUser);
                } else {
                  console.log('User not found');
                }
          
          res.status(200).send({success: true}) ;  
          }catch(error)
          {
            console.log("Internal Server Error from delete cart") ;
            res.status(500).send({Message: "Internal Servver Error"}) ;

          }
        })


module.exports = router ;




