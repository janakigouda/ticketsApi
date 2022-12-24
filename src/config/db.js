const mongoose=require("mongoose");
require("dotenv").config();

const connect=()=>{
    mongoose.set("strictQuery",false);
    return mongoose.connect(process.env.URL);
}
module.exports=connect;