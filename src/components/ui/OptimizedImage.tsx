import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  style?: React.CSSProperties;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  width, 
  height, 
  priority = false, 
  loading = 'lazy',
  onError,
  style
}: OptimizedImageProps) {
  // Optimize Unsplash URLs if possible
  const optimizedSrc = src.includes('images.unsplash.com') 
    ? `${src.split('?')[0]}?auto=format&fit=crop&q=75&w=${width || 800}&fm=webp`
    : src;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.classList.add('loaded');
  };

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
      style={{ backgroundColor: '#e8f5e9', ...style }}
      onLoad={handleImageLoad}
      onError={(e) => {
        e.currentTarget.src = 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg';
        if (onError) onError(e);
      }}
    />
  );
}
