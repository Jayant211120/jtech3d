//import some libraries and files
import { ExplainableCursor } from "mongodb";
import logger from "../../logger/logger.js";
import evm from "../../models/auth/email_verification.js";
import sum from "../../models/auth/sign_up.js";
import bcrypt from "bcryptjs";

//create function
const resetPassword = async(req,res)=>{
    //use exception handling for handling the errors
    try{
        const {email,otp,newPassword} = req.body;

        //checking email is exist or not
        const existingEmail = await evm.findOne({email});

        //checking conditions
        if(!existingEmail){
            res.status(400).json({status:false,message:"Invalid User"});
            logger.warn("Invalid User");
            return;
        }
        if(otp != existingEmail.otp){
            res.status(400).json({status:false,message:"Invalid OTP"});
            logger.warn("Invalid OTP");
            return;
        }

        //checking email is exist or not from sign up model
        const existingEmailOfSum = await sum.findOne({email});

        //checking condition
        if(!existingEmailOfSum){
            res.status(400).json({status:false,message:"User Not Found"});
            logger.warn("User Not Found");
            return;
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(newPassword,10);

        //checking condition
        if(!hashedPassword){
            res.status(400).json({status:false,message:"Invalid Credentials"});
            logger.warn("Invalid Credentials");
            return;
        }

        //update the password
        existingEmailOfSum.password = hashedPassword;

        //save the password
        existingEmailOfSum.save();

        //update the email verification data
        existingEmail.otp=null;
        existingEmail.otpExpired=null;
        existingEmail.isVerified=true;

        //save the data
        await existingEmail.save();

        //response
        res.status(200).json({status:true,message:"Password Reset Successfully",data:existingEmailOfSum});
        logger.error("Password Reset Successfully");
    }catch(err){
        //response
        res.status(400).json({status:false,message:"Something went wrong in reset password"});
        logger.error("Something went wrong in reset password");
    }
};

//export the file
export default resetPassword;