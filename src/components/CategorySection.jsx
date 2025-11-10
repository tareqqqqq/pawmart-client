import React from "react";
import { useNavigate } from "react-router";

const categories = [
  { name: "Pets", emoji: "🐶", description: "Adopt your best friend" },
  { name: "Pet Food", emoji: "🍖", description: "Healthy food for pets" },
  { name: "Accessories", emoji: "🎽", description: "Toys & accessories" },
  { name: "Pet Care Products", emoji: "🧴", description: "Care & hygiene items" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // navigate to category filtered route
    navigate(`/category-filtered-product/${categoryName}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            <div className="text-5xl mb-3">{cat.emoji}</div>
            <h3 className="text-xl font-semibold">{cat.name}</h3>
            <p className="text-gray-500">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
