import React from 'react';

const Ceremony = ({ event, setEvent, colors, fonts }) => {
  const handleInputChange = (e, field) => {
    setEvent({
      ...event,
      ceremony: {
        ...event.ceremony,
        [field]: e.target.value,
      },
    });
  };

  const sectionStyle = {
    backgroundColor: colors.background || '#f8f8f8',
    padding: '40px 20px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontFamily: fonts.primary || 'serif',
    color: colors.primary || '#333',
    fontSize: '2.5em',
    marginBottom: '20px',
  };

  const textStyle = {
    fontFamily: fonts.secondary || 'sans-serif',
    color: colors.text || '#666',
    fontSize: '1.1em',
    lineHeight: '1.6',
    marginBottom: '15px',
  };

  const mapContainerStyle = {
    marginTop: '30px',
    width: '100%',
    maxWidth: '800px',
    margin: '30px auto 0 auto',
    border: `1px solid ${colors.primary || '#ccc'}`,
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const mapIframeStyle = {
    width: '100%',
    height: '400px',
    border: '0',
  };

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>
        <input
          type="text"
          value={event.ceremony?.title || 'Ceremonia'}
          onChange={(e) => handleInputChange(e, 'title')}
          style={{ ...titleStyle, border: '1px solid #ccc', padding: '5px', width: 'auto' }}
        />
      </h2>
      <p style={textStyle}>
        <input
          type="text"
          value={event.ceremony?.date || 'Fecha de la ceremonia'}
          onChange={(e) => handleInputChange(e, 'date')}
          style={{ ...textStyle, border: '1px solid #ccc', padding: '5px', width: 'auto' }}
        />
      </p>
      <p style={textStyle}>
        <input
          type="text"
          value={event.ceremony?.time || 'Hora de la ceremonia'}
          onChange={(e) => handleInputChange(e, 'time')}
          style={{ ...textStyle, border: '1px solid #ccc', padding: '5px', width: 'auto' }}
        />
      </p>
      <p style={textStyle}>
        <input
          type="text"
          value={event.ceremony?.location || 'Lugar de la ceremonia'}
          onChange={(e) => handleInputChange(e, 'location')}
          style={{ ...textStyle, border: '1px solid #ccc', padding: '5px', width: 'auto' }}
        />
      </p>

      <div style={mapContainerStyle}>
        <iframe
          src={event.ceremony?.map_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.211667187909!2d-122.41941568468168!3d37.77492947975881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064a3e2e7c5%3A0x28c0c8b6e6f6f6f!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1633024000000!5m2!1sen!2sus'}
          style={mapIframeStyle}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ceremony Location Map"
        ></iframe>
      </div>
      <p style={textStyle}>
        URL del Mapa:
        <input
          type="text"
          value={event.ceremony?.map_url || ''}
          onChange={(e) => handleInputChange(e, 'map_url')}
          style={{ ...textStyle, border: '1px solid #ccc', padding: '5px', width: '100%' }}
        />
      </p>
    </section>
  );
};

export default Ceremony;

