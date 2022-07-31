import supertest from 'supertest'
import app from '../index'
import displayImage from '../logic/resizeLogic'

const request = supertest(app)

//testing values
const name1 = 'icelandwaterfall'
const name2 = 'notexist'
const w = 200
const h = 200

describe('test endpoint responses', () => {
    //endpoint test
    it('gets the api endpoint', async () => {
        const res = await request.get('/api')
        expect(res.status).toBe(200)
        expect(res.text).toBe('api connectd')
    })

    //gets a valid image with resizing width & height
    it('gets a valid image resizing width and height values', async () => {
        const res1 = await request.get(
            `/api/images?filename=${name1}&width=${w}&height=${h}`
        )
        expect(res1.status).toBe(200)
    })

    //test function of image processing
    it('test invalid image name',async()=>{
        expect (await displayImage(name2,w,h))
            .toBe('file not exist')
    }

    )
})
