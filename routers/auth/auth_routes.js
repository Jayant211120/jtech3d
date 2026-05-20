//import some libraries and files
import sendOtp from "../../controllers/auth/send_otp_controller.js";
import resendOtp from "../../controllers/auth/resend_otp_controller.js";
import email_verification from "../../controllers/auth/email_verification_controller.js";
import signUp from "../../controllers/auth/sign_up_controller.js";
import signIn from "../../controllers/auth/sign_in_controller.js";
import express from "express";
import nodemailer from "nodemailer";
import custom_env from "../../storage/custom_env_function.js";
import token_verification from "../../middlewares/token_verification.js";

//create instance variable
const router=express.Router();

//create api
router.post("/sendOtp",sendOtp);
router.post("/resendOtp",resendOtp);
router.post("/email_verification",email_verification);
router.post("/signUp",signUp);
router.post("/signIn",signIn);

//export the file
export default router;