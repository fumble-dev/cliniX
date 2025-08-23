import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectToDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'


const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    return res.json({
        message: "API Working"
    })
})

app.listen(port, async () => {
    await connectToDb();
    console.log(`server is listening on port ${port}`)
})