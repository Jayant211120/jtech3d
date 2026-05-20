//import some libraries and files
import logger from "../../logger/logger.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sum from "../../models/auth/sign_up.js";
import custom_env from "../../storage/custom_env_function.js";

//create function
const sign_in = async(req,res)=>{
    //use exception handling for handling the errors
    try{
        //create variables
        const {email,password}=req.body;

        //checking email is exist or not
        const existingEmail=await sum.findOne({email});

        //checking conditions
        if(!existingEmail){
            res.status(400).json({status:false,message:"User Not Found"});
            logger.warn("User Not Found");
            return;
        }

        //verify the password
        const compare_password =bcrypt.compare(password,existingEmail.password);

        //checking condition
        if(!compare_password){
            res.status(400).json({status:false,message:"Invalid Credentials"});
            logger.warn("Invalid Credentials");
            return;
        }

        //generate token
        const token=jwt.sign(
            {
              "_id":existingEmail._id,
              "email":existingEmail.email,  
              "role":existingEmail.role,
            },
            custom_env.token_key,
            {expiresIn:"30d"}
        );

        existingEmail.token=token;
        await existingEmail.save();

        //response
        res.status(200).json({status:true,message:"Signin Successfully",data:existingEmail});
        logger.info("Signin Successfully");

    }catch(err){
        //response
        res.status(400).json({status:false,message:"Something went wrong in sign in",data:err.message});
        logger.error("Something went wrong in sign in");
    }
};

//export the file
export default sign_in;