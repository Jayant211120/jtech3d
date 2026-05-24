//import some libraries and files
import send_email from "../../utils/email_config/email_config.js";
import evm from "../../models/auth/email_verification.js";
import logger from "../../logger/logger.js";
import {generateOtp,generateOtpExpired} from "../../storage/constants.js";

//create function
const forgotPassword = async(req,res)=>{
    //use exception handling for handling the errors
    try{
        //create variables
        const {email} = req.user.email;
        const otp = generateOtp();
        const otpExpired = generateOtpExpired();

        //checking user email exist or not
        const existingEmail = await evm.findOne({email});

        //checking conditions
        if(!existingEmail){
            res.status(400).json({status:false,message:"User Not Exist"});
            logger.warn("User Not Exist");
            return;
        }

        //update the data
        existingEmail.otp = otp;
        existingEmail.otpExpired=otpExpired;
        existingEmail.isVerified=false;

        //save the data
        existingEmail.save();

        //send otp
        await send_email(email,"OTP is",`OTP is:${otp}`);

        //response
        res.status(200).json({status:200,message:"Forgot Password Successfully",data:existingEmail});
        logger.info("Forgot Password Successfully");

    }catch(err){
        //response
        res.status(400).json({status:false,message:"Something went wrong in forgot password",data:err.message});
        logger.error("Something went wrong in forgot password");
    }
};

//export the file
export default forgotPassword;