// src/components/VirtualKeyboardHandler.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useMobileOptimizations } from '../hooks/useMobileOptimizations';

/**
 * Componente para manejar el teclado virtual en dispositivos móviles
 * Proporciona contexto y utilidades para ajustar la UI cuando aparece el teclado
 */
const VirtualKeyboardHandler = ({ children, onKeyboardToggle }) => {
  const { keyboardVisible, orientation } = useMobileOptimizations();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [focusedElement, setFocusedElement] = useState(null);

  // Detectar cambios en la altura del viewport para estimar la altura del teclado
  useEffect(() => {
    const initialHeight = window.innerHeight;
    
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = initialHeight - currentHeight;
      
      if (heightDifference > 150) {
        // Probablemente el teclado está visible
        setKeyboardHeight(heightDifference);
        setViewportHeight(currentHeight);
      } else {
        // El teclado probablemente está oculto
        setKeyboardHeight(0);
        setViewportHeight(initialHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Callback para cuando el teclado cambia de estado
  useEffect(() => {
    if (onKeyboardToggle) {
      onKeyboardToggle(keyboardVisible, keyboardHeight);
    }
  }, [keyboardVisible, keyboardHeight, onKeyboardToggle]);

  // Manejar focus en elementos de entrada
  const handleFocus = useCallback((event) => {
    const target = event.target;
    
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
      setFocusedElement(target);
      
      // Scroll suave hacia el elemento focused en móviles
      if (window.innerWidth < 768) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        }, 300); // Delay para que el teclado se anime
      }
    }
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedElement(null);
  }, []);

  // Agregar event listeners para focus/blur
  useEffect(() => {
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, [handleFocus, handleBlur]);

  // Aplicar clases CSS basadas en el estado del teclado
  useEffect(() => {
    const body = document.body;
    
    if (keyboardVisible) {
      body.classList.add('keyboard-visible');
      body.style.setProperty('--keyboard-height', `${keyboardHeight}px`);
      body.style.setProperty('--viewport-height', `${viewportHeight}px`);
    } else {
      body.classList.remove('keyboard-visible');
      body.style.removeProperty('--keyboard-height');
      body.style.removeProperty('--viewport-height');
    }

    return () => {
      body.classList.remove('keyboard-visible');
      body.style.removeProperty('--keyboard-height');
      body.style.removeProperty('--viewport-height');
    };
  }, [keyboardVisible, keyboardHeight, viewportHeight]);

  // Aplicar optimizaciones específicas para elementos focused
  useEffect(() => {
    if (focusedElement) {
      focusedElement.classList.add('input-focused');
      
      // Prevenir zoom en iOS
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const originalFontSize = focusedElement.style.fontSize;
        const computedFontSize = window.getComputedStyle(focusedElement).fontSize;
        
        if (parseFloat(computedFontSize) < 16) {
          focusedElement.style.fontSize = '16px';
          
          // Restaurar cuando pierde el focus
          const restoreFontSize = () => {
            focusedElement.style.fontSize = originalFontSize;
            focusedElement.removeEventListener('blur', restoreFontSize);
          };
          
          focusedElement.addEventListener('blur', restoreFontSize);
        }
      }
    }

    return () => {
      if (focusedElement) {
        focusedElement.classList.remove('input-focused');
      }
    };
  }, [focusedElement]);

  // Proporcionar contexto a los componentes hijos
  const contextValue = {
    keyboardVisible,
    keyboardHeight,
    viewportHeight,
    focusedElement,
    orientation,
    isMobile: window.innerWidth < 768
  };

  return (
    <VirtualKeyboardContext.Provider value={contextValue}>
      <div 
        className={`virtual-keyboard-handler ${keyboardVisible ? 'keyboard-visible' : ''}`}
        style={{
          '--keyboard-height': `${keyboardHeight}px`,
          '--viewport-height': `${viewportHeight}px`
        }}
      >
        {children}
      </div>
    </VirtualKeyboardContext.Provider>
  );
};

// Contexto para acceder al estado del teclado virtual desde cualquier componente
const VirtualKeyboardContext = React.createContext({
  keyboardVisible: false,
  keyboardHeight: 0,
  viewportHeight: window.innerHeight,
  focusedElement: null,
  orientation: 'portrait',
  isMobile: false
});

// Hook para usar el contexto del teclado virtual
export const useVirtualKeyboard = () => {
  const context = React.useContext(VirtualKeyboardContext);
  
  if (!context) {
    throw new Error('useVirtualKeyboard must be used within a VirtualKeyboardHandler');
  }
  
  return context;
};

// Componente de utilidad para ajustar elementos cuando el teclado está visible
export const KeyboardAwareView = ({ 
  children, 
  className = '', 
  adjustHeight = true,
  scrollToFocus = true 
}) => {
  const { keyboardVisible, keyboardHeight, viewportHeight } = useVirtualKeyboard();

  const styles = adjustHeight && keyboardVisible ? {
    height: `${viewportHeight}px`,
    maxHeight: `${viewportHeight}px`,
    overflow: 'auto'
  } : {};

  return (
    <div 
      className={`keyboard-aware-view ${className} ${keyboardVisible ? 'keyboard-visible' : ''}`}
      style={styles}
    >
      {children}
    </div>
  );
};

// Hook para ajustar automáticamente elementos cuando el teclado está visible
export const useKeyboardAwareHeight = (element = 'auto') => {
  const { keyboardVisible, keyboardHeight, viewportHeight } = useVirtualKeyboard();
  
  return keyboardVisible ? {
    height: element === 'viewport' ? `${viewportHeight}px` : 'auto',
    maxHeight: `${viewportHeight}px`,
    overflow: 'auto'
  } : {};
};

// Utility para hacer scroll suave a un elemento cuando el teclado está visible
export const useScrollToElement = () => {
  const { keyboardVisible } = useVirtualKeyboard();
  
  return useCallback((element, options = {}) => {
    if (!element || !keyboardVisible) return;
    
    const defaultOptions = {
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
      ...options
    };
    
    // Delay para permitir que el teclado se anime
    setTimeout(() => {
      element.scrollIntoView(defaultOptions);
    }, 300);
  }, [keyboardVisible]);
};

export default VirtualKeyboardHandler;
