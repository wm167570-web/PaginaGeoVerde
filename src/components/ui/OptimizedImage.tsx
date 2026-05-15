import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  width, 
  height, 
  priority = false, 
  loading = 'lazy' 
}: OptimizedImageProps) {
  // Optimize Unsplash URLs if possible
  const optimizedSrc = src.includes('images.unsplash.com') 
    ? `${src.split('?')[0]}?auto=format&fit=crop&q=75&w=${width || 800}&fm=webp`
    : src;

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
}
