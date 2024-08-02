const cloudinary = require("cloudinary");

const cloud = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECREAT,
    });
  } catch (error) {
    console.log(error);
  }
};

cloud();

module.exports = cloud;
