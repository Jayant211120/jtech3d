//import some libraries and files
import sendOtp from "../../controllers/auth/send_otp_controller.js";
import resendOtp from "../../controllers/auth/resend_otp_controller.js";
import email_verification from "../../controllers/auth/email_verification_controller.js";
import express from "express";
import nodemailer from "nodemailer";
import custom_env from "../../storage/custom_env_function.js";

//create instance variable
const router=express.Router();

//create api
router.post("/sendOtp",sendOtp);
router.post("/resendOtp",resendOtp);
router.post("/email_verification",email_verification);

//export the file
export default router;