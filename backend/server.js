import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import { ConectDB } from './libs/DB/ConnectDB.js'

import UserRoute from './router/User.js'
import ProductRoute from './router/Product.js'

dotenv.config()
const app = express()
app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan("dev"));
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT = 8080 

app.use('/api/user',UserRoute)
app.use('/api/product',ProductRoute)



app.listen(PORT,()=>{
    ConectDB()
    console.log('Server is running at port',PORT)
})