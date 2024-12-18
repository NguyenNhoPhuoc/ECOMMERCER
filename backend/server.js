import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectCloudinary from './cloudinary.js'
import connectDB from './config/mongodb.js'
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
// App config
const app= express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
// middlewares

app.use(express.json())
app.use(cors())

//api endpoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>console.log('Server started on PORT:'+port))
