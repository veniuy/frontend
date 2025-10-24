import React, { useMemo } from 'react';
import { asset } from '../utils/assets';

const ImageScrollSection = () => {
  const images = useMemo(() => ([
    asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
    asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp'),

    asset('/src/assets/cotton_bird_images/album_le_petit_quotidien.webp'),
    asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
    asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
  ]), []);

  return (
    <div className="relative overflow-hidden py-12 md:py-24 bg-gradient-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
        {/* Texto */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl lg:text-5xl font-display font-medium text-foreground mb-4">
            Crea momentos inolvidables
          </h2>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto md:mx-0">
            Diseños únicos y personalizados para cada ocasión especial.
          </p>
        </div>

        {/* Grid 2x3 que crece a 3x4 en desktop */}
        <div className="relative">
          <div
            className="
              grid
              grid-cols-2 md:grid-cols-3
              grid-rows-3 md:grid-rows-4
              gap-4
              auto-rows-fr
            "
          >
            {images.slice(0, 12).map((src, i) => (
              <div
                key={i}
                className="
                  rounded-lg overflow-hidden shadow-md
                  aspect-[4/5]  /* mantiene proporción y evita “angostas” */
                "
              >
                <img
                  src={src}
                  alt={`Imagen ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageScrollSection;


