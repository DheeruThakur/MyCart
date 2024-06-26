const Product = require("../models/product.model")

const uploadProduct = async (req , res) => {
    const {productName, brandName, category, productImage, description, price, sellingPrice} = req.body;
    try {
        
        const missingField = [productName, brandName, category, productImage, description, price, sellingPrice].some(el => el === undefined);

        if(missingField){
            return res.status(400).json({message : "All fields are required" , success : false , error : true});
        }

        const product = new Product({
            productName, 
            brandName, 
            category, 
            productImage, 
            description, 
            price, 
            sellingPrice,
        })

        const savedProduct = await product.save();

        return res.status(201).json({data : savedProduct, message : "Product uploaded successfully" , success : true , error : false})

    } catch (error) {
        console.log(error)
        res.status(500).json({message : `${error.message}` , success : false , error : true})
    }
}

const fetchAllProducts = async (req , res) => {
    try {
        const allProducts = await Product.find();
        return res.status(200).json({data : allProducts, message : "Product fetched successfully" , success : true , error : false})

    } catch (error) {
        console.log(error)
        res.status(500).json({message : `${error.message}` , success : false , error : true})
    }
}


module.exports = {
    uploadProduct,
    fetchAllProducts
}