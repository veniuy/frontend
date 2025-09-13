import { useState, useCallback, useRef } from 'react';

export function useDesigner() {
  const [layers, setLayers] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);
  const [isDirty, setIsDirty] = useState(false);
  
  const nextLayerId = useRef(1);

  // Función para agregar al historial
  const addToHistory = useCallback((newLayers) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLayers)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setIsDirty(true);
  }, [history, historyIndex]);

  // Agregar nueva capa
  const addLayer = useCallback((layerData) => {
    const newLayer = {
      id: nextLayerId.current++,
      name: layerData.name || `Capa ${nextLayerId.current - 1}`,
      type: layerData.type || 'text',
      visible: true,
      locked: false,
      props: {
        x: 100,
        y: 100,
        width: 200,
        height: 50,
        ...layerData.props
      }
    };

    const newLayers = [...layers, newLayer];
    setLayers(newLayers);
    setSelectedLayer(newLayer);
    addToHistory(newLayers);
  }, [layers, addToHistory]);

  // Actualizar capa
  const updateLayer = useCallback((layerId, updates) => {
    const newLayers = layers.map(layer => 
      layer.id === layerId 
        ? { ...layer, ...updates }
        : layer
    );
    
    setLayers(newLayers);
    
    // Actualizar capa seleccionada si es la que se está editando
    if (selectedLayer?.id === layerId) {
      setSelectedLayer({ ...selectedLayer, ...updates });
    }
    
    addToHistory(newLayers);
  }, [layers, selectedLayer, addToHistory]);

  // Eliminar capa
  const deleteLayer = useCallback((layerId) => {
    const newLayers = layers.filter(layer => layer.id !== layerId);
    setLayers(newLayers);
    
    // Deseleccionar si era la capa seleccionada
    if (selectedLayer?.id === layerId) {
      setSelectedLayer(null);
    }
    
    addToHistory(newLayers);
  }, [layers, selectedLayer, addToHistory]);

  // Seleccionar capa
  const selectLayer = useCallback((layerId) => {
    const layer = layers.find(l => l.id === layerId);
    setSelectedLayer(layer || null);
  }, [layers]);

  // Duplicar capa
  const duplicateLayer = useCallback((layerId) => {
    const layer = layers.find(l => l.id === layerId);
    if (!layer) return;

    const newLayer = {
      ...layer,
      id: nextLayerId.current++,
      name: `${layer.name} (copia)`,
      props: {
        ...layer.props,
        x: layer.props.x + 20,
        y: layer.props.y + 20
      }
    };

    const newLayers = [...layers, newLayer];
    setLayers(newLayers);
    setSelectedLayer(newLayer);
    addToHistory(newLayers);
  }, [layers, addToHistory]);

  // Alternar bloqueo de capa
  const toggleLayerLock = useCallback((layerId) => {
    updateLayer(layerId, { locked: !layers.find(l => l.id === layerId)?.locked });
  }, [layers, updateLayer]);

  // Mover capa en el orden Z
  const moveLayer = useCallback((layerId, direction) => {
    const currentIndex = layers.findIndex(l => l.id === layerId);
    if (currentIndex === -1) return;

    const newLayers = [...layers];
    const targetIndex = direction === 'up' ? currentIndex + 1 : currentIndex - 1;
    
    if (targetIndex >= 0 && targetIndex < newLayers.length) {
      [newLayers[currentIndex], newLayers[targetIndex]] = [newLayers[targetIndex], newLayers[currentIndex]];
      setLayers(newLayers);
      addToHistory(newLayers);
    }
  }, [layers, addToHistory]);

  // Deshacer
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousState = history[newIndex];
      setLayers(previousState);
      setHistoryIndex(newIndex);
      
      // Actualizar capa seleccionada si existe en el estado anterior
      if (selectedLayer) {
        const updatedSelectedLayer = previousState.find(l => l.id === selectedLayer.id);
        setSelectedLayer(updatedSelectedLayer || null);
      }
    }
  }, [history, historyIndex, selectedLayer]);

  // Rehacer
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextState = history[newIndex];
      setLayers(nextState);
      setHistoryIndex(newIndex);
      
      // Actualizar capa seleccionada si existe en el estado siguiente
      if (selectedLayer) {
        const updatedSelectedLayer = nextState.find(l => l.id === selectedLayer.id);
        setSelectedLayer(updatedSelectedLayer || null);
      }
    }
  }, [history, historyIndex, selectedLayer]);

  // Guardar diseño
  const saveDesign = useCallback(async () => {
    try {
      // Aquí implementarías la lógica para guardar en el backend
      const designData = {
        layers,
        zoom,
        updatedAt: new Date().toISOString()
      };
      
      // Simular guardado
      console.log('Guardando diseño:', designData);
      
      // En modo desarrollo, guardar en localStorage
      if (import.meta.env.VITE_DEV_MODE === 'true') {
        localStorage.setItem('currentDesign', JSON.stringify(designData));
      }
      
      setIsDirty(false);
      return designData;
    } catch (error) {
      console.error('Error al guardar diseño:', error);
      throw error;
    }
  }, [layers, zoom]);

  // Exportar diseño
  const exportDesign = useCallback(async (format = 'png') => {
    try {
      // Aquí implementarías la lógica para exportar el canvas
      console.log(`Exportando diseño como ${format}`);
      
      // Simular exportación
      const exportData = {
        format,
        layers,
        zoom,
        exportedAt: new Date().toISOString()
      };
      
      return exportData;
    } catch (error) {
      console.error('Error al exportar diseño:', error);
      throw error;
    }
  }, [layers, zoom]);

  // Cargar diseño
  const loadDesign = useCallback((designData) => {
    if (designData.layers) {
      setLayers(designData.layers);
      setHistory([designData.layers]);
      setHistoryIndex(0);
      setSelectedLayer(null);
      setZoom(designData.zoom || 1);
      setIsDirty(false);
      
      // Actualizar el contador de IDs
      const maxId = Math.max(0, ...designData.layers.map(l => l.id));
      nextLayerId.current = maxId + 1;
    }
  }, []);

  // Limpiar diseño
  const clearDesign = useCallback(() => {
    setLayers([]);
    setSelectedLayer(null);
    setHistory([[]]);
    setHistoryIndex(0);
    setZoom(1);
    setIsDirty(false);
    nextLayerId.current = 1;
  }, []);

  return {
    // Estado
    layers,
    selectedLayer,
    zoom,
    isDirty,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    
    // Acciones de capas
    addLayer,
    updateLayer,
    deleteLayer,
    selectLayer,
    duplicateLayer,
    toggleLayerLock,
    moveLayer,
    
    // Acciones de historial
    undo,
    redo,
    
    // Acciones de vista
    setZoom,
    
    // Acciones de diseño
    saveDesign,
    exportDesign,
    loadDesign,
    clearDesign
  };
}
