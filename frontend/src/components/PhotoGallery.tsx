import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Users, Award } from 'lucide-react';

interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: 'team' | 'office' | 'events' | 'achievements';
  location?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
  subtitle?: string;
}

export default function PhotoGallery({ photos, title, subtitle }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedPhoto(photos[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevPhoto = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedPhoto(photos[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'team':
        return <Users className="h-5 w-5" />;
      case 'office':
        return <MapPin className="h-5 w-5" />;
      case 'achievements':
        return <Award className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'team':
        return 'from-cyan-400 to-blue-500';
      case 'office':
        return 'from-purple-400 to-pink-500';
      case 'achievements':
        return 'from-emerald-400 to-teal-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative cursor-pointer transform hover:scale-105 transition-all duration-500"
            onClick={() => openModal(photo, index)}
          >
            {/* Photo Card */}
            <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${getCategoryColor(photo.category)} backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium`}>
                    {getCategoryIcon(photo.category)}
                    <span className="ml-2 capitalize">{photo.category}</span>
                  </div>
                </div>

                {/* Hover Content */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">{photo.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{photo.description}</p>
                    {photo.location && (
                      <div className="flex items-center mt-3 text-cyan-300 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {photo.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="p-4 bg-gradient-to-r from-white/5 to-white/10">
                <h4 className="text-white font-semibold text-lg mb-1">{photo.title}</h4>
                <p className="text-white/70 text-sm">{photo.description}</p>
              </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-black/90 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="relative h-[60vh] overflow-hidden">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info Panel */}
            <div className="p-8 bg-gradient-to-r from-black/80 to-black/60">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${getCategoryColor(selectedPhoto.category)} backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium mr-4`}>
                      {getCategoryIcon(selectedPhoto.category)}
                      <span className="ml-2 capitalize">{selectedPhoto.category}</span>
                    </div>
                    {selectedPhoto.location && (
                      <div className="flex items-center text-cyan-300 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedPhoto.location}
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{selectedPhoto.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">{selectedPhoto.description}</p>
                </div>

                {/* Photo Counter */}
                <div className="text-white/60 text-sm ml-8">
                  {currentIndex + 1} / {photos.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
