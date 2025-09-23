// src/components/EditorPanel.jsx
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Type,
  Image as ImageIcon,
  Layout,
  X,
  Plus,
  Trash2,
  Gift,
  CreditCard,
  Hash,
  Menu,
  Save as SaveIcon,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  AlertTriangle,
  ImagePlus,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Tablet,
  Settings,
  Zap,
  Sparkles,
  Heart,
  Church,
} from "lucide-react";
import ImagesPanel from "./ImagesPanel";

export default function EditorPanel({
  event,
  ui,
  setActiveTab,
  setShowMobilePanel,
  handleColorChange,
  handleFontChange,
  handleTemplateChange,
  setEvent,
  onSave,
}) {
  /* =================== ESTADO MEJORADO =================== */
  const [errors, setErrors] = useState([]);
  const [saved, setSaved] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [previewMode, setPreviewMode] = useState("desktop"); // desktop, tablet, mobile
  const [isDragging, setIsDragging] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentColors, setRecentColors] = useState([]);

  /* =================== PALETAS MEJORADAS =================== */
  const PALETTES = useMemo(
    () => [
      { 
        name: "Champagne Elegance", 
        category: "Elegante",
        tones: [
          { hex: "#F6E3D4", name: "Champagne Claro" }, 
          { hex: "#E1C1A8", name: "Champagne" }, 
          { hex: "#D1A880", name: "Dorado Suave" }, 
          { hex: "#B8997F", name: "Bronce" }
        ] 
      },
      { 
        name: "Boho Chic", 
        category: "Bohemio",
        tones: [
          { hex: "#EFC4B1", name: "Terracota Claro" }, 
          { hex: "#E7B7A2", name: "Coral Suave" }, 
          { hex: "#DBA583", name: "Caramelo" }, 
          { hex: "#D99873", name: "Terracota" }
        ] 
      },
      { 
        name: "Sage & Terracotta", 
        category: "Natural",
        tones: [
          { hex: "#B7B79D", name: "Sage Verde" }, 
          { hex: "#C16D4D", name: "Terracota Oscuro" }, 
          { hex: "#D57555", name: "Coral Cálido" }, 
          { hex: "#C96342", name: "Ladrillo" }
        ] 
      },
      { 
        name: "Blush Romance", 
        category: "Romántico",
        tones: [
          { hex: "#EEC9C5", name: "Rosa Blush" }, 
          { hex: "#C9C9C9", name: "Gris Perla" }, 
          { hex: "#B9B9B9", name: "Gris Medio" }, 
          { hex: "#8B8B8B", name: "Gris Carbón" }
        ] 
      },
      { 
        name: "Peachy Sunset", 
        category: "Cálido",
        tones: [
          { hex: "#F2C3B1", name: "Durazno Claro" }, 
          { hex: "#E6B79E", name: "Durazno" }, 
          { hex: "#E5A88B", name: "Coral Durazno" }, 
          { hex: "#C8C6A8", name: "Verde Salvia" }
        ] 
      },
      { 
        name: "Classic Romance", 
        category: "Clásico",
        tones: [
          { hex: "#EFEAE6", name: "Marfil" }, 
          { hex: "#E7D7D3", name: "Rosa Pálido" }, 
          { hex: "#B6AFAA", name: "Taupe" }, 
          { hex: "#871C2B", name: "Borgoña" }
        ] 
      },
      { 
        name: "Winter Frost", 
        category: "Frío",
        tones: [
          { hex: "#C2C4CA", name: "Gris Hielo" }, 
          { hex: "#ADB3BB", name: "Azul Gris" }, 
          { hex: "#8F9AA7", name: "Azul Acero" }, 
          { hex: "#245D63", name: "Azul Profundo" }
        ] 
      },
      { 
        name: "Rustic Elegance", 
        category: "Rústico",
        tones: [
          { hex: "#E0C9C9", name: "Rosa Empolvado" }, 
          { hex: "#C9AFA0", name: "Beige Cálido" }, 
          { hex: "#D4CAB0", name: "Crema Vintage" }, 
          { hex: "#5A6C48", name: "Verde Oliva" }
        ] 
      },
    ],
    []
  );

  const fontFamilies = useMemo(() => [
    { name: "Inter", family: "Inter, system-ui, sans-serif", category: "Sans Serif", preview: "Aa" },
    { name: "Great Vibes", family: "'Great Vibes', cursive", category: "Script", preview: "Aa" },
    { name: "Playfair Display", family: "'Playfair Display', serif", category: "Serif", preview: "Aa" },
    { name: "Cardo", family: "Cardo, serif", category: "Serif", preview: "Aa" },
    { name: "Pinyon Script", family: "'Pinyon Script', cursive", category: "Script", preview: "Aa" },
    { name: "Cormorant Garamond", family: "'Cormorant Garamond', serif", category: "Serif", preview: "Aa" },
    { name: "Bellefair", family: "Bellefair, serif", category: "Serif", preview: "Aa" },
    { name: "Alex Brush", family: "'Alex Brush', cursive", category: "Script", preview: "Aa" },
    { name: "Tangerine", family: "Tangerine, cursive", category: "Script", preview: "Aa" },
    { name: "Montserrat", family: "Montserrat, sans-serif", category: "Sans Serif", preview: "Aa" },
    { name: "Open Sans", family: "Open Sans, sans-serif", category: "Sans Serif", preview: "Aa" },
    { name: "Lato", family: "Lato, sans-serif", category: "Sans Serif", preview: "Aa" },
  ], []);

  const templates = useMemo(() => [
    { 
      id: "elegant", 
      name: "Elegante", 
      description: "Diseño sofisticado y minimalista",
      preview: "🎭",
      colors: { primary: "#8FAF86", secondary: "#D4B28A" }
    },
    { 
      id: "romantic", 
      name: "Romántico", 
      description: "Colores suaves y florales",
      preview: "💕",
      colors: { primary: "#EEC9C5", secondary: "#C9C9C9" }
    },
    { 
      id: "modern", 
      name: "Moderno", 
      description: "Diseño contemporáneo y vibrante",
      preview: "⚡",
      colors: { primary: "#245D63", secondary: "#8F9AA7" }
    },
    { 
      id: "classic", 
      name: "Clásico", 
      description: "Estilo tradicional y atemporal",
      preview: "👑",
      colors: { primary: "#871C2B", secondary: "#EFEAE6" }
    },
  ], []);

  /* =================== HOOKS MEJORADOS =================== */
  
  // Detección de dispositivo mejorada
  const deviceType = useMemo(() => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }, []);

  // Auto-save mejorado
  const debouncedSave = useCallback(
    debounce(async () => {
      if (typeof onSave === "function") {
        try {
          await onSave(event);
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        } catch (error) {
          console.error("Error saving:", error);
        }
      }
    }, 1000),
    [event, onSave]
  );

  useEffect(() => {
    debouncedSave();
  }, [event, debouncedSave]);

  // Gestión de colores recientes
  const addRecentColor = useCallback((color) => {
    setRecentColors(prev => {
      const filtered = prev.filter(c => c !== color);
      return [color, ...filtered].slice(0, 8);
    });
  }, []);

  /* =================== HELPERS MEJORADOS =================== */
  
  const applyPalette = useCallback((tones) => {
    const primary = tones[2]?.hex || event.colors?.primary || "#8FAF86";
    const secondary = tones[3]?.hex || event.colors?.secondary || "#D4B28A";
    const text = tones[3]?.hex || event.colors?.text || "#2E2E2E";
    const dark = tones[3]?.hex || event.colors?.dark || "#1F2937";
    
    handleColorChange("primary", primary);
    handleColorChange("secondary", secondary);
    handleColorChange("text", text);
    handleColorChange("dark", dark);
    
    addRecentColor(primary);
    addRecentColor(secondary);
  }, [event.colors, handleColorChange, addRecentColor]);

  const addGift = useCallback(() =>
    setEvent((p) => ({ ...p, gifts: [...(p.gifts || []), { label: "Mesa de regalos", url: "" }] }))
  , [setEvent]);

  const updateGift = useCallback((idx, key, value) =>
    setEvent((p) => {
      const arr = [...(p.gifts || [])];
      arr[idx] = { ...arr[idx], [key]: value };
      return { ...p, gifts: arr };
    })
  , [setEvent]);

  const removeGift = useCallback((idx) =>
    setEvent((p) => {
      const arr = [...(p.gifts || [])];
      arr.splice(idx, 1);
      return { ...p, gifts: arr };
    })
  , [setEvent]);

  // Info útil: alojamiento / transporte
  const addLodging = useCallback(() =>
    setEvent((p) => ({
      ...p,
      info: { ...(p.info || {}), lodging: [...(p.info?.lodging || []), { name: "", url: "" }] },
    }))
  , [setEvent]);

  const updateLodging = useCallback((i, k, v) =>
    setEvent((p) => {
      const arr = [...(p.info?.lodging || [])];
      arr[i] = { ...arr[i], [k]: v };
      return { ...p, info: { ...(p.info || {}), lodging: arr } };
    })
  , [setEvent]);

  const removeLodging = useCallback((i) =>
    setEvent((p) => {
      const arr = [...(p.info?.lodging || [])];
      arr.splice(i, 1);
      return { ...p, info: { ...(p.info || {}), lodging: arr } };
    })
  , [setEvent]);

  const addTransport = useCallback(() =>
    setEvent((p) => ({
      ...p,
      info: { ...(p.info || {}), transport: [...(p.info?.transport || []), { name: "", note: "", url: "" }] },
    }))
  , [setEvent]);

  const updateTransport = useCallback((i, k, v) =>
    setEvent((p) => {
      const arr = [...(p.info?.transport || [])];
      arr[i] = { ...arr[i], [k]: v };
      return { ...p, info: { ...(p.info || {}), transport: arr } };
    })
  , [setEvent]);

  const removeTransport = useCallback((i) =>
    setEvent((p) => {
      const arr = [...(p.info?.transport || [])];
      arr.splice(i, 1);
      return { ...p, info: { ...(p.info || {}), transport: arr } };
    })
  , [setEvent]);

  /* ===== Galería mejorada ===== */
  const gallery = (event.images?.gallery || []).slice(0, 6);
  const setGallery = useCallback((arr) => 
    setEvent((p) => ({ ...p, images: { ...(p.images || {}), gallery: arr.slice(0, 6) } }))
  , [setEvent]);

  const setGalleryAtFile = useCallback(async (i, file) => {
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    const arr = [...gallery];
    arr[i] = dataUrl;
    setGallery(arr);
  }, [gallery, setGallery]);

  const removeGalleryItem = useCallback((i) => 
    setGallery(gallery.filter((_, idx) => idx !== i))
  , [gallery, setGallery]);

  const SECTION_KEYS = useMemo(() => [
    { key: "ceremony", label: "Ceremonia", icon: "⛪" },
    { key: "reception", label: "Fiesta", icon: "🎉" },
    { key: "bank", label: "Cuenta bancaria", icon: "💳" },
    { key: "songs", label: "Canciones", icon: "🎵" },
    { key: "info", label: "Info útil", icon: "ℹ️" },
    { key: "dresscode", label: "Dress code", icon: "👗" },
    { key: "instagram", label: "Instagram", icon: "📷" },
    { key: "gallery", label: "Galería", icon: "🖼️" },
  ], []);

  const isSectionOn = useCallback((k) => {
    const s = event.sections || {};
    return s[k] !== false;
  }, [event.sections]);

  const toggleSection = useCallback((k) =>
    setEvent((p) => ({ ...p, sections: { ...(p.sections || {}), [k]: !(p.sections?.[k] !== false) } }))
  , [setEvent]);

  const doSave = useCallback(async () => {
    try {
      if (typeof onSave === "function") {
        await onSave(event);
      } else if (typeof window !== "undefined") {
        localStorage.setItem("event-draft", JSON.stringify(event));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (e) {
      setErrors([`No se pudo guardar: ${e?.message || e}`]);
    }
  }, [event, onSave]);

  const ORDER = ["design", "content", "images", "layout"];
  const goNextTab = useCallback(() => {
    const idx = ORDER.indexOf(ui.activeTab);
    const next = ORDER[Math.min(ORDER.length - 1, idx + 1)];
    setActiveTab(next);
  }, [ui.activeTab, setActiveTab]);

  const validate = useCallback(() => {
    const errs = [];
    const c = event || {};
    const couple = c.couple || {};
    const ceremony = c.ceremony || {};
    const reception = c.reception || {};
    
    if (!couple.bride || !couple.bride.trim()) errs.push("Falta el nombre de la novia.");
    if (!couple.groom || !couple.groom.trim()) errs.push("Falta el nombre del novio.");
    if (!c.date || !c.date.trim()) errs.push("Falta la fecha.");
    if (!c.time || !c.time.trim()) errs.push("Falta la hora.");
    if (isSectionOn("ceremony") && !ceremony.venue) errs.push("Falta el lugar de la ceremonia.");
    if (isSectionOn("reception") && !reception.venue) errs.push("Falta el lugar de la fiesta.");
    if (isSectionOn("bank")) {
      const b = c.bank || {};
      if (!b.titular && !b.cbu && !b.cuenta) {
        errs.push("Completa datos bancarios (titular, CBU/IBAN o cuenta).");
      }
    }
    return errs;
  }, [event, isSectionOn]);

  const handleNext = useCallback(() => {
    const errs = validate();
    setErrors(errs);
    if (errs.length === 0) {
      goNextTab();
    }
  }, [validate, goNextTab]);

  /* =================== COMPONENTES DE UI MEJORADOS =================== */
  
  const MobileToolbar = () => (
    ui.isMobile && !ui.showMobilePanel && (
      <div className="fixed top-2 left-2 right-2 z-40 flex items-center gap-2">
        <EnhancedButton
          variant="ghost"
          size="sm"
          onClick={() => setShowMobilePanel(true)}
          className="rounded-full shadow-lg bg-white/95 backdrop-blur-sm border border-gray-200"
          aria-label="Abrir editor"
        >
          <Menu className="w-5 h-5" />
        </EnhancedButton>

        <div className="flex items-center gap-2 ml-auto">
          <PreviewModeToggle />
          
          <EnhancedButton
            variant="ghost"
            size="sm"
            onClick={doSave}
            className="bg-white/95 backdrop-blur-sm border border-gray-200"
            disabled={saved}
          >
            {saved ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <SaveIcon className="w-4 h-4" />}
          </EnhancedButton>

          <EnhancedButton
            size="sm"
            onClick={handleNext}
            className="bg-black text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </EnhancedButton>
        </div>
      </div>
    )
  );

  const PreviewModeToggle = () => (
    <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-1">
      {[
        { mode: "mobile", icon: Smartphone },
        { mode: "tablet", icon: Tablet },
        { mode: "desktop", icon: Monitor }
      ].map(({ mode, icon: Icon }) => (
        <button
          key={mode}
          onClick={() => setPreviewMode(mode)}
          className={`p-1.5 rounded transition-colors ${
            previewMode === mode 
              ? "bg-blue-100 text-blue-600" 
              : "text-gray-400 hover:text-gray-600"
          }`}
          title={`Vista ${mode}`}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );

  const EnhancedButton = ({ 
    children, 
    variant = "default", 
    size = "default", 
    className = "", 
    disabled = false,
    ...props 
  }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    };
    
    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 text-sm",
      lg: "h-11 px-8",
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  };

  const CollapsibleSection = ({ title, icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
      <Card className="overflow-hidden">
        <CardHeader 
          className="pb-2 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              {icon}
              {title}
            </CardTitle>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </CardHeader>
        {isOpen && (
          <CardContent className="pt-0">
            {children}
          </CardContent>
        )}
      </Card>
    );
  };

  const ColorPicker = ({ label, value, onChange, showRecent = false }) => (
    <div className="space-y-2">
      <Label className="text-xs font-medium">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value || "#000000"}
            onChange={(e) => {
              onChange(e.target.value);
              addRecentColor(e.target.value);
            }}
            className="w-10 h-10 rounded border-2 border-gray-200 cursor-pointer"
          />
          <div 
            className="absolute inset-0 rounded border-2 border-gray-200 pointer-events-none"
            style={{ backgroundColor: value }}
          />
        </div>
        <Input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs flex-1"
          placeholder="#000000"
        />
      </div>
      {showRecent && recentColors.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          <span className="text-xs text-gray-500 w-full">Recientes:</span>
          {recentColors.map((color, i) => (
            <button
              key={i}
              className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => onChange(color)}
              title={color}
            />
          ))}
        </div>
      )}
    </div>
  );

  /* =================== RENDER PRINCIPAL =================== */
  return (
    <>
      <MobileToolbar />

      <div
        className={
          ui.isMobile
            ? `fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
                ui.showMobilePanel ? "translate-x-0" : "-translate-x-full"
              } overflow-hidden flex flex-col`
            : "w-80 bg-white border-r border-gray-200 overflow-hidden flex flex-col"
        }
      >
        {/* Header mejorado */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {ui.isMobile && (
                <EnhancedButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobilePanel(false)}
                >
                  <X className="h-4 w-4" />
                </EnhancedButton>
              )}
              
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-sm">Editor</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {saved && (
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Guardado
                </Badge>
              )}
              
              <EnhancedButton
                size="sm"
                onClick={doSave}
                disabled={saved}
                className="text-xs"
              >
                {saved ? <CheckCircle2 className="w-4 h-4" /> : <SaveIcon className="w-4 h-4" />}
              </EnhancedButton>
            </div>
          </div>

          {/* Indicador de progreso */}
          <div className="flex items-center gap-1 mb-2">
            {ORDER.map((tab, index) => (
              <div
                key={tab}
                className={`flex-1 h-1 rounded ${
                  ORDER.indexOf(ui.activeTab) >= index ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {errors.length > 0 && (
            <div className="rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700">
              <div className="flex items-center gap-2 font-medium mb-1">
                <AlertTriangle className="w-3 h-3" />
                Revisa estos puntos
              </div>
              <ul className="list-disc pl-4 space-y-1">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tabs mejorados */}
        <Tabs value={ui.activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4 p-1 mx-3 mb-3">
            <TabsTrigger value="design" className="flex flex-col items-center gap-1 p-2 text-xs">
              <Palette className="h-3 w-3" />
              Diseño
            </TabsTrigger>
            <TabsTrigger value="content" className="flex flex-col items-center gap-1 p-2 text-xs">
              <Type className="h-3 w-3" />
              Contenido
            </TabsTrigger>
            <TabsTrigger value="images" className="flex flex-col items-center gap-1 p-2 text-xs">
              <ImageIcon className="h-3 w-3" />
              Imágenes
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex flex-col items-center gap-1 p-2 text-xs">
              <Layout className="h-3 w-3" />
              Plantillas
            </TabsTrigger>
          </TabsList>

          {/* ============ DISEÑO (PALETAS + PERSONALIZADOS) ============ */}
          <TabsContent value="design" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full px-3 pb-6">
              <div className="space-y-4">
                
                {/* Paletas de colores mejoradas */}
                <CollapsibleSection 
                  title="Paletas de Colores" 
                  icon={<Palette className="w-4 h-4" />}
                  defaultOpen={true}
                >
                  <div className="space-y-3">
                    {PALETTES.map((palette) => (
                      <div key={palette.name} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <Label className="text-xs font-medium">{palette.name}</Label>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {palette.category}
                            </Badge>
                          </div>
                          <EnhancedButton
                            variant="outline"
                            size="sm"
                            onClick={() => applyPalette(palette.tones)}
                            className="text-xs"
                          >
                            Aplicar
                          </EnhancedButton>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2">
                          {palette.tones.map((tone, i) => (
                            <div key={i} className="text-center">
                              <button
                                className="w-full h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors mb-1"
                                style={{ backgroundColor: tone.hex }}
                                onClick={() => {
                                  handleColorChange("primary", tone.hex);
                                  addRecentColor(tone.hex);
                                }}
                                title={`${tone.name} - ${tone.hex}`}
                              />
                              <span className="text-xs text-gray-600 block truncate">
                                {tone.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

                {/* Colores personalizados */}
                <CollapsibleSection 
                  title="Colores Personalizados" 
                  icon={<Settings className="w-4 h-4" />}
                >
                  <div className="space-y-4">
                    <ColorPicker
                      label="Color Primario"
                      value={event.colors?.primary}
                      onChange={(color) => handleColorChange("primary", color)}
                      showRecent={true}
                    />
                    <ColorPicker
                      label="Color Secundario"
                      value={event.colors?.secondary}
                      onChange={(color) => handleColorChange("secondary", color)}
                    />
                    <ColorPicker
                      label="Color de Texto"
                      value={event.colors?.text}
                      onChange={(color) => handleColorChange("text", color)}
                    />
                    <ColorPicker
                      label="Color Oscuro"
                      value={event.colors?.dark}
                      onChange={(color) => handleColorChange("dark", color)}
                    />
                  </div>
                </CollapsibleSection>

                {/* Tipografía mejorada */}
                <CollapsibleSection 
                  title="Tipografía" 
                  icon={<Type className="w-4 h-4" />}
                >
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium mb-2 block">Fuente Principal</Label>
                      <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                        {fontFamilies.map((font) => (
                          <button
                            key={font.family}
                            className={`p-2 border rounded text-left hover:bg-gray-50 transition-colors ${
                              event.fonts?.primary === font.family ? "border-blue-500 bg-blue-50" : "border-gray-200"
                            }`}
                            onClick={() => handleFontChange("primary", font.family)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium">{font.name}</div>
                                <div className="text-xs text-gray-500">{font.category}</div>
                              </div>
                              <div 
                                className="text-lg"
                                style={{ fontFamily: font.family }}
                              >
                                {font.preview}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-medium mb-2 block">Fuente Secundaria</Label>
                      <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                        {fontFamilies.filter(f => f.category === "Script" || f.category === "Serif").map((font) => (
                          <button
                            key={font.family}
                            className={`p-2 border rounded text-left hover:bg-gray-50 transition-colors ${
                              event.fonts?.secondary === font.family ? "border-blue-500 bg-blue-50" : "border-gray-200"
                            }`}
                            onClick={() => handleFontChange("secondary", font.family)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium">{font.name}</div>
                                <div className="text-xs text-gray-500">{font.category}</div>
                              </div>
                              <div 
                                className="text-lg"
                                style={{ fontFamily: font.family }}
                              >
                                {font.preview}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>

              </div>
            </ScrollArea>
          </TabsContent>

          {/* ============ CONTENIDO ============ */}
          <TabsContent value="content" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full px-3 pb-6">
              <div className="space-y-4">
                
                {/* Información básica */}
                <CollapsibleSection 
                  title="Información Básica" 
                  icon={<Heart className="w-4 h-4" />}
                  defaultOpen={true}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Nombre 1</Label>
                      <Input
                        value={event.couple?.bride || ""}
                        onChange={(e) => setEvent((p) => ({ ...p, couple: { ...p.couple, bride: e.target.value } }))}
                        className="text-xs mt-1"
                        placeholder="Novia"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Nombre 2</Label>
                      <Input
                        value={event.couple?.groom || ""}
                        onChange={(e) => setEvent((p) => ({ ...p, couple: { ...p.couple, groom: e.target.value } }))}
                        className="text-xs mt-1"
                        placeholder="Novio"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <Label className="text-xs">Fecha</Label>
                      <Input
                        value={event.date || ""}
                        onChange={(e) => setEvent((p) => ({ ...p, date: e.target.value }))}
                        className="text-xs mt-1"
                        placeholder="DD/MM/YYYY"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Hora</Label>
                      <Input
                        value={event.time || ""}
                        onChange={(e) => setEvent((p) => ({ ...p, time: e.target.value }))}
                        className="text-xs mt-1"
                        placeholder="HH:mm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs">Hashtag</Label>
                    <Input
                      value={event.hashtag || ""}
                      onChange={(e) => setEvent((p) => ({ ...p, hashtag: e.target.value }))}
                      className="text-xs mt-1"
                      placeholder="#NuestraBoda"
                    />
                  </div>
                </CollapsibleSection>

                {/* Detalles del evento */}
                <CollapsibleSection 
                  title="Detalles del Evento" 
                  icon={<Church className="w-4 h-4" />}
                >
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Lugar de Ceremonia</Label>
                      <Input
                        value={event.ceremony?.venue || ""}
                        onChange={(e) =>
                          setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, venue: e.target.value } }))
                        }
                        className="text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Dirección de Ceremonia</Label>
                      <Textarea
                        value={event.ceremony?.address || ""}
                        onChange={(e) =>
                          setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, address: e.target.value } }))
                        }
                        className="text-xs mt-1 min-h-[60px]"
                      />
                    </div>

                    <div>
                      <Label className="text-xs">Lugar de Recepción</Label>
                      <Input
                        value={event.reception?.venue || ""}
                        onChange={(e) =>
                          setEvent((p) => ({ ...p, reception: { ...p.reception, venue: e.target.value } }))
                        }
                        className="text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Dirección de Recepción</Label>
                      <Textarea
                        value={event.reception?.address || ""}
                        onChange={(e) =>
                          setEvent((p) => ({ ...p, reception: { ...p.reception, address: e.target.value } }))
                        }
                        className="text-xs mt-1 min-h-[60px]"
                      />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Información bancaria */}
                <CollapsibleSection 
                  title="Información Bancaria" 
                  icon={<CreditCard className="w-4 h-4" />}
                >
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label className="text-xs">Titular</Label>
                      <Input
                        value={event.bank?.titular || ""}
                        onChange={(e) =>
                          setEvent((p) => ({ ...p, bank: { ...(p.bank || {}), titular: e.target.value } }))
                        }
                        className="text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Banco</Label>
                      <Input
                        value={event.bank?.banco || ""}
                        onChange={(e) =>
                          setEvent((p) => ({ ...p, bank: { ...(p.bank || {}), banco: e.target.value } }))
                        }
                        className="text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">CBU / IBAN</Label>
                      <Input
                        value={event.bank?.cbu || ""}
                        onChange={(e) =>
                          setEvent((p) => ({ ...p, bank: { ...(p.bank || {}), cbu: e.target.value } }))
                        }
                        className="text-xs mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Alias</Label>
                      <Input
                        value={event.bank?.alias || ""}
                        onChange={(e) =>
                          setEvent((p) => ({ ...p, bank: { ...(p.bank || {}), alias: e.target.value } }))
                        }
                        className="text-xs mt-1"
                      />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Mesa de regalos */}
                <CollapsibleSection 
                  title="Mesa de Regalos" 
                  icon={<Gift className="w-4 h-4" />}
                >
                  <div className="space-y-3">
                    {(event.gifts || []).map((g, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <Input
                          className="text-xs flex-1"
                          placeholder="Nombre"
                          value={g.label || ""}
                          onChange={(e) => updateGift(idx, "label", e.target.value)}
                        />
                        <Input
                          className="text-xs flex-1"
                          placeholder="URL"
                          value={g.url || ""}
                          onChange={(e) => updateGift(idx, "url", e.target.value)}
                        />
                        <EnhancedButton
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGift(idx)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </EnhancedButton>
                      </div>
                    ))}
                    <EnhancedButton
                      variant="outline"
                      size="sm"
                      onClick={addGift}
                      className="w-full text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Agregar enlace
                    </EnhancedButton>
                  </div>
                </CollapsibleSection>

                {/* Textos personalizables */}
                <CollapsibleSection 
                  title="Textos Personalizables" 
                  icon={<Type className="w-4 h-4" />}
                >
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Nota de Regalos</Label>
                      <Textarea
                        className="text-xs mt-1 min-h-[60px]"
                        value={event.giftsNote || ""}
                        onChange={(e) => setEvent((p) => ({ ...p, giftsNote: e.target.value }))}
                        placeholder="Mensaje para la sección de regalos"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Nota de RSVP</Label>
                      <Textarea
                        className="text-xs mt-1 min-h-[60px]"
                        value={event.rsvpNote || ""}
                        onChange={(e) => setEvent((p) => ({ ...p, rsvpNote: e.target.value }))}
                        placeholder="Mensaje para confirmación de asistencia"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Info Útil</Label>
                      <Textarea
                        className="text-xs mt-1 min-h-[60px]"
                        value={event.info?.help || ""}
                        onChange={(e) =>
                          setEvent((p) => ({ ...p, info: { ...(p.info || {}), help: e.target.value } }))
                        }
                        placeholder="Información sobre alojamiento, transporte, etc."
                      />
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Secciones visibles */}
                <CollapsibleSection 
                  title="Secciones Visibles" 
                  icon={<Eye className="w-4 h-4" />}
                >
                  <div className="grid grid-cols-1 gap-2">
                    {SECTION_KEYS.map(({ key, label, icon }) => (
                      <div key={key} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{icon}</span>
                          <span className="text-sm">{label}</span>
                        </div>
                        <Switch
                          checked={isSectionOn(key)}
                          onCheckedChange={() => toggleSection(key)}
                        />
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

              </div>
            </ScrollArea>
          </TabsContent>

          {/* ============ IMÁGENES ============ */}
          <TabsContent value="images" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full px-3 pb-6">
              <div className="space-y-4">
                
                {/* Panel de imágenes existente */}
                <ImagesPanel event={event} setEvent={setEvent} />

                {/* Galería mejorada */}
                <CollapsibleSection 
                  title="Galería de Fotos" 
                  icon={<ImageIcon className="w-4 h-4" />}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Máximo 6 imágenes</span>
                      <Switch
                        checked={isSectionOn("gallery")}
                        onCheckedChange={() => toggleSection("gallery")}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="relative aspect-square border-2 border-dashed border-gray-300 rounded-lg overflow-hidden group hover:border-gray-400 transition-colors">
                          {gallery[i] ? (
                            <>
                              <img
                                src={gallery[i]}
                                alt={`Galería ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <EnhancedButton
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeGalleryItem(i)}
                                  className="text-white hover:text-red-400"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </EnhancedButton>
                              </div>
                            </>
                          ) : (
                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                              <ImagePlus className="w-6 h-6 mb-1" />
                              <span className="text-xs">Subir foto</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) setGalleryAtFile(i, file);
                                }}
                              />
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>

              </div>
            </ScrollArea>
          </TabsContent>

          {/* ============ PLANTILLAS ============ */}
          <TabsContent value="layout" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full px-3 pb-6">
              <div className="space-y-4">
                
                <CollapsibleSection 
                  title="Plantillas de Diseño" 
                  icon={<Layout className="w-4 h-4" />}
                  defaultOpen={true}
                >
                  <div className="grid grid-cols-1 gap-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className="border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          handleTemplateChange(template.id);
                          if (template.colors) {
                            handleColorChange("primary", template.colors.primary);
                            handleColorChange("secondary", template.colors.secondary);
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{template.preview}</div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{template.name}</h3>
                            <p className="text-xs text-gray-600">{template.description}</p>
                          </div>
                          <div className="flex gap-1">
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: template.colors?.primary }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: template.colors?.secondary }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

              </div>
            </ScrollArea>
          </TabsContent>

        </Tabs>

        {/* Footer con botón de siguiente */}
        <div className="border-t border-gray-200 p-3">
          <EnhancedButton
            onClick={handleNext}
            className="w-full"
            size="lg"
          >
            {ui.activeTab === ORDER[ORDER.length - 1] ? "Finalizar" : "Siguiente"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </EnhancedButton>
        </div>

      </div>
    </>
  );
}

/* =================== HELPERS =================== */

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

async function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}
