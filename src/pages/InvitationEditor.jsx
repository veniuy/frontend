import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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

const InvitationEditor = () => {
  // Estados principales
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [designData, setDesignData] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [canvasZoom, setCanvasZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);

  // Estados para herramientas
  const [activeTab, setActiveTab] = useState('templates');
  const [activeTool, setActiveTool] = useState('select');
  const [templates, setTemplates] = useState([]);
  
  // Fuentes con preview real (como Paperless Post)
  const [fonts, setFonts] = useState([
    { name: 'Futura BT', family: 'Futura, sans-serif', weight: 'Regular' },
    { name: 'Futura BT', family: 'Futura, sans-serif', weight: 'Bold' },
    { name: 'Trajan', family: 'Trajan Pro, serif', weight: 'Regular' },
    { name: 'Trade Gothic', family: 'Trade Gothic, sans-serif', weight: 'Regular' },
    { name: 'Trade Gothic', family: 'Trade Gothic, sans-serif', weight: 'Bold' },
    { name: 'MTC-Ngl', family: 'Montserrat, sans-serif', weight: 'Regular' },
    { name: 'Didot', family: 'Didot, serif', weight: 'Regular' },
    { name: 'Didot', family: 'Didot, serif', weight: 'Bold' },
    { name: 'Inter', family: 'Inter, sans-serif', weight: 'Regular' },
    { name: 'Inter', family: 'Inter, sans-serif', weight: 'Medium' },
    { name: 'Playfair Display', family: 'Playfair Display, serif', weight: 'Regular' },
    { name: 'Poppins', family: 'Poppins, sans-serif', weight: 'Regular' }
  ]);

  // Colores organizados como círculos (como Paperless Post)
  const [colorPalette, setColorPalette] = useState([
    '#3B82F6', // Azul
    '#F97316', // Naranja
    '#EC4899', // Rosa
    '#000000', // Negro
    '#6B7280', // Gris
    '#EAB308', // Amarillo
    '#10B981', // Verde
    '#8B5CF6', // Púrpura
    '#EF4444', // Rojo
    '#FFFFFF'  // Blanco
  ]);

  // Stickers y elementos decorativos
  const [stickers, setStickers] = useState([
    { id: 1, name: 'Corazón', emoji: '❤️' },
    { id: 2, name: 'Estrella', emoji: '⭐' },
    { id: 3, name: 'Globo', emoji: '🎈' },
    { id: 4, name: 'Pastel', emoji: '🎂' },
    { id: 5, name: 'Regalo', emoji: '🎁' },
    { id: 6, name: 'Flores', emoji: '🌸' },
    { id: 7, name: 'Confeti', emoji: '🎊' },
    { id: 8, name: 'Diamante', emoji: '💎' }
  ]);

  // Blend modes (como Paperless Post)
  const [blendModes] = useState([
    'normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard-light',
    'color-dodge', 'color-burn', 'darken', 'lighten', 'difference', 'exclusion'
  ]);

  // Referencias
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Cargar plantillas al montar el componente
  useEffect(() => {
    loadTemplates();
  }, []);

 const loadTemplates = async () => {
  try {
    const resp = await fetch(`${API}/editor/templates`, {
      credentials: 'include',
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    setTemplates(data.templates || []);
  } catch (err) {
    console.error('Error loading templates:', err);
  }
};

const handleTemplateSelect = async (template) => {
  try {
    setSelectedTemplate(template);
    const resp = await fetch(`${API}/editor/designs`, {
      method: 'POST',
      credentials: 'include',            // <-- importante para la sesión
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template_id: template.id,
        design_name: `Mi ${template.name}`,
        // event_id: <opcional si corresponde>
      }),
    });

      if (response.ok) {
        const data = await response.json();
        setDesignData(data.design);
        addToHistory(data.design.design_data);
        setActiveTab('text-styles');
      }
    } catch (error) {
      console.error('Error selecting template:', error);
    }
  };

  const addToHistory = (state) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(state)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setDesignData(prev => ({
        ...prev,
        design_data: history[historyIndex - 1]
      }));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setDesignData(prev => ({
        ...prev,
        design_data: history[historyIndex + 1]
      }));
    }
  };

  const saveDesign = async () => {
    if (!designData) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`/api/designs/${designData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          design_data: designData.design_data
        }),
      });

      if (response.ok) {
        console.log('Design saved successfully');
      }
    } catch (error) {
      console.error('Error saving design:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const addTextElement = () => {
    if (!designData) return;

    const newElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'Nuevo texto',
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      fontSize: 24,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 'Regular',
      color: '#000000',
      fontStyle: 'normal',
      textAlign: 'left',
      rotation: 0,
      letterSpacing: 0,
      lineHeight: 1.2,
      blendMode: 'normal',
      opacity: 1,
      zIndex: 1
    };

    const updatedDesignData = {
      ...designData.design_data,
      elements: [...(designData.design_data.elements || []), newElement]
    };

    setDesignData(prev => ({
      ...prev,
      design_data: updatedDesignData
    }));

    addToHistory(updatedDesignData);
    setSelectedElement(newElement);
  };

  const addStickerElement = (sticker) => {
    if (!designData) return;

    const newElement = {
      id: Date.now().toString(),
      type: 'sticker',
      content: sticker.emoji,
      name: sticker.name,
      x: 150,
      y: 150,
      width: 60,
      height: 60,
      rotation: 0,
      opacity: 1,
      zIndex: 1
    };

    const updatedDesignData = {
      ...designData.design_data,
      elements: [...(designData.design_data.elements || []), newElement]
    };

    setDesignData(prev => ({
      ...prev,
      design_data: updatedDesignData
    }));

    addToHistory(updatedDesignData);
    setSelectedElement(newElement);
  };

  const addImageElement = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !designData) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/designs/${designData.id}/assets`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        
        const newElement = {
          id: Date.now().toString(),
          type: 'image',
          src: data.asset_url,
          x: 100,
          y: 100,
          width: 200,
          height: 200,
          rotation: 0,
          opacity: 1,
          zIndex: 1
        };

        const updatedDesignData = {
          ...designData.design_data,
          elements: [...(designData.design_data.elements || []), newElement]
        };

        setDesignData(prev => ({
          ...prev,
          design_data: updatedDesignData
        }));

        addToHistory(updatedDesignData);
        setSelectedElement(newElement);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
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

    setDesignData(prev => ({
      ...prev,
      design_data: updatedDesignData
    }));

    setSelectedElement(prev => ({ ...prev, ...updates }));
  };

  const duplicateSelectedElement = () => {
    if (!selectedElement || !designData) return;

    const newElement = {
      ...selectedElement,
      id: Date.now().toString(),
      x: selectedElement.x + 20,
      y: selectedElement.y + 20
    };

    const updatedElements = [...designData.design_data.elements, newElement];

    const updatedDesignData = {
      ...designData.design_data,
      elements: updatedElements
    };

    setDesignData(prev => ({
      ...prev,
      design_data: updatedDesignData
    }));

    addToHistory(updatedDesignData);
    setSelectedElement(newElement);
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

    setDesignData(prev => ({
      ...prev,
      design_data: updatedDesignData
    }));

    addToHistory(updatedDesignData);
    setSelectedElement(null);
  };

  const moveElementLayer = (direction) => {
    if (!selectedElement || !designData) return;

    const elements = [...designData.design_data.elements];
    const elementIndex = elements.findIndex(el => el.id === selectedElement.id);
    
    if (direction === 'up' && elementIndex < elements.length - 1) {
      [elements[elementIndex], elements[elementIndex + 1]] = [elements[elementIndex + 1], elements[elementIndex]];
    } else if (direction === 'down' && elementIndex > 0) {
      [elements[elementIndex], elements[elementIndex - 1]] = [elements[elementIndex - 1], elements[elementIndex]];
    }

    const updatedDesignData = {
      ...designData.design_data,
      elements
    };

    setDesignData(prev => ({
      ...prev,
      design_data: updatedDesignData
    }));

    addToHistory(updatedDesignData);
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

    const canvas = designData.design_data.canvas || { width: 600, height: 800, background_color: '#ffffff' };
    const elements = designData.design_data.elements || [];

    return (
      <div 
        className="relative bg-white shadow-lg rounded-lg overflow-hidden"
        style={{
          width: `${canvas.width}px`,
          height: `${canvas.height}px`,
          backgroundColor: canvas.background_color,
          transform: `scale(${canvasZoom / 100})`,
          transformOrigin: 'top left'
        }}
      >
        {showGrid && (
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        )}
        
        {elements.map((element) => (
          <div
            key={element.id}
            className={`absolute cursor-pointer transition-all duration-200 ${
              selectedElement?.id === element.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              transform: `rotate(${element.rotation || 0}deg)`,
              zIndex: element.zIndex || 1,
              opacity: element.opacity || 1,
              mixBlendMode: element.blendMode || 'normal'
            }}
            onClick={() => setSelectedElement(element)}
          >
            {element.type === 'text' && (
              <div
                style={{
                  fontSize: `${element.fontSize}px`,
                  fontFamily: element.fontFamily,
                  fontWeight: element.fontWeight,
                  color: element.color,
                  fontStyle: element.fontStyle,
                  textAlign: element.textAlign,
                  letterSpacing: `${element.letterSpacing || 0}px`,
                  lineHeight: element.lineHeight || 1.2,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {element.content}
              </div>
            )}
            
            {element.type === 'image' && (
              <img
                src={element.src}
                alt="Design element"
                className="w-full h-full object-cover rounded"
                draggable={false}
              />
            )}

            {element.type === 'sticker' && (
              <div
                className="w-full h-full flex items-center justify-center text-4xl"
                style={{ fontSize: `${element.width * 0.8}px` }}
              >
                {element.content}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
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

      <div className="flex-1 flex">
        {/* Sidebar izquierdo - Estilo Paperless Post */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-5 m-4">
              <TabsTrigger value="templates">Plantillas</TabsTrigger>
              <TabsTrigger value="text-styles">Texto</TabsTrigger>
              <TabsTrigger value="tools">Herramientas</TabsTrigger>
              <TabsTrigger value="colors">Colores</TabsTrigger>
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

              {/* Tab de Text Styles - Estilo Paperless Post */}
              <TabsContent value="text-styles" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-6 pb-4">
                    <div>
                      <h3 className="font-medium mb-3">Text Styles</h3>
                      <div className="space-y-2">
                        {fonts.map((font, index) => (
                          <button
                            key={index}
                            className={`w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors ${
                              selectedElement?.fontFamily === font.family ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => selectedElement && updateSelectedElement({ 
                              fontFamily: font.family,
                              fontWeight: font.weight 
                            })}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p 
                                  className="font-medium text-lg"
                                  style={{ fontFamily: font.family, fontWeight: font.weight }}
                                >
                                  {font.name}
                                </p>
                                <p className="text-sm text-gray-500">{font.weight}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedElement?.type === 'text' && (
                      <div className="space-y-4 border-t pt-4">
                        <h4 className="font-medium">Controles de Texto</h4>
                        
                        {/* Letter Spacing */}
                        <div>
                          <Label className="text-sm flex items-center justify-between">
                            Letter spacing
                            <div className="flex items-center space-x-1">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => updateSelectedElement({ 
                                  letterSpacing: Math.max(-5, (selectedElement.letterSpacing || 0) - 0.5) 
                                })}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-xs w-8 text-center">
                                {selectedElement.letterSpacing || 0}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => updateSelectedElement({ 
                                  letterSpacing: Math.min(10, (selectedElement.letterSpacing || 0) + 0.5) 
                                })}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </Label>
                        </div>

                        {/* Line Height */}
                        <div>
                          <Label className="text-sm flex items-center justify-between">
                            Line height
                            <div className="flex items-center space-x-1">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => updateSelectedElement({ 
                                  lineHeight: Math.max(0.5, (selectedElement.lineHeight || 1.2) - 0.1) 
                                })}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-xs w-8 text-center">
                                {(selectedElement.lineHeight || 1.2).toFixed(1)}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => updateSelectedElement({ 
                                  lineHeight: Math.min(3, (selectedElement.lineHeight || 1.2) + 0.1) 
                                })}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </Label>
                        </div>

                        {/* Alignment */}
                        <div>
                          <Label className="text-sm mb-2 block">Alignment</Label>
                          <div className="flex space-x-1">
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

                        {/* Blend Mode */}
                        <div>
                          <Label className="text-sm">Blend mode</Label>
                          <Select
                            value={selectedElement.blendMode || 'normal'}
                            onValueChange={(value) => updateSelectedElement({ blendMode: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {blendModes.map((mode) => (
                                <SelectItem key={mode} value={mode}>
                                  {mode}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Tab de Herramientas */}
              <TabsContent value="tools" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-6 pb-4">
                    <div>
                      <h3 className="font-medium mb-3">Herramientas</h3>
                      <div className="space-y-3">
                        {/* Background */}
                        <Button 
                          variant="outline" 
                          className="w-full justify-start h-12"
                          onClick={() => {/* Implementar cambio de fondo */}}
                        >
                          <Image className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Background</p>
                            <p className="text-xs text-gray-500">Cambiar fondo</p>
                          </div>
                        </Button>

                        {/* Stickers */}
                        <div>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start h-12 mb-2"
                          >
                            <Sticker className="w-5 h-5 mr-3" />
                            <div className="text-left">
                              <p className="font-medium">Stickers</p>
                              <p className="text-xs text-gray-500">{stickers.length} disponibles</p>
                            </div>
                          </Button>
                          <div className="grid grid-cols-4 gap-2">
                            {stickers.map((sticker) => (
                              <button
                                key={sticker.id}
                                className="aspect-square border rounded-lg hover:bg-gray-50 flex items-center justify-center text-2xl transition-colors"
                                onClick={() => addStickerElement(sticker)}
                                title={sticker.name}
                              >
                                {sticker.emoji}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Add Logo */}
                        <Button 
                          variant="outline" 
                          className="w-full justify-start h-12"
                          onClick={addImageElement}
                        >
                          <LogIn className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Add logo</p>
                            <p className="text-xs text-gray-500">Subir imagen</p>
                          </div>
                        </Button>

                        {/* Add Text */}
                        <Button 
                          variant="outline" 
                          className="w-full justify-start h-12"
                          onClick={addTextElement}
                        >
                          <Type className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Add text</p>
                            <p className="text-xs text-gray-500">Nuevo elemento</p>
                          </div>
                        </Button>

                        {/* More */}
                        <Button 
                          variant="outline" 
                          className="w-full justify-start h-12"
                        >
                          <MoreHorizontal className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">More</p>
                            <p className="text-xs text-gray-500">Más opciones</p>
                          </div>
                        </Button>
                      </div>
                    </div>

                    {/* Controles del elemento seleccionado */}
                    {selectedElement && (
                      <div className="border-t pt-4 space-y-3">
                        <h4 className="font-medium">Controles del Elemento</h4>
                        
                        {/* Layer ordering */}
                        <div>
                          <Label className="text-sm mb-2 block">Layer ordering</Label>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => moveElementLayer('up')}
                            >
                              Adelante
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => moveElementLayer('down')}
                            >
                              Atrás
                            </Button>
                          </div>
                        </div>

                        {/* Duplicate */}
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={duplicateSelectedElement}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </Button>

                        {/* Delete */}
                        <Button 
                          variant="outline" 
                          className="w-full text-red-600 hover:text-red-700"
                          onClick={deleteSelectedElement}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Tab de Colores - Estilo Paperless Post */}
              <TabsContent value="colors" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-6 pb-4">
                    <div>
                      <h3 className="font-medium mb-3">Paleta de Colores</h3>
                      <div className="grid grid-cols-5 gap-3">
                        {colorPalette.map((color, index) => (
                          <button
                            key={index}
                            className={`aspect-square rounded-full border-2 transition-all hover:scale-110 ${
                              selectedElement?.color === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              if (selectedElement?.type === 'text') {
                                updateSelectedElement({ color });
                              } else if (designData) {
                                // Cambiar color de fondo del canvas
                                const updatedDesignData = {
                                  ...designData.design_data,
                                  canvas: {
                                    ...designData.design_data.canvas,
                                    background_color: color
                                  }
                                };
                                setDesignData(prev => ({
                                  ...prev,
                                  design_data: updatedDesignData
                                }));
                              }
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {selectedElement && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Propiedades del Elemento</h4>
                        
                        {/* Opacity */}
                        <div>
                          <Label className="text-sm">Opacidad</Label>
                          <Slider
                            value={[selectedElement.opacity * 100 || 100]}
                            onValueChange={([value]) => updateSelectedElement({ opacity: value / 100 })}
                            min={0}
                            max={100}
                            step={1}
                            className="mt-2"
                          />
                          <div className="text-xs text-gray-500 mt-1">{Math.round((selectedElement.opacity || 1) * 100)}%</div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Tab de Capas */}
              <TabsContent value="layers" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 pb-4">
                    <h3 className="font-medium">Capas</h3>
                    {designData?.design_data?.elements?.length > 0 ? (
                      <div className="space-y-2">
                        {designData.design_data.elements.map((element, index) => (
                          <div
                            key={element.id}
                            className={`p-3 border rounded cursor-pointer transition-colors ${
                              selectedElement?.id === element.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedElement(element)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {element.type === 'text' ? (
                                  <Type className="w-4 h-4" />
                                ) : element.type === 'sticker' ? (
                                  <Sticker className="w-4 h-4" />
                                ) : (
                                  <Image className="w-4 h-4" />
                                )}
                                <span className="text-sm font-medium">
                                  {element.type === 'text' 
                                    ? element.content.substring(0, 20) + (element.content.length > 20 ? '...' : '')
                                    : element.type === 'sticker'
                                    ? element.name
                                    : 'Imagen'
                                  }
                                </span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {element.type}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        <Layers className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No hay elementos en el diseño</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Área del canvas */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar del canvas */}
          <div className="bg-white border-b border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setCanvasZoom(Math.max(25, canvasZoom - 25))}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium w-16 text-center">{canvasZoom}%</span>
                <Button variant="outline" size="sm" onClick={() => setCanvasZoom(Math.min(200, canvasZoom + 25))}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCanvasZoom(100)}>
                  Ajustar
                </Button>
              </div>

              {selectedElement && (
                <div className="flex items-center space-x-2">
                  <Textarea
                    value={selectedElement.type === 'text' ? selectedElement.content : ''}
                    onChange={(e) => selectedElement.type === 'text' && updateSelectedElement({ content: e.target.value })}
                    className="w-64 h-8 resize-none"
                    placeholder="Editar texto..."
                  />
                </div>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-8 overflow-auto bg-gray-100">
            <div className="flex items-center justify-center min-h-full">
              {renderCanvas()}
            </div>
          </div>
        </div>
      </div>

      {/* Input oculto para subir archivos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default InvitationEditor;
