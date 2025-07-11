const express = require('express');
const cors = require('cors');
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes/index')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',router)
app.use(cookieParser())

const PORT = 8000 || process.env.PORT

connectDB()
app.listen(PORT, ()=>{
    console.log('server is running at port 8000');
    
})

