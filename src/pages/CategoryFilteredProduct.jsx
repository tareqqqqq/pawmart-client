import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const CategoryFilteredProduct = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/listing-category?category=${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
     <title>{categoryName}</title>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Showing Products for: {categoryName}
      </h2>
      {products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-2xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-lg w-full h-48 object-cover mb-3"
              />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>
              <p className="font-bold mt-1">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilteredProduct;
