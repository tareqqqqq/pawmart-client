import React, { useState } from 'react';
import { use } from "react";

import toast from "react-hot-toast";
import { AuthContext } from '../Auth/AuthContext';



const AddListing = () => {

      const { user } = use(AuthContext)
       const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
   const [date, setDate] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      name: e.target.name.value,
      category,
       price: category === "Pets" ? 0 : parseFloat(price),
      location:e.target.location.value,
      description: e.target.description.value,
     
       image: e.target.image.value,
      email: user?.email,
        date,
    }

    fetch('http://localhost:3000/post-product', {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data=> {
      toast.success("Successfully added!")
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })

    
   

  }

    return (
         <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
         <title>Add Listing</title>
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium"> Pet Name</label>
            <input
              type="text"
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>
           {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              
              name="category"
              value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (e.target.value === "Pets") setPrice(0);
            }}
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              
              <option value="Plants">Pets</option>
              <option value="Foods">Foods</option>
              <option value="Home & Living">Accessories</option>
              <option value="Characters">Care Products</option>
             
              <option value="Other">Other</option>
            </select>
          </div>

          {/* price */}
          <div>
            <label className="label font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={category === "Pets" ? 0 : price}
            onChange={(e) => setPrice(e.target.value)}
            readOnly={category === "Pets"}
              required 
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter price"
            />
          </div>
          {/* location */}
          <div>
            <label className="label font-medium">Location</label>
            <input
              type="text"
              name="location"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="location"
            />
          </div>

         

          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="3"
             className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Img URL */}
          <div>
            <label className="label font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {/* Date */}
        <div>
          <label className="block font-medium">Date</label>
          <input
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input input-bordered w-full"
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
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
          >
            Add Model
          </button>
        </form>
      </div>
    </div>
    );
};

export default AddListing;