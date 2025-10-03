import React, { useState } from 'react';

const RSVP = ({ event, setEvent, colors = {}, fonts = {}, fontPrimary, fontSecondary }) => {
  const localFonts = { primary: fontPrimary, secondary: fontSecondary };
  const defaultFonts = {
    primary: 'Arial, sans-serif',
  };
  const mergedFonts = { ...defaultFonts, ...fonts, ...localFonts };
  const defaultColors = {
    primary: '#333',
    secondary: '#666',
    background: '#f0f0f0',
    text: '#333'
  };
  const mergedColors = { ...defaultColors, ...colors };

  const [name, setName] = useState('');
  const [attending, setAttending] = useState('');
  const [guests, setGuests] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se manejaría la lógica de envío del RSVP
    console.log({ name, attending, guests });
    alert('RSVP enviado! (Esta es una simulación)');
    // En una aplicación real, aquí se actualizaría el estado global o se enviaría a un backend
  };

  return (
    <div style={{ padding: '20px', fontFamily: mergedFonts.primary || 'Arial' }}>
      <h2 style={{ color: mergedColors.primary || '#333', textAlign: 'center' }}>Confirmación de Asistencia</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: `1px solid ${mergedColors.secondary || '#ccc'}`, borderRadius: '8px', backgroundColor: mergedColors.background || '#f9f9f9' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', color: mergedColors.text || '#555' }}>Nombre Completo:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: `1px solid ${mergedColors.secondary || '#ddd'}`, borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: mergedColors.text || '#555' }}>¿Asistirás?</label>
          <div style={{ display: 'flex', gap: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="attending"
                value="yes"
                checked={attending === 'yes'}
                onChange={(e) => setAttending(e.target.value)}
                required
                style={{ marginRight: '5px' }}
              />
              Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="attending"
                value="no"
                checked={attending === 'no'}
                onChange={(e) => setAttending(e.target.value)}
                style={{ marginRight: '5px' }}
              />
              No
            </label>
          </div>
        </div>

        {attending === 'yes' && (
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="guests" style={{ display: 'block', marginBottom: '5px', color: mergedColors.text || '#555' }}>Número de invitados (incluyéndote):</label>
            <input
              type="number"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value, 10))}
              min="1"
              required
              style={{ width: '100%', padding: '10px', border: `1px solid ${mergedColors.secondary || '#ddd'}`, borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{ width: '100%', padding: '10px 15px', backgroundColor: mergedColors.buttonPrimary || '#4CAF50', color: mergedColors.buttonText || 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          Enviar RSVP
        </button>
      </form>
    </div>
  );
};

export default RSVP;

