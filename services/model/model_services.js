//import some libraries and files
import { spawn } from "node:child_process";
import path from "path";
import { fileURLToPath } from "url";

// current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create function
const model = async (req, res) => {
    let userInput = req.body.message;
    // correct python file path
    const pythonFile = path.join(
        __dirname,
        "../../python/predict.py"
    );
    // spawn python process
    const pythonProcess = spawn("python", [
        pythonFile,
        userInput
    ]);
    let result = "";
    pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
    });
    pythonProcess.stderr.on("data", (data) => {
        console.log(data.toString());
    });
    pythonProcess.on("close", () => {
        res.json({
            prediction: result.trim(),
        });
    });
};

export default model;