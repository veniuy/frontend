// VisualEditorComplete.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  ArrowLeft,
  Save,
  Eye,
  Palette,
  Type,
  Image as ImageIcon,
  Layout,
  Upload,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Heart,
  MapPin,
  Church,
  PartyPopper,
  Users,
  Gift,
  CreditCard,
  Instagram,
  Facebook,
  Share2,
  ChevronDown,
  Pencil,
  Check,
  X
} from 'lucide-react';

/** Componente reutilizable para edición inline con ícono de lápiz */
const EditableText = ({
  value,
  onChange,
  as: Tag = 'p',
  inputType = 'input', // 'input' | 'textarea'
  className = '',
  inputClassName = '',
  placeholder = 'Toca para editar',
  style
}) => {
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);
  const [temp, setTemp] = useState(value ?? '');
  const ref = useRef(null);

  useEffect(() => setTemp(value ?? ''), [value]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!editing) return;
      if (ref.current && !ref.current.contains(e.target)) {
        setEditing(false);
        setTemp(value ?? '');
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [editing, value]);

  const commit = () => {
    onChange(temp);
    setEditing(false);
  };

  return (
    <div
      ref={ref}
      className="relative inline-block group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ maxWidth: '100%' }}
    >
      {!editing ? (
        <Tag
          className={className}
          style={style}
          onClick={() => setEditing(true)}
        >
          {value && String(value).length ? value : (
            <span className="opacity-50">{placeholder}</span>
          )}
        </Tag>
      ) : (
        inputType === 'textarea' ? (
          <Textarea
            className={`w-full px-3 py-2 text-base ${inputClassName}`}
            value={temp}
            autoFocus
            onChange={(e) => setTemp(e.target.value)}
          />
        ) : (
          <Input
            className={`w-full px-3 py-2 text-base ${inputClassName}`}
            value={temp}
            autoFocus
            onChange={(e) => setTemp(e.target.value)}
          />
        )
      )}

      {/* Lápiz visible al pasar/tocar */}
      {!editing && (
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label="Editar texto"
          className={`absolute -top-3 -right-3 p-1 rounded-full bg-white shadow border transition-opacity ${hover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Controles confirmar / cancelar cuando edita */}
      {editing && (
        <div className="absolute -top-3 -right-3 flex gap-1">
          <button
            type="button"
            onClick={commit}
            className="p-1 rounded-full bg-white shadow border"
            aria-label="Aplicar"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => { setEditing(false); setTemp(value ?? ''); }}
            className="p-1 rounded-full bg-white shadow border"
            aria-label="Cancelar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

const VisualEditorWithInvitation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del evento
  const [event, setEvent] = useState({
    id: id || '1',
    couple: { bride: 'María', groom: 'Juan' },
    date: '15 de Marzo, 2024',
    time: '17:00',
    ceremony: { venue: 'Iglesia San Miguel', address: 'Calle Mayor 123, Madrid', time: '17:00' },
    reception: { venue: 'Jardín Botánico', address: 'Av. Libertador 456, Madrid', time: '19:30' },
    description: '¡Nos casamos!',
    hashtag: '#MariaYJuan2024',
    template: 'elegant',
    colors: { primary: '#e91e63', secondary: '#ffc0cb', background: '#ffffff', text: '#333333', accent: '#8e44ad' },
    fonts: { primary: 'Playfair Display', secondary: 'Inter' }
  });

  const [loading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Editor
  const [activeTab, setActiveTab] = useState('design');
  const [zoom, setZoom] = useState(100);
  const [history] = useState([]);
  const [historyIndex] = useState(-1);
  const [selectedTemplate, setSelectedTemplate] = useState('elegant');

  // Estados de la invitación
  const [showRSVP, setShowRSVP] = useState(false);

  const fileInputRef = useRef(null);

  const colorPalettes = [
    { name: 'Clásico', colors: ['#1a1a1a', '#ffffff', '#f5f5f5', '#e5e5e5', '#cccccc'] },
    { name: 'Elegante', colors: ['#2c3e50', '#ecf0f1', '#e74c3c', '#f39c12', '#9b59b6'] },
    { name: 'Moderno', colors: ['#34495e', '#3498db', '#2ecc71', '#f1c40f', '#e67e22'] },
    { name: 'Romántico', colors: ['#8e44ad', '#e91e63', '#ffc0cb', '#fff0f5', '#ffe4e1'] },
    { name: 'Natural', colors: ['#27ae60', '#2ecc71', '#f39c12', '#e67e22', '#d35400'] }
  ];

  const fontFamilies = ['Inter','Helvetica Neue','Arial','Georgia','Times New Roman','Playfair Display','Montserrat','Open Sans','Lato','Roboto'];

  const templates = [
    { id: 'elegant', name: 'Elegante', description: 'Diseño sofisticado y minimalista' },
    { id: 'romantic', name: 'Romántico', description: 'Colores suaves y florales' },
    { id: 'modern', name: 'Moderno', description: 'Diseño contemporáneo y vibrante' },
    { id: 'classic', name: 'Clásico', description: 'Estilo tradicional y atemporal' }
  ];

  // Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const targetDate = new Date('2024-03-15T17:00:00');
    const t = setInterval(() => {
      const now = new Date().getTime();
      const d = targetDate.getTime() - now;
      if (d > 0) {
        setTimeLeft({
          days: Math.floor(d / (1000 * 60 * 60 * 24)),
          hours: Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((d % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((d % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const saveEvent = async () => {
    try {
      setSaving(true);
      await new Promise(r => setTimeout(r, 800));
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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (x) => console.log('Image uploaded:', x.target?.result);
    reader.readAsDataURL(file);
  };

  const handleZoomIn = () => setZoom(z => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom(z => Math.max(z - 10, 50));

  const previewInvitation = () => window.open(`/p/${event.id}`, '_blank');

  // Render de la invitación
  const renderInvitation = () => {
    const styles = {
      elegant: {
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        primaryColor: event.colors.primary, secondaryColor: event.colors.secondary,
        textColor: event.colors.text, fontFamily: event.fonts.primary
      },
      romantic: {
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        primaryColor: '#e91e63', secondaryColor: '#ffc0cb', textColor: '#333', fontFamily: 'Playfair Display'
      },
      modern: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        primaryColor: '#3498db', secondaryColor: '#2ecc71', textColor: '#fff', fontFamily: 'Inter'
      },
      classic: {
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        primaryColor: '#8e44ad', secondaryColor: '#e74c3c', textColor: '#333', fontFamily: 'Georgia'
      }
    };

    const S = styles[selectedTemplate] || styles.elegant;

    return (
      <div
        className="min-h-screen relative overflow-hidden"
        style={{ background: S.background, fontFamily: S.fontFamily, color: S.textColor }}
      >
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center relative px-4">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: S.primaryColor }}></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: S.secondaryColor }}></div>

          <div className="text-center max-w-4xl mx-auto relative z-10 space-y-4">
            <EditableText
              as="h1"
              value={event.couple.bride}
              onChange={(v) => setEvent(p => ({ ...p, couple: { ...p.couple, bride: v } }))}
              className="text-6xl md:text-8xl font-light tracking-wider uppercase"
              style={{ color: S.primaryColor }}
              placeholder="Nombre 1"
            />

            <div className="flex items-center justify-center my-4">
              <div className="h-px w-16 bg-gray-400"></div>
              <Heart className="mx-4 w-8 h-8" style={{ color: S.secondaryColor }} fill="currentColor" />
              <div className="h-px w-16 bg-gray-400"></div>
            </div>

            <EditableText
              as="h1"
              value={event.couple.groom}
              onChange={(v) => setEvent(p => ({ ...p, couple: { ...p.couple, groom: v } }))}
              className="text-6xl md:text-8xl font-light tracking-wider uppercase"
              style={{ color: S.primaryColor }}
              placeholder="Nombre 2"
            />

            <EditableText
              as="p"
              value={event.description}
              onChange={(v) => setEvent(p => ({ ...p, description: v }))}
              className="text-xl md:text-2xl font-light tracking-wide"
              style={{ color: S.textColor }}
              placeholder="Frase / anuncio"
            />

            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 mx-auto" style={{ color: S.primaryColor }} />
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="py-16" style={{ backgroundColor: S.primaryColor }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-wide text-white">Faltan para nuestro gran día</h2>
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className="font-light leading-none text-4xl md:text-6xl text-white">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="opacity-90 text-sm sm:text-base text-white/90">días</div>
              </div>
              <div className="text-4xl md:text-6xl font-light text-white">:</div>
              <div className="flex flex-col items-center">
                <div className="font-light leading-none text-4xl md:text-6xl text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="opacity-90 text-sm sm:text-base text-white/90">horas</div>
              </div>
              <div className="text-4xl md:text-6xl font-light text-white">:</div>
              <div className="flex flex-col items-center">
                <div className="font-light leading-none text-4xl md:text-6xl text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="opacity-90 text-sm sm:text-base text-white/90">min</div>
              </div>
              <div className="text-4xl md:text-6xl font-light text-white">:</div>
              <div className="flex flex-col items-center">
                <div className="font-light leading-none text-4xl md:text-6xl text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="opacity-90 text-sm sm:text-base text-white/90">seg</div>
              </div>
            </div>
          </div>
        </section>

        {/* Detalles */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Ceremonia */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${S.primaryColor}20` }}>
                  <Church className="w-8 h-8" style={{ color: S.primaryColor }} />
                </div>
                <h3 className="text-2xl font-medium mb-6 tracking-wide" style={{ color: S.textColor }}>CEREMONIA</h3>

                <div className="space-y-3 mb-8 text-gray-600">
                  <EditableText
                    value={event.date}
                    onChange={(v) => setEvent(p => ({ ...p, date: v }))}
                    className="text-lg"
                    placeholder="Fecha"
                  />
                  <EditableText
                    value={event.ceremony.time}
                    onChange={(v) => setEvent(p => ({ ...p, ceremony: { ...p.ceremony, time: v } }))}
                    className="text-lg"
                    placeholder="Hora"
                  />
                  <EditableText
                    value={event.ceremony.venue}
                    onChange={(v) => setEvent(p => ({ ...p, ceremony: { ...p.ceremony, venue: v } }))}
                    className="font-medium"
                    placeholder="Lugar"
                  />
                  <EditableText
                    value={event.ceremony.address}
                    onChange={(v) => setEvent(p => ({ ...p, ceremony: { ...p.ceremony, address: v } }))}
                    placeholder="Dirección"
                  />
                </div>

                <Button className="px-8 py-3 rounded-full text-white" style={{ backgroundColor: S.primaryColor }}>
                  <MapPin className="w-4 h-4 mr-2" />
                  CÓMO LLEGAR
                </Button>
              </div>

              {/* Recepción */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${S.secondaryColor}20` }}>
                  <PartyPopper className="w-8 h-8" style={{ color: S.secondaryColor }} />
                </div>
                <h3 className="text-2xl font-medium mb-6 tracking-wide" style={{ color: S.textColor }}>RECEPCIÓN</h3>

                <div className="space-y-3 mb-8 text-gray-600">
                  <EditableText
                    value={event.date}
                    onChange={(v) => setEvent(p => ({ ...p, date: v }))}
                    className="text-lg"
                    placeholder="Fecha"
                  />
                  <EditableText
                    value={event.reception.time}
                    onChange={(v) => setEvent(p => ({ ...p, reception: { ...p.reception, time: v } }))}
                    className="text-lg"
                    placeholder="Hora"
                  />
                  <EditableText
                    value={event.reception.venue}
                    onChange={(v) => setEvent(p => ({ ...p, reception: { ...p.reception, venue: v } }))}
                    className="font-medium"
                    placeholder="Lugar"
                  />
                  <EditableText
                    value={event.reception.address}
                    onChange={(v) => setEvent(p => ({ ...p, reception: { ...p.reception, address: v } }))}
                    placeholder="Dirección"
                  />
                </div>

                <Button className="px-8 py-3 rounded-full text-white" style={{ backgroundColor: S.secondaryColor }}>
                  <MapPin className="w-4 h-4 mr-2" />
                  CÓMO LLEGAR
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section className="py-16" style={{ backgroundColor: `${S.primaryColor}10` }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: S.primaryColor }}>Confirma tu Asistencia</h2>
            <p className="text-lg mb-8 text-gray-600">Tu presencia es muy importante para nosotros</p>
            <Button
              size="lg"
              className="px-12 py-4 text-lg rounded-full text-white"
              style={{ backgroundColor: S.primaryColor }}
              onClick={() => setShowRSVP(true)}
            >
              <Users className="w-5 h-5 mr-2" />
              CONFIRMAR ASISTENCIA
            </Button>
          </div>
        </section>

        {/* Regalos */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: S.textColor }}>Mesa de Regalos</h2>
            <p className="text-lg mb-8 text-gray-600">Si deseas hacernos un regalo, aquí tienes algunas opciones</p>
            <div className="grid md:grid-cols-2 gap-6">
              <Button variant="outline" size="lg" className="p-6 h-auto flex-col" style={{ borderColor: S.primaryColor, color: S.primaryColor }}>
                <Gift className="w-8 h-8 mb-2" />
                <span className="text-lg">Lista de Regalos</span>
              </Button>
              <Button variant="outline" size="lg" className="p-6 h-auto flex-col" style={{ borderColor: S.secondaryColor, color: S.secondaryColor }}>
                <CreditCard className="w-8 h-8 mb-2" />
                <span className="text-lg">Contribución</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center" style={{ backgroundColor: S.primaryColor }}>
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-2xl font-light mb-4 text-white">¡Esperamos verte en nuestro gran día!</h3>
            <EditableText
              value={event.hashtag}
              onChange={(v) => setEvent(p => ({ ...p, hashtag: v }))}
              className="text-white opacity-90 mb-6"
              placeholder="#HashtagDelEvento"
            />
            <div className="flex justify-center space-x-6">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20"><Instagram className="w-5 h-5" /></Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20"><Facebook className="w-5 h-5" /></Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20"><Share2 className="w-5 h-5" /></Button>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/app/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <div>
              <h1 className="text-xl font-semibold">
                {event.couple.bride} & {event.couple.groom}
              </h1>
              <p className="text-sm text-gray-600">Editor Visual</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" disabled={historyIndex <= 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" disabled={historyIndex >= history.length - 1}>
              <Redo className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{zoom}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* Botón de grilla eliminado como pediste */}

            <Button variant="outline" onClick={previewInvitation}>
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa
            </Button>

            <Button onClick={saveEvent} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <Alert className="mx-6 mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex h-[calc(100vh-80px)]">
        {/* Panel lateral */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-4 p-1 m-4">
              <TabsTrigger value="design" className="text-xs">
                <Palette className="h-4 w-4 mr-1" />
                Diseño
              </TabsTrigger>
              <TabsTrigger value="content" className="text-xs">
                <Type className="h-4 w-4 mr-1" />
                Contenido
              </TabsTrigger>
              <TabsTrigger value="images" className="text-xs">
                <ImageIcon className="h-4 w-4 mr-1" />
                Imágenes
              </TabsTrigger>
              <TabsTrigger value="layout" className="text-xs">
                <Layout className="h-4 w-4 mr-1" />
                Templates
              </TabsTrigger>
            </TabsList>

            {/* Diseño */}
            <TabsContent value="design" className="p-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Paletas de Colores</CardTitle>
                </CardHeader>
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
                <CardHeader>
                  <CardTitle className="text-sm">Colores Personalizados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="primaryColor" className="text-xs">Color Principal</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={event.colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-12 h-8 p-0 border-0"
                      />
                      <Input
                        value={event.colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="flex-1 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secondaryColor" className="text-xs">Color Secundario</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={event.colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-12 h-8 p-0 border-0"
                      />
                      <Input
                        value={event.colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="flex-1 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="textColor" className="text-xs">Color de Texto</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="textColor"
                        type="color"
                        value={event.colors.text}
                        onChange={(e) => handleColorChange('text', e.target.value)}
                        className="w-12 h-8 p-0 border-0"
                      />
                      <Input
                        value={event.colors.text}
                        onChange={(e) => handleColorChange('text', e.target.value)}
                        className="flex-1 text-xs"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Tipografía</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">Fuente Principal</Label>
                    <select
                      value={event.fonts.primary}
                      onChange={(e) => handleFontChange('primary', e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
                    >
                      {fontFamilies.map((font) => (
                        <option key={font} value={font} style={{ fontFamily: font }}>
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs">Fuente Secundaria</Label>
                    <select
                      value={event.fonts.secondary}
                      onChange={(e) => handleFontChange('secondary', e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
                    >
                      {fontFamilies.map((font) => (
                        <option key={font} value={font} style={{ fontFamily: font }}>
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contenido */}
            <TabsContent value="content" className="p-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Información de la Pareja</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="bride" className="text-xs">Novia</Label>
                    <Input
                      id="bride"
                      value={event.couple.bride}
                      onChange={(e) => setEvent(prev => ({ ...prev, couple: { ...prev.couple, bride: e.target.value } }))}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="groom" className="text-xs">Novio</Label>
                    <Input
                      id="groom"
                      value={event.couple.groom}
                      onChange={(e) => setEvent(prev => ({ ...prev, couple: { ...prev.couple, groom: e.target.value } }))}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hashtag" className="text-xs">Hashtag</Label>
                    <Input
                      id="hashtag"
                      value={event.hashtag}
                      onChange={(e) => setEvent(prev => ({ ...prev, hashtag: e.target.value }))}
                      className="text-xs"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Detalles del Evento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="eventDate" className="text-xs">Fecha</Label>
                    <Input
                      id="eventDate"
                      value={event.date}
                      onChange={(e) => setEvent(prev => ({ ...prev, date: e.target.value }))}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ceremonyVenue" className="text-xs">Lugar de Ceremonia</Label>
                    <Input
                      id="ceremonyVenue"
                      value={event.ceremony.venue}
                      onChange={(e) => setEvent(prev => ({ ...prev, ceremony: { ...prev.ceremony, venue: e.target.value } }))}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ceremonyAddress" className="text-xs">Dirección de Ceremonia</Label>
                    <Input
                      id="ceremonyAddress"
                      value={event.ceremony.address}
                      onChange={(e) => setEvent(prev => ({ ...prev, ceremony: { ...prev.ceremony, address: e.target.value } }))}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="receptionVenue" className="text-xs">Lugar de Recepción</Label>
                    <Input
                      id="receptionVenue"
                      value={event.reception.venue}
                      onChange={(e) => setEvent(prev => ({ ...prev, reception: { ...prev.reception, venue: e.target.value } }))}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="receptionAddress" className="text-xs">Dirección de Recepción</Label>
                    <Input
                      id="receptionAddress"
                      value={event.reception.address}
                      onChange={(e) => setEvent(prev => ({ ...prev, reception: { ...prev.reception, address: e.target.value } }))}
                      className="text-xs"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Imágenes */}
            <TabsContent value="images" className="p-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Subir Imagen</CardTitle>
                </CardHeader>
                <CardContent>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Seleccionar Imagen
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Galería</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates */}
            <TabsContent value="layout" className="p-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {templates.map((t) => (
                      <div
                        key={t.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTemplate === t.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleTemplateChange(t.id)}
                      >
                        <div className="font-medium text-sm">{t.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{t.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <div
            className="min-h-full"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          >
            {renderInvitation()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualEditorWithInvitation;
