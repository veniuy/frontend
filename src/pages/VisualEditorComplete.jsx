// src/pages/VisualEditorWithInvitation.jsx
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
  ChevronDown,
  Church,
  PartyPopper,
  Users,
  Instagram,
  Facebook,
  Share2,
  Gift,
  CreditCard
} from 'lucide-react';

/** Componente de texto editable in-place
 *  - Mantiene fuente/tamaño al heredar estilos del contenedor
 *  - Click para editar, blur para finalizar
 *  - Enter confirma en campos de una sola línea
 *  - Limpia pegado a texto plano
 */
const EditableText = ({
  value,
  onChange,
  as = 'span',
  className = '',
  style = {},
  singleLine = true,
  ariaLabel = 'Editar texto'
}) => {
  const Tag = as;
  const ref = useRef(null);
  const [editing, setEditing] = useState(false);

  const beginEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
    requestAnimationFrame(() => {
      if (!ref.current) return;
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });
  };

  const endEdit = () => setEditing(false);
  const handleInput = (e) => onChange(e.currentTarget.textContent);
  const handleKeyDown = (e) => {
    if (singleLine && e.key === 'Enter') {
      e.preventDefault();
      ref.current?.blur();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <Tag
      ref={ref}
      role="textbox"
      aria-label={ariaLabel}
      contentEditable={editing}
      suppressContentEditableWarning
      onClick={beginEdit}
      onBlur={endEdit}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      dir="ltr"
      className={`${className} outline-none ${editing ? 'ring-2 ring-blue-300 rounded-sm' : ''}`}
      style={{
        unicodeBidi: 'isolate',   // evita inversión por bidi
        direction: 'ltr',          // fuerza izquierda→derecha
        whiteSpace: singleLine ? 'nowrap' : 'pre-wrap',
        ...style
      }}
    >
      {value}
    </Tag>
  );
};

const VisualEditorWithInvitation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del evento (datos editables)
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
    description: '¡NOS CASAMOS!',
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
    }
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // UI
  const [activeTab, setActiveTab] = useState('design');
  const [zoom, setZoom] = useState(100);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedTemplate, setSelectedTemplate] = useState('elegant');

  // Modales y toggles (si se usan)
  const [showRSVP, setShowRSVP] = useState(false);

  const fileInputRef = useRef(null);

  // Paletas de colores predefinidas
  const colorPalettes = [
    { name: 'Clásico', colors: ['#1a1a1a', '#ffffff', '#f5f5f5', '#e5e5e5', '#cccccc'] },
    { name: 'Elegante', colors: ['#2c3e50', '#ecf0f1', '#e74c3c', '#f39c12', '#9b59b6'] },
    { name: 'Moderno', colors: ['#34495e', '#3498db', '#2ecc71', '#f1c40f', '#e67e22'] },
    { name: 'Romántico', colors: ['#8e44ad', '#e91e63', '#ffc0cb', '#fff0f5', '#ffe4e1'] },
    { name: 'Natural', colors: ['#27ae60', '#2ecc71', '#f39c12', '#e67e22', '#d35400'] }
  ];

  const fontFamilies = [
    'Inter',
    'Helvetica Neue',
    'Arial',
    'Georgia',
    'Times New Roman',
    'Playfair Display',
    'Montserrat',
    'Open Sans',
    'Lato',
    'Roboto'
  ];

  const templates = [
    { id: 'elegant', name: 'Elegante', description: 'Diseño sofisticado y minimalista' },
    { id: 'romantic', name: 'Romántico', description: 'Colores suaves y florales' },
    { id: 'modern', name: 'Moderno', description: 'Diseño contemporáneo y vibrante' },
    { id: 'classic', name: 'Clásico', description: 'Estilo tradicional y atemporal' }
  ];

  // Countdown (ejemplo)
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
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Guardado (mock)
  const saveEvent = async () => {
    try {
      setSaving(true);
      await new Promise((r) => setTimeout(r, 800));
      console.log('Evento guardado:', event);
    } catch (err) {
      setError('Error guardando el evento');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleColorChange = (property, color) => {
    setEvent((prev) => ({
      ...prev,
      colors: { ...prev.colors, [property]: color }
    }));
  };

  const handleFontChange = (type, fontFamily) => {
    setEvent((prev) => ({
      ...prev,
      fonts: { ...prev.fonts, [type]: fontFamily }
    }));
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    setEvent((prev) => ({ ...prev, template: templateId }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => console.log('Image uploaded:', ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleUndo = () => {
    if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
  };
  const handleRedo = () => {
    if (historyIndex < history.length - 1) setHistoryIndex(historyIndex + 1);
  };
  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));

  const previewInvitation = () => window.open(`/p/${event.id}`, '_blank');

  // Celda de countdown
  const TimeCell = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="font-light leading-none text-4xl md:text-6xl" style={{ color: event.colors.primary }}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="opacity-90 text-sm sm:text-base" style={{ color: event.colors.text }}>
        {label}
      </div>
    </div>
  );

  // Render principal (con textos editables)
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

    return (
      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          background: currentStyle.background,
          fontFamily: currentStyle.fontFamily,
          color: currentStyle.textColor
        }}
      >
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center relative px-4">
          <div
            className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20"
            style={{ backgroundColor: currentStyle.primaryColor }}
          />
          <div
            className="absolute bottom-10 right-10 w-32 h-32 rounded-full opacity-10"
            style={{ backgroundColor: currentStyle.secondaryColor }}
          />

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1
              className="text-6xl md:text-8xl font-light mb-4 tracking-wider uppercase"
              style={{ color: currentStyle.primaryColor }}
            >
              <EditableText
                value={event.couple.bride}
                onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, bride: val } }))}
                as="span"
                ariaLabel="Nombre de la novia"
              />
            </h1>

            <div className="flex items-center justify-center my-8">
              <div className="h-px w-16 bg-gray-400" />
              <Heart className="mx-4 w-8 h-8" style={{ color: currentStyle.secondaryColor }} fill="currentColor" />
              <div className="h-px w-16 bg-gray-400" />
            </div>

            <h1
              className="text-6xl md:text-8xl font-light mb-8 tracking-wider uppercase"
              style={{ color: currentStyle.primaryColor }}
            >
              <EditableText
                value={event.couple.groom}
                onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, groom: val } }))}
                as="span"
                ariaLabel="Nombre del novio"
              />
            </h1>

            <p className="text-xl md:text-2xl font-light mb-12 tracking-wide" style={{ color: currentStyle.textColor }}>
              <EditableText
                value={event.description}
                onChange={(val) => setEvent((p) => ({ ...p, description: val }))}
                as="span"
                ariaLabel="Descripción principal"
              />
            </p>

            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 mx-auto" style={{ color: currentStyle.primaryColor }} />
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="py-16" style={{ backgroundColor: currentStyle.primaryColor }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-wide text-white">
              Faltan para nuestro gran día
            </h2>
            <div className="flex items-center justify-center gap-8">
              <TimeCell value={timeLeft.days} label="días" />
              <div className="text-4xl md:text-6xl font-light text-white">:</div>
              <TimeCell value={timeLeft.hours} label="horas" />
              <div className="text-4xl md:text-6xl font-light text-white">:</div>
              <TimeCell value={timeLeft.minutes} label="min" />
              <div className="text-4xl md:text-6xl font-light text-white">:</div>
              <TimeCell value={timeLeft.seconds} label="seg" />
            </div>
          </div>
        </section>

        {/* Detalles */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Ceremonia */}
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${currentStyle.primaryColor}20` }}
                >
                  <Church className="w-8 h-8" style={{ color: currentStyle.primaryColor }} />
                </div>
                <h3 className="text-2xl font-medium mb-6 tracking-wide" style={{ color: currentStyle.textColor }}>
                  CEREMONIA
                </h3>
                <div className="space-y-3 mb-8 text-gray-600">
                  <p className="text-lg">
                    <EditableText
                      value={event.date}
                      onChange={(val) => setEvent((p) => ({ ...p, date: val }))}
                      ariaLabel="Fecha"
                    />
                  </p>
                  <p className="text-lg">
                    <EditableText
                      value={event.ceremony.time}
                      onChange={(val) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, time: val } }))}
                      ariaLabel="Hora de ceremonia"
                    />
                  </p>
                  <p className="font-medium">
                    <EditableText
                      value={event.ceremony.venue}
                      onChange={(val) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, venue: val } }))}
                      ariaLabel="Lugar de ceremonia"
                    />
                  </p>
                  <p>
                    <EditableText
                      value={event.ceremony.address}
                      onChange={(val) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, address: val } }))}
                      ariaLabel="Dirección de ceremonia"
                      singleLine={false}
                    />
                  </p>
                </div>
                <Button className="px-8 py-3 rounded-full text-white" style={{ backgroundColor: currentStyle.primaryColor }}>
                  <MapPin className="w-4 h-4 mr-2" />
                  CÓMO LLEGAR
                </Button>
              </div>

              {/* Recepción */}
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${currentStyle.secondaryColor}20` }}
                >
                  <PartyPopper className="w-8 h-8" style={{ color: currentStyle.secondaryColor }} />
                </div>
                <h3 className="text-2xl font-medium mb-6 tracking-wide" style={{ color: currentStyle.textColor }}>
                  RECEPCIÓN
                </h3>
                <div className="space-y-3 mb-8 text-gray-600">
                  <p className="text-lg">
                    <EditableText
                      value={event.date}
                      onChange={(val) => setEvent((p) => ({ ...p, date: val }))}
                      ariaLabel="Fecha de recepción"
                    />
                  </p>
                  <p className="text-lg">
                    <EditableText
                      value={event.reception.time}
                      onChange={(val) => setEvent((p) => ({ ...p, reception: { ...p.reception, time: val } }))}
                      ariaLabel="Hora de recepción"
                    />
                  </p>
                  <p className="font-medium">
                    <EditableText
                      value={event.reception.venue}
                      onChange={(val) => setEvent((p) => ({ ...p, reception: { ...p.reception, venue: val } }))}
                      ariaLabel="Lugar de recepción"
                    />
                  </p>
                  <p>
                    <EditableText
                      value={event.reception.address}
                      onChange={(val) => setEvent((p) => ({ ...p, reception: { ...p.reception, address: val } }))}
                      ariaLabel="Dirección de recepción"
                      singleLine={false}
                    />
                  </p>
                </div>
                <Button
                  className="px-8 py-3 rounded-full text-white"
                  style={{ backgroundColor: currentStyle.secondaryColor }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  CÓMO LLEGAR
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section className="py-16" style={{ backgroundColor: `${currentStyle.primaryColor}10` }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: currentStyle.primaryColor }}>
              Confirma tu Asistencia
            </h2>
            <p className="text-lg mb-8 text-gray-600">Tu presencia es muy importante para nosotros</p>
            <Button
              size="lg"
              className="px-12 py-4 text-lg rounded-full text-white"
              style={{ backgroundColor: currentStyle.primaryColor }}
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
            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: currentStyle.textColor }}>
              Mesa de Regalos
            </h2>
            <p className="text-lg mb-8 text-gray-600">Si deseas hacernos un regalo, aquí tienes algunas opciones</p>
            <div className="grid md:grid-cols-2 gap-6">
              <Button
                variant="outline"
                size="lg"
                className="p-6 h-auto flex-col"
                style={{ borderColor: currentStyle.primaryColor, color: currentStyle.primaryColor }}
              >
                <Gift className="w-8 h-8 mb-2" />
                <span className="text-lg">Lista de Regalos</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="p-6 h-auto flex-col"
                style={{ borderColor: currentStyle.secondaryColor, color: currentStyle.secondaryColor }}
              >
                <CreditCard className="w-8 h-8 mb-2" />
                <span className="text-lg">Contribución</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center" style={{ backgroundColor: currentStyle.primaryColor }}>
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-2xl font-light mb-4 text-white">¡Esperamos verte en nuestro gran día!</h3>
            <p className="text-white opacity-90 mb-6">
              <EditableText
                value={event.hashtag}
                onChange={(val) => setEvent((p) => ({ ...p, hashtag: val }))}
                ariaLabel="Hashtag"
              />
            </p>
            <div className="flex justify-center space-x-6">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Share2 className="w-5 h-5" />
              </Button>
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
            <Button variant="outline" onClick={handleUndo} disabled={historyIndex <= 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
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

            {/* (El botón "Mostrar grilla" fue removido como pediste) */}

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
            {/* Tabs SOLO con íconos (sin texto) */}
            <TabsList className="grid w-full grid-cols-4 p-1 m-4">
              <TabsTrigger value="design" aria-label="Diseño" title="Diseño">
                <Palette className="h-4 w-4" />
                <span className="sr-only">Diseño</span>
              </TabsTrigger>
              <TabsTrigger value="content" aria-label="Contenido" title="Contenido">
                <Type className="h-4 w-4" />
                <span className="sr-only">Contenido</span>
              </TabsTrigger>
              <TabsTrigger value="images" aria-label="Imágenes" title="Imágenes">
                <ImageIcon className="h-4 w-4" />
                <span className="sr-only">Imágenes</span>
              </TabsTrigger>
              <TabsTrigger value="layout" aria-label="Templates" title="Templates">
                <Layout className="h-4 w-4" />
                <span className="sr-only">Templates</span>
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
                    <Label htmlFor="primaryColor" className="text-xs">
                      Color Principal
                    </Label>
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
                    <Label htmlFor="secondaryColor" className="text-xs">
                      Color Secundario
                    </Label>
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
                    <Label htmlFor="textColor" className="text-xs">
                      Color de Texto
                    </Label>
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
                    <Label htmlFor="bride" className="text-xs">
                      Novia
                    </Label>
                    <Input
                      id="bride"
                      value={event.couple.bride}
                      onChange={(e) =>
                        setEvent((prev) => ({ ...prev, couple: { ...prev.couple, bride: e.target.value } }))
                      }
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="groom" className="text-xs">
                      Novio
                    </Label>
                    <Input
                      id="groom"
                      value={event.couple.groom}
                      onChange={(e) =>
                        setEvent((prev) => ({ ...prev, couple: { ...prev.couple, groom: e.target.value } }))
                      }
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hashtag" className="text-xs">
                      Hashtag
                    </Label>
                    <Input
                      id="hashtag"
                      value={event.hashtag}
                      onChange={(e) => setEvent((prev) => ({ ...prev, hashtag: e.target.value }))}
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
                    <Label htmlFor="eventDate" className="text-xs">
                      Fecha
                    </Label>
                    <Input
                      id="eventDate"
                      value={event.date}
                      onChange={(e) => setEvent((prev) => ({ ...prev, date: e.target.value }))}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ceremonyVenue" className="text-xs">
                      Lugar de Ceremonia
                    </Label>
                    <Input
                      id="ceremonyVenue"
                      value={event.ceremony.venue}
                      onChange={(e) =>
                        setEvent((prev) => ({ ...prev, ceremony: { ...prev.ceremony, venue: e.target.value } }))
                      }
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ceremonyAddress" className="text-xs">
                      Dirección de Ceremonia
                    </Label>
                    <Input
                      id="ceremonyAddress"
                      value={event.ceremony.address}
                      onChange={(e) =>
                        setEvent((prev) => ({ ...prev, ceremony: { ...prev.ceremony, address: e.target.value } }))
                      }
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="receptionVenue" className="text-xs">
                      Lugar de Recepción
                    </Label>
                    <Input
                      id="receptionVenue"
                      value={event.reception.venue}
                      onChange={(e) =>
                        setEvent((prev) => ({ ...prev, reception: { ...prev.reception, venue: e.target.value } }))
                      }
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="receptionAddress" className="text-xs">
                      Dirección de Recepción
                    </Label>
                    <Input
                      id="receptionAddress"
                      value={event.reception.address}
                      onChange={(e) =>
                        setEvent((prev) => ({ ...prev, reception: { ...prev.reception, address: e.target.value } }))
                      }
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
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
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
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleTemplateChange(template.id)}
                      >
                        <div className="font-medium text-sm">{template.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas Principal */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <div
            className="min-h-full"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center'
            }}
          >
            {renderInvitation()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualEditorWithInvitation;
