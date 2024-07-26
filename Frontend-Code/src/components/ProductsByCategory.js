import React, { useEffect, useState } from 'react'
import useAddToCart from '../utils/addToCart';
import { Link, useParams } from 'react-router-dom';
import fetchCategoryWiseProduct from '../utils/fetchCategoryWiseProduct';
import { formatNumberToCurrency } from '../utils/formatNumberToCurrency';
import { endpoints } from '../utils/constants';

const ProductsByCategory = ({searchCategories , sortedBy}) => {
    // console.log("sortedBy" , sortedBy)
    const [products , setProducts] = useState([]);
    const [isLoading , setIsLoading] = useState(false);

    const shimmerData = new Array(10).fill(null);
    const {addToCart} = useAddToCart();

    const filterAndSortProducts = async() => {
        console.log("sortedBy" , sortedBy)
        setIsLoading(true);
        const fetchURL = endpoints?.filterCategoryWiseProducts?.path
        try {
            const result = await fetch(fetchURL , {
                method : endpoints.filterCategoryWiseProducts.method,
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    searchCategories
                })
            })
            const filteredData = await result.json();
            if(filteredData.success){
                const sortedProducts = sortProducts(filteredData.data, sortedBy);
                setProducts(sortedProducts);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error.message)
        }
    }

    const sortProducts = (items , sortedBy) => {
        return items.sort((a,b) => 
            sortedBy === 'asc' ? a.sellingPrice-b.sellingPrice : b.sellingPrice-a.sellingPrice
        )
    }
    
    useEffect(() => {
        filterAndSortProducts()
    } , [searchCategories , sortedBy])

    // useEffect(() => {
    //     setProducts(prev => sortProducts([...prev] , sortedBy))
    // } , [sortedBy , searchCategories])

    const handleAddToCart = (e , productId) => {
        addToCart(e , productId);
    }

    return (
        <div className="h-full w-full">
            <p className='mb-3 text-slate-500'>{`Search Results : ${products.length}`}</p>
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
                                <Link to={`/product-details/${product._id}`} key={product._id} className="bg-gray-300 h-[310px] w-[230px] mb-6">
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
                                        <button className='text-green-500 border-2 border-solid border-green-500 rounded-md px-2 py-[1px] my-2 w-full' onClick={(e) => handleAddToCart(e , product._id)}>Add to Cart</button>
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

export default ProductsByCategory
