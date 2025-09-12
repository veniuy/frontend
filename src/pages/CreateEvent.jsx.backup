import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, Users, CreditCard, Building, Smartphone } from 'lucide-react';
import { api } from '../lib/api';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    address: '',
    max_guests: 50,
    contact_info: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get('/plans');
      setPlans(response.data.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = async () => {
    setLoading(true);
    try {
      // Crear evento en estado DRAFT
      const eventResponse = await api.post('/events', {
        ...eventData,
        plan_id: selectedPlan.id
      });
      
      const eventId = eventResponse.data.event.id;
      
      // Iniciar checkout
      const checkoutResponse = await api.post(`/events/${eventId}/checkout`, {
        payment_method: paymentMethod,
        plan_id: selectedPlan.id
      });
      
      if (paymentMethod === 'mercadopago') {
        // Crear preferencia de MercadoPago
        const preferenceResponse = await api.post('/payments/mercadopago/create-preference', {
          event_id: eventId
        });
        
        // Redirigir a MercadoPago
        window.location.href = preferenceResponse.data.init_point;
      } else if (paymentMethod === 'bank_transfer') {
        // Mostrar información bancaria
        navigate(`/payment/transfer/${eventId}`, { 
          state: { 
            bankInfo: checkoutResponse.data.data.bank_info,
            paymentReference: checkoutResponse.data.data.payment_reference
          }
        });
      } else if (paymentMethod === 'abitab' || paymentMethod === 'redpagos') {
        // Mostrar código de pago
        navigate(`/payment/code/${eventId}`, {
          state: {
            paymentCode: checkoutResponse.data.data.payment_code,
            method: paymentMethod,
            expiresAt: checkoutResponse.data.data.expires_at
          }
        });
      }
      
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error al crear el evento. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Información del Evento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Nombre del Evento</Label>
          <Input
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            placeholder="Ej: Boda de María y Juan"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            placeholder="Describe tu evento especial..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="event_date">Fecha y Hora</Label>
            <Input
              id="event_date"
              name="event_date"
              type="datetime-local"
              value={eventData.event_date}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <Label htmlFor="max_guests">Máximo de Invitados</Label>
            <Input
              id="max_guests"
              name="max_guests"
              type="number"
              value={eventData.max_guests}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="location">Ubicación</Label>
          <Input
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            placeholder="Ej: Salón de Eventos Paradise"
          />
        </div>
        
        <div>
          <Label htmlFor="address">Dirección Completa</Label>
          <Input
            id="address"
            name="address"
            value={eventData.address}
            onChange={handleInputChange}
            placeholder="Ej: Av. 18 de Julio 1234, Montevideo"
          />
        </div>
        
        <div>
          <Label htmlFor="contact_info">Información de Contacto</Label>
          <Input
            id="contact_info"
            name="contact_info"
            value={eventData.contact_info}
            onChange={handleInputChange}
            placeholder="Ej: María - 099 123 456"
          />
        </div>
        
        <Button 
          onClick={() => setStep(2)} 
          className="w-full"
          disabled={!eventData.title || !eventData.event_date}
        >
          Continuar
        </Button>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Selecciona tu Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`cursor-pointer transition-all ${
                selectedPlan?.id === plan.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {plan.name}
                  <Badge variant={plan.name === 'Free' ? 'secondary' : 'default'}>
                    ${plan.price} {plan.currency}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Hasta {plan.max_guests} invitados
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {plan.max_images} imágenes
                  </li>
                  {plan.premium_templates && (
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Plantillas Premium</Badge>
                    </li>
                  )}
                  {plan.remove_watermark && (
                    <li className="flex items-center gap-2">
                      <Badge variant="outline">Sin Marca de Agua</Badge>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={() => setStep(1)}>
            Atrás
          </Button>
          <Button 
            onClick={() => setStep(3)} 
            disabled={!selectedPlan}
            className="flex-1"
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Método de Pago</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <Card 
            className={`cursor-pointer transition-all ${
              paymentMethod === 'mercadopago' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setPaymentMethod('mercadopago')}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <CreditCard className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Tarjeta de Crédito/Débito</h3>
                <p className="text-sm text-gray-600">Pago seguro con MercadoPago</p>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${
              paymentMethod === 'bank_transfer' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setPaymentMethod('bank_transfer')}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <Building className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Transferencia Bancaria</h3>
                <p className="text-sm text-gray-600">Transferencia directa a nuestra cuenta</p>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${
              paymentMethod === 'abitab' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setPaymentMethod('abitab')}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <Smartphone className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Abitab</h3>
                <p className="text-sm text-gray-600">Pago en efectivo en locales Abitab</p>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${
              paymentMethod === 'redpagos' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setPaymentMethod('redpagos')}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <Smartphone className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Red Pagos</h3>
                <p className="text-sm text-gray-600">Pago en efectivo en locales Red Pagos</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={() => setStep(2)}>
            Atrás
          </Button>
          <Button 
            onClick={handleCreateEvent} 
            disabled={!paymentMethod || loading}
            className="flex-1"
          >
            {loading ? 'Procesando...' : `Crear Evento - $${selectedPlan?.price} ${selectedPlan?.currency}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Evento</h1>
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step > stepNumber ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default CreateEvent;

