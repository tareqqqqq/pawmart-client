import React from 'react';

import Card from '../components/Card'
import { useLoaderData } from 'react-router';

const PetsAndSupplies = () => {
      const data = useLoaderData()
    return (
        <div>
            <div className='container m-auto'>
             <div className="text-center text-xl font-bold mt-10">Latest Model</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
{data.map(product => <Card  key={product._id} product={product}/>)}
</div>
        </div>
            
        </div>
    );
};

export default PetsAndSupplies;