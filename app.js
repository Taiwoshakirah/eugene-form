const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = 8000

app.use(express.json())
const auth = require('./routes/auth')

app.use('/api/auth',auth)
app.use((req,res)=>{res.status(404).json({message :"Route not found"})})


try {
    const start =async ()=>{
        const conn =await mongoose.connect(process.env.MONGO_URI)
        console.log('DB Connected');        
        app.listen(port,()=>{
        console.log(`Server is listening on port: ${port}`);
        })
    }
    start()
} catch (error) {
    console.log(`Could not connect due to ${error.message}`);
    
    
}


