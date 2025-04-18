// Carousel.js
import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Import your images
import Image1 from '../assets/Carousel-1.png';
import Image2 from '../assets/Carousel-2.png';
import Image3 from '../assets/Carousel-3.png';

const Carousel = () => {
  // Define the items with the imported images
  const items = [
    { id: 1, image: Image1 },
    { id: 2, image: Image2 },
    { id: 3, image: Image3 },
  ];

  return (
    <ResponsiveCarousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      dynamicHeight={false}
      interval={2000} // Adjust this value to change the auto-slide speed
      className="mb-8 z-0"  // Set z-index to a lower value
    >
      {items.map(item => (
        <div key={item.id}>
          <img src={item.image} alt={`Slide ${item.id}`} className="w-full h-[400px] object-cover" />
        </div>
      ))}
    </ResponsiveCarousel>
  );
};

export default Carousel;
