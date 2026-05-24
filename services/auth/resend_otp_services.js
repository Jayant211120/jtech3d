//import some libraries and files
import evm from "../../models/auth/email_verification.js";
import {generateOtp,generateOtpExpired} from "../../storage/constants.js";
import logger from "../../logger/logger.js";
import send_email from "../../utils/email_config/email_config.js";

//create function
const resend_otp=async(req,res)=>{
    //use exception handling for handling the errors
    try{
        //create variables
        const {email}=req.body;
        let otp=generateOtp();
        let otpExpired=generateOtpExpired();

        //checking email is exist or not
        const existing_email=await evm.findOne({email});

        //checking conditions
        if(!existing_email){
            res.status(400).json({status:false,message:"Email not exist"});
            logger.warn("Email not exist");
            return;
        }
        
        //update the values
        existing_email.email=email;
        existing_email.otp=otp;
        existing_email.otpExpired=otpExpired;

        //save the model
        await existing_email.save();

        //send the mail
        await send_email(email,"OTP is:",`OTP is:${otp}`);

        //response
        res.status(200).json({status:true,message:"OTP resend successfully",data:existing_email});
        logger.info("OTP resend successfully");

    }catch(err){
        //response
        res.status(400).json({status:false,message:"Something went wrong in resend otp",data:err.message});
        logger.error("Something went wrong in resend otp");
    }
};

//export the file
export default resend_otp;