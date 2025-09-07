import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'


const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

app.use(cors())
app.use(express.json())

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    return res.json({
        message: "API Working"
    })
})

app.listen(port, async () => {
    await connectDB();
    console.log(`server is listening on port ${port}`)
})