const express = require('express')
const connectDB = require("./config/dbConfig")
const cors = require("cors");
require ('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080;

// DB CONNECTION 
connectDB()

app.use (express.json())
app.use(express.urlencoded({extnded:true}))
app.use(cors({
  origin: 'ai-email-generator-seven-gamma.vercel.app',
  credentials: true
}));


 app.get("/",(req,res)=>{
    res.json({
        message :"Welcome To Cold Mail Api"
    })
 })
// auth routes 

 app.use('/api/auth',require('./routes/authRoutes'))
 app.use('/api/email',require('./routes/aiRoutes'))



 app.listen(PORT,()=>{
    console.log(`Server Is Running AT : ${PORT}`)}
)