import  express,{Request,Response}  from "express";
import fs  from "fs";
import displayImage from "../../logic/resizeLogic";
const apiRoute= express.Router();

apiRoute.get('/',(req:Request,res:Response)=>{
    res.send("api connectd")
})
apiRoute.get('/images',async (req:Request,res:Response):Promise<void>=>{
    let filename=req.query.filename as string;
    const width=parseInt(req.query.width as string);
    const height=parseInt(req.query.height as string);
    //check validation of width and height values
    if(isNaN(width) || isNaN(height)){
        res.status(400).send("Please insert valid values for width or height !!");
    }
    else{
        if(filename){
            const path=await displayImage(filename,width,height);
            if(fs.existsSync(path)){
                res.status(200);
                res.sendFile(path);
            }
            else {
                res.status(400).send("Image name isn't exist , please enter right one !");
            }
        }
        else {
            res.status(400).send("Could you enter filename parameter in query string with valid image name !?");
        }
    }
})
export default apiRoute;