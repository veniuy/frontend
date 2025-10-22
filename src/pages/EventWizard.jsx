// src/pages/EventWizard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Calendar, 
  MapPin, 
  Palette,
  ArrowLeft,
  ArrowRight,
  Check,
  Crown,
  Loader2
} from 'lucide-react';
import { api, API_BASE_URL } from '../lib/api';

const EventWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [templates, setTemplates] = useState([]);
  
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    event_date: '',    // viene del input datetime-local -> "YYYY-MM-DDTHH:MM"
    location: '',
    template_id: null
  });

  const steps = [
    { id: 1, title: 'Información Básica', icon: Calendar },
    { id: 2, title: 'Detalles del Evento', icon: MapPin },
    { id: 3, title: 'Diseño y Template', icon: Palette }
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setTemplatesLoading(true);
    try {
      // Usamos el backend real SIEMPRE (evita el 304/HTML del frontend host)
      const res = await fetch(`${API_BASE_URL}/templates`, {
        credentials: 'include',
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // data.templates puede ser objeto {categoria: []} o array []
      let templatesList = [];
      if (data.templates && typeof data.templates === 'object' && !Array.isArray(data.templates)) {
        Object.values(data.templates).forEach(catList => {
          if (Array.isArray(catList)) templatesList = templatesList.concat(catList);
        });
      } else if (Array.isArray(data.templates)) {
        templatesList = data.templates;
      }

      setTemplates(templatesList);

      if (templatesList.length > 0) {
        setEventData(prev => ({ ...prev, template_id: templatesList[0].id }));
      }
    } catch (err) {
      console.error('Error loading templates:', err);
      setError('Error al cargar las plantillas. Usando plantillas por defecto.');

      // Fallback con imágenes ABSOLUTAS para evitar 404 en /templates/*.jpg
      const fallbackTemplates = [
        {
          id: 1,
          name: 'Clásico',
          description: 'Diseño elegante y atemporal',
          category: 'wedding',
          is_premium: false,
          preview_image_url: 'https://picsum.photos/seed/classic/600/400'
        },
        {
          id: 2,
          name: 'Elegante',
          description: 'Estilo sofisticado y minimalista',
          category: 'wedding',
          is_premium: false,
          preview_image_url: 'https://picsum.photos/seed/elegant/600/400'
        },
        {
          id: 3,
          name: 'Moderno',
          description: 'Diseño contemporáneo y vibrante',
          category: 'wedding',
          is_premium: true,
          preview_image_url: 'https://picsum.photos/seed/modern/600/400'
        }
      ];
      setTemplates(fallbackTemplates);
      setEventData(prev => ({ ...prev, template_id: fallbackTemplates[0].id }));
    } finally {
      setTemplatesLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return eventData.title.trim() !== '';
      case 2:
        return eventData.event_date !== '' && eventData.location.trim() !== '';
      case 3:
        return !!eventData.template_id;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      setError(null);
    } else {
      setError('Por favor complete todos los campos requeridos');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError(null);
  };

  const createEvent = async () => {
    if (!validateStep(3)) {
      setError('Por favor complete todos los campos requeridos');
      return;
    }

    try {
      setLoading(true);

      // Enviar 'event_date' para que el backend lo parsee (_parse_event_datetime)
      const payload = {
        title: eventData.title,
        description: eventData.description,
        event_date: eventData.event_date, // ej: "2025-10-21T18:30"
        location: eventData.location,
        template_id: eventData.template_id
      };

      // api.post devuelve el body ya parseado
      const eventResponse = await api.post('/events', payload);

      // Extraemos el id de distintas formas según cómo responda el backend
      const eventId =
        eventResponse?.event?.id ??
        eventResponse?.data?.event?.id ??
        eventResponse?.id ??
        eventResponse?.event_id;

      if (!eventId) {
        console.warn('Respuesta de creación de evento sin id reconocible:', eventResponse);
      }

      // Intentar crear el diseño asociado (no bloquea el flujo si falla)
      try {
        await api.post('/designs', {
          template_id: eventData.template_id,
          event_id: eventId,
          design_name: `Diseño para ${eventData.title}`
        });
      } catch (designErr) {
        console.warn('No se pudo crear el diseño automáticamente:', designErr);
      }

      // Redirigir al editor del evento
      if (eventId) {
        navigate(`/app/events/${eventId}/editor`);
      } else {
        // Fallback: ir al listado
        navigate('/app/events');
      }
    } catch (err) {
      setError(
        err?.body?.error ||
        err?.body?.message ||
        'Error creando el evento. Por favor intente nuevamente.'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear Nueva Invitación
          </h1>
          <p className="text-gray-600">
            Sigue estos 3 pasos para crear tu invitación perfecta
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}>
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      Paso {step.id}
                    </p>
                    <p className={`text-xs ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <Step1 
                eventData={eventData} 
                onChange={handleInputChange} 
              />
            )}
            
            {currentStep === 2 && (
              <Step2 
                eventData={eventData} 
                onChange={handleInputChange} 
              />
            )}
            
            {currentStep === 3 && (
              <Step3 
                eventData={eventData} 
                onChange={handleInputChange}
                templates={templates}
                templatesLoading={templatesLoading}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          {currentStep < 3 ? (
            <Button onClick={nextStep}>
              Siguiente
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={createEvent} disabled={loading}>
              {loading ? 'Creando...' : 'Crear Invitación'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Paso 1: Información Básica
const Step1 = ({ eventData, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Título del Evento *</Label>
        <Input
          id="title"
          placeholder="Ej: Boda Ana & Lucas"
          value={eventData.title}
          onChange={(e) => onChange('title', e.target.value)}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Este será el título principal de tu invitación
        </p>
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          placeholder="Describe tu evento especial..."
          value={eventData.description}
          onChange={(e) => onChange('description', e.target.value)}
          className="mt-1"
          rows={4}
        />
        <p className="text-sm text-gray-500 mt-1">
          Una breve descripción que aparecerá en tu invitación
        </p>
      </div>
    </div>
  );
};

// Paso 2: Detalles del Evento
const Step2 = ({ eventData, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="event_date">Fecha y Hora del Evento *</Label>
        <Input
          id="event_date"
          type="datetime-local"
          value={eventData.event_date}
          onChange={(e) => onChange('event_date', e.target.value)}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Selecciona cuándo será tu evento
        </p>
      </div>

      <div>
        <Label htmlFor="location">Ubicación del Evento *</Label>
        <Input
          id="location"
          placeholder="Ej: Salón de Eventos El Jardín"
          value={eventData.location}
          onChange={(e) => onChange('location', e.target.value)}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Dónde se realizará tu evento
        </p>
      </div>
    </div>
  );
};

// Paso 3: Diseño y Template
const Step3 = ({ eventData, onChange, templates, templatesLoading }) => {
  if (templatesLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Cargando plantillas...</span>
        </div>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <Palette className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay plantillas disponibles</h3>
          <p className="text-gray-600">Por favor, contacta al administrador.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>Selecciona una Plantilla *</Label>
        <p className="text-sm text-gray-500 mb-4">
          Elige el diseño que mejor represente tu evento
        </p>
        
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`
                border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md
                ${eventData.template_id === template.id 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => onChange('template_id', template.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    {template.is_premium && (
                      <Badge className="bg-yellow-500 text-white flex items-center">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{template.description}</p>
                  {template.category && (
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  )}
                </div>
                
                {eventData.template_id === template.id && (
                  <Badge className="bg-blue-500 ml-4">
                    <Check className="w-3 h-3 mr-1" />
                    Seleccionado
                  </Badge>
                )}
              </div>
              
              {/* Preview */}
              <div className="mt-3 h-32 bg-gray-100 rounded border overflow-hidden">
                {template.preview_image_url ? (
                  <img 
                    src={template.preview_image_url} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextSibling) {
                        e.currentTarget.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ display: template.preview_image_url ? 'none' : 'flex' }}
                >
                  <div className="text-center">
                    <Palette className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <span className="text-gray-500 text-sm">Vista previa del template</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventWizard;
