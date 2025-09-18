// src/config/mobileConfig.js

/**
 * Configuración central para optimizaciones móviles
 * Permite activar/desactivar features según necesidades
 */

export const MOBILE_CONFIG = {
  // Features principales
  features: {
    touchGestures: true,
    virtualKeyboard: true,
    deviceDetection: true,
    performanceOptimizations: true,
    accessibilityEnhancements: true
  },

  // Configuración de breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
  },

  // Configuración de touch
  touch: {
    minTargetSize: 44, // px
    tapHighlightColor: 'transparent',
    enableSwipe: true,
    enablePinch: true,
    swipeThreshold: 50, // px
    pinchThreshold: 0.1 // scale
  },

  // Configuración de texto editable
  editableText: {
    debounceMs: 300,
    preventZoomFontSize: 16, // px
    autoScroll: true,
    selectAllOnFocus: true
  },

  // Configuración de teclado virtual
  virtualKeyboard: {
    enabled: true,
    autoAdjustLayout: true,
    scrollToFocus: true,
    keyboardThreshold: 150 // px
  },

  // Configuración de rendimiento
  performance: {
    enableLazyLoading: true,
    enableThrottling: true,
    throttleDelay: 100, // ms
    enableHardwareAcceleration: true,
    enableWillChange: true
  },

  // Configuración de accesibilidad
  accessibility: {
    respectReducedMotion: true,
    enableHighContrast: true,
    enableDarkMode: true,
    minContrastRatio: 4.5
  },

  // Configuración de zoom
  zoom: {
    enabled: true,
    min: 50,
    max: 200,
    step: 10,
    defaultMobile: 80,
    defaultTablet: 90,
    defaultDesktop: 100
  },

  // Configuración de animaciones
  animations: {
    enabled: true,
    duration: 300, // ms
    easing: 'ease-out',
    enableHoverOnTouch: false
  }
};

/**
 * Obtener configuración específica para dispositivo actual
 */
export const getDeviceConfig = () => {
  const width = window.innerWidth;
  const isMobile = width < MOBILE_CONFIG.breakpoints.mobile;
  const isTablet = width >= MOBILE_CONFIG.breakpoints.mobile && width < MOBILE_CONFIG.breakpoints.tablet;
  const isDesktop = width >= MOBILE_CONFIG.breakpoints.desktop;

  return {
    ...MOBILE_CONFIG,
    deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    isMobile,
    isTablet,
    isDesktop,
    defaultZoom: isMobile ? MOBILE_CONFIG.zoom.defaultMobile : 
                 isTablet ? MOBILE_CONFIG.zoom.defaultTablet : 
                 MOBILE_CONFIG.zoom.defaultDesktop
  };
};

/**
 * Aplicar configuraciones CSS dinámicamente
 */
export const applyMobileStyles = (config = MOBILE_CONFIG) => {
  const root = document.documentElement;
  
  // Variables CSS
  root.style.setProperty('--mobile-breakpoint', `${config.breakpoints.mobile}px`);
  root.style.setProperty('--tablet-breakpoint', `${config.breakpoints.tablet}px`);
  root.style.setProperty('--desktop-breakpoint', `${config.breakpoints.desktop}px`);
  root.style.setProperty('--touch-target-size', `${config.touch.minTargetSize}px`);
  root.style.setProperty('--animation-duration', `${config.animations.duration}ms`);
  root.style.setProperty('--animation-easing', config.animations.easing);

  // Clases condicionales
  document.body.classList.toggle('touch-enabled', config.features.touchGestures);
  document.body.classList.toggle('keyboard-handling', config.features.virtualKeyboard);
  document.body.classList.toggle('performance-optimized', config.features.performanceOptimizations);
};

/**
 * Detectar capacidades del dispositivo
 */
export const detectDeviceCapabilities = () => {
  return {
    // Touch support
    hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    
    // Device type
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    isAndroid: /Android/.test(navigator.userAgent),
    
    // Browser capabilities
    supportsPassiveEvents: (() => {
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, 'passive', {
          get() { supportsPassive = true; }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
      } catch (e) {}
      return supportsPassive;
    })(),
    
    // Performance features
    supportsIntersectionObserver: 'IntersectionObserver' in window,
    supportsResizeObserver: 'ResizeObserver' in window,
    supportsWebGL: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch (e) {
        return false;
      }
    })(),
    
    // Media queries
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
    
    // Network
    connectionType: navigator.connection?.effectiveType || 'unknown',
    isSlowConnection: navigator.connection?.effectiveType === 'slow-2g' || 
                      navigator.connection?.effectiveType === '2g',
    
    // Hardware
    deviceMemory: navigator.deviceMemory || 4,
    hardwareConcurrency: navigator.hardwareConcurrency || 4
  };
};

/**
 * Configuración adaptativa basada en capacidades del dispositivo
 */
export const getAdaptiveConfig = () => {
  const capabilities = detectDeviceCapabilities();
  const baseConfig = { ...MOBILE_CONFIG };

  // Ajustar según memoria del dispositivo
  if (capabilities.deviceMemory < 4) {
    baseConfig.performance.enableLazyLoading = true;
    baseConfig.performance.throttleDelay = 200;
    baseConfig.animations.duration = 200;
  }

  // Ajustar según conexión
  if (capabilities.isSlowConnection) {
    baseConfig.performance.enableLazyLoading = true;
    baseConfig.animations.enabled = false;
  }

  // Ajustar según preferencias de accesibilidad
  if (capabilities.prefersReducedMotion) {
    baseConfig.animations.enabled = false;
    baseConfig.animations.duration = 0;
  }

  // Ajustar para dispositivos iOS
  if (capabilities.isIOS) {
    baseConfig.editableText.preventZoomFontSize = 16;
    baseConfig.touch.enableSwipe = true;
  }

  return { ...baseConfig, capabilities };
};

/**
 * Hook para usar la configuración móvil
 */
export const useMobileConfig = () => {
  const [config, setConfig] = React.useState(() => getAdaptiveConfig());

  React.useEffect(() => {
    // Aplicar estilos iniciales
    applyMobileStyles(config);

    // Listener para cambios de tamaño
    const handleResize = () => {
      const newConfig = getAdaptiveConfig();
      setConfig(newConfig);
      applyMobileStyles(newConfig);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return config;
};

/**
 * Utilidades para debug en desarrollo
 */
export const DEBUG_UTILS = {
  // Mostrar información del dispositivo en consola
  logDeviceInfo: () => {
    const capabilities = detectDeviceCapabilities();
    const config = getDeviceConfig();
    
    console.group('📱 Mobile Device Information');
    console.log('Device Type:', config.deviceType);
    console.log('Screen Size:', `${window.innerWidth}x${window.innerHeight}`);
    console.log('Touch Support:', capabilities.hasTouch);
    console.log('Platform:', capabilities.isIOS ? 'iOS' : capabilities.isAndroid ? 'Android' : 'Other');
    console.log('Connection:', capabilities.connectionType);
    console.log('Memory:', capabilities.deviceMemory, 'GB');
    console.log('Prefers Reduced Motion:', capabilities.prefersReducedMotion);
    console.groupEnd();
  },

  // Overlay de debug visual
  showDebugOverlay: () => {
    const overlay = document.createElement('div');
    overlay.id = 'mobile-debug-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      max-width: 200px;
    `;

    const updateInfo = () => {
      const config = getDeviceConfig();
      overlay.innerHTML = `
        <div>Device: ${config.deviceType}</div>
        <div>Size: ${window.innerWidth}x${window.innerHeight}</div>
        <div>Orientation: ${window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'}</div>
        <div>Zoom: ${config.defaultZoom}%</div>
      `;
    };

    updateInfo();
    window.addEventListener('resize', updateInfo);
    document.body.appendChild(overlay);

    // Remover después de 10 segundos
    setTimeout(() => {
      overlay.remove();
      window.removeEventListener('resize', updateInfo);
    }, 10000);
  }
};

// Exportar configuración por defecto
export default MOBILE_CONFIG;
