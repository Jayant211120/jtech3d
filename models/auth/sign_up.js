//import some libraries and files
import mongoose from "mongoose";

//create function
const sign_up_schema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    mobileNumber:{type:Number,unique:true},
    address:{type:String},
    gender:{
        type:String,
        enum:['male','female','other'],
        default:'male',
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{type:String},
    token:{type:String}
},{timestamps:true});

//create model
const sign_up_model = mongoose.model("sign_up",sign_up_schema,"sign_up");

//export the file
export default sign_up_model;