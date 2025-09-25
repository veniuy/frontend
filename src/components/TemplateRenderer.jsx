// src/components/TemplateRenderer.jsx
import React from "react";

// Importar todas las plantillas
import QuinceaneraElegantTemplate from "./templates/QuinceaneraElegantTemplate";
import QuinceaneraRomanticTemplate from "./templates/QuinceaneraRomanticTemplate";
import QuinceaneraModernTemplate from "./templates/QuinceaneraModernTemplate";
import WeddingElegantTemplate from "./templates/WeddingElegantTemplate";
import WeddingRomanticTemplate from "./templates/WeddingRomanticTemplate";
import WeddingModernTemplate from "./templates/WeddingModernTemplate";
import WeddingClassicTemplate from "./templates/WeddingClassicTemplate";
import WeddingRusticTemplate from "./templates/WeddingRusticTemplate";

// Mapeo de plantillas
const TEMPLATE_COMPONENTS = {
  // Quinceaños
  "quinceanera-elegant": QuinceaneraElegantTemplate,
  "quinceanera-romantic": QuinceaneraRomanticTemplate,
  "quinceanera-modern": QuinceaneraModernTemplate,
  
  // Bodas
  "wedding-elegant": WeddingElegantTemplate,
  "wedding-romantic": WeddingRomanticTemplate,
  "wedding-modern": WeddingModernTemplate,
  "wedding-classic": WeddingClassicTemplate,
  "wedding-rustic": WeddingRusticTemplate,
};

export default function TemplateRenderer({ event, ui, setEvent }) {
  // Obtener el ID de la plantilla del evento
  const templateId = event?.templateId || "wedding-elegant";
  
  // Obtener el componente de plantilla correspondiente
  const TemplateComponent = TEMPLATE_COMPONENTS[templateId];
  
  // Si no se encuentra la plantilla, usar la plantilla por defecto
  if (!TemplateComponent) {
    console.warn(`Template ${templateId} not found, using default`);
    const DefaultTemplate = TEMPLATE_COMPONENTS["wedding-elegant"];
    return <DefaultTemplate event={event} ui={ui} setEvent={setEvent} />;
  }
  
  // Renderizar la plantilla seleccionada
  return <TemplateComponent event={event} ui={ui} setEvent={setEvent} />;
}

// Función helper para obtener información de plantillas
export function getTemplateInfo() {
  return [
    // QUINCEAÑOS
    { 
      id: "quinceanera-elegant", 
      name: "Quinceaños Elegante", 
      type: "quinceanera",
      description: "Diseño sofisticado para celebración de 15 años",
      colors: { primary: "#E1C1A8", secondary: "#F6E3D4", text: "#2E2E2E" },
      fonts: { primary: "'Playfair Display', serif", secondary: "'Great Vibes', cursive" },
      preview: "/previews/quinceanera-elegant.jpg"
    },
    { 
      id: "quinceanera-romantic", 
      name: "Quinceaños Romántico", 
      type: "quinceanera",
      description: "Colores suaves y delicados para tu celebración",
      colors: { primary: "#EEC9C5", secondary: "#C9C9C9", text: "#2E2E2E" },
      fonts: { primary: "'Cormorant Garamond', serif", secondary: "'Pinyon Script', cursive" },
      preview: "/previews/quinceanera-romantic.jpg"
    },
    { 
      id: "quinceanera-modern", 
      name: "Quinceaños Moderno", 
      type: "quinceanera",
      description: "Diseño contemporáneo y vibrante",
      colors: { primary: "#B7B79D", secondary: "#C16D4D", text: "#2E2E2E" },
      fonts: { primary: "Montserrat, sans-serif", secondary: "'Alex Brush', cursive" },
      preview: "/previews/quinceanera-modern.jpg"
    },
    
    // BODAS
    { 
      id: "wedding-elegant", 
      name: "Boda Elegante", 
      type: "wedding",
      description: "Diseño sofisticado y minimalista",
      colors: { primary: "#8FAF86", secondary: "#D4B28A", text: "#2E2E2E" },
      fonts: { primary: "'Playfair Display', serif", secondary: "'Great Vibes', cursive" },
      preview: "/previews/wedding-elegant.jpg"
    },
    { 
      id: "wedding-romantic", 
      name: "Boda Romántica", 
      type: "wedding",
      description: "Colores suaves y florales",
      colors: { primary: "#EEC9C5", secondary: "#C9C9C9", text: "#2E2E2E" },
      fonts: { primary: "Cardo, serif", secondary: "'Pinyon Script', cursive" },
      preview: "/previews/wedding-romantic.jpg"
    },
    { 
      id: "wedding-modern", 
      name: "Boda Moderna", 
      type: "wedding",
      description: "Diseño contemporáneo y vibrante",
      colors: { primary: "#245D63", secondary: "#8F9AA7", text: "#2E2E2E" },
      fonts: { primary: "Inter, sans-serif", secondary: "'Alex Brush', cursive" },
      preview: "/previews/wedding-modern.jpg"
    },
    { 
      id: "wedding-classic", 
      name: "Boda Clásica", 
      type: "wedding",
      description: "Estilo tradicional y atemporal",
      colors: { primary: "#871C2B", secondary: "#EFEAE6", text: "#2E2E2E" },
      fonts: { primary: "Bellefair, serif", secondary: "'Tangerine', cursive" },
      preview: "/previews/wedding-classic.jpg"
    },
    { 
      id: "wedding-rustic", 
      name: "Boda Rústica", 
      type: "wedding",
      description: "Estilo campestre y natural",
      colors: { primary: "#5A6C48", secondary: "#E0C9C9", text: "#2E2E2E" },
      fonts: { primary: "'Cormorant Garamond', serif", secondary: "'Great Vibes', cursive" },
      preview: "/previews/wedding-rustic.jpg"
    },
  ];
}

// Función helper para obtener plantillas por tipo
export function getTemplatesByType(type) {
  return getTemplateInfo().filter(template => template.type === type);
}

// Función helper para obtener una plantilla específica
export function getTemplateById(id) {
  return getTemplateInfo().find(template => template.id === id);
}
