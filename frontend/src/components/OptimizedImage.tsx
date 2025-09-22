import { useState, useEffect } from 'react';
import { Image as ImageIcon, Download, Eye, Zap } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  width?: number;
  height?: number;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  quality = 90,
  width,
  height
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Simulation d'optimisation d'image 4K
    const optimizedSrc = `${src}?w=${width || 1920}&h=${height || 1080}&q=${quality}&f=webp`;
    setImageSrc(optimizedSrc);
  }, [src, width, height, quality]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    // Fallback vers l'image originale
    setImageSrc(src);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg">
          <div className="flex items-center justify-center h-full">
            <ImageIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Image non disponible</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        style={{
          filter: isLoaded ? 'none' : 'blur(10px)',
        }}
      />

      {/* Quality indicator */}
      {quality >= 90 && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <Zap className="h-3 w-3 mr-1" />
          4K
        </div>
      )}
    </div>
  );
}

// Composant pour les images hero avec effets avancés
interface HeroImageProps {
  src: string;
  alt: string;
  overlay?: boolean;
  parallax?: boolean;
}

export function HeroImage({ src, alt, overlay = true, parallax = true }: HeroImageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax]);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
      <div
        className="relative h-96 lg:h-[600px] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
        style={{
          transform: parallax ? `translateY(${scrollY * 0.5}px)` : 'none',
        }}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          className="w-full h-full"
          width={1920}
          height={1080}
          quality={95}
          priority
        />

        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant pour les galeries d'images avec lightbox
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  columns?: number;
}

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <>
      <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6`}>
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setSelectedImage(index)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              className="w-full h-64"
              width={800}
              height={600}
              quality={85}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {image.title && (
                <h3 className="font-bold text-lg mb-1">{image.title}</h3>
              )}
              {image.description && (
                <p className="text-sm opacity-90">{image.description}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                <Eye className="h-4 w-4" />
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <OptimizedImage
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-full object-contain"
              width={1920}
              height={1080}
              quality={95}
            />

            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              ✕
            </button>

            {/* Navigation */}
            <div className="absolute inset-y-0 left-4 flex items-center">
              <button
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)}
                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                ‹
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button
                onClick={() => setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)}
                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                ›
              </button>
            </div>

            {/* Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-1">{images[selectedImage].title}</h3>
              <p className="text-sm opacity-90">{images[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
