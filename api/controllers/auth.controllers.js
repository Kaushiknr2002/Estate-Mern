import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js';






export const signup= async (req,res,next) =>{
    const {username,email,password}=req.body;
    const hashedPassword=bcrypt.hashSync(password,10)
    const newUser=new User(
        {username,email,password : hashedPassword }
    )
    try{
    await newUser.save()
    res.status(201).json("create success")   //because of add duplicate value by use try and catch
    }
    catch(error){
       next(error)
    }
}

export const signin= async (req,res,next) =>{
    const {email,password}=req.body;
    try{
        const validUser=await User.findOne({email} )
        if(!validUser){
            return next(errorHandler(404,"user not found"))
        }
        const validPassword= await bcrypt.compare(password,validUser.password)
        if(!validPassword){
            return next(errorHandler(401,"Invalid Password"))
        }
        const token=jwt.sign({id : validUser._id},process.env.JWT_SECRET)
        const {password : pass ,...rest}=validUser._doc;
        res.cookie('access_token',token,{httpOnly : true}).status(200).json(rest)

    }
    catch(error){
        next(error)

    }



    }