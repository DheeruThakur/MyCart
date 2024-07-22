import { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../utils/fetchCategoryWiseProduct';
import {formatNumberToCurrency} from '../utils/formatNumberToCurrency'
import addToCart from '../utils/addToCart';
import { Link } from 'react-router-dom';


const RecomendProductCard = ({category , heading , currentProduct}) => {

    const [products , setProducts] = useState([]);
    const [isLoading , setIsLoading] = useState(false);

    const shimmerData = new Array(10).fill(null);

    const fetchProducts = async () => {
        setIsLoading(true);
        const result = await fetchCategoryWiseProduct(category);
        const filteredData = result?.data?.filter(prod => prod._id !== currentProduct._id);
        setIsLoading(false);
        setProducts(filteredData);
    }

    useEffect(() => {
        fetchProducts()
        
    } , [])
    
    return (
        <div className="h-full w-[1400px] mx-10">
            <p className='mt-8 mb-3 text-2xl font-semibold'>{heading}</p>
            <div className='h-full w-full grid grid-cols-4 justify-between'>
                {
                    isLoading ? (
                        shimmerData.map((product , idx) => {
                            return(
                                <div key={idx} className="bg-gray-300 h-[310px] w-[230px]">
                                    <div className="h-[160px] w-[230px] flex justify-center items-center animate-pulse"></div>
                                    <div className="bg-white h-full w-[230px] p-4">
                                        <h1 className='text-xl font-medium my-[2px] text-ellipsis line-clamp-1 capitalize bg-slate-200 p-3 animate-pulse rounded-full'></h1>
                                        <p className='text-md text-slate-500 bg-slate-200 p-2 my-2 animate-pulse rounded-full'></p>
                                        <div className='flex gap-4 my-[10px]'>
                                            <p className='h-4 w-full text-sm text-red-500 bg-slate-200 p-1 animate-pulse rounded-full'></p>
                                            <p className='w-full text-sm text-slate-400 line-through bg-slate-200 p-1 animate-pulse rounded-full'></p>
                                        </div>
                                        <button className='h-6 w-full px-2 py-[1px] my-2 bg-slate-200 animate-pulse rounded-full'></button>
                                    </div>
                                </div>
                            )
                        })   
                    )
                    :
                    (
                        products.map(product => {
                            return(
                                <Link to={"product-details/"+product._id} key={product._id} className="bg-gray-300 h-[310px] w-[230px] mb-6">
                                    <div className="h-[160px] w-[230px] flex justify-center items-center p-2">
                                        <img className='object-scale-down h-full mix-blend-multiply' src={product.productImage[0]}/>
                                    </div>
                                    <div className="bg-white h-[150px] w-[230px] p-4">
                                        <h1 className='text-xl font-medium my-[2px] text-ellipsis line-clamp-1 capitalize'>{product.productName}</h1>
                                        <p className='text-md text-slate-500'>{product.category}</p>
                                        <div className='flex gap-4 my-[2px]'>
                                            <p className='text-sm text-red-500'>{formatNumberToCurrency(product.sellingPrice)}</p>
                                            <p className='text-sm text-slate-400 line-through'>{formatNumberToCurrency(product.price)}</p>
                                        </div>
                                        <button className='text-green-500 border-2 border-solid border-green-500 rounded-md px-2 py-[1px] my-2 w-full' onClick={(e) => addToCart(e)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                    
                }
            </div>  
        </div>
        
    )
}

export default RecomendProductCard