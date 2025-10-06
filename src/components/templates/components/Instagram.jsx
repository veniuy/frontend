import React from 'react';
import EditableText from '../../EditableText';
import StyledButton from '../../ui/StyledButton';

// Icono de Instagram
const InstagramIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Instagram = ({ event, setEvent, colors, fontPrimary, fontSecondary, isQuinceanera, styles = {} }) => {
  return (
    <section className="py-16 bg-white" dir="ltr">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: colors.primarySoft }}
        >
          <InstagramIcon className="w-8 h-8" style={{ color: colors.primary }} />
        </div>
        <h2
          className="text-2xl font-medium mb-6 tracking-wide"
          style={{ color: colors.ink, fontFamily: fontSecondary }}
        >
          COMPARTÍ TUS FOTOS
        </h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ color: colors.body, fontFamily: fontPrimary }}>
          Usá nuestro hashtag para que podamos ver todas las fotos de este día tan especial.
        </p>
        <div className="text-2xl font-medium mb-8" style={{ color: colors.primary }}>
          <EditableText
            value={event.hashtag || (isQuinceanera ? "#Mis15Años" : "#NuestraBoda")}
            onChange={(v) => setEvent((p) => ({ ...p, hashtag: v }))}
            className="px-1"
            singleLine
            style={{ color: colors.primary }}
          />
        </div>
        <StyledButton
          colors={colors}
          onClick={() => window.open("https://instagram.com", "_blank")}
        >
          <InstagramIcon className="w-4 h-4 mr-2" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          Ver en Instagram
        </StyledButton>
      </div>
    </section>
  );
};

export default Instagram;
