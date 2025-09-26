// src/components/EditorPanel(7).jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Palette, Type, Image as ImageIcon, Layout, X, Plus, Trash2, 
  Gift, CreditCard, Hash, Menu, Save as SaveIcon, ChevronRight, 
  ToggleLeft, ToggleRight, CheckCircle2, AlertTriangle, ImagePlus, 
  Link as LinkIcon, ChevronDown, ChevronUp, Eye, EyeOff, Smartphone, 
  Monitor, Tablet, Settings, Zap, Sparkles, Heart, Church, 
  PartyPopper, Crown, Music, Instagram,
} from "lucide-react";

// Información de plantillas
const TEMPLATE_INFO = {
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

export default function EditorPanel({ event, setEvent, onSave, isSaving }) {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedEventType, setSelectedEventType] = useState(event?.eventType || "wedding");
  const [expandedSections, setExpandedSections] = useState({
    colors: true,
    fonts: true,
    sections: false
  });

  // Auto-save con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (event && onSave) {
        onSave();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [event, onSave]);

  const applyTemplate = (templateId) => {
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
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateEventField = (field, value) => {
    setEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedField = (parent, field, value) => {
    setEvent(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const toggleEventSection = (section) => {
    setEvent(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections?.[section]
      }
    }));
  };

  const tabs = [
    { id: "templates", label: "Plantillas", icon: Layout },
    { id: "content", label: "Contenido", icon: Type },
    { id: "design", label: "Diseño", icon: Palette },
    { id: "images", label: "Imágenes", icon: ImageIcon }
  ];

  const isQuinceanera = selectedEventType === "quinceanera";

  return (
    <div className="w-full max-w-md bg-white border-l border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Editor</h2>
          <div className="flex items-center gap-2">
            {isSaving && (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <SaveIcon className="w-4 h-4 animate-spin" />
                Guardando...
              </div>
            )}
            <Badge variant="outline" className="text-xs">
              {event?.templateId || "Sin plantilla"}
            </Badge>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-3 h-3" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        {activeTab === "templates" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tipo de Evento</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedEventType("wedding")}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedEventType === "wedding"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Heart className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-xs font-medium">Bodas</div>
                </button>
                <button
                  onClick={() => setSelectedEventType("quinceanera")}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedEventType === "quinceanera"
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Crown className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-xs font-medium">Quinceaños</div>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Plantillas de {TEMPLATE_INFO[selectedEventType].name}
              </h3>
              <div className="space-y-2">
                {TEMPLATE_INFO[selectedEventType].templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => applyTemplate(template.id)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                      event?.templateId === template.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-900">
                        {template.name}
                      </div>
                      <div className="flex gap-1">
                        <div 
                          className="w-3 h-3 rounded-full border border-gray-300"
                          style={{ backgroundColor: template.colors.primary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full border border-gray-300"
                          style={{ backgroundColor: template.colors.secondary }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">
                      {template.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-6">
            {/* Información básica */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Información Básica</h3>
              <div className="space-y-3">
                {isQuinceanera ? (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nombre de la Quinceañera
                    </label>
                    <Input
                      value={event?.quinceañera?.name || event?.couple?.bride || ""}
                      onChange={(e) => {
                        const name = e.target.value;
                        setEvent(prev => ({
                          ...prev,
                          quinceañera: { ...prev.quinceañera, name },
                          couple: { ...prev.couple, bride: name }
                        }));
                      }}
                      placeholder="Nombre de la quinceañera"
                      className="text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Nombre 1
                      </label>
                      <Input
                        value={event?.couple?.bride || ""}
                        onChange={(e) => updateNestedField("couple", "bride", e.target.value)}
                        placeholder="Nombre de la novia"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Nombre 2
                      </label>
                      <Input
                        value={event?.couple?.groom || ""}
                        onChange={(e) => updateNestedField("couple", "groom", e.target.value)}
                        placeholder="Nombre del novio"
                        className="text-sm"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Fecha
                  </label>
                  <Input
                    value={event?.date || ""}
                    onChange={(e) => updateEventField("date", e.target.value)}
                    placeholder="23 de Noviembre, 2026"
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Hora
                  </label>
                  <Input
                    value={event?.time || ""}
                    onChange={(e) => updateEventField("time", e.target.value)}
                    placeholder="19:00 hs"
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Ceremonia - Solo para bodas */}
            {!isQuinceanera && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Ceremonia</h3>
                  <Switch
                    checked={event?.sections?.ceremony !== false}
                    onCheckedChange={() => toggleEventSection("ceremony")}
                  />
                </div>
                {event?.sections?.ceremony !== false && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tipo de Ceremonia
                      </label>
                      <select
                        value={event?.ceremony?.type || "religious"}
                        onChange={(e) => updateNestedField("ceremony", "type", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="religious">Religiosa</option>
                        <option value="civil">Civil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Lugar
                      </label>
                      <Input
                        value={event?.ceremony?.venue || ""}
                        onChange={(e) => updateNestedField("ceremony", "venue", e.target.value)}
                        placeholder="Iglesia o Registro Civil"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Dirección
                      </label>
                      <Input
                        value={event?.ceremony?.location || ""}
                        onChange={(e) => updateNestedField("ceremony", "location", e.target.value)}
                        placeholder="Villa Allende, Córdoba"
                        className="text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Celebración/Fiesta */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">
                  {isQuinceanera ? "Celebración" : "Fiesta"}
                </h3>
                <Switch
                  checked={event?.sections?.reception !== false}
                  onCheckedChange={() => toggleEventSection("reception")}
                />
              </div>
              {event?.sections?.reception !== false && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Lugar
                    </label>
                    <Input
                      value={event?.reception?.venue || ""}
                      onChange={(e) => updateNestedField("reception", "venue", e.target.value)}
                      placeholder="Salón de Eventos"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Dirección
                    </label>
                    <Input
                      value={event?.reception?.location || ""}
                      onChange={(e) => updateNestedField("reception", "location", e.target.value)}
                      placeholder="Villa Allende, Córdoba"
                      className="text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Hashtag */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Hashtag
              </label>
              <Input
                value={event?.hashtag || ""}
                onChange={(e) => updateEventField("hashtag", e.target.value)}
                placeholder={isQuinceanera ? "#Mis15Años" : "#NuestraBoda"}
                className="text-sm"
              />
            </div>

            {/* Mensaje RSVP */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Mensaje de Confirmación
              </label>
              <Textarea
                value={event?.rsvpNote || ""}
                onChange={(e) => updateEventField("rsvpNote", e.target.value)}
                placeholder="Por favor confirmanos tu asistencia antes del 15 de octubre."
                rows={3}
                className="text-sm"
              />
            </div>
          </div>
        )}

        {activeTab === "design" && (
          <div className="space-y-6">
            {/* Colores */}
            <div>
              <button
                onClick={() => toggleSection("colors")}
                className="flex items-center justify-between w-full mb-3"
              >
                <h3 className="text-sm font-medium text-gray-900">Colores</h3>
                {expandedSections.colors ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.colors && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Color Primario
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={event?.colors?.primary || "#8FAF86"}
                        onChange={(e) => updateNestedField("colors", "primary", e.target.value)}
                        className="w-10 h-8 rounded border border-gray-300"
                      />
                      <Input
                        value={event?.colors?.primary || "#8FAF86"}
                        onChange={(e) => updateNestedField("colors", "primary", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Color Secundario
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={event?.colors?.secondary || "#D4B28A"}
                        onChange={(e) => updateNestedField("colors", "secondary", e.target.value)}
                        className="w-10 h-8 rounded border border-gray-300"
                      />
                      <Input
                        value={event?.colors?.secondary || "#D4B28A"}
                        onChange={(e) => updateNestedField("colors", "secondary", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fuentes */}
            <div>
              <button
                onClick={() => toggleSection("fonts")}
                className="flex items-center justify-between w-full mb-3"
              >
                <h3 className="text-sm font-medium text-gray-900">Tipografías</h3>
                {expandedSections.fonts ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.fonts && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Fuente Principal
                    </label>
                    <select
                      value={event?.fonts?.primary || "'Cormorant Garamond', serif"}
                      onChange={(e) => updateNestedField("fonts", "primary", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="'Cormorant Garamond', serif">Cormorant Garamond</option>
                      <option value="'Playfair Display', serif">Playfair Display</option>
                      <option value="Cardo, serif">Cardo</option>
                      <option value="Inter, sans-serif">Inter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Fuente Secundaria
                    </label>
                    <select
                      value={event?.fonts?.secondary || "'Playfair Display', serif"}
                      onChange={(e) => updateNestedField("fonts", "secondary", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="'Playfair Display', serif">Playfair Display</option>
                      <option value="'Great Vibes', cursive">Great Vibes</option>
                      <option value="'Dancing Script', cursive">Dancing Script</option>
                      <option value="'Pinyon Script', cursive">Pinyon Script</option>
                      <option value="'Alex Brush', cursive">Alex Brush</option>
                      <option value="'Pacifico', cursive">Pacifico</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Secciones */}
            <div>
              <button
                onClick={() => toggleSection("sections")}
                className="flex items-center justify-between w-full mb-3"
              >
                <h3 className="text-sm font-medium text-gray-900">Secciones</h3>
                {expandedSections.sections ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.sections && (
                <div className="space-y-2">
                  {[
                    { key: "gallery", label: "Galería", icon: ImageIcon },
                    { key: "bank", label: "Regalos", icon: Gift },
                    { key: "instagram", label: "Instagram", icon: Instagram },
                    { key: "songs", label: "Canciones", icon: Music },
                    { key: "info", label: "Info Útil", icon: Settings }
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{label}</span>
                      </div>
                      <Switch
                        checked={event?.sections?.[key] !== false}
                        onCheckedChange={() => toggleEventSection(key)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "images" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Imagen de Fondo</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Arrastra una imagen o haz clic para seleccionar
                </p>
                <Button variant="outline" size="sm">
                  Seleccionar Imagen
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Logo</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Logo opcional para la invitación
                </p>
                <Button variant="outline" size="sm">
                  Seleccionar Logo
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Galería</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <ImagePlus className="w-6 h-6 text-gray-400" />
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Imágenes
              </Button>
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <Button 
          onClick={() => {
            // Lógica para finalizar y proceder al pago
            alert("Finalizando evento y procediendo al pago...");
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Finalizar y Proceder al Pago
        </Button>
        <p className="text-xs text-gray-500 text-center mt-2">
          El evento se guardará automáticamente
        </p>
      </div>
    </div>
  );
}
