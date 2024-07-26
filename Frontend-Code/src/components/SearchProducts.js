import React, { useEffect, useState } from 'react'
import { endpoints } from '../utils/constants';
import { Link } from 'react-router-dom';
import { formatNumberToCurrency } from '../utils/formatNumberToCurrency';

const SearchProducts = ({searchBy}) => {
    const [isLoading , setIsLoading] = useState(false);
    const [data , setData] = useState([]);

    const fetchProductsBySearchInput = async () => {
        setIsLoading(true);
        let fetchURL;
        if(!searchBy){
            fetchURL = `${endpoints?.fetchProductsBySearchName?.path}`;
        }
        else{
            fetchURL = `${endpoints?.fetchProductsBySearchName?.path}?q=${searchBy}`;
        }
        
        const result = await fetch(fetchURL , {
            method : endpoints?.fetchProductsBySearchName?.method,
            headers : {
                'Content-Type' : "application/json"
            },
        })
        const apiData = await result.json();
        if(apiData.success){
            setData(apiData.data);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProductsBySearchInput();
    } , [searchBy])

  return (
    <div className="h-full w-[1300px] mx-20">
        {
            ( isLoading ) 
            ? 
            <div className='h-full flex justify-center mt-10'>
                <p className='text-xl tracking-wider text-slate-500'>Loading...</p>
            </div> 
            :
            <>
            {
                (!isLoading && data.length == 0 )
                ?
                <div className='h-full flex justify-center mt-10'>
                    <p className='text-xl tracking-wider text-slate-500'>No Data Found</p>
                </div> 
                :
                <>
                    <p className='mt-8 mb-3 text-2xl font-semibold'>{`search result : ${data.length}`}</p>
                    <div className='h-full w-full flex justify-evenly flex-wrap gap-x-20 gap-y-4'>
                        {data?.map(product => {
                            return (
                                <Link to={`/product-details/${product._id}`} key={product._id} className="bg-gray-300 h-[310px] w-[230px] mb-4">
                                    <div className="h-[160px] w-[230px] flex justify-center items-center p-2">
                                        <img className='object-scale-down h-full mix-blend-multiply' src={product.productImage[0]} />
                                    </div>
                                    <div className="bg-white h-[150px] w-[230px] p-4">
                                        <h1 className='text-xl font-medium my-[2px] text-ellipsis line-clamp-1 capitalize'>{product.productName}</h1>
                                        <p className='text-md text-slate-500'>{product.category}</p>
                                        <div className='flex gap-4 my-[2px]'>
                                            <p className='text-sm text-red-500'>{formatNumberToCurrency(product.sellingPrice)}</p>
                                            <p className='text-sm text-slate-400 line-through'>{formatNumberToCurrency(product.price)}</p>
                                        </div>
                                        <button className='text-green-500 border-2 border-solid border-green-500 rounded-md px-2 py-[1px] my-2 w-full' onClick={(e) => handleAddToCart(e, product._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </>
            }
            </> 
        }  
    </div>
  )
}

export default SearchProducts