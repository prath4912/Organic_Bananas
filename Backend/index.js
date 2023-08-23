const express = require("express") ;
const dotenv =  require("dotenv") ; 
const cors = require("cors") ;
var bodyParser = require('body-parser');
const app = express() ; 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connectMongo = require("./db")
connectMongo ;

dotenv.config({path : "./config/config.env"}) ;

const PORT = process.env.PORT ;

app.use(cors()) ; 
app.use(express.json()) ;  // request data from body as a middleware
app.use(express.urlencoded({extended : true})) ;

app.use("/" , require("./routes/payment")) ;

app.use('/api/admin' , require("./routes/admin")) ;

app.use("/api/auth" , require("./routes/auth")) ;

app.use("/api/cart" , require("./routes/Cart")) ;

app.get("/api/key" , (req,res)=>[

    res.send(process.env.RAZORPAY_API_KEY ) 
])

app.listen(process.env.PORT , ()=>{
    console.log("Server Started at" + PORT)
}) 

// use express-validator in login and signup