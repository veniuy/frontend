import React from 'react';

const Hero = ({ event = {}, setEvent, colors = {}, fonts = {} }) => {
  // Asegurar que event.hero siempre tenga estructura
  const safeHero = {
    logo: '',
    groomName: '',
    brideName: '',
    date: '',
    ...event.hero,
  };

  const defaultFonts = {
    heading: 'Playfair Display, serif',
    title: 'Playfair Display, serif',
    subtitle: 'Inter, sans-serif',
  };
  const mergedFonts = { ...defaultFonts, ...fonts };

  const defaultColors = {
    primary: '#f0f0f0',
    textPrimary: '#333',
    accent: '#8B4513',
    textSecondary: '#666',
  };
  const mergedColors = { ...defaultColors, ...colors };

  // Estilos inline para el componente Hero
  const heroStyle = {
    backgroundColor: mergedColors.primary,
    color: mergedColors.textPrimary,
    fontFamily: mergedFonts.heading,
    padding: '50px 20px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '3em',
    marginBottom: '10px',
    fontFamily: mergedFonts.title,
    color: mergedColors.accent,
  };

  const subtitleStyle = {
    fontSize: '1.5em',
    fontFamily: mergedFonts.subtitle,
    color: mergedColors.textSecondary,
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
        ...safeHero,
        [field]: e.target.value,
      },
    });
  };

  return (
    <div style={heroStyle}>
      {safeHero.logo && (
        <img
          src={safeHero.logo}
          alt="Logo"
          style={logoStyle}
        />
      )}
      <h1 style={titleStyle}>
        <input
          type="text"
          value={safeHero.groomName}
          onChange={(e) => handleNameChange(e, 'groomName')}
          style={{ ...titleStyle, border: 'none', background: 'transparent', textAlign: 'center' }}
        />
        {' & '}
        <input
          type="text"
          value={safeHero.brideName}
          onChange={(e) => handleNameChange(e, 'brideName')}
          style={{ ...titleStyle, border: 'none', background: 'transparent', textAlign: 'center' }}
        />
      </h1>
      <p style={subtitleStyle}>
        <input
          type="text"
          value={safeHero.date}
          onChange={(e) => handleNameChange(e, 'date')}
          style={{ ...subtitleStyle, border: 'none', background: 'transparent', textAlign: 'center' }}
        />
      </p>
    </div>
  );
};

export default Hero;
