const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userschema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    }
},
{
    timestamps : true
})

userschema.pre("save" , async function(next){
    try {
        if(this.isModified("password"))
        {
            const hashedPassword = await bcrypt.hash(this.password , 10);
            this.password = hashedPassword;
        }
    } catch (error) {
        next(error);
    }
})

module.exports = mongoose.model('user' , userschema);