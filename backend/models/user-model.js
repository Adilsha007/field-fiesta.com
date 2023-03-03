const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    phoneno : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isVerified : Boolean
})



const userModel = mongoose.model('user',userSchema)

module.exports = userModel