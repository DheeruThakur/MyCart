import { IoClose } from "react-icons/io5";
import { IoCloudUpload } from "react-icons/io5";
import productCategory from "../utils/productCategory"
import { useState } from "react";
import UploadProductImage from './ShowProductImage'
import { MdDeleteForever } from "react-icons/md";
import uploadImage from "../utils/uploadImage";
import { endpoints } from "../utils/constants";
import { toast } from "react-toastify";


const EditProductCard = ({productData , setProductData , setShowEditCard , fetchAllProducts}) => {

    const [showImage , setShowImage] = useState(false);
    const [targetImage , setTargetImage] = useState("");

    const handleChange = (e) => {
        const {name , value} = e.target;
        setProductData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];

        const cloudinaryUploadedImage = await uploadImage(file);

        setProductData((prev) => {
            return {
                ...prev,
                productImage : [...prev.productImage , cloudinaryUploadedImage.url]
            }
        })
        
    };

    const handleShowImage = (img) => {
        setShowImage(true);
        setTargetImage(img);
    }

    const handleDeleteImage = (image) => {
        const updatedArray = productData.productImage.filter(img => img !== image);
        setProductData(prev => {
            return {
                ...prev,
                productImage : updatedArray,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadURL = endpoints.updateProduct.path;
        try {

            const res = await fetch(uploadURL , {
                method : endpoints.updateProduct.method,
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token') || ''}`
                },
                body : JSON.stringify(productData)
            })

            const product = await res.json();
            
            if(product.success){
                toast.success(product.message);
                setShowEditCard(false);
                fetchAllProducts();
            }
            else{
                toast.error(product.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }



    return (
        <div className="fixed h-full w-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-400 bg-opacity-[0.4]">
            <div className="bg-white h-[600px] w-[600px] rounded shadow-md">
                <div className="flex justify-between m-4">
                    <div className="font-bold text-lg">Edit Product</div>
                    <div className="hover:bg-red-400 hover:rounded-full" onClick={() => setShowEditCard(false)}> 
                        <IoClose className='h-7 w-7 hover:text-white' />
                    </div>
                </div>
                <form className="h-[500px] overflow-y-auto" onSubmit={handleSubmit}>
                    <div className="flex flex-col mx-8">
                        <label htmlFor="product-name" className="my-2">Product Name :</label>
                        <input name="productName" value={productData.productName} className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="text" id="product-name" placeholder="enter product name" required onChange={handleChange}></input>
                    </div>
                    <div className="flex flex-col mx-8 mt-4">
                        <label htmlFor="brand-name" className="my-2">Brand Name :</label>
                        <input name="brandName" value={productData.brandName} className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="text" id="brand-name" placeholder="enter brand name" required onChange={handleChange}></input>
                    </div>
                    <div className="flex flex-col mx-8 mt-4">
                        <label htmlFor="category" className="my-2">Category :</label>
                        <select name="category" value={productData.category} className="border border-gray-300 text-sm rounded-lg px-4 pr-10 py-[8px] outline-none bg-gray-100 cursor-pointer" required onChange={handleChange} >
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
                        <div id="product-image" className="h-[150px] flex flex-col justify-center items-center border border-gray-300 rounded-lg px-4 py-[8px] outline-none bg-gray-100 cursor-pointer">
                            <IoCloudUpload className="h-12 w-12 mb-1"/>
                            <p className="text-sm my-1">Upload Product image</p>
                            <div className="hidden">
                                <input id="img-container" type="file" onChange={handleUploadImage}/>
                            </div> 
                        </div>
                        </label>
                        {
                            productData.productImage.length > 0
                                                        &&
                                                        <div id="product-image" className=" h-[150px] mt-[10px] flex gap-2 overflow-x-auto">
                                                            {
                                                                productData.productImage.map((product , idx) => {
                                                                    return (  
                                                                        <div key={product} className="relative h-[140px] w-[200px] group flex-shrink-0 cursor-pointer">
                                                                            <MdDeleteForever className="absolute top-1 right-1 h-5 w-5 hidden group-hover:block group-hover:bg-red-500 rounded-full group-hover:text-white" onClick={() => handleDeleteImage(product)}/>
                                                                            <img src={product} alt={product} className="h-full w-full object-cover rounded-lg " onClick={() => handleShowImage(product)}/> 
                                                                        </div>
                                                                                                  
                                                                    )
                                                                } )
                                                            }
                                                        </div>
                        }
                        
                    </div>
                    <div className="flex flex-col mx-8 mt-8">
                        <label htmlFor="description" className="my-2">Description :</label>
                        <textarea name="description" value={productData.description} id="description" className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100 resize-none" rows="4" required onChange={handleChange}></textarea>
                    </div>
                    <div className="flex flex-col mx-8 mt-4">
                        <label htmlFor="price" className="my-2">Price :</label>
                        <input name="price" value={productData.price} className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="number" id="price" placeholder="enter price" required onChange={handleChange}></input>
                    </div>
                    <div className="flex flex-col mx-8 mt-4">
                        <label htmlFor="selling-price" className="my-2">Selling Price :</label>
                        <input name="sellingPrice" value={productData.sellingPrice} className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="number" id="selling-price" placeholder="enter selling price" required onChange={handleChange}></input>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="text-green-500 border-2 border-solid border-green-500 rounded-md p-[4] m-2 hover:scale-110 transition-transform">Update Product</button>
                    </div>
                </form>
            </div>
            {
                showImage && <UploadProductImage image={targetImage} onClose={setShowImage} />
            }
            
        </div>
    )
}

export default EditProductCard;