import React from 'react';

const Party = ({ event, setEvent, colors = {}, fonts = {} }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  };

  return (
    <div style={{
      fontFamily: fonts.primary,
      color: colors.textPrimary,
      backgroundColor: colors.background,
      padding: '20px',
      borderRadius: '8px',
      boxShadow: `0 4px 8px ${colors.shadowColor || 'rgba(0,0,0,0.1)'}`
    }}>
      <h2 style={{
        color: colors.headingColor || colors.textPrimary,
        fontFamily: fonts.secondary || fonts.primary,
        marginBottom: '15px'
      }}>Componente Fiesta/Celebración</h2>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: colors.labelColor || colors.textPrimary }}>Nombre del evento:</label>
        <input
          type="text"
          name="name"
          value={event.name}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${colors.borderColor || '#ccc'}`,
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: colors.labelColor || colors.textPrimary }}>Fecha:</label>
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${colors.borderColor || '#ccc'}`,
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: colors.labelColor || colors.textPrimary }}>Lugar:</label>
        <input
          type="text"
          name="location"
          value={event.location}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${colors.borderColor || '#ccc'}`,
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

