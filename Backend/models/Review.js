const mongoose = require("mongoose") 

const review = new mongoose.Schema({
    user : {
        type :mongoose.Schema.Types.ObjectId ,
        ref : "user"
    },
    product : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Fruit"
    },
    review :{
        type:Number ,
        default : 0
    } , 
    message : String
},{ timestamps: true } );

const Review = mongoose.model("Review", review);

module.exports = Review ;