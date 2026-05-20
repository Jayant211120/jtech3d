//import some libraries and files
import pino from "pino";

//create function
const logger=pino({
    level:"info",
    transport:{
        target:"pino-pretty",
        options:{colorize:true}
    }
});

//export the file
export default logger;