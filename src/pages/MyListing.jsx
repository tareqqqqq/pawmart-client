
import { use, useEffect, useState } from "react";

import Card from '../components/Card';
import { AuthContext } from "../Auth/AuthContext";


const MyListing = () => {

    const {user} = use(AuthContext)
    const [models, setModels] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        if (!user?.email) return;

        fetch(`http://localhost:3000/my-products?email=${user.email}`)
        .then(res=> res.json())
        .then(data=> {
            
            setModels(data)
            setLoading(false)
        })

    }, [user,loading])


    if(loading) {
        return <div> Please wait ... Loading...</div>
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
            {models?.map(product => <Card  key={product._id} product={product}/>)}
            </div>
        </div>
    );
};

export default MyListing;