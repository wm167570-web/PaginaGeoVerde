import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
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
  decoding = 'async',
  onError,
  style
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Optimize Unsplash URLs if possible
  const optimizedSrc = src.includes('images.unsplash.com') 
    ? `${src.split('?')[0]}?auto=format&fit=crop&q=75&w=${width || 800}&fm=webp`
    : src;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ contentVisibility: 'auto', ...style }}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ${loaded ? 'blur-0' : 'blur-lg'}`}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={decoding}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg';
          setLoaded(true);
          if (onError) onError(e);
        }}
      />
    </div>
  );
}
