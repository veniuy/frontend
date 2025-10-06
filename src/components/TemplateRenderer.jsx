// src/components/TemplateRenderer.jsx
import React from "react";

// Importar todas las plantillas
import WeddingElegantTemplate from "./templates/WeddingElegantTemplate.jsx";
import WeddingInitialsTemplate from "./templates/WeddingInitialsTemplate.jsx";
import WeddingRomanticTemplate from "./templates/WeddingRomanticTemplate.jsx";
import WeddingModernTemplate from "./templates/WeddingModernTemplate.jsx";
import WeddingClassicTemplate from "./templates/WeddingClassicTemplate.jsx";
import WeddingRusticTemplate from "./templates/WeddingRusticTemplate.jsx";

import QuinceaneraElegantTemplate from "./templates/QuinceaneraElegantTemplate.jsx";
import QuinceaneraCreativeTemplate from "./templates/QuinceaneraCreativeTemplate.jsx";
import QuinceaneraRomanticTemplate from "./templates/QuinceaneraRomanticTemplate.jsx";
import QuinceaneraModernTemplate from "./templates/QuinceaneraModernTemplate.jsx";

// Mapeo de plantillas
const TEMPLATE_COMPONENTS = {
  // Plantillas de Bodas
  "wedding-elegant": WeddingElegantTemplate,
  "wedding-initials": WeddingInitialsTemplate,
  "wedding-romantic": WeddingRomanticTemplate,
  "wedding-modern": WeddingModernTemplate,
  "wedding-classic": WeddingClassicTemplate,
  "wedding-rustic": WeddingRusticTemplate,
  
  // Plantillas de Quinceaños
  "quinceanera-elegant": QuinceaneraElegantTemplate,
  "quinceanera-creative": QuinceaneraCreativeTemplate,
  "quinceanera-romantic": QuinceaneraRomanticTemplate,
  "quinceanera-modern": QuinceaneraModernTemplate,
};

// Plantilla por defecto si no se especifica
const DEFAULT_TEMPLATE = "wedding-elegant";

export default function TemplateRenderer({ event, ui, setEvent }) {
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Selecciona una plantilla para comenzar
          </h2>
          <p className="text-gray-500">
            Usa el editor para elegir el tipo de evento y plantilla
          </p>
        </div>
      </div>
    );
  }

  // Obtener el ID de la plantilla del evento
  const templateId = event.templateId || DEFAULT_TEMPLATE;
  
  // Obtener el componente de plantilla correspondiente
  const TemplateComponent = TEMPLATE_COMPONENTS[templateId];
  
  if (!TemplateComponent) {
    console.warn(`Plantilla no encontrada: ${templateId}. Usando plantilla por defecto.`);
    const DefaultComponent = TEMPLATE_COMPONENTS[DEFAULT_TEMPLATE];
    return <DefaultComponent event={event} ui={ui} setEvent={setEvent} />;
  }

  // Aplicar estilos globales de fuentes y colores
  const fontPrimary = event.fonts?.primary || "'Playfair Display', serif";
  const fontSecondary = event.fonts?.secondary || "'Great Vibes', cursive";
  const colorPrimary = event.colors?.primary || "#8FAF86";
  const colorSecondary = event.colors?.secondary || "#D4B28A";
  const colorText = event.colors?.text || "#2E2E2E";

  // Inyectar estilos CSS para asegurar que se apliquen las personalizaciones
  React.useEffect(() => {
    const styleId = 'template-custom-styles';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
      :root {
        --font-primary: ${fontPrimary};
        --font-secondary: ${fontSecondary};
        --color-primary: ${colorPrimary};
        --color-secondary: ${colorSecondary};
        --color-text: ${colorText};
      }
      
      .font-primary, .font-primary * {
        font-family: ${fontPrimary} !important;
      }
      
      .font-secondary, .font-secondary * {
        font-family: ${fontSecondary} !important;
      }
      
      .editable-text {
        font-family: inherit !important;
      }
    `;

    return () => {
      // Cleanup cuando el componente se desmonte
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, [fontPrimary, fontSecondary, colorPrimary, colorSecondary, colorText]);

  return <TemplateComponent event={event} ui={ui} setEvent={setEvent} />;
}

// Exportar información de plantillas para el editor
export const TEMPLATE_INFO = {
  wedding: {
    name: "Bodas",
    templates: [
      {
        id: "wedding-elegant",
        name: "Boda Elegante",
        description: "Diseño minimalista con nombres completos",
        colors: { primary: "#8FAF86", secondary: "#D4B28A" },
        fonts: { primary: "'Playfair Display', serif", secondary: "'Great Vibes', cursive" }
      },
      {
        id: "wedding-initials", 
        name: "Boda Iniciales",
        description: "Diseño con iniciales grandes estilo R&T",
        colors: { primary: "#8FAF86", secondary: "#D4B28A" },
        fonts: { primary: "'Playfair Display', serif", secondary: "'Great Vibes', cursive" }
      },
      {
        id: "wedding-romantic",
        name: "Boda Romántica", 
        description: "Estilo romántico con colores suaves",
        colors: { primary: "#EEC9C5", secondary: "#C9C9C9" },
        fonts: { primary: "Cardo, serif", secondary: "'Pinyon Script', cursive" }
      },
      {
        id: "wedding-modern",
        name: "Boda Moderna",
        description: "Diseño contemporáneo y vibrante", 
        colors: { primary: "#245D63", secondary: "#8F9AA7" },
        fonts: { primary: "Inter, sans-serif", secondary: "'Alex Brush', cursive" }
      },
      {
        id: "wedding-classic",
        name: "Boda Clásica",
        description: "Estilo tradicional y elegante",
        colors: { primary: "#871C2B", secondary: "#EFEAE6" },
        fonts: { primary: "'Playfair Display', serif", secondary: "'Great Vibes', cursive" }
      },
      {
        id: "wedding-rustic",
        name: "Boda Rústica", 
        description: "Diseño natural y campestre",
        colors: { primary: "#5A6C48", secondary: "#E0C9C9" },
        fonts: { primary: "'Playfair Display', serif", secondary: "'Dancing Script', cursive" }
      }
    ]
  },
  quinceanera: {
    name: "Quinceaños",
    templates: [
      {
        id: "quinceanera-elegant",
        name: "Quinceaños Elegante",
        description: "Diseño sofisticado dorado y champagne",
        colors: { primary: "#D4AF37", secondary: "#F5E6D3" },
        fonts: { primary: "'Playfair Display', serif", secondary: "'Dancing Script', cursive" }
      },
      {
        id: "quinceanera-creative",
        name: "Quinceaños Creativo",
        description: "Diseño de 2 columnas con imagen y información",
        colors: { primary: "#E91E63", secondary: "#FCE4EC" },
        fonts: { primary: "'Playfair Display', serif", secondary: "'Pacifico', cursive" }
      },
      {
        id: "quinceanera-romantic",
        name: "Quinceaños Romántico",
        description: "Estilo suave rosa blush y perla",
        colors: { primary: "#F8BBD9", secondary: "#FDF2F8" },
        fonts: { primary: "'Playfair Display', serif", secondary: "'Dancing Script', cursive" }
      },
      {
        id: "quinceanera-modern", 
        name: "Quinceaños Moderno",
        description: "Contemporáneo verde oliva y terracota",
        colors: { primary: "#6B8E23", secondary: "#DEB887" },
        fonts: { primary: "Inter, sans-serif", secondary: "'Pacifico', cursive" }
      }
    ]
  }
};

// Función helper para aplicar plantilla
export function applyTemplate(templateId, setEvent) {
  const templateInfo = Object.values(TEMPLATE_INFO)
    .flatMap(category => category.templates)
    .find(template => template.id === templateId);
    
  if (!templateInfo) {
    console.warn(`Información de plantilla no encontrada: ${templateId}`);
    return;
  }

  setEvent(prev => ({
    ...prev,
    templateId,
    eventType: templateId.startsWith('wedding') ? 'wedding' : 'quinceanera',
    colors: {
      ...prev.colors,
      ...templateInfo.colors
    },
    fonts: {
      ...prev.fonts,
      ...templateInfo.fonts
    }
  }));
}
