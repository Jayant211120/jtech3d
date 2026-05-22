//import some libraries and files
import sum from "../../models/auth/sign_up.js";
import emv from "../../models/auth/email_verification.js";
import bcrypt from "bcryptjs";
import logger from "../../logger/logger.js";
import custom_env from "../../storage/custom_env_function.js";

//create function
const sign_up=async(req,res)=>{
    //use exception handling for handling the exception
    try{
        //create variables
        const {name,mobileNumber,address,gender,password,role,code}=req.body;
        let email;
        let userRole = "";

        //checking email is exist or not
        const existing_email=await emv.findOne({isVerified:true});

        //checking condition
        if(!existing_email){
            res.status(400).json({status:false,message:"Email Not Verified"});
            logger.warn("Email Not Verified");
            return;
        }

        //assign the email to sign up model
        email=existing_email.email;

        //checking the conditions
        if(role == 'user'){
            userRole = 'user';
        }
        if(role == 'admin'){
            if(code == custom_env.admin_code){
                userRole = 'admin';
            }
            else{
                res.status(400).json({status:false,message:"Enter valid admin code"});
                logger.warn("Enter valid admin code");
                return;
            }
        }

        //hash the password
        const hashed_password = await bcrypt.hash(password,10);

        //checking condition
        if(!hashed_password){
            res.status(400).json({status:false,message:"Password Not Hashed"});
            logger.warn("Password Not Hashed");
            return;
        }

        //put data to model
        const user_data = sum({
            name,
            email,
            mobileNumber,
            address,
            gender,
            password:hashed_password,
            role:userRole,
        });

        //save the model
        await user_data.save();

        //response
        res.status(200).json({status:true,message:"Signup Successfully",data:user_data});
        logger.info("Signup Successfully");
        
    }catch(err){
        //response
        res.status(400).json({status:false,message:"Something went wrong in signup",data:err.message});
        logger.error("Something went wrong in signup");
    }
};

//export the file
export default sign_up;