import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Import your video and images
import Video1 from '../assets/burger.mp4';
import Image3 from '../assets/car.png';
import Video2 from '../assets/yelle.mp4';



const Carousel = () => {
  // Define the items: video first, then images
  const items = [
    { id: 1, type: 'video', src: Video1 },
    { id: 2, type: 'image', src: Image3 },
    { id: 3, type: 'video', src: Video2 },
    
  ];

  return (
    <div className="mt-[-20px]"> 
      <ResponsiveCarousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        dynamicHeight={false}
        interval={8000} 
        className="mb-8 z-0"
      >
        {items.map(item => (
          <div key={item.id}>
            {item.type === 'video' ? (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full object-cover"
                style={{
                  height: 'auto',
                  maxHeight: '500px',
                }}
              />
            ) : (
              <img
                src={item.src}
                alt={`Slide ${item.id}`}
                className="w-full object-cover"
                style={{
                  height: 'auto',
                  maxHeight: '500px',
                }}
              />
            )}
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};

export default Carousel;
