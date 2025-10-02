import React from 'react';

const Modal = ({ isOpen, onClose, children, event, setEvent, colors = {}, fonts = {}, title = 'Detalles' }) => {
  if (!isOpen) return null;

  const defaultColors = {
    primary: '#6A0572', // Morado oscuro
    secondary: '#AB83A1', // Morado claro
    background: '#F8F8F8', // Gris muy claro
    text: '#333333', // Gris oscuro para texto
    buttonSave: '#4CAF50', // Verde para guardar
    buttonClose: '#AAAAAA', // Gris para cerrar
    inputBorder: '#CCCCCC',
  };

  const defaultFonts = {
    heading: 'Playfair Display, serif',
    body: 'Roboto, sans-serif',
  };

  const mergedColors = { ...defaultColors, ...colors };
  const mergedFonts = { ...defaultFonts, ...fonts };

  const handleSave = () => {
    console.log('Guardando evento:', event);
    // Aquí se podría llamar a una función para actualizar el estado global o enviar a una API
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const modalBackdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: mergedColors.background,
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
    zIndex: 1001,
    fontFamily: mergedFonts.body,
    color: mergedColors.text,
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '1.2em',
    cursor: 'pointer',
    color: mergedColors.buttonClose,
  };

  const saveButtonStyle = {
    backgroundColor: mergedColors.buttonSave,
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontFamily: mergedFonts.body,
  };

  const headingStyle = {
    fontFamily: mergedFonts.heading,
    color: mergedColors.primary,
    marginBottom: '15px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '5px 0 15px 0',
    display: 'inline-block',
    border: `1px solid ${mergedColors.inputBorder}`,
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontFamily: mergedFonts.body,
  };

  return (
    <div style={modalBackdropStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>X</button>
        <h2 style={headingStyle}>{title}</h2>
        {children}
        {event && setEvent && (
          <div style={{ marginTop: '20px', borderTop: `1px solid ${mergedColors.secondary}`, paddingTop: '10px' }}>
            <h3 style={headingStyle}>Editar Evento</h3>
            <div>
              <label htmlFor="eventName">Nombre del Evento:</label>
              <input
                type="text"
                id="eventName"
                name="name"
                value={event.name || ''}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="eventDate">Fecha del Evento:</label>
              <input
                type="date"
                id="eventDate"
                name="date"
                value={event.date || ''}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            {/* Otros campos editables del evento pueden ir aquí */}
            <button onClick={handleSave} style={saveButtonStyle}>Guardar Cambios</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

