// VisualEditorComplete.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// UI (shadcn)
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';

// Icons
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

  // ====================== ESTADO EVENTO ======================
  const [event, setEvent] = useState({
    id: id || '1',
    couple: { bride: 'María', groom: 'Juan' },
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
    fonts: { primary: 'Playfair Display', secondary: 'Inter' },
    // Extensiones adicionales
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

  // ====================== ESTADOS EDITOR/UI ======================
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('design');
  const [selectedElement, setSelectedElement] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [history, setHistory] = useState([null]); // índice 0 reservado
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedTemplate, setSelectedTemplate] = useState('elegant');
  const [viewMode, setViewMode] = useState('desktop'); // desktop | tablet | mobile
  const [editMode, setEditMode] = useState(false);

  // Popups / Modales
  const [showRSVP, setShowRSVP] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showAccommodations, setShowAccommodations] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  // Audio/otros
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
    dietaryRestrictions: { vegetarian: false, vegan: false, celiac: false, allergies: '', other: '' },
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Refs
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Paletas / Fuentes / Templates
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

  // ====================== COUNTDOWN ======================
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

  // ====================== HISTORIAL (UNDO/REDO) ======================
  // Inicializa historial con el estado inicial
  useEffect(() => {
    if (historyIndex === -1) {
      const initial = JSON.parse(JSON.stringify(event));
      setHistory([null, initial]);
      setHistoryIndex(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper para actualizar evento + push al historial
  const updateEvent = (updater) => {
    setEvent(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      // recorta futuro si hubo undos
      const base = history.slice(0, historyIndex + 1);
      const snapshot = JSON.parse(JSON.stringify(next));
      setHistory([...base, snapshot]);
      setHistoryIndex(prevIdx => prevIdx + 1);
      return next;
    });
  };

  const handleUndo = () => {
    if (historyIndex > 1) {
      const idx = historyIndex - 1;
      setHistoryIndex(idx);
      setEvent(JSON.parse(JSON.stringify(history[idx])));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const idx = historyIndex + 1;
      setHistoryIndex(idx);
      setEvent(JSON.parse(JSON.stringify(history[idx])));
    }
  };

  // ====================== ACCIONES VARIAS ======================
  const saveEvent = async () => {
    try {
      setError(null);
      setSaving(true);
      // simulación persistencia:
      await new Promise(r => setTimeout(r, 600));
      console.log('Evento guardado:', event);
    } catch (err) {
      setError('Error guardando el evento');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleColorChange = (property, color) => {
    updateEvent(prev => ({ ...prev, colors: { ...prev.colors, [property]: color } }));
  };

  const handleFontChange = (type, fontFamily) => {
    updateEvent(prev => ({ ...prev, fonts: { ...prev.fonts, [type]: fontFamily } }));
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    updateEvent(prev => ({ ...prev, template: templateId }));
  };

  const handleInputChange = (path, value) => {
    // path ejemplo: "couple.bride" o "ceremony.venue"
    updateEvent(prev => {
      const clone = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = clone;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return clone;
    });
  };

  const handleImageUpload = (e, path) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result || '';
      handleInputChange(path, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleZoomIn = () => setZoom(z => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom(z => Math.max(z - 10, 50));
  const previewInvitation = () => window.open(`/p/${event.id}`, '_blank');

  // ====================== SUBCOMPONENTES ======================
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

  // ----- Modales -----
  const RSVPModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: event.colors.primary }}>Confirmar Asistencia</h2>
            <Button variant="ghost" onClick={() => setShowRSVP(false)}><X className="h-5 w-5" /></Button>
          </div>

          {showSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">¡Confirmación Recibida!</h3>
              <p className="text-gray-600">Gracias por confirmar tu asistencia.</p>
            </div>
          ) : (
            <form onSubmit={(e) => {
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
            }} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input id="name" value={rsvpData.name} onChange={(e) => setRsvpData(p => ({ ...p, name: e.target.value }))} required />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={rsvpData.email} onChange={(e) => setRsvpData(p => ({ ...p, email: e.target.value }))} required />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" value={rsvpData.phone} onChange={(e) => setRsvpData(p => ({ ...p, phone: e.target.value }))} />
              </div>

              <div>
                <Label>¿Asistirás? *</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center">
                    <input type="radio" name="attendance" value="yes" checked={rsvpData.attendance === 'yes'}
                      onChange={(e) => setRsvpData(p => ({ ...p, attendance: e.target.value }))} className="mr-2" />
                    Sí, asistiré
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="attendance" value="no" checked={rsvpData.attendance === 'no'}
                      onChange={(e) => setRsvpData(p => ({ ...p, attendance: e.target.value }))} className="mr-2" />
                    No podré asistir
                  </label>
                </div>
              </div>

              {rsvpData.attendance === 'yes' && (
                <>
                  <div>
                    <Label htmlFor="guests">Número de invitados (incluyéndote)</Label>
                    <select id="guests" value={rsvpData.guests}
                      onChange={(e) => {
                        const count = parseInt(e.target.value);
                        const names = [...rsvpData.guestNames];
                        while (names.length < count) names.push('');
                        while (names.length > count) names.pop();
                        setRsvpData(p => ({ ...p, guests: count, guestNames: names }));
                      }}
                      className="w-full mt-1 p-2 border border-gray-300 rounded">
                      {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                    </select>
                  </div>

                  {rsvpData.guests > 1 && (
                    <div>
                      <Label>Nombres de los acompañantes</Label>
                      {rsvpData.guestNames.slice(1).map((name, index) => (
                        <Input key={index} placeholder={`Acompañante ${index + 1}`} value={name}
                          onChange={(e) => {
                            const names = [...rsvpData.guestNames];
                            names[index + 1] = e.target.value;
                            setRsvpData(p => ({ ...p, guestNames: names }));
                          }} className="mt-2" />
                      ))}
                    </div>
                  )}

                  <div>
                    <Label className="flex items-center mb-3"><Utensils className="h-4 w-4 mr-2" />Restricciones Alimentarias</Label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" checked={rsvpData.dietaryRestrictions.vegetarian}
                          onChange={(e) => setRsvpData(p => ({ ...p, dietaryRestrictions: { ...p.dietaryRestrictions, vegetarian: e.target.checked } }))} className="mr-2" />
                        Vegetariano
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" checked={rsvpData.dietaryRestrictions.vegan}
                          onChange={(e) => setRsvpData(p => ({ ...p, dietaryRestrictions: { ...p.dietaryRestrictions, vegan: e.target.checked } }))} className="mr-2" />
                        Vegano
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" checked={rsvpData.dietaryRestrictions.celiac}
                          onChange={(e) => setRsvpData(p => ({ ...p, dietaryRestrictions: { ...p.dietaryRestrictions, celiac: e.target.checked } }))} className="mr-2" />
                        Celíaco
                      </label>
                    </div>
                    <div className="mt-3">
                      <Label htmlFor="allergies">Alergias alimentarias</Label>
                      <Input id="allergies" placeholder="Especifica alergias..." value={rsvpData.dietaryRestrictions.allergies}
                        onChange={(e) => setRsvpData(p => ({ ...p, dietaryRestrictions: { ...p.dietaryRestrictions, allergies: e.target.value } }))} />
                    </div>
                    <div className="mt-3">
                      <Label htmlFor="other">Otras restricciones</Label>
                      <Input id="other" placeholder="Otras restricciones alimentarias" value={rsvpData.dietaryRestrictions.other}
                        onChange={(e) => setRsvpData(p => ({ ...p, dietaryRestrictions: { ...p.dietaryRestrictions, other: e.target.value } }))} />
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="message">Mensaje (opcional)</Label>
                <Textarea id="message" placeholder="Déjanos un mensaje..." rows={3}
                  value={rsvpData.message} onChange={(e) => setRsvpData(p => ({ ...p, message: e.target.value }))} />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" style={{ backgroundColor: event.colors.primary }}>
                  Confirmar Asistencia
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowRSVP(false)}>Cancelar</Button>
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
            <h2 className="text-2xl font-bold" style={{ color: event.colors.primary }}>{event.registry.title}</h2>
            <Button variant="ghost" onClick={() => setShowGifts(false)}><X className="h-5 w-5" /></Button>
          </div>

          <div className="text-center mb-8">
            <Gift className="h-16 w-16 mx-auto mb-4" style={{ color: event.colors.primary }} />
            <p className="text-gray-600 text-lg">{event.registry.description}</p>
          </div>

          <div className="space-y-4">
            {event.registry.stores.map((store, i) => (
              <Button key={i} variant="outline" size="lg"
                className="w-full p-6 h-auto flex items-center justify-between"
                style={{ borderColor: event.colors.primary }}
                onClick={() => window.open(store.url, '_blank')}>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg mr-4 flex items-center justify-center" style={{ backgroundColor: store.color }}>
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-medium">{store.name}</span>
                </div>
                <ExternalLink className="h-5 w-5" />
              </Button>
            ))}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center"><DollarSign className="h-5 w-5 mr-2" />Contribución Monetaria</h3>
              <p className="text-sm text-gray-600 mb-3">Si prefieres hacer una contribución monetaria, puedes usar estos datos:</p>
              <Button variant="outline" onClick={() => setShowBankDetails(true)} className="w-full">Ver Datos Bancarios</Button>
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
            <h2 className="text-2xl font-bold" style={{ color: event.colors.primary }}>{event.accommodations.title}</h2>
            <Button variant="ghost" onClick={() => setShowAccommodations(false)}><X className="h-5 w-5" /></Button>
          </div>

          <div className="text-center mb-8">
            <Home className="h-16 w-16 mx-auto mb-4" style={{ color: event.colors.primary }} />
            <p className="text-gray-600 text-lg">{event.accommodations.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {event.accommodations.hotels.map((hotel, idx) => (
              <Card key={idx} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgNzVIMTc1VjEyNUgxMjVWNzVaIiBzdHJva2U9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K';
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>
                  <p className="text-sm mb-4">{hotel.description}</p>
                  <Button className="w-full" style={{ backgroundColor: event.colors.secondary }} onClick={() => window.open(hotel.bookingUrl, '_blank')}>
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
            <h2 className="text-xl font-bold" style={{ color: event.colors.primary }}>{event.bankAccount.title}</h2>
            <Button variant="ghost" onClick={() => setShowBankDetails(false)}><X className="h-5 w-5" /></Button>
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
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(event.bankAccount.accountNumber)}><Copy className="h-4 w-4" /></Button>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">CBU</Label>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="font-mono text-sm">{event.bankAccount.cbu}</span>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(event.bankAccount.cbu)}><Copy className="h-4 w-4" /></Button>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Alias</Label>
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="font-semibold">{event.bankAccount.alias}</span>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(event.bankAccount.alias)}><Copy className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <p className="text-sm text-blue-700">Por favor, incluye tu nombre en el concepto de la transferencia para poder identificarla.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ====================== INVITACIÓN (PREVIEW RENDER) ======================
  const renderInvitation = () => {
    const styles = {
      elegant: { background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', primaryColor: event.colors.primary, secondaryColor: event.colors.secondary, textColor: event.colors.text, fontFamily: event.fonts.primary },
      romantic: { background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', primaryColor: '#e91e63', secondaryColor: '#ffc0cb', textColor: '#333', fontFamily: 'Playfair Display' },
      modern: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', primaryColor: '#3498db', secondaryColor: '#2ecc71', textColor: '#fff', fontFamily: 'Inter' },
      classic: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', primaryColor: '#8e44ad', secondaryColor: '#e74c3c', textColor: '#333', fontFamily: 'Georgia' }
    };
    const currentStyle = styles[selectedTemplate] || styles.elegant;

    return (
      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: currentStyle.background, fontFamily: currentStyle.fontFamily, color: currentStyle.textColor }}
      >
        {/* HERO */}
        <section className="min-h-screen flex items-center justify-center relative px-4">
          {/* Orbes decorativos */}
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: currentStyle.primaryColor }} />
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: currentStyle.secondaryColor }} />
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-wider" style={{ color: currentStyle.primaryColor }}>
              {event.couple.bride.toUpperCase()}
            </h1>
            <div className="flex items-center justify-center my-8">
              <div className="h-px w-16 bg-gray-400" />
              <Heart className="w-8 h-8 mx-4" style={{ color: currentStyle.secondaryColor }} fill="currentColor" />
              <div className="h-px w-16 bg-gray-400" />
            </div>
            <h1 className="text-6xl md:text-8xl font-light mb-8 tracking-wider" style={{ color: currentStyle.primaryColor }}>
              {event.couple.groom.toUpperCase()}
            </h1>
            <p className="text-xl md:text-2xl font-light mb-12 tracking-wide" style={{ color: currentStyle.textColor }}>
              ¡NOS CASAMOS!
            </p>
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 mx-auto" style={{ color: currentStyle.primaryColor }} />
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="py-16" style={{ backgroundColor: currentStyle.primaryColor }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide text-white">Faltan para nuestro gran día</h2>
            <div className="flex items-center justify-center gap-8">
              <TimeCell value={timeLeft.days} label="días" />
              <div className="font-light text-5xl">:</div>
              <TimeCell value={timeLeft.hours} label="horas" />
              <div className="font-light text-5xl">:</div>
              <TimeCell value={timeLeft.minutes} label="min" />
              <div className="font-light text-5xl">:</div>
              <TimeCell value={timeLeft.seconds} label="seg" />
            </div>
          </div>
        </section>

        {/* DETALLES */}
        <section className="py-12 px-4 bg-white/70">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 text-sm text-gray-700">
                <Calendar className="w-4 h-4" /><span>{event.date}</span>
                <Clock className="w-4 h-4" /><span>{event.time}</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Church className="w-5 h-5" />Ceremonia</CardTitle></CardHeader>
                <CardContent className="space-y-1">
                  <div className="font-semibold">{event.ceremony.venue}</div>
                  <div className="text-sm text-gray-600">{event.ceremony.address}</div>
                  <div className="text-sm">Hora: {event.ceremony.time}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><PartyPopper className="w-5 h-5" />Recepción</CardTitle></CardHeader>
                <CardContent className="space-y-1">
                  <div className="font-semibold">{event.reception.venue}</div>
                  <div className="text-sm text-gray-600">{event.reception.address}</div>
                  <div className="text-sm">Hora: {event.reception.time}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-lg text-gray-700 mb-6">Te esperamos para celebrar juntos</p>
            <Button className="px-12 py-4 text-lg rounded-full text-white" style={{ backgroundColor: currentStyle.primaryColor }} onClick={() => setShowRSVP(true)}>
              <Users className="w-5 h-5 mr-2" />CONFIRMAR ASISTENCIA
            </Button>
          </div>
        </section>

        {/* MESA DE REGALOS */}
        {event.registry?.enabled && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: currentStyle.textColor }}>Mesa de Regalos</h2>
              <p className="text-lg mb-8 text-gray-600">Si deseas hacernos un regalo, aquí tienes algunas opciones</p>
              <div className="grid md:grid-cols-2 gap-6">
                {event.registry.stores.map((s, i) => (
                  <Button key={i} variant="outline" size="lg" className="p-6 h-auto flex-col"
                    style={{ borderColor: currentStyle.primaryColor, color: currentStyle.primaryColor }}
                    onClick={() => window.open(s.url, '_blank')}>
                    <Gift className="w-8 h-8 mb-2" />
                    {s.name}
                  </Button>
                ))}
              </div>
              <div className="mt-8">
                <Button variant="outline" onClick={() => setShowBankDetails(true)}>Ver datos bancarios</Button>
              </div>
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="py-8 text-center opacity-80">
          <div className="text-sm">{event.description}</div>
          {event.hashtag && <div className="mt-2 text-sm" style={{ color: currentStyle.primaryColor }}>{event.hashtag}</div>}
        </footer>
      </div>
    );
  };

  // ====================== RETURN (EDITOR + PREVIEW) ======================
  return (
    <>
      {/* Barra Superior / Controles */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Volver
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{event.couple.bride} & {event.couple.groom}</h1>
              <p className="text-xs text-gray-600">Editor Visual</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleUndo} disabled={historyIndex <= 1}><Undo className="h-4 w-4" /></Button>
            <Button variant="outline" onClick={handleRedo} disabled={historyIndex >= history.length - 1}><Redo className="h-4 w-4" /></Button>

            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}><ZoomOut className="h-4 w-4" /></Button>
              <span className="text-sm font-medium">{zoom}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}><ZoomIn className="h-4 w-4" /></Button>
            </div>

            <Button variant="outline" onClick={() => setShowGrid(s => !s)}><Grid className="h-4 w-4 mr-2" />{showGrid ? 'Grilla ON' : 'Grilla OFF'}</Button>

            <Button variant="outline" onClick={() => setViewMode('mobile')}><Smartphone className="w-4 h-4" /></Button>
            <Button variant="outline" onClick={() => setViewMode('tablet')}><Tablet className="w-4 h-4" /></Button>
            <Button variant="outline" onClick={() => setViewMode('desktop')}><Monitor className="w-4 h-4" /></Button>

            <Button variant="outline" onClick={() => setEditMode(v => !v)}><Edit3 className="w-4 h-4 mr-1" />{editMode ? 'Editar: ON' : 'Editar: OFF'}</Button>

            <Button variant="outline" onClick={previewInvitation}><Eye className="w-4 h-4 mr-1" />Vista previa</Button>

            <Button size="sm" onClick={saveEvent} disabled={saving} style={{ backgroundColor: event.colors.primary }}>
              <Save className="w-4 h-4 mr-1" /> {saving ? 'Guardando…' : 'Guardar'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="max-w-7xl mx-auto px-4 pb-3">
            <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
          </div>
        )}
      </div>

      {/* Modales */}
      {showRSVP && <RSVPModal />}
      {showGifts && <GiftsModal />}
      {showAccommodations && <AccommodationsModal />}
      {showBankDetails && <BankDetailsModal />}

      {/* LAYOUT: Editor (izq) + Preview (der) */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-4 p-4">
        {/* Panel de Editor */}
        <div className="border rounded-lg bg-white">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-4 p-1 m-4">
              <TabsTrigger value="design" className="text-xs"><Palette className="h-4 w-4 mr-1" />Diseño</TabsTrigger>
              <TabsTrigger value="content" className="text-xs"><Type className="h-4 w-4 mr-1" />Contenido</TabsTrigger>
              <TabsTrigger value="images" className="text-xs"><ImageIcon className="h-4 w-4 mr-1" />Imágenes</TabsTrigger>
              <TabsTrigger value="layout" className="text-xs"><Layout className="h-4 w-4 mr-1" />Templates</TabsTrigger>
            </TabsList>

            {/* DISEÑO */}
            <TabsContent value="design" className="p-4 space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-sm">Paletas de Colores</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {colorPalettes.map((palette) => (
                    <div key={palette.name}>
                      <Label className="text-xs font-medium">{palette.name}</Label>
                      <div className="flex gap-2 mt-1">
                        {palette.colors.map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange('primary', color)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Colores Personalizados</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="primaryColor" className="text-xs">Color Principal</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="primaryColor" type="color" value={event.colors.primary} onChange={(e) => handleColorChange('primary', e.target.value)} className="w-20" />
                      <Input value={event.colors.primary} onChange={(e) => handleColorChange('primary', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor" className="text-xs">Color Secundario</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="secondaryColor" type="color" value={event.colors.secondary} onChange={(e) => handleColorChange('secondary', e.target.value)} className="w-20" />
                      <Input value={event.colors.secondary} onChange={(e) => handleColorChange('secondary', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="textColor" className="text-xs">Color Texto</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="textColor" type="color" value={event.colors.text} onChange={(e) => handleColorChange('text', e.target.value)} className="w-20" />
                      <Input value={event.colors.text} onChange={(e) => handleColorChange('text', e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Fuentes</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Primaria</Label>
                    <select className="w-full mt-1 p-2 border rounded" value={event.fonts.primary} onChange={(e) => handleFontChange('primary', e.target.value)}>
                      {fontFamilies.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">Secundaria</Label>
                    <select className="w-full mt-1 p-2 border rounded" value={event.fonts.secondary} onChange={(e) => handleFontChange('secondary', e.target.value)}>
                      {fontFamilies.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* CONTENIDO */}
            <TabsContent value="content" className="p-4 space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-sm">Pareja</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label>Nombres (Novia)</Label>
                    <Input value={event.couple.bride} onChange={(e) => handleInputChange('couple.bride', e.target.value)} />
                  </div>
                  <div>
                    <Label>Nombres (Novio)</Label>
                    <Input value={event.couple.groom} onChange={(e) => handleInputChange('couple.groom', e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Fecha y Hora</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label>Fecha</Label>
                    <Input value={event.date} onChange={(e) => handleInputChange('date', e.target.value)} />
                  </div>
                  <div>
                    <Label>Hora</Label>
                    <Input value={event.time} onChange={(e) => handleInputChange('time', e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Ceremonia</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label>Lugar</Label>
                    <Input value={event.ceremony.venue} onChange={(e) => handleInputChange('ceremony.venue', e.target.value)} />
                  </div>
                  <div>
                    <Label>Dirección</Label>
                    <Input value={event.ceremony.address} onChange={(e) => handleInputChange('ceremony.address', e.target.value)} />
                  </div>
                  <div>
                    <Label>Hora</Label>
                    <Input value={event.ceremony.time} onChange={(e) => handleInputChange('ceremony.time', e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Recepción</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label>Lugar</Label>
                    <Input value={event.reception.venue} onChange={(e) => handleInputChange('reception.venue', e.target.value)} />
                  </div>
                  <div>
                    <Label>Dirección</Label>
                    <Input value={event.reception.address} onChange={(e) => handleInputChange('reception.address', e.target.value)} />
                  </div>
                  <div>
                    <Label>Hora</Label>
                    <Input value={event.reception.time} onChange={(e) => handleInputChange('reception.time', e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Otros</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Descripción</Label>
                    <Textarea rows={3} value={event.description} onChange={(e) => handleInputChange('description', e.target.value)} />
                  </div>
                  <div>
                    <Label>Hashtag</Label>
                    <Input value={event.hashtag} onChange={(e) => handleInputChange('hashtag', e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Secciones Extra</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between border rounded p-2">
                    <div className="text-sm">Mesa de Regalos</div>
                    <input type="checkbox" checked={event.registry.enabled}
                      onChange={(e) => handleInputChange('registry.enabled', e.target.checked)} />
                  </div>
                  <div className="flex items-center justify-between border rounded p-2">
                    <div className="text-sm">Alojamientos</div>
                    <input type="checkbox" checked={event.accommodations.enabled}
                      onChange={(e) => handleInputChange('accommodations.enabled', e.target.checked)} />
                  </div>
                  <div className="flex items-center justify-between border rounded p-2">
                    <div className="text-sm">Datos Bancarios</div>
                    <input type="checkbox" checked={event.bankAccount.enabled}
                      onChange={(e) => handleInputChange('bankAccount.enabled', e.target.checked)} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* IMÁGENES */}
            <TabsContent value="images" className="p-4 space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-sm">Imágenes de Hoteles (Alojamientos)</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {event.accommodations.hotels.map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={h.image} alt="" className="w-24 h-16 object-cover rounded border" />
                      <Input type="text" value={h.image} onChange={(e) => {
                        const v = e.target.value;
                        updateEvent(prev => {
                          const clone = JSON.parse(JSON.stringify(prev));
                          clone.accommodations.hotels[i].image = v;
                          return clone;
                        });
                      }} className="flex-1" />
                      <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, `accommodations.hotels.${i}.image`)} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TEMPLATES */}
            <TabsContent value="layout" className="p-4 space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-sm">Plantillas</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  {templates.map(t => (
                    <button key={t.id}
                      className={`border rounded p-3 text-left hover:shadow ${selectedTemplate === t.id ? 'ring-2 ring-pink-400' : ''}`}
                      onClick={() => handleTemplateChange(t.id)}>
                      <div className="font-semibold mb-1">{t.name}</div>
                      <div className="text-xs text-gray-600">{t.description}</div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Panel de PREVIEW */}
        <div className="relative border rounded-lg bg-white overflow-hidden">
          {/* Controles de vista rápida */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">{viewMode.toUpperCase()}</Badge>
          </div>

          <div
            ref={canvasRef}
            className={`w-full h-[calc(100vh-220px)] overflow-auto ${viewMode === 'mobile' ? 'flex justify-center' : ''}`}
            style={{
              background: '#f3f4f6',
              position: 'relative'
            }}
          >
            {/* Contenedor escalado por ZOOM */}
            <div
              className={`${viewMode === 'mobile' ? 'w-[380px]' : viewMode === 'tablet' ? 'w-[800px]' : 'w-[1100px]'} origin-top-left`}
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
            >
              {/* Grilla opcional */}
              {showGrid && (
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
              )}
              {renderInvitation()}
            </div>
          </div>
        </div>
      </div>

      {/* Modales (montados al final por z-index) */}
      {showRSVP && <RSVPModal />}
      {showGifts && <GiftsModal />}
      {showAccommodations && <AccommodationsModal />}
      {showBankDetails && <BankDetailsModal />}
    </>
  );
};

export default VisualEditorComplete;
