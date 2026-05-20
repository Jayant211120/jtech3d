//import some libraries and files
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import db from "./config/connectivity/db_connection.js";
import authRoutes from "./routers/auth/auth_routes.js";

//create instance variable
const app=express();

//database calling
db();


//create middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

app.use("/auth/v1",authRoutes);

//export the file
export default app;
