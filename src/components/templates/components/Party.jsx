import React from 'react';

const Party = ({ event, setEvent, colors = {}, fonts = {}, fontPrimary, fontSecondary }) => {
  const localFonts = { primary: fontPrimary, secondary: fontSecondary };
  const defaultFonts = {
    primary: 'Arial, sans-serif',
    secondary: 'Georgia, serif'
  };
  const mergedFonts = { ...defaultFonts, ...fonts, ...localFonts };
  
  const defaultColors = {
    primary: '#333',
    textPrimary: '#333',
    background: '#f0f0f0',
    shadowColor: 'rgba(0,0,0,0.1)',
    headingColor: '#333',
    labelColor: '#333',
    borderColor: '#ccc'
  };
  const mergedColors = { ...defaultColors, ...colors };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  return (
    <div style={{
      fontFamily: mergedFonts.primary,
      color: mergedColors.textPrimary,
      backgroundColor: mergedColors.background,
      padding: '20px',
      borderRadius: '8px',
      boxShadow: `0 4px 8px ${mergedColors.shadowColor || 'rgba(0,0,0,0.1)'}`
    }}>
      <h2 style={{
        color: mergedColors.headingColor || mergedColors.textPrimary,
        fontFamily: mergedFonts.secondary || mergedFonts.primary,
        marginBottom: '15px'
      }}>Componente Fiesta/Celebración</h2>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: mergedColors.labelColor || mergedColors.textPrimary }}>Nombre del evento:</label>
        <input
          type="text"
          name="name"
          value={event.name}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${mergedColors.borderColor || '#ccc'}`,
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: mergedColors.labelColor || mergedColors.textPrimary }}>Fecha:</label>
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${mergedColors.borderColor || '#ccc'}`,
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: mergedColors.labelColor || mergedColors.textPrimary }}>Lugar:</label>
        <input
          type="text"
          name="location"
          value={event.location}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${mergedColors.borderColor || '#ccc'}`,
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Puedes añadir más campos editables aquí siguiendo el mismo patrón */}

    </div>
  );
};

export default Party;

