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
  "wedding-elegant": WeddingElegantTemplate,
  "wedding-initials": WeddingInitialsTemplate,
  "wedding-romantic": WeddingRomanticTemplate,
  "wedding-modern": WeddingModernTemplate,
  "wedding-classic": WeddingClassicTemplate,
  "wedding-rustic": WeddingRusticTemplate,
  "quinceanera-elegant": QuinceaneraElegantTemplate,
  "quinceanera-creative": QuinceaneraCreativeTemplate,
  "quinceanera-romantic": QuinceaneraRomanticTemplate,
  "quinceanera-modern": QuinceaneraModernTemplate,
};

export default function TemplateRenderer({ event, ui, setEvent }) {
  // Determinar qué plantilla usar
  const templateId = event?.templateId || "wedding-elegant";
  const TemplateComponent = TEMPLATE_COMPONENTS[templateId];

  // Si no se encuentra la plantilla, usar la elegante por defecto
  if (!TemplateComponent) {
    console.warn(`Plantilla no encontrada: ${templateId}, usando wedding-elegant por defecto`);
    const DefaultTemplate = TEMPLATE_COMPONENTS["wedding-elegant"];
    return <DefaultTemplate event={event} ui={ui} setEvent={setEvent} />;
  }

  return <TemplateComponent event={event} ui={ui} setEvent={setEvent} />;
}

// Información de plantillas para el editor
export const TEMPLATE_INFO = {
  wedding: {
    name: "Bodas",
    templates: [
      {
        id: "wedding-elegant",
        name: "Boda Elegante",
        description: "Diseño minimalista con nombres completos",
        colors: { primary: "#8FAF86", secondary: "#D4B28A" },
        fonts: { primary: "'Cormorant Garamond', serif", secondary: "'Playfair Display', serif" }
      },
      {
        id: "wedding-initials", 
        name: "Boda Iniciales",
        description: "Diseño con iniciales grandes estilo R&T",
        colors: { primary: "#8FAF86", secondary: "#D4B28A" },
        fonts: { primary: "'Cormorant Garamond', serif", secondary: "'Great Vibes', cursive" }
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
        description: "Diseño juvenil y vibrante",
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
