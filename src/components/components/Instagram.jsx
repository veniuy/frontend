import React from 'react';

const Instagram = ({ event, setEvent, colors, fonts }) => {
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
      backgroundColor: colors?.background || '#f0f0f0',
      padding: '20px',
      fontFamily: fonts?.primary || 'Arial, sans-serif',
      color: colors?.text || '#333',
    }}>
      <h2 style={{
        color: colors?.primary || '#333',
        fontFamily: fonts?.secondary || 'Georgia, serif',
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
            border: `1px solid ${colors?.secondary || '#ccc'}`,
            fontSize: '1em',
            width: '200px',
            backgroundColor: colors?.inputBackground || '#fff',
            color: colors?.inputText || '#333',
          }}
        />
      </div>
      <p style={{
        textAlign: 'center',
        fontSize: '0.9em',
        color: colors?.secondaryText || '#666',
      }}>
        {currentHashtag ? `Mostrando publicaciones con #${currentHashtag}` : 'Introduce un hashtag para ver el feed.'}
      </p>
      {/* Aquí se integraría la lógica para mostrar el feed de Instagram real */}
      <div style={{
        marginTop: '20px',
        border: `1px dashed ${colors?.borderColor || '#ccc'}`,
        padding: '20px',
        textAlign: 'center',
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors?.placeholderText || '#999',
      }}>
        {currentHashtag ? 'Contenido del feed de Instagram aquí...' : 'Esperando hashtag...'
}
      </div>
    </div>
  );
};

export default Instagram;

