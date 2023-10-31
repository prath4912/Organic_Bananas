const mongoose = require("mongoose");

const wishschema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Fruit"
    },
    user: {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user" ,
        required : true
    }, 
});
const Wish = mongoose.model("Wish", wishschema);

module.exports = Wish;


