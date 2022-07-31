import express, { Request, Response } from 'express'
import fs from 'fs'
import displayImage from '../../logic/resizeLogic'
const apiRoute = express.Router()

apiRoute.get('/', (req: Request, res: Response) => {
    res.send('api connectd')
})
apiRoute.get('/images', async (req: Request, res: Response): Promise<void> => {

    const filename = req.query.filename as string
    const w=req.query.width as string;
    const h=req.query.height as string;

    //check validity of both width and height values
    if ( (h && !/^([1-9]\d*)$/.test(h)) || (w && !/^([1-9]\d*)$/.test(w)) ) {
        res.status(400).send(
            'Please insert only positive integers for width and height !!'
        )
    } 
    else {
        const width = parseInt(w);
        const height = parseInt(h);
        if (filename) {
            const path = await displayImage(filename, width, height)
            //I have already done logic of caching inside displayImage function itself
            if (fs.existsSync(path)) {
                res.status(200)
                res.sendFile(path)
            } else {
                res.status(400).send(
                    "Image name isn't exist , please enter right one !"
                )
            }
        } 
        else {
            res.status(400).send(
                'Could you enter filename parameter in query string with valid image name !?'
            )
        }
    }
})
export default apiRoute
