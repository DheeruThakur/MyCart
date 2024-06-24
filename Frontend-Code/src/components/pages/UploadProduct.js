import { IoClose } from "react-icons/io5";
import { IoCloudUpload } from "react-icons/io5";
import productCategory from "../../utils/productCategory"

const UploadProduct = ({setShowUploadProductModal}) => {
    return (
        <div className="fixed h-full w-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-400 bg-opacity-[0.4]">
            <div className="bg-white h-[600px] w-[600px] rounded shadow-md">
                <div className="flex justify-between m-4">
                    <div className="font-bold text-lg">Upload Product</div>
                    <div className="hover:bg-red-400 hover:rounded-full"> 
                        <IoClose className='h-7 w-7 hover:text-white' onClick={() => setShowUploadProductModal(false)}/>
                    </div>
                </div>
                <div className="h-[500px] overflow-y-auto">
                    <div className="flex flex-col mx-8">
                        <label htmlFor="product-name" className="my-2">Product Name :</label>
                        <input className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="text" id="product-name" placeholder="enter product name"></input>
                    </div>
                    <div className="flex flex-col mx-8 mt-4">
                        <label htmlFor="brand-name" className="my-2">Brand Name :</label>
                        <input className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="text" id="brand-name" placeholder="enter brand name"></input>
                    </div>
                    <div className="flex flex-col mx-8 mt-4">
                        <label htmlFor="category" className="my-2">Category :</label>
                        <select className="border border-gray-300 text-sm rounded-lg px-4 pr-10 py-[8px] outline-none bg-gray-100" value="" >
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
                        <div id="product-image" className="h-[150px] flex flex-col justify-center items-center border border-gray-300 rounded-lg px-4 py-[8px] outline-none bg-gray-100">
                            <IoCloudUpload className="h-10 w-10 mb-1"/>
                            <p className="text-sm my-1">Upload Product image</p>
                            <div className="my-1 ml-28">
                                <input type="file" />
                            </div> 
                        </div>
                        <div id="product-image" className="h-[100px] mt-[2px] py-[8px] ">
                            <div className="h-28 w-28 bg-gray-100 rounded-lg">
                                <img src="" alt="product_image"/>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col mx-8 mt-8">
                        <label htmlFor="description" className="my-2">Description :</label>
                        <textarea id="description" className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" rows="4" cols="50"></textarea>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col mx-8 mt-4">
                            <label htmlFor="price" className="my-2">Price :</label>
                            <input className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="number" id="price" placeholder="enter price"></input>
                        </div>
                        <div className="flex flex-col mx-8 mt-4">
                            <label htmlFor="selling-price" className="my-2">Selling Price :</label>
                            <input className="border border-gray-300 text-sm rounded-lg px-4 py-[8px] outline-none bg-gray-100" type="number" id="selling-price" placeholder="enter selling price"></input>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="text-green-500 border-2 border-solid border-green-500 rounded-md p-[6]">Upload Product</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadProduct