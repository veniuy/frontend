import React, { useState } from 'react';

const Gallery = ({ event, colors, fontSecondary, styles = {} }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const defaultGallery = [
    "/assets/categoria_boda_grid.webp",
    "/assets/categoria_cumpleanos.webp", 
    "/assets/categoria_invitaciones_digitales.webp",
    "/assets/categoria_productos_fotos.webp",
    "/assets/elegant-floral.jpg",
    "/assets/portada1.webp",
  ];
  
  const galleryImages = (event.images?.gallery && event.images.gallery.length > 0 
    ? event.images.gallery 
    : defaultGallery).slice(0, 9); // Aumentamos a 9 para mejor grid

  const openLightbox = (img, index) => {
    setSelectedImage({ src: img, index });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    const newIndex = direction === 'next' 
      ? (selectedImage.index + 1) % galleryImages.length
      : (selectedImage.index - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage({ src: galleryImages[newIndex], index: newIndex });
  };

  return (
    <>
      <section className="py-16 text-center" style={{ backgroundColor: colors.paper }} dir="ltr">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-2xl font-medium mb-12 tracking-wide"
            style={{ color: colors.ink, fontFamily: fontSecondary }}
          >
            GALERÍA
          </h2>
          
          {/* Nuevo formato de galería - Grid moderno */}
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => openLightbox(img, i)}
              >
                <img
                  src={img}
                  alt={`Galería ${i + 1}`}
                  className="gallery-image"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23e0e0e0' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3EImagen %23" + (i + 1) + "%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="mt-2 text-sm font-medium">Ver imagen</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="lightbox-overlay"
          onClick={closeLightbox}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close"
              onClick={closeLightbox}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <button 
              className="lightbox-nav lightbox-prev"
              onClick={() => navigateImage('prev')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <img 
              src={selectedImage.src} 
              alt="Imagen ampliada"
              className="lightbox-image"
            />
            
            <button 
              className="lightbox-nav lightbox-next"
              onClick={() => navigateImage('next')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="lightbox-counter">
              {selectedImage.index + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Estilos CSS mejorados */}
      <style jsx>{`
        /* Grid moderno de galería */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          padding: 2rem 0;
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 1;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .gallery-item:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.1);
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay-content {
          text-align: center;
          color: white;
        }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 0.5rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        .lightbox-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 0.75rem;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 1rem;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-prev {
          left: -60px;
        }

        .lightbox-next {
          right: -60px;
        }

        .lightbox-counter {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          background: rgba(0, 0, 0, 0.5);
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          backdrop-filter: blur(10px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            padding: 1rem 0;
          }

          .lightbox-nav {
            display: none;
          }

          .lightbox-close {
            top: 20px;
            right: 20px;
          }

          .lightbox-counter {
            bottom: 20px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Utilidades */
        .w-6 { width: 1.5rem; }
        .h-6 { height: 1.5rem; }
        .w-8 { width: 2rem; }
        .h-8 { height: 2rem; }
        .mt-2 { margin-top: 0.5rem; }
        .text-sm { font-size: 0.875rem; }
        .font-medium { font-weight: 500; }
      `}</style>
    </>
  );
};

export default Gallery;
