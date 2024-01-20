const cloudinary = require("cloudinary").v2 ;

const imageUpload =  async(req,res,next)=>{
    try{
        console.log(req.body) ;
        console.log("in image") ;
        const file = req.files.image ;
        console.log(file.tempFilePath) ;
        const folder = "BS" ;
        const options = {folder} ;
        console.log("wdf") ;
        const result = await cloudinary.uploader.upload(file.tempFilePath , options) ;
        console.log(result) ;
        req.url = result.secure_url ;
        next();
}catch(error)
{
    console.log(error); 
    res.status(500).send("Error9") ;
}

} ;

module.exports =  imageUpload ;