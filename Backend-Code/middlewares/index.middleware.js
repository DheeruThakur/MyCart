const jwt = require("jsonwebtoken")

const userAuth = async (req , res , next) => {
    try {
        const headerToken = req.headers['authorization'];
        
        const token = headerToken && headerToken.split(' ')[1];
        
        if(!token){
            return res.status(401).json({message:"user not logged-in" , success:false , error:true});
        }
    
        const userdata = await jwt.verify(token , process.env.JWT_SECRET);
        console.log(userdata);
    
        if(!userdata){
            return res.status(401).json({message:"Invalid token !!" , success:false , error:true});
        }
    
        req.userId = userdata.userId;
        req.userRole = userdata.role;
        next();

    } catch (error) {
        console.log(("Error" , error))
        next(error);
    }
}

module.exports = {userAuth}