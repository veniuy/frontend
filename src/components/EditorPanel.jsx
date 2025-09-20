// src/components/EditorPanel.jsx
import React, { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  ChevronLeft,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  AlertTriangle,
  ImagePlus,
  Link as LinkIcon,
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
  onSave, // opcional
}) {
  /* =================== PALETAS =================== */
  const PALETTES = useMemo(
    () => [
      { name: "Champagne", tones: [{ hex: "#F6E3D4" }, { hex: "#E1C1A8" }, { hex: "#D1A880" }, { hex: "#B8997F" }] },
      { name: "Boho Chic", tones: [{ hex: "#EFC4B1" }, { hex: "#E7B7A2" }, { hex: "#DBA583" }, { hex: "#D99873" }] },
      { name: "Sage & Terracotta", tones: [{ hex: "#B7B79D" }, { hex: "#C16D4D" }, { hex: "#D57555" }, { hex: "#C96342" }] },
      { name: "Blush and Gray", tones: [{ hex: "#EEC9C5" }, { hex: "#C9C9C9" }, { hex: "#B9B9B9" }, { hex: "#8B8B8B" }] },
      { name: "Just Peachy", tones: [{ hex: "#F2C3B1" }, { hex: "#E6B79E" }, { hex: "#E5A88B" }, { hex: "#C8C6A8" }] },
      { name: "Classic Romance", tones: [{ hex: "#EFEAE6" }, { hex: "#E7D7D3" }, { hex: "#B6AFAA" }, { hex: "#871C2B" }] },
      { name: "Frosted Winter", tones: [{ hex: "#C2C4CA" }, { hex: "#ADB3BB" }, { hex: "#8F9AA7" }, { hex: "#245D63" }] },
      { name: "Rustic Elegance", tones: [{ hex: "#E0C9C9" }, { hex: "#C9AFA0" }, { hex: "#D4CAB0" }, { hex: "#5A6C48" }] },
    ],
    []
  );

  const fontFamilies = [
    "Inter, system-ui, sans-serif",
    "'Great Vibes', cursive",
    "'Playfair Display', serif",
    "Cardo, serif",
    "'Pinyon Script', cursive",
    "'Cormorant Garamond', serif",
    "Bellefair, serif",
    "'Alex Brush', cursive",
    "Tangerine, cursive",
    "Montserrat, sans-serif",
    "Open Sans, sans-serif",
    "Lato, sans-serif",
  ];

  const templates = [
    { id: "elegant", name: "Elegante", description: "Diseño sofisticado y minimalista" },
    { id: "romantic", name: "Romántico", description: "Colores suaves y florales" },
    { id: "modern", name: "Moderno", description: "Diseño contemporáneo y vibrante" },
    { id: "classic", name: "Clásico", description: "Estilo tradicional y atemporal" },
  ];

  /* =================== Estado local (errores/feedback) =================== */
  const [errors, setErrors] = useState([]);
  const [saved, setSaved] = useState(false);

  /* =================== Helpers =================== */
  const applyPalette = (tones) => {
    // primary = Intermedio 2 (tones[2])
    // secondary = Oscuro (tones[3])
    // text = Oscuro (tones[3])
    // dark = Oscuro (tones[3])
    const primary = tones[2]?.hex || event.colors?.primary || "#8FAF86";
    const secondary = tones[3]?.hex || event.colors?.secondary || "#D4B28A";
    const text = tones[3]?.hex || event.colors?.text || "#2E2E2E";
    const dark = tones[3]?.hex || event.colors?.dark || "#1F2937";
    handleColorChange("primary", primary);
    handleColorChange("secondary", secondary);
    handleColorChange("text", text);
    handleColorChange("dark", dark);
  };

  const addGift = () =>
    setEvent((p) => ({ ...p, gifts: [...(p.gifts || []), { label: "Mesa de regalos", url: "" }] }));

  const updateGift = (idx, key, value) =>
    setEvent((p) => {
      const arr = [...(p.gifts || [])];
      arr[idx] = { ...arr[idx], [key]: value };
      return { ...p, gifts: arr };
    });

  const removeGift = (idx) =>
    setEvent((p) => {
      const arr = [...(p.gifts || [])];
      arr.splice(idx, 1);
      return { ...p, gifts: arr };
    });

  // Info útil: alojamiento / transporte
  const addLodging = () =>
    setEvent((p) => ({
      ...p,
      info: { ...(p.info || {}), lodging: [...(p.info?.lodging || []), { name: "", url: "" }] },
    }));
  const updateLodging = (i, k, v) =>
    setEvent((p) => {
      const arr = [...(p.info?.lodging || [])];
      arr[i] = { ...arr[i], [k]: v };
      return { ...p, info: { ...(p.info || {}), lodging: arr } };
    });
  const removeLodging = (i) =>
    setEvent((p) => {
      const arr = [...(p.info?.lodging || [])];
      arr.splice(i, 1);
      return { ...p, info: { ...(p.info || {}), lodging: arr } };
    });

  const addTransport = () =>
    setEvent((p) => ({
      ...p,
      info: { ...(p.info || {}), transport: [...(p.info?.transport || []), { name: "", note: "", url: "" }] },
    }));
  const updateTransport = (i, k, v) =>
    setEvent((p) => {
      const arr = [...(p.info?.transport || [])];
      arr[i] = { ...arr[i], [k]: v };
      return { ...p, info: { ...(p.info || {}), transport: arr } };
    });
  const removeTransport = (i) =>
    setEvent((p) => {
      const arr = [...(p.info?.transport || [])];
      arr.splice(i, 1);
      return { ...p, info: { ...(p.info || {}), transport: arr } };
    });

  /* ===== Galería (6 fotos) con subida de archivos (base64) ===== */
  const gallery = (event.images?.gallery || []).slice(0, 6);
  const setGallery = (arr) => setEvent((p) => ({ ...p, images: { ...(p.images || {}), gallery: arr.slice(0, 6) } }));

  const setGalleryAtFile = async (i, file) => {
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    const arr = [...gallery];
    arr[i] = dataUrl;
    setGallery(arr);
  };
  const removeGalleryItem = (i) => setGallery(gallery.filter((_, idx) => idx !== i));

  const SECTION_KEYS = [
    { key: "ceremony", label: "Ceremonia" },
    { key: "reception", label: "Fiesta" },
    { key: "bank", label: "Cuenta bancaria" },
    { key: "songs", label: "Canciones" },
    { key: "info", label: "Info útil" },
    { key: "dresscode", label: "Dress code" },
    { key: "instagram", label: "Instagram" },
    { key: "gallery", label: "Galería" }, // NUEVO switch de galería
  ];

  const isSectionOn = (k) => {
    const s = event.sections || {};
    return s[k] !== false; // por defecto true
  };

  const toggleSection = (k) =>
    setEvent((p) => ({ ...p, sections: { ...(p.sections || {}), [k]: !(p.sections?.[k] !== false) } }));

  const doSave = async () => {
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
  };

  const ORDER = ["design", "content", "images", "layout"];
  const goNextTab = () => {
    const idx = ORDER.indexOf(ui.activeTab);
    const next = ORDER[Math.min(ORDER.length - 1, idx + 1)];
    setActiveTab(next);
  };
  const goPrevTab = () => {
    const idx = ORDER.indexOf(ui.activeTab);
    const prev = ORDER[Math.max(0, idx - 1)];
    setActiveTab(prev);
  };
  const canGoPrev = ORDER.indexOf(ui.activeTab) > 0;

  const validate = () => {
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
  };

  const handleNext = () => {
    const errs = validate();
    setErrors(errs);
    if (errs.length === 0) {
      goNextTab();
    }
  };

  /* =================== Render =================== */
  return (
    <>
      {/* TOOLBAR MÓVIL EN CANVAS (panel cerrado): Hamburger + ← + Guardar + → + Siguiente */}
      {ui.isMobile && !ui.showMobilePanel && (
        <div className="fixed top-2 left-2 right-2 z-40 flex items-center gap-2">
          <button
            className="rounded-full shadow p-3 bg-white border border-gray-200 hover:bg-gray-50 active:scale-95 transition"
            onClick={() => setShowMobilePanel(true)}
            aria-label="Abrir editor"
            title="Abrir editor"
          >
            <Menu className="w-6 h-6" />
          </button>

          <button
            className={`inline-flex items-center gap-2 text-sm px-3 py-2 rounded border ${
              canGoPrev ? "border-gray-300 bg-white hover:bg-gray-50" : "border-gray-200 bg-gray-100 opacity-60"
            }`}
            onClick={goPrevTab}
            disabled={!canGoPrev}
            aria-label="Anterior"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50"
            onClick={doSave}
            aria-label="Guardar cambios"
            title="Guardar cambios"
          >
            <SaveIcon className="w-4 h-4" />
            Guardar
          </button>

          <button
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50"
            onClick={goNextTab}
            aria-label="Adelante"
            title="Adelante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            className="ml-auto inline-flex items-center gap-2 text-sm px-3 py-2 rounded bg-black text-white hover:opacity-90"
            onClick={handleNext}
            aria-label="Siguiente"
            title="Siguiente"
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <div
        className={
          ui.isMobile
            ? `fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
                ui.showMobilePanel ? "translate-x-0" : "-translate-x-full"
              } overflow-y-auto`
            : "w-80 bg-white border-r border-gray-200 overflow-y-auto"
        }
      >
        {/* Barra superior del PANEL (móvil): Hamburger(cerrar) + ← + Guardar + → + Siguiente + estado */}
        {ui.isMobile && (
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-3 py-2 gap-2">
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded hover:bg-gray-100"
                  onClick={() => setShowMobilePanel(false)}
                  aria-label="Cerrar panel"
                  title="Cerrar panel"
                >
                  <Menu className="h-5 w-5" />
                </button>

                <button
                  className={`inline-flex items-center gap-2 text-sm px-3 py-2 rounded border ${
                    canGoPrev ? "border-gray-300 bg-white hover:bg-gray-50" : "border-gray-200 bg-gray-100 opacity-60"
                  }`}
                  onClick={goPrevTab}
                  disabled={!canGoPrev}
                  aria-label="Anterior"
                  title="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50"
                  onClick={doSave}
                  aria-label="Guardar cambios"
                  title="Guardar cambios"
                >
                  <SaveIcon className="w-4 h-4" />
                  Guardar
                </button>

                <button
                  className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50"
                  onClick={goNextTab}
                  aria-label="Adelante"
                  title="Adelante"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded bg-black text-white hover:opacity-90"
                  onClick={handleNext}
                  aria-label="Siguiente"
                  title="Siguiente"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {saved && (
                  <span className="inline-flex items-center text-xs text-green-600">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Guardado
                  </span>
                )}
                <button
                  className="p-1 rounded hover:bg-gray-100"
                  onClick={() => setShowMobilePanel(false)}
                  aria-label="Cerrar"
                  title="Cerrar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {errors.length > 0 && (
              <div className="mx-3 mb-2 rounded border border-red-200 bg-red-50 p-2 text-[12px] text-red-700">
                <div className="flex items-center gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4" /> Revisa estos puntos
                </div>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {errors.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <Tabs value={ui.activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4 p-1 m-4">
            <TabsTrigger value="design" className="flex flex-col items-center gap-1 p-2">
              <Palette className="h-4 w-4" />
              <span className="text-xs">Color</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex flex-col items-center gap-1 p-2">
              <Type className="h-4 w-4" />
              <span className="text-xs">Contenido</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="flex flex-col items-center gap-1 p-2">
              <ImageIcon className="h-4 w-4" />
              <span className="text-xs">Imágenes</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex flex-col items-center gap-1 p-2">
              <Layout className="h-4 w-4" />
              <span className="text-xs">Templates</span>
            </TabsTrigger>
          </TabsList>

          {/* ============ COLOR (PALETAS + PERSONALIZADOS) ============ */}
          <TabsContent value="design" className="space-y-4 px-4 pb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Paletas de Colores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {PALETTES.map((p) => (
                  <div key={p.name} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium">{p.name}</Label>
                      <button
                        className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                        onClick={() => applyPalette(p.tones)}
                        title="Aplicar paleta completa"
                      >
                        Aplicar
                      </button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {p.tones.map((t) => (
                        <div key={t.hex} className="flex flex-col items-center">
                          <button
                            className="w-9 h-9 rounded border-2 border-gray-200 hover:border-gray-400"
                            style={{ backgroundColor: t.hex }}
                            onClick={() => handleColorChange("primary", t.hex)}
                            title={`Usar ${t.hex} como primario`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-2">
                      Mapeo al aplicar: <b>Primario</b>=Intermedio 2 · <b>Secundario</b>=Oscuro ·{" "}
                      <b>Texto</b>=Oscuro · <b>Dark</b>=Oscuro.
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Colores Personalizados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["primary", "secondary", "text", "dark"].map((key) => (
                  <div key={key}>
                    <Label className="text-xs capitalize">Color {key}</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={event.colors?.[key] || "#000000"}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-12 h-8 p-0 border-0"
                        aria-label={`Color ${key}`}
                      />
                      <Input
                        value={event.colors?.[key] || ""}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="flex-1 text-xs"
                        placeholder="#RRGGBB"
                      />
                    </div>
                    {key === "dark" && (
                      <p className="text-[10px] text-gray-500 mt-1">Usado en “Dress code” y “Footer”.</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Tipografía</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["primary", "secondary"].map((t) => (
                  <div key={t}>
                    <Label className="text-xs">Fuente {t}</Label>
                    <select
                      value={event.fonts?.[t] || ""}
                      onChange={(e) => handleFontChange(t, e.target.value)}
                      className="w-full mt-1 p-2 border rounded text-sm"
                    >
                      {fontFamilies.map((f) => (
                        <option key={f} value={f} style={{ fontFamily: f }}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============ CONTENIDO (BÁSICO + BANCO + REGALOS + INFO ÚTIL + SECCIONES) ============ */}
          <TabsContent value="content" className="space-y-4 px-4 pb-6">
            {/* Información de la Pareja */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Información de la Pareja</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Novia</Label>
                  <Input
                    value={event.couple?.bride || ""}
                    onChange={(e) =>
                      setEvent((p) => ({ ...p, couple: { ...p.couple, bride: e.target.value } }))
                    }
                    className="text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Novio</Label>
                  <Input
                    value={event.couple?.groom || ""}
                    onChange={(e) =>
                      setEvent((p) => ({ ...p, couple: { ...p.couple, groom: e.target.value } }))
                    }
                    className="text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Hashtag</Label>
                  <div className="flex gap-2 mt-1 items-center">
                    <Hash className="w-4 h-4 text-gray-500" />
                    <Input
                      value={event.hashtag || ""}
                      onChange={(e) => setEvent((p) => ({ ...p, hashtag: e.target.value }))}
                      className="text-xs"
                      placeholder="#NuestraBoda"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detalles del Evento */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Detalles del Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Fecha</Label>
                  <Input
                    value={event.date || ""}
                    onChange={(e) => setEvent((p) => ({ ...p, date: e.target.value }))}
                    className="text-xs mt-1"
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
              </CardContent>
            </Card>

            {/* Transferencias / Banco */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Transferencias / Banco
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3">
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
                  <Label className="text-xs">Cuenta</Label>
                  <Input
                    value={event.bank?.cuenta || ""}
                    onChange={(e) =>
                      setEvent((p) => ({ ...p, bank: { ...(p.bank || {}), cuenta: e.target.value } }))
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
                  <Label className="text-xs">Nota</Label>
                  <Textarea
                    value={event.bank?.nota || ""}
                    onChange={(e) =>
                      setEvent((p) => ({ ...p, bank: { ...(p.bank || {}), nota: e.target.value } }))
                    }
                    className="text-xs mt-1 min-h-[60px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Mesa de Regalos */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Gift className="w-4 h-4" /> Mesa de Regalos (links)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(event.gifts || []).map((g, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                    <Input
                      className="text-xs"
                      placeholder="Nombre (Amazon, Falabella...)"
                      value={g.label || ""}
                      onChange={(e) => updateGift(idx, "label", e.target.value)}
                    />
                    <Input
                      className="text-xs"
                      placeholder="URL"
                      value={g.url || ""}
                      onChange={(e) => updateGift(idx, "url", e.target.value)}
                    />
                    <button
                      className="px-2 py-2 rounded border border-red-300 text-red-700 hover:bg-red-50"
                      onClick={() => removeGift(idx)}
                      title="Quitar"
                      aria-label="Quitar enlace"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  className="text-xs inline-flex items-center gap-1 px-3 py-2 rounded border border-gray-300 hover:bg-gray-50"
                  onClick={addGift}
                >
                  <Plus className="w-3 h-3" /> Agregar enlace
                </button>
              </CardContent>
            </Card>

            {/* Textos de secciones */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Textos de Secciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Nota de Regalos</Label>
                  <Textarea
                    className="text-xs mt-1 min-h-[60px]"
                    value={event.giftsNote || ""}
                    onChange={(e) => setEvent((p) => ({ ...p, giftsNote: e.target.value }))}
                    placeholder="Mensaje para la sección de regalos / transferencias"
                  />
                </div>
                <div>
                  <Label className="text-xs">Nota de RSVP</Label>
                  <Textarea
                    className="text-xs mt-1 min-h-[60px]"
                    value={event.rsvpNote || ""}
                    onChange={(e) => setEvent((p) => ({ ...p, rsvpNote: e.target.value }))}
                    placeholder="Mensaje para la sección de confirmación"
                  />
                </div>
                <div>
                  <Label className="text-xs">Info útil</Label>
                  <Textarea
                    className="text-xs mt-1 min-h-[60px]"
                    value={event.info?.help || ""}
                    onChange={(e) =>
                      setEvent((p) => ({ ...p, info: { ...(p.info || {}), help: e.target.value } }))
                    }
                    placeholder="Sugerencias de alojamientos, traslados, etc."
                  />
                </div>
                <div>
                  <Label className="text-xs">Dress code</Label>
                  <Input
                    className="text-xs mt-1"
                    value={event.info?.dresscode || ""}
                    onChange={(e) =>
                      setEvent((p) => ({ ...p, info: { ...(p.info || {}), dresscode: e.target.value } }))
                    }
                    placeholder="Vestimenta formal, elegante…"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Info útil → Alojamiento */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Alojamiento recomendado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(event.info?.lodging || []).map((h, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                    <Input
                      className="text-xs"
                      placeholder="Nombre del hotel / lugar"
                      value={h.name || ""}
                      onChange={(e) => updateLodging(i, "name", e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        className="text-xs flex-1"
                        placeholder="URL (opcional)"
                        value={h.url || ""}
                        onChange={(e) => updateLodging(i, "url", e.target.value)}
                      />
                      <a
                        href={h.url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center px-2 border rounded text-gray-600 hover:bg-gray-50"
                        title="Abrir"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    </div>
                    <button
                      className="px-2 py-2 rounded border border-red-300 text-red-700 hover:bg-red-50"
                      onClick={() => removeLodging(i)}
                      title="Quitar"
                      aria-label="Quitar alojamiento"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  className="text-xs inline-flex items-center gap-1 px-3 py-2 rounded border border-gray-300 hover:bg-gray-50"
                  onClick={addLodging}
                >
                  <Plus className="w-3 h-3" /> Agregar alojamiento
                </button>
              </CardContent>
            </Card>

            {/* Info útil → Transporte */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Transporte / Traslados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(event.info?.transport || []).map((t, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                    <Input
                      className="text-xs"
                      placeholder="Nombre (empresa, taxi, remis...)"
                      value={t.name || ""}
                      onChange={(e) => updateTransport(i, "name", e.target.value)}
                    />
                    <Input
                      className="text-xs"
                      placeholder="Nota (teléfono, horario, tarifa...)"
                      value={t.note || ""}
                      onChange={(e) => updateTransport(i, "note", e.target.value)}
                    />
                    <button
                      className="px-2 py-2 rounded border border-red-300 text-red-700 hover:bg-red-50"
                      onClick={() => removeTransport(i)}
                      title="Quitar"
                      aria-label="Quitar transporte"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  className="text-xs inline-flex items-center gap-1 px-3 py-2 rounded border border-gray-300 hover:bg-gray-50"
                  onClick={addTransport}
                >
                  <Plus className="w-3 h-3" /> Agregar transporte
                </button>
              </CardContent>
            </Card>

            {/* Switches de secciones (encendido/apagado) */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Secciones visibles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {SECTION_KEYS.map(({ key, label }) => {
                  const on = isSectionOn(key);
                  return (
                    <button
                      key={key}
                      className="w-full flex items-center justify-between rounded border border-gray-200 hover:bg-gray-50 px-3 py-2 text-sm"
                      onClick={() => toggleSection(key)}
                      aria-label={`Alternar sección ${label}`}
                      title={`Alternar sección ${label}`}
                    >
                      <span>{label}</span>
                      {on ? (
                        <span className="inline-flex items-center text-green-600">
                          <ToggleRight className="w-5 h-5 mr-1" /> ON
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-gray-500">
                          <ToggleLeft className="w-5 h-5 mr-1" /> OFF
                        </span>
                      )}
                    </button>
                  );
                })}
                <p className="text-[11px] text-gray-500">
                  * El lienzo debe respetar <code>event.sections</code> para ocultar/mostrar cada bloque.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============ IMÁGENES (fondos/logo + Galería) ============ */}
          <TabsContent value="images" className="px-4 pb-8 space-y-4">
            {/* Panel existente (fondos, logo, etc.) */}
            <ImagesPanel event={event} setEvent={setEvent} />

            {/* Editor de Galería (6 fotos) — subida de archivos + switch ON/OFF */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Galería (máx. 6 imágenes)</CardTitle>
                  <button
                    className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
                    onClick={() => toggleSection("gallery")}
                    aria-label="Alternar galería"
                    title="Alternar galería"
                  >
                    {isSectionOn("gallery") ? (
                      <>
                        <ToggleRight className="w-4 h-4 text-green-600" /> ON
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-4 h-4 text-gray-500" /> OFF
                      </>
                    )}
                  </button>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const url = gallery[i] || "";
                    return (
                      <div key={i} className="border rounded-lg p-2">
                        <div className="aspect-[4/3] bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                          {url ? (
                            <img src={url} alt={`img-${i + 1}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <ImagePlus className="w-4 h-4" /> Sin imagen
                            </div>
                          )}
                        </div>

                        <div className="mt-2 flex gap-2">
                          <label className="inline-flex items-center justify-center text-xs px-3 py-2 rounded border border-gray-300 hover:bg-gray-50 cursor-pointer">
                            Cargar
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => setGalleryAtFile(i, e.target.files?.[0])}
                            />
                          </label>

                          {url && (
                            <button
                              className="px-2 py-2 rounded border border-red-300 text-red-700 hover:bg-red-50"
                              onClick={() => removeGalleryItem(i)}
                              title="Quitar"
                              aria-label="Quitar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-gray-500">
                  Se guardan como imágenes embebidas (base64) para que persistan al guardar el borrador.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ============ TEMPLATES ============ */}
          <TabsContent value="layout" className="px-4 pb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Plantillas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {templates.map((t) => (
                  <div
                    key={t.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer ${
                      ui.selectedTemplate === t.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleTemplateChange(t.id)}
                  >
                    <h4 className="font-medium text-sm">{t.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{t.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

/* ===== helpers ===== */
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = (e) => reject(e);
    fr.readAsDataURL(file);
  });
}
               
