const User = require('../models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = async (req , res) => {

    try {
        const {fullName , email , password} = req.body;
    
        const inputcheck = [fullName , email , password].some(input => !input);
    
        if(inputcheck){
            return res.status(400).json({message : 'All fields are required' , success:false , error:true})
            
        }
    
        const dbUser = await User.findOne({email});
    
        if(dbUser){
            return res.status(400).json({message : 'user already exists with this email' , success:false , error:true})
        }
    
        const payload = {
            fullName,
            email,
            password
        }
    
        const savedUser = await User.create(payload);
    
        return res.status(201).json({data : savedUser , message : 'user registered successfully' , success:true , error:false})
    } catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false,
            error : true,
        })
    }

}

const login = async (req , res) => {

    try {
        const {email , password} = req.body;
    
        const inputcheck = [email , password].some(input => !input);
    
        if(inputcheck){
            return res.status(400).json({message : 'All fields are required' , success:false , error:true})
            
        }
    
        const dbUser = await User.findOne({email});
    
        if(!dbUser){
            return res.status(400).json({message : "user doesn't exists with this email" , success:false , error:true})
        }

        const isValid = await bcrypt.compare(password , dbUser.password);

        if(!isValid){
            return res.status(400).json({message : 'Please enter correct password' , success:false , error:true})
        }

        const tokenPayload = {
            email,
            userId : dbUser._id,
            role : dbUser.role,
        }

        const jwtToken = jwt.sign(tokenPayload , process.env.JWT_SECRET , {expiresIn : '1h'});
    
        return res.status(201).json({data : {token : jwtToken} ,message : 'user login successfully' , success:true , error:false})

    } catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false,
            error : true,
        })
    }

}

const userDetail = async (req , res) => {

    try {
    
        const userId = req.userId;

        const dbUser = await User.findOne({_id : userId});
    
        if(!dbUser){
            return res.status(404).json({message : "user not found in database" , success:false , error:true})
        }
    
        return res.status(200).json({data : dbUser ,message : 'user fetched successfully' , success:true , error:false})

    } catch (error) {
        return res.status(500).json({
            message : error.message,
            success : false,
            error : true,
        })
    }

}

const fetchAllUser = async (req , res) => {
    try {
        const users = await User.find();
        return res.status(200).json({data : users , message:"User fetched successfully" , success:true , error:false});

    } catch (error) {
        console.log("Error" , error);
        return res.status(500).json({message:"Internal server error" , success:false , error:true});
    }

}

const updateUserRole = async (req , res) => {
    const {userId , name , email , role} = req.body?.user;

    try {

        const payload = {
            ...(email && {email}),
            ...(name && {fullName : name}),
            ...(role && {role}),
        }

        if(!userId){
            return res.status(403).json({message:"userId is required" , success:false , error:true});
        }

        if(!Object.values(Roles).includes(role)){
            return res.status(403).json({message:"Provided role is not exist in the system" , success:false , error:true});
        }


        const updatedUser = await User.findByIdAndUpdate(userId , payload , {new : true});
        return res.status(200).json({data : updatedUser , message:"User udated successfully" , success:true , error:false});

    } catch (error) {
        console.log("Error" , error);
        return res.status(500).json({message:"Internal server error" , success:false , error:true});
    }

}

module.exports = {
    signup,
    login,
    userDetail,
    fetchAllUser,
    updateUserRole
}