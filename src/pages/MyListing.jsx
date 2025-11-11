import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthContext";
// import toast from "react-hot-toast";

const MyListing = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null); // for modal

  // ✅ Fetch user’s own listings
  useEffect(() => {
    if (!user?.email) return; 
    // my-products
    fetch(`http://localhost:3000/listing?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [user?.email]);

  // ✅ DELETE listing
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this listing?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/listing/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setListings(listings.filter((item) => item._id !== id));
             Swal.fire({
            position: "center",
            icon: "success",
            title: "Listing delete successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  // ✅ OPEN modal for update
  const openEditModal = (item) => setEditingItem(item);
  const closeModal = () => setEditingItem(null);

  // ✅ UPDATE listing
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedItem = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
    };

    fetch(`http://localhost:3000/listing/${editingItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => res.json())
      .then((data) => {
         if (data.modifiedCount > 0) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Listing updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        setListings((prev) =>
          prev.map((item) =>
            item._id === editingItem._id ? { ...item, ...updatedItem } : item
          )
        );
        closeModal();
    }
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="p-6">
        <title>My Listing</title>
      <h2 className="text-3xl font-bold text-center mb-6">My Listings</h2>

      {listings.length === 0 ? (
        <p className="text-center text-gray-500">You have no listings yet.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-2xl">
          <table className="table w-full">
            <thead className="bg-pink-500 text-white">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item._id} className="hover">
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.location}</td>
                  <td>
                    <button
                      onClick={() => openEditModal(item)}
                      className="btn btn-sm btn-outline btn-info mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Update Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md relative animate-fadeIn">
            <h3 className="text-xl font-bold mb-4 text-center">
              Update Listing
            </h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="name"
                defaultValue={editingItem.name}
                className="input input-bordered w-full"
                placeholder="Name"
                required
              />
              <input
                name="category"
                defaultValue={editingItem.category}
                className="input input-bordered w-full"
                placeholder="Category"
                required
              />
              <input
                name="price"
                type="number"
                defaultValue={editingItem.price}
                className="input input-bordered w-full"
                placeholder="Price"
                required
              />
              <input
                name="location"
                defaultValue={editingItem.location}
                className="input input-bordered w-full"
                placeholder="Location"
                required
              />
              <input
                name="image"
                defaultValue={editingItem.image}
                className="input input-bordered w-full"
                placeholder="Image URL"
                required
              />
              <textarea
                name="description"
                defaultValue={editingItem.description}
                className="textarea textarea-bordered w-full"
                rows="3"
                placeholder="Description"
              ></textarea>
              <div className="flex justify-between mt-4">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListing;
