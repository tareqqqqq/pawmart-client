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
   
    
    fetch(`https://paw-mart-server-self.vercel.app/listing/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.result);

       
        
        
       
        setLoading(false);
      });
  }, [id,user,loading]);


 

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
  <span className="loading loading-spinner loading-xl"></span>
</div>

    );
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

        fetch('https://paw-mart-server-self.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => {
              console.log(data.result);
                if (data.result.insertedId) {
                    modalRef.current.close();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your are ordered successfully .",
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
          <title>{product.name}</title>


       <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
  <div className="card bg-white shadow-lg border border-gray-100 rounded-3xl overflow-hidden">
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10">
      
      {/* 🐶 Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
        />
      </div>

      {/* 📝 Info Section */}
      <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          {product.name}
        </h1>

        {/* 🏷️ Category + Price */}
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="badge badge-lg bg-pink-100 text-pink-600 font-semibold px-4 py-2 border-0">
            {product.category}
          </div>
          <div className="badge badge-lg bg-green-100 text-green-700 font-semibold px-4 py-2 border-0">
            ৳ {product.price}
          </div>
        </div>

        {/* 📍 Location + Email */}
        <div className="text-gray-600 space-y-1 mt-3 text-sm md:text-base">
          <p><strong>📍 Location:</strong> {product.location}</p>
          <p><strong>📧 Owner:</strong> {product.email}</p>
        </div>

        {/*  Description */}
        <p className="text-gray-700 leading-relaxed text-base md:text-lg border-t pt-4 mt-4">
          {product.description}
        </p>

        {/*  Order Button */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleBidModalOpen}
            className="btn text-white rounded-full px-8 bg-linear-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 border-none shadow-md"
          >
             Order Now
          </button>
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
                                        placeholder='Your Address'
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