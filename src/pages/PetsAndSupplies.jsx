import React, { useState } from 'react';

import Card from '../components/Card'
import { useLoaderData } from 'react-router';

const PetsAndSupplies = () => {
      const data = useLoaderData()
       const [products, setProducts] = useState(data)
  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const search_text = e.target.search.value
   
    setLoading(true)

    fetch(`http://localhost:3000/search?search=${search_text}`)
    .then(res=> res.json())
    .then(data=> {
      console.log(data)
      setProducts(data)
      setLoading(false)
    })
  }


    return (
        <div>
            <div className='container m-auto'>
                <title>Cats & Supplies</title>
             <div className="text-center text-xl font-bold mt-10">Latest Model</div>

            <div>  <form onSubmit={handleSearch} className=" mt-5 mb-10 flex gap-2 justify-center">
       <label className="input rounded-full ">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input name="search" type="search"  placeholder="Search" />
      </label>
      <button className="btn btn-secondary  rounded-full">{loading ? "Searching...." : "Search"}</button>
     </form> </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
{products.map(product => <Card  key={product._id} product={product}/>)}
</div>
        </div>
            
        </div>
    );
};

export default PetsAndSupplies;