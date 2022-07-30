import express, { Request, Response } from 'express'
import fs from 'fs'
import displayImage from '../../logic/resizeLogic'
const apiRoute = express.Router()

apiRoute.get('/', (req: Request, res: Response) => {
    res.send('api connectd')
})
apiRoute.get('/images', async (req: Request, res: Response): Promise<void> => {
    const filename = req.query.filename as string
    const width = parseInt(req.query.width as string)
    const height = parseInt(req.query.height as string)

    //check validation of width and height values
    //check validity of width value
    if (isNaN(width) && !req.query.height && req.query.width) {
        res.status(400).send('Please insert valid values for width !!')
    }
    //check validity of height value
    else if (isNaN(height) && !req.query.width && req.query.height) {
        res.status(400).send('Please insert valid values for height !!')
    }
    //check validity of both width and height values
    else if (
        isNaN(height) &&
        isNaN(width) &&
        req.query.height &&
        req.query.width
    ) {
        res.status(400).send(
            'Please insert valid values for width and height !!'
        )
    } else {
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
        } else {
            res.status(400).send(
                'Could you enter filename parameter in query string with valid image name !?'
            )
        }
    }
})
export default apiRoute
