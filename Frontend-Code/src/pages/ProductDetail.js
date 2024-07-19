import { useState , useEffect } from "react";
import {endpoints} from "../utils/constants"
import { toast } from "react-toastify";
import {useParams} from 'react-router-dom'
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import {formatNumberToCurrency} from "../utils/formatNumberToCurrency"


const ProductDetail = () => {
    const dummyImages = new Array(5).fill(null);

    const [data , setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : "",
    })

    const [loading , setLoading] = useState(false)
    const [activeImage , setActiveImage] = useState("");
    // const [showZoomCanvas , setShowZoomCanvas] = useState(false);

    const {productId} = useParams();

    const fetchProductDetails = async () => {
        const fetchProductDetailsURL = `${endpoints.fetchProductDetails.path}${productId}`;
        try {
            setLoading(true);
            const result = await fetch(fetchProductDetailsURL , {
                method : endpoints.fetchProductDetails.method,
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
    
            const productData = await result.json();
            // console.log(productData)
            if(productData.success){
                setData(productData.data);
                setActiveImage(productData.data.productImage[0])
                setLoading(false);
            }
            else {
                toast.error(productData.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        fetchProductDetails();

    } , [])


    return loading ? 
            (
                <div className="h-screen mx-8 mt-5 flex gap-6">
                    <div className="flex gap-4 h-full">
                        <div className="flex flex-col gap-2 h-full">
                            {
                                dummyImages.map(el => {
                                    return (
                                        <div key={Math.random().toString()} className="h-24 w-24 bg-slate-200 animate-pulse transition-all"></div> 
                                    )
                                })
                            }
                        </div>
                        <div className="h-[450px] w-[450px] bg-slate-200 animate-pulse transition-all"></div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <p className="bg-slate-200 rounded-full p-3 w-20 animate-pulse transition-all"></p>
                        <p className="p-4 w-60 bg-slate-200 rounded-full animate-pulse transition-all"></p>
                        <p className="p-3 w-36 bg-slate-200 rounded-full animate-pulse transition-all"></p>
                        <div className="flex p-2">
                            < IoIosStar className="text-slate-200 animate-pulse transition-all"/>
                            < IoIosStar className="text-slate-200 animate-pulse transition-all"/>
                            < IoIosStar className="text-slate-200 animate-pulse transition-all"/>
                            < IoIosStar className="text-slate-200 animate-pulse transition-all"/>
                            < IoIosStarHalf className="text-slate-200 animate-pulse transition-all"/>
                        </div>

                        <div className="flex gap-2 my-2">
                            <p className="p-4 w-24 bg-slate-200 rounded-full animate-pulse transition-all"></p>
                            <p className="p-4 w-24 bg-slate-200 rounded-full animate-pulse transition-all"></p>
                        </div>

                        <div className="flex gap-2">
                            <button className="bg-slate-200 rounded-md p-5 w-28 animate-pulse transition-all"></button>
                            <button className=" bg-slate-200 rounded-md p-5 w-28 animate-pulse transition-all "></button>
                        </div>

                        <div className="h-40 w-60 rounded-lg bg-slate-200 mt-4 animate-pulse transition-all"></div>  
                    </div>
                </div>
            )
            :
            (
                <div className="h-screen mx-8 mt-5 flex gap-6">

                    {/** product images */}
                    <div className="flex gap-4">
                        {/** small images */}
                        <div className="flex flex-col gap-2">
                            {
                                data.productImage.map(el => {
                                    return (
                                        <div key={Math.random().toString()} className="h-24 w-24 bg-slate-200 flex justify-center items-center">
                                            <img src={el} alt="product-image" className="h-full object-scale-down mix-blend-multiply" onMouseEnter={() => setActiveImage(el)}/>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/** big image */}
                        <div className="h-[450px] w-[450px] bg-slate-200 flex justify-center items-center">
                            <img src={activeImage} alt="product-image" className="h-full object-scale-down mix-blend-multiply" />
                        </div>

                    </div>

                    {/** product details */}
                    <div className="flex flex-col gap-2 mt-4">
                        <p className="bg-green-200 rounded-full text-md text-center text-green-500 mr-10">{data.brandName}</p>
                        <p className="text-3xl font-medium">{data.productName}</p>
                        <p className="text-sm text-slate-400">{data.category}</p>

                        <div className="flex">
                            < IoIosStar className="text-yellow-400"/>
                            < IoIosStar className="text-yellow-400"/>
                            < IoIosStar className="text-yellow-400"/>
                            < IoIosStar className="text-yellow-400"/>
                            < IoIosStarHalf className="text-yellow-400"/>
                        </div>
                        <div className="flex gap-2 my-2">
                            <p className="text-green-500 text-2xl">{formatNumberToCurrency(data.sellingPrice)}</p>
                            <p className="text-slate-400 line-through text-2xl">{formatNumberToCurrency(data.price)}</p>
                        </div>

                        <div className="flex gap-2">
                            <button className="border-2 border-green-500 rounded-md px-4 py-1 text-green-500 hover:text-white hover:bg-green-500">Buy Now</button>
                            <button className="border-2 border-green-500 rounded-md px-4 py-1 bg-green-500 text-white hover:text-green-500 hover:bg-white">Add To Cart</button>
                        </div>

                        <div className="my-4">
                            <p className="text-md">Description :</p>
                            <p className="text-sm font-light mt-1">{data.description}</p>
                        </div>
                    
                        
                    </div>

                </div>
            )
        
}

export default ProductDetail