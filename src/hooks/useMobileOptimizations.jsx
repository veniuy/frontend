// src/hooks/useMobileOptimizations.js
import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook para gestionar optimizaciones móviles
 */
export const useMobileOptimizations = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [orientation, setOrientation] = useState('portrait');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const previousViewportHeight = useRef(window.innerHeight);

  useEffect(() => {
    // Detección de teclado virtual en móviles
    const detectKeyboard = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = previousViewportHeight.current - currentHeight;
      
      // Si la altura se reduce significativamente, probablemente se abrió el teclado
      if (heightDifference > 150) {
        setKeyboardVisible(true);
      } else if (heightDifference < -50) {
        setKeyboardVisible(false);
      }
      
      previousViewportHeight.current = currentHeight;
    };

    // Detección de cambio de orientación
    const handleOrientationChange = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    // Detección de visibilidad de la página
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    window.addEventListener('resize', detectKeyboard);
    window.addEventListener('orientationchange', handleOrientationChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', detectKeyboard);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return {
    isVisible,
    orientation,
    keyboardVisible
  };
};

/**
 * Hook para gestionar el rendimiento con throttling de eventos
 */
export const useThrottledCallback = (callback, delay) => {
  const lastCall = useRef(0);
  
  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
};

/**
 * Hook para lazy loading de imágenes
 */
export const useLazyImage = (src, placeholder = '') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.onload = () => {
            setImageSrc(src);
            setLoading(false);
          };
          img.onerror = () => {
            setError(true);
            setLoading(false);
          };
          img.src = src;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return { imageSrc, loading, error, imgRef };
};

/**
 * Hook para manejar el estado del viewport móvil
 */
export const useViewportSize = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    const throttledUpdate = useThrottledCallback(updateViewport, 100);
    
    window.addEventListener('resize', throttledUpdate);
    window.addEventListener('orientationchange', throttledUpdate);

    return () => {
      window.removeEventListener('resize', throttledUpdate);
      window.removeEventListener('orientationchange', throttledUpdate);
    };
  }, []);

  return viewport;
};

/**
 * Hook para prevenir el zoom en iOS durante la edición
 */
export const usePreventZoom = () => {
  const preventZoom = useCallback((element) => {
    if (!element || !/iPad|iPhone|iPod/.test(navigator.userAgent)) return;

    const originalFontSize = element.style.fontSize;
    
    const handleFocus = () => {
      // Aumentar temporalmente el tamaño de fuente para prevenir zoom
      if (parseFloat(getComputedStyle(element).fontSize) < 16) {
        element.style.fontSize = '16px';
      }
    };

    const handleBlur = () => {
      // Restaurar el tamaño original
      element.style.fontSize = originalFontSize;
    };

    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, []);

  return preventZoom;
};

/**
 * Hook para manejar swipe gestures
 */
export const useSwipeGesture = (onSwipe, threshold = 50) => {
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const handleTouchStart = useCallback((e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStart.current) return;

    touchEnd.current = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const deltaX = touchStart.current.x - touchEnd.current.x;
    const deltaY = touchStart.current.y - touchEnd.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determinar dirección del swipe
    if (Math.max(absDeltaX, absDeltaY) > threshold) {
      if (absDeltaX > absDeltaY) {
        // Swipe horizontal
        onSwipe(deltaX > 0 ? 'left' : 'right', { deltaX, deltaY });
      } else {
        // Swipe vertical
        onSwipe(deltaY > 0 ? 'up' : 'down', { deltaX, deltaY });
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  }, [onSwipe, threshold]);

  return { handleTouchStart, handleTouchEnd };
};

/**
 * Hook para manejar el rendimiento de animaciones
 */
export const useOptimizedAnimation = (shouldAnimate = true) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Respetar preferencias de accesibilidad
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animate = shouldAnimate && !reducedMotion;

  return {
    animate,
    reducedMotion,
    duration: animate ? 'duration-300' : 'duration-0',
    transition: animate ? 'transition-all' : ''
  };
};
