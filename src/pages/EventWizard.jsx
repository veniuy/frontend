import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import { api } from '../lib/api';

const EventWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    template_id: 'classic'
  });

  const steps = [
    { id: 1, title: 'Información Básica', icon: Calendar },
    { id: 2, title: 'Detalles del Evento', icon: MapPin },
    { id: 3, title: 'Diseño y Template', icon: Palette }
  ];

  const templates = [
    {
      id: 'classic',
      name: 'Clásico',
      description: 'Diseño elegante y atemporal',
      preview: '/templates/classic-preview.jpg'
    },
    {
      id: 'elegant',
      name: 'Elegante',
      description: 'Estilo sofisticado y minimalista',
      preview: '/templates/elegant-preview.jpg'
    },
    {
      id: 'modern',
      name: 'Moderno',
      description: 'Diseño contemporáneo y vibrante',
      preview: '/templates/modern-preview.jpg'
    }
  ];

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
        return eventData.template_id !== '';
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
      const response = await api.post('/events', {
        title: eventData.title,
        description: eventData.description,
        date_time: eventData.event_date,
        location: eventData.location,
        template_id: eventData.template_id
      });

      const eventId = response.data?.id || response.id;
      navigate(`/dashboard/events/${eventId}/builder`);
    } catch (err) {
      setError('Error creando el evento. Por favor intente nuevamente.');
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
const Step3 = ({ eventData, onChange, templates }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label>Selecciona un Template *</Label>
        <p className="text-sm text-gray-500 mb-4">
          Elige el diseño que mejor represente tu evento
        </p>
        
        <div className="grid gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`
                border-2 rounded-lg p-4 cursor-pointer transition-all
                ${eventData.template_id === template.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => onChange('template_id', template.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </div>
                
                {eventData.template_id === template.id && (
                  <Badge className="bg-blue-500">
                    Seleccionado
                  </Badge>
                )}
              </div>
              
              {/* Preview placeholder */}
              <div className="mt-3 h-32 bg-gray-100 rounded border flex items-center justify-center">
                <span className="text-gray-500 text-sm">Vista previa del template</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventWizard;
