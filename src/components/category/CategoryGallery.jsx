// CategoryGallery.jsx - Galería con lightbox para páginas de categoría
import React, { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { onImgError } from '../../utils/assets'

const CategoryGallery = ({ 
  images = [], 
  title = "Galería",
  className = '' 
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleImages, setVisibleImages] = useState(8)
  const [loading, setLoading] = useState(false)

  // Abrir lightbox
  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  // Cerrar lightbox
  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  // Navegación en lightbox
  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Cargar más imágenes
  const loadMore = () => {
    setLoading(true)
    setTimeout(() => {
      setVisibleImages(prev => Math.min(prev + 8, images.length))
      setLoading(false)
    }, 500) // Simular carga
  }

  // Manejo de teclado para lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, nextImage, prevImage])

  // Prevenir scroll del body cuando lightbox está abierto
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen])

  if (!images || images.length === 0) return null

  return (
    <>
      <section className={`py-16 bg-background ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-medium text-foreground mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra colección de diseños únicos y encuentra la inspiración perfecta para tu evento especial.
            </p>
          </div>

          {/* Grid de imágenes - Masonry style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.slice(0, visibleImages).map((image, index) => (
              <div
                key={image.id || index}
                className="group relative overflow-hidden rounded-lg cursor-pointer shadow-warm hover:shadow-warm-lg transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                    onError={(e) => onImgError(e, image.alt)}
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Overlay con zoom icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Título de la imagen */}
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white text-sm font-medium">
                        {image.title}
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botón Ver más */}
          {visibleImages < images.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Cargando...' : `Ver más (${images.length - visibleImages} restantes)`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          {/* Botón cerrar */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar galería"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navegación anterior */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Navegación siguiente */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Imagen principal */}
          <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt}
              className="max-w-full max-h-full object-contain"
              onError={(e) => onImgError(e, images[currentIndex]?.alt)}
            />
          </div>

          {/* Información de la imagen */}
          {images[currentIndex]?.title && (
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                <h3 className="text-white text-lg font-medium">
                  {images[currentIndex].title}
                </h3>
                <p className="text-white/80 text-sm">
                  {currentIndex + 1} de {images.length}
                </p>
              </div>
            </div>
          )}

          {/* Indicadores de posición */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default CategoryGallery
