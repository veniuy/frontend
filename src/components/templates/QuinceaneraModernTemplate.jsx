// src/components/templates/QuinceaneraModernTemplate.jsx
import React, { useMemo } from "react";
import styles from './QuinceaneraModernTemplate.module.css';
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
import Modal from './components/Modal';

export default function QuinceaneraModernTemplate({ event, ui, setEvent }) {
  if (!event) return null;

  const isOn = (key) => {
    const s = event.sections || {};
    return s[key] !== false; // default visible
  };

  const COLORS = useMemo(() => {
    const c = event.colors || {};
    // Colores modernos y vibrantes inspirados en el demo
    const primary = c.primary || "#8B5CF6"; // Purple-500
    const secondary = c.secondary || "#EC4899"; // Pink-500
    const accent = c.accent || "#F59E0B"; // Yellow-500
    const text = c.text || "#1F2937"; // Gray-800
    const darkDerived = mixHex(secondary, "#000000", 0.75);
    const dark = c.dark || darkDerived;
    
    return {
      primary,
      primaryText: "#FFFFFF",
      secondary,
      secondaryText: "#FFFFFF",
      accent,
      accentText: "#FFFFFF",
      ink: text,
      body: text,
      muted: "#6B7280",
      paper: "#FAFAFA",
      white: "#FFFFFF",
      primarySoft: toSoft(primary, 0.16),
      secondarySoft: toSoft(secondary, 0.12),
      accentSoft: toSoft(accent, 0.12),
      dark,
      darkText: pickTextColor(dark),
      // Gradientes modernos
      gradientPrimary: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
      gradientSecondary: `linear-gradient(135deg, ${secondary} 0%, ${accent} 100%)`,
      gradientBackground: `linear-gradient(135deg, #F3E8FF 0%, #FCE7F3 50%, #FEF3C7 100%)`,
    };
  }, [event.colors]);

  const fontPrimary = event.fonts?.primary || "'Inter', 'Poppins', sans-serif";
  const fontSecondary = event.fonts?.secondary || "'Playfair Display', serif";

  // Crear estilos CSS dinámicos para aplicar fuentes globalmente
  const fontStyles = useMemo(() => {
    return `
      :root {
        --font-primary: ${fontPrimary};
        --font-secondary: ${fontSecondary};
        --color-primary: ${COLORS.primary};
        --color-secondary: ${COLORS.secondary};
        --color-accent: ${COLORS.accent};
        --gradient-primary: ${COLORS.gradientPrimary};
        --gradient-secondary: ${COLORS.gradientSecondary};
        --gradient-background: ${COLORS.gradientBackground};
      }
    `;
  }, [fontPrimary, fontSecondary, COLORS]);

  const isQuinceanera = event.eventType === "quinceanera" || event.templateId?.includes("quinceanera");

  return (
    <div className={styles.modernTemplate} dir={event?.direction || "ltr"} style={{ background: COLORS.gradientBackground }}>
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
        isModern={true}
      />

      {/* Countdown Section */}
      <Countdown 
        event={event} 
        colors={COLORS} 
        fontPrimary={fontPrimary}
        isQuinceanera={isQuinceanera}
        styles={styles}
        isModern={true}
      />

      {/* Details Section */}
      {(isOn("ceremony") || isOn("reception")) && (
        <section className={styles.detailsSection} dir="ltr">
          <div className={styles.container}>
            <div className={`${styles.grid} ${isQuinceanera ? styles.gridSingle : styles.gridDouble}`}>
              
              {/* Ceremony - Solo para bodas */}
              {!isQuinceanera && isOn("ceremony") && (
                <Ceremony 
                  event={event} 
                  setEvent={setEvent} 
                  colors={COLORS} 
                  fontPrimary={fontPrimary}
                  styles={styles}
                  isModern={true}
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
                  isModern={true}
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
          isModern={true}
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
          isModern={true}
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
          isModern={true}
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
        isModern={true}
      />

      {/* Songs Section */}
      {isOn("songs") && (
        <Songs 
          colors={COLORS} 
          fontPrimary={fontPrimary}
          fontSecondary={fontSecondary}
          isQuinceanera={isQuinceanera}
          styles={styles}
          isModern={true}
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
          isModern={true}
        />
      )}

      {/* Footer */}
      <Footer 
        colors={COLORS} 
        fontPrimary={fontPrimary}
        isQuinceanera={isQuinceanera}
        styles={styles}
        isModern={true}
      />
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
