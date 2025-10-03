import React from 'react';

const Instagram = ({ event, setEvent, colors = {}, fonts = {}, fontPrimary, fontSecondary }) => {
  const localFonts = { primary: fontPrimary, secondary: fontSecondary };
  const defaultFonts = {
    primary: 'Arial, sans-serif',
    secondary: 'Georgia, serif',
  };
  const mergedFonts = { ...defaultFonts, ...fonts, ...localFonts };
  const defaultColors = {
    primary: '#333',
    secondary: '#666',
    background: '#f0f0f0',
    text: '#333'
  };
  const mergedColors = { ...defaultColors, ...colors };

  const handleHashtagChange = (e) => {
    setEvent({
      ...event,
      instagram: {
        ...event.instagram,
        hashtag: e.target.value,
      },
    });
  };

  const currentHashtag = event?.instagram?.hashtag || '';

  return (
    <div style={{
      backgroundColor: mergedColors.background || '#f0f0f0',
      padding: '20px',
      fontFamily: mergedFonts.primary || 'Arial, sans-serif',
      color: mergedColors.text || '#333',
    }}>
      <h2 style={{
        color: mergedColors.primary || '#333',
        fontFamily: mergedFonts.secondary || 'Georgia, serif',
        textAlign: 'center',
        marginBottom: '15px',
      }}>Instagram Feed</h2>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
      }}>
        <label htmlFor="instagramHashtag" style={{
          marginRight: '10px',
          fontSize: '1.1em',
          fontWeight: 'bold',
        }}>Hashtag:</label>
        <input
          id="instagramHashtag"
          type="text"
          value={currentHashtag}
          onChange={handleHashtagChange}
          placeholder="Escribe tu hashtag aquí"
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: `1px solid ${mergedColors.secondary || '#ccc'}`,
            fontSize: '1em',
            width: '200px',
            backgroundColor: mergedColors.inputBackground || '#fff',
            color: mergedColors.inputText || '#333',
          }}
        />
      </div>
      <p style={{
        textAlign: 'center',
        fontSize: '0.9em',
        color: mergedColors.secondaryText || '#666',
      }}>
        {currentHashtag ? `Mostrando publicaciones con #${currentHashtag}` : 'Introduce un hashtag para ver el feed.'}
      </p>
      {/* Aquí se integraría la lógica para mostrar el feed de Instagram real */}
      <div style={{
        marginTop: '20px',
        border: `1px dashed ${mergedColors.borderColor || '#ccc'}`,
        padding: '20px',
        textAlign: 'center',
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: mergedColors.placeholderText || '#999',
      }}>
        {currentHashtag ? 'Contenido del feed de Instagram aquí...' : 'Esperando hashtag...'
}
      </div>
    </div>
  );
};

export default Instagram;

