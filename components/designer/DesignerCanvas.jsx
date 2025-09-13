import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

const DesignerCanvas = ({ 
  layers = [], 
  selectedLayer, 
  zoom = 1, 
  onSelectLayer, 
  onUpdateLayer,
  template 
}) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Dimensiones del canvas basadas en el tamaño de la plantilla
  const canvasSize = {
    A5: { width: 420, height: 594 }, // mm convertido a px aprox
    A4: { width: 594, height: 841 },
    A6: { width: 297, height: 420 }
  };

  const dimensions = canvasSize[template?.size] || canvasSize.A5;
  const scaledWidth = dimensions.width * zoom;
  const scaledHeight = dimensions.height * zoom;

  const handleLayerClick = (e, layer) => {
    e.stopPropagation();
    if (!layer.locked) {
      onSelectLayer(layer.id);
    }
  };

  const handleCanvasClick = (e) => {
    // Si se hace clic en el canvas (no en una capa), deseleccionar
    if (e.target === canvasRef.current) {
      onSelectLayer(null);
    }
  };

  const handleMouseDown = (e, layer) => {
    if (layer.locked) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    onSelectLayer(layer.id);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    
    setDragStart({ x, y });
    setDragOffset({
      x: x - layer.props.x,
      y: y - layer.props.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedLayer || selectedLayer.locked) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    
    const newX = Math.max(0, Math.min(dimensions.width - selectedLayer.props.width, x - dragOffset.x));
    const newY = Math.max(0, Math.min(dimensions.height - selectedLayer.props.height, y - dragOffset.y));
    
    onUpdateLayer(selectedLayer.id, {
      props: {
        ...selectedLayer.props,
        x: newX,
        y: newY
      }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, selectedLayer, dragOffset, zoom]);

  const renderLayer = (layer) => {
    if (!layer.visible) return null;

    const isSelected = selectedLayer?.id === layer.id;
    const style = {
      position: 'absolute',
      left: layer.props.x * zoom,
      top: layer.props.y * zoom,
      width: layer.props.width * zoom,
      height: layer.props.height * zoom,
      cursor: layer.locked ? 'not-allowed' : 'move',
      zIndex: layer.id
    };

    switch (layer.type) {
      case 'background':
        return (
          <div
            key={layer.id}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: layer.props.color || '#ffffff',
              opacity: layer.props.opacity || 1,
              zIndex: 0
            }}
            onClick={(e) => handleLayerClick(e, layer)}
          />
        );

      case 'text':
        return (
          <div
            key={layer.id}
            style={{
              ...style,
              fontSize: (layer.props.fontSize || 16) * zoom,
              fontFamily: layer.props.fontFamily || 'Arial',
              color: layer.props.color || '#000000',
              textAlign: layer.props.textAlign || 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: layer.props.textAlign === 'center' ? 'center' : 
                             layer.props.textAlign === 'right' ? 'flex-end' : 'flex-start',
              lineHeight: layer.props.lineHeight || 1.2,
              fontWeight: layer.props.fontWeight || 'normal',
              fontStyle: layer.props.fontStyle || 'normal',
              textDecoration: layer.props.textDecoration || 'none'
            }}
            className={cn(
              'select-none',
              isSelected && 'ring-2 ring-pink-500 ring-offset-2',
              layer.locked && 'opacity-75'
            )}
            onClick={(e) => handleLayerClick(e, layer)}
            onMouseDown={(e) => handleMouseDown(e, layer)}
          >
            {layer.props.text || 'Texto'}
          </div>
        );

      case 'image':
        return (
          <div
            key={layer.id}
            style={style}
            className={cn(
              'overflow-hidden rounded',
              isSelected && 'ring-2 ring-pink-500 ring-offset-2',
              layer.locked && 'opacity-75'
            )}
            onClick={(e) => handleLayerClick(e, layer)}
            onMouseDown={(e) => handleMouseDown(e, layer)}
          >
            <img
              src={layer.props.src}
              alt={layer.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: layer.props.objectFit || 'cover',
                opacity: layer.props.opacity || 1
              }}
              draggable={false}
            />
          </div>
        );

      case 'shape':
        return (
          <div
            key={layer.id}
            style={{
              ...style,
              backgroundColor: layer.props.fill || '#000000',
              borderRadius: layer.props.borderRadius || 0,
              border: layer.props.border || 'none',
              opacity: layer.props.opacity || 1
            }}
            className={cn(
              isSelected && 'ring-2 ring-pink-500 ring-offset-2',
              layer.locked && 'opacity-75'
            )}
            onClick={(e) => handleLayerClick(e, layer)}
            onMouseDown={(e) => handleMouseDown(e, layer)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 p-8">
      <div
        ref={canvasRef}
        style={{
          width: scaledWidth,
          height: scaledHeight,
          minWidth: scaledWidth,
          minHeight: scaledHeight
        }}
        className="relative bg-white shadow-2xl rounded-lg overflow-hidden"
        onClick={handleCanvasClick}
      >
        {/* Renderizar capas en orden */}
        {layers
          .sort((a, b) => a.id - b.id) // Orden Z basado en ID
          .map(renderLayer)}
        
        {/* Guías de selección */}
        {selectedLayer && !selectedLayer.locked && (
          <>
            {/* Handles de redimensionamiento */}
            <div
              style={{
                position: 'absolute',
                left: selectedLayer.props.x * zoom - 4,
                top: selectedLayer.props.y * zoom - 4,
                width: (selectedLayer.props.width * zoom) + 8,
                height: (selectedLayer.props.height * zoom) + 8,
                border: '2px solid #ec4899',
                borderRadius: '4px',
                pointerEvents: 'none',
                zIndex: 9999
              }}
            >
              {/* Handles de esquinas */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-pink-500 rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-500 rounded-full"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></div>
            </div>
          </>
        )}
        
        {/* Regla/Grid (opcional) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: `${20 * zoom}px ${20 * zoom}px`
          }}
        />
      </div>
    </div>
  );
};

export default DesignerCanvas;
