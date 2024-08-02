const mongoose = require("mongoose");

const fruitschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  stock :{
    type: Number
  },
  available : {
    type : Boolean ,
    default : true
  },
  rating: {
    type: Number,
  },
  reviews: [{}],
  category : {
    type : String ,
    default : "general" ,
  },
  image : []
},{ timestamps: true } );

const Fruit = mongoose.model("Fruit", fruitschema);
module.exports = Fruit;
