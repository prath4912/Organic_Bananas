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
  image: {
    data : Buffer,
    contentType : String ,
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
  reviews: {
    type: Array,
  },
  category : {
    type : String ,
  },

  
});
const Fruit = mongoose.model("Fruit", fruitschema);

module.exports = Fruit;
