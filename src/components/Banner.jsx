import React from "react";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1558944351-c7e711d1f52d?auto=format&fit=crop&w=1200&q=80",
    title: "Find Your Furry Friend Today!",
    subtitle: "Discover loving pets waiting for their forever homes.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1601758123927-1965df6f5b85?auto=format&fit=crop&w=1200&q=80",
    title: "Adopt, Don’t Shop — Give a Pet a Home.",
    subtitle:
      "Be the reason a pet wags its tail again. Choose adoption today!",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1583511655681-25c0baad9c03?auto=format&fit=crop&w=1200&q=80",
    title: "Because Every Pet Deserves Love and Care.",
    subtitle:
      "Your compassion can change a life — adopt and spread happiness.",
  },
];

const Banner = () => {
  return (
    <div className="carousel w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          id={`slide${slide.id}`}
          className="carousel-item relative w-full"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover brightness-75"
          />

          {/* Overlay text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/40 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              {slide.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-xl max-w-2xl"
            >
              {slide.subtitle}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 btn btn-primary rounded-full px-8 text-lg shadow-lg"
            >
              Explore Now
            </motion.button>
          </div>

          {/* Navigation buttons */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${index === 0 ? slides.length : index}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${index + 2 > slides.length ? 1 : index + 2}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
