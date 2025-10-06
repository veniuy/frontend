import React from 'react';

const Gallery = ({ event, colors, fontSecondary, styles = {} }) => {
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
    : defaultGallery).slice(0, 6);

  return (
    <section className="py-16" style={{ backgroundColor: colors.paper }} dir="ltr">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-2xl font-medium mb-12 tracking-wide text-center"
          style={{ color: colors.ink, fontFamily: fontSecondary }}
        >
          GALERÍA
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              style={{ 
                paddingBottom: i === 0 || i === 5 ? "133%" : "100%",
                gridRow: i === 0 || i === 5 ? "span 2" : "span 1"
              }}
            >
              <img
                src={img}
                alt={`Galería ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23e0e0e0' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='20'%3EImagen %23" + (i + 1) + "%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS adicionales */}
      <style jsx>{`
        .grid {
          display: grid;
        }
        .grid-cols-2 {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .md\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .gap-4 {
          gap: 1rem;
        }
        .relative {
          position: relative;
        }
        .overflow-hidden {
          overflow: hidden;
        }
        .rounded-lg {
          border-radius: 0.5rem;
        }
        .shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .transition-transform {
          transition-property: transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        .absolute {
          position: absolute;
        }
        .inset-0 {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
