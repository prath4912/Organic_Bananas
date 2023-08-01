const mongoose = require("mongoose")

const paySchema = new mongoose.Schema({

    razorpay_payment_id: {
        type : String ,
        required : true ,
    },
    razorpay_order_id: {
        type : String ,
        required : true ,
    },
    razorpay_signature: {
        type : String ,
        required : true ,
    }
}); 
const Payment = mongoose.model('Payment', paySchema );

module.exports = Payment ;

