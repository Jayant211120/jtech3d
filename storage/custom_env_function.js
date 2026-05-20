// import some libraries and files
import dotenv from "dotenv";

//config the dotenv
dotenv.config();

//create function
const custom_env={
    port:process.env.PORT,
    db_url:process.env.DB_URL,
    sender_email:process.env.SENDER_EMAIL,
    brevo_login:process.env.BREVO_LOGIN,
    brevo_password:process.env.BREVO_PASSWORD,
    brevo_api_key:process.env.BREVO_API_KEY,
    admin_code:process.env.ADMIN_CODE,
    token_key:process.env.TOKEN_KEY,
};

//export the file
export default custom_env;