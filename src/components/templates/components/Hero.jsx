// src/components/templates/components/Hero.jsx
import React from 'react';
import EditableText from '../../EditableText';

// Icono de flecha hacia abajo
const ChevronDownIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const Hero = ({ event, setEvent, colors, fontPrimary, fontSecondary, isQuinceanera, styles = {} }) => {
  const heroTexture = event.images?.heroTexture || event.images?.hero || "/assets/portada.webp";

  // Leer tamaño guardado: formato esperado "48px"
  const savedTitleSize = event?.fontSizes?.title;
  // función para convertir "48px" a valor usable y fallback responsivo
  const titleFontSize = savedTitleSize && typeof savedTitleSize === 'string' ? savedTitleSize : null;

  // fallback responsivo si no hay tamaño guardado
  const defaultQuinceSize = "clamp(5rem, 10vw, 7rem)";
  const defaultWeddingSize = "clamp(4rem, 8vw, 6rem)";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={heroTexture}
          alt="Textura"
          className="absolute inset-0 w-full h-full object-cover object-center block"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23f0f0f0' width='800' height='600'/%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Logo opcional */}
      {event?.images?.logo && (
        <div className="absolute top-0 left-0 w-[420px] h-[260px] opacity-80 pointer-events-none">
          <img
            src={event.images.logo}
            alt="Logo"
            className="absolute inset-0 w-full h-full object-contain block"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {isQuinceanera ? (
          // Layout para Quinceañera - Solo un nombre
          <>
            <h1
              className="font-light mb-8 tracking-wider hero-title"
              style={{
                color: colors.ink,
                fontSize: titleFontSize || defaultQuinceSize,
                fontFamily: fontSecondary,
                lineHeight: 1.05,
              }}
            >
              <EditableText
                value={event.couple?.bride || event.quinceañera?.name || "Isabella"}
                onChange={(val) => setEvent((p) => ({ 
                  ...p, 
                  couple: { ...p.couple, bride: val },
                  quinceañera: { ...p.quinceañera, name: val }
                }))}
                ariaLabel="Nombre de la quinceañera"
                className="px-1"
                singleLine
                style={{ color: colors.ink, fontFamily: fontSecondary, fontSize: titleFontSize || undefined }}
              />
            </h1>
            <p
              className="font-light mb-10 tracking-wide"
              style={{ 
                color: colors.muted, 
                fontSize: "clamp(4rem, 4vw, 2rem)", 
                fontFamily: fontPrimary 
              }}
            >
              MIS 15 AÑOS
            </p>
          </>
        ) : (
          // Layout para Bodas - Dos nombres
          <>
            <h1
              className="font-light mb-3 tracking-wider hero-title"
              style={{
                color: colors.ink,
                fontSize: titleFontSize || defaultWeddingSize,
                fontFamily: fontSecondary,
                lineHeight: 1.05,
              }}
            >
              <EditableText
                value={event.couple?.bride || "Belén"}
                onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, bride: val } }))}
                ariaLabel="Nombre 1"
                className="px-1"
                singleLine
                style={{ color: colors.ink, fontFamily: fontSecondary, fontSize: titleFontSize || undefined }}
              />
            </h1>

            <div className="flex items-center justify-center my-6">
              <div className="h-px w-16" style={{ backgroundColor: "#CFCFCF" }} />
              <div
                className="mx-4 font-light"
                style={{ 
                  color: colors.primary, 
                  fontSize: "clamp(1.75rem, 5vw, 3rem)", 
                  fontFamily: fontSecondary 
                }}
              >
                &
              </div>
              <div className="h-px w-16" style={{ backgroundColor: "#CFCFCF" }} />
            </div>

            <h1
              className="font-light mb-8 tracking-wider hero-title"
              style={{
                color: colors.ink,
                fontSize: titleFontSize || defaultWeddingSize,
                fontFamily: fontSecondary,
                lineHeight: 1.05,
              }}
            >
              <EditableText
                value={event.couple?.groom || "Amadeo"}
                onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, groom: val } }))}
                ariaLabel="Nombre 2"
                className="px-1"
                singleLine
                style={{ color: colors.ink, fontFamily: fontSecondary, fontSize: titleFontSize || undefined }}
              />
            </h1>

            <p
              className="font-light mb-10 tracking-wide"
              style={{ 
                color: colors.muted, 
                fontSize: "clamp(4rem, 3.5vw, 1.5rem)", 
                fontFamily: fontPrimary 
              }}
            >
              NOS CASAMOS
            </p>
          </>
        )}

        {/* Animación de flecha */}
        <div className="animate-bounce">
          <ChevronDownIcon className="w-8 h-8 mx-auto" style={{ color: colors.primary }} />
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }

        /* Si el usuario guardó un tamaño en px, escalalo en móviles para evitar overflow */
        @media (max-width: 640px) {
          .hero-title {
            /* si titleFontSize existe como "48px", el inline style ya aplica.
               este bloque se asegura de que si está definido en px, lo reduzca en móviles.
               No cambia nada si usa clamp() por defecto. */
            font-size: var(--hero-title-mobile, inherit) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
