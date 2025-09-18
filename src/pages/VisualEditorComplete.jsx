// src/pages/VisualEditorWithInvitation.jsx (mobile-ready, closeable panel, palettes on tab icons, in-place editor fixes)
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
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
  CreditCard,
  X,
  Menu
} from 'lucide-react';

/** EditableText: click/tap to edit in-place, keeping inherited font/size */
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
      const r = document.createRange();
      r.selectNodeContents(ref.current);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      // ensure caret at end on mobile
      document.execCommand?.('selectAll', false, null);
      document.execCommand?.('forwardDelete', false, null);
    });
  };

  const endEdit = () => setEditing(false);
  const handleInput = (e) => onChange(e.currentTarget.textContent || '');
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
      onTouchStart={beginEdit}
      onBlur={endEdit}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      dir="ltr"
      spellCheck={false}
      inputMode="text"
      className={`${className} outline-none cursor-text ${editing ? 'ring-2 ring-blue-300 rounded-sm' : ''}`}
      style={{
        direction: 'ltr',
        unicodeBidi: 'bidi-override',
        whiteSpace: singleLine ? 'nowrap' : 'pre-wrap',
        WebkitUserSelect: 'text',
        userSelect: 'text',
        touchAction: 'manipulation',
        ...style
      }}
    >
      {value}
    </Tag>
  );
};

// Paletas pedidas (para colorear SOLO los íconos del panel)
const NAMED_PALETTES = [
  { name: '🌿 Rustic Elegance', colors: ['#8D6E63','#F8BBD0','#D7CCC8','#607D8B','#33691E'] },
  { name: '🥂 Champagne', colors: ['#FFF8E1','#FFDAB9','#F5DEB3','#D2B48C','#C19A6B'] },
  { name: '🌸 Boho Chic', colors: ['#FFE0B2','#FFB6C1','#DDA0DD','#C0C0C0','#F4A460'] },
  { name: '🌿 Sage & Terracotta', colors: ['#A5A58D','#F08080','#CD5C5C','#D2B48C','#BC8F8F'] },
  { name: '🌺 Blush and Gray', colors: ['#F8BBD0','#E6E6FA','#B0BEC5','#6D6D6D'] },
  { name: '🍑 Just Peachy', colors: ['#FFDAB9','#F4A460','#FA8072','#FFE4E1','#C3B091'] },
  { name: '❤️ Classic Romance', colors: ['#800020','#F5F5F5','#FFFFFF','#2F4F4F'] },
  { name: '🖤 Black & Blush', colors: ['#FADADD','#E6E6FA','#C0C0C0','#000000'] },
  { name: '⚪ Modern Minimalism', colors: ['#FFFFFF','#E0E0E0','#BDBDBD','#212121'] },
  { name: '🎨 Muted Hues', colors: ['#E6B0AA','#D7BDE2','#A9CCE3','#AEB6BF'] },
  { name: '🔵 Dusty Blue & Gray', colors: ['#B0C4DE','#A9A9A9','#778899','#2F4F4F'] },
  { name: '🤍 Simple Romance', colors: ['#D2B48C','#FFE4E1','#F5F5DC','#C0C0C0'] },
  { name: '❄️ Frosted Winter', colors: ['#E0FFFF','#4682B4','#708090','#004953'] },
  { name: '🛠 Rustic Steel', colors: ['#B87333','#D2B48C','#A9A9A9','#696969'] }
];

const VisualEditorWithInvitation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    id: id || '1',
    couple: { bride: 'María', groom: 'Juan' },
    date: '15 de Marzo, 2024',
    time: '17:00',
    ceremony: { venue: 'Iglesia San Miguel', address: 'Calle Mayor 123, Madrid', time: '17:00' },
    reception: { venue: 'Jardín Botánico', address: 'Av. Libertador 456, Madrid', time: '19:30' },
    description: '¡NOS CASAMOS!',
    hashtag: '#MariaYJuan2024',
    template: 'elegant',
    colors: { primary: '#e91e63', secondary: '#ffc0cb', background: '#ffffff', text: '#333333', accent: '#8e44ad' },
    fonts: { primary: 'Playfair Display', secondary: 'Inter' }
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

  // Panel lateral (mobile)
  const [showPanel, setShowPanel] = useState(false); // hidden on mobile by default
  const panelRef = useRef(null);

  // Palette for panel icons only
  const [panelPaletteIdx, setPanelPaletteIdx] = useState(0);
  const panelColors = NAMED_PALETTES[panelPaletteIdx]?.colors || ['#8D6E63','#F8BBD0','#D7CCC8','#607D8B'];

  useEffect(() => {
    // open panel by default on md+ screens
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setShowPanel(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Countdown
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

  const saveEvent = async () => {
    try {
      setSaving(true);
      await new Promise((r) => setTimeout(r, 500));
      console.log('Evento guardado:', event);
    } catch (err) {
      setError('Error guardando el evento');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleColorChange = (property, color) => {
    setEvent((prev) => ({ ...prev, colors: { ...prev.colors, [property]: color } }));
  };
  const handleFontChange = (type, fontFamily) => {
    setEvent((prev) => ({ ...prev, fonts: { ...prev.fonts, [type]: fontFamily } }));
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
  const handleUndo = () => { if (historyIndex > 0) setHistoryIndex(historyIndex - 1); };
  const handleRedo = () => { if (historyIndex < history.length - 1) setHistoryIndex(historyIndex + 1); };
  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));
  const previewInvitation = () => window.open(`/p/${event.id}`, '_blank');

  const fontFamilies = ['Inter','Helvetica Neue','Arial','Georgia','Times New Roman','Playfair Display','Montserrat','Open Sans','Lato','Roboto'];
  const templates = [
    { id: 'elegant', name: 'Elegante', description: 'Diseño sofisticado y minimalista' },
    { id: 'romantic', name: 'Romántico', description: 'Colores suaves y florales' },
    { id: 'modern', name: 'Moderno', description: 'Diseño contemporáneo y vibrante' },
    { id: 'classic', name: 'Clásico', description: 'Estilo tradicional y atemporal' }
  ];

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

  const renderInvitation = () => {
    const styles = {
      elegant: { background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', primaryColor: event.colors.primary, secondaryColor: event.colors.secondary, textColor: event.colors.text, fontFamily: event.fonts.primary },
      romantic: { background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', primaryColor: '#e91e63', secondaryColor: '#ffc0cb', textColor: '#333', fontFamily: 'Playfair Display' },
      modern: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', primaryColor: '#3498db', secondaryColor: '#2ecc71', textColor: '#fff', fontFamily: 'Inter' },
      classic: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', primaryColor: '#8e44ad', secondaryColor: '#e74c3c', textColor: '#333', fontFamily: 'Georgia' }
    };
    const currentStyle = styles[selectedTemplate] || styles.elegant;

    return (
      <div className="min-h-screen relative overflow-hidden" style={{ background: currentStyle.background, fontFamily: currentStyle.fontFamily, color: currentStyle.textColor }}>
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center relative px-4">
          <div className="absolute top-6 left-4 w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: currentStyle.primaryColor }} />
          <div className="absolute bottom-6 right-4 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: currentStyle.secondaryColor }} />

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-wider uppercase" style={{ color: currentStyle.primaryColor }}>
              <EditableText value={event.couple.bride} onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, bride: val } }))} as="span" ariaLabel="Nombre de la novia" />
            </h1>

            <div className="flex items-center justify-center my-6">
              <div className="h-px w-12 bg-gray-400" />
              <Heart className="mx-3 w-7 h-7" style={{ color: currentStyle.secondaryColor }} fill="currentColor" />
              <div className="h-px w-12 bg-gray-400" />
            </div>

            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wider uppercase" style={{ color: currentStyle.primaryColor }}>
              <EditableText value={event.couple.groom} onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, groom: val } }))} as="span" ariaLabel="Nombre del novio" />
            </h1>

            <p className="text-lg md:text-2xl font-light mb-10 tracking-wide" style={{ color: currentStyle.textColor }}>
              <EditableText value={event.description} onChange={(val) => setEvent((p) => ({ ...p, description: val }))} as="span" ariaLabel="Descripción principal" />
            </p>

            <div className="animate-bounce">
              <ChevronDown className="w-7 h-7 mx-auto" style={{ color: currentStyle.primaryColor }} />
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="py-12 md:py-16" style={{ backgroundColor: currentStyle.primaryColor }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-3xl font-light mb-6 md:mb-8 tracking-wide text-white">Faltan para nuestro gran día</h2>
            <div className="flex items-center justify-center gap-6 md:gap-8">
              <TimeCell value={timeLeft.days} label="días" />
              <div className="text-3xl md:text-6xl font-light text-white">:</div>
              <TimeCell value={timeLeft.hours} label="horas" />
              <div className="text-3xl md:text-6xl font-light text-white">:</div>
              <TimeCell value={timeLeft.minutes} label="min" />
              <div className="text-3xl md:text-6xl font-light text-white">:</div>
              <TimeCell value={timeLeft.seconds} label="seg" />
            </div>
          </div>
        </section>

        {/* Detalles */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12">
              {/* Ceremonia */}
              <div className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6" style={{ backgroundColor: `${currentStyle.primaryColor}20` }}>
                  <Church className="w-7 h-7 md:w-8 md:h-8" style={{ color: currentStyle.primaryColor }} />
                </div>
                <h3 className="text-xl md:text-2xl font-medium mb-5 tracking-wide" style={{ color: currentStyle.textColor }}>CEREMONIA</h3>
                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-gray-600">
                  <p className="text-base md:text-lg"><EditableText value={event.date} onChange={(val) => setEvent((p) => ({ ...p, date: val }))} ariaLabel="Fecha" /></p>
                  <p className="text-base md:text-lg"><EditableText value={event.ceremony.time} onChange={(val) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, time: val } }))} ariaLabel="Hora de ceremonia" /></p>
                  <p className="font-medium"><EditableText value={event.ceremony.venue} onChange={(val) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, venue: val } }))} ariaLabel="Lugar de ceremonia" /></p>
                  <p><EditableText value={event.ceremony.address} onChange={(val) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, address: val } }))} ariaLabel="Dirección de ceremonia" singleLine={false} /></p>
                </div>
                <Button className="px-7 py-3 rounded-full text-white" style={{ backgroundColor: currentStyle.primaryColor }}>
                  <MapPin className="w-4 h-4 mr-2" /> CÓMO LLEGAR
                </Button>
              </div>

              {/* Recepción */}
              <div className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6" style={{ backgroundColor: `${currentStyle.secondaryColor}20` }}>
                  <PartyPopper className="w-7 h-7 md:w-8 md:h-8" style={{ color: currentStyle.secondaryColor }} />
                </div>
                <h3 className="text-xl md:text-2xl font-medium mb-5 tracking-wide" style={{ color: currentStyle.textColor }}>RECEPCIÓN</h3>
                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-gray-600">
                  <p className="text-base md:text-lg"><EditableText value={event.date} onChange={(val) => setEvent((p) => ({ ...p, date: val }))} ariaLabel="Fecha de recepción" /></p>
                  <p className="text-base md:text-lg"><EditableText value={event.reception.time} onChange={(val) => setEvent((p) => ({ ...p, reception: { ...p.reception, time: val } }))} ariaLabel="Hora de recepción" /></p>
                  <p className="font-medium"><EditableText value={event.reception.venue} onChange={(val) => setEvent((p) => ({ ...p, reception: { ...p.reception, venue: val } }))} ariaLabel="Lugar de recepción" /></p>
                  <p><EditableText value={event.reception.address} onChange={(val) => setEvent((p) => ({ ...p, reception: { ...p.reception, address: val } }))} ariaLabel="Dirección de recepción" singleLine={false} /></p>
                </div>
                <Button className="px-7 py-3 rounded-full text-white" style={{ backgroundColor: currentStyle.secondaryColor }}>
                  <MapPin className="w-4 h-4 mr-2" /> CÓMO LLEGAR
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section className="py-12 md:py-16" style={{ backgroundColor: `${currentStyle.primaryColor}10` }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-light mb-5 md:mb-6" style={{ color: currentStyle.primaryColor }}>Confirma tu Asistencia</h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-600">Tu presencia es muy importante para nosotros</p>
            <Button size="lg" className="px-10 md:px-12 py-4 text-lg rounded-full text-white" style={{ backgroundColor: currentStyle.primaryColor }}>
              <Users className="w-5 h-5 mr-2" /> CONFIRMAR ASISTENCIA
            </Button>
          </div>
        </section>

        {/* Regalos */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-light mb-5 md:mb-6" style={{ color: currentStyle.textColor }}>Mesa de Regalos</h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-600">Si deseas hacernos un regalo, aquí tienes algunas opciones</p>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <Button variant="outline" size="lg" className="p-5 md:p-6 h-auto flex-col" style={{ borderColor: currentStyle.primaryColor, color: currentStyle.primaryColor }}>
                <Gift className="w-7 h-7 md:w-8 md:h-8 mb-2" />
                <span className="text-lg">Lista de Regalos</span>
              </Button>
              <Button variant="outline" size="lg" className="p-5 md:p-6 h-auto flex-col" style={{ borderColor: currentStyle.secondaryColor, color: currentStyle.secondaryColor }}>
                <CreditCard className="w-7 h-7 md:w-8 md:h-8 mb-2" />
                <span className="text-lg">Contribución</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 md:py-12 text-center" style={{ backgroundColor: currentStyle.primaryColor }}>
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-xl md:text-2xl font-light mb-4 text-white">¡Esperamos verte en nuestro gran día!</h3>
            <p className="text-white opacity-90 mb-5">
              <EditableText value={event.hashtag} onChange={(val) => setEvent((p) => ({ ...p, hashtag: val }))} ariaLabel="Hashtag" />
            </p>
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
          <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <Button variant="ghost" onClick={() => navigate('/app/dashboard')} className="shrink-0">
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver
            </Button>
            <div className="truncate">
              <h1 className="text-base md:text-xl font-semibold truncate">{event.couple.bride} & {event.couple.groom}</h1>
              <p className="text-xs md:text-sm text-gray-600">Editor Visual</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" onClick={handleUndo} disabled={historyIndex <= 0}><Undo className="h-4 w-4" /></Button>
            <Button variant="outline" onClick={handleRedo} disabled={historyIndex >= history.length - 1}><Redo className="h-4 w-4" /></Button>
            <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-lg">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}><ZoomOut className="h-4 w-4" /></Button>
              <span className="text-sm font-medium min-w-[3ch] text-center">{zoom}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}><ZoomIn className="h-4 w-4" /></Button>
            </div>
            <Button variant="outline" onClick={previewInvitation}><Eye className="h-4 w-4 mr-2" /> Vista Previa</Button>
            <Button onClick={saveEvent} disabled={saving}><Save className="h-4 w-4 mr-2" />{saving ? 'Guardando...' : 'Guardar'}</Button>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" onClick={() => setShowPanel(true)} aria-label="Abrir panel"><Menu className="h-5 w-5" /></Button>
            <Button variant="outline" size="sm" onClick={previewInvitation}><Eye className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      {error && (
        <Alert className="mx-4 md:mx-6 mt-3 md:mt-4"><AlertDescription>{error}</AlertDescription></Alert>
      )}

      <div className="flex h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
        {/* Side Panel (closeable on mobile) */}
        <div
          ref={panelRef}
          className={`$${''} ${showPanel ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                     fixed md:static inset-y-0 left-0 z-40 md:z-auto w-[85%] sm:w-80 bg-white border-r border-gray-200
                     transition-transform duration-200 ease-out overflow-y-auto`}
        >
          {/* Close button on mobile */}
          <div className="md:hidden sticky top-0 z-10 flex items-center justify-between px-3 py-2 border-b bg-white">
            <div className="text-sm font-medium truncate">Panel</div>
            <Button variant="ghost" size="icon" onClick={() => setShowPanel(false)} aria-label="Cerrar panel">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            {/* Tabs SOLO con íconos; coloreadas desde la paleta seleccionada */}
            <TabsList className="grid w-full grid-cols-4 p-1 m-4">
              <TabsTrigger value="design" aria-label="Diseño" title="Diseño">
                <Palette className="h-5 w-5" style={{ color: panelColors[0] }} />
                <span className="sr-only">Diseño</span>
              </TabsTrigger>
              <TabsTrigger value="content" aria-label="Contenido" title="Contenido">
                <Type className="h-5 w-5" style={{ color: panelColors[1] || panelColors[0] }} />
                <span className="sr-only">Contenido</span>
              </TabsTrigger>
              <TabsTrigger value="images" aria-label="Imágenes" title="Imágenes">
                <ImageIcon className="h-5 w-5" style={{ color: panelColors[2] || panelColors[0] }} />
                <span className="sr-only">Imágenes</span>
              </TabsTrigger>
              <TabsTrigger value="layout" aria-label="Templates" title="Templates">
                <Layout className="h-5 w-5" style={{ color: panelColors[3] || panelColors[0] }} />
                <span className="sr-only">Templates</span>
              </TabsTrigger>
            </TabsList>

            {/* Selector de paleta para el PANEL (solo cambia colores de íconos) */}
            <div className="px-4 -mt-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Colores del Panel (solo íconos)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-2 max-h-56 overflow-auto pr-1">
                    {NAMED_PALETTES.map((p, idx) => (
                      <button key={p.name} onClick={() => setPanelPaletteIdx(idx)} className={`text-left p-2 rounded border ${panelPaletteIdx===idx ? 'border-gray-800' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="text-xs font-medium mb-1">{p.name}</div>
                        <div className="flex gap-1">
                          {p.colors.slice(0,5).map((c) => (
                            <span key={c} className="h-4 w-6 rounded" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Diseño */}
            <TabsContent value="design" className="p-4 space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-sm">Colores Personalizados</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="primaryColor" className="text-xs">Color Principal</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="primaryColor" type="color" value={event.colors.primary} onChange={(e) => handleColorChange('primary', e.target.value)} className="w-12 h-8 p-0 border-0" />
                      <Input value={event.colors.primary} onChange={(e) => handleColorChange('primary', e.target.value)} className="flex-1 text-xs" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor" className="text-xs">Color Secundario</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="secondaryColor" type="color" value={event.colors.secondary} onChange={(e) => handleColorChange('secondary', e.target.value)} className="w-12 h-8 p-0 border-0" />
                      <Input value={event.colors.secondary} onChange={(e) => handleColorChange('secondary', e.target.value)} className="flex-1 text-xs" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="textColor" className="text-xs">Color de Texto</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="textColor" type="color" value={event.colors.text} onChange={(e) => handleColorChange('text', e.target.value)} className="w-12 h-8 p-0 border-0" />
                      <Input value={event.colors.text} onChange={(e) => handleColorChange('text', e.target.value)} className="flex-1 text-xs" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Paletas para ASPECTO DE LA INVITACIÓN (aplican al diseño, no al panel) */}
              <Card>
                <CardHeader><CardTitle className="text-sm">Paletas para la invitación</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {NAMED_PALETTES.map((p) => (
                    <div key={`design-${p.name}`} className="flex items-center justify-between">
                      <div className="text-xs font-medium mr-2 truncate max-w-[55%]">{p.name}</div>
                      <div className="flex gap-1">
                        {p.colors.slice(0,5).map((c) => <span key={c} className="h-4 w-6 rounded" style={{ backgroundColor: c }} />)}
                      </div>
                      <Button size="sm" variant="outline" className="ml-2" onClick={() => {
                        handleColorChange('primary', p.colors[0] || event.colors.primary);
                        handleColorChange('secondary', p.colors[1] || event.colors.secondary);
                        handleColorChange('text', p.colors[3] || event.colors.text);
                      }}>Usar</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contenido */}
            <TabsContent value="content" className="p-4 space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-sm">Información de la Pareja</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="bride" className="text-xs">Novia</Label>
                    <Input id="bride" value={event.couple.bride} onChange={(e) => setEvent((prev) => ({ ...prev, couple: { ...prev.couple, bride: e.target.value } }))} className="text-xs" />
                  </div>
                  <div>
                    <Label htmlFor="groom" className="text-xs">Novio</Label>
                    <Input id="groom" value={event.couple.groom} onChange={(e) => setEvent((prev) => ({ ...prev, couple: { ...prev.couple, groom: e.target.value } }))} className="text-xs" />
                  </div>
                  <div>
                    <Label htmlFor="hashtag" className="text-xs">Hashtag</Label>
                    <Input id="hashtag" value={event.hashtag} onChange={(e) => setEvent((prev) => ({ ...prev, hashtag: e.target.value }))} className="text-xs" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-sm">Detalles del Evento</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="eventDate" className="text-xs">Fecha</Label>
                    <Input id="eventDate" value={event.date} onChange={(e) => setEvent((prev) => ({ ...prev, date: e.target.value }))} className="text-xs" />
                  </div>
                  <div>
                    <Label htmlFor="ceremonyVenue" className="text-xs">Lugar de Ceremonia</Label>
                    <Input id="ceremonyVenue" value={event.ceremony.venue} onChange={(e) => setEvent((prev) => ({ ...prev, ceremony: { ...prev.ceremony, venue: e.target.value } }))} className="text-xs" />
                  </div>
                  <div>
                    <Label htmlFor="ceremonyAddress" className="text-xs">Dirección de Ceremonia</Label>
                    <Input id="ceremonyAddress" value={event.ceremony.address} onChange={(e) => setEvent((prev) => ({ ...prev, ceremony: { ...prev.ceremony, address: e.target.value } }))} className="text-xs" />
                  </div>
                  <div>
                    <Label htmlFor="receptionVenue" className="text-xs">Lugar de Recepción</Label>
                    <Input id="receptionVenue" value={event.reception.venue} onChange={(e) => setEvent((prev) => ({ ...prev, reception: { ...prev.reception, venue: e.target.value } }))} className="text-xs" />
                  </div>
                  <div>
                    <Label htmlFor="receptionAddress" className="text-xs">Dirección de Recepción</Label>
                    <Input id="receptionAddress" value={event.reception.address} onChange={(e) => setEvent((prev) => ({ ...prev, reception: { ...prev.reception, address: e.target.value } }))} className="text-xs" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Imágenes */}
            <TabsContent value="images" className="p-4 space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-sm">Subir Imagen</CardTitle></CardHeader>
                <CardContent>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-sm">Galería</CardTitle></CardHeader>
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
                <CardHeader><CardTitle className="text-sm">Templates</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {templates.map((template) => (
                      <div key={template.id} className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => handleTemplateChange(template.id)}>
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

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className="min-h-full" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
            {renderInvitation()}
          </div>
        </div>
      </div>

      {/* Mobile bottom bar for zoom + save */}
      <div className="md:hidden fixed bottom-3 left-0 right-0 z-30 flex justify-center">
        <div className="bg-white/95 backdrop-blur border rounded-full shadow px-2 py-1 flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleZoomOut}><ZoomOut className="h-4 w-4" /></Button>
          <span className="text-sm font-medium min-w-[3ch] text-center">{zoom}%</span>
          <Button variant="ghost" size="sm" onClick={handleZoomIn}><ZoomIn className="h-4 w-4" /></Button>
          <Button size="sm" className="ml-1" onClick={saveEvent}><Save className="h-4 w-4 mr-1" />Guardar</Button>
        </div>
      </div>
    </div>
  );
};

export default VisualEditorWithInvitation;
