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
      scrollLeft.innerHTML += scrollLeft.innerHTML; // Duplicate content for seamless loop
      scrollLeft.style.animationDuration = `${scrollLeft.children.length * 2}s`;
    }
    if (scrollRight) {
      scrollRight.innerHTML += scrollRight.innerHTML; // Duplicate content for seamless loop
      scrollRight.style.animationDuration = `${scrollRight.children.length * 2}s`;
    }
  }, []);

  return (
    <div className="header76_content-right mw-overlay-gradient relative overflow-hidden py-12">
      <div className="header76_images-layout mw-overlay-gradient relative flex justify-center items-center h-[500px]">
        <div className="absolute inset-0 flex justify-center items-center">
          {/* Contenedor de texto central */}
          <div className="z-10 text-center p-8 bg-white bg-opacity-70 rounded-lg shadow-lg max-w-md">
            <h2 className="text-4xl font-display font-medium text-foreground mb-4">
              Crea momentos inolvidables
            </h2>
            <p className="text-xl text-muted-foreground">
              Diseños únicos y personalizados para cada ocasión especial.
            </p>
          </div>
        </div>

        <div className="header76_image-list-container flex space-x-4">
          <div ref={scrollRefLeft} className="header76_image-list-left flex flex-col space-y-4 animate-scroll-up">
            {imagesLeft.map((src, index) => (
              <div key={`left-${index}`} className="header76_image-wrapper w-64 h-auto rounded-lg overflow-hidden shadow-md">
                <img src={src} alt={`Imagen ${index + 1}`} className="header76_image w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <div ref={scrollRefRight} className="header76_image-list-right flex flex-col space-y-4 animate-scroll-down">
            {imagesRight.map((src, index) => (
              <div key={`right-${index}`} className="header76_image-wrapper w-64 h-auto rounded-lg overflow-hidden shadow-md">
                <img src={src} alt={`Imagen ${index + 1}`} className="header76_image w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageScrollSection;



