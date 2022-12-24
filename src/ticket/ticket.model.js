const mongoose=require("mongoose");

const ticketSchema=new mongoose.Schema({
    category:{type:String},
    title:{type:String},
    message:{type:String},
    resolved:{type:Boolean,default:false},
},{
    timestamps:true
})

const Tickets=mongoose.model("ticket",ticketSchema);

module.exports=Tickets;