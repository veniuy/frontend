import React from 'react';
import EditableText from '../../EditableText';
import StyledButton from '../../ui/StyledButton';

// Icono de fiesta
const PartyPopperIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.8 11.3 2 22l10.7-3.79"></path>
    <path d="M4 3h.01"></path>
    <path d="M22 8h.01"></path>
    <path d="M15 2h.01"></path>
    <path d="M22 20h.01"></path>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const DetailIconCard = ({ icon, iconBg, title, titleColor, children, fontPrimary }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <h3 
        className="text-2xl font-medium mb-6 tracking-wide" 
        style={{ color: titleColor, fontFamily: fontPrimary }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
};

const Party = ({ event, setEvent, colors, fontPrimary, isQuinceanera, styles = {} }) => {
  return (
    <DetailIconCard
      icon={<PartyPopperIcon className="w-8 h-8" style={{ color: colors.primary }} />}
      iconBg={colors.primarySoft}
      title={isQuinceanera ? "CELEBRACIÓN" : "FIESTA"}
      titleColor={colors.ink}
      fontPrimary={fontPrimary}
    >
      <div className="space-y-3 mb-8">
        <p className="text-lg" style={{ color: colors.body, fontFamily: fontPrimary }}>
          <EditableText
            value={event.reception?.time || (isQuinceanera ? event.time || "20:00 hs" : "Después de la ceremonia")}
            onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, time: v } }))}
            className="px-1"
            singleLine
            style={{ fontFamily: fontPrimary }}
          />
        </p>
        <p className="font-medium" style={{ color: colors.body, fontFamily: fontPrimary }}>
          <EditableText
            value={event.reception?.venue || "Salón de Eventos El Jardín"}
            onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, venue: v } }))}
            className="px-1"
            singleLine
            style={{ fontFamily: fontPrimary }}
          />
        </p>
        <p style={{ color: colors.body, fontFamily: fontPrimary }}>
          <EditableText
            value={event.reception?.location || "Córdoba Capital"}
            onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, location: v } }))}
            className="px-1"
            singleLine
            style={{ fontFamily: fontPrimary }}
          />
        </p>
        <p className="text-sm" style={{ color: colors.muted, fontFamily: fontPrimary }}>
          Recibí debajo las indicaciones para llegar.
        </p>
      </div>
      <StyledButton
        colors={colors}
        onClick={() =>
          window.open(
            `https://maps.google.com/?q=${event.reception?.address || "Av. Colón 1234, Córdoba"}`,
            "_blank"
          )
        }
      >
        {isQuinceanera ? "LLEGAR A LA CELEBRACIÓN" : "LLEGAR A LA FIESTA"}
      </StyledButton>
    </DetailIconCard>
  );
};

export default Party;
