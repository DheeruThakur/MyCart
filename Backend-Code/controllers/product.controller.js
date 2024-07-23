const productModel = require("../models/product.model");
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

const updateProduct = async (req , res) => {
    const {productName, brandName, category, productImage, description, price, sellingPrice , _id} = req.body;
    try {
    
        const payload = {
            productName, 
            brandName, 
            category, 
            productImage, 
            description, 
            price, 
            sellingPrice,
        }

        const updatedProduct = await Product.findByIdAndUpdate(_id , payload , {new : true});

        return res.status(200).json({data : updatedProduct, message : "Product updated successfully" , success : true , error : false})

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

const fetchProductByCategory = async (req , res) => {
    try {
        const allCategories = await Product.distinct("category");
        const productsByCategory = [];

        for (const cat of allCategories) {
            const product = await Product.findOne({ category: cat });

            if(product){
                productsByCategory.push(product);
            }  
        }

        return res.status(200).json({data : productsByCategory, message : "Products fetched successfully" , success : true , error : false})

    } catch (error) {
        console.log(error)
        res.status(500).json({message : error.message , success : false , error : true})
    }
}

const fetchCategoryWiseProducts = async (req , res) => {
    try {
        
        const category = req.body?.category;
        const result = await Product.find({category});
        return res.status(200).json({data : result, message : "Category wise products fetched successfully" , success : true , error : false})

    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message , success : false , error : true})
    }
}

const fetchProductDetails = async (req , res) => {
    const productId = req.params?.productId;
    try {

        const result = await productModel.findById(productId);
        return res.status(200).json({data : result , message : "product's details fetched successfully" , success : true , error : false})

    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message , success : false , error : true})
    }
}

const fetchProductBySearch = async (req , res) => {
    const searchBy = req.query?.q;
    try {
        const regExp = new RegExp(searchBy , 'i');
        const result = await productModel.find({
            $or : [
                {
                    productName : regExp
                },
                {
                    category : regExp
                }
            ]
        });
        return res.status(200).json({data : result , message : "product's fetched successfully" , success : true , error : false})

    } catch (error) {
        console.log(error);
        res.status(500).json({message : error.message , success : false , error : true})
    }
}


module.exports = {
    uploadProduct,
    fetchAllProducts,
    updateProduct,
    fetchProductByCategory,
    fetchCategoryWiseProducts,
    fetchProductDetails,
    fetchProductBySearch
}