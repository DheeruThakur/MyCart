import React, { useEffect, useState } from 'react'
import productCategory from '../utils/productCategory'
import ProductsByCategory from '../components/ProductsByCategory'
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryWiseProducts = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const urlSearch = new URLSearchParams(location.search);
  const urlCategorySearchArray = urlSearch.getAll('category');

  const [searchCategories , setSearchCategories] = useState(urlCategorySearchArray);
  const [sortBy , setSortBy] = useState('');

  useEffect(() => {
    const urlQueryArray = searchCategories.map(el => `category=${el}`);
    navigate(`/product-category?${urlQueryArray.join('&')}` , {replace:true}); //replace : true to handle url history

  } , [searchCategories])

  const handleCheckBoxChange = (e) => {
    const {value , checked} = e.target;
    if(checked && (!searchCategories.includes(value))) {
      setSearchCategories((prev) => [...prev , value])
      
    }
    else if(!checked) {
      setSearchCategories(prev => prev.filter(cat => cat !== value));
    }
  }

  const handleChangeSortby = (e) => {
    const {value} = e.target;
    setSortBy(value);
  }

  return (
    <div className='flex min-h-[calc(100vh-110px)] bg-slate-100'>

     { /** filter section */}
      <div className='fixed h-[620px] w-[250px] ml-14 my-8 mr-6 bg-white overflow-y-auto'>

        <div className='h-12 px-2 pt-3 border-b mx-2'>
          <p className='tracking-wider text-slate-500'>SORT BY</p>
        </div>

        <div className='h-16 px-2 py-2 mx-2'>
          <div className='h-6 w-full'>
            <input type='radio' value='asc' checked={sortBy === 'asc'} onChange={handleChangeSortby}/>
            <span className='mx-2 text-sm '>Price - Low to High</span>
          </div>
          <div className=''>
            <input type='radio' value='dsc' checked={sortBy === 'dsc'} onChange={handleChangeSortby}/>
            <span className='mx-2 text-sm'>Price - High to Low</span>
          </div>
        </div>

        <div className='h-8 px-2 border-b mx-2'>
          <p className='tracking-wider text-slate-500'>CATEGORY</p>
        </div>

        <form>
          {
            productCategory?.map((category , idx) => {
              return (
                <div key={category.id} className='mx-4 my-2'>
                  <input 
                  type='checkbox' 
                  id={category.id} 
                  value={category.label} 
                  checked={searchCategories.includes(category.label)}
                  onChange={handleCheckBoxChange}
                  />
                  <span className='mx-2'>{category.label}</span>
                </div>
              )
            })
          }
        </form>

      </div>

      { /** products section */}
      <div className='min-h-[calc(100vh-110px)] my-8 w-full ml-[330px] overflow-y-scroll h-[calc(100vh-16px)]'>
        <ProductsByCategory searchCategories={searchCategories} sortedBy={sortBy}/>
      </div>
      
    </div>
  )
}

export default CategoryWiseProducts
