import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  ArrowLeft,
  Save,
  Eye,
  Palette,
  Type,
  Image as ImageIcon,
  Layout,
  Settings,
  Upload,
  Download,
  Undo,
  Redo,
  Copy,
  Trash2,
  Move,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Grid,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Plus,
  Minus,
  Check,
  X,
  Wand2
} from 'lucide-react';
import { api } from '../lib/api';

const VisualEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado del evento
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado del editor
  const [activeTab, setActiveTab] = useState('design');
  const [selectedElement, setSelectedElement] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Referencias
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Paletas de colores predefinidas
  const colorPalettes = [
    {
      name: 'Clásico',
      colors: ['#1a1a1a', '#ffffff', '#f5f5f5', '#e5e5e5', '#cccccc']
    },
    {
      name: 'Elegante',
      colors: ['#2c3e50', '#ecf0f1', '#e74c3c', '#f39c12', '#9b59b6']
    },
    {
      name: 'Moderno',
      colors: ['#34495e', '#3498db', '#2ecc71', '#f1c40f', '#e67e22']
    },
    {
      name: 'Romántico',
      colors: ['#8e44ad', '#e91e63', '#ffc0cb', '#fff0f5', '#ffe4e1']
    },
    {
      name: 'Natural',
      colors: ['#27ae60', '#2ecc71', '#f39c12', '#e67e22', '#d35400']
    }
  ];
  
  // Fuentes disponibles
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
  
  // Templates de elementos
  const elementTemplates = [
    {
      type: 'text',
      name: 'Título Principal',
      style: {
        fontSize: '48px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1a1a1a'
      }
    },
    {
      type: 'text',
      name: 'Subtítulo',
      style: {
        fontSize: '24px',
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#666666'
      }
    },
    {
      type: 'text',
      name: 'Párrafo',
      style: {
        fontSize: '16px',
        fontWeight: 'normal',
        textAlign: 'left',
        color: '#333333'
      }
    }
  ];

  useEffect(() => {
    if (id) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${id}`);
      setEvent(response.data || response);
    } catch (err) {
      setError('Error cargando el evento');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveEvent = async () => {
    try {
      setSaving(true);
      await api.put(`/events/${id}`, event);
      // Mostrar notificación de guardado exitoso
    } catch (err) {
      setError('Error guardando el evento');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleColorChange = (property, color) => {
    setEvent(prev => ({
      ...prev,
      [property]: color
    }));
  };

  const handleFontChange = (fontFamily) => {
    setEvent(prev => ({
      ...prev,
      font_family: fontFamily
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Aquí manejarías la subida de imagen
        console.log('Image uploaded:', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addElement = (template) => {
    // Lógica para agregar elemento al canvas
    console.log('Adding element:', template);
  };

  const deleteElement = () => {
    if (selectedElement) {
      // Lógica para eliminar elemento seleccionado
      setSelectedElement(null);
    }
  };

  const duplicateElement = () => {
    if (selectedElement) {
      // Lógica para duplicar elemento seleccionado
      console.log('Duplicating element:', selectedElement);
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      // Aplicar estado anterior
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      // Aplicar estado siguiente
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando editor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header del Editor */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/app/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            
            <div>
              <h1 className="text-lg font-semibold">{event?.title || 'Editor Visual'}</h1>
              <p className="text-sm text-gray-500">Editor de invitaciones</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Controles de historial */}
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

            {/* Controles de zoom */}
            <div className="flex items-center gap-1 px-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setZoom(Math.max(25, zoom - 25))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm min-w-[50px] text-center">{zoom}%</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setZoom(Math.min(200, zoom + 25))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>

            {/* Botones principales */}
            <Button 
              variant="outline"
              onClick={() => navigate(`/app/events/${id}/preview`)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Vista Previa
            </Button>
            
            <Button 
              onClick={saveEvent}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Panel Lateral Izquierdo - Herramientas */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="grid w-full grid-cols-4 p-1 m-2">
              <TabsTrigger value="design" className="text-xs">
                <Palette className="w-4 h-4 mr-1" />
                Diseño
              </TabsTrigger>
              <TabsTrigger value="text" className="text-xs">
                <Type className="w-4 h-4 mr-1" />
                Texto
              </TabsTrigger>
              <TabsTrigger value="images" className="text-xs">
                <ImageIcon className="w-4 h-4 mr-1" />
                Imágenes
              </TabsTrigger>
              <TabsTrigger value="elements" className="text-xs">
                <Layout className="w-4 h-4 mr-1" />
                Elementos
              </TabsTrigger>
            </TabsList>

            {/* Tab de Diseño */}
            <TabsContent value="design" className="p-4 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Paletas de Colores</h3>
                <div className="space-y-3">
                  {colorPalettes.map((palette, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{palette.name}</span>
                        <Button size="sm" variant="ghost">Aplicar</Button>
                      </div>
                      <div className="flex gap-1">
                        {palette.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-6 h-6 rounded border cursor-pointer"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange('background_color', color)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Color de Fondo</h3>
                <div className="space-y-2">
                  <Input
                    type="color"
                    value={event?.background_color || '#ffffff'}
                    onChange={(e) => handleColorChange('background_color', e.target.value)}
                    className="w-full h-10"
                  />
                  <Input
                    type="text"
                    value={event?.background_color || '#ffffff'}
                    onChange={(e) => handleColorChange('background_color', e.target.value)}
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Color de Texto</h3>
                <div className="space-y-2">
                  <Input
                    type="color"
                    value={event?.text_color || '#000000'}
                    onChange={(e) => handleColorChange('text_color', e.target.value)}
                    className="w-full h-10"
                  />
                  <Input
                    type="text"
                    value={event?.text_color || '#000000'}
                    onChange={(e) => handleColorChange('text_color', e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Fuente</h3>
                <select
                  value={event?.font_family || 'Inter'}
                  onChange={(e) => handleFontChange(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {fontFamilies.map((font) => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>
            </TabsContent>

            {/* Tab de Texto */}
            <TabsContent value="text" className="p-4 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Agregar Texto</h3>
                <div className="space-y-2">
                  {elementTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => addElement(template)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {template.name}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedElement && selectedElement.type === 'text' && (
                <div>
                  <h3 className="font-medium mb-3">Editar Texto</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Contenido</Label>
                      <Textarea
                        value={selectedElement.content || ''}
                        onChange={(e) => {
                          setSelectedElement({
                            ...selectedElement,
                            content: e.target.value
                          });
                        }}
                        placeholder="Escribe tu texto aquí..."
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={selectedElement.style?.fontWeight === 'bold' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedElement({
                            ...selectedElement,
                            style: {
                              ...selectedElement.style,
                              fontWeight: selectedElement.style?.fontWeight === 'bold' ? 'normal' : 'bold'
                            }
                          });
                        }}
                      >
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={selectedElement.style?.fontStyle === 'italic' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedElement({
                            ...selectedElement,
                            style: {
                              ...selectedElement.style,
                              fontStyle: selectedElement.style?.fontStyle === 'italic' ? 'normal' : 'italic'
                            }
                          });
                        }}
                      >
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={selectedElement.style?.textDecoration === 'underline' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedElement({
                            ...selectedElement,
                            style: {
                              ...selectedElement.style,
                              textDecoration: selectedElement.style?.textDecoration === 'underline' ? 'none' : 'underline'
                            }
                          });
                        }}
                      >
                        <Underline className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={selectedElement.style?.textAlign === 'left' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedElement({
                            ...selectedElement,
                            style: {
                              ...selectedElement.style,
                              textAlign: 'left'
                            }
                          });
                        }}
                      >
                        <AlignLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={selectedElement.style?.textAlign === 'center' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedElement({
                            ...selectedElement,
                            style: {
                              ...selectedElement.style,
                              textAlign: 'center'
                            }
                          });
                        }}
                      >
                        <AlignCenter className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={selectedElement.style?.textAlign === 'right' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setSelectedElement({
                            ...selectedElement,
                            style: {
                              ...selectedElement.style,
                              textAlign: 'right'
                            }
                          });
                        }}
                      >
                        <AlignRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <div>
                      <Label>Tamaño de Fuente</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentSize = parseInt(selectedElement.style?.fontSize) || 16;
                            setSelectedElement({
                              ...selectedElement,
                              style: {
                                ...selectedElement.style,
                                fontSize: `${Math.max(8, currentSize - 2)}px`
                              }
                            });
                          }}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={parseInt(selectedElement.style?.fontSize) || 16}
                          onChange={(e) => {
                            setSelectedElement({
                              ...selectedElement,
                              style: {
                                ...selectedElement.style,
                                fontSize: `${e.target.value}px`
                              }
                            });
                          }}
                          className="w-20 text-center"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentSize = parseInt(selectedElement.style?.fontSize) || 16;
                            setSelectedElement({
                              ...selectedElement,
                              style: {
                                ...selectedElement.style,
                                fontSize: `${Math.min(72, currentSize + 2)}px`
                              }
                            });
                          }}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Color del Texto</Label>
                      <Input
                        type="color"
                        value={selectedElement.style?.color || '#000000'}
                        onChange={(e) => {
                          setSelectedElement({
                            ...selectedElement,
                            style: {
                              ...selectedElement.style,
                              color: e.target.value
                            }
                          });
                        }}
                        className="w-full h-10"
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Tab de Imágenes */}
            <TabsContent value="images" className="p-4 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Subir Imagen</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Subir desde Computadora
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Galería</h3>
                <div className="grid grid-cols-2 gap-2">
                  {/* Aquí mostrarías las imágenes subidas */}
                  <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </div>

              {selectedElement && selectedElement.type === 'image' && (
                <div>
                  <h3 className="font-medium mb-3">Editar Imagen</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // Rotar imagen
                      }}
                    >
                      <RotateCw className="w-4 h-4 mr-2" />
                      Rotar
                    </Button>
                    
                    <div>
                      <Label>Opacidad</Label>
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedElement.style?.opacity || 100}
                        onChange={(e) => {
                          setSelectedElement({
                            ...selectedElement,
                            style: {
                              ...selectedElement.style,
                              opacity: e.target.value
                            }
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Tab de Elementos */}
            <TabsContent value="elements" className="p-4 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Formas</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">Rectángulo</Button>
                  <Button variant="outline" size="sm">Círculo</Button>
                  <Button variant="outline" size="sm">Línea</Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Decoraciones</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">Marco</Button>
                  <Button variant="outline" size="sm">Borde</Button>
                  <Button variant="outline" size="sm">Sombra</Button>
                  <Button variant="outline" size="sm">Gradiente</Button>
                </div>
              </div>

              {selectedElement && (
                <div>
                  <h3 className="font-medium mb-3">Elemento Seleccionado</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={duplicateElement}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicar
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-600"
                      onClick={deleteElement}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas Principal */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar del Canvas */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={showGrid ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                >
                  <Grid className="w-4 h-4 mr-1" />
                  Cuadrícula
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {event?.template_id || 'classic'}
                </Badge>
                <Badge variant="outline">
                  {event?.status || 'DRAFT'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Área del Canvas */}
          <div className="flex-1 p-8 overflow-auto bg-gray-100">
            <div className="max-w-4xl mx-auto">
              <div
                ref={canvasRef}
                className="bg-white shadow-lg rounded-lg overflow-hidden relative"
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top center',
                  minHeight: '600px',
                  backgroundColor: event?.background_color || '#ffffff',
                  color: event?.text_color || '#000000',
                  fontFamily: event?.font_family || 'Inter'
                }}
              >
                {/* Grid overlay */}
                {showGrid && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />
                )}

                {/* Contenido del evento */}
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">
                      {event?.title || 'Título del Evento'}
                    </h1>
                    {event?.description && (
                      <p className="text-lg text-gray-600 mb-4">
                        {event.description}
                      </p>
                    )}
                    {event?.event_date && (
                      <p className="text-xl">
                        {new Date(event.event_date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                    {event?.location && (
                      <p className="text-lg text-gray-600 mt-2">
                        {event.location}
                      </p>
                    )}
                  </div>

                  {/* Área para elementos adicionales */}
                  <div className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Wand2 className="w-12 h-12 mx-auto mb-4" />
                      <p>Arrastra elementos aquí o haz clic para agregar contenido</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Lateral Derecho - Propiedades */}
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Información del Evento</h3>
              <div className="space-y-3">
                <div>
                  <Label>Título</Label>
                  <Input
                    value={event?.title || ''}
                    onChange={(e) => setEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Título del evento"
                  />
                </div>
                
                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    value={event?.description || ''}
                    onChange={(e) => setEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descripción del evento"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label>Fecha</Label>
                  <Input
                    type="datetime-local"
                    value={event?.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setEvent(prev => ({ ...prev, event_date: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label>Ubicación</Label>
                  <Input
                    value={event?.location || ''}
                    onChange={(e) => setEvent(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Ubicación del evento"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Configuración</h3>
              <div className="space-y-3">
                <div>
                  <Label>Template</Label>
                  <select
                    value={event?.template_id || 'classic'}
                    onChange={(e) => setEvent(prev => ({ ...prev, template_id: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="classic">Clásico</option>
                    <option value="elegant">Elegante</option>
                    <option value="modern">Moderno</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Acciones</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(`/app/events/${id}/preview`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Vista Previa
                </Button>
                
                <Button
                  className="w-full"
                  onClick={saveEvent}
                  disabled={saving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualEditor;
