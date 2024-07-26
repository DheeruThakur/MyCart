import React, { useEffect, useState } from 'react'
import { endpoints } from '../utils/constants'
import { toast } from 'react-toastify';
import {Link} from "react-router-dom"

const CategoryList = () => {

    const [categories , setCategories] = useState([]);
    const [loading , setLoading] = useState(false);

    const categoryShimmer = new Array(12).fill(null);

    const fetchProductByCategory = async() => {
        const fetchProductByCategoryURL = endpoints.fetchProductByCategory.path;

       try {
         setLoading(true);
         const res = await fetch(fetchProductByCategoryURL);
 
         const jsonData = await res.json();

         if(jsonData){
            setCategories(jsonData.data);
            setLoading(false);
         }
         else {
            toast.error(jsonData.message);
         }

       } catch (error) {
            console.log(error);
            toast.error(error.message);
       }
    }

    useEffect(() => {
        fetchProductByCategory();
    }, [])

  return (
    <div className='h-36 w-full mb-4'>
        <div className='h-[150px] w-full flex py-20 items-center justify-between px-10' >
            
            {
                loading ? 
                (
                    categoryShimmer.map((el , idx) => {
                        return (
                            <div key={el+idx} className='h-20 w-20 bg-slate-200 rounded-full animate-pulse'></div>
                        )
                    })
                    
                )
                :
                (
                    categories?.map((cat , idx) => {
                        return (
                            <Link to={`/product-category?category=${cat?.category}`} className='flex flex-col cursor-pointer' key={cat+idx}>
                                <div className='h-20 w-20 bg-slate-200 rounded-full overflow-hidden'>
                                    <img src={cat?.productImage[0]} alt={cat.category} className='h-full w-full p-4 object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-center text-sm pt-2 capitalize'>{cat.category}</p>
                            </Link>
                        )
                    })
                )
                
            }
        </div>
    </div>
  )
}

export default CategoryList
