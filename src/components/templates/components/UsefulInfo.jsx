import React from 'react';

const UsefulInfo = ({ event = {}, setEvent = () => {}, colors = {}, fonts = {}, editable = false }) => {
  // Valores por defecto para fonts
  const defaultFonts = {
    heading: "Playfair Display, serif",
    body: "Inter, sans-serif",
    subheading: "Playfair Display, serif"
  };
  const mergedFonts = { ...defaultFonts, ...fonts };

  const defaultColors = {
    primary: '#333',
    secondary: '#666',
    text: '#333',
    accent: '#8e44ad'
  };
  const mergedColors = { ...defaultColors, ...colors };

  // Asegurar estructura segura para usefulInfo
  const safeUsefulInfo = Array.isArray(event.usefulInfo) ? event.usefulInfo : [];

  const handleInfoChange = (e, index) => {
    const value = e.target.value;
    setEvent(prev => {
      const prevInfo = Array.isArray(prev?.usefulInfo) ? prev.usefulInfo : safeUsefulInfo;
      const newInfo = prevInfo.map((item, i) => {
        if (i !== index) return item;
        return { ...item, text: value };
      });
      return { ...prev, usefulInfo: newInfo };
    });
  };

  return (
    <div style={{ fontFamily: mergedFonts.body, color: mergedColors.text, padding: '20px' }}>
      <h2 style={{ fontFamily: mergedFonts.heading, color: mergedColors.primary }}>Información Útil</h2>

      {safeUsefulInfo.length === 0 && (
        <p style={{ fontFamily: mergedFonts.body, color: mergedColors.secondary }}>No hay información disponible.</p>
      )}

      {safeUsefulInfo.map((info = {}, index) => (
        <div key={index} style={{ marginBottom: '15px' }}>
          <h3 style={{ fontFamily: mergedFonts.subheading, color: mergedColors.secondary }}>
            {info.title || `Item ${index + 1}`}
          </h3>

          {editable ? (
            <textarea
              value={info.text || ''}
              onChange={(e) => handleInfoChange(e, index)}
              style={{
                width: '100%',
                padding: '8px',
                border: `1px solid ${mergedColors.accent}`,
                borderRadius: '4px',
                fontFamily: mergedFonts.body,
                color: mergedColors.text,
                backgroundColor: 'transparent',
              }}
            />
          ) : (
            <p style={{ fontFamily: mergedFonts.body, color: mergedColors.text }}>{info.text || ''}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default UsefulInfo;
