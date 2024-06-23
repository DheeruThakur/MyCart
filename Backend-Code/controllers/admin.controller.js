const {Roles} = require("../utility/constants.utility")
const User = require("../models/user.model");

const fetchAllUser = async (req , res) => {
    const userRole = req?.userRole;
    if(userRole != Roles.adminRole){
        return res.status(403).json({message:"user must be Admin" , success:false , error:true});
    }

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
    const userRole = req.userRole;
    if(userRole != Roles.adminRole){
        return res.status(403).json({message:"user must be Admin" , success:false , error:true});
    }

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
    fetchAllUser,
    updateUserRole
}