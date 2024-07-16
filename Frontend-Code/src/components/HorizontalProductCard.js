import { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../utils/fetchCategoryWiseProduct';
import {formatNumberToCurrency} from '../utils/formatNumberToCurrency'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


const HorizontalProductCard = ({category , heading}) => {

    const [products , setProducts] = useState([]);
    const [isLoading , setIsLoading] = useState(false);

    const [scroll , setScroll] = useState(0);

    const scrollElement = useRef();

    const fetchProducts = async () => {
        setIsLoading(true);
        const result = await fetchCategoryWiseProduct(category);
        
        setIsLoading(false);
        setProducts(result.data);
        // console.log(result.data);
    }

    useEffect(() => {
        fetchProducts()
        
    } , [])

    const handleBackwardIcon = () => {
        scrollElement.current.scrollLeft -= 300
        
    }

    const handleForwardIcon = () => {
        scrollElement.current.scrollLeft += 300
    }
    
    return (
        <div className="relative h-[250px] w-[1400px] mb-2 mx-10">
            <p className='mt-10 mb-6 text-2xl font-semibold'>{heading}</p>
            <div className='flex gap-8 overflow-hidden transition-all' ref={scrollElement}>
                {
                    products.map(product => {
                        return(
                            <div key={product._id} className="flex bg-gray-300 h-[150px] w-[300px]">
                                <div className="h-full w-[140px]">
                                    <img className='object-scale-down h-full' src={product.productImage[0]}/>
                                </div>
                                <div className="bg-white h-full w-[160px] p-4">
                                    <h1 className='text-xl font-medium my-[2px] text-ellipsis line-clamp-1'>{product.productName}</h1>
                                    <p className='text-md text-slate-500'>{product.category}</p>
                                    <div className='flex gap-4 my-[2px]'>
                                        <p className='text-sm text-red-500'>{formatNumberToCurrency(product.sellingPrice)}</p>
                                        <p className='text-sm text-slate-400 line-through'>{formatNumberToCurrency(product.price)}</p>
                                    </div>
                                    <button className='text-green-500 border-2 border-solid border-green-500 rounded-md px-2 py-[1px] my-2'>Add to Cart</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='absolute w-full top-[123px]'>
                <div className='w-full flex justify-between'>
                    <div className='h-6 w-6 rounded-full bg-white flex justify-center items-center pr-1'>
                        <IoIosArrowBack className='h-full w-full' onClick={handleBackwardIcon}/>
                    </div>
                    <div className='h-6 w-6 rounded-full bg-white flex justify-center items-center pl-1'>
                        <IoIosArrowForward className='h-full w-full' onClick={handleForwardIcon}/>
                    </div> 
                </div>
            </div>
            
        </div>
        
    )
}

export default HorizontalProductCard