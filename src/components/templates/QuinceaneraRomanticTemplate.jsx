// src/components/templates/QuinceaneraRomanticTemplate.jsx
import React, { useMemo } from "react";
import styles from './QuinceaneraRomanticTemplate.module.css';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Ceremony from './components/Ceremony';
import Party from './components/Party';
import Gallery from './components/Gallery';
import Gifts from './components/Gifts';
import Instagram from './components/Instagram';
import RSVP from './components/RSVP';
import Songs from './components/Songs';
import UsefulInfo from './components/UsefulInfo';
import Footer from './components/Footer';

export default function QuinceaneraRomanticTemplate({ event, ui, setEvent }) {
  if (!event) return null;

  const isOn = (key) => {
    const s = event.sections || {};
    return s[key] !== false; // default visible
  };

  const COLORS = useMemo(() => {
    const c = event.colors || {};
    const primary = c.primary || "#E91E63"; // Rosa romántico
    const secondary = c.secondary || "#F8BBD9"; // Rosa suave
    const text = c.text || "#2E2E2E";
    const darkDerived = mixHex(secondary, "#000000", 0.75);
    const dark = c.dark || darkDerived;
    return {
      primary,
      primaryText: "#FFFFFF",
      secondary,
      secondaryText: "#FFFFFF",
      ink: text,
      body: text,
      muted: "#6B7280",
      paper: "#FDF2F8", // Fondo rosa muy suave
      white: "#FFFFFF",
      primarySoft: toSoft(primary, 0.16),
      secondarySoft: toSoft(secondary, 0.12),
      dark,
      darkText: pickTextColor(dark),
    };
  }, [event.colors]);

  const fontPrimary = event.fonts?.primary || "'Dancing Script', cursive";
  const fontSecondary = event.fonts?.secondary || "'Playfair Display', serif";

  // Aumentar tamaño del título a 5rem (80px) y eliminar sombra
  const titleSize = (event.fontSizes && event.fontSizes.title) ? event.fontSizes.title : "5rem";

  // Crear estilos CSS dinámicos para aplicar fuentes globalmente
  const fontStyles = useMemo(() => {
    // Determinar el color del texto basado en la luminosidad de la imagen de fondo
    // Para simplificar, asumimos que la imagen de fondo 'elegantfloral' es oscura, por lo que el texto debe ser blanco.
    // Si se implementara una selección de imagen dinámica, se necesitaría una función para calcular la luminosidad de la imagen.
    const heroTextColor = "#FFFFFF"; // Por defecto blanco para fondo oscuro
    const heroSubtitleColor = "#FFFFFF"; // Por defecto blanco para fondo oscuro

    return `
      .font-primary { font-family: ${fontPrimary} !important; }
      .font-secondary { font-family: ${fontSecondary} !important; }
      .editable-text { font-family: inherit !important; }

      /* Control de tamaño del nombre principal - aumentado a 5rem y sin sombra */
      .hero-title {
        font-size: ${titleSize} !important;
        line-height: 1.05 !important;
        color: ${heroTextColor} !important; /* Color dinámico */
        text-shadow: none !important; /* Eliminar sombra */
      }

      /* Mis quince años también en blanco y sin sombra */
      .hero-subtitle {
        color: ${heroSubtitleColor} !important;
        text-shadow: none !important; /* Eliminar sombra */
      }

      /* Ajuste responsivo: si el user define un tamaño grande, permitir escalado en móviles */
      @media (max-width: 640px) {
        .hero-title {
          font-size: calc(${titleSize} * 0.62) !important;
        }
      }

      /* Centrar todos los textos por defecto */
      .text-center-all {
        text-align: center !important;
      }

      /* Estilos para la imagen de fondo elegantfloral */
      .hero-background {
        background-image: url('/assets/elegant-floral-C5o6sKUn.jpg') !important; /* Usar la imagen local */
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        position: relative !important;
      }

      /* Overlay para mejorar el contraste del texto */
      .hero-background::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: rgba(0, 0, 0, 0.3) !important; /* Ajustar opacidad del overlay */
        z-index: 1 !important;
      }

      /* Asegurar que el contenido esté por encima del overlay */
      .hero-content {
        position: relative !important;
        z-index: 2 !important;
      }
    `;
  }, [fontPrimary, fontSecondary, titleSize]);

  const isQuinceanera = event.eventType === "quinceanera" || event.templateId?.includes("quinceanera");

  return (
    <div className={`min-h-screen ${styles.textCenterAll}`} dir={event?.direction || "ltr"} style={{ backgroundColor: COLORS.paper }}>
      {/* Inyectar estilos de fuente dinámicos */}
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />

      {/* Hero Section */}
      <Hero 
        event={event} 
        setEvent={setEvent} 
        colors={COLORS} 
        fontPrimary={fontPrimary}
        fontSecondary={fontSecondary}
        isQuinceanera={isQuinceanera}
        styles={styles}
      />

      {/* Countdown Section */}
      <Countdown 
        event={event} 
        colors={COLORS} 
        fontPrimary={fontPrimary}
        isQuinceanera={isQuinceanera}
        styles={styles}
      />

      {/* Details Section */}
      {(isOn("ceremony") || isOn("reception")) && (
        <section className={`py-16 bg-white ${styles.textCenterAll}`} dir="ltr">
          <div className="max-w-4xl mx-auto px-4">
            <div className={`grid ${isQuinceanera ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-12`}>
              
              {/* Ceremony - Solo para bodas */}
              {!isQuinceanera && isOn("ceremony") && (
                <Ceremony 
                  event={event} 
                  setEvent={setEvent} 
                  colors={COLORS} 
                  fontPrimary={fontPrimary}
                  styles={styles}
                />
              )}

              {/* Party/Reception */}
              {isOn("reception") && (
                <Party 
                  event={event} 
                  setEvent={setEvent} 
                  colors={COLORS} 
                  fontPrimary={fontPrimary}
                  isQuinceanera={isQuinceanera}
                  styles={styles}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {isOn("gallery") && (
        <Gallery 
          event={event} 
          colors={COLORS} 
          fontSecondary={fontSecondary}
          styles={styles}
        />
      )}

      {/* Gifts Section */}
      {isOn("bank") && (
        <Gifts 
          event={event} 
          setEvent={setEvent} 
          colors={COLORS} 
          fontPrimary={fontPrimary}
          fontSecondary={fontSecondary}
          styles={styles}
        />
      )}

      {/* Instagram Section */}
      {isOn("instagram") && (
        <Instagram 
          event={event} 
          setEvent={setEvent} 
          colors={COLORS} 
          fontPrimary={fontPrimary}
          fontSecondary={fontSecondary}
          isQuinceanera={isQuinceanera}
          styles={styles}
        />
      )}

      {/* RSVP Section */}
      <RSVP 
        event={event} 
        setEvent={setEvent} 
        colors={COLORS} 
        fontPrimary={fontPrimary}
        fontSecondary={fontSecondary}
        isQuinceanera={isQuinceanera}
        styles={styles}
      />

      {/* Songs Section */}
      {isOn("songs") && (
        <Songs 
          colors={COLORS} 
          fontPrimary={fontPrimary}
          fontSecondary={fontSecondary}
          isQuinceanera={isQuinceanera}
          styles={styles}
        />
      )}

      {/* Useful Info Section */}
      {isOn("info") && (
        <UsefulInfo 
          event={event} 
          setEvent={setEvent} 
          colors={COLORS} 
          fontPrimary={fontPrimary}
          fontSecondary={fontSecondary}
          styles={styles}
        />
      )}

      {/* Footer */}
      <Footer 
        colors={COLORS} 
        fontPrimary={fontPrimary}
        isQuinceanera={isQuinceanera}
        styles={styles}
      />

      {/* Estilos CSS globales */}
      <style jsx>{`
        .min-h-screen {
          min-height: 100vh;
        }
        .py-16 {
          padding-top: 4rem;
          padding-bottom: 4rem;
        }
        .py-12 {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        .mb-8 {
          margin-bottom: 2rem;
        }
        .mb-12 {
          margin-bottom: 3rem;
        }
        .max-w-4xl {
          max-width: 56rem;
        }
        .max-w-6xl {
          max-width: 72rem;
        }
        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
        .text-center {
          text-align: center;
        }
        .bg-white {
          background-color: #ffffff;
        }
        .grid {
          display: grid;
        }
        .gap-12 {
          gap: 3rem;
        }
        @media (min-width: 768px) {
          .md\\:grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
          .md\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

/* ===== HELPERS DE COLOR ===== */
function mixHex(hex1, hex2, ratio) {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function toSoft(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function pickTextColor(bgHex) {
  const r = parseInt(bgHex.slice(1, 3), 16);
  const g = parseInt(bgHex.slice(3, 5), 16);
  const b = parseInt(bgHex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}
