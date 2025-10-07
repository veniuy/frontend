import React, { useMemo } from 'react';
import EditableText from '../../EditableText';

// Icono de flecha hacia abajo
const ChevronDownIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// Helper para determinar si un color es claro u oscuro
function isDarkColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  // Fórmula de luminancia (ITU-R BT.709)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.5; // Considerar oscuro si la luminancia es menor a 0.5
}

const Hero = ({ event, setEvent, colors, fontPrimary, fontSecondary, isQuinceanera, styles = {} }) => {
  const heroTexture = event.images?.heroTexture || event.images?.hero || "/assets/portada.webp";

  // Leer tamaño guardado: formato esperado "48px" o "5rem"
  const savedTitleSize = event?.fontSizes?.title;
  // Aumentar tamaño del título a 5rem (80px) o 50px si no hay guardado, según la petición del usuario
  const titleFontSize = savedTitleSize && typeof savedTitleSize === 'string' ? savedTitleSize : "5rem";

  // Determinar el color del texto basado en la luminosidad de la imagen de fondo.
  // Para una implementación completa, se necesitaría analizar la imagen real o tener una propiedad `isDark` en `event.images.hero`.
  // Por ahora, asumimos que 'elegant-floral' es oscura, por lo que el texto debe ser blanco.
  // Si la imagen de portada es un poco oscura el nombre debe de ser claro, preferentemente blanco.
  // Si la imagen es clara, el color debe ser el de la paleta (colors.ink).
  // Para simular esto, podemos usar una lógica simple basada en el nombre de la imagen o un flag.
  const isHeroBackgroundDark = heroTexture.includes('elegant-floral') || heroTexture.includes('portada'); // Asunción
  const nameTextColor = isHeroBackgroundDark ? "#FFFFFF" : colors.ink;
  const subtitleTextColor = isHeroBackgroundDark ? "#FFFFFF" : colors.muted;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-background">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={heroTexture}
          alt="Textura"
          className="absolute inset-0 w-full h-full object-cover object-center block"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\'%3E%3Crect fill=\'%23f0f0f0\' width=\'800\' height=\'600\'/%3E%3C/svg%3E";
          }}
        />
        {/* Overlay para mejorar el contraste */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
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
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto hero-content">
        {isQuinceanera ? (
          // Layout para Quinceañera - Solo un nombre
          <>
            <h1
              className="font-light mb-8 tracking-wider hero-title"
              style={{
                color: nameTextColor, // Color dinámico
                fontSize: titleFontSize,
                fontFamily: fontSecondary,
                lineHeight: 1.05,
                textShadow: 'none', // Eliminar sombra
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
                style={{ color: nameTextColor, fontFamily: fontSecondary, fontSize: titleFontSize }}
              />
            </h1>
            <p
              className="font-light mb-10 tracking-wide hero-subtitle"
              style={{ 
                color: subtitleTextColor, // Color dinámico
                fontSize: "clamp(1.2rem, 4vw, 2rem)", 
                fontFamily: fontPrimary,
                textShadow: 'none', // Eliminar sombra
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
                color: nameTextColor, // Color dinámico
                fontSize: titleFontSize,
                fontFamily: fontSecondary,
                lineHeight: 1.05,
                textShadow: 'none', // Eliminar sombra
              }}
            >
              <EditableText
                value={event.couple?.bride || "Belén"}
                onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, bride: val } }))}
                ariaLabel="Nombre 1"
                className="px-1"
                singleLine
                style={{ color: nameTextColor, fontFamily: fontSecondary, fontSize: titleFontSize }}
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
                color: nameTextColor, // Color dinámico
                fontSize: titleFontSize,
                fontFamily: fontSecondary,
                lineHeight: 1.05,
                textShadow: 'none', // Eliminar sombra
              }}
            >
              <EditableText
                value={event.couple?.groom || "Amadeo"}
                onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, groom: val } }))}
                ariaLabel="Nombre 2"
                className="px-1"
                singleLine
                style={{ color: nameTextColor, fontFamily: fontSecondary, fontSize: titleFontSize }}
              />
            </h1>

            <p
              className="font-light mb-10 tracking-wide"
              style={{ 
                color: subtitleTextColor, // Color dinámico
                fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)", 
                fontFamily: fontPrimary,
                textShadow: 'none', // Eliminar sombra
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
