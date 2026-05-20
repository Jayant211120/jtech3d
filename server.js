//import some libraries and files
import app from "./app.js";
import cors from "cors";
import logger from "./logger/logger.js";
import custom_env from "./storage/custom_env_function.js";

//listen the server
app.listen(custom_env.port,custom_env.host,()=>{
    logger.info(`Server is Running on=>${custom_env.port}`);
});

process.on("uncaughtException",(error)=>{
    logger.warn(`Error:${error.message}`);
});
process.on("SIGINT",(interupt)=>{
    logger.warn(`Signal Interupt:${interupt}`);
    process.exit(0);
});