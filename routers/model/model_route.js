//import some libraries and file
import express from "express";
import model_controller from "../../controllers/model/model_controller.js";

//create router
const router=express.Router();

//create request
router.post("/chatbot",model_controller);

//export the model
export default router;