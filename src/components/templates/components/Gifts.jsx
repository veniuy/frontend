import React from 'react';

const Gifts = ({ event, setEvent, colors = {}, fonts = {}, isEditing }) => {
  // Valores por defecto para fonts
  const defaultFonts = {
    heading: "Playfair Display, serif",
    body: "Inter, sans-serif"
  };
  
  const mergedFonts = { ...defaultFonts, ...fonts };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      gifts: {
        ...prevEvent.gifts,
        [name]: value,
      },
    }));
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: colors.background,
      color: colors.text,
      textAlign: 'center',
      border: `1px solid ${colors.primary}`,
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h2 style={{
        fontFamily: mergedFonts.heading,
        color: colors.primary,
        fontSize: '2.5em',
        marginBottom: '20px'
      }}>Regalos y Datos Bancarios</h2>

      <p style={{
        fontFamily: mergedFonts.body,
        color: colors.text,
        fontSize: '1.1em',
        marginBottom: '30px'
      }}>
        Si deseas hacernos un regalo, aquí tienes algunas opciones:
      </p>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: mergedFonts.heading,
          color: colors.secondary,
          fontSize: '1.8em',
          marginBottom: '15px'
        }}>Sugerencias de Regalo</h3>
        {isEditing ? (
          <textarea
            name="suggestions"
            value={event.gifts?.suggestions || ''}
            onChange={handleInputChange}
            style={{
              width: '80%',
              minHeight: '100px',
              padding: '10px',
              fontSize: '1em',
              fontFamily: mergedFonts.body,
              borderColor: colors.accent,
              borderRadius: '5px',
              backgroundColor: colors.lightBackground,
              color: colors.text
            }}
            placeholder="Ej: Nuestra luna de miel, un fondo para nuestro futuro..."
          />
        ) : (
          <p style={{
            fontFamily: mergedFonts.body,
            color: colors.text,
            fontSize: '1em',
            whiteSpace: 'pre-wrap'
          }}>{event.gifts?.suggestions || 'No hay sugerencias de regalo disponibles.'}</p>
        )}
      </div>

      <div>
        <h3 style={{
          fontFamily: mergedFonts.heading,
          color: colors.secondary,
          fontSize: '1.8em',
          marginBottom: '15px'
        }}>Datos Bancarios</h3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '15px', width: '80%', maxWidth: '400px' }}>
            <label style={{ fontFamily: mergedFonts.body, color: colors.text, display: 'block', marginBottom: '5px', textAlign: 'left' }}>Banco:</label>
            {isEditing ? (
              <input
                type="text"
                name="bankName"
                value={event.gifts?.bankName || ''}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '1em',
                  fontFamily: mergedFonts.body,
                  borderColor: colors.accent,
                  borderRadius: '5px',
                  backgroundColor: colors.lightBackground,
                  color: colors.text
                }}
                placeholder="Nombre del Banco"
              />
            ) : (
              <p style={{ fontFamily: mergedFonts.body, color: colors.text, fontSize: '1em', textAlign: 'left' }}>{event.gifts?.bankName || 'No especificado'}</p>
            )}
          </div>

          <div style={{ marginBottom: '15px', width: '80%', maxWidth: '400px' }}>
            <label style={{ fontFamily: mergedFonts.body, color: colors.text, display: 'block', marginBottom: '5px', textAlign: 'left' }}>Número de Cuenta / IBAN:</label>
            {isEditing ? (
              <input
                type="text"
                name="accountNumber"
                value={event.gifts?.accountNumber || ''}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '1em',
                  fontFamily: mergedFonts.body,
                  borderColor: colors.accent,
                  borderRadius: '5px',
                  backgroundColor: colors.lightBackground,
                  color: colors.text
                }}
                placeholder="ESXX XXXX XXXX XXXX XXXX XXXX"
              />
            ) : (
              <p style={{ fontFamily: mergedFonts.body, color: colors.text, fontSize: '1em', textAlign: 'left' }}>{event.gifts?.accountNumber || 'No especificado'}</p>
            )}
          </div>

          <div style={{ marginBottom: '15px', width: '80%', maxWidth: '400px' }}>
            <label style={{ fontFamily: mergedFonts.body, color: colors.text, display: 'block', marginBottom: '5px', textAlign: 'left' }}>Titular de la Cuenta:</label>
            {isEditing ? (
              <input
                type="text"
                name="accountHolder"
                value={event.gifts?.accountHolder || ''}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '1em',
                  fontFamily: mergedFonts.body,
                  borderColor: colors.accent,
                  borderRadius: '5px',
                  backgroundColor: colors.lightBackground,
                  color: colors.text
                }}
                placeholder="Nombre del Titular"
              />
            ) : (
              <p style={{ fontFamily: mergedFonts.body, color: colors.text, fontSize: '1em', textAlign: 'left' }}>{event.gifts?.accountHolder || 'No especificado'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gifts;
