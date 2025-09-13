import React from 'react';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Copy, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  Type,
  Image,
  Square,
  Layers
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

const LayerIcon = ({ type }) => {
  const icons = {
    text: Type,
    image: Image,
    shape: Square,
    background: Layers
  };
  
  const Icon = icons[type] || Layers;
  return <Icon className="h-4 w-4" />;
};

const LayerItem = ({ 
  layer, 
  isSelected, 
  onSelect, 
  onToggleVisibility, 
  onToggleLock, 
  onDuplicate, 
  onDelete, 
  onMoveUp, 
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  return (
    <div
      className={cn(
        'group flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all',
        isSelected 
          ? 'bg-pink-50 border-pink-200 shadow-sm' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
      )}
      onClick={() => onSelect(layer.id)}
    >
      {/* Icono del tipo de capa */}
      <div className={cn(
        'flex items-center justify-center w-8 h-8 rounded-md',
        isSelected ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
      )}>
        <LayerIcon type={layer.type} />
      </div>
      
      {/* Información de la capa */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-medium text-sm truncate',
            isSelected ? 'text-pink-900' : 'text-gray-900'
          )}>
            {layer.name}
          </span>
          <Badge variant="secondary" className="text-xs capitalize">
            {layer.type}
          </Badge>
        </div>
        
        {/* Propiedades específicas del tipo */}
        <div className="text-xs text-gray-500 mt-1">
          {layer.type === 'text' && layer.props.text && (
            <span className="truncate">"{layer.props.text}"</span>
          )}
          {layer.type === 'background' && (
            <span>Fondo: {layer.props.color || '#ffffff'}</span>
          )}
          {layer.type === 'image' && (
            <span>Imagen</span>
          )}
          {layer.type === 'shape' && (
            <span>Forma: {layer.props.fill || '#000000'}</span>
          )}
        </div>
      </div>
      
      {/* Controles de capa */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Orden Z */}
        <div className="flex flex-col">
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp(layer.id);
            }}
            disabled={!canMoveUp}
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown(layer.id);
            }}
            disabled={!canMoveDown}
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Visibilidad */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility(layer.id);
          }}
        >
          {layer.visible ? (
            <Eye className="h-3 w-3" />
          ) : (
            <EyeOff className="h-3 w-3 text-gray-400" />
          )}
        </Button>
        
        {/* Bloqueo */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock(layer.id);
          }}
        >
          {layer.locked ? (
            <Lock className="h-3 w-3 text-orange-500" />
          ) : (
            <Unlock className="h-3 w-3" />
          )}
        </Button>
        
        {/* Duplicar */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate(layer.id);
          }}
        >
          <Copy className="h-3 w-3" />
        </Button>
        
        {/* Eliminar */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(layer.id);
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

const LayersPanel = ({ 
  layers = [], 
  selectedLayer, 
  onSelectLayer, 
  onUpdateLayer,
  onDeleteLayer, 
  onDuplicateLayer, 
  onToggleLock, 
  onMoveLayer 
}) => {
  const handleToggleVisibility = (layerId) => {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
      onUpdateLayer(layerId, { visible: !layer.visible });
    }
  };

  const handleToggleLock = (layerId) => {
    onToggleLock(layerId);
  };

  const handleMoveUp = (layerId) => {
    onMoveLayer(layerId, 'up');
  };

  const handleMoveDown = (layerId) => {
    onMoveLayer(layerId, 'down');
  };

  // Ordenar capas por ID (orden Z)
  const sortedLayers = [...layers].sort((a, b) => b.id - a.id); // Mostrar las más recientes arriba

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Layers className="h-5 w-5" />
          Capas
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <div className="px-4 pb-4">
          <div className="text-sm text-gray-600 mb-3">
            {layers.length} {layers.length === 1 ? 'capa' : 'capas'}
          </div>
          
          {layers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Layers className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No hay capas</p>
              <p className="text-xs mt-1">
                Agrega elementos desde el panel de recursos
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {sortedLayers.map((layer, index) => (
                <LayerItem
                  key={layer.id}
                  layer={layer}
                  isSelected={selectedLayer?.id === layer.id}
                  onSelect={onSelectLayer}
                  onToggleVisibility={handleToggleVisibility}
                  onToggleLock={handleToggleLock}
                  onDuplicate={onDuplicateLayer}
                  onDelete={onDeleteLayer}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  canMoveUp={index > 0}
                  canMoveDown={index < sortedLayers.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LayersPanel;
