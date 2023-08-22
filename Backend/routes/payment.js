const express = require("express") ;
const Razorpay = require("razorpay") ;
const crypto = require("crypto") ;
const PAYMENT = require("../models/PayId") ;
const Order = require("../models/Orders") ;
const dotenv =  require("dotenv") ; 
const order = require("../models/Orders");
const fetchuser = require("../middleware/fetchuser");
const { error } = require("console");

dotenv.config({path : "./config/config.env"}) ;


const router = express.Router() ;

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY ,
        key_secret: process.env.RAZORPAY_API_SECRET  ,
  }); 
 


router.post('/checkout' , async (req,res)=>{
    var options = {
                amount: Number( req.body.amount*100),  
                // amount in the smallest currency unit
                // amount : 30000,
                currency: "INR",
                receipt: "order_rcptid_11"
              };
              const order = await instance.orders.create(options);
              console.log(order) ;
              res.status(200).json({
                success: true,
                order
              } ) ;
}) ;


router.post("/paymentv" , fetchuser ,  async (req , res)=>{
    console.log(req.body);
    const {razorpay_payment_id , razorpay_order_id , razorpay_signature ,add1 ,cart1 } = req.body ;
    const body = razorpay_order_id + "|" + razorpay_payment_id ;

    const generated_signature = crypto
        .createHmac("sha256" , process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex") ;
      
        const isMatch = razorpay_signature===generated_signature ;
        if(isMatch)
        {
          const pay = await PAYMENT.create({ 
            razorpay_payment_id , razorpay_order_id , razorpay_signature
          }) ;
          console.log("payment created") ;

          try{
            const cart = JSON.parse(cart1) ;
          const order = await Order.create({
            products : cart[0].product._id , payment : pay.id , buyer : req.user.id , pay_status : true ,
          })
          console.log(order) ;
          }catch(error){
            console.log(error) ;
          }
          
        res.status(200).json({success:true} );
          
        }else
        {
          const cart = JSON.parse(cart1) ;

          const order = await Order.create({
            products :cart[0].product._id , payment : null , buyer : req.user.id , pay_status : true ,
          })
          console.log(order);
          res.status(400).json({
            success:false ,
          });
        }
      
});

module.exports = router ;

