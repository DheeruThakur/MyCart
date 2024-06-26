
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productName : {
        type : String,
        required : true
    },
    brandName : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    productImage : [
        {
            type : String,
            required : true
        }
    ],
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    sellingPrice : {
        type : Number,
        required : true
    }
},
{
    timestamps : true
})

module.exports = mongoose.model("product" , productSchema);