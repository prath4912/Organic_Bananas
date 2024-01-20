const cloudinary = require("cloudinary") ;

require("dotenv").config({path : "./config/config.env"}) ;
;
const cloud = async()=>{
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECREAT
        });
    }catch(error)
    {
        console.log(error) ;
    }
}




module.exports = cloud ;