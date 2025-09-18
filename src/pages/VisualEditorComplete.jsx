// src/pages/VisualEditorComplete.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react';
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
  Smartphone,
  Move,
  RotateCcw
} from 'lucide-react';

// Custom hook para detectar dispositivos móviles
const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    orientation: 'portrait',
    screenSize: { width: 0, height: 0 }
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        orientation: width > height ? 'landscape' : 'portrait',
        screenSize: { width, height }
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

// Custom hook para debounce optimizado
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook para touch gestures MEJORADO - Sin interferir con edición de texto
const useTouchGestures = (ref) => {
  const [gesture, setGesture] = useState(null);
  
  useEffect(() => {
    if (!ref.current) return;

    let startX = 0;
    let startY = 0;
    let startDistance = 0;
    let startZoom = 100;
    let isEditing = false;

    const handleTouchStart = (e) => {
      // ✅ FIX: No interferir si se está editando texto
      const target = e.target;
      if (target.contentEditable === 'true' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        isEditing = true;
        return;
      }
      isEditing = false;

      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        startDistance = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const handleTouchMove = (e) => {
      // ✅ FIX: No prevenir eventos si se está editando
      if (isEditing) return;
      
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        
        if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
          setGesture({
            type: 'swipe',
            direction: Math.abs(deltaX) > Math.abs(deltaY) 
              ? (deltaX > 0 ? 'right' : 'left')
              : (deltaY > 0 ? 'down' : 'up'),
            deltaX,
            deltaY
          });
        }
      } else if (e.touches.length === 2) {
        // Solo prevenir para gestos de pinch, no para edición
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scale = distance / startDistance;
        
        setGesture({
          type: 'pinch',
          scale,
          zoom: Math.max(50, Math.min(200, startZoom * scale))
        });
      }
    };

    const handleTouchEnd = () => {
      setGesture(null);
      isEditing = false;
    };

    const element = ref.current;
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref]);

  return gesture;
};

// Reducer para manejar el estado del evento de manera más eficiente
const eventReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_COUPLE':
      return {
        ...state,
        couple: { ...state.couple, [action.field]: action.value }
      };
    case 'UPDATE_COLORS':
      return {
        ...state,
        colors: { ...state.colors, [action.property]: action.value }
      };
    case 'UPDATE_FONTS':
      return {
        ...state,
        fonts: { ...state.fonts, [action.type]: action.value }
      };
    case 'UPDATE_CEREMONY':
      return {
        ...state,
        ceremony: { ...state.ceremony, [action.field]: action.value }
      };
    case 'UPDATE_RECEPTION':
      return {
        ...state,
        reception: { ...state.reception, [action.field]: action.value }
      };
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_TEMPLATE':
      return {
        ...state,
        template: action.template
      };
    default:
      return state;
  }
};

/** Componente de texto editable CORREGIDO - Sin problemas de escritura */
const EditableTextFixed = React.memo(({
  value,
  onChange,
  as = 'span',
  className = '',
  style = {},
  singleLine = true,
  ariaLabel = 'Editar texto',
  debounceMs = 300
}) => {
  const Tag = as;
  const ref = useRef(null);
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const deviceInfo = useDeviceDetection();
  
  const debouncedValue = useDebounce(localValue, debounceMs);

  // Efecto para sincronizar el valor debounced con el prop onChange
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  // Actualizar valor local cuando cambie el prop
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const beginEdit = useCallback((e) => {
    e.stopPropagation();
    
    setEditing(true);
    
    // ✅ FIX: Lógica de foco simplificada sin interferencias
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
        
        // ✅ FIX: Selección de texto más simple y confiable
        if (document.createRange && window.getSelection) {
          const range = document.createRange();
          range.selectNodeContents(ref.current);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }, 10); // ✅ FIX: Delay reducido
  }, []);

  const endEdit = useCallback(() => {
    setEditing(false);
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  }, []);

  const handleInput = useCallback((e) => {
    const text = e.currentTarget.textContent || '';
    setLocalValue(text);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (singleLine && e.key === 'Enter') {
      e.preventDefault();
      ref.current?.blur();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setLocalValue(value); // Revertir cambios
      ref.current?.blur();
    }
  }, [singleLine, value]);

  // ✅ FIX: Función de pegado simplificada
  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  // ✅ FIX: Estilos corregidos sin problemas de dirección
  const dynamicStyles = useMemo(() => ({
    // ✅ FIX: Dirección de texto corregida
    direction: 'ltr',
    unicodeBidi: 'normal',
    writingMode: 'horizontal-tb',
    textAlign: 'inherit',
    whiteSpace: singleLine ? 'nowrap' : 'pre-wrap',
    minWidth: editing ? (deviceInfo.isMobile ? '80px' : '100px') : 'auto',
    minHeight: editing ? '1.2em' : 'auto',
    // ✅ FIX: Touch action mejorado
    touchAction: 'manipulation',
    userSelect: editing ? 'text' : 'none',
    WebkitUserSelect: editing ? 'text' : 'none',
    WebkitTouchCallout: 'none',
    WebkitTapHighlightColor: 'transparent',
    // ✅ FIX: Prevenir zoom en iOS
    fontSize: deviceInfo.isMobile ? 'max(16px, 1em)' : 'inherit',
    ...style
  }), [editing, deviceInfo.isMobile, singleLine, style]);

  const dynamicClasses = useMemo(() => {
    const baseClasses = `${className} outline-none transition-all duration-200`;
    const editingClasses = editing 
      ? 'ring-2 ring-blue-400 bg-blue-50 bg-opacity-80 rounded-sm px-1' 
      : 'hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer';
    const touchClasses = 'touch-manipulation';
    
    return `${baseClasses} ${editingClasses} ${touchClasses}`.trim();
  }, [className, editing]);

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
      className={dynamicClasses}
      style={dynamicStyles}
      // ✅ FIX: Atributos adicionales para mejor compatibilidad
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      inputMode="text"
    >
      {localValue}
    </Tag>
  );
});

EditableTextFixed.displayName = 'EditableTextFixed';

const VisualEditorComplete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deviceInfo = useDeviceDetection();
  
  // Estados iniciales optimizados
  const initialEventState = useMemo(() => ({
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
  }), [id]);

  const [event, dispatch] = useReducer(eventReducer, initialEventState);

  // Estados UI optimizados
  const [uiState, setUiState] = useState({
    loading: false,
    saving: false,
    error: null,
    activeTab: 'design',
    zoom: deviceInfo.isMobile ? 80 : 100,
    selectedTemplate: 'elegant',
    showMobilePanel: false,
    viewMode: deviceInfo.isMobile ? 'mobile' : 'desktop'
  });

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const touchGesture = useTouchGestures(canvasRef);

  // Manejo de gestos táctiles
  useEffect(() => {
    if (touchGesture?.type === 'pinch') {
      setUiState(prev => ({ ...prev, zoom: touchGesture.zoom }));
    }
  }, [touchGesture]);

  // Efecto para ajustar zoom según dispositivo
  useEffect(() => {
    setUiState(prev => ({
      ...prev,
      zoom: deviceInfo.isMobile ? 80 : deviceInfo.isTablet ? 90 : 100,
      viewMode: deviceInfo.isMobile ? 'mobile' : deviceInfo.isTablet ? 'tablet' : 'desktop'
    }));
  }, [deviceInfo]);

  // Countdown optimizado
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const targetDate = new Date('2024-03-15T17:00:00');
    
    const updateCountdown = () => {
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
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Funciones optimizadas con useCallback
  const saveEvent = useCallback(async () => {
    try {
      setUiState(prev => ({ ...prev, saving: true, error: null }));
      await new Promise((r) => setTimeout(r, 800));
      console.log('Evento guardado:', event);
    } catch (err) {
      setUiState(prev => ({ ...prev, error: 'Error guardando el evento' }));
      console.error(err);
    } finally {
      setUiState(prev => ({ ...prev, saving: false }));
    }
  }, [event]);

  const handleColorChange = useCallback((property, color) => {
    dispatch({ type: 'UPDATE_COLORS', property, value: color });
  }, []);

  const handleFontChange = useCallback((type, fontFamily) => {
    dispatch({ type: 'UPDATE_FONTS', type, value: fontFamily });
  }, []);

  const handleTemplateChange = useCallback((templateId) => {
    setUiState(prev => ({ ...prev, selectedTemplate: templateId }));
    dispatch({ type: 'SET_TEMPLATE', template: templateId });
  }, []);

  const handleZoom = useCallback((direction) => {
    setUiState(prev => ({
      ...prev,
      zoom: direction === 'in' 
        ? Math.min(prev.zoom + 10, 200)
        : Math.max(prev.zoom - 10, 50)
    }));
  }, []);

  const previewInvitation = useCallback(() => {
    window.open(`/p/${event.id}`, '_blank');
  }, [event.id]);

  const toggleMobilePanel = useCallback(() => {
    setUiState(prev => ({ ...prev, showMobilePanel: !prev.showMobilePanel }));
  }, []);

  const setViewMode = useCallback((mode) => {
    setUiState(prev => ({ ...prev, viewMode: mode }));
  }, []);

  const setActiveTab = useCallback((tab) => {
    setUiState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  // Datos estáticos optimizados con useMemo
  const colorPalettes = useMemo(() => [
    { name: 'Clásico', colors: ['#1a1a1a', '#ffffff', '#f5f5f5', '#e5e5e5', '#cccccc'] },
    { name: 'Elegante', colors: ['#2c3e50', '#ecf0f1', '#e74c3c', '#f39c12', '#9b59b6'] },
    { name: 'Moderno', colors: ['#34495e', '#3498db', '#2ecc71', '#f1c40f', '#e67e22'] },
    { name: 'Romántico', colors: ['#8e44ad', '#e91e63', '#ffc0cb', '#fff0f5', '#ffe4e1'] },
    { name: 'Natural', colors: ['#27ae60', '#2ecc71', '#f39c12', '#e67e22', '#d35400'] }
  ], []);

  const fontFamilies = useMemo(() => [
    'Inter', 'Helvetica Neue', 'Arial', 'Georgia', 'Times New Roman',
    'Playfair Display', 'Montserrat', 'Open Sans', 'Lato', 'Roboto'
  ], []);

  const templates = useMemo(() => [
    { id: 'elegant', name: 'Elegante', description: 'Diseño sofisticado y minimalista' },
    { id: 'romantic', name: 'Romántico', description: 'Colores suaves y florales' },
    { id: 'modern', name: 'Moderno', description: 'Diseño contemporáneo y vibrante' },
    { id: 'classic', name: 'Clásico', description: 'Estilo tradicional y atemporal' }
  ], []);

  // Componente TimeCell optimizado
  const TimeCell = React.memo(({ value, label }) => (
    <div className="flex flex-col items-center">
      <div 
        className={`font-light leading-none ${
          deviceInfo.isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'
        }`}
        style={{ color: event.colors.primary }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div 
        className={`opacity-90 ${
          deviceInfo.isMobile ? 'text-xs' : 'text-sm sm:text-base'
        }`}
        style={{ color: event.colors.text }}
      >
        {label}
      </div>
    </div>
  ));

  TimeCell.displayName = 'TimeCell';

  // Renderizado de la invitación optimizado
  const renderInvitation = useCallback(() => {
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
    
    const currentStyle = styles[uiState.selectedTemplate] || styles.elegant;

    // Calcular dimensiones según el modo de vista
    const getCanvasStyle = () => {
      const baseWidth = uiState.viewMode === 'mobile' ? 375 : 
                       uiState.viewMode === 'tablet' ? 768 : 1200;
      const scaledWidth = (baseWidth * uiState.zoom) / 100;
      
      return {
        width: `${scaledWidth}px`,
        minHeight: uiState.viewMode === 'mobile' ? 'auto' : '100vh',
        transform: `scale(${uiState.zoom / 100})`,
        transformOrigin: 'top left',
        margin: deviceInfo.isMobile ? '0' : '0 auto',
        // Optimizaciones para rendimiento
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      };
    };

    return (
      <div
        ref={canvasRef}
        className="invitation-canvas"
        style={{
          ...getCanvasStyle(),
          background: currentStyle.background,
          fontFamily: currentStyle.fontFamily,
          color: currentStyle.textColor,
          overflow: 'hidden'
        }}
      >
        {/* Hero Section */}
        <section className={`min-h-screen flex items-center justify-center relative ${
          deviceInfo.isMobile ? 'px-4 py-8' : 'px-8'
        }`}>
          <div
            className={`absolute ${
              deviceInfo.isMobile ? 'top-4 left-4 w-12 h-12' : 'top-10 left-10 w-20 h-20'
            } rounded-full opacity-20`}
            style={{ backgroundColor: currentStyle.primaryColor }}
          />
          <div
            className={`absolute ${
              deviceInfo.isMobile ? 'bottom-4 right-4 w-16 h-16' : 'bottom-10 right-10 w-32 h-32'
            } rounded-full opacity-10`}
            style={{ backgroundColor: currentStyle.secondaryColor }}
          />

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1
              className={`font-light mb-4 tracking-wider uppercase ${
                deviceInfo.isMobile ? 'text-4xl' : 'text-6xl md:text-8xl'
              }`}
              style={{ color: currentStyle.primaryColor }}
            >
              <EditableTextFixed
                value={event.couple.bride}
                onChange={(val) => dispatch({ type: 'UPDATE_COUPLE', field: 'bride', value: val })}
                as="span"
                ariaLabel="Nombre de la novia"
              />
            </h1>

            <div className="flex items-center justify-center my-8">
              <div className="h-px w-16 bg-gray-400" />
              <Heart 
                className={`mx-4 ${deviceInfo.isMobile ? 'w-6 h-6' : 'w-8 h-8'}`}
                style={{ color: currentStyle.secondaryColor }} 
                fill="currentColor" 
              />
              <div className="h-px w-16 bg-gray-400" />
            </div>

            <h1
              className={`font-light mb-8 tracking-wider uppercase ${
                deviceInfo.isMobile ? 'text-4xl' : 'text-6xl md:text-8xl'
              }`}
              style={{ color: currentStyle.primaryColor }}
            >
              <EditableTextFixed
                value={event.couple.groom}
                onChange={(val) => dispatch({ type: 'UPDATE_COUPLE', field: 'groom', value: val })}
                as="span"
                ariaLabel="Nombre del novio"
              />
            </h1>

            <p 
              className={`font-light mb-12 tracking-wide ${
                deviceInfo.isMobile ? 'text-lg' : 'text-xl md:text-2xl'
              }`}
              style={{ color: currentStyle.textColor }}
            >
              <EditableTextFixed
                value={event.description}
                onChange={(val) => dispatch({ type: 'UPDATE_FIELD', field: 'description', value: val })}
                as="span"
                ariaLabel="Descripción principal"
              />
            </p>

            <div className="animate-bounce">
              <ChevronDown 
                className={`mx-auto ${deviceInfo.isMobile ? 'w-6 h-6' : 'w-8 h-8'}`}
                style={{ color: currentStyle.primaryColor }} 
              />
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className={`${deviceInfo.isMobile ? 'py-8' : 'py-16'}`} 
                 style={{ backgroundColor: currentStyle.primaryColor }}>
          <div className={`max-w-4xl mx-auto text-center ${
            deviceInfo.isMobile ? 'px-4' : 'px-8'
          }`}>
            <h2 className={`font-light mb-8 tracking-wide text-white ${
              deviceInfo.isMobile ? 'text-xl' : 'text-2xl md:text-3xl'
            }`}>
              Faltan para nuestro gran día
            </h2>
            <div className={`flex items-center justify-center ${
              deviceInfo.isMobile ? 'gap-4' : 'gap-8'
            }`}>
              <TimeCell value={timeLeft.days} label="días" />
              <div className={`font-light text-white ${
                deviceInfo.isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'
              }`}>:</div>
              <TimeCell value={timeLeft.hours} label="horas" />
              <div className={`font-light text-white ${
                deviceInfo.isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'
              }`}>:</div>
              <TimeCell value={timeLeft.minutes} label="min" />
              <div className={`font-light text-white ${
                deviceInfo.isMobile ? 'text-2xl' : 'text-4xl md:text-6xl'
              }`}>:</div>
              <TimeCell value={timeLeft.seconds} label="seg" />
            </div>
          </div>
        </section>

        {/* Detalles Section */}
        <section className={`bg-white ${deviceInfo.isMobile ? 'py-8' : 'py-16'}`}>
          <div className={`max-w-6xl mx-auto ${deviceInfo.isMobile ? 'px-4' : 'px-8'}`}>
            <div className={`grid gap-12 ${
              deviceInfo.isMobile ? 'grid-cols-1' : 'md:grid-cols-2'
            }`}>
              {/* Ceremonia */}
              <div className="text-center">
                <div
                  className={`rounded-full flex items-center justify-center mx-auto mb-6 ${
                    deviceInfo.isMobile ? 'w-12 h-12' : 'w-16 h-16'
                  }`}
                  style={{ backgroundColor: `${currentStyle.primaryColor}20` }}
                >
                  <Church 
                    className={deviceInfo.isMobile ? 'w-6 h-6' : 'w-8 h-8'}
                    style={{ color: currentStyle.primaryColor }} 
                  />
                </div>
                <h3 
                  className={`font-medium mb-6 tracking-wide ${
                    deviceInfo.isMobile ? 'text-xl' : 'text-2xl'
                  }`}
                  style={{ color: currentStyle.textColor }}
                >
                  CEREMONIA
                </h3>
                <div className={`space-y-3 mb-8 text-gray-600 ${
                  deviceInfo.isMobile ? 'text-base' : ''
                }`}>
                  <p className={deviceInfo.isMobile ? 'text-base' : 'text-lg'}>
                    <EditableTextFixed
                      value={event.date}
                      onChange={(val) => dispatch({ type: 'UPDATE_FIELD', field: 'date', value: val })}
                      ariaLabel="Fecha"
                    />
                  </p>
                  <p className={deviceInfo.isMobile ? 'text-base' : 'text-lg'}>
                    <EditableTextFixed
                      value={event.ceremony.time}
                      onChange={(val) => dispatch({ type: 'UPDATE_CEREMONY', field: 'time', value: val })}
                      ariaLabel="Hora de ceremonia"
                    />
                  </p>
                  <p className="font-medium">
                    <EditableTextFixed
                      value={event.ceremony.venue}
                      onChange={(val) => dispatch({ type: 'UPDATE_CEREMONY', field: 'venue', value: val })}
                      ariaLabel="Lugar de ceremonia"
                    />
                  </p>
                  <p>
                    <EditableTextFixed
                      value={event.ceremony.address}
                      onChange={(val) => dispatch({ type: 'UPDATE_CEREMONY', field: 'address', value: val })}
                      ariaLabel="Dirección de ceremonia"
                      singleLine={false}
                    />
                  </p>
                </div>
                <Button 
                  className={`rounded-full text-white ${
                    deviceInfo.isMobile ? 'px-6 py-2 text-sm' : 'px-8 py-3'
                  }`}
                  style={{ backgroundColor: currentStyle.primaryColor }}
                >
                  <MapPin className={`mr-2 ${deviceInfo.isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  CÓMO LLEGAR
                </Button>
              </div>

              {/* Recepción */}
              <div className="text-center">
                <div
                  className={`rounded-full flex items-center justify-center mx-auto mb-6 ${
                    deviceInfo.isMobile ? 'w-12 h-12' : 'w-16 h-16'
                  }`}
                  style={{ backgroundColor: `${currentStyle.secondaryColor}20` }}
                >
                  <PartyPopper 
                    className={deviceInfo.isMobile ? 'w-6 h-6' : 'w-8 h-8'}
                    style={{ color: currentStyle.secondaryColor }} 
                  />
                </div>
                <h3 
                  className={`font-medium mb-6 tracking-wide ${
                    deviceInfo.isMobile ? 'text-xl' : 'text-2xl'
                  }`}
                  style={{ color: currentStyle.textColor }}
                >
                  RECEPCIÓN
                </h3>
                <div className={`space-y-3 mb-8 text-gray-600 ${
                  deviceInfo.isMobile ? 'text-base' : ''
                }`}>
                  <p className={deviceInfo.isMobile ? 'text-base' : 'text-lg'}>
                    <EditableTextFixed
                      value={event.date}
                      onChange={(val) => dispatch({ type: 'UPDATE_FIELD', field: 'date', value: val })}
                      ariaLabel="Fecha de recepción"
                    />
                  </p>
                  <p className={deviceInfo.isMobile ? 'text-base' : 'text-lg'}>
                    <EditableTextFixed
                      value={event.reception.time}
                      onChange={(val) => dispatch({ type: 'UPDATE_RECEPTION', field: 'time', value: val })}
                      ariaLabel="Hora de recepción"
                    />
                  </p>
                  <p className="font-medium">
                    <EditableTextFixed
                      value={event.reception.venue}
                      onChange={(val) => dispatch({ type: 'UPDATE_RECEPTION', field: 'venue', value: val })}
                      ariaLabel="Lugar de recepción"
                    />
                  </p>
                  <p>
                    <EditableTextFixed
                      value={event.reception.address}
                      onChange={(val) => dispatch({ type: 'UPDATE_RECEPTION', field: 'address', value: val })}
                      ariaLabel="Dirección de recepción"
                      singleLine={false}
                    />
                  </p>
                </div>
                <Button 
                  className={`rounded-full text-white ${
                    deviceInfo.isMobile ? 'px-6 py-2 text-sm' : 'px-8 py-3'
                  }`}
                  style={{ backgroundColor: currentStyle.secondaryColor }}
                >
                  <MapPin className={`mr-2 ${deviceInfo.isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  CÓMO LLEGAR
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section className={`${deviceInfo.isMobile ? 'py-8' : 'py-16'}`} 
                 style={{ backgroundColor: '#f8f9fa' }}>
          <div className={`max-w-4xl mx-auto text-center ${
            deviceInfo.isMobile ? 'px-4' : 'px-8'
          }`}>
            <h2 
              className={`font-medium mb-8 tracking-wide ${
                deviceInfo.isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
              }`}
              style={{ color: currentStyle.textColor }}
            >
              CONFIRMA TU ASISTENCIA
            </h2>
            <p className={`mb-8 text-gray-600 ${
              deviceInfo.isMobile ? 'text-base' : 'text-lg'
            }`}>
              Tu presencia es muy importante para nosotros
            </p>
            <div className={`flex gap-4 justify-center ${
              deviceInfo.isMobile ? 'flex-col' : 'flex-row'
            }`}>
              <Button 
                className={`rounded-full ${
                  deviceInfo.isMobile ? 'px-8 py-3' : 'px-12 py-4'
                }`}
                style={{ 
                  backgroundColor: currentStyle.primaryColor,
                  color: 'white'
                }}
              >
                <Users className={`mr-2 ${deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                SÍ, ASISTIRÉ
              </Button>
              <Button 
                variant="outline"
                className={`rounded-full border-2 ${
                  deviceInfo.isMobile ? 'px-8 py-3' : 'px-12 py-4'
                }`}
                style={{ 
                  borderColor: currentStyle.primaryColor,
                  color: currentStyle.primaryColor
                }}
              >
                NO PODRÉ ASISTIR
              </Button>
            </div>
          </div>
        </section>

        {/* Social Share Section */}
        <section className={`${deviceInfo.isMobile ? 'py-8' : 'py-16'}`}
                 style={{ backgroundColor: currentStyle.secondaryColor }}>
          <div className={`max-w-4xl mx-auto text-center ${
            deviceInfo.isMobile ? 'px-4' : 'px-8'
          }`}>
            <h2 className={`font-medium mb-4 tracking-wide text-white ${
              deviceInfo.isMobile ? 'text-2xl' : 'text-3xl'
            }`}>
              ¡COMPARTE NUESTRA ALEGRÍA!
            </h2>
            <p className={`mb-8 text-white opacity-90 ${
              deviceInfo.isMobile ? 'text-base' : 'text-lg'
            }`}>
              <EditableTextFixed
                value={event.hashtag}
                onChange={(val) => dispatch({ type: 'UPDATE_FIELD', field: 'hashtag', value: val })}
                as="span"
                ariaLabel="Hashtag del evento"
                className="text-white"
              />
            </p>
            <div className={`flex gap-4 justify-center ${
              deviceInfo.isMobile ? 'flex-wrap' : ''
            }`}>
              <Button 
                variant="outline" 
                className={`rounded-full bg-white border-0 ${
                  deviceInfo.isMobile ? 'px-6 py-3' : 'px-8 py-4'
                }`}
              >
                <Instagram className={`mr-2 ${deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                Instagram
              </Button>
              <Button 
                variant="outline" 
                className={`rounded-full bg-white border-0 ${
                  deviceInfo.isMobile ? 'px-6 py-3' : 'px-8 py-4'
                }`}
              >
                <Facebook className={`mr-2 ${deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                Facebook
              </Button>
              <Button 
                variant="outline" 
                className={`rounded-full bg-white border-0 ${
                  deviceInfo.isMobile ? 'px-6 py-3' : 'px-8 py-4'
                }`}
              >
                <Share2 className={`mr-2 ${deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                Compartir
              </Button>
            </div>
          </div>
        </section>

        {/* Regalo Section */}
        <section className={`bg-white ${deviceInfo.isMobile ? 'py-8' : 'py-16'}`}>
          <div className={`max-w-4xl mx-auto text-center ${
            deviceInfo.isMobile ? 'px-4' : 'px-8'
          }`}>
            <div
              className={`rounded-full flex items-center justify-center mx-auto mb-6 ${
                deviceInfo.isMobile ? 'w-16 h-16' : 'w-20 h-20'
              }`}
              style={{ backgroundColor: `${currentStyle.primaryColor}10` }}
            >
              <Gift 
                className={deviceInfo.isMobile ? 'w-8 h-8' : 'w-10 h-10'}
                style={{ color: currentStyle.primaryColor }} 
              />
            </div>
            <h2 
              className={`font-medium mb-4 tracking-wide ${
                deviceInfo.isMobile ? 'text-2xl' : 'text-3xl'
              }`}
              style={{ color: currentStyle.textColor }}
            >
              MESA DE REGALOS
            </h2>
            <p className={`mb-8 text-gray-600 max-w-2xl mx-auto ${
              deviceInfo.isMobile ? 'text-base' : 'text-lg'
            }`}>
              Tu presencia es el mejor regalo, pero si deseas obsequiarnos algo, 
              aquí tienes algunas opciones
            </p>
            <div className={`flex gap-4 justify-center ${
              deviceInfo.isMobile ? 'flex-col' : 'flex-row'
            }`}>
              <Button 
                className={`rounded-full ${
                  deviceInfo.isMobile ? 'px-8 py-3' : 'px-12 py-4'
                }`}
                style={{ 
                  backgroundColor: currentStyle.primaryColor,
                  color: 'white'
                }}
              >
                <Gift className={`mr-2 ${deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                LIVERPOOL
              </Button>
              <Button 
                variant="outline"
                className={`rounded-full border-2 ${
                  deviceInfo.isMobile ? 'px-8 py-3' : 'px-12 py-4'
                }`}
                style={{ 
                  borderColor: currentStyle.primaryColor,
                  color: currentStyle.primaryColor
                }}
              >
                <CreditCard className={`mr-2 ${deviceInfo.isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                SOBRES
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`text-center ${
          deviceInfo.isMobile ? 'py-8' : 'py-16'
        }`} 
                style={{ backgroundColor: currentStyle.primaryColor }}>
          <div className={`max-w-4xl mx-auto ${
            deviceInfo.isMobile ? 'px-4' : 'px-8'
          }`}>
            <div className="mb-6">
              <Heart 
                className={`mx-auto ${deviceInfo.isMobile ? 'w-8 h-8' : 'w-12 h-12'}`}
                style={{ color: 'white' }} 
                fill="white" 
              />
            </div>
            <h2 className={`font-light mb-4 tracking-wide text-white ${
              deviceInfo.isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
            }`}>
              ¡Nos vemos pronto!
            </h2>
            <p className={`text-white opacity-90 ${
              deviceInfo.isMobile ? 'text-base' : 'text-lg'
            }`}>
              Con amor,<br />
              <span className="font-medium">
                {event.couple.bride} & {event.couple.groom}
              </span>
            </p>
          </div>
        </footer>
      </div>
    );
  }, [event, uiState, deviceInfo, timeLeft, dispatch]);

  if (uiState.loading) {
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
      {/* Header optimizado para móviles */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/app/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              {!deviceInfo.isMobile && 'Volver'}
            </Button>
            <div>
              <h1 className={`font-semibold ${deviceInfo.isMobile ? 'text-lg' : 'text-xl'}`}>
                {event.couple.bride} & {event.couple.groom}
              </h1>
              <p className="text-xs text-gray-600">Editor Visual - Versión Corregida</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Controles de vista en desktop */}
            {!deviceInfo.isMobile && (
              <>
                <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg">
                  <Button 
                    variant={uiState.viewMode === 'desktop' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('desktop')}
                  >
                    <Monitor className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant={uiState.viewMode === 'tablet' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('tablet')}
                  >
                    <Tablet className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant={uiState.viewMode === 'mobile' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('mobile')}
                  >
                    <Smartphone className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg">
                  <Button variant="ghost" size="sm" onClick={() => handleZoom('out')}>
                    <ZoomOut className="h-3 w-3" />
                  </Button>
                  <span className="text-xs font-medium px-2">{uiState.zoom}%</span>
                  <Button variant="ghost" size="sm" onClick={() => handleZoom('in')}>
                    <ZoomIn className="h-3 w-3" />
                  </Button>
                </div>
              </>
            )}

            {/* Indicador de gestos táctiles en móviles */}
            {deviceInfo.isMobile && touchGesture && (
              <div className="text-xs text-gray-500 px-2 py-1 bg-blue-100 rounded">
                {touchGesture.type === 'pinch' && `${Math.round(touchGesture.zoom)}%`}
                {touchGesture.type === 'swipe' && touchGesture.direction}
              </div>
            )}

            {/* Botón de panel en móviles */}
            {deviceInfo.isMobile && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleMobilePanel}
              >
                {uiState.showMobilePanel ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={previewInvitation}>
              <Eye className="h-4 w-4 mr-1" />
              {!deviceInfo.isMobile && 'Vista Previa'}
            </Button>

            <Button size="sm" onClick={saveEvent} disabled={uiState.saving}>
              <Save className="h-4 w-4 mr-1" />
              {uiState.saving ? 'Guardando...' : !deviceInfo.isMobile ? 'Guardar' : ''}
            </Button>
          </div>
        </div>
      </div>

      {uiState.error && (
        <Alert className="mx-4 mt-4">
          <AlertDescription>{uiState.error}</AlertDescription>
        </Alert>
      )}

      <div className="flex h-[calc(100vh-80px)]">
        {/* Panel lateral - Responsive */}
        <div className={`
          ${deviceInfo.isMobile 
            ? `fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
                uiState.showMobilePanel ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-80 bg-white border-r border-gray-200'
          } 
          overflow-y-auto
        `}>
          {/* Overlay para móviles */}
          {deviceInfo.isMobile && uiState.showMobilePanel && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleMobilePanel}
            />
          )}
          
          <div className="relative z-50 bg-white h-full">
            <Tabs value={uiState.activeTab} onValueChange={setActiveTab} className="h-full">
              {/* Tabs optimizadas para móviles */}
              <TabsList className="grid w-full grid-cols-4 p-1 m-4">
                <TabsTrigger value="design" className="flex flex-col items-center gap-1 p-2">
                  <Palette className="h-4 w-4" />
                  <span className="text-xs">Diseño</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex flex-col items-center gap-1 p-2">
                  <Type className="h-4 w-4" />
                  <span className="text-xs">Contenido</span>
                </TabsTrigger>
                <TabsTrigger value="images" className="flex flex-col items-center gap-1 p-2">
                  <ImageIcon className="h-4 w-4" />
                  <span className="text-xs">Imágenes</span>
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex flex-col items-center gap-1 p-2">
                  <Layout className="h-4 w-4" />
                  <span className="text-xs">Templates</span>
                </TabsTrigger>
              </TabsList>

              {/* Contenido de tabs */}
              <div className="px-4 pb-4">
                {/* Tab Diseño */}
                <TabsContent value="design" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Paletas de Colores</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {colorPalettes.map((palette) => (
                        <div key={palette.name}>
                          <Label className="text-xs font-medium">{palette.name}</Label>
                          <div className="flex gap-2 mt-1">
                            {palette.colors.map((color) => (
                              <button
                                key={color}
                                className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors touch-manipulation"
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
                    <CardHeader className="pb-3">
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
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Tipografía</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs">Fuente Principal</Label>
                        <select
                          value={event.fonts.primary}
                          onChange={(e) => handleFontChange('primary', e.target.value)}
                          className="w-full mt-1 p-2 text-xs border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full mt-1 p-2 text-xs border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <TabsContent value="content" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Información de los Novios</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label htmlFor="brideName" className="text-xs">Nombre de la Novia</Label>
                        <Input
                          id="brideName"
                          value={event.couple.bride}
                          onChange={(e) => dispatch({ type: 'UPDATE_COUPLE', field: 'bride', value: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="groomName" className="text-xs">Nombre del Novio</Label>
                        <Input
                          id="groomName"
                          value={event.couple.groom}
                          onChange={(e) => dispatch({ type: 'UPDATE_COUPLE', field: 'groom', value: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-xs">Descripción</Label>
                        <Input
                          id="description"
                          value={event.description}
                          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'description', value: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hashtag" className="text-xs">Hashtag</Label>
                        <Input
                          id="hashtag"
                          value={event.hashtag}
                          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'hashtag', value: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Fecha y Hora</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label htmlFor="eventDate" className="text-xs">Fecha del Evento</Label>
                        <Input
                          id="eventDate"
                          value={event.date}
                          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'date', value: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventTime" className="text-xs">Hora del Evento</Label>
                        <Input
                          id="eventTime"
                          value={event.time}
                          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'time', value: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Ceremonia</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label htmlFor="ceremonyVenue" className="text-xs">Lugar</Label>
                        <Input
                          id="ceremonyVenue"
                          value={event.ceremony.venue}
                          onChange={(e) => dispatch({ type: 'UPDATE_CEREMONY', field: 'venue', value: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ceremonyAddress" className="text-xs">Dirección</Label>
                        <Textarea
                          id="ceremonyAddress"
                          value={event.ceremony.address}
                          onChange={(e) => dispatch({ type: 'UPDATE_CEREMONY', field: 'address', value: e.target.value })}
                          className="mt-1 text-sm"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="ceremonyTime" className="text-xs">Hora</Label>
                        <Input
                          id="ceremonyTime"
                          value={event.ceremony.time}
                          onChange={(e) => dispatch({ type: 'UPDATE_CEREMONY', field: 'time', value: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Recepción</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label htmlFor="receptionVenue" className="text-xs">Lugar</Label>
                        <Input
                          id="receptionVenue"
                          value={event.reception.venue}
                          onChange={(e) => dispatch({ type: 'UPDATE_RECEPTION', field: 'venue', value: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="receptionAddress" className="text-xs">Dirección</Label>
                        <Textarea
                          id="receptionAddress"
                          value={event.reception.address}
                          onChange={(e) => dispatch({ type: 'UPDATE_RECEPTION', field: 'address', value: e.target.value })}
                          className="mt-1 text-sm"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="receptionTime" className="text-xs">Hora</Label>
                        <Input
                          id="receptionTime"
                          value={event.reception.time}
                          onChange={(e) => dispatch({ type: 'UPDATE_RECEPTION', field: 'time', value: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab Imágenes */}
                <TabsContent value="images" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Subir Imágenes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Arrastra imágenes aquí o haz clic para seleccionar
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Seleccionar Archivos
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            console.log('Archivos seleccionados:', e.target.files);
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab Templates */}
                <TabsContent value="layout" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Plantillas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-colors touch-manipulation ${
                            uiState.selectedTemplate === template.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleTemplateChange(template.id)}
                        >
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{template.description}</p>
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
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className={`${deviceInfo.isMobile ? 'p-2' : 'p-8'} flex justify-center`}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {renderInvitation()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualEditorComplete;
