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

    fetch('https://paw-mart-server-self.vercel.app/post-product', {
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
        <div className="container m-auto flex flex-col md:flex-row items-center justify-center gap-10 min-h-screen p-6 bg-base-100">
  {/* Left Side Image Section */}
  <div className="hidden md:flex w-1/2 justify-center">
    <img
      src="https://cdn.shopify.com/s/files/1/0803/1613/7793/files/petopia_1920x1080_aabc06ec-8f25-471e-93ca-2567e75e1a8d.webp?v=1723122537"
      alt="PawMart Illustration"
      className="w-3/4  object-contain drop-shadow-lg"
    />
  </div>

  {/* Right Side Form Section */}
  <div className="card border border-gray-200 bg-white w-full md:w-1/2 shadow-2xl rounded-2xl">
    <title>Add Listing</title>
    <div className="card-body p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
        Add New Listing
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pet Name */}
        <div>
          <label className="label font-semibold text-lg text-gray-700">
            Pet Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="input input-bordered w-full rounded-full focus:outline-pink-400"
            placeholder="Enter pet name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label font-semibold text-lg text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (e.target.value === "Pets") setPrice(0);
            }}
            required
            className="select select-bordered w-full rounded-full focus:outline-pink-400"
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Pets">Pets</option>
            <option value="Pet Food">Foods</option>
            <option value="Accessories">Accessories</option>
            <option value="Pet Care Products">Care Products</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="label font-semibold text-lg text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={category === "Pets" ? 0 : price}
            onChange={(e) => setPrice(e.target.value)}
            readOnly={category === "Pets"}
            required
            className="input input-bordered w-full rounded-full focus:outline-pink-400"
            placeholder="Enter price"
          />
        </div>

        {/* Location */}
        <div>
          <label className="label font-semibold text-lg text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            required
            className="input input-bordered w-full rounded-full focus:outline-pink-400"
            placeholder="Enter location"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label font-semibold text-lg text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            required
            rows="4"
            className="textarea textarea-bordered w-full rounded-2xl focus:outline-pink-400"
            placeholder="Enter description"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="label font-semibold text-lg text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            required
            className="input input-bordered w-full rounded-full focus:outline-pink-400"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Date */}
        <div>
          <label className="label font-semibold text-lg text-gray-700">
            Date
          </label>
          <input
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input input-bordered w-full rounded-full focus:outline-pink-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label font-semibold text-lg text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 rounded-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full text-white mt-6 rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
        >
          Add Listing
        </button>
      </form>
    </div>
  </div>
</div>

    );
};

export default AddListing;