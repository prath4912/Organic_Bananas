const mongoose = require("mongoose")

const fruitschema = new mongoose.Schema({

    name : {
        type : String ,
        required : true ,
        
    },
    amount: {
        type :Number ,
        required : true ,
    },
    desc : {
        type : String ,
    },

    rating : {
        type : Number 
    },

    reviews : {
        type : Array
    }

    // available : {

    // }

}); 
const Fruit = mongoose.model('Fruit', fruitschema );

module.exports = Fruit ;

