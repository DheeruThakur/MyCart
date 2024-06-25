import { IoClose } from "react-icons/io5";
import { IoCloudUpload } from "react-icons/io5";
import productCategory from "../../utils/productCategory"
import { useState } from "react";

import uploadImage from "../../utils/UploadImage";

const UploadProduct = ({setShowUploadProductModal}) => {

    const [data , setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
    })

    const handleChange = (e) => {
        const {name , value} = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];

        const cloudinaryUploadedImage = await uploadImage(file);
        console.log("cloudinaryUploadedImage", cloudinaryUploadedImage);

        setData((prev) => {
            return {
                ...prev,
                productImage : [...prev.productImage , cloudinaryUploadedImage.url]
            }
        })
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <div className="fixed h-full w-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-400 bg-opacity-[0.4]">
            <div className="bg-white h-[600px] w-[600px] rounded shadow-md">
                <div className="flex justify-between m-4">
                    <div className="font-bold text-lg">Upload Product</div>
                    <div className="hover:bg-red-400 hover:rounded-full"> 
                        <IoClose className='h-7 w-7 hover:text-white' onClick={() => setShowUploadProductModal(false)}/>
                    </div>
                </div>
                <form className="h-[500px] overflow-y-auto" onSubmit={handleSubmit}>
                    <div className="flex flex-col mx-8">
                        <label htmlFor="product-name" className="my-2">Product Name :</label>
                        <input name="productName" className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="text" id="product-name" placeholder="enter product name" required onChange={handleChange}></input>
                    </div>
                    <div className="flex flex-col mx-8 mt-4">
                        <label htmlFor="brand-name" className="my-2">Brand Name :</label>
                        <input name="brandName" className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="text" id="brand-name" placeholder="enter brand name" required onChange={handleChange}></input>
                    </div>
                    <div className="flex flex-col mx-8 mt-4">
                        <label htmlFor="category" className="my-2">Category :</label>
                        <select name="category" className="border border-gray-300 text-sm rounded-lg px-4 pr-10 py-[8px] outline-none bg-gray-100" required onChange={handleChange} >
                            <option>Select Category</option>
                            {
                                productCategory.map((category , idx) => {
                                    return (
                                        <option key={category.id}>{category.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="flex flex-col mx-8 mt-4 ">
                        <label htmlFor="product-image" className="my-2">Product Image :</label>
                        <label htmlFor="img-container">
                        <div id="product-image" className="h-[150px] flex flex-col justify-center items-center border border-gray-300 rounded-lg px-4 py-[8px] outline-none bg-gray-100">
                            <IoCloudUpload className="h-12 w-12 mb-1"/>
                            <p className="text-sm my-1">Upload Product image</p>
                            <div className="hidden">
                                <input id="img-container" type="file" onChange={handleUploadImage}/>
                            </div> 
                        </div>
                        </label>
                        {
                            data.productImage.length > 0
                                                        &&
                                                        <div id="product-image" className="h-[140px] mt-[2px] py-[8px]  flex gap-2 overflow-x-auto">
                                                            {
                                                                data.productImage.map((product , idx) => {
                                                                    return (  
                                                                        <img src={product} alt={product} className="rounded-lg"/>                           
                                                                    )
                                                                } )
                                                            }
                                                        </div>
                        }
                        
                    </div>
                    <div className="flex flex-col mx-8 mt-8">
                        <label htmlFor="description" className="my-2">Description :</label>
                        <textarea name="description" id="description" className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100 resize-none" rows="4" required onChange={handleChange}></textarea>
                    </div>
                    <div className="flex flex-col mx-8 mt-4">
                        <label htmlFor="price" className="my-2">Price :</label>
                        <input name="price" className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="number" id="price" placeholder="enter price" required onChange={handleChange}></input>
                    </div>
                    <div className="flex flex-col mx-8 mt-4">
                        <label htmlFor="selling-price" className="my-2">Selling Price :</label>
                        <input name="sellingPrice" className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="number" id="selling-price" placeholder="enter selling price" required onChange={handleChange}></input>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="text-green-500 border-2 border-solid border-green-500 rounded-md p-[4] m-2 hover:scale-110 transition-transform">Upload Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadProduct