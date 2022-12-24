const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const Users=mongoose.model("user",userSchema);

module.exports=Users;