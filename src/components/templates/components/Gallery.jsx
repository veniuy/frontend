import React, { useState } from 'react';

const Gallery = ({ event, setEvent, colors, fonts }) => {
  const [editingImage, setEditingImage] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim() !== '') {
      const updatedGallery = event.galleryImages ? [...event.galleryImages, newImageUrl] : [newImageUrl];
      setEvent({ ...event, galleryImages: updatedGallery });
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    const updatedGallery = event.galleryImages.filter((_, i) => i !== index);
    setEvent({ ...event, galleryImages: updatedGallery });
  };

  const handleEditImage = (index) => {
    setEditingImage(index);
    setNewImageUrl(event.galleryImages[index]);
  };

  const handleSaveEdit = () => {
    if (newImageUrl.trim() !== '') {
      const updatedGallery = event.galleryImages.map((img, i) => 
        i === editingImage ? newImageUrl : img
      );
      setEvent({ ...event, galleryImages: updatedGallery });
      setEditingImage(null);
      setNewImageUrl('');
    }
  };

  const galleryContainerStyle = {
    fontFamily: fonts.body,
    color: colors.text,
    backgroundColor: colors.background,
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '900px',
    margin: '20px auto'
  };

  const titleStyle = {
    color: colors.primary,
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2.5em'
  };

  const imageGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  };

  const imageCardStyle = {
    border: `1px solid ${colors.secondary}`,
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'relative'
  };

  const imageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    display: 'block'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: colors.secondaryBackground || colors.background,
    borderTop: `1px solid ${colors.secondary}`
  };

  const buttonStyle = {
    padding: '8px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: colors.primary,
    color: colors.buttonText || '#fff',
    fontSize: '0.9em'
  };

  const inputGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center'
  };

  const inputStyle = {
    flexGrow: 1,
    padding: '10px',
    borderRadius: '5px',
    border: `1px solid ${colors.secondary}`,
    maxWidth: '400px'
  };

  return (
    <div style={galleryContainerStyle}>
      <h2 style={titleStyle}>Galería de Imágenes</h2>

      <div style={inputGroupStyle}>
        <input
          type="text"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder="URL de la nueva imagen"
          style={inputStyle}
        />
        {editingImage !== null ? (
          <button onClick={handleSaveEdit} style={buttonStyle}>Guardar Edición</button>
        ) : (
          <button onClick={handleAddImage} style={buttonStyle}>Añadir Imagen</button>
        )}
      </div>

      <div style={imageGridStyle}>
        {event.galleryImages && event.galleryImages.map((image, index) => (
          <div key={index} style={imageCardStyle}>
            <img src={image} alt={`Gallery Image ${index + 1}`} style={imageStyle} />
            <div style={buttonContainerStyle}>
              <button onClick={() => handleEditImage(index)} style={{ ...buttonStyle, backgroundColor: colors.secondary }}>Editar</button>
              <button onClick={() => handleRemoveImage(index)} style={{ ...buttonStyle, backgroundColor: colors.danger || '#dc3545' }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

