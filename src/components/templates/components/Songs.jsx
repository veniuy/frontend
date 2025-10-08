import React, { useState } from 'react';
import StyledButton from '../../ui/StyledButton';
import { Card, CardContent } from '../../ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Iconos
const MusicIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CheckCircleIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22,4 12,14.01 9,11.01"></polyline>
  </svg>
);

// Componente para campos con etiqueta
const Labeled = ({ label, children, fontFamily, required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium" style={{ fontFamily }}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const Songs = ({ event, setEvent, colors, fontPrimary, fontSecondary, isQuinceanera, styles = {} }) => {
  const [showSongForm, setShowSongForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [songData, setSongData] = useState({
    songName: '',
    artist: '',
    genre: '',
    userName: '',
    comment: ''
  });

  const [errors, setErrors] = useState({});

  // Géneros musicales disponibles
  const genres = [
    'Pop',
    'Rock',
    'Reggaeton',
    'Cumbia',
    'Folklore',
    'Electrónica',
    'Balada',
    'Salsa',
    'Bachata',
    'Merengue',
    'Tango',
    'Cuarteto',
    'Otro'
  ];

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!songData.songName.trim() || songData.songName.trim().length < 2) {
      newErrors.songName = 'El nombre de la canción es requerido (mínimo 2 caracteres)';
    }

    if (!songData.artist.trim() || songData.artist.trim().length < 2) {
      newErrors.artist = 'El nombre del artista es requerido (mínimo 2 caracteres)';
    }

    if (!songData.userName.trim() || songData.userName.trim().length < 2) {
      newErrors.userName = 'Tu nombre es requerido (mínimo 2 caracteres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular delay de envío
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Guardar sugerencia en el estado del evento
      const newSuggestion = {
        ...songData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      setEvent((prevEvent) => ({
        ...prevEvent,
        songSuggestions: [...(prevEvent.songSuggestions || []), newSuggestion]
      }));

      // Mostrar éxito
      setShowSuccess(true);
      
      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        setShowSuccess(false);
        setShowSongForm(false);
        resetForm();
      }, 2000);

    } catch (error) {
      console.error('Error al enviar sugerencia:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setSongData({
      songName: '',
      artist: '',
      genre: '',
      userName: '',
      comment: ''
    });
    setErrors({});
  };

  // Cerrar modal
  const closeModal = () => {
    setShowSongForm(false);
    resetForm();
  };

  return (
    <>
      {/* ===== SUGERENCIAS MUSICALES ===== */}
      <section className="py-16 bg-white" dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-2xl font-medium mb-6 tracking-wide"
            style={{ color: colors.ink, fontFamily: fontSecondary }}
          >
            ¿QUÉ CANCIONES NO PUEDEN FALTAR?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: colors.body, fontFamily: fontPrimary }}>
            {isQuinceanera ? "¡Ayudame sugiriendo las canciones que pensás que no pueden faltar!" : "¡Ayudanos sugiriendo las canciones que pensás que no pueden faltar!"}
          </p>
          <StyledButton
            colors={colors}
            onClick={() => setShowSongForm(true)}
          >
            <MusicIcon className="w-4 h-4 mr-2" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
            Sugerir canción
          </StyledButton>
        </div>
      </section>

      {/* Modal del Formulario de Canciones */}
      {showSongForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium" style={{ color: colors.ink, fontFamily: fontPrimary }}>
                  Sugerir Canción
                </h3>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>

              {showSuccess ? (
                <div className="text-center py-8">
                  <CheckCircleIcon className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
                  <h4 className="text-lg font-medium mb-2" style={{ color: colors.ink, fontFamily: fontPrimary }}>
                    ¡Sugerencia Enviada!
                  </h4>
                  <p style={{ color: colors.body, fontFamily: fontPrimary }}>
                    Gracias por tu sugerencia musical. {isQuinceanera ? "¡La tendré en cuenta!" : "¡La tendremos en cuenta!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" dir="ltr">
                  <Labeled label="Nombre de la canción" fontFamily={fontPrimary} required>
                    <Input
                      value={songData.songName}
                      onChange={(e) => setSongData({ ...songData, songName: e.target.value })}
                      placeholder="Ej: Despacito"
                      style={{ fontFamily: fontPrimary }}
                      className={errors.songName ? 'border-red-500' : ''}
                    />
                    {errors.songName && (
                      <p className="text-red-500 text-sm mt-1">{errors.songName}</p>
                    )}
                  </Labeled>

                  <Labeled label="Artista" fontFamily={fontPrimary} required>
                    <Input
                      value={songData.artist}
                      onChange={(e) => setSongData({ ...songData, artist: e.target.value })}
                      placeholder="Ej: Luis Fonsi"
                      style={{ fontFamily: fontPrimary }}
                      className={errors.artist ? 'border-red-500' : ''}
                    />
                    {errors.artist && (
                      <p className="text-red-500 text-sm mt-1">{errors.artist}</p>
                    )}
                  </Labeled>

                  <Labeled label="Género musical" fontFamily={fontPrimary}>
                    <select
                      value={songData.genre}
                      onChange={(e) => setSongData({ ...songData, genre: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      style={{ fontFamily: fontPrimary }}
                    >
                      <option value="">Selecciona un género (opcional)</option>
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  </Labeled>

                  <Labeled label="Tu nombre" fontFamily={fontPrimary} required>
                    <Input
                      value={songData.userName}
                      onChange={(e) => setSongData({ ...songData, userName: e.target.value })}
                      placeholder="Tu nombre completo"
                      style={{ fontFamily: fontPrimary }}
                      className={errors.userName ? 'border-red-500' : ''}
                    />
                    {errors.userName && (
                      <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                    )}
                  </Labeled>

                  <Labeled label="Comentario" fontFamily={fontPrimary}>
                    <Textarea
                      value={songData.comment}
                      onChange={(e) => setSongData({ ...songData, comment: e.target.value })}
                      placeholder="¿Por qué esta canción no puede faltar? (opcional)"
                      rows={3}
                      style={{ fontFamily: fontPrimary }}
                    />
                  </Labeled>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeModal}
                      className="flex-1"
                      style={{ fontFamily: fontPrimary }}
                    >
                      Cancelar
                    </Button>
                    <StyledButton
                      type="submit"
                      colors={colors}
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <MusicIcon className="w-4 h-4 mr-2" />
                          Enviar Sugerencia
                        </>
                      )}
                    </StyledButton>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Songs;
