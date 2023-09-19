import React, { useState } from 'react';

const testimonialsData = [
  {
    id: 1,
    photo: 'https://i.imgur.com/photo1.jpg',
    name: 'Rajesh Kumar',
    text: 'I had an amazing experience with the coaching service. It helped me achieve my goals and improve my skills.',
  },
  {
    id: 2,
    photo: 'https://i.imgur.com/photo2.jpg',
    name: 'Anita Sharma',
    text: 'The coaching service provided valuable insights and guidance. It has positively impacted my personal and professional life.',
  },
  // Add more testimonials here
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <div className="flex space-x-2">
          <button className="text-gray-600 hover:text-gray-800" onClick={handlePrev}>
            Prev
          </button>
          <button className="text-gray-600 hover:text-gray-800" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {testimonialsData.slice(activeIndex, activeIndex + 3).map((testimonial) => (
          <div key={testimonial.id} className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex items-center mb-4">
              <img src={testimonial.photo} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                <p className="text-gray-500">Coaching Participant</p>
              </div>
            </div>
            <p>{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
