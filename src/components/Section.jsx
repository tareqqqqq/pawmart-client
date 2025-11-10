import React from 'react';

const heroes = [
  {
    name: "Sadia Rahman",
    role: "Animal Rescuer",
    image:
      "https://i.ibb.co/vPgrnQb/woman-pet1.jpg",
    quote:
      "Adopting from PawMart changed my life — I rescued Milo, and he rescued me back with love!",
  },
  {
    name: "Tariq Hasan",
    role: "Volunteer Caregiver",
    image:
      "https://i.ibb.co/1msbXhJ/man-pet1.jpg",
    quote:
      "Every animal deserves love and care. PawMart connects hearts with furry friends perfectly.",
  },
  {
    name: "Nabila Chowdhury",
    role: "Pet Parent",
    image:
      "https://i.ibb.co/7vWpHt8/woman-pet2.jpg",
    quote:
      "I never thought adopting a rescue cat could bring so much joy into our home!",
  },
];

const Section = () => {
    return (
        <div>
           <section className="bg-white py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🦸 Meet Our <span className="text-pink-600">Pet Heroes</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {heroes.map((hero, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-pink-50 to-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition duration-300"
          >
            <img
              src={hero.image}
              alt={hero.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-pink-200"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {hero.name}
            </h3>
            <p className="text-pink-600 text-sm mb-3">{hero.role}</p>
            <p className="text-gray-600 italic text-sm">“{hero.quote}”</p>
          </div>
        ))}
      </div>
    </section> 
        </div>
    );
};

export default Section;