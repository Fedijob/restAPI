const express=require('express');
const User=require("../models/user");
const authRouter=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


authRouter.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
       if(!(email&&name&&password)) {
        res.status(400).send("field must not be empty");
       }  
        //check if user exist
       const oldUser=await User.findOne({email});
       if(oldUser){
        res.status(409).send("user already exist");
       }
       //encrypt password
       const encryptedPassword=await bcrypt.hash(password,10);
      //create user
       const user=await User.create({
              name,
                email:email.toLowerCase(),
                password:encryptedPassword,
      });
       const token=jwt.sign({
              user_id:user._id,email,

       },process.env.SECRET,
       {expiresIn:"2h"});user.token=token;
       res.status(200).json(user);
    }
    catch(err){
        console.log(err);
    }
});
authRouter.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!(email&&password)){
            res.status(400).send("all fields are required");
        }
        const user=await User.findOne({email});
        if(user&&(await bcrypt.compare(passwor,user.password))){
            const token=jwt.sign({
                user_id:user._id,email,
            },process.env.SECRET,{expiresIn:"2h"});

            user.token=token;
            res.status(200).json(user);
        }
        res.status(400).send("invalid credentials");
    }catch(error){
        console.log(error);
    }})

module.exports=authRouter