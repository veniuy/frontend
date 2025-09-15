import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import {
  ArrowLeft,
  Save,
  Download,
  Share2,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid,
  Type,
  Palette,
  Image as ImageIcon,
  Layers,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  Copy,
  Settings,
  Heart,
  Star,
  Circle,
  Square,
  Triangle,
  Upload
} from 'lucide-react';

// Configuración de fuentes disponibles
const FONTS = [
  { name: 'Inter', category: 'sans-serif', preview: 'Inter' },
  { name: 'Playfair Display', category: 'serif', preview: 'Playfair Display' },
  { name: 'Dancing Script', category: 'handwriting', preview: 'Dancing Script' },
  { name: 'Montserrat', category: 'sans-serif', preview: 'Montserrat' },
  { name: 'Lora', category: 'serif', preview: 'Lora' },
  { name: 'Open Sans', category: 'sans-serif', preview: 'Open Sans' },
  { name: 'Roboto', category: 'sans-serif', preview: 'Roboto' },
  { name: 'Poppins', category: 'sans-serif', preview: 'Poppins' }
];

// Paleta de colores
const COLOR_PALETTES = [
  {
    name: 'Sage & Almond',
    colors: ['#8FAF86', '#789B70', '#E8F0E5', '#D4B28A', '#C59A6A', '#F4E7D8']
  },
  {
    name: 'Classic',
    colors: ['#000000', '#FFFFFF', '#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E']
  },
  {
    name: 'Romantic',
    colors: ['#FFB6C1', '#FFC0CB', '#FFE4E1', '#F0F8FF', '#E6E6FA', '#DDA0DD']
  },
  {
    name: 'Modern',
    colors: ['#2196F3', '#03DAC6', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
  }
];

// Stickers/elementos decorativos
const STICKERS = [
  { id: 'heart', icon: Heart, name: 'Corazón' },
  { id: 'star', icon: Star, name: 'Estrella' },
  { id: 'circle', icon: Circle, name: 'Círculo' },
  { id: 'square', icon: Square, name: 'Cuadrado' },
  { id: 'triangle', icon: Triangle, name: 'Triángulo' }
];

// Plantillas prediseñadas
const TEMPLATES = [
  {
    id: 1,
    name: 'Boda Elegante',
    category: 'wedding',
    isPremium: false,
    thumbnail: '/api/placeholder/200/250',
    preview: (
      <div className="w-full h-full bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-2xl font-serif text-gray-800 mb-2">MARÍA</div>
        <div className="text-lg text-gray-600 mb-2">∞</div>
        <div className="text-2xl font-serif text-gray-800 mb-4">CARLOS</div>
        <div className="text-sm text-gray-600">¡NOS CASAMOS!</div>
      </div>
    )
  },
  {
    id: 2,
    name: 'Boda Moderna',
    category: 'wedding',
    isPremium: true,
    thumbnail: '/api/placeholder/200/250',
    preview: (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col items-center justify-center p-4">
        <div className="text-2xl font-sans font-bold text-blue-800 mb-2">MARÍA</div>
        <div className="text-lg text-cyan-600 mb-2">+</div>
        <div className="text-2xl font-sans font-bold text-blue-800 mb-4">CARLOS</div>
        <div className="text-sm text-blue-600">GETTING MARRIED</div>
      </div>
    )
  },
  {
    id: 3,
    name: 'Quinceañera',
    category: 'quince',
    isPremium: false,
    thumbnail: '/api/placeholder/200/250',
    preview: (
      <div className="w-full h-full bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col items-center justify-center p-4">
        <div className="text-3xl font-script text-pink-600 mb-4">Isabella</div>
        <div className="text-lg text-purple-600 mb-2">XV AÑOS</div>
        <div className="text-sm text-pink-500">¡Celebremos juntos!</div>
      </div>
    )
  }
];

export function InvitationEditorV2() {
  const { designId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const canvasRef = useRef(null);

  // Estados del editor
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [activeTab, setActiveTab] = useState('templates');
  
  // Estados del diseño
  const [designData, setDesignData] = useState({
    canvas: { width: 600, height: 800, backgroundColor: '#ffffff' },
    elements: [],
    globalStyles: {
      fontFamily: 'Inter',
      colorPalette: COLOR_PALETTES[0].colors
    }
  });

  // Historial para undo/redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Cargar diseño si existe designId
  useEffect(() => {
    if (designId) {
      loadDesign(designId);
    }
  }, [designId]);

  const loadDesign = async (id) => {
    try {
      // TODO: Implementar carga desde API
      console.log('Loading design:', id);
      setIsEditorMode(true);
    } catch (error) {
      console.error('Error loading design:', error);
    }
  };

  const startNewInvitation = () => {
    setIsEditorMode(true);
    setActiveTab('templates');
  };

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    setActiveTab('text');
    
    // Inicializar elementos basados en la plantilla
    const initialElements = [
      {
        id: 'title',
        type: 'text',
        content: 'MARÍA & CARLOS',
        x: 300,
        y: 200,
        fontSize: 32,
        fontFamily: 'Playfair Display',
        color: '#2E2E2E',
        textAlign: 'center'
      },
      {
        id: 'subtitle',
        type: 'text',
        content: '¡NOS CASAMOS!',
        x: 300,
        y: 250,
        fontSize: 16,
        fontFamily: 'Inter',
        color: '#6B7280',
        textAlign: 'center'
      }
    ];

    setDesignData(prev => ({
      ...prev,
      elements: initialElements
    }));

    addToHistory();
  };

  const addToHistory = () => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(designData)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setDesignData(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setDesignData(history[historyIndex + 1]);
    }
  };

  const updateElement = (elementId, updates) => {
    setDesignData(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
    addToHistory();
  };

  const addElement = (type, properties = {}) => {
    const newElement = {
      id: `${type}_${Date.now()}`,
      type,
      x: 300,
      y: 300,
      ...properties
    };

    setDesignData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    
    setSelectedElement(newElement.id);
    addToHistory();
  };

  const deleteElement = (elementId) => {
    setDesignData(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
    
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
    
    addToHistory();
  };

  const renderCanvas = () => {
    const { canvas, elements } = designData;
    const scale = zoom / 100;

    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-8 overflow-auto">
        <div 
          className="relative bg-white shadow-lg"
          style={{
            width: canvas.width * scale,
            height: canvas.height * scale,
            backgroundColor: canvas.backgroundColor
          }}
        >
          {/* Grid overlay */}
          {showGrid && (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: `${20 * scale}px ${20 * scale}px`
              }}
            />
          )}

          {/* Elementos del diseño */}
          {elements.map(element => (
            <div
              key={element.id}
              className={`absolute cursor-pointer ${
                selectedElement === element.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                left: element.x * scale,
                top: element.y * scale,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedElement(element.id)}
            >
              {element.type === 'text' && (
                <div
                  style={{
                    fontSize: element.fontSize * scale,
                    fontFamily: element.fontFamily,
                    color: element.color,
                    textAlign: element.textAlign,
                    fontWeight: element.fontWeight || 'normal',
                    fontStyle: element.fontStyle || 'normal',
                    textDecoration: element.textDecoration || 'none'
                  }}
                >
                  {element.content}
                </div>
              )}
              
              {element.type === 'sticker' && (
                <div
                  style={{
                    fontSize: element.size * scale,
                    color: element.color
                  }}
                >
                  {React.createElement(
                    STICKERS.find(s => s.id === element.stickerId)?.icon || Heart,
                    { size: element.size * scale }
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    const selectedEl = designData.elements.find(el => el.id === selectedElement);

    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="templates">Plantillas</TabsTrigger>
              <TabsTrigger value="text">Texto</TabsTrigger>
              <TabsTrigger value="design">Diseño</TabsTrigger>
              <TabsTrigger value="layers">Capas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="templates" className="mt-0">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Selecciona una plantilla</h3>
              <div className="grid grid-cols-2 gap-3">
                {TEMPLATES.map(template => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => selectTemplate(template)}
                  >
                    <CardContent className="p-2">
                      <div className="aspect-[4/5] bg-gray-50 rounded mb-2 overflow-hidden">
                        {template.preview}
                      </div>
                      <div className="text-xs font-medium text-center">
                        {template.name}
                        {template.isPremium && (
                          <Badge variant="secondary" className="ml-1 text-xs">Premium</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="text" className="mt-0">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Fuentes</h3>
                <div className="space-y-2">
                  {FONTS.map(font => (
                    <div
                      key={font.name}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedEl?.fontFamily === font.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => selectedEl && updateElement(selectedEl.id, { fontFamily: font.name })}
                    >
                      <div 
                        className="text-lg"
                        style={{ fontFamily: font.name }}
                      >
                        {font.preview}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{font.category}</div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedEl?.type === 'text' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenido
                    </label>
                    <Textarea
                      value={selectedEl.content}
                      onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                      placeholder="Escribe tu texto aquí..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tamaño: {selectedEl.fontSize}px
                    </label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateElement(selectedEl.id, { fontSize: Math.max(8, selectedEl.fontSize - 2) })}
                      >
                        -
                      </Button>
                      <Slider
                        value={[selectedEl.fontSize]}
                        onValueChange={([value]) => updateElement(selectedEl.id, { fontSize: value })}
                        min={8}
                        max={72}
                        step={1}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateElement(selectedEl.id, { fontSize: Math.min(72, selectedEl.fontSize + 2) })}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estilos
                    </label>
                    <div className="flex space-x-2">
                      <Button
                        variant={selectedEl.fontWeight === 'bold' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateElement(selectedEl.id, { 
                          fontWeight: selectedEl.fontWeight === 'bold' ? 'normal' : 'bold' 
                        })}
                      >
                        B
                      </Button>
                      <Button
                        variant={selectedEl.fontStyle === 'italic' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateElement(selectedEl.id, { 
                          fontStyle: selectedEl.fontStyle === 'italic' ? 'normal' : 'italic' 
                        })}
                      >
                        I
                      </Button>
                      <Button
                        variant={selectedEl.textDecoration === 'underline' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateElement(selectedEl.id, { 
                          textDecoration: selectedEl.textDecoration === 'underline' ? 'none' : 'underline' 
                        })}
                      >
                        U
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alineación
                    </label>
                    <div className="flex space-x-2">
                      {['left', 'center', 'right'].map(align => (
                        <Button
                          key={align}
                          variant={selectedEl.textAlign === align ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateElement(selectedEl.id, { textAlign: align })}
                        >
                          {align === 'left' ? '←' : align === 'center' ? '↔' : '→'}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="design" className="mt-0">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Paletas de Colores</h3>
                {COLOR_PALETTES.map(palette => (
                  <div key={palette.name} className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">{palette.name}</div>
                    <div className="flex space-x-2">
                      {palette.colors.map(color => (
                        <button
                          key={color}
                          className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
                          style={{ backgroundColor: color }}
                          onClick={() => selectedEl && updateElement(selectedEl.id, { color })}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Stickers</h3>
                <div className="grid grid-cols-3 gap-2">
                  {STICKERS.map(sticker => {
                    const Icon = sticker.icon;
                    return (
                      <Button
                        key={sticker.id}
                        variant="outline"
                        className="aspect-square p-2"
                        onClick={() => addElement('sticker', { 
                          stickerId: sticker.id, 
                          size: 24, 
                          color: '#8FAF86' 
                        })}
                      >
                        <Icon size={20} />
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Herramientas</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => addElement('text', { 
                      content: 'Nuevo texto', 
                      fontSize: 16, 
                      fontFamily: 'Inter', 
                      color: '#000000' 
                    })}
                  >
                    <Type className="w-4 h-4 mr-2" />
                    Añadir Texto
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Imagen
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Color de Fondo</h3>
                <div className="flex space-x-2">
                  {COLOR_PALETTES[0].colors.map(color => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
                      style={{ backgroundColor: color }}
                      onClick={() => setDesignData(prev => ({
                        ...prev,
                        canvas: { ...prev.canvas, backgroundColor: color }
                      }))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layers" className="mt-0">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Capas</h3>
              <div className="space-y-2">
                {designData.elements.map((element, index) => (
                  <div
                    key={element.id}
                    className={`flex items-center justify-between p-2 border rounded ${
                      selectedElement === element.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div 
                      className="flex items-center space-x-2 flex-1 cursor-pointer"
                      onClick={() => setSelectedElement(element.id)}
                    >
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      <span className="text-sm">
                        {element.type === 'text' ? element.content.substring(0, 20) : element.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newElements = [...designData.elements];
                          if (index > 0) {
                            [newElements[index], newElements[index - 1]] = [newElements[index - 1], newElements[index]];
                            setDesignData(prev => ({ ...prev, elements: newElements }));
                          }
                        }}
                      >
                        <ChevronUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newElements = [...designData.elements];
                          if (index < newElements.length - 1) {
                            [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
                            setDesignData(prev => ({ ...prev, elements: newElements }));
                          }
                        }}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteElement(element.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </div>
      </div>
    );
  };

  if (!isEditorMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  ¡Hola, {user?.name || user?.username}!
                </h1>
                <p className="text-gray-600 mt-1">
                  Crea invitaciones hermosas y personalizadas
                </p>
              </div>
              <Button onClick={startNewInvitation} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nueva Invitación
              </Button>
            </div>
          </div>

          {/* Tarjeta de bienvenida */}
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Type className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Editor de Invitaciones Profesional
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Diseña invitaciones únicas con nuestro editor intuitivo. Personaliza texto, colores, 
                  fuentes y elementos decorativos para crear la invitación perfecta para tu evento especial.
                </p>
              </div>
              <Button onClick={startNewInvitation} size="lg" className="px-8">
                Comenzar a Diseñar
              </Button>
            </CardContent>
          </Card>

          {/* Características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-blue-600" />
                  Texto Personalizable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Elige entre múltiples fuentes, tamaños y estilos para crear el texto perfecto.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-green-600" />
                  Paletas de Colores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Selecciona de paletas cuidadosamente diseñadas o crea tu propia combinación.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-purple-600" />
                  Exportación Fácil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Descarga tu invitación en alta calidad en formato PDF o imagen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Toolbar superior */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditorMode(false)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={historyIndex <= 0}
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(Math.max(25, zoom - 25))}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(Math.min(200, zoom + 25))}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
          >
            <Grid className="w-4 h-4" />
          </Button>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </div>

      {/* Área principal */}
      <div className="flex-1 flex">
        {renderCanvas()}
        {renderSidebar()}
      </div>
    </div>
  );
}

export default InvitationEditorV2;
