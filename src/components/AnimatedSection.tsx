'use client';

import { ReactNode } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'scale-in' | 'scale-in-up' | 'rotate-in';
  delay?: number;
  className?: string;
  threshold?: number;
}

export default function AnimatedSection({ 
  children, 
  animation = 'fade-in-up', 
  delay = 0,
  className = '',
  threshold = 0.1
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const getAnimationClasses = () => {
    const baseClasses = `transition-all duration-800 ease-out`;
    
    if (isVisible) {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`;
    }
    
    switch (animation) {
      case 'fade-in':
        return `${baseClasses} opacity-0`;
      case 'fade-in-up':
        return `${baseClasses} opacity-0 translate-y-8`;
      case 'fade-in-down':
        return `${baseClasses} opacity-0 -translate-y-8`;
      case 'slide-in-left':
        return `${baseClasses} opacity-0 -translate-x-8`;
      case 'slide-in-right':
        return `${baseClasses} opacity-0 translate-x-8`;
      case 'scale-in':
        return `${baseClasses} opacity-0 scale-95`;
      case 'scale-in-up':
        return `${baseClasses} opacity-0 scale-95 translate-y-8`;
      case 'rotate-in':
        return `${baseClasses} opacity-0 -rotate-3 scale-95`;
      default:
        return `${baseClasses} opacity-0 translate-y-8`;
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${getAnimationClasses()} ${className}`}
      {...(delay > 0 && { style: { transitionDelay: `${delay}ms` } })}
    >
      {children}
    </div>
  );
}
