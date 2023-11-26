import React, { useState } from "react";
import chevron_left from "../assets/static/chevron_left.svg";
import chevron_right from "../assets/static/chevron_right.svg";

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  // show previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? total - 1 : prevIndex - 1
    );
  };

  // show next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === total - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <div className="carousel-content">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        <div className="pagination">
          {currentIndex + 1}/{total}
        </div>
      </div>
      <button className="prev" onClick={prevSlide}>
        <img src={chevron_left} alt="show previous image icon" />
      </button>
      <button className="next" onClick={nextSlide}>
        <img src={chevron_right} alt="show next image icon" />
      </button>
    </div>
  );
}
