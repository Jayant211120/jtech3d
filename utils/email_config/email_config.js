// //import some libraries and files
// import nodemailer from "nodemailer";
// import custom_env from "../../storage/custom_env_function.js";
// import logger from "../../logger/logger.js";

// //create function
// const send_email = async (email, subject, text) => {
//     const transport = nodemailer.createTransport({
//       host: "smtp-relay.brevo.com",
//       port: 587,
//       secure: false,

//       auth: {
//         user:custom_env.brevo_login,
//         pass:custom_env.brevo_password,
//       },
//     });

//    await transport.sendMail({
//       from:custom_env.sender_email,
//       to: email,
//       subject: subject,
//       text: text,
//     });
// };

// //export the file
// export default send_email;

import axios from "axios";
import custom_env from "../../storage/custom_env_function.js";

const send_email = async (email, subject, text) => {

  try {

    const response = await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      {
        sender: {
          name: "JTECH3D",
          email: custom_env.sender_email,
        },

        to: [
          {
            email: email,
          },
        ],

        subject: subject,

        textContent: text,
      },

      {
        headers: {
          "api-key": custom_env.brevo_api_key,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("EMAIL SENT:", response.data);

    return true;

  } catch (error) {

    console.log(
      "EMAIL ERROR:",
      error.response?.data || error.message
    );

    return false;
  }
};

export default send_email;