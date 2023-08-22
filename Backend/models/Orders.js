const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    products: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fruit",
      }
    
    ,
    payment: {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Payment"
    },
    user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    pay_status : {
      type : Boolean ,
      default : false
    } ,
    shipping_address : {

    }
    ,
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);
const order = mongoose.model("Order", orderSchema);

module.exports = order ;