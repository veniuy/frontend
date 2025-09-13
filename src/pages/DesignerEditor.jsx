import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  Eye, 
  Download, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Copy,
  Trash2,
  Lock,
  Unlock,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import DesignerCanvas from '../components/designer/DesignerCanvas';
import LayersPanel from '../components/designer/LayersPanel';
import ResourcePanel from '../components/designer/ResourcePanel';
import { useDesigner } from '../hooks/useDesigner';

export default function DesignerEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const {
    layers,
    selectedLayer,
    canUndo,
    canRedo,
    zoom,
    addLayer,
    updateLayer,
    deleteLayer,
    selectLayer,
    duplicateLayer,
    toggleLayerLock,
    moveLayer,
    undo,
    redo,
    setZoom,
    saveDesign,
    exportDesign
  } = useDesigner();

  useEffect(() => {
    // Simular carga de plantilla
    const templateId = parseInt(id);
    // Aquí cargarías la plantilla desde la API
    const mockTemplate = {
      id: templateId,
      name: 'Elegancia Dorada',
      size: 'A5',
      layers: [
        {
          id: 1,
          type: 'background',
          name: 'Fondo',
          visible: true,
          locked: false,
          props: {
            color: '#D4AF37',
            opacity: 1
          }
        },
        {
          id: 2,
          type: 'text',
          name: 'Título Principal',
          visible: true,
          locked: false,
          props: {
            text: 'Nos Casamos',
            fontSize: 32,
            fontFamily: 'Playfair Display',
            color: '#FFFFFF',
            x: 150,
            y: 50,
            width: 200,
            height: 50,
            textAlign: 'center'
          }
        },
        {
          id: 3,
          type: 'text',
          name: 'Nombres',
          visible: true,
          locked: false,
          props: {
            text: 'María & Juan',
            fontSize: 24,
            fontFamily: 'Lato',
            color: '#FFFFFF',
            x: 150,
            y: 120,
            width: 200,
            height: 40,
            textAlign: 'center'
          }
        }
      ]
    };
    
    setTemplate(mockTemplate);
    setLoading(false);
  }, [id]);

  const handleSave = async () => {
    try {
      await saveDesign();
      // Mostrar notificación de éxito
      console.log('Diseño guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };

  const handlePreview = () => {
    navigate(`/preview/${id}`);
  };

  const handleExport = async (format = 'png') => {
    try {
      await exportDesign(format);
      console.log(`Diseño exportado como ${format}`);
    } catch (error) {
      console.error('Error al exportar:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Toolbar superior */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="font-semibold text-lg">{template?.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Controles de historial */}
            <Button 
              variant="ghost" 
              size="sm" 
              disabled={!canUndo}
              onClick={undo}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              disabled={!canRedo}
              onClick={redo}
            >
              <Redo className="h-4 w-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            {/* Controles de zoom */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setZoom(Math.min(3, zoom + 0.25))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            {/* Acciones principales */}
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa
            </Button>
            <Button size="sm" onClick={() => handleExport('png')}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Área principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panel de capas (izquierda) */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <LayersPanel
            layers={layers}
            selectedLayer={selectedLayer}
            onSelectLayer={selectLayer}
            onUpdateLayer={updateLayer}
            onDeleteLayer={deleteLayer}
            onDuplicateLayer={duplicateLayer}
            onToggleLock={toggleLayerLock}
            onMoveLayer={moveLayer}
          />
        </div>

        {/* Canvas central */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <DesignerCanvas
            layers={layers}
            selectedLayer={selectedLayer}
            zoom={zoom}
            onSelectLayer={selectLayer}
            onUpdateLayer={updateLayer}
            template={template}
          />
        </div>

        {/* Panel de recursos (derecha) */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <ResourcePanel
            selectedLayer={selectedLayer}
            onUpdateLayer={updateLayer}
            onAddLayer={addLayer}
          />
        </div>
      </div>

      {/* Toolbar inferior con controles de capa seleccionada */}
      {selectedLayer && (
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {selectedLayer.name}
              </span>
              <Badge variant="secondary" className="text-xs">
                {selectedLayer.type}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => duplicateLayer(selectedLayer.id)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleLayerLock(selectedLayer.id)}
              >
                {selectedLayer.locked ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <Unlock className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => deleteLayer(selectedLayer.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
