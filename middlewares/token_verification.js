//import some libraries and files
import jwt from "jsonwebtoken";
import custom_env from "../storage/custom_env_function.js";
import logger from "../logger/logger.js";

//crete function
const token_verification = (req, res, next) => {
  //use exception handling for handling the errors
  try {
    //create variables
    const headers = req.headers.authorization;

    //checking conditions
    if (!headers) {
      res.status(400).json({ status: false, message: "Token Not Found" });
      logger.warn("Token Not Found");
      return;
    }

    //remove bearer
    const token = headers.split(" ")[1];

    //checking conditions
    if (!token) {
      res.status(400).json({ status: false, message: "Invalid Token" });
      logger.warn("Invalid Token");
      return;
    }

    //verify the token
    const decoded = jwt.verify(token, custom_env.token_key);

    req.user = decoded;

    next();
  } catch (err) {
    res
      .status(400)
      .json({ status: false, message: "Something went wrong in token" });
    logger.error("Something went wrong in token");
  }
};

//export the file
export default token_verification;
