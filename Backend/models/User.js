const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : true ,
    },
    lastName : String,
    email : {
        type :String ,
        required : true ,
    },
    password : {
        type : String ,
        required : true 
    },
    verified : {
        type : Boolean ,
        default : false 
    },
    cart : [{
        product : { type: mongoose.Schema.Types.ObjectId, ref: 'Fruit' },
        quantity: { type: Number, default: 1 },
      }] ,
    date :{
        type : Date ,
        default : Date.now()
    }      
},{ timestamps: true } );
const User = mongoose.model('user', userSchema );

module.exports = User ;

