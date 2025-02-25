import { Timestamp } from "bson";
import mongoose from "mongoose";


const userSchema=new moongoose.Schema({
    username:{
        type : string,
        required : true
    },
    email:{
        type : string,
        required : true
    },
    password :{
        type : string,
        required : true
    }
},{timestamps:true});

const User=mongoose.model('User',userSchema)

export default User