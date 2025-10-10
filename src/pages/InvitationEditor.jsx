import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { 
  Type, 
  Image, 
  Palette, 
  Layers, 
  Save, 
  Download, 
  Share2, 
  Eye, 
  Undo, 
  Redo,
  Plus,
  Minus,
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
  Upload,
  Settings,
  Crown,
  Sparkles,
  Copy,
  MoreHorizontal,
  Sticker,
  LogIn
} from 'lucide-react';

const InvitationEditor = ({ initialDesign = null, event = null, onDesignChange = null, onSave = null }) => {
  // Estados principales
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [designData, setDesignData] = useState(initialDesign);
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasZoom, setCanvasZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);

  // Estados para herramientas
  const [activeTab, setActiveTab] = useState(initialDesign ? 'text-styles' : 'templates');
  const [activeTool, setActiveTool] = useState('select');
  const [templates, setTemplates] = useState([]);

  // Ref para input de archivos
  const fileInputRef = useRef(null);

  // Efecto para inicializar el historial cuando se carga un diseño inicial
  useEffect(() => {
    if (initialDesign && initialDesign.design_data) {
      addToHistory(initialDesign.design_data);
    } else if (!initialDesign) {
      // Si no hay diseño inicial, crear uno básico
      const basicDesign = {
        id: 'new_design',
        design_name: 'Nuevo Diseño',
        design_data: {
          canvas: {
            width: 800,
            height: 1200,
            background: '#ffffff'
          },
          elements: []
        }
      };
      setDesignData(basicDesign);
      addToHistory(basicDesign.design_data);
    }
  }, [initialDesign]);

  // Cargar plantillas al montar el componente
  useEffect(() => {
    if (!initialDesign) {
      loadTemplates();
    }
  }, [initialDesign]);

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      if (response.ok) {
        const data = await response.json();
        let templatesList = [];
        if (data.templates && typeof data.templates === 'object') {
          Object.values(data.templates).forEach(categoryTemplates => {
            if (Array.isArray(categoryTemplates)) {
              templatesList = templatesList.concat(categoryTemplates);
            }
          });
        } else if (Array.isArray(data.templates)) {
          templatesList = data.templates;
        }
        setTemplates(templatesList);
      }
    } catch (error) {
      console.warn('Error loading templates:', error);
      // Plantillas de fallback
      setTemplates([
        {
          id: 1,
          name: 'Clásico',
          description: 'Diseño elegante y atemporal',
          category: 'wedding',
          is_premium: false
        },
        {
          id: 2,
          name: 'Moderno',
          description: 'Diseño contemporáneo',
          category: 'wedding',
          is_premium: false
        }
      ]);
    }
  };

  // Fuentes disponibles
  const fonts = [
    { name: 'Arial', family: 'Arial, sans-serif', weight: 'Regular' },
    { name: 'Arial Bold', family: 'Arial, sans-serif', weight: 'Bold' },
    { name: 'Times New Roman', family: 'Times New Roman, serif', weight: 'Regular' },
    { name: 'Helvetica', family: 'Helvetica, sans-serif', weight: 'Regular' },
    { name: 'Georgia', family: 'Georgia, serif', weight: 'Regular' },
    { name: 'Playfair Display', family: 'Playfair Display, serif', weight: 'Regular' },
    { name: 'Inter', family: 'Inter, sans-serif', weight: 'Regular' },
    { name: 'Poppins', family: 'Poppins, sans-serif', weight: 'Regular' }
  ];

  // Paleta de colores
  const colorPalette = [
    '#3B82F6', '#F97316', '#EC4899', '#000000', '#6B7280',
    '#EAB308', '#10B981', '#8B5CF6', '#EF4444', '#FFFFFF'
  ];

  // Stickers
  const stickers = [
    { id: 1, name: 'Corazón', emoji: '❤️' },
    { id: 2, name: 'Estrella', emoji: '⭐' },
    { id: 3, name: 'Globo', emoji: '🎈' },
    { id: 4, name: 'Pastel', emoji: '🎂' },
    { id: 5, name: 'Anillos', emoji: '💍' },
    { id: 6, name: 'Flores', emoji: '🌸' }
  ];

  const addToHistory = (designState) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(designState)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const previousState = history[newIndex];
      setDesignData(prev => ({
        ...prev,
        design_data: previousState
      }));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextState = history[newIndex];
      setDesignData(prev => ({
        ...prev,
        design_data: nextState
      }));
    }
  };

  const saveDesign = async () => {
    if (!designData) return;
    
    // Si hay un callback onSave externo, usarlo
    if (onSave) {
      await onSave();
      return;
    }
    
    setIsSaving(true);
    try {
      // Simular guardado si no hay API disponible
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Design saved successfully');
    } catch (error) {
      console.error('Error saving design:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    
    // Crear diseño basado en la plantilla
    const newDesign = {
      id: `design_${template.id}`,
      design_name: `Diseño ${template.name}`,
      template_id: template.id,
      design_data: {
        canvas: {
          width: 800,
          height: 1200,
          background: '#ffffff'
        },
        elements: [
          {
            id: 'title',
            type: 'text',
            content: event?.title || 'Título del Evento',
            x: 100,
            y: 100,
            width: 600,
            height: 80,
            fontSize: 48,
            fontFamily: 'Playfair Display, serif',
            fontWeight: 'Bold',
            color: '#2c3e50',
            textAlign: 'center'
          },
          {
            id: 'subtitle',
            type: 'text',
            content: event?.description || 'Descripción del evento',
            x: 100,
            y: 200,
            width: 600,
            height: 60,
            fontSize: 24,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 'Regular',
            color: '#34495e',
            textAlign: 'center'
          }
        ]
      }
    };

    setDesignData(newDesign);
    addToHistory(newDesign.design_data);
    setActiveTab('text-styles');
    
    // Notificar al componente padre
    if (onDesignChange) {
      onDesignChange(newDesign);
    }
  };

  const updateSelectedElement = (updates) => {
    if (!selectedElement || !designData) return;

    const updatedElements = designData.design_data.elements.map(element =>
      element.id === selectedElement.id ? { ...element, ...updates } : element
    );

    const updatedDesignData = {
      ...designData.design_data,
      elements: updatedElements
    };

    const newDesignData = {
      ...designData,
      design_data: updatedDesignData
    };

    setDesignData(newDesignData);
    
    // Notificar al componente padre sobre el cambio
    if (onDesignChange) {
      onDesignChange(newDesignData);
    }

    setSelectedElement(prev => ({ ...prev, ...updates }));
    addToHistory(updatedDesignData);
  };

  const addTextElement = () => {
    if (!designData) return;

    const newElement = {
      id: `text_${Date.now()}`,
      type: 'text',
      content: 'Nuevo texto',
      x: 100,
      y: 300,
      width: 200,
      height: 50,
      fontSize: 24,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 'Regular',
      color: '#000000',
      textAlign: 'left'
    };

    const updatedDesignData = {
      ...designData.design_data,
      elements: [...(designData.design_data.elements || []), newElement]
    };

    const newDesignData = {
      ...designData,
      design_data: updatedDesignData
    };

    setDesignData(newDesignData);
    addToHistory(updatedDesignData);
    setSelectedElement(newElement);
    
    if (onDesignChange) {
      onDesignChange(newDesignData);
    }
  };

  const addStickerElement = (sticker) => {
    if (!designData) return;

    const newElement = {
      id: `sticker_${Date.now()}`,
      type: 'sticker',
      content: sticker.emoji,
      name: sticker.name,
      x: 150,
      y: 400,
      width: 60,
      height: 60
    };

    const updatedDesignData = {
      ...designData.design_data,
      elements: [...(designData.design_data.elements || []), newElement]
    };

    const newDesignData = {
      ...designData,
      design_data: updatedDesignData
    };

    setDesignData(newDesignData);
    addToHistory(updatedDesignData);
    setSelectedElement(newElement);
    
    if (onDesignChange) {
      onDesignChange(newDesignData);
    }
  };

  const deleteSelectedElement = () => {
    if (!selectedElement || !designData) return;

    const updatedElements = designData.design_data.elements.filter(
      element => element.id !== selectedElement.id
    );

    const updatedDesignData = {
      ...designData.design_data,
      elements: updatedElements
    };

    const newDesignData = {
      ...designData,
      design_data: updatedDesignData
    };

    setDesignData(newDesignData);
    addToHistory(updatedDesignData);
    setSelectedElement(null);
    
    if (onDesignChange) {
      onDesignChange(newDesignData);
    }
  };

  const renderCanvas = () => {
    if (!designData?.design_data) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <Sparkles className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-600">Selecciona una plantilla para comenzar</p>
            <p className="text-sm text-gray-500">Elige una plantilla de la galería para empezar a diseñar</p>
          </div>
        </div>
      );
    }

    const canvas = designData.design_data.canvas || { width: 800, height: 1200, background: '#ffffff' };
    const elements = designData.design_data.elements || [];

    return (
      <div className="flex items-center justify-center h-full p-4">
        <div 
          className="relative bg-white shadow-lg border"
          style={{
            width: canvas.width * (canvasZoom / 100),
            height: canvas.height * (canvasZoom / 100),
            backgroundColor: canvas.background,
            transform: `scale(${canvasZoom / 100})`,
            transformOrigin: 'center center'
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
          
          {elements.map((element) => (
            <div
              key={element.id}
              className={`absolute cursor-pointer border-2 transition-all ${
                selectedElement?.id === element.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-transparent hover:border-gray-300'
              }`}
              style={{
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
                fontSize: element.fontSize,
                fontFamily: element.fontFamily,
                fontWeight: element.fontWeight,
                color: element.color,
                textAlign: element.textAlign,
                display: 'flex',
                alignItems: 'center',
                justifyContent: element.textAlign === 'center' ? 'center' : 
                               element.textAlign === 'right' ? 'flex-end' : 'flex-start',
                padding: '8px',
                overflow: 'hidden'
              }}
              onClick={() => setSelectedElement(element)}
            >
              {element.content}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`${initialDesign ? 'h-full' : 'h-screen'} flex flex-col bg-gray-50`}>
      {/* Header - Solo mostrar si no hay diseño inicial (modo standalone) */}
      {!initialDesign && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Editor de Invitaciones</h1>
              {designData && (
                <Badge variant="outline">{designData.design_name}</Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
                <Redo className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="outline" size="sm" onClick={() => setShowGrid(!showGrid)}>
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" onClick={saveDesign} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Controles rápidos para modo integrado */}
      {initialDesign && (
        <div className="bg-white border-b border-gray-200 px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
                <Redo className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="outline" size="sm" onClick={() => setShowGrid(!showGrid)}>
                <Grid className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Zoom:</span>
              <Button variant="outline" size="sm" onClick={() => setCanvasZoom(Math.max(25, canvasZoom - 25))}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[3rem] text-center">{canvasZoom}%</span>
              <Button variant="outline" size="sm" onClick={() => setCanvasZoom(Math.min(200, canvasZoom + 25))}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex">
        {/* Sidebar izquierdo */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 m-4">
              <TabsTrigger value="templates">Plantillas</TabsTrigger>
              <TabsTrigger value="text-styles">Texto</TabsTrigger>
              <TabsTrigger value="tools">Herramientas</TabsTrigger>
              <TabsTrigger value="layers">Capas</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              {/* Tab de Plantillas */}
              <TabsContent value="templates" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 pb-4">
                    <div>
                      <h3 className="font-medium mb-3">Seleccionar Plantilla</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {templates.map((template) => (
                          <Card 
                            key={template.id} 
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => handleTemplateSelect(template)}
                          >
                            <CardContent className="p-3">
                              <div className="aspect-[3/4] bg-gray-100 rounded mb-2 flex items-center justify-center">
                                {template.preview_image_url ? (
                                  <img 
                                    src={template.preview_image_url} 
                                    alt={template.name}
                                    className="w-full h-full object-cover rounded"
                                  />
                                ) : (
                                  <Type className="w-8 h-8 text-gray-400" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium truncate">{template.name}</p>
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs">
                                    {template.category}
                                  </Badge>
                                  {template.is_premium && (
                                    <Crown className="w-3 h-3 text-yellow-500" />
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Tab de Texto */}
              <TabsContent value="text-styles" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-6 pb-4">
                    <div>
                      <Button onClick={addTextElement} className="w-full mb-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Texto
                      </Button>
                    </div>

                    {selectedElement && selectedElement.type === 'text' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="content">Contenido</Label>
                          <Textarea
                            id="content"
                            value={selectedElement.content}
                            onChange={(e) => updateSelectedElement({ content: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="fontSize">Tamaño de fuente</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Slider
                              value={[selectedElement.fontSize]}
                              onValueChange={(value) => updateSelectedElement({ fontSize: value[0] })}
                              max={72}
                              min={8}
                              step={1}
                              className="flex-1"
                            />
                            <span className="text-sm font-medium w-8">{selectedElement.fontSize}</span>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="fontFamily">Fuente</Label>
                          <Select 
                            value={selectedElement.fontFamily} 
                            onValueChange={(value) => updateSelectedElement({ fontFamily: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {fonts.map((font) => (
                                <SelectItem key={font.family} value={font.family}>
                                  <span style={{ fontFamily: font.family }}>{font.name}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Color</Label>
                          <div className="grid grid-cols-5 gap-2 mt-2">
                            {colorPalette.map((color) => (
                              <button
                                key={color}
                                className={`w-8 h-8 rounded border-2 ${
                                  selectedElement.color === color ? 'border-gray-800' : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color }}
                                onClick={() => updateSelectedElement({ color })}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label>Alineación</Label>
                          <div className="flex space-x-1 mt-2">
                            <Button
                              variant={selectedElement.textAlign === 'left' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateSelectedElement({ textAlign: 'left' })}
                            >
                              <AlignLeft className="w-4 h-4" />
                            </Button>
                            <Button
                              variant={selectedElement.textAlign === 'center' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateSelectedElement({ textAlign: 'center' })}
                            >
                              <AlignCenter className="w-4 h-4" />
                            </Button>
                            <Button
                              variant={selectedElement.textAlign === 'right' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateSelectedElement({ textAlign: 'right' })}
                            >
                              <AlignRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Tab de Herramientas */}
              <TabsContent value="tools" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 pb-4">
                    <div>
                      <h3 className="font-medium mb-3">Stickers</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {stickers.map((sticker) => (
                          <Button
                            key={sticker.id}
                            variant="outline"
                            className="h-12 text-2xl"
                            onClick={() => addStickerElement(sticker)}
                          >
                            {sticker.emoji}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Tab de Capas */}
              <TabsContent value="layers" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 pb-4">
                    <div>
                      <h3 className="font-medium mb-3">Elementos</h3>
                      <div className="space-y-2">
                        {designData?.design_data?.elements?.map((element) => (
                          <div
                            key={element.id}
                            className={`p-2 border rounded cursor-pointer ${
                              selectedElement?.id === element.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedElement(element)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {element.type === 'text' ? element.content.substring(0, 20) + '...' : element.name || element.type}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedElement(element);
                                  deleteSelectedElement();
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Canvas principal */}
        <div className="flex-1 overflow-auto bg-gray-100">
          {renderCanvas()}
        </div>
      </div>

      {/* Input oculto para archivos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={() => {}} // Placeholder para funcionalidad futura
      />
    </div>
  );
};

export default InvitationEditor;
