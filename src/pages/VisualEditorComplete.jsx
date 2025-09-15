// VisualEditorComplete.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// shadcn/ui
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';

// icons
import {
  ArrowLeft, Save, Eye, Palette, Type, Image as ImageIcon, Layout, Settings,
  Upload, Download, Undo, Redo, Copy, Trash2, Move, RotateCw, ZoomIn, ZoomOut,
  Grid, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Plus,
  Minus, Check, X, Wand2, Heart, MapPin, Calendar, Clock, Music, Camera,
  Share2, Users, Gift, Phone, Mail, Instagram, Facebook, CheckCircle,
  ChevronDown, Church, PartyPopper, CreditCard, Edit3, Smartphone, Monitor,
  Tablet, ExternalLink, DollarSign, Home, Utensils, AlertCircle
} from 'lucide-react';

const VisualEditorComplete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ====== Estado del evento (datos editables completos) ======
  const [event, setEvent] = useState({
    id: id || '1',
    couple: {
      bride: 'María',
      groom: 'Juan'
    },
    date: '15 de Marzo, 2024',
    time: '17:00',
    ceremony: {
      venue: 'Iglesia San Miguel',
      address: 'Calle Mayor 123, Madrid',
      time: '17:00'
    },
    reception: {
      venue: 'Jardín Botánico',
      address: 'Av. Libertador 456, Madrid',
      time: '19:30'
    },
    description: 'Celebra con nosotros este día tan especial',
    hashtag: '#MariaYJuan2024',
    template: 'elegant',
    colors: {
      primary: '#e91e63',
      secondary: '#ffc0cb',
      background: '#ffffff',
      text: '#333333',
      accent: '#8e44ad'
    },
    fonts: {
      primary: 'Playfair Display',
      secondary: 'Inter'
    },
    // Secciones extra
    registry: {
      enabled: true,
      title: 'Mesa de Regalos',
      description: 'Tu presencia es el mejor regalo, pero si deseas obsequiarnos algo, aquí tienes algunas opciones',
      stores: [
        { name: 'Crate & Barrel', url: 'https://crateandbarrel.com', color: '#f8f8f8' },
        { name: 'Bloomingdales', url: 'https://bloomingdales.com', color: '#4a4a4a' }
      ]
    },
    accommodations: {
      enabled: true,
      title: 'Alojamientos',
      description: 'Hemos reservado habitaciones en estos hoteles para tu comodidad',
      hotels: [
        {
          name: 'The Lyle Hotel',
          address: '221 Baker Street, Nashville, TN, 37201',
          description: 'Para tu comodidad, hemos reservado un bloque de habitaciones.',
          bookingUrl: 'https://booking.com/lyle-hotel',
          image: '/api/placeholder/300/200'
        },
        {
          name: 'Hotel Boutique Central',
          address: '456 Music Row, Nashville, TN, 37203',
          description: 'Ubicación céntrica con todas las comodidades.',
          bookingUrl: 'https://booking.com/boutique-central',
          image: '/api/placeholder/300/200'
        }
      ]
    },
    bankAccount: {
      enabled: true,
      title: 'Transferencia Bancaria',
      description: 'Si prefieres hacer una transferencia bancaria',
      bank: 'Banco Santander',
      accountNumber: '1234-5678-9012-3456',
      accountHolder: 'María García & Juan Pérez',
      cbu: '0720123456789012345678',
      alias: 'BODA.MARIA.JUAN'
    }
  });

  // ====== Estados generales ======
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Editor / UI
  const [activeTab, setActiveTab] = useState('design');
  const [selectedElement, setSelectedElement] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedTemplate, setSelectedTemplate] = useState('elegant');
  const [viewMode, setViewMode] = useState('desktop'); // desktop | tablet | mobile
  const [editMode, setEditMode] = useState(false);

  // Popups
  const [showRSVP, setShowRSVP] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showAccommodations, setShowAccommodations] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  // Audio / otros
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // RSVP avanzado
  const [rsvpData, setRsvpData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: 1,
    guestNames: [''],
    dietaryRestrictions: {
      vegetarian: false,
      vegan: false,
      celiac: false,
      allergies: '',
      other: ''
    },
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Refs
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Paletas y fuentes
  const colorPalettes = [
    { name: 'Clásico', colors: ['#1a1a1a', '#ffffff', '#f5f5f5', '#e5e5e5', '#cccccc'] },
    { name: 'Elegante', colors: ['#2c3e50', '#ecf0f1', '#e74c3c', '#f39c12', '#9b59b6'] },
    { name: 'Moderno', colors: ['#34495e', '#3498db', '#2ecc71', '#f1c40f', '#e67e22'] },
    { name: 'Romántico', colors: ['#8e44ad', '#e91e63', '#ffc0cb', '#fff0f5', '#ffe4e1'] },
    { name: 'Natural', colors: ['#27ae60', '#2ecc71', '#f39c12', '#e67e22', '#d35400'] }
  ];
  const fontFamilies = [
    'Inter', 'Helvetica Neue', 'Arial', 'Georgia', 'Times New Roman',
    'Playfair Display', 'Montserrat', 'Open Sans', 'Lato', 'Roboto'
  ];
  const templates = [
    { id: 'elegant', name: 'Elegante', description: 'Diseño sofisticado y minimalista' },
    { id: 'romantic', name: 'Romántico', description: 'Colores suaves y florales' },
    { id: 'modern', name: 'Moderno', description: 'Diseño contemporáneo y vibrante' },
    { id: 'classic', name: 'Clásico', description: 'Estilo tradicional y atemporal' }
  ];

  // ====== Countdown ======
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const targetDate = new Date('2024-03-15T17:00:00');
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ====== Acciones / handlers ======
  const saveEvent = async () => {
    try {
      setSaving(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      console.log('Evento guardado:', event);
    } catch (err) {
      setError('Error guardando el evento');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleColorChange = (property, color) => {
    setEvent(prev => ({ ...prev, colors: { ...prev.colors, [property]: color } }));
  };

  const handleFontChange = (type, fontFamily) => {
    setEvent(prev => ({ ...prev, fonts: { ...prev.fonts, [type]: fontFamily } }));
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    setEvent(prev => ({ ...prev, template: templateId }));
  };

  // RSVP
  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    console.log('RSVP Data:', rsvpData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowRSVP(false);
      setRsvpData({
        name: '', email: '', phone: '', attendance: '', guests: 1,
        guestNames: [''], dietaryRestrictions: {
          vegetarian: false, vegan: false, celiac: false, allergies: '', other: ''
        }, message: ''
      });
    }, 3000);
  };

  const updateGuestNames = (count) => {
    const names = [...rsvpData.guestNames];
    while (names.length < count) names.push('');
    while (names.length > count) names.pop();
    setRsvpData(prev => ({ ...prev, guests: count, guestNames: names }));
  };

  // ====== Subcomponentes ======
  const TimeCell = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div
        className="font-light leading-none text-2xl sm:text-4xl md:text-6xl"
        style={{ color: event.colors.primary }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="opacity-90 text-xs sm:text-sm" style={{ color: event.colors.text }}>
        {label}
      </div>
    </div>
  );

  const RSVPModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: event.colors.primary }}>
              Confirmar Asistencia
            </h2>
            <Button variant="ghost" onClick={() => setShowRSVP(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {showSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">¡Confirmación Recibida!</h3>
              <p className="text-gray-600">Gracias por confirmar tu asistencia.</p>
            </div>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={rsvpData.phone}
                  onChange={(e) => setRsvpData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div>
                <Label>¿Asistirás? *</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={rsvpData.attendance === 'yes'}
                      onChange={(e) => setRsvpData(prev => ({ ...prev, attendance: e.target.value }))}
                      className="mr-2"
                    />
                    Sí, asistiré
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={rsvpData.attendance === 'no'}
                      onChange={(e) => setRsvpData(prev => ({ ...prev, attendance: e.target.value }))}
                      className="mr-2"
                    />
                    No podré asistir
                  </label>
                </div>
              </div>

              {rsvpData.attendance === 'yes' && (
                <>
                  <div>
                    <Label htmlFor="guests">Número de invitados (incluyéndote)</Label>
                    <select
                      id="guests"
                      value={rsvpData.guests}
                      onChange={(e) => updateGuestNames(parseInt(e.target.value))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  {rsvpData.guests > 1 && (
                    <div>
                      <Label>Nombres de los acompañantes</Label>
                      {rsvpData.guestNames.slice(1).map((name, index) => (
                        <Input
                          key={index}
                          placeholder={`Acompañante ${index + 1}`}
                          value={name}
                          onChange={(e) => {
                            const names = [...rsvpData.guestNames];
                            names[index + 1] = e.target.value;
                            setRsvpData(prev => ({ ...prev, guestNames: names }));
                          }}
                          className="mt-2"
                        />
                      ))}
                    </div>
                  )}

                  <div>
                    <Label className="flex items-center mb-3">
                      <Utensils className="h-4 w-4 mr-2" />
                      Restricciones Alimentarias
                    </Label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={rsvpData.dietaryRestrictions.vegetarian}
                          onChange={(e) => setRsvpData(prev => ({
                            ...prev,
                            dietaryRestrictions: { ...prev.dietaryRestrictions, vegetarian: e.target.checked }
                          }))}
                          className="mr-2"
                        />
                        Vegetariano
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={rsvpData.dietaryRestrictions.vegan}
                          onChange={(e) => setRsvpData(prev => ({
                            ...prev,
                            dietaryRestrictions: { ...prev.dietaryRestrictions, vegan: e.target.checked }
                          }))}
                          className="mr-2"
                        />
                        Vegano
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={rsvpData.dietaryRestrictions.celiac}
                          onChange={(e) => setRsvpData(prev => ({
                            ...prev,
                            dietaryRestrictions: { ...prev.dietaryRestrictions, celiac: e.target.checked }
                          }))}
                          className="mr-2"
                        />
                        Celíaco
                      </label>
                    </div>
                    <div className="mt-3">
                      <Label htmlFor="allergies">Alergias alimentarias</Label>
                      <Input
                        id="allergies"
                        placeholder="Especifica alergias (nueces, mariscos, etc.)"
                        value={rsvpData.dietaryRestrictions.allergies}
                        onChange={(e) => setRsvpData(prev => ({
                          ...prev,
                          dietaryRestrictions: { ...prev.dietaryRestrictions, allergies: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="mt-3">
                      <Label htmlFor="other">Otras restricciones</Label>
                      <Input
                        id="other"
                        placeholder="Otras restricciones alimentarias"
                        value={rsvpData.dietaryRestrictions.other}
                        onChange={(e) => setRsvpData(prev => ({
                          ...prev,
                          dietaryRestrictions: { ...prev.dietaryRestrictions, other: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="message">Mensaje (opcional)</Label>
                <Textarea
                  id="message"
                  placeholder="Déjanos un mensaje..."
                  value={rsvpData.message}
                  onChange={(e) => setRsvpData(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" style={{ backgroundColor: event.colors.primary }}>
                  Confirmar Asistencia
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowRSVP(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  const GiftsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: event.colors.primary }}>
              {event.registry.title}
            </h2>
            <Button variant="ghost" onClick={() => setShowGifts(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="text-center mb-8">
            <Gift className="h-16 w-16 mx-auto mb-4" style={{ color: event.colors.primary }} />
            <p className="text-gray-600 text-lg">{event.registry.description}</p>
          </div>

          <div className="space-y-4">
            {event.registry.stores.map((store, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="w-full p-6 h-auto flex items-center justify-between"
                style={{ borderColor: event.colors.primary }}
                onClick={() => window.open(store.url, '_blank')}
              >
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-lg mr-4 flex items-center justify-center"
                    style={{ backgroundColor: store.color }}
                  >
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">{store.name}</span>
                </div>
                <ExternalLink className="h-5 w-5" />
              </Button>
            ))}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Contribución Monetaria
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Si prefieres hacer una contribución monetaria, puedes usar estos datos:
              </p>
              <Button variant="outline" onClick={() => setShowBankDetails(true)} className="w-full">
                Ver Datos Bancarios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AccommodationsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: event.colors.primary }}>
              {event.accommodations.title}
            </h2>
            <Button variant="ghost" onClick={() => setShowAccommodations(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="text-center mb-8">
            <Home className="h-16 w-16 mx-auto mb-4" style={{ color: event.colors.primary }} />
            <p className="text-gray-600 text-lg">{event.accommodations.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {event.accommodations.hotels.map((hotel, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video bg-gray-2 00 relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgNzVIMTc1VjEyNUgxMjVWNzVaIiBzdHJva2U9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K';
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
                  <p className="text-sm mb-4">{hotel.description}</p>
                  <Button
                    className="w-full"
                    style={{ backgroundColor: event.colors.secondary }}
                    onClick={() => window.open(hotel.bookingUrl, '_blank')}
                  >
                    Reservar Ahora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BankDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold" style={{ color: event.colors.primary }}>
              {event.bankAccount.title}
            </h2>
            <Button variant="ghost" onClick={() => setShowBankDetails(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Banco</Label>
              <p className="font-semibold">{event.bankAccount.bank}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600">Titular</Label>
              <p className="font-semibold">{event.bankAccount.accountHolder}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600">Número de Cuenta</Label>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="font-mono">{event.bankAccount.accountNumber}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(event.bankAccount.accountNumber)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600">CBU</Label>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="font-mono text-sm">{event.bankAccount.cbu}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(event.bankAccount.cbu)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600">Alias</Label>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="font-semibold">{event.bankAccount.alias}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(event.bankAccount.alias)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <p className="text-sm text-blue-700">
                Por favor, incluye tu nombre en el concepto de la transferencia para poder identificarla.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ====== Render de invitación (templates) ======
  const renderInvitation = () => {
    const styles = {
      elegant: {
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        primaryColor: event.colors.primary,
        secondaryColor: event.colors.secondary,
        textColor: event.colors.text,
        fontFamily: event.fonts.primary
      },
      romantic: {
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        primaryColor: '#e91e63',
        secondaryColor: '#ffc0cb',
        textColor: '#333',
        fontFamily: 'Playfair Display'
      },
      modern: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        primaryColor: '#3498db',
        secondaryColor: '#2ecc71',
        textColor: '#fff',
        fontFamily: 'Inter'
      },
      classic: {
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        primaryColor: '#8e44ad',
        secondaryColor: '#e74c3c',
        textColor: '#333',
        fontFamily: 'Georgia'
      }
    };

    const currentStyle = styles[selectedTemplate] || styles.elegant;

    const getResponsiveClasses = () => {
      switch (viewMode) {
        case 'mobile':
          return 'max-w-sm mx-auto';
        case 'tablet':
          return 'max-w-2xl mx-auto';
        default:
          return 'max-w-6xl mx-auto';
      }
    };

    return (
      <div
        className={`min-h-screen relative overflow-hidden ${getResponsiveClasses()}`}
        style={{
          background: currentStyle.background,
          fontFamily: currentStyle.fontFamily,
          color: currentStyle.textColor
        }}
      >
        {/* HERO */}
        <section className="min-h-screen flex items-center justify-center relative px-4">
          {editMode && (
            <div className="absolute top-4 right-4 z-20">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/90"
                onClick={() => setSelectedElement('hero')}
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </div>
          )}

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1
              className={`font-light mb-4 tracking-wider ${viewMode === 'mobile' ? 'text-4xl' : 'text-6xl md:text-8xl'}`}
              style={{ color: currentStyle.primaryColor }}
              onClick={() => editMode && setSelectedElement('bride-name')}
            >
              {event.couple.bride.toUpperCase()}
            </h1>

            <div className="flex items-center justify-center my-8">
              <div className="h-px w-16 bg-gray-400"></div>
              <Heart
                className={`mx-4 ${viewMode === 'mobile' ? 'w-6 h-6' : 'w-8 h-8'}`}
                style={{ color: currentStyle.secondaryColor }}
                fill="currentColor"
              />
              <div className="h-px w-16 bg-gray-400"></div>
            </div>

            <h1
              className={`font-light mb-8 tracking-wider ${viewMode === 'mobile' ? 'text-4xl' : 'text-6xl md:text-8xl'}`}
              style={{ color: currentStyle.primaryColor }}
              onClick={() => editMode && setSelectedElement('groom-name')}
            >
              {event.couple.groom.toUpperCase()}
            </h1>

            <p
              className={`font-light mb-12 tracking-wide ${viewMode === 'mobile' ? 'text-lg' : 'text-xl md:text-2xl'}`}
              style={{ color: currentStyle.textColor }}
            >
              ¡NOS CASAMOS!
            </p>

            <div className="animate-bounce">
              <ChevronDown
                className={`mx-auto ${viewMode === 'mobile' ? 'w-6 h-6' : 'w-8 h-8'}`}
                style={{ color: currentStyle.primaryColor }}
              />
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="py-8 md:py-16" style={{ backgroundColor: currentStyle.primaryColor }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2
              className={`font-light mb-6 md:mb-8 tracking-wide text-white ${viewMode === 'mobile' ? 'text-xl' : 'text-2xl md:text-3xl'}`}
            >
              Faltan para nuestro gran día
            </h2>

            <div className={`flex items-center justify-center ${viewMode === 'mobile' ? 'gap-4' : 'gap-8'}`}>
              <TimeCell value={timeLeft.days} label="días" />
              <div className={`font-light ${viewMode === 'mobile' ? 'text-3xl' : 'text-5xl'}`}>:</div>
              <TimeCell value={timeLeft.hours} label="horas" />
              <div className={`font-light ${viewMode === 'mobile' ? 'text-3xl' : 'text-5xl'}`}>:</div>
              <TimeCell value={timeLeft.minutes} label="min" />
              <div className={`font-light ${viewMode === 'mobile' ? 'text-3xl' : 'text-5xl'}`}>:</div>
              <TimeCell value={timeLeft.seconds} label="seg" />
            </div>
          </div>
        </section>

        {/* DETALLES */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Ceremonia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="font-semibold">{event.ceremony.venue}</div>
                <div className="text-sm text-gray-600">{event.ceremony.address}</div>
                <div className="text-sm">Hora: {event.ceremony.time}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PartyPopper className="w-5 h-5" />
                  Recepción
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="font-semibold">{event.reception.venue}</div>
                <div className="text-sm text-gray-600">{event.reception.address}</div>
                <div className="text-sm">Hora: {event.reception.time}</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA / Acciones */}
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto grid gap-4 sm:grid-cols-2">
            <Button onClick={() => setShowRSVP(true)} className="w-full" style={{ backgroundColor: event.colors.primary }}>
              Confirmar asistencia
            </Button>
            {event.registry?.enabled && (
              <Button variant="outline" onClick={() => setShowGifts(true)} className="w-full">
                Mesa de regalos
              </Button>
            )}
            {event.accommodations?.enabled && (
              <Button variant="outline" onClick={() => setShowAccommodations(true)} className="w-full">
                Alojamientos
              </Button>
            )}
            {event.bankAccount?.enabled && (
              <Button variant="outline" onClick={() => setShowBankDetails(true)} className="w-full">
                Datos bancarios
              </Button>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 text-center opacity-80">
          <div className="text-sm">
            {event.description}
          </div>
          {event.hashtag && (
            <div className="mt-2 text-sm" style={{ color: currentStyle.primaryColor }}>
              {event.hashtag}
            </div>
          )}
        </footer>
      </div>
    );
  };

  // ====== RETURN principal ======
  return (
    <>
      {/* Modales */}
      {showRSVP && <RSVPModal />}
      {showGifts && <GiftsModal />}
      {showAccommodations && <AccommodationsModal />}
      {showBankDetails && <BankDetailsModal />}

      {/* Barra simple de edición (opcional) */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver
          </Button>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setViewMode('mobile')}>
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setViewMode('tablet')}>
              <Tablet className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setViewMode('desktop')}>
              <Monitor className="w-4 h-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={() => setEditMode(v => !v)}>
              <Edit3 className="w-4 h-4 mr-1" /> {editMode ? 'Editar: ON' : 'Editar: OFF'}
            </Button>

            <Button size="sm" onClick={saveEvent} disabled={saving} style={{ backgroundColor: event.colors.primary }}>
              <Save className="w-4 h-4 mr-1" /> {saving ? 'Guardando…' : 'Guardar'}
            </Button>
          </div>
        </div>
      </div>

      {/* Invitación */}
      {renderInvitation()}
    </>
  );
};

export default VisualEditorComplete;
