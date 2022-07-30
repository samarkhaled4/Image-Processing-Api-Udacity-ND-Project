import express, { Request, Response } from 'express'
import apiRoute from './routes/api/main'
const app = express()
const port = 3000

//APi endpoint route
app.use('/api', apiRoute)

//Application Middleware
app.get('/', (req: Request, res: Response) => {
    res.send('connected')
})
//Start server
app.listen(port, () => {
    console.log(`Server Started listening on port ${port}`)
})
export default app
