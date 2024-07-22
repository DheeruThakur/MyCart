const AddToCart = require("../models/addToCart.model");
const productModel = require("../models/product.model");

const addToCart = async (req , res) => {
    try {
        const userId = req.userId;
        const {productId} = req.body;
    
        if(!productId){
            return res.status(400).json({message : "productId is required" , success : false , error : true});
        }

        const isProductAvailable = await AddToCart.findOne({productId});

        if(isProductAvailable) {
            return res.status(400).json({message : "Product already present in the cart" , success : false , error : true})
        }

        const cartItem = new AddToCart({
            userId,
            productId,
        })
    
        const data = await cartItem.save();

        return res.status(201).json({data , message : "product added successfully" , success : true , error : false})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : `${error.message}` , success : false , error : true})
    }
}

const fetchCartItems = async (req , res) => {
    try {
        const userId = req.userId;
        const data = await AddToCart.find({userId}).populate('productId');

        return res.status(200).json({data , message : "product fetched successfully" , success : true , error : false})

    } catch (error) {
        console.log(error)
        res.status(500).json({message : `${error.message}` , success : false , error : true})
    }
}

module.exports = {
    addToCart,
    fetchCartItems
}