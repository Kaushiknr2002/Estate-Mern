import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const signup= async (req,res) =>{
    const {username,email,password}=req.body;
    const hashedPassword=bcrypt.hashSync(password,10)
    const newUser=new User(
        {username,email,password : hashedPassword }
    )
    try{
    await newUser.save()
    res.status(201).json("create success")   //because of add duplicate value by use try and catch
    }
    catch(err){
        res.status(500).json(err.message)
    }
}