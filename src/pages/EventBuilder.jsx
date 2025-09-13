import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  Building, 
  Smartphone,
  Eye,
  CheckCircle,
  AlertCircle,
  Upload,
  ExternalLink
} from 'lucide-react';
import { api } from '../lib/api';

const EventBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [checklist, setChecklist] = useState({ ok: false, missing: [] });
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [proofFile, setProofFile] = useState(null);

  useEffect(() => {
    if (id) {
      fetchEvent();
      fetchPlans();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${id}`);
      setEvent(response.data || response);
    } catch (err) {
      setError('Error cargando evento');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await api.get('/plans');
      setPlans(response.data?.plans || response.plans || []);
    } catch (err) {
      console.error('Error cargando planes:', err);
    }
  };

  const saveEvent = async (updates = {}) => {
    try {
      setSaving(true);
      const updatedData = { ...event, ...updates };
      const response = await api.put(`/events/${id}`, updatedData);
      setEvent(response.data || response);
      
      // Verificar checklist después de guardar
      checkReadiness();
    } catch (err) {
      setError('Error guardando evento');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const checkReadiness = async () => {
    try {
      const response = await api.post(`/events/${id}/ready`);
      setChecklist(response.data || response);
    } catch (err) {
      console.error('Error verificando checklist:', err);
    }
  };

  const requestPublication = async () => {
    try {
      const response = await api.post(`/events/${id}/request-publish`, {
        payment_method: paymentMethod,
        plan_id: selectedPlan?.id
      });
      
      setPaymentInfo(response.data || response);
      setEvent(prev => ({ ...prev, status: 'PENDING_PAYMENT' }));
      setShowPaymentModal(false);
    } catch (err) {
      setError('Error solicitando publicación');
      console.error(err);
    }
  };

  const uploadProof = async () => {
    if (!proofFile) return;
    
    try {
      const formData = new FormData();
      formData.append('file', proofFile);
      
      await api.post(`/events/${id}/upload-proof`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setEvent(prev => ({ ...prev, payment_proof_url: 'uploaded' }));
      setProofFile(null);
    } catch (err) {
      setError('Error subiendo comprobante');
      console.error(err);
    }
  };

  const publishEvent = async () => {
    try {
      const response = await api.post(`/events/${id}/publish`);
      setEvent(prev => ({ ...prev, status: 'PUBLISHED', slug: response.slug }));
      navigate(`/p/${response.slug}`);
    } catch (err) {
      setError('Error publicando evento');
      console.error(err);
    }
  };

  const openPreview = () => {
    window.open(`/dashboard/events/${id}/preview`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando evento...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Evento no encontrado</h2>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <StatusBadge status={event.status} />
                <Button variant="outline" size="sm" onClick={openPreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Vista Previa
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              {event.status === 'READY' && (
                <Button onClick={() => setShowPaymentModal(true)}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Publicar
                </Button>
              )}
              
              {event.status === 'PAID' && (
                <Button onClick={publishEvent}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Finalizar Publicación
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Payment Status Banner */}
        {event.status === 'PENDING_PAYMENT' && paymentInfo && (
          <PaymentBanner 
            paymentInfo={paymentInfo}
            event={event}
            onUploadProof={uploadProof}
            proofFile={proofFile}
            setProofFile={setProofFile}
          />
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2">
            <EventEditor 
              event={event}
              onSave={saveEvent}
              saving={saving}
              disabled={event.status === 'PUBLISHED'}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PublicationChecklist 
              checklist={checklist}
              onCheck={checkReadiness}
            />
            
            {event.status === 'PUBLISHED' && (
              <PublishedInfo event={event} />
            )}
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <PaymentModal
            plans={plans}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onConfirm={requestPublication}
            onClose={() => setShowPaymentModal(false)}
          />
        )}
      </div>
    </div>
  );
};

// Componente para mostrar el estado del evento
const StatusBadge = ({ status }) => {
  const statusConfig = {
    DRAFT: { label: 'Borrador', color: 'bg-gray-100 text-gray-800' },
    READY: { label: 'Listo', color: 'bg-blue-100 text-blue-800' },
    PENDING_PAYMENT: { label: 'Pendiente de Pago', color: 'bg-yellow-100 text-yellow-800' },
    PAID: { label: 'Pagado', color: 'bg-green-100 text-green-800' },
    PUBLISHED: { label: 'Publicado', color: 'bg-green-100 text-green-800' }
  };

  const config = statusConfig[status] || statusConfig.DRAFT;

  return (
    <Badge className={config.color}>
      {config.label}
    </Badge>
  );
};

// Componente del editor principal
const EventEditor = ({ event, onSave, saving, disabled }) => {
  const [formData, setFormData] = useState(event);

  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleSave = () => {
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editor de Evento</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="design">Diseño</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div>
              <Label htmlFor="title">Título del Evento</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                disabled={disabled}
              />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                disabled={disabled}
              />
            </div>

            <div>
              <Label htmlFor="event_date">Fecha y Hora</Label>
              <Input
                id="event_date"
                type="datetime-local"
                value={formData.event_date?.slice(0, 16) || ''}
                onChange={(e) => handleChange('event_date', e.target.value)}
                disabled={disabled}
              />
            </div>

            <div>
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
                disabled={disabled}
              />
            </div>
          </TabsContent>

          <TabsContent value="design" className="space-y-4">
            <div>
              <Label htmlFor="template_id">Template</Label>
              <select
                id="template_id"
                value={formData.template_id || 'classic'}
                onChange={(e) => handleChange('template_id', e.target.value)}
                disabled={disabled}
                className="w-full p-2 border rounded"
              >
                <option value="classic">Clásico</option>
                <option value="elegant">Elegante</option>
                <option value="modern">Moderno</option>
              </select>
            </div>

            <div>
              <Label htmlFor="cover_image_url">Imagen de Portada (URL)</Label>
              <Input
                id="cover_image_url"
                value={formData.cover_image_url || ''}
                onChange={(e) => handleChange('cover_image_url', e.target.value)}
                disabled={disabled}
              />
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div>
              <Label htmlFor="hosts">Anfitriones (JSON)</Label>
              <Textarea
                id="hosts"
                value={formData.hosts || ''}
                onChange={(e) => handleChange('hosts', e.target.value)}
                disabled={disabled}
                placeholder='[{"name": "Ana", "role": "Novia"}, {"name": "Lucas", "role": "Novio"}]'
              />
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <div>
              <Label htmlFor="seo_title">Título SEO</Label>
              <Input
                id="seo_title"
                value={formData.seo_title || ''}
                onChange={(e) => handleChange('seo_title', e.target.value)}
                disabled={disabled}
              />
            </div>

            <div>
              <Label htmlFor="seo_desc">Descripción SEO</Label>
              <Textarea
                id="seo_desc"
                value={formData.seo_desc || ''}
                onChange={(e) => handleChange('seo_desc', e.target.value)}
                disabled={disabled}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} disabled={saving || disabled}>
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente del checklist de publicación
const PublicationChecklist = ({ checklist, onCheck }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Checklist de Publicación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {checklist.ok ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>¡Listo para publicar!</span>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-2">Elementos faltantes:</p>
              <ul className="space-y-1">
                {checklist.missing?.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <Button variant="outline" size="sm" onClick={onCheck} className="w-full mt-4">
          Verificar Checklist
        </Button>
      </CardContent>
    </Card>
  );
};

// Componente del banner de pago pendiente
const PaymentBanner = ({ paymentInfo, event, onUploadProof, proofFile, setProofFile }) => {
  return (
    <Alert className="mb-6 border-yellow-200 bg-yellow-50">
      <CreditCard className="h-4 w-4 text-yellow-600" />
      <AlertDescription>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-yellow-800">Pago Pendiente</h3>
            <p className="text-yellow-700">
              Referencia: <strong>{paymentInfo.payment_ref}</strong>
            </p>
            <p className="text-yellow-700">
              Monto: <strong>{paymentInfo.amount} {paymentInfo.currency}</strong>
            </p>
          </div>
          
          <div className="bg-white p-3 rounded border">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {paymentInfo.instructions}
            </pre>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setProofFile(e.target.files[0])}
              className="text-sm"
            />
            <Button size="sm" onClick={onUploadProof} disabled={!proofFile}>
              <Upload className="w-4 h-4 mr-2" />
              Subir Comprobante
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

// Modal de selección de pago
const PaymentModal = ({ 
  plans, 
  selectedPlan, 
  setSelectedPlan, 
  paymentMethod, 
  setPaymentMethod, 
  onConfirm, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Publicar Evento</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Seleccionar Plan</Label>
            <div className="space-y-2 mt-2">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-3 border rounded cursor-pointer ${
                    selectedPlan?.id === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{plan.name}</span>
                    <span className="text-lg font-bold">{plan.price} {plan.currency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Método de Pago</Label>
            <div className="space-y-2 mt-2">
              {[
                { value: 'transferencia', label: 'Transferencia Bancaria' },
                { value: 'abitab', label: 'Abitab' },
                { value: 'redpagos', label: 'RedPagos' }
              ].map((method) => (
                <label key={method.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={!selectedPlan || !paymentMethod}
            className="flex-1"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

// Información del evento publicado
const PublishedInfo = ({ event }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          Evento Publicado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">URL Pública:</p>
          <a
            href={`/p/${event.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {window.location.origin}/p/{event.slug}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventBuilder;
