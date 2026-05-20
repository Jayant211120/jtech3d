//import some libraries and files
import mongoose from "mongoose";
import custom_env from "../../storage/custom_env_function.js";
import logger from "../../logger/logger.js";

//create function
const connectivity=async()=>{
    //make connection
    const check=await mongoose.connect(custom_env.db_url);

    //check conditions
    if(!check){
        logger.warn("Database connection failed");
        return;
    }
    else{
        logger.info("Database connected");
    }
}


//export the file
export default connectivity;