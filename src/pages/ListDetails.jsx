import React, { use,useEffect, useRef, useState } from 'react';

import { AuthContext } from '../Auth/AuthContext';
import Swal from 'sweetalert2';
import { useParams } from "react-router";

const ListDetails = () => {
  const {user}=use(AuthContext)

      const { id } = useParams()
    const [product, setProduct] = useState([])
    const modalRef = useRef(null);
    
    const [loading,setLoading]=useState(true)
    const [date, setDate] = useState("");
    const [quantity, setQuantity] = useState(1);

    

    


  


  useEffect(() => {
   
    
    fetch(`http://localhost:3000/listing/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.result);

       
        
        
       
        setLoading(false);
      });
  }, [id,user,loading]);


 

  
  if (loading) {
    return <div> Loading...</div>;
  }


     const handleBidModalOpen = () => {
        modalRef.current.showModal();
    }

    const handleBidSubmit = (e) => {
        e.preventDefault();
       const form = e.target;

  const newOrder = {
    productId: form.productId.value,
    productName: product?.name,
    buyerName: user?.displayName,
    email: user?.email,
    quantity: product?.category === "Pets" ? 1 : parseInt(form.quantity.value),
    price: parseFloat(product?.price || 0),
    address: form.address.value,
    phone: form.phone.value,
    date,
    additionalNotes: form.description.value,
  };

//         

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newOrder)
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
                    // newOrder._id = data.insertedId;
                    // const newOrders= [...product, newOrder];
                    // newOrders.sort((a, b) => b.price - a.price);
                    // setProduct(newOrders);
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
                                   {/* Name Field */}
          <div>
            <label className="label font-medium"> Bayer Name</label>
            <input
              type="text"
              name="name"
             readOnly
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
               value={user?.displayName || ""}
            />
          </div>
                                   {/* Name Field */}
          <div>
            <label className="label font-medium"> Bayer Name</label>
            <input
              type="text"
              name="name"
             
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              readOnly
        value={product?.name || ""}
            />
          </div>
                                    
                                    
                                   {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={user?.email || ""}
            readOnly
           className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
          />
        </div>
        {/* Product/Listing ID */}
    <div>
      <label className="label font-medium">Product / Listing ID</label>
      <input
        type="text"
        name="productId"
        readOnly
        value={product?._id || ""}
        className="input w-full rounded-full bg-gray-100 focus:border-0 focus:outline-gray-200"/>
       </div>  

       {/* Quantity */}
    <div>
      <label className="label font-medium">Quantity</label>
      <input
        type="number"
        name="quantity"
        value={product?.category === "Pets" ? 1 : quantity}
        onChange={(e) => setQuantity(e.target.value)}
        readOnly={product?.category === "Pets"}
        className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
      />
    </div>
                                    
                                    {/* amount */}
                                    <label className="label">Price</label>
                                    <input type="text" name='price' readOnly
                                     value={product?.price || 0} className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                        placeholder='Your Price'
                                    />
                                    {/* amount */}
                                    <label className="label">Phone</label>
                                    <input type="text" name='phone' className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                        placeholder='Your Phone'
                                    />
                                   
                                    
                                    {/* address */}
                                    <label className="label">Address</label>
                                    <input type="text" name='address' className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                                        placeholder='Your Price'
                                    />
                                    {/* Date */}
        <div>
          <label className="block font-medium">Date</label>
          <input
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
          />
        </div>
                                    {/* Description Textarea */}
          <div>
            <label className="label font-medium">Add Notes</label>
            <textarea
              name="description"
              required
              rows="3"
             className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>
                                    <button type="submit" className="btn btn-neutral mt-4">Order</button>
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