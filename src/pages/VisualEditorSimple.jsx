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

const VisualEditorSimple = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado del evento (datos de ejemplo)
  const [event, setEvent] = useState({
    id: id || '1',
    title: 'Boda de María & Juan',
    date: '2024-03-15',
    location: 'Jardín Botánico',
    description: 'Celebra con nosotros este día tan especial',
    primaryColor: '#e91e63',
    secondaryColor: '#ffc0cb',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    fontFamily: 'Playfair Display',
    template: 'elegant'
  });
  
  const [loading, setLoading] = useState(false);
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

  const saveEvent = async () => {
    try {
      setSaving(true);
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Evento guardado:', event);
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
      fontFamily: fontFamily
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('Image uploaded:', e.target.result);
        // Aquí manejarías la subida de imagen
      };
      reader.readAsDataURL(file);
    }
  };

  const addElement = (template) => {
    console.log('Adding element:', template);
    // Lógica para agregar elemento al canvas
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      // Aplicar estado anterior
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      // Aplicar estado siguiente
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 10, 50));
  };

  const previewInvitation = () => {
    // Abrir vista previa en nueva ventana
    window.open(`/p/${event.id}`, '_blank');
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
              <h1 className="text-xl font-semibold">{event.title}</h1>
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
            
            <Button variant="outline" onClick={() => setShowGrid(!showGrid)}>
              <Grid className="h-4 w-4 mr-2" />
              {showGrid ? 'Ocultar' : 'Mostrar'} Grilla
            </Button>
            
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
        {/* Panel Lateral */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-4 p-1 m-4">
              <TabsTrigger value="design" className="text-xs">
                <Palette className="h-4 w-4 mr-1" />
                Diseño
              </TabsTrigger>
              <TabsTrigger value="text" className="text-xs">
                <Type className="h-4 w-4 mr-1" />
                Texto
              </TabsTrigger>
              <TabsTrigger value="images" className="text-xs">
                <ImageIcon className="h-4 w-4 mr-1" />
                Imágenes
              </TabsTrigger>
              <TabsTrigger value="layout" className="text-xs">
                <Layout className="h-4 w-4 mr-1" />
                Layout
              </TabsTrigger>
            </TabsList>

            {/* Tab de Diseño */}
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
                            onClick={() => handleColorChange('primaryColor', color)}
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
                        value={event.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="w-12 h-8 p-0 border-0"
                      />
                      <Input
                        value={event.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
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
                        value={event.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        className="w-12 h-8 p-0 border-0"
                      />
                      <Input
                        value={event.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        className="flex-1 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="backgroundColor" className="text-xs">Color de Fondo</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={event.backgroundColor}
                        onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                        className="w-12 h-8 p-0 border-0"
                      />
                      <Input
                        value={event.backgroundColor}
                        onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                        className="flex-1 text-xs"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab de Texto */}
            <TabsContent value="text" className="p-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Tipografía</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">Fuente Principal</Label>
                    <select
                      value={event.fontFamily}
                      onChange={(e) => handleFontChange(e.target.value)}
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Elementos de Texto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {elementTemplates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => addElement(template)}
                    >
                      <Plus className="h-3 w-3 mr-2" />
                      {template.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Contenido del Evento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="eventTitle" className="text-xs">Título</Label>
                    <Input
                      id="eventTitle"
                      value={event.title}
                      onChange={(e) => setEvent(prev => ({ ...prev, title: e.target.value }))}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="eventDate" className="text-xs">Fecha</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={event.date}
                      onChange={(e) => setEvent(prev => ({ ...prev, date: e.target.value }))}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="eventLocation" className="text-xs">Ubicación</Label>
                    <Input
                      id="eventLocation"
                      value={event.location}
                      onChange={(e) => setEvent(prev => ({ ...prev, location: e.target.value }))}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="eventDescription" className="text-xs">Descripción</Label>
                    <Textarea
                      id="eventDescription"
                      value={event.description}
                      onChange={(e) => setEvent(prev => ({ ...prev, description: e.target.value }))}
                      className="text-xs"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab de Imágenes */}
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
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
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
                    {/* Aquí irían las imágenes subidas */}
                    <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab de Layout */}
            <TabsContent value="layout" className="p-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="h-20 flex-col">
                      <div className="w-8 h-6 bg-gray-200 rounded mb-1"></div>
                      <span className="text-xs">Clásico</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-20 flex-col">
                      <div className="w-8 h-6 bg-gray-200 rounded mb-1"></div>
                      <span className="text-xs">Moderno</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-20 flex-col">
                      <div className="w-8 h-6 bg-gray-200 rounded mb-1"></div>
                      <span className="text-xs">Elegante</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-20 flex-col">
                      <div className="w-8 h-6 bg-gray-200 rounded mb-1"></div>
                      <span className="text-xs">Minimalista</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas Principal */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div 
              ref={canvasRef}
              className="bg-white rounded-lg shadow-lg min-h-[600px] relative"
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                backgroundColor: event.backgroundColor,
                fontFamily: event.fontFamily
              }}
            >
              {showGrid && (
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
              )}
              
              {/* Vista previa de la invitación */}
              <div className="p-12 text-center">
                <h1 
                  className="text-6xl font-bold mb-6"
                  style={{ 
                    color: event.primaryColor,
                    fontFamily: event.fontFamily 
                  }}
                >
                  {event.title}
                </h1>
                
                <div 
                  className="text-2xl mb-8"
                  style={{ color: event.textColor }}
                >
                  {event.description}
                </div>
                
                <div 
                  className="text-xl mb-4"
                  style={{ color: event.secondaryColor }}
                >
                  📅 {new Date(event.date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                
                <div 
                  className="text-xl"
                  style={{ color: event.secondaryColor }}
                >
                  📍 {event.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualEditorSimple;
