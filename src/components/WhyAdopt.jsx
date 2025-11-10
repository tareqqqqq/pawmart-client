// WhyAdopt.jsx
import React from "react";
import { Heart, PawPrint, ShieldCheck, Users } from "lucide-react";

const WhyAdopt = () => {
  const reasons = [
    {
      icon: <Heart className="w-10 h-10 text-pink-500" />,
      title: "Save a Life",
      text: "Each adoption gives a loving pet a second chance to live a happy life.",
    },
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      title: "Build a Bond",
      text: "Rescued pets form deeper emotional connections with their owners.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
      title: "Ethical Choice",
      text: "Choosing adoption helps reduce unethical breeding and animal cruelty.",
    },
    {
      icon: <PawPrint className="w-10 h-10 text-yellow-500" />,
      title: "Support a Cause",
      text: "Every adoption supports local shelters and animal welfare efforts.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-pink-50 to-blue-50 py-16 px-6 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        🐶 Why Adopt from <span className="text-pink-600">PawMart?</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Adopting a pet is not just giving them a home—it's saving a life and
        changing your own. Here's why thousands choose PawMart.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {reasons.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyAdopt;
