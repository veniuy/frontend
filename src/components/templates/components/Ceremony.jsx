import React from 'react';
import EditableText from '../../EditableText';
import StyledButton from '../../ui/StyledButton';

// Icono de iglesia
const ChurchIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
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

const Ceremony = ({ event, setEvent, colors, fontPrimary, styles = {} }) => {
  return (
    <DetailIconCard
      icon={<ChurchIcon className="w-8 h-8" style={{ color: colors.primary }} />}
      iconBg={colors.primarySoft}
      title={event.ceremony?.type === "civil" ? "CEREMONIA CIVIL" : "CEREMONIA"}
      titleColor={colors.ink}
      fontPrimary={fontPrimary}
    >
      <div className="space-y-3 mb-8">
        <p className="text-lg" style={{ color: colors.body, fontFamily: fontPrimary }}>
          <EditableText
            value={event.date || "23 de Noviembre, 2026"}
            onChange={(v) => setEvent((p) => ({ ...p, date: v }))}
            className="px-1"
            singleLine
            style={{ fontFamily: fontPrimary }}
          />
        </p>
        <p className="text-lg" style={{ color: colors.body, fontFamily: fontPrimary }}>
          <EditableText
            value={event.ceremony?.time || event.time || "19:00 hs"}
            onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, time: v } }))}
            className="px-1"
            singleLine
            style={{ fontFamily: fontPrimary }}
          />
        </p>
        <p className="font-medium" style={{ color: colors.body, fontFamily: fontPrimary }}>
          <EditableText
            value={event.ceremony?.venue || (event.ceremony?.type === "civil" ? "Registro Civil" : "Iglesia Nuestra Señora del Carmen")}
            onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, venue: v } }))}
            className="px-1"
            singleLine
            style={{ fontFamily: fontPrimary }}
          />
        </p>
        <p style={{ color: colors.body, fontFamily: fontPrimary }}>
          <EditableText
            value={event.ceremony?.location || "Villa Allende, Córdoba"}
            onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, location: v } }))}
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
            `https://maps.google.com/?q=${event.ceremony?.address || "Av. San Martín 456, Villa Allende"}`,
            "_blank"
          )
        }
      >
        LLEGAR A LA CEREMONIA
      </StyledButton>
    </DetailIconCard>
  );
};

export default Ceremony;
