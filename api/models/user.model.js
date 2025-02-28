import { Timestamp } from "bson";
import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true,
    },
    avatar:{
        type : String,
        default:"https://img.freepik.com/premium-vector/profile-picture-icon-human-symbol-man-women-sign-people-person-user-profile-avatar-icon_659151-3962.jpg?ga=GA1.1.1433379970.1739339634&semt=ais_hybrid",

    },
},{timestamps:true});

const User=mongoose.model('User',userSchema)

export default User