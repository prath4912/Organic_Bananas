const express = require("express") ;
const dotenv =  require("dotenv") ; 
const cors = require("cors") ;
const connectMongo = require("./db")
connectMongo ;

dotenv.config({path : "./config/config.env"}) ;
const app = express() ; 
const PORT = process.env.PORT ;
app.use(cors()) ; 
app.use(express.json()) ;  // request data from body as a middleware
app.use(express.urlencoded({extended : true})) ;

app.use("/" , require("./routes/payment")) ;

app.use('/admin' , require("./routes/admin")) ;

app.use("/api/auth" , require("./routes/auth")) ;

app.use("/api/cart" , require("./routes/Cart")) ;

app.get("/api/key" , (req,res)=>[

    res.send(process.env.RAZORPAY_API_KEY ) 
])

app.listen(process.env.PORT , ()=>{
    console.log("Server Started at" + PORT)
}) 

// use express-validator in login and signup