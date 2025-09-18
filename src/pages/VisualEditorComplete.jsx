// src/pages/VisualEditorComplete.jsx
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
  CreditCard,
  Menu,
  X,
  Monitor,
  Tablet,
  Smartphone
} from 'lucide-react';

/** Componente de texto editable optimizado para móviles */
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const beginEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
    
    // Delay para asegurar que el elemento esté listo
    setTimeout(() => {
      if (!ref.current) return;
      
      // Forzar foco y selección
      ref.current.focus();
      
      // Seleccionar todo el texto
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      
      // En móviles, scroll al elemento
      if (isMobile) {
        ref.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 50);
  };

  const endEdit = () => {
    setEditing(false);
    // Limpiar selección
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  };

  const handleInput = (e) => {
    const text = e.currentTarget.textContent || '';
    onChange(text);
  };

  const handleKeyDown = (e) => {
    if (singleLine && e.key === 'Enter') {
      e.preventDefault();
      ref.current?.blur();
    }
    // Escape para cancelar edición
    if (e.key === 'Escape') {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    
    // Insertar texto plano sin formato
    if (document.execCommand) {
      document.execCommand('insertText', false, text);
    } else {
      // Fallback para navegadores modernos
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
        range.collapse(false);
      }
    }
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
      spellCheck={false}
      className={`${className} outline-none transition-all duration-200 ${
        editing 
          ? 'ring-2 ring-blue-400 bg-blue-50 rounded-sm px-1' 
          : 'hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer'
      } ${isMobile ? 'touch-manipulation' : ''}`}
      style={{
        direction: 'ltr',
        textAlign: 'inherit',
        whiteSpace: singleLine ? 'nowrap' : 'pre-wrap',
        minWidth: editing ? '100px' : 'auto',
        minHeight: editing ? '1.2em' : 'auto',
        ...style
      }}
    >
      {value}
    </Tag>
  );
};

const VisualEditorComplete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado del evento
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

  // Estados UI
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('design');
  const [zoom, setZoom] = useState(100);
  const [selectedTemplate, setSelectedTemplate] = useState('elegant');
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const [viewMode, setViewMode] = useState('desktop'); // desktop, tablet, mobile
  const [isMobile, setIsMobile] = useState(false);

  const fileInputRef = useRef(null);

  // Detectar dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode('mobile');
        setZoom(80); // Zoom más pequeño en móviles
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Paletas de colores
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

  // Funciones
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

  const handleZoomIn = () => setZoom((z) => Math.min(z + 10, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 10, 50));

  const previewInvitation = () => window.open(`/p/${event.id}`, '_blank');

  // Componente TimeCell para countdown
  const TimeCell = ({ value, label }) => (
    <div className=\"flex flex-col items-center\">
      <div 
        className={`font-light leading-none ${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'}`}
        style={{ color: event.colors.primary }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div 
        className={`opacity-90 ${isMobile ? 'text-xs' : 'text-sm sm:text-base'}`}
        style={{ color: event.colors.text }}
      >
        {label}
      </div>
    </div>
  );

  // Render de la invitación
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

    // Calcular dimensiones según el modo de vista
    const getCanvasStyle = () => {
      const baseWidth = viewMode === 'mobile' ? 375 : viewMode === 'tablet' ? 768 : 1200;
      const scaledWidth = (baseWidth * zoom) / 100;
      
      return {
        width: `${scaledWidth}px`,
        minHeight: viewMode === 'mobile' ? 'auto' : '100vh',
        transform: `scale(${zoom / 100})`,
        transformOrigin: 'top left',
        margin: isMobile ? '0' : '0 auto'
      };
    };

    return (
      <div
        className=\"invitation-canvas\"
        style={{
          ...getCanvasStyle(),
          background: currentStyle.background,
          fontFamily: currentStyle.fontFamily,
          color: currentStyle.textColor,
          overflow: 'hidden'
        }}
      >
        {/* Hero Section */}
        <section className={`min-h-screen flex items-center justify-center relative ${isMobile ? 'px-4 py-8' : 'px-8'}`}>
          <div
            className={`absolute ${isMobile ? 'top-4 left-4 w-12 h-12' : 'top-10 left-10 w-20 h-20'} rounded-full opacity-20`}
            style={{ backgroundColor: currentStyle.primaryColor }}
          />
          <div
            className={`absolute ${isMobile ? 'bottom-4 right-4 w-16 h-16' : 'bottom-10 right-10 w-32 h-32'} rounded-full opacity-10`}
            style={{ backgroundColor: currentStyle.secondaryColor }}
          />

          <div className=\"text-center max-w-4xl mx-auto relative z-10\">
            <h1
              className={`font-light mb-4 tracking-wider uppercase ${
                isMobile ? 'text-4xl' : 'text-6xl md:text-8xl'
              }`}
              style={{ color: currentStyle.primaryColor }}
            >
              <EditableText
                value={event.couple.bride}
                onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, bride: val } }))}
                as=\"span\"
                ariaLabel=\"Nombre de la novia\"
              />
            </h1>

            <div className=\"flex items-center justify-center my-8\">
              <div className=\"h-px w-16 bg-gray-400\" />
              <Heart 
                className={`mx-4 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`}
                style={{ color: currentStyle.secondaryColor }} 
                fill=\"currentColor\" 
              />
              <div className=\"h-px w-16 bg-gray-400\" />
            </div>

            <h1
              className={`font-light mb-8 tracking-wider uppercase ${
                isMobile ? 'text-4xl' : 'text-6xl md:text-8xl'
              }`}
              style={{ color: currentStyle.primaryColor }}
            >
              <EditableText
                value={event.couple.groom}
                onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, groom: val } }))}
                as=\"span\"
                ariaLabel=\"Nombre del novio\"
              />
            </h1>

            <p 
              className={`font-light mb-12 tracking-wide ${
                isMobile ? 'text-lg' : 'text-xl md:text-2xl'
              }`}
              style={{ color: currentStyle.textColor }}
            >
              <EditableText
                value={event.description}
                onChange={(val) => setEvent((p) => ({ ...p, description: val }))}
                as=\"span\"
                ariaLabel=\"Descripción principal\"
              />
            </p>

            <div className=\"animate-bounce\">
              <ChevronDown 
                className={`mx-auto ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`}
                style={{ color: currentStyle.primaryColor }} 
              />
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className={`${isMobile ? 'py-8' : 'py-16'}`} style={{ backgroundColor: currentStyle.primaryColor }}>
          <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'px-4' : 'px-8'}`}>
            <h2 className={`font-light mb-8 tracking-wide text-white ${
              isMobile ? 'text-xl' : 'text-2xl md:text-3xl'
            }`}>
              Faltan para nuestro gran día
            </h2>
            <div className={`flex items-center justify-center ${isMobile ? 'gap-4' : 'gap-8'}`}>
              <TimeCell value={timeLeft.days} label=\"días\" />
              <div className={`font-light text-white ${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'}`}>:</div>
              <TimeCell value={timeLeft.hours} label=\"horas\" />
              <div className={`font-light text-white ${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'}`}>:</div>
              <TimeCell value={timeLeft.minutes} label=\"min\" />
              <div className={`font-light text-white ${isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'}`}>:</div>
              <TimeCell value={timeLeft.seconds} label=\"seg\" />
            </div>
          </div>
        </section>

        {/* Detalles Section */}
        <section className={`bg-white ${isMobile ? 'py-8' : 'py-16'}`}>
          <div className={`max-w-6xl mx-auto ${isMobile ? 'px-4' : 'px-8'}`}>
            <div className={`grid gap-12 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
              {/* Ceremonia */}
              <div className=\"text-center\">
                <div
                  className={`rounded-full flex items-center justify-center mx-auto mb-6 ${
                    isMobile ? 'w-12 h-12' : 'w-16 h-16'
                  }`}
                  style={{ backgroundColor: `${currentStyle.primaryColor}20` }}
                >
                  <Church 
                    className={isMobile ? 'w-6 h-6' : 'w-8 h-8'}
                    style={{ color: currentStyle.primaryColor }} 
                  />
                </div>
                <h3 
                  className={`font-medium mb-6 tracking-wide ${
                    isMobile ? 'text-xl' : 'text-2xl'
                  }`}
                  style={{ color: currentStyle.textColor }}
                >
                  CEREMONIA
                </h3>
                <div className={`space-y-3 mb-8 text-gray-600 ${isMobile ? 'text-base' : ''}`}>
                  <p className={isMobile ? 'text-base' : 'text-lg'}>
                    <EditableText
                      value={event.date}
                      onChange={(val) => setEvent((p) => ({ ...p, date: val }))}
                      ariaLabel=\"Fecha\"
                    />
                  </p>
                  <p className={isMobile ? 'text-base' : 'text-lg'}>
                    <EditableText
                      value={event.ceremony.time}
                      onChange={(val) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, time: val } }))}
                      ariaLabel=\"Hora de ceremonia\"
                    />
                  </p>
                  <p className=\"font-medium\">
                    <EditableText
                      value={event.ceremony.venue}
                      onChange={(val) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, venue: val } }))}
                      ariaLabel=\"Lugar de ceremonia\"
                    />
                  </p>
                  <p>
                    <EditableText
                      value={event.ceremony.address}
                      onChange={(val) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, address: val } }))}
                      ariaLabel=\"Dirección de ceremonia\"
                      singleLine={false}
                    />
                  </p>
                </div>
                <Button 
                  className={`rounded-full text-white ${
                    isMobile ? 'px-6 py-2 text-sm' : 'px-8 py-3'
                  }`}
                  style={{ backgroundColor: currentStyle.primaryColor }}
                >
                  <MapPin className={`mr-2 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  CÓMO LLEGAR
                </Button>
              </div>

              {/* Recepción */}
              <div className=\"text-center\">
                <div
                  className={`rounded-full flex items-center justify-center mx-auto mb-6 ${
                    isMobile ? 'w-12 h-12' : 'w-16 h-16'
                  }`}
                  style={{ backgroundColor: `${currentStyle.secondaryColor}20` }}
                >
                  <PartyPopper 
                    className={isMobile ? 'w-6 h-6' : 'w-8 h-8'}
                    style={{ color: currentStyle.secondaryColor }} 
                  />
                </div>
                <h3 
                  className={`font-medium mb-6 tracking-wide ${
                    isMobile ? 'text-xl' : 'text-2xl'
                  }`}
                  style={{ color: currentStyle.textColor }}
                >
                  RECEPCIÓN
                </h3>
                <div className={`space-y-3 mb-8 text-gray-600 ${isMobile ? 'text-base' : ''}`}>
                  <p className={isMobile ? 'text-base' : 'text-lg'}>
                    <EditableText
                      value={event.date}
                      onChange={(val) => setEvent((p) => ({ ...p, date: val }))}
                      ariaLabel=\"Fecha de recepción\"
                    />
                  </p>
                  <p className={isMobile ? 'text-base' : 'text-lg'}>
                    <EditableText
                      value={event.reception.time}
                      onChange={(val) => setEvent((p) => ({ ...p, reception: { ...p.reception, time: val } }))}
                      ariaLabel=\"Hora de recepción\"
                    />
                  </p>
                  <p className=\"font-medium\">
                    <EditableText
                      value={event.reception.venue}
                      onChange={(val) => setEvent((p) => ({ ...p, reception: { ...p.reception, venue: val } }))}
                      ariaLabel=\"Lugar de recepción\"
                    />
                  </p>
                  <p>
                    <EditableText
                      value={event.reception.address}
                      onChange={(val) => setEvent((p) => ({ ...p, reception: { ...p.reception, address: val } }))}
                      ariaLabel=\"Dirección de recepción\"
                      singleLine={false}
                    />
                  </p>
                </div>
                <Button 
                  className={`rounded-full text-white ${
                    isMobile ? 'px-6 py-2 text-sm' : 'px-8 py-3'
                  }`}
                  style={{ backgroundColor: currentStyle.secondaryColor }}
                >
                  <MapPin className={`mr-2 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  CÓMO LLEGAR
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section className={`${isMobile ? 'py-8' : 'py-16'}`} style={{ backgroundColor: '#f8f9fa' }}>
          <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'px-4' : 'px-8'}`}>
            <h2 
              className={`font-light mb-6 ${
                isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
              }`}
              style={{ color: currentStyle.primaryColor }}
            >
              Confirma tu Asistencia
            </h2>
            <p className={`mb-8 text-gray-600 ${isMobile ? 'text-base' : 'text-lg'}`}>
              Tu presencia es muy importante para nosotros
            </p>
            <Button
              size={isMobile ? 'default' : 'lg'}
              className={`rounded-full text-white ${
                isMobile ? 'px-8 py-3 text-base' : 'px-12 py-4 text-lg'
              }`}
              style={{ backgroundColor: currentStyle.primaryColor }}
            >
              <Users className={`mr-2 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              CONFIRMAR ASISTENCIA
            </Button>
          </div>
        </section>

        {/* Mesa de Regalos */}
        <section className={`bg-white ${isMobile ? 'py-8' : 'py-16'}`}>
          <div className={`max-w-4xl mx-auto text-center ${isMobile ? 'px-4' : 'px-8'}`}>
            <h2 
              className={`font-light mb-6 ${
                isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
              }`}
              style={{ color: currentStyle.textColor }}
            >
              Mesa de Regalos
            </h2>
            <p className={`mb-8 text-gray-600 ${isMobile ? 'text-base' : 'text-lg'}`}>
              Si deseas hacernos un regalo, aquí tienes algunas opciones
            </p>
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
              <Button
                variant=\"outline\"
                size={isMobile ? 'default' : 'lg'}
                className={`h-auto flex-col ${isMobile ? 'p-4' : 'p-6'}`}
                style={{ borderColor: currentStyle.primaryColor, color: currentStyle.primaryColor }}
              >
                <Gift className={`mb-2 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                <span className={isMobile ? 'text-base' : 'text-lg'}>Lista de Regalos</span>
              </Button>
              <Button
                variant=\"outline\"
                size={isMobile ? 'default' : 'lg'}
                className={`h-auto flex-col ${isMobile ? 'p-4' : 'p-6'}`}
                style={{ borderColor: currentStyle.secondaryColor, color: currentStyle.secondaryColor }}
              >
                <CreditCard className={`mb-2 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                <span className={isMobile ? 'text-base' : 'text-lg'}>Contribución</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`text-center ${isMobile ? 'py-8' : 'py-12'}`} style={{ backgroundColor: currentStyle.primaryColor }}>
          <div className={`max-w-4xl mx-auto ${isMobile ? 'px-4' : 'px-8'}`}>
            <h3 className={`font-light mb-4 text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
              ¡Esperamos verte en nuestro gran día!
            </h3>
            <p className=\"text-white opacity-90 mb-6\">
              <EditableText
                value={event.hashtag}
                onChange={(val) => setEvent((p) => ({ ...p, hashtag: val }))}
                ariaLabel=\"Hashtag\"
              />
            </p>
            <div className=\"flex justify-center space-x-6\">
              <Button variant=\"ghost\" size=\"sm\" className=\"text-white hover:bg-white/20\">
                <Instagram className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
              </Button>
              <Button variant=\"ghost\" size=\"sm\" className=\"text-white hover:bg-white/20\">
                <Facebook className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
              </Button>
              <Button variant=\"ghost\" size=\"sm\" className=\"text-white hover:bg-white/20\">
                <Share2 className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
              </Button>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  if (loading) {
    return (
      <div className=\"min-h-screen flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto\"></div>
          <p className=\"mt-4 text-gray-600\">Cargando editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gray-50\">
      {/* Header optimizado para móviles */}
      <div className=\"bg-white border-b border-gray-200 px-4 py-3\">
        <div className=\"flex items-center justify-between\">
          <div className=\"flex items-center gap-3\">
            <Button variant=\"ghost\" size=\"sm\" onClick={() => navigate('/app/dashboard')}>
              <ArrowLeft className=\"h-4 w-4 mr-1\" />
              {!isMobile && 'Volver'}
            </Button>
            <div>
              <h1 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}>
                {event.couple.bride} & {event.couple.groom}
              </h1>
              <p className=\"text-xs text-gray-600\">Editor Visual</p>
            </div>
          </div>

          <div className=\"flex items-center gap-2\">
            {/* Controles de vista en desktop */}
            {!isMobile && (
              <>
                <div className=\"flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg\">
                  <Button 
                    variant={viewMode === 'desktop' ? 'default' : 'ghost'} 
                    size=\"sm\"
                    onClick={() => setViewMode('desktop')}
                  >
                    <Monitor className=\"h-3 w-3\" />
                  </Button>
                  <Button 
                    variant={viewMode === 'tablet' ? 'default' : 'ghost'} 
                    size=\"sm\"
                    onClick={() => setViewMode('tablet')}
                  >
                    <Tablet className=\"h-3 w-3\" />
                  </Button>
                  <Button 
                    variant={viewMode === 'mobile' ? 'default' : 'ghost'} 
                    size=\"sm\"
                    onClick={() => setViewMode('mobile')}
                  >
                    <Smartphone className=\"h-3 w-3\" />
                  </Button>
                </div>

                <div className=\"flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg\">
                  <Button variant=\"ghost\" size=\"sm\" onClick={handleZoomOut}>
                    <ZoomOut className=\"h-3 w-3\" />
                  </Button>
                  <span className=\"text-xs font-medium px-2\">{zoom}%</span>
                  <Button variant=\"ghost\" size=\"sm\" onClick={handleZoomIn}>
                    <ZoomIn className=\"h-3 w-3\" />
                  </Button>
                </div>
              </>
            )}

            {/* Botón de panel en móviles */}
            {isMobile && (
              <Button 
                variant=\"outline\" 
                size=\"sm\"
                onClick={() => setShowMobilePanel(!showMobilePanel)}
              >
                {showMobilePanel ? <X className=\"h-4 w-4\" /> : <Menu className=\"h-4 w-4\" />}
              </Button>
            )}

            <Button variant=\"outline\" size=\"sm\" onClick={previewInvitation}>
              <Eye className=\"h-4 w-4 mr-1\" />
              {!isMobile && 'Vista Previa'}
            </Button>

            <Button size=\"sm\" onClick={saveEvent} disabled={saving}>
              <Save className=\"h-4 w-4 mr-1\" />
              {saving ? 'Guardando...' : !isMobile ? 'Guardar' : ''}
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <Alert className=\"mx-4 mt-4\">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className=\"flex h-[calc(100vh-80px)]\">
        {/* Panel lateral - Responsive */}
        <div className={`
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
                showMobilePanel ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-80 bg-white border-r border-gray-200'
          } 
          overflow-y-auto
        `}>
          {/* Overlay para móviles */}
          {isMobile && showMobilePanel && (
            <div 
              className=\"fixed inset-0 bg-black bg-opacity-50 z-40\"
              onClick={() => setShowMobilePanel(false)}
            />
          )}
          
          <div className=\"relative z-50 bg-white h-full\">
            <Tabs value={activeTab} onValueChange={setActiveTab} className=\"h-full\">
              {/* Tabs optimizadas para móviles */}
              <TabsList className=\"grid w-full grid-cols-4 p-1 m-4\">
                <TabsTrigger value=\"design\" className=\"flex flex-col items-center gap-1 p-2\">
                  <Palette className=\"h-4 w-4\" />
                  <span className=\"text-xs\">Diseño</span>
                </TabsTrigger>
                <TabsTrigger value=\"content\" className=\"flex flex-col items-center gap-1 p-2\">
                  <Type className=\"h-4 w-4\" />
                  <span className=\"text-xs\">Contenido</span>
                </TabsTrigger>
                <TabsTrigger value=\"images\" className=\"flex flex-col items-center gap-1 p-2\">
                  <ImageIcon className=\"h-4 w-4\" />
                  <span className=\"text-xs\">Imágenes</span>
                </TabsTrigger>
                <TabsTrigger value=\"layout\" className=\"flex flex-col items-center gap-1 p-2\">
                  <Layout className=\"h-4 w-4\" />
                  <span className=\"text-xs\">Templates</span>
                </TabsTrigger>
              </TabsList>

              {/* Contenido de tabs */}
              <div className=\"px-4 pb-4\">
                {/* Tab Diseño */}
                <TabsContent value=\"design\" className=\"space-y-4 mt-0\">
                  <Card>
                    <CardHeader className=\"pb-3\">
                      <CardTitle className=\"text-sm\">Paletas de Colores</CardTitle>
                    </CardHeader>
                    <CardContent className=\"space-y-3\">
                      {colorPalettes.map((palette) => (
                        <div key={palette.name}>
                          <Label className=\"text-xs font-medium\">{palette.name}</Label>
                          <div className=\"flex gap-2 mt-1\">
                            {palette.colors.map((color) => (
                              <button
                                key={color}
                                className=\"w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors\"
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
                    <CardHeader className=\"pb-3\">
                      <CardTitle className=\"text-sm\">Colores Personalizados</CardTitle>
                    </CardHeader>
                    <CardContent className=\"space-y-3\">
                      <div>
                        <Label htmlFor=\"primaryColor\" className=\"text-xs\">Color Principal</Label>
                        <div className=\"flex gap-2 mt-1\">
                          <Input
                            id=\"primaryColor\"
                            type=\"color\"
                            value={event.colors.primary}
                            onChange={(e) => handleColorChange('primary', e.target.value)}
                            className=\"w-12 h-8 p-0 border-0\"
                          />
                          <Input
                            value={event.colors.primary}
                            onChange={(e) => handleColorChange('primary', e.target.value)}
                            className=\"flex-1 text-xs\"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor=\"secondaryColor\" className=\"text-xs\">Color Secundario</Label>
                        <div className=\"flex gap-2 mt-1\">
                          <Input
                            id=\"secondaryColor\"
                            type=\"color\"
                            value={event.colors.secondary}
                            onChange={(e) => handleColorChange('secondary', e.target.value)}
                            className=\"w-12 h-8 p-0 border-0\"
                          />
                          <Input
                            value={event.colors.secondary}
                            onChange={(e) => handleColorChange('secondary', e.target.value)}
                            className=\"flex-1 text-xs\"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor=\"textColor\" className=\"text-xs\">Color de Texto</Label>
                        <div className=\"flex gap-2 mt-1\">
                          <Input
                            id=\"textColor\"
                            type=\"color\"
                            value={event.colors.text}
                            onChange={(e) => handleColorChange('text', e.target.value)}
                            className=\"w-12 h-8 p-0 border-0\"
                          />
                          <Input
                            value={event.colors.text}
                            onChange={(e) => handleColorChange('text', e.target.value)}
                            className=\"flex-1 text-xs\"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className=\"pb-3\">
                      <CardTitle className=\"text-sm\">Tipografía</CardTitle>
                    </CardHeader>
                    <CardContent className=\"space-y-3\">
                      <div>
                        <Label className=\"text-xs\">Fuente Principal</Label>
                        <select
                          value={event.fonts.primary}
                          onChange={(e) => handleFontChange('primary', e.target.value)}
                          className=\"w-full mt-1 p-2 border border-gray-300 rounded text-sm\"
                        >
                          {fontFamilies.map((font) => (
                            <option key={font} value={font} style={{ fontFamily: font }}>
                              {font}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label className=\"text-xs\">Fuente Secundaria</Label>
                        <select
                          value={event.fonts.secondary}
                          onChange={(e) => handleFontChange('secondary', e.target.value)}
                          className=\"w-full mt-1 p-2 border border-gray-300 rounded text-sm\"
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

                {/* Tab Contenido */}
                <TabsContent value=\"content\" className=\"space-y-4 mt-0\">
                  <Card>
                    <CardHeader className=\"pb-3\">
                      <CardTitle className=\"text-sm\">Información de la Pareja</CardTitle>
                    </CardHeader>
                    <CardContent className=\"space-y-3\">
                      <div>
                        <Label htmlFor=\"bride\" className=\"text-xs\">Novia</Label>
                        <Input
                          id=\"bride\"
                          value={event.couple.bride}
                          onChange={(e) =>
                            setEvent((prev) => ({ ...prev, couple: { ...prev.couple, bride: e.target.value } }))
                          }
                          className=\"text-xs mt-1\"
                        />
                      </div>

                      <div>
                        <Label htmlFor=\"groom\" className=\"text-xs\">Novio</Label>
                        <Input
                          id=\"groom\"
                          value={event.couple.groom}
                          onChange={(e) =>
                            setEvent((prev) => ({ ...prev, couple: { ...prev.couple, groom: e.target.value } }))
                          }
                          className=\"text-xs mt-1\"
                        />
                      </div>

                      <div>
                        <Label htmlFor=\"hashtag\" className=\"text-xs\">Hashtag</Label>
                        <Input
                          id=\"hashtag\"
                          value={event.hashtag}
                          onChange={(e) => setEvent((prev) => ({ ...prev, hashtag: e.target.value }))}
                          className=\"text-xs mt-1\"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className=\"pb-3\">
                      <CardTitle className=\"text-sm\">Detalles del Evento</CardTitle>
                    </CardHeader>
                    <CardContent className=\"space-y-3\">
                      <div>
                        <Label htmlFor=\"eventDate\" className=\"text-xs\">Fecha</Label>
                        <Input
                          id=\"eventDate\"
                          value={event.date}
                          onChange={(e) => setEvent((prev) => ({ ...prev, date: e.target.value }))}
                          className=\"text-xs mt-1\"
                        />
                      </div>

                      <div>
                        <Label htmlFor=\"ceremonyVenue\" className=\"text-xs\">Lugar de Ceremonia</Label>
                        <Input
                          id=\"ceremonyVenue\"
                          value={event.ceremony.venue}
                          onChange={(e) =>
                            setEvent((prev) => ({ ...prev, ceremony: { ...prev.ceremony, venue: e.target.value } }))
                          }
                          className=\"text-xs mt-1\"
                        />
                      </div>

                      <div>
                        <Label htmlFor=\"ceremonyAddress\" className=\"text-xs\">Dirección de Ceremonia</Label>
                        <Textarea
                          id=\"ceremonyAddress\"
                          value={event.ceremony.address}
                          onChange={(e) =>
                            setEvent((prev) => ({ ...prev, ceremony: { ...prev.ceremony, address: e.target.value } }))
                          }
                          className=\"text-xs mt-1 min-h-[60px]\"
                        />
                      </div>

                      <div>
                        <Label htmlFor=\"receptionVenue\" className=\"text-xs\">Lugar de Recepción</Label>
                        <Input
                          id=\"receptionVenue\"
                          value={event.reception.venue}
                          onChange={(e) =>
                            setEvent((prev) => ({ ...prev, reception: { ...prev.reception, venue: e.target.value } }))
                          }
                          className=\"text-xs mt-1\"
                        />
                      </div>

                      <div>
                        <Label htmlFor=\"receptionAddress\" className=\"text-xs\">Dirección de Recepción</Label>
                        <Textarea
                          id=\"receptionAddress\"
                          value={event.reception.address}
                          onChange={(e) =>
                            setEvent((prev) => ({ ...prev, reception: { ...prev.reception, address: e.target.value } }))
                          }
                          className=\"text-xs mt-1 min-h-[60px]\"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab Imágenes */}
                <TabsContent value=\"images\" className=\"space-y-4 mt-0\">
                  <Card>
                    <CardHeader className=\"pb-3\">
                      <CardTitle className=\"text-sm\">Subir Imágenes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className=\"border-2 border-dashed border-gray-300 rounded-lg p-6 text-center\">
                        <Upload className=\"w-8 h-8 mx-auto mb-2 text-gray-400\" />
                        <p className=\"text-xs text-gray-600 mb-2\">
                          Arrastra imágenes aquí o haz clic para seleccionar
                        </p>
                        <Button
                          variant=\"outline\"
                          size=\"sm\"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Seleccionar Archivos
                        </Button>
                        <input
                          ref={fileInputRef}
                          type=\"file\"
                          accept=\"image/*\"
                          multiple
                          className=\"hidden\"
                          onChange={(e) => {
                            // Manejar subida de archivos
                            console.log('Archivos seleccionados:', e.target.files);
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab Templates */}
                <TabsContent value=\"layout\" className=\"space-y-4 mt-0\">
                  <Card>
                    <CardHeader className=\"pb-3\">
                      <CardTitle className=\"text-sm\">Plantillas</CardTitle>
                    </CardHeader>
                    <CardContent className=\"space-y-3\">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedTemplate === template.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleTemplateChange(template.id)}
                        >
                          <h4 className=\"font-medium text-sm\">{template.name}</h4>
                          <p className=\"text-xs text-gray-600 mt-1\">{template.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Canvas principal */}
        <div className=\"flex-1 overflow-auto bg-gray-100\">
          <div className={`${isMobile ? 'p-2' : 'p-8'} flex justify-center`}>
            <div className=\"bg-white shadow-lg rounded-lg overflow-hidden\">
              {renderInvitation()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualEditorComplete;
