import React from 'react';
import StyledButton from '../../ui/StyledButton';

// Icono de música
const MusicIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
);

const Songs = ({ colors, fontPrimary, fontSecondary, isQuinceanera, styles = {} }) => {
  return (
    <section className="py-16 bg-white" dir="ltr">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2
          className="text-2xl font-medium mb-6 tracking-wide"
          style={{ color: colors.ink, fontFamily: fontSecondary }}
        >
          ¿QUÉ CANCIONES NO PUEDEN FALTAR?
        </h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ color: colors.body, fontFamily: fontPrimary }}>
          {isQuinceanera ? "¡Ayudame sugiriendo las canciones que pensás que no pueden faltar!" : "¡Ayudanos sugiriendo las canciones que pensás que no pueden faltar!"}
        </p>
        <StyledButton
          colors={colors}
          onClick={() => alert("Abrir formulario de canciones (pendiente)")}
        >
          <MusicIcon className="w-4 h-4 mr-2" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          Sugerir canción
        </StyledButton>
      </div>
    </section>
  );
};

export default Songs;
