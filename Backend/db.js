const mongoose = require("mongoose");
const mon_url ='mongodb://127.0.0.1:27017/Organic_Bananas' ;

// const mon_url = process.env.MONGO_URL;

async function connectMongo() {
  await mongoose.connect(mon_url);
  console.log("connected to database");
}

connectMongo().catch((err) => console.log(err));

module.exports = connectMongo;
