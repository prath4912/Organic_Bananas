const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({

    product_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Fruit"
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user" ,
        required : true
    },
    quantity: {
        type :Number ,
        default : 1 ,
    }
}); 
const Cart_item = mongoose.model('cartSchema', cartSchema );

module.exports = Cart_item ;

