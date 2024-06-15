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
    },
    role : {
        type : String,
        enum : ['ADMIN', 'USER'],
        default : 'USER'
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

// If we give customize name in place of toJSON then we have to call it explicitely
userschema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = mongoose.model('user' , userschema);