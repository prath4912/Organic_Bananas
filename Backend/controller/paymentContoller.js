const instance = require("../index") ;

// const Checkout = async (req,res)=>{
//     var options = {
//         amount: 50000,  // amount in the smallest currency unit
//         currency: "INR",
//         receipt: "order_rcptid_11"
//       };
//       const order = await instance.orders.create(options);
//       console.log(order) ;
//       res.status(200).json({
//         success: true,
//       })
// } ;

module.export =   async (req,res)=>{
    var options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      const order = await instance.orders.create(options);
      console.log(order) ;
      res.status(200).json({
        success: true,
      } ) ;
    }  ;