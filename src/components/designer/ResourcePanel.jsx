import React, { useState } from 'react';
import { 
  Type, 
  Palette, 
  Image, 
  Square, 
  Upload,
  Plus,
  Paintbrush,
  Layers
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

// Fuentes disponibles
const fonts = [
  { name: 'Arial', family: 'Arial, sans-serif' },
  { name: 'Helvetica', family: 'Helvetica, sans-serif' },
  { name: 'Times New Roman', family: 'Times New Roman, serif' },
  { name: 'Georgia', family: 'Georgia, serif' },
  { name: 'Playfair Display', family: 'Playfair Display, serif' },
  { name: 'Lato', family: 'Lato, sans-serif' },
  { name: 'Open Sans', family: 'Open Sans, sans-serif' },
  { name: 'Dancing Script', family: 'Dancing Script, cursive' },
  { name: 'Roboto', family: 'Roboto, sans-serif' },
  { name: 'Montserrat', family: 'Montserrat, sans-serif' }
];

// Paletas de colores predefinidas
const colorPalettes = {
  boda: {
    name: 'Boda Clásica',
    colors: ['#D4AF37', '#FFFFFF', '#F5F5DC', '#8B7355', '#2F4F4F']
  },
  quinceaneras: {
    name: 'Quinceañera',
    colors: ['#FF69B4', '#FFFFFF', '#FFB6C1', '#FF1493', '#DDA0DD']
  },
  infantiles: {
    name: 'Infantil',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']
  },
  bautizo: {
    name: 'Bautizo',
    colors: ['#87CEEB', '#FFFFFF', '#F0F8FF', '#B0E0E6', '#E6F3FF']
  },
  corporativo: {
    name: 'Corporativo',
    colors: ['#2C3E50', '#3498DB', '#FFFFFF', '#34495E', '#5DADE2']
  },
  graduacion: {
    name: 'Graduación',
    colors: ['#8B4513', '#DAA520', '#FFFFFF', '#CD853F', '#F4A460']
  }
};

const TextControls = ({ selectedLayer, onUpdateLayer }) => {
  if (!selectedLayer || selectedLayer.type !== 'text') {
    return (
      <div className="text-center py-8 text-gray-500">
        <Type className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Selecciona una capa de texto</p>
      </div>
    );
  }

  const updateTextProp = (prop, value) => {
    onUpdateLayer(selectedLayer.id, {
      props: {
        ...selectedLayer.props,
        [prop]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Texto */}
      <div>
        <Label htmlFor="text">Texto</Label>
        <Input
          id="text"
          value={selectedLayer.props.text || ''}
          onChange={(e) => updateTextProp('text', e.target.value)}
          placeholder="Escribe tu texto..."
        />
      </div>

      {/* Fuente */}
      <div>
        <Label>Fuente</Label>
        <Select
          value={selectedLayer.props.fontFamily || 'Arial, sans-serif'}
          onValueChange={(value) => updateTextProp('fontFamily', value)}
        >
          <SelectTrigger>
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

      {/* Tamaño de fuente */}
      <div>
        <Label>Tamaño: {selectedLayer.props.fontSize || 16}px</Label>
        <Slider
          value={[selectedLayer.props.fontSize || 16]}
          onValueChange={([value]) => updateTextProp('fontSize', value)}
          min={8}
          max={72}
          step={1}
          className="mt-2"
        />
      </div>

      {/* Color */}
      <div>
        <Label htmlFor="textColor">Color</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input
            id="textColor"
            type="color"
            value={selectedLayer.props.color || '#000000'}
            onChange={(e) => updateTextProp('color', e.target.value)}
            className="w-12 h-8 p-1 border rounded"
          />
          <Input
            value={selectedLayer.props.color || '#000000'}
            onChange={(e) => updateTextProp('color', e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      {/* Alineación */}
      <div>
        <Label>Alineación</Label>
        <div className="flex gap-1 mt-1">
          {['left', 'center', 'right'].map((align) => (
            <Button
              key={align}
              variant={selectedLayer.props.textAlign === align ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateTextProp('textAlign', align)}
              className="flex-1 capitalize"
            >
              {align === 'left' ? 'Izq' : align === 'center' ? 'Centro' : 'Der'}
            </Button>
          ))}
        </div>
      </div>

      {/* Estilo */}
      <div>
        <Label>Estilo</Label>
        <div className="flex gap-1 mt-1">
          <Button
            variant={selectedLayer.props.fontWeight === 'bold' ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateTextProp('fontWeight', 
              selectedLayer.props.fontWeight === 'bold' ? 'normal' : 'bold'
            )}
          >
            <strong>B</strong>
          </Button>
          <Button
            variant={selectedLayer.props.fontStyle === 'italic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateTextProp('fontStyle', 
              selectedLayer.props.fontStyle === 'italic' ? 'normal' : 'italic'
            )}
          >
            <em>I</em>
          </Button>
          <Button
            variant={selectedLayer.props.textDecoration === 'underline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateTextProp('textDecoration', 
              selectedLayer.props.textDecoration === 'underline' ? 'none' : 'underline'
            )}
          >
            <u>U</u>
          </Button>
        </div>
      </div>
    </div>
  );
};

const ColorPalettes = ({ onAddLayer }) => {
  const [selectedPalette, setSelectedPalette] = useState('boda');

  return (
    <div className="space-y-4">
      {/* Selector de paleta */}
      <div>
        <Label>Paleta de Colores</Label>
        <Select value={selectedPalette} onValueChange={setSelectedPalette}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(colorPalettes).map(([key, palette]) => (
              <SelectItem key={key} value={key}>
                {palette.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Colores de la paleta */}
      <div>
        <Label>Colores</Label>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {colorPalettes[selectedPalette].colors.map((color, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg border-2 border-gray-200 cursor-pointer hover:border-pink-500 transition-colors"
              style={{ backgroundColor: color }}
              title={color}
              onClick={() => {
                // Aplicar color al elemento seleccionado o crear nuevo fondo
                console.log('Color seleccionado:', color);
              }}
            />
          ))}
        </div>
      </div>

      {/* Selector de color personalizado */}
      <div>
        <Label>Color Personalizado</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input
            type="color"
            className="w-12 h-8 p-1 border rounded"
          />
          <Input
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

const ImageUpload = ({ onAddLayer }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    
    try {
      // Simular upload
      const reader = new FileReader();
      reader.onload = (e) => {
        onAddLayer({
          type: 'image',
          name: `Imagen: ${file.name}`,
          props: {
            src: e.target.result,
            width: 200,
            height: 150,
            objectFit: 'cover'
          }
        });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload */}
      <div>
        <Label>Subir Imagen</Label>
        <div className="mt-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-colors"
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Haz clic para subir imagen
                </span>
                <span className="text-xs text-gray-500">
                  PNG, JPG, WEBP (máx. 5MB)
                </span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Imágenes predefinidas */}
      <div>
        <Label>Elementos Decorativos</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[
            { name: 'Corazón', emoji: '💖' },
            { name: 'Flores', emoji: '🌸' },
            { name: 'Anillos', emoji: '💍' },
            { name: 'Estrella', emoji: '⭐' },
            { name: 'Corona', emoji: '👑' },
            { name: 'Mariposa', emoji: '🦋' }
          ].map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="aspect-square text-2xl"
              onClick={() => onAddLayer({
                type: 'text',
                name: item.name,
                props: {
                  text: item.emoji,
                  fontSize: 32,
                  width: 50,
                  height: 50
                }
              })}
            >
              {item.emoji}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AddElements = ({ onAddLayer }) => {
  const elements = [
    {
      type: 'text',
      name: 'Texto',
      icon: Type,
      props: {
        text: 'Nuevo texto',
        fontSize: 16,
        color: '#000000',
        width: 200,
        height: 30
      }
    },
    {
      type: 'shape',
      name: 'Rectángulo',
      icon: Square,
      props: {
        fill: '#000000',
        width: 100,
        height: 100,
        borderRadius: 0
      }
    },
    {
      type: 'shape',
      name: 'Círculo',
      icon: Square,
      props: {
        fill: '#000000',
        width: 100,
        height: 100,
        borderRadius: 50
      }
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <Label>Agregar Elementos</Label>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {elements.map((element, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start"
              onClick={() => onAddLayer(element)}
            >
              <element.icon className="h-4 w-4 mr-2" />
              {element.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResourcePanel = ({ selectedLayer, onUpdateLayer, onAddLayer }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Paintbrush className="h-5 w-5" />
          Recursos
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <Tabs defaultValue="text" className="h-full flex flex-col">
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="text" className="text-xs">
                <Type className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="colors" className="text-xs">
                <Palette className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="images" className="text-xs">
                <Image className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="elements" className="text-xs">
                <Plus className="h-3 w-3" />
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 px-4 pb-4 overflow-y-auto">
            <TabsContent value="text" className="mt-4">
              <TextControls 
                selectedLayer={selectedLayer} 
                onUpdateLayer={onUpdateLayer} 
              />
            </TabsContent>
            
            <TabsContent value="colors" className="mt-4">
              <ColorPalettes onAddLayer={onAddLayer} />
            </TabsContent>
            
            <TabsContent value="images" className="mt-4">
              <ImageUpload onAddLayer={onAddLayer} />
            </TabsContent>
            
            <TabsContent value="elements" className="mt-4">
              <AddElements onAddLayer={onAddLayer} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResourcePanel;
