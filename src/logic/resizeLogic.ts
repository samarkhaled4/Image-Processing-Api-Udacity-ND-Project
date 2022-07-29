import fs   from "fs";
import path from "path";
import sharp from "sharp";

const displayImage =async (imageName:string,imageWidth:number,imageHeight:number):Promise<string>=>{
    const width=imageWidth ;
    const height=imageHeight ;
    //processed imagee comes from browser
    const myImg=path.join(__dirname,`../../images/original/${imageName}.jpg`);

    if(fs.existsSync(myImg)){
        //original image withot given resizing width or height
        if(!imageWidth && !imageHeight)
        return myImg;
        //resize image with only width
        else if (!imageHeight){
            const newImage=path.join(myImg,`../../resized/${imageName}_width-${imageWidth}.jpg`);
            if(!fs.existsSync(newImage)){
                await sharp(myImg).resize({width}).toFile(newImage);
            }
            return newImage;
        }
        //resize image with only height
        else if (!imageWidth){
            const newImage=path.join(myImg,`../../resized/${imageName}_height-${imageHeight}.jpg`);
            if(!fs.existsSync(newImage)){
                await sharp(myImg).resize({height}).toFile(newImage);
            }
            return newImage;
        }
        //resize image with width and height
        else {
            const newImage=path.join(myImg,`../../resized/${imageName}_width-${imageWidth}_height-${imageHeight}.jpg`);
            if(!fs.existsSync(newImage)){
                await sharp(myImg).resize({width,height}).toFile(newImage);
            }
            return newImage}; 
    }
    else  return "file not exist";
}
export default displayImage;