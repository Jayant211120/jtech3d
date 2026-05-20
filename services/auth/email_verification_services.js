//import some libraries and files
import evm from "../../models/auth/email_verification.js";
import logger from "../../logger/logger.js";

//create function
const email_verification=async(req,res)=>{
    //use exception handling for handling the errors
    try{
        //create variable
        const {email,otp}=req.body;
        
        //checking email is exist or not
        const existing_email=await evm.findOne({email});

        //checking conditions
        if(!existing_email){
            res.status(400).json({status:false,message:"Email not exist"});
            logger.warn("Email not exist");
            return;
        }
        if(existing_email.otp != otp){
            res.status(400).json({status:false,message:"Invalid OTP"});
            logger.warn("Invalid OTP");
            return;
        }
        if(existing_email.otpExpired < Date.now()){
            res.status(400).json({status:false,message:"OTP Expired"});
            logger.warn("OTP Expired");
            return;
        }

        //update the model
        existing_email.otp=null;
        existing_email.otpExpired=null;
        existing_email.isVerified=true;

        //save the model
        await existing_email.save();

        //response
        res.status(200).json({status:true,message:"Email Verified Successfully",data:existing_email});
        logger.info("Email Verified Successfully");

    }catch(err){
        res.status(400).json({status:false,message:"Something went wrong in email verification",data:err.message});
        logger.error("Something went wrong in email verification");
    }
};

//export the file
export default email_verification;