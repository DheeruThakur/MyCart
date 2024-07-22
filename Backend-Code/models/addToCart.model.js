const mongoose = require("mongoose");
const {Schema} = mongoose

const addToCart = new Schema({
    userId : {
        type : String,
        required : true
    },
    productId : {
        type : Schema.Types.ObjectId,
        ref : "product",
        required : true
    },
    quantity : {
        type : Number,
        default : 1,
    },
},
{
    timestamps : true
})

module.exports = mongoose.model("addTocart" , addToCart)