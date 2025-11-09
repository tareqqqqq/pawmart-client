import React, {  useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
// import { AuthContext } from '../Auth/AuthContext';
import Swal from 'sweetalert2';

const ListDetails = () => {

      const { _id: productId } = useLoaderData();
    const [product, setProduct] = useState([])
    const modalRef = useRef(null);
    
    const [loading,setLoading]=useState(true)

    console.log(product)

    


  


  useEffect(() => {
   
    
    fetch(`http://localhost:3000/products/orders/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);

        console.log(data);
        
        
       
        setLoading(false);
      });
  }, [productId,loading]);

 

  
  if (loading) {
    return <div> Loading...</div>;
  }


     const handleBidModalOpen = () => {
        modalRef.current.showModal();
    }

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;

       

        const newProduct = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            // buyer_image: user?.photoURL,
            bid_price: bid,
            status: 'pending'
        }

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    modalRef.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your bid has been placed.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // add the new bid to the state
                    newProduct._id = data.insertedId;
                    const newProducts = [...product, newProduct];
                    newProduct.sort((a, b) => b.bid_price - a.bid_price);
                    setProduct(newProducts);
                }
            })

    }

    return (
        <div>


        <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={product.image}
              alt=""
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {product.name}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {product.category}
              </div>

              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                price: {product.price}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {product.description}
            </p>

            <div className="flex gap-3 mt-6">
               <button
                        onClick={handleBidModalOpen}
                        className="btn btn-primary">Order</button>
             
              
            </div>
          </div>
        </div>
      </div>
    </div>


    {/* modal  */}
   
  <div>
                   

                    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Give the best offer!</h3>
                            <p className="py-4">Offer something seller can not resist</p>
                            <form onSubmit={handleBidSubmit}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    
                                    {/* email */}
                                    <label className="label">Email</label>
                                    
                                    {/* bid amount */}
                                    <label className="label">Bid</label>
                                    <input type="text" name='bid' className="input"
                                        placeholder='Your Bid'
                                    />
                                    <button className="btn btn-neutral mt-4">Order</button>
                                </fieldset>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>

    </div>
    );
};

export default ListDetails;