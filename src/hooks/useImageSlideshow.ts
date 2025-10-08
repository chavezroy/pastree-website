'use client';

import { useState, useEffect } from 'react';

export function useImageSlideshow(images: string[], interval: number = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // Half of transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return {
    currentImage: images[currentIndex],
    isTransitioning,
    currentIndex
  };
}
