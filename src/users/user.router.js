const {Router} =require("express");
const User=require("./user.model");
const authMiddleWare=require("../middleware/auth.middleware");

const userRoute=Router();

userRoute.post("/signup",async(req,res)=>{
    let {email}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(404).send("Cannot create a user with existing email");
        }
        let newUser=await User.create(req.body);
        res.send({
            token:`${newUser.id}:${newUser.email}:${newUser.password}`,
        })
    }catch(e){
        res.status(500).send(e.message);
    }
})

userRoute.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try{
        let user=await User.findOne({email,password});
        if(!user){
            return res.status(401).send("Authentication failed");
        }
        res.status(200).send({
            token:`${user.id}:${user.email}:${user.password}`,
        })
    }catch(e){
        res.status(500).send(e.message);
    }
})

userRoute.get("/getProfile",authMiddleWare,async(req,res)=>{
    let {email}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            res.send({user})
        }else{
            res.send(500).send("not able to retrive data");
        }
    }catch(e){
        res.status(500).send(e.message);
    }
})




module.exports=userRoute;