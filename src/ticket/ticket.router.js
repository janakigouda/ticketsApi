const {Router} =require("express");
const Tickets = require("./ticket.model");
const authMiddleWare=require("../middleware/auth.middleware");

const ticketRoute=Router();

ticketRoute.post("/",authMiddleWare,async(req,res)=>{
    try{
        let ticket=await Tickets.create(req.body);
        res.send(ticket);
    }catch(e){
        res.status(500).send(e);
    }
})

ticketRoute.get("/",authMiddleWare,async(req,res)=>{
    try{
        let filters=req.query;
        let ticket=await Tickets.find();
        let filteredData=ticket.filter(data=>{
            let isValid=true;
            for(let key in filters){
                isValid=isValid && data[key]===filters[key];
            }
            return isValid;
        })
        res.send(filteredData);
    }catch(e){
        res.status(500).send(e);
    }
})

ticketRoute.put("/:id",authMiddleWare,async(req,res)=>{
    try{
        Tickets.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((users)=>{
            if(!users){
                return res.status(404).send();
            }
            res.send(users);
        })
    }catch(e){
        res.status(500).send(e);
    }
})


module.exports=ticketRoute;