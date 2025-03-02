import express from 'express';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
import userRouter from './route/user.route.js'
import authRouter from './route/auth.route.js'
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=> {
    console.log("connected to Mongo DB")
}).catch((err) => {
    console.log(err)
})
const app=express()

app.use(express.json())


app.listen(3000,() => {
    console.log("Server is running on port 3000!")
})

app.use('/api/user',userRouter)

app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500 ;
    const message= err.message || "internal Server Error"
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message

    })
})