'use client';

import { useState, useEffect, useRef } from 'react';

export function useImageSlideshow(images: string[], interval: number = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousIndex, setPreviousIndex] = useState(0);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentIdx = currentIndexRef.current;
      const nextIndex = (currentIdx + 1) % images.length;
      
      // Define transition groups and their timings
      const isKeyboardGroup = currentIdx === 0; // hero-keyboard-1.svg
      const isFormGroup = currentIdx === 2; // hero-form.svg
      
      // Quick transitions within groups (500ms), longer pause between groups (1000ms)
      const transitionDelay = (isKeyboardGroup || isFormGroup) ? 2800 : 3500;
      
      // Start transition: show both images overlapping
      setIsTransitioning(true);
      setPreviousIndex(currentIdx);
      
      // After transition delay, switch to next image and end transition
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        currentIndexRef.current = nextIndex;
        setIsTransitioning(false);
      }, transitionDelay);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return {
    currentImage: images[currentIndex],
    previousImage: images[previousIndex],
    isTransitioning,
    currentIndex
  };
}
