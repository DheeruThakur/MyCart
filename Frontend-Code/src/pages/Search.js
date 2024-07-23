import React, { useEffect, useState } from 'react'
import SearchProducts from '../components/SearchProducts';
import { useLocation } from 'react-router-dom';

const Search = () => {

    const location = useLocation();
    const [searchBy , setSearchBy] = useState("");

    useEffect(() => {
        const query = location.search.split('=')[1];
        setSearchBy(query);
    },[location])


  return (
    <div className='min-h-[687px]'>
        <SearchProducts searchBy={searchBy}/>
    </div>
  )
}

export default Search
