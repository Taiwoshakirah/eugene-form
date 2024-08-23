const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 8000

app.use(express.json())
const auth = require('./routes/auth')

app.use('/api/auth',auth)
app.use((req,res)=>{res.status(404).json({message :"Route not found"})})


try {
    const start =async ()=>{
        const conn =await mongoose.connect('mongodb+srv://eugeneokogun:kLYA2dtfoK2QXW0c@cluster1.uhlzu.mongodb.net/formTest?retryWrites=true&w=majority&appName=Cluster1')
        console.log('DB Connected');        
        app.listen(port,()=>{
        console.log(`Server is listening on port: ${port}`);
        })
    }
    start()
} catch (error) {
    console.log(`Could not connect due to ${error.message}`);
    
    
}


