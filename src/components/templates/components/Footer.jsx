import React from 'react';
import StyledButton from '../../ui/StyledButton';

// Iconos
const Share2Icon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const DownloadIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

function pickTextColor(bgHex) {
  const r = parseInt(bgHex.slice(1, 3), 16);
  const g = parseInt(bgHex.slice(3, 5), 16);
  const b = parseInt(bgHex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

const Footer = ({ colors, fontPrimary, isQuinceanera, styles = {} }) => {
  return (
    <footer className="py-12" style={{ backgroundColor: colors.dark, color: colors.darkText }}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-lg mb-8" style={{ fontFamily: fontPrimary }}>
          {isQuinceanera ? "¡Gracias por acompañarme en este momento tan importante!" : "¡Gracias por acompañarnos en este momento tan importante!"}
        </p>
        <div
          className="pt-8"
          style={{
            borderTop:
              pickTextColor(colors.dark) === "#FFFFFF" ? "1px solid rgba(255,255,255,.25)" : "1px solid rgba(0,0,0,.25)",
          }}
        >
          <p className="text-sm opacity-70 mb-4" style={{ fontFamily: fontPrimary }}>
            Invitación digital creada con{" "}
            <span className="font-medium" style={{ color: colors.primary }}>
              Venite
            </span>
          </p>
          <div className="flex justify-center gap-3">
            <StyledButton
              colors={colors}
              variant="outline-dark"
              size="sm"
              onClick={() => navigator.clipboard?.writeText(window.location.href).catch(() => {})}
            >
              <Share2Icon className="w-4 h-4 mr-2" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              Compartir
            </StyledButton>
            <StyledButton
              colors={colors}
              variant="outline-dark"
              size="sm"
              onClick={() => {}}
            >
              <DownloadIcon className="w-4 h-4 mr-2" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              Guardar
            </StyledButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
