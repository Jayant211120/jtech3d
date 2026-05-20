//import some libraries and files
import evm from "../../models/auth/email_verification.js";
import logger from "../../logger/logger.js";
import {generateOtp,generateOtpExpired} from "../../storage/constants.js";
import send_email from "../../utils/email_config/email_config.js";

//create function
const send_otp = async (req, res) => {
  //use exception handling for handling the errors
  try {
    //create variables
    const { email } = req.body;
    let otp = generateOtp();
    let otpExpired = generateOtpExpired();

    //checking email exist or not
    const existingEmail = await evm.findOne({ email });

    //checking conditions
    if (existingEmail) {
        res.status(400).json({status: false, message: "Email already exist" });
        logger.warn("Email already exist");
        return;
    }

    //put the values in data
    const data = evm({
        email,
        otp,
        otpExpired,
    });
    
    //save the data
    await data.save();
    
    //put the values in send email function
    const isSent=await send_email(email, "Your OTP is:", `OTP is:${otp}`);
    if(!isSent){

   return res.status(500).json({
      status:false,
      message:"Email failed"
   });
}

    //send response
    res.status(200).json({status: true, message: "OTP send successfully",data: data });
    logger.info("OTP send successfully");
  } catch (err) {
    //send response
    res.status(400).json({status: false,message: "Something went wrong in send otp",data: err.message});
    logger.error("Something went wrong in send otp");
  }
};

//export the file
export default send_otp;
