const cloudinary = require("cloudinary").v2;

const imageUpload = async (req, res, next) => {
  try {
    const folder = req.body.category ;
    const file = req.files.image ;
    console.log(file.tempFilePath);
    const options = { folder };
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log(result);
    req.url = result.secure_url;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in uploading");
  }
};

module.exports = imageUpload;