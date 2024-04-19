import React, { useState, useEffect } from 'react';

const ImageCarouselWithText = ({ imageNames, texts, imageHeight }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === imageNames.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [imageNames.length]);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageNames.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imageNames.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="image-carousel">
      
      <div style={{ position: 'relative' }}>
        <img
          src={process.env.PUBLIC_URL + imageNames[currentImageIndex]}
          alt="carousel"
          style={{ width: '100%', height: imageHeight }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            fontSize: '24px',
          }}
        >
          {texts[currentImageIndex]}
        </div>
      </div>
      <button onClick={prevImage}>{"<"}</button>
      <button onClick={nextImage}>{">"}</button>
    </div>
  );
};

export default ImageCarouselWithText;
