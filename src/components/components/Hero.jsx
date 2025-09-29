import React from 'react';

const Hero = ({ event, setEvent, colors, fonts }) => {
  // Estilos inline para el componente Hero
  const heroStyle = {
    backgroundColor: colors.primary || '#f0f0f0',
    color: colors.textPrimary || '#333',
    fontFamily: fonts.heading || 'Arial, sans-serif',
    padding: '50px 20px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '3em',
    marginBottom: '10px',
    fontFamily: fonts.title || 'Georgia, serif',
    color: colors.accent || '#8B4513',
  };

  const subtitleStyle = {
    fontSize: '1.5em',
    fontFamily: fonts.subtitle || 'Arial, sans-serif',
    color: colors.textSecondary || '#666',
  };

  const logoStyle = {
    maxWidth: '150px',
    height: 'auto',
    margin: '20px auto',
    display: 'block',
  };

  const handleNameChange = (e, field) => {
    setEvent({
      ...event,
      hero: {
        ...event.hero,
        [field]: e.target.value,
      },
    });
  };

  return (
    <div style={heroStyle}>
      {event.hero.logo && (
        <img
          src={event.hero.logo}
          alt="Logo"
          style={logoStyle}
        />
      )}
      <h1 style={titleStyle}>
        <input
          type="text"
          value={event.hero.groomName}
          onChange={(e) => handleNameChange(e, 'groomName')}
          style={{ ...titleStyle, border: 'none', background: 'transparent', textAlign: 'center' }}
        />
        {' & '}
        <input
          type="text"
          value={event.hero.brideName}
          onChange={(e) => handleNameChange(e, 'brideName')}
          style={{ ...titleStyle, border: 'none', background: 'transparent', textAlign: 'center' }}
        />
      </h1>
      <p style={subtitleStyle}>
        <input
          type="text"
          value={event.hero.date}
          onChange={(e) => handleNameChange(e, 'date')}
          style={{ ...subtitleStyle, border: 'none', background: 'transparent', textAlign: 'center' }}
        />
      </p>
    </div>
  );
};

export default Hero;

