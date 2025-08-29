import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectToDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'


const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

app.use(cors())
app.use(express.json())

app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
    return res.json({
        message: "API Working"
    })
})

app.listen(port, async () => {
    await connectToDb();
    console.log(`server is listening on port ${port}`)
})