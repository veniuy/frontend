import React, { useState } from 'react';
import StyledButton from '../../ui/StyledButton';
import { Card, CardContent } from '../../ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

const PlusIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const CheckCircleIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22,4 12,14.01 9,11.01"></polyline>
  </svg>
);

const Songs = ({ event, setEvent, colors, fontPrimary, fontSecondary, isQuinceanera, styles = {} }) => {
  const [showSongForm, setShowSongForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [songs, setSongs] = useState(['']);

  // Agregar nueva canción
  const addSong = () => {
    setSongs([...songs, '']);
  };

  // Actualizar canción específica
  const updateSong = (index, value) => {
    const newSongs = [...songs];
    newSongs[index] = value;
    setSongs(newSongs);
  };

  // Eliminar canción
  const removeSong = (index) => {
    if (songs.length > 1) {
      const newSongs = songs.filter((_, i) => i !== index);
      setSongs(newSongs);
    }
  };

  // Validar formulario
  const validateForm = () => {
    const validSongs = songs.filter(song => song.trim().length > 0);
    return validSongs.length > 0;
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

      // Filtrar canciones vacías y guardar sugerencias
      const validSongs = songs.filter(song => song.trim().length > 0);
      
      const newSuggestions = validSongs.map(song => ({
        song: song.trim(),
        id: Date.now() + Math.random(),
        createdAt: new Date().toISOString()
      }));

      setEvent((prevEvent) => ({
        ...prevEvent,
        songSuggestions: [...(prevEvent.songSuggestions || []), ...newSuggestions]
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
      console.error('Error al enviar sugerencias:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setSongs(['']);
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
                    ¡Sugerencias Enviadas!
                  </h4>
                  <p style={{ color: colors.body, fontFamily: fontPrimary }}>
                    Gracias por tus sugerencias musicales. {isQuinceanera ? "¡Las tendré en cuenta!" : "¡Las tendremos en cuenta!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" dir="ltr">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium" style={{ fontFamily: fontPrimary, color: colors.ink }}>
                      ¿Qué canción o artista o banda no puede faltar?
                    </label>
                    
                    {songs.map((song, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={song}
                          onChange={(e) => updateSong(index, e.target.value)}
                          placeholder=""
                          style={{ fontFamily: fontPrimary }}
                          className="flex-1"
                        />
                        {songs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSong(index)}
                            className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addSong}
                      className="flex items-center gap-2 text-sm hover:opacity-80 transition-colors"
                      style={{ 
                        color: colors.primary, 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        fontFamily: fontPrimary
                      }}
                    >
                      <PlusIcon className="w-4 h-4" />
                      Agregar otra canción
                    </button>
                  </div>

                  <div className="pt-4">
                    <StyledButton
                      type="submit"
                      colors={colors}
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Enviando...
                        </>
                      ) : (
                        'Enviar'
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
