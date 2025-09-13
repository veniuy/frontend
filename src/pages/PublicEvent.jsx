import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users,
  Heart,
  Share2,
  Download
} from 'lucide-react';
import { api } from '../lib/api';

const PublicEvent = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [slug]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/public/${slug}`);
      setEvent(response.data || response);
      
      // Actualizar meta tags para SEO
      if (response.data || response) {
        const eventData = response.data || response;
        document.title = eventData.seo_title || eventData.title;
        
        // Meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', eventData.seo_desc || eventData.description || '');
        }
      }
    } catch (err) {
      setError('Evento no encontrado o no disponible');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shareEvent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copiar URL al clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('URL copiada al portapapeles');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando invitación...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Invitación no encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'Esta invitación no existe o no está disponible públicamente.'}
          </p>
        </div>
      </div>
    );
  }

  // Renderizar según el template
  const renderTemplate = () => {
    switch (event.template_id) {
      case 'classic':
        return <ClassicTemplate event={event} />;
      case 'elegant':
        return <ElegantTemplate event={event} />;
      case 'modern':
        return <ModernTemplate event={event} />;
      default:
        return <ClassicTemplate event={event} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ 
      backgroundColor: event.background_color || '#ffffff',
      color: event.text_color || '#000000',
      fontFamily: event.font_family || 'Inter'
    }}>
      {/* Botones de acción flotantes */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={shareEvent}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Contenido del evento */}
      {renderTemplate()}
    </div>
  );
};

// Template Clásico
const ClassicTemplate = ({ event }) => {
  const hosts = event.hosts ? JSON.parse(event.hosts) : [];
  const gallery = event.gallery ? JSON.parse(event.gallery) : [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {event.cover_image_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.cover_image_url})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        )}
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {event.title}
          </h1>
          
          {hosts.length > 0 && (
            <div className="text-xl md:text-2xl mb-8">
              {hosts.map((host, index) => (
                <span key={index}>
                  {host.name}
                  {index < hosts.length - 1 && ' & '}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(event.event_date).toLocaleDateString('es-ES')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{new Date(event.event_date).toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles del Evento */}
      <div className="px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Información */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Detalles del Evento</h2>
            
            {event.description && (
              <p className="text-lg mb-6 leading-relaxed">
                {event.description}
              </p>
            )}

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 mt-1 text-pink-500" />
                <div>
                  <p className="font-semibold">Fecha</p>
                  <p>{new Date(event.event_date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1 text-pink-500" />
                <div>
                  <p className="font-semibold">Hora</p>
                  <p>{new Date(event.event_date).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
              </div>

              {event.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-pink-500" />
                  <div>
                    <p className="font-semibold">Ubicación</p>
                    <p>{event.location}</p>
                    {event.address && <p className="text-sm text-gray-600">{event.address}</p>}
                  </div>
                </div>
              )}

              {event.dress_code && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 mt-1 text-pink-500" />
                  <div>
                    <p className="font-semibold">Código de Vestimenta</p>
                    <p>{event.dress_code}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Galería */}
          {gallery.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Galería</h2>
              <div className="grid grid-cols-2 gap-4">
                {gallery.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Galería ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      {event.cta_type && event.cta_target && (
        <div className="px-4 py-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">¡Confirma tu Asistencia!</h3>
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => window.open(event.cta_target, '_blank')}
              >
                Confirmar Asistencia
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-8 text-center text-sm text-gray-500">
        <p>Invitación creada con ❤️</p>
      </div>
    </div>
  );
};

// Template Elegante (simplificado)
const ElegantTemplate = ({ event }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-serif mb-8">{event.title}</h1>
        <div className="border-t border-b border-gray-300 py-8 mb-8">
          <p className="text-lg">{new Date(event.event_date).toLocaleDateString('es-ES')}</p>
          <p className="text-lg">{event.location}</p>
        </div>
        {event.description && (
          <p className="text-lg leading-relaxed">{event.description}</p>
        )}
      </div>
    </div>
  );
};

// Template Moderno (simplificado)
const ModernTemplate = ({ event }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-400">
      <div className="max-w-4xl mx-auto px-4 py-16 text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-8">{event.title}</h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 mb-8">
            <p className="text-2xl mb-4">{new Date(event.event_date).toLocaleDateString('es-ES')}</p>
            <p className="text-xl">{event.location}</p>
          </div>
          {event.description && (
            <p className="text-lg leading-relaxed max-w-2xl mx-auto">{event.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicEvent;
