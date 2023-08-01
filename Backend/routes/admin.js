const express = require("express") ;
const Fruit = require("../models/Fruits")

const router = express.Router() ;



router.post("/insert" , async(req,res)=>{

    const {name , amount , desc} = req.body ;

    await Fruit.create({
        name , amount , desc
    })
    res.send("vf") ;
});


router.get("/c1" , (req,res)=>{
const obj = {
    name:"fdv" ,
    amount : 40
}
res.json(obj)
});


module.exports = router ;