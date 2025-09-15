import React, { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Label } from './ui/label'
import { 
  Upload,
  Image as ImageIcon,
  Type,
  Palette,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Download,
  Eye,
  Save
} from 'lucide-react'

export function ProductCustomizer({ product, onSave, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [customText, setCustomText] = useState('')
  const [selectedFont, setSelectedFont] = useState('serif')
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 })
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 })
  const [imageScale, setImageScale] = useState(100)
  const [imageRotation, setImageRotation] = useState(0)
  const fileInputRef = useRef(null)

  const fonts = [
    { id: 'serif', name: 'Elegante (Serif)', family: 'serif' },
    { id: 'sans', name: 'Moderna (Sans-serif)', family: 'sans-serif' },
    { id: 'script', name: 'Caligráfica (Script)', family: 'cursive' },
    { id: 'mono', name: 'Typewriter (Mono)', family: 'monospace' }
  ]

  const colors = [
    { name: 'Negro', value: '#000000' },
    { name: 'Blanco', value: '#FFFFFF' },
    { name: 'Rosa', value: '#EC4899' },
    { name: 'Dorado', value: '#F59E0B' },
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Gris', value: '#6B7280' }
  ]

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    const customization = {
      image: selectedImage,
      text: customText,
      font: selectedFont,
      color: selectedColor,
      textPosition,
      imagePosition,
      imageScale,
      imageRotation
    }
    onSave(customization)
  }

  const resetCustomization = () => {
    setSelectedImage(null)
    setCustomText('')
    setSelectedFont('serif')
    setSelectedColor('#000000')
    setTextPosition({ x: 50, y: 50 })
    setImagePosition({ x: 50, y: 50 })
    setImageScale(100)
    setImageRotation(0)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Personalizar {product?.name}
          </DialogTitle>
          <DialogDescription>
            Personaliza tu producto añadiendo imágenes, texto y ajustando el diseño a tu gusto.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Preview Panel */}
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-100 rounded-lg flex-1 relative overflow-hidden">
              <div className="absolute inset-4 bg-white rounded shadow-lg flex items-center justify-center relative overflow-hidden">
                {/* Background product template */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-100 opacity-30"></div>
                
                {/* User uploaded image */}
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Imagen personalizada"
                    className="absolute max-w-none"
                    style={{
                      left: `${imagePosition.x}%`,
                      top: `${imagePosition.y}%`,
                      transform: `translate(-50%, -50%) scale(${imageScale / 100}) rotate(${imageRotation}deg)`,
                      maxHeight: '60%',
                      maxWidth: '60%'
                    }}
                  />
                )}
                
                {/* Custom text */}
                {customText && (
                  <div
                    className="absolute text-center pointer-events-none"
                    style={{
                      left: `${textPosition.x}%`,
                      top: `${textPosition.y}%`,
                      transform: 'translate(-50%, -50%)',
                      color: selectedColor,
                      fontFamily: fonts.find(f => f.id === selectedFont)?.family,
                      fontSize: '24px',
                      fontWeight: selectedFont === 'serif' ? '400' : '500',
                      textShadow: selectedColor === '#FFFFFF' ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
                    }}
                  >
                    {customText}
                  </div>
                )}
                
                {/* Placeholder when empty */}
                {!selectedImage && !customText && (
                  <div className="text-center text-gray-400">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4" />
                    <p>Vista previa de tu diseño</p>
                    <p className="text-sm">Añade imágenes y texto para ver el resultado</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Preview Controls */}
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm">
                <ZoomOut className="w-4 h-4 mr-2" />
                Alejar
              </Button>
              <Button variant="outline" size="sm">
                <ZoomIn className="w-4 h-4 mr-2" />
                Acercar
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Vista completa
              </Button>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="w-80 flex flex-col">
            <Tabs defaultValue="image" className="flex-1">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="image">Imagen</TabsTrigger>
                <TabsTrigger value="text">Texto</TabsTrigger>
              </TabsList>

              <TabsContent value="image" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Subir imagen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Arrastra una imagen aquí o
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Seleccionar archivo
                      </Button>
                    </div>
                    
                    {selectedImage && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs">Posición horizontal</Label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={imagePosition.x}
                            onChange={(e) => setImagePosition(prev => ({ ...prev, x: parseInt(e.target.value) }))}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs">Posición vertical</Label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={imagePosition.y}
                            onChange={(e) => setImagePosition(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs">Tamaño ({imageScale}%)</Label>
                          <input
                            type="range"
                            min="20"
                            max="200"
                            value={imageScale}
                            onChange={(e) => setImageScale(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs">Rotación ({imageRotation}°)</Label>
                          <input
                            type="range"
                            min="-180"
                            max="180"
                            value={imageRotation}
                            onChange={(e) => setImageRotation(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="text" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Añadir texto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs">Texto personalizado</Label>
                      <Textarea
                        placeholder="Escribe tu mensaje aquí..."
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Fuente</Label>
                      <Select value={selectedFont} onValueChange={setSelectedFont}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fonts.map((font) => (
                            <SelectItem key={font.id} value={font.id}>
                              <span style={{ fontFamily: font.family }}>
                                {font.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Color</Label>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {colors.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setSelectedColor(color.value)}
                            className={`w-8 h-8 rounded border-2 ${
                              selectedColor === color.value ? 'border-gray-900' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {customText && (
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs">Posición horizontal</Label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={textPosition.x}
                            onChange={(e) => setTextPosition(prev => ({ ...prev, x: parseInt(e.target.value) }))}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs">Posición vertical</Label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={textPosition.y}
                            onChange={(e) => setTextPosition(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="border-t pt-4 space-y-2">
              <Button 
                onClick={handleSave}
                className="w-full bg-green-700 hover:bg-green-800 text-white"
                disabled={!selectedImage && !customText}
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar personalización
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={resetCustomization}>
                  Reiniciar
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                Recibirás una vista previa por email antes de la impresión
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
