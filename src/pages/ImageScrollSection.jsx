// src/pages/ImageScrollSection.jsx
import React, { useMemo } from 'react';
import { asset } from '../utils/assets';

const ImageScrollSection = () => {
  const imagesLeft = useMemo(() => ([
    asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
    asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp'),
  ]), []);

  const imagesRight = useMemo(() => ([
    asset('/src/assets/cotton_bird_images/album_le_petit_quotidien.webp'),
    asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
    asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
    asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
  ]), []);

  const leftLoop  = useMemo(() => [...imagesLeft,  ...imagesLeft],  [imagesLeft]);
  const rightLoop = useMemo(() => [...imagesRight, ...imagesRight], [imagesRight]);

  return (
    <div className="relative overflow-hidden bg-gradient-warm">
      <style>{`
        :root {
          --gap: 1rem;
        }

        .card { width: 12rem; } /* imágenes más grandes */
        @media (min-width: 768px){ .card { width: 14rem; } }
        @media (min-width: 1024px){ .card { width: 16rem; } }

        .rail {
          height: 450px; /* más alto, para mostrar más imagen */
        }
        @media (min-width: 768px){ .rail { height: 450px; } }
        @media (min-width: 1024px){ .rail { height: 500px; } }

        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }

        .animate-up   { animation: scroll-up 80s linear infinite; }
        .animate-down { animation: scroll-down 80s linear infinite; }
        .pause-on-hover:hover .animate-up,
        .pause-on-hover:hover .animate-down { animation-play-state: paused; }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Texto */}
        <div className="text-center md:text-left md:w-1/2 px-4 md:px-8">
          <h2 className="text-4xl lg:text-5xl font-display font-medium text-foreground mb-4">
            style={{ paddingTop: '10px' }}
            Crea momentos inolvidables
          </h2>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto md:mx-0">
            Diseños únicos y personalizados para cada ocasión especial.
          </p>
        </div>

        {/* Carriles animados */}
        <div className="relative flex justify-center md:justify-end gap-6 md:w-1/2">
          <div className="rail overflow-hidden pause-on-hover">
            <div className="flex flex-col space-y-6 animate-up">
              {leftLoop.map((src, i) => (
                <div key={`L-${i}`} className="card rounded-xl overflow-hidden shadow-lg aspect-[4/5]">
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

          <div className="rail overflow-hidden pause-on-hover">
            <div className="flex flex-col space-y-6 animate-down">
              {rightLoop.map((src, i) => (
                <div key={`R-${i}`} className="card rounded-xl overflow-hidden shadow-lg aspect-[4/5]">
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
    </div>
  );
};

export default ImageScrollSection;


