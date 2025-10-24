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

  // Duplicamos arrays para bucle perfecto (la animación recorre -50%)
  const leftLoop  = useMemo(() => [...imagesLeft,  ...imagesLeft],  [imagesLeft]);
  const rightLoop = useMemo(() => [...imagesRight, ...imagesRight], [imagesRight]);

  return (
    <div className="relative overflow-hidden py-12 md:py-24 bg-gradient-warm">
      {/* estilos locales para keyframes y medidas */}
      <style>{`
        :root {
          --gap: 1rem;              /* igual a gap-4 */
        }
        /* ancho/alto de tarjeta por breakpoint (ajusta si querés) */
        .card { width: 7rem; }          /* w-28 */
        @media (min-width: 768px){ .card { width: 9rem; } }   /* md:w-36 */
        @media (min-width: 1024px){ .card { width: 10rem; } } /* lg:w-40 */

        /* alto visible del carril: calcula 3 tarjetas + 2 gaps aprox */
        .rail {
          height: 440px;
        }
        @media (min-width: 768px){ .rail { height: 560px; } }
        @media (min-width: 1024px){ .rail { height: 600px; } }

        /* Animaciones (recorren la mitad porque hay duplicado) */
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-up   { animation: scroll-up 20s linear infinite; }
        .animate-down { animation: scroll-down 22s linear infinite; } /* leve desfasaje */
        .pause-on-hover:hover .animate-up,
        .pause-on-hover:hover .animate-down { animation-play-state: paused; }
      `}</style>

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

        {/* Carriles: 2 columnas × 3 visibles; cada columna se desplaza en direcciones opuestas */}
        <div className="relative flex justify-center md:justify-end gap-4">
          {/* Columna izquierda */}
          <div className="rail overflow-hidden pause-on-hover">
            <div className="flex flex-col space-y-4 animate-up">
              {leftLoop.map((src, i) => (
                <div key={`L-${i}`} className="card rounded-lg overflow-hidden shadow-md aspect-[4/5]">
                  <img
                    src={src}
                    alt={`Imagen ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha (opuesta) */}
          <div className="rail overflow-hidden pause-on-hover">
            <div className="flex flex-col space-y-4 animate-down">
              {rightLoop.map((src, i) => (
                <div key={`R-${i}`} className="card rounded-lg overflow-hidden shadow-md aspect-[4/5]">
                  <img
                    src={src}
                    alt={`Imagen ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
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


