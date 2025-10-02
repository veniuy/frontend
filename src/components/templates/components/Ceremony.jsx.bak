import React from 'react';

const Ceremony = ({ event = {}, setEvent = () => {}, colors = {}, fonts = {} }) => {
  // Valores por defecto para fuentes y colores
  const defaultFonts = {
    primary: 'serif',
    secondary: 'sans-serif'
  };
  const mergedFonts = { ...defaultFonts, ...fonts };

  const defaultColors = {
    background: '#f8f8f8',
    primary: '#333',
    text: '#666'
  };
  const mergedColors = { ...defaultColors, ...colors };

  // Asegurar estructura de ceremony
  const safeCeremony = {
    title: '',
    date: '',
    time: '',
    location: '',
    map_url: '',
    ...event.ceremony,
  };

  // Manejador seguro (uso de setEvent funcional para evitar estados inconsistentes)
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setEvent(prev => ({
      ...prev,
      ceremony: {
        ...(prev?.ceremony || safeCeremony),
        [field]: value,
      },
    }));
  };

  const sectionStyle = {
    backgroundColor: mergedColors.background,
    padding: '40px 20px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontFamily: mergedFonts.primary,
    color: mergedColors.primary,
    fontSize: '2.5em',
    marginBottom: '20px',
  };

  const textStyle = {
    fontFamily: mergedFonts.secondary,
    color: mergedColors.text,
    fontSize: '1.1em',
    lineHeight: '1.6',
    marginBottom: '15px',
  };

  const mapContainerStyle = {
    marginTop: '30px',
    width: '100%',
    maxWidth: '800px',
    margin: '30px auto 0 auto',
    border: `1px solid ${mergedColors.primary}`,
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const mapIframeStyle = {
    width: '100%',
    height: '400px',
    border: '0',
  };

  // src seguro para iframe: si no hay URL, mostramos un iframe vacío (evita errores de embed)
  const iframeSrc = safeCeremony.map_url && safeCeremony.map_url.trim()
    ? safeCeremony.map_url
    : 'about:blank';

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>
        <input
          type="text"
          value={safeCeremony.title}
          onChange={(e) => handleInputChange(e, 'title')}
          placeholder="Ceremonia"
          style={{ ...titleStyle, border: '1px solid #ccc', padding: '5px', width: 'auto' }}
        />
      </h2>

      <p style={textStyle}>
        <input
          type="text"
          value={safeCeremony.date}
          onChange={(e) => handleInputChange(e, 'date')}
          placeholder="Fecha de la ceremonia"
          style={{ ...textStyle, border: '1px solid #ccc', padding: '5px', width: 'auto' }}
        />
      </p>

      <p style={textStyle}>
        <input
          type="text"
          value={safeCeremony.time}
          onChange={(e) => handleInputChange(e, 'time')}
          placeholder="Hora de la ceremonia"
          style={{ ...textStyle, border: '1px solid #ccc', padding: '5px', width: 'auto' }}
        />
      </p>

      <p style={textStyle}>
        <input
          type="text"
          value={safeCeremony.location}
          onChange={(e) => handleInputChange(e, 'location')}
          placeholder="Lugar de la ceremonia"
          style={{ ...textStyle, border: '1px solid #ccc', padding: '5px', width: 'auto' }}
        />
      </p>

      <div style={mapContainerStyle}>
        <iframe
          src={iframeSrc}
          style={mapIframeStyle}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ceremony Location Map"
        />
      </div>

      <p style={textStyle}>
        URL del Mapa:
        <input
          type="text"
          value={safeCeremony.map_url}
          onChange={(e) => handleInputChange(e, 'map_url')}
          placeholder="https://..."
          style={{ ...textStyle, border: '1px solid #ccc', padding: '5px', width: '100%' }}
        />
      </p>
    </section>
  );
};

export default Ceremony;


