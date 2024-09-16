const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Fruit" },
        quantity: { type: Number, default: 1 },
      },
    ],
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    }, 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    amount: {
      type: Number,
      required: true,
    },
    pay_status: {
      type: Boolean,
      default: false,
    },
    shipping_address: {
      type: String,
    },
    status: {
      type: String,
      default: "Under Process",
      enum: ["Not Process" ,"Under Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
    qunatity : {
      type : Number,
      
    }
  },
  { timestamps: true }
);

const order = mongoose.model("Order", orderSchema);

module.exports = order;
