const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('User', userSchema)