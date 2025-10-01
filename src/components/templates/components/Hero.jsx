import React from 'react';

const Hero = ({ event, setEvent, colors = {}, fonts = {} }) => {
  const defaultFonts = {
    heading: 'Playfair Display, serif',
    title: 'Playfair Display, serif',
    subtitle: 'Inter, sans-serif'
  };
  const mergedFonts = { ...defaultFonts, ...fonts };
  
  const defaultColors = {
    primary: '#f0f0f0',
    textPrimary: '#333',
    accent: '#8B4513',
    textSecondary: '#666'
  };
  const mergedColors = { ...defaultColors, ...colors };

  // Estilos inline para el componente Hero
  const heroStyle = {
    backgroundColor: mergedColors.primary || '#f0f0f0',
    color: mergedColors.textPrimary || '#333',
    fontFamily: mergedFonts.heading || 'Arial, sans-serif',
    padding: '50px 20px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '3em',
    marginBottom: '10px',
    fontFamily: mergedFonts.title || 'Georgia, serif',
    color: mergedColors.accent || '#8B4513',
  };

  const subtitleStyle = {
    fontSize: '1.5em',
    fontFamily: mergedFonts.subtitle || 'Arial, sans-serif',
    color: mergedColors.textSecondary || '#666',
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

