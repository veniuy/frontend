import React, { useEffect, useRef } from 'react';
import { asset } from '../utils/assets';

const ImageScrollSection = () => {
  const scrollRefLeft = useRef(null);
  const scrollRefRight = useRef(null);

  const imagesLeft = [
    asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
    asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp'),
  ];

  const imagesRight = [
    asset('/src/assets/cotton_bird_images/album_le_petit_quotidien.webp'),
    asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
    asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
  ];

  useEffect(() => {
    const scrollLeft = scrollRefLeft.current;
    const scrollRight = scrollRefRight.current;

    if (scrollLeft) {
      // Duplicar el contenido para un bucle continuo sin interrupciones
      scrollLeft.innerHTML += scrollLeft.innerHTML;
      // La duración de la animación se define en CSS, aquí solo nos aseguramos de que el contenido esté duplicado.
    }
    if (scrollRight) {
      // Duplicar el contenido para un bucle continuo sin interrupciones
      scrollRight.innerHTML += scrollRight.innerHTML;
      // La duración de la animación se define en CSS, aquí solo nos aseguramos de que el contenido esté duplicado.
    }
  }, []);

  return (
    <div className="image-scroll-section-container relative overflow-hidden py-12 md:py-24 bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Sección de texto a la izquierda en PC, arriba en móvil */}
        <div className="text-content md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl lg:text-5xl font-display font-medium text-foreground mb-4">
            Crea momentos inolvidables
          </h2>
          <p className="text-xl text-muted-foreground max-w-lg md:max-w-none mx-auto md:mx-0">
            Diseños únicos y personalizados para cada ocasión especial.
          </p>
        </div>

        {/* Contenedor de las listas de imágenes a la derecha en PC, abajo en móvil */}
        <div className="image-lists-wrapper md:w-1/2 flex justify-center md:justify-end items-center relative h-[400px] md:h-[500px] overflow-hidden">
          <div className="image-scroll-list-group flex space-x-4 h-full">
            <div ref={scrollRefLeft} className="image-scroll-list image-scroll-list-left flex flex-col space-y-4 animate-scroll-up">
              {imagesLeft.map((src, index) => (
                <div key={`left-${index}`} className="image-wrapper w-64 h-auto rounded-lg overflow-hidden shadow-md">
                  <img src={src} alt={`Imagen ${index + 1}`} className="image-item w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <div ref={scrollRefRight} className="image-scroll-list image-scroll-list-right flex flex-col space-y-4 animate-scroll-down">
              {imagesRight.map((src, index) => (
                <div key={`right-${index}`} className="image-wrapper w-64 h-auto rounded-lg overflow-hidden shadow-md">
                  <img src={src} alt={`Imagen ${index + 1}`} className="image-item w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageScrollSection;

