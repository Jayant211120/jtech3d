//import some libraries and files
import { Timestamp } from "mongodb";
import mongoose from "mongoose";

//create function
const email_verification_schema=mongoose.Schema({
    email:{type:String},
    otp:{type:Number},
    resendOtp:{type:Number},
    otpExpired:{type:Date},
    isVerified:{type:Boolean,default:false}
},{timestamps:true});

//create model
const email_verification_model=mongoose.model("email_verification",email_verification_schema,"email_verification");

//export the file
export default email_verification_model;