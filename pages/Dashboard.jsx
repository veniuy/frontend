import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  Plus,
  Type,
  Palette,
  Layers,
  Download,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid,
  Save,
  Share,
  Upload,
  Eye,
  Trash,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  RotateCw,
  Move
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  // Estados del editor
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasElements, setCanvasElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [canvasSize] = useState({ width: 600, height: 800 });
  
  // Estados de la interfaz
  const [activeTab, setActiveTab] = useState('templates');
  const [loading, setLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  // Plantillas disponibles
  const templates = [
    {
      id: 1,
      name: 'Elegante Dorado',
      category: 'Bodas',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjZjhmNmYwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZDRhZjM3IiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0ic2VyaWYiPk1hcsOtYSAmIENhcmxvczwvdGV4dD4KPHR5cGUgeD0iMTAwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM4YjczNTUiIGZvbnQtc2l6ZT0iMTQiPk5vcyBjYXNhbW9zPC90ZXh0Pgo8L3N2Zz4K',
      isPremium: true,
      elements: [
        {
          id: 'bg-1',
          type: 'background',
          color: '#f8f6f0',
          x: 0,
          y: 0,
          width: 600,
          height: 800
        },
        {
          id: 'title-1',
          type: 'text',
          content: 'María & Carlos',
          x: 50,
          y: 200,
          width: 500,
          height: 80,
          fontSize: 48,
          fontFamily: 'Playfair Display, serif',
          color: '#d4af37',
          textAlign: 'center',
          fontWeight: 'bold'
        },
        {
          id: 'subtitle-1',
          type: 'text',
          content: 'Nos casamos',
          x: 50,
          y: 300,
          width: 500,
          height: 40,
          fontSize: 24,
          fontFamily: 'Lato, sans-serif',
          color: '#8b7355',
          textAlign: 'center'
        }
      ]
    },
    {
      id: 2,
      name: 'Moderno Minimalista',
      category: 'Cumpleaños',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjZmZmZmZmIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMjU2M2ViIiBmb250LXNpemU9IjIwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+wqFDZWxlYnJlbW9zITwvdGV4dD4KPC9zdmc+',
      isPremium: false,
      elements: [
        {
          id: 'bg-2',
          type: 'background',
          color: '#ffffff',
          x: 0,
          y: 0,
          width: 600,
          height: 800
        },
        {
          id: 'title-2',
          type: 'text',
          content: '¡Celebremos!',
          x: 50,
          y: 150,
          width: 500,
          height: 60,
          fontSize: 36,
          fontFamily: 'Inter, sans-serif',
          color: '#2563eb',
          textAlign: 'center',
          fontWeight: 'bold'
        }
      ]
    },
    {
      id: 3,
      name: 'Floral Vintage',
      category: 'Quinceañeras',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjZmRmMmY4Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjYmUxODVkIiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0iY3Vyc2l2ZSI+TWlzIFhWIEHDsW9zPC90ZXh0Pgo8L3N2Zz4K',
      isPremium: true,
      elements: [
        {
          id: 'bg-3',
          type: 'background',
          color: '#fdf2f8',
          x: 0,
          y: 0,
          width: 600,
          height: 800
        },
        {
          id: 'title-3',
          type: 'text',
          content: 'Mis XV Años',
          x: 50,
          y: 180,
          width: 500,
          height: 70,
          fontSize: 42,
          fontFamily: 'Dancing Script, cursive',
          color: '#be185d',
          textAlign: 'center',
          fontWeight: 'bold'
        }
      ]
    }
  ];

  // Fuentes disponibles
  const fonts = [
    { name: 'Inter', family: 'Inter, sans-serif' },
    { name: 'Playfair Display', family: 'Playfair Display, serif' },
    { name: 'Dancing Script', family: 'Dancing Script, cursive' },
    { name: 'Lato', family: 'Lato, sans-serif' },
    { name: 'Montserrat', family: 'Montserrat, sans-serif' },
    { name: 'Roboto', family: 'Roboto, sans-serif' },
    { name: 'Open Sans', family: 'Open Sans, sans-serif' },
    { name: 'Poppins', family: 'Poppins, sans-serif' }
  ];

  // Paleta de colores
  const colorPalette = [
    '#000000', '#ffffff', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af',
    '#6b7280', '#374151', '#1f2937', '#111827', '#fef2f2', '#fee2e2',
    '#fecaca', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b',
    '#7f1d1d', '#fef3c7', '#fde68a', '#fcd34d', '#f59e0b', '#d97706',
    '#b45309', '#92400e', '#78350f', '#f0fdf4', '#dcfce7', '#bbf7d0',
    '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534',
    '#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6',
    '#2563eb', '#1d4ed8', '#1e40af', '#f3e8ff', '#e9d5ff', '#d8b4fe'
  ];

  // Stickers
  const stickers = [
    { id: 'heart', icon: '❤️', category: 'Amor' },
    { id: 'star', icon: '⭐', category: 'Celebración' },
    { id: 'balloon', icon: '🎈', category: 'Fiesta' },
    { id: 'cake', icon: '🎂', category: 'Cumpleaños' },
    { id: 'ring', icon: '💍', category: 'Boda' },
    { id: 'flower', icon: '🌸', category: 'Floral' },
    { id: 'crown', icon: '👑', category: 'Quinceañera' },
    { id: 'gift', icon: '🎁', category: 'Regalo' },
    { id: 'music', icon: '🎵', category: 'Música' },
    { id: 'camera', icon: '📷', category: 'Fotos' },
    { id: 'champagne', icon: '🥂', category: 'Brindis' },
    { id: 'fireworks', icon: '🎆', category: 'Celebración' }
  ];

  // Funciones del editor
  const startNewInvitation = () => {
    setShowEditor(true);
    setActiveTab('templates');
  };

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    setCanvasElements([...template.elements]);
    setSelectedElement(null);
    addToHistory(template.elements);
    setActiveTab('text');
  };

  const addToHistory = (elements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(elements)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCanvasElements(history[historyIndex - 1]);
      setSelectedElement(null);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCanvasElements(history[historyIndex + 1]);
      setSelectedElement(null);
    }
  };

  const addTextElement = () => {
    const newElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'Nuevo texto',
      x: 100,
      y: 100,
      width: 200,
      height: 40,
      fontSize: 24,
      fontFamily: 'Inter, sans-serif',
      color: '#000000',
      textAlign: 'left',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none'
    };
    
    const newElements = [...canvasElements, newElement];
    setCanvasElements(newElements);
    setSelectedElement(newElement);
    addToHistory(newElements);
  };

  const addStickerElement = (sticker) => {
    const newElement = {
      id: `sticker-${Date.now()}`,
      type: 'sticker',
      content: sticker.icon,
      x: 150,
      y: 150,
      width: 60,
      height: 60,
      fontSize: 48,
      rotation: 0,
      opacity: 1
    };
    
    const newElements = [...canvasElements, newElement];
    setCanvasElements(newElements);
    setSelectedElement(newElement);
    addToHistory(newElements);
  };

  const updateSelectedElement = (updates) => {
    if (!selectedElement) return;
    
    const newElements = canvasElements.map(el => 
      el.id === selectedElement.id ? { ...el, ...updates } : el
    );
    
    setCanvasElements(newElements);
    setSelectedElement({ ...selectedElement, ...updates });
    addToHistory(newElements);
  };

  const deleteSelectedElement = () => {
    if (!selectedElement) return;
    
    const newElements = canvasElements.filter(el => el.id !== selectedElement.id);
    setCanvasElements(newElements);
    setSelectedElement(null);
    addToHistory(newElements);
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvasSize.width / rect.width);
    const y = (e.clientY - rect.top) * (canvasSize.height / rect.height);
    
    const clickedElement = [...canvasElements].reverse().find(el => {
      return x >= el.x && x <= el.x + el.width &&
             y >= el.y && y <= el.y + el.height;
    });
    
    setSelectedElement(clickedElement || null);
  };

  const exportDesign = async (format = 'pdf') => {
    try {
      setLoading(true);
      console.log(`Exportando diseño en formato ${format}`);
      // Aquí iría la lógica de exportación real
    } catch (error) {
      console.error('Error al exportar:', error);
    } finally {
      setLoading(false);
    }
  };

  // Si no está en modo editor, mostrar vista inicial
  if (!showEditor) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  ¡Hola, {user?.name || user?.username}!
                </h1>
                <p className="text-gray-600 mt-1">
                  Crea invitaciones hermosas con nuestro editor visual
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
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Editor de Invitaciones
              </h3>
              <p className="text-gray-600 mb-6 text-center max-w-md">
                Diseña invitaciones profesionales con nuestro editor visual. 
                Elige plantillas, personaliza texto, colores y mucho más.
              </p>
              <Button onClick={startNewInvitation} size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Comenzar a Diseñar
              </Button>
            </CardContent>
          </Card>

          {/* Características */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5 text-blue-500" />
                  Texto Personalizable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Múltiples fuentes, tamaños y estilos para crear el texto perfecto.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-green-500" />
                  Colores y Diseño
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Paleta de colores completa y elementos decorativos para personalizar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-purple-500" />
                  Exportación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Descarga en PDF, PNG o JPG en alta calidad para imprimir o compartir.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Vista del editor
  return (
    <div className="h-screen flex bg-gray-50">
      {/* Panel lateral izquierdo */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header del panel */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Editor de Invitaciones</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
                <Redo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowEditor(false)}>
                ←
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs del panel */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4 m-4">
            <TabsTrigger value="templates" className="text-xs">Plantillas</TabsTrigger>
            <TabsTrigger value="text" className="text-xs">Texto</TabsTrigger>
            <TabsTrigger value="design" className="text-xs">Diseño</TabsTrigger>
            <TabsTrigger value="layers" className="text-xs">Capas</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            {/* Tab de Plantillas */}
            <TabsContent value="templates" className="p-4 space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Selecciona una plantilla</h3>
                <div className="grid grid-cols-1 gap-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => selectTemplate(template)}
                    >
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {template.isPremium && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 text-white text-xs">
                          Premium
                        </Badge>
                      )}
                      <div className="p-2">
                        <p className="text-sm font-medium text-gray-900">{template.name}</p>
                        <p className="text-xs text-gray-500">{template.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tab de Texto */}
            <TabsContent value="text" className="p-4 space-y-4">
              <div className="space-y-4">
                <Button onClick={addTextElement} className="w-full">
                  <Type className="h-4 w-4 mr-2" />
                  Agregar Texto
                </Button>

                {selectedElement?.type === 'text' && (
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-medium text-gray-900">Editar Texto</h3>
                    
                    {/* Contenido del texto */}
                    <div>
                      <Label htmlFor="text-content">Contenido</Label>
                      <Input
                        id="text-content"
                        value={selectedElement.content}
                        onChange={(e) => updateSelectedElement({ content: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    {/* Fuentes */}
                    <div>
                      <Label>Fuente</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2 max-h-40 overflow-y-auto">
                        {fonts.map((font) => (
                          <button
                            key={font.name}
                            className={`p-2 text-left rounded border transition-colors ${
                              selectedElement.fontFamily === font.family
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{ fontFamily: font.family }}
                            onClick={() => updateSelectedElement({ fontFamily: font.family })}
                          >
                            <span className="text-lg">Aa</span>
                            <span className="ml-2 text-sm text-gray-600">{font.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tamaño de fuente */}
                    <div>
                      <Label>Tamaño: {selectedElement.fontSize}px</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateSelectedElement({ 
                            fontSize: Math.max(8, selectedElement.fontSize - 2) 
                          })}
                        >
                          -
                        </Button>
                        <Slider
                          value={[selectedElement.fontSize]}
                          onValueChange={([value]) => updateSelectedElement({ fontSize: value })}
                          min={8}
                          max={120}
                          step={2}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateSelectedElement({ 
                            fontSize: Math.min(120, selectedElement.fontSize + 2) 
                          })}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Estilo de texto */}
                    <div>
                      <Label>Estilo</Label>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant={selectedElement.fontWeight === 'bold' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSelectedElement({ 
                            fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold' 
                          })}
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={selectedElement.fontStyle === 'italic' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSelectedElement({ 
                            fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic' 
                          })}
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={selectedElement.textDecoration === 'underline' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSelectedElement({ 
                            textDecoration: selectedElement.textDecoration === 'underline' ? 'none' : 'underline' 
                          })}
                        >
                          <Underline className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Alineación */}
                    <div>
                      <Label>Alineación</Label>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant={selectedElement.textAlign === 'left' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSelectedElement({ textAlign: 'left' })}
                        >
                          <AlignLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={selectedElement.textAlign === 'center' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSelectedElement({ textAlign: 'center' })}
                        >
                          <AlignCenter className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={selectedElement.textAlign === 'right' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSelectedElement({ textAlign: 'right' })}
                        >
                          <AlignRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Color del texto */}
                    <div>
                      <Label>Color</Label>
                      <div className="grid grid-cols-8 gap-1 mt-2">
                        {colorPalette.map((color) => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                              selectedElement.color === color
                                ? 'border-gray-800 ring-2 ring-gray-300'
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => updateSelectedElement({ color })}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Tab de Diseño */}
            <TabsContent value="design" className="p-4 space-y-4">
              <div className="space-y-4">
                {/* Stickers */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Stickers</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {stickers.map((sticker) => (
                      <button
                        key={sticker.id}
                        className="p-3 text-2xl border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                        onClick={() => addStickerElement(sticker)}
                        title={sticker.category}
                      >
                        {sticker.icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subir imagen */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Imágenes</h3>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Subir Imagen
                  </Button>
                </div>

                {/* Fondo */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Color de Fondo</h3>
                  <div className="grid grid-cols-8 gap-1">
                    {colorPalette.map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          const bgElement = canvasElements.find(el => el.type === 'background');
                          if (bgElement) {
                            const newElements = canvasElements.map(el => 
                              el.type === 'background' ? { ...el, color } : el
                            );
                            setCanvasElements(newElements);
                            addToHistory(newElements);
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Propiedades del elemento seleccionado */}
                {selectedElement && selectedElement.type !== 'background' && (
                  <div className="border-t pt-4 space-y-4">
                    <h3 className="font-medium text-gray-900">Propiedades</h3>
                    
                    {/* Posición */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="element-x">X</Label>
                        <Input
                          id="element-x"
                          type="number"
                          value={selectedElement.x}
                          onChange={(e) => updateSelectedElement({ x: parseInt(e.target.value) || 0 })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="element-y">Y</Label>
                        <Input
                          id="element-y"
                          type="number"
                          value={selectedElement.y}
                          onChange={(e) => updateSelectedElement({ y: parseInt(e.target.value) || 0 })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Opacidad */}
                    <div>
                      <Label>Opacidad: {Math.round((selectedElement.opacity || 1) * 100)}%</Label>
                      <Slider
                        value={[(selectedElement.opacity || 1) * 100]}
                        onValueChange={([value]) => updateSelectedElement({ opacity: value / 100 })}
                        min={0}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    {/* Acciones del elemento */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={deleteSelectedElement}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Tab de Capas */}
            <TabsContent value="layers" className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Capas</h3>
                <div className="space-y-1">
                  {[...canvasElements].reverse().map((element) => (
                    <div
                      key={element.id}
                      className={`p-2 rounded border cursor-pointer transition-colors ${
                        selectedElement?.id === element.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedElement(element)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {element.type === 'text' && <Type className="h-4 w-4" />}
                          {element.type === 'sticker' && <span className="text-sm">{element.content}</span>}
                          {element.type === 'background' && <div className="w-4 h-4 rounded border" style={{ backgroundColor: element.color }} />}
                          <span className="text-sm">
                            {element.type === 'text' ? element.content.substring(0, 20) : 
                             element.type === 'sticker' ? 'Sticker' :
                             'Fondo'}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateSelectedElement({ 
                              opacity: element.opacity === 0 ? 1 : 0 
                            });
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Área principal del canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar superior */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {selectedTemplate ? selectedTemplate.name : 'Editor de Invitaciones'}
              </h1>
              {selectedElement && (
                <Badge variant="outline">
                  {selectedElement.type === 'text' ? 'Texto' :
                   selectedElement.type === 'sticker' ? 'Sticker' : 'Elemento'} seleccionado
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Controles de zoom */}
              <div className="flex items-center gap-2 border rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setZoom(Math.max(25, zoom - 25))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>

              {/* Grid toggle */}
              <Button
                variant={showGrid ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowGrid(!showGrid)}
              >
                <Grid className="h-4 w-4" />
              </Button>

              {/* Acciones */}
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => exportDesign('pdf')}>
                    Exportar como PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportDesign('png')}>
                    Exportar como PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportDesign('jpg')}>
                    Exportar como JPG
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-100 p-8 overflow-auto">
          <div className="flex justify-center">
            <div
              className="relative bg-white shadow-lg"
              style={{
                width: canvasSize.width * (zoom / 100),
                height: canvasSize.height * (zoom / 100)
              }}
            >
              <svg
                ref={canvasRef}
                width={canvasSize.width * (zoom / 100)}
                height={canvasSize.height * (zoom / 100)}
                className="absolute inset-0 cursor-pointer"
                onClick={handleCanvasClick}
                style={{
                  backgroundImage: showGrid ? 
                    'radial-gradient(circle, #e5e7eb 1px, transparent 1px)' : 'none',
                  backgroundSize: showGrid ? '20px 20px' : 'auto'
                }}
                viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
              >
                {/* Renderizar elementos del canvas */}
                {canvasElements.map((element) => {
                  if (element.type === 'background') {
                    return (
                      <rect
                        key={element.id}
                        x={element.x}
                        y={element.y}
                        width={element.width}
                        height={element.height}
                        fill={element.color}
                        className={selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}
                      />
                    );
                  }
                  
                  if (element.type === 'text') {
                    return (
                      <foreignObject
                        key={element.id}
                        x={element.x}
                        y={element.y}
                        width={element.width}
                        height={element.height}
                        className={selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}
                      >
                        <div
                          style={{
                            fontFamily: element.fontFamily,
                            fontSize: `${element.fontSize}px`,
                            color: element.color,
                            textAlign: element.textAlign,
                            fontWeight: element.fontWeight,
                            fontStyle: element.fontStyle,
                            textDecoration: element.textDecoration,
                            opacity: element.opacity || 1,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: element.textAlign === 'center' ? 'center' : 
                                           element.textAlign === 'right' ? 'flex-end' : 'flex-start'
                          }}
                        >
                          {element.content}
                        </div>
                      </foreignObject>
                    );
                  }
                  
                  if (element.type === 'sticker') {
                    return (
                      <foreignObject
                        key={element.id}
                        x={element.x}
                        y={element.y}
                        width={element.width}
                        height={element.height}
                        className={selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''}
                      >
                        <div
                          style={{
                            fontSize: `${element.fontSize}px`,
                            opacity: element.opacity || 1,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {element.content}
                        </div>
                      </foreignObject>
                    );
                  }
                  
                  return null;
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
