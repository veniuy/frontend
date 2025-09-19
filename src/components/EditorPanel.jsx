// src/components/EditorPanel.jsx
import React from "react";
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
} from "lucide-react";
import ImagesPanel from "./ImagesPanel";

/**
 * EditorPanel
 * - Pestaña Color: 8 paletas pedidas + colores personalizados (primary, secondary, text).
 * - Pestaña Contenido: datos bancarios, mesa de regalos (links), textos de secciones.
 * - Pestaña Imágenes: ahora usa <ImagesPanel /> (fondos predefinidos, subir fondo propio, logo y decorativos).
 * - Pestaña Templates: sin cambios.
 * - Cierre en móviles con "X".
 *
 * Props esperadas:
 *  - event, ui
 *  - setActiveTab(value), setShowMobilePanel(bool)
 *  - handleColorChange(key, value)
 *  - handleFontChange(key, value)
 *  - handleTemplateChange(id)
 *  - setEvent(updater)
 */

export default function EditorPanel({
  event,
  ui,
  setActiveTab,
  setShowMobilePanel,
  handleColorChange,
  handleFontChange,
  handleTemplateChange,
  setEvent,
}) {
  /* =================== PALETAS =================== */
  const PALETTES = [
    {
      name: "Champagne",
      tones: [
        { label: "Claro", hex: "#F6E3D4" },
        { label: "Intermedio", hex: "#E1C1A8" },
        { label: "Intermedio", hex: "#D1A880" },
        { label: "Oscuro", hex: "#B8997F" },
      ],
    },
    {
      name: "Boho Chic",
      tones: [
        { label: "Claro", hex: "#EFC4B1" },
        { label: "Intermedio", hex: "#E7B7A2" },
        { label: "Intermedio", hex: "#DBA583" },
        { label: "Oscuro", hex: "#D99873" },
      ],
    },
    {
      name: "Sage & Terracotta",
      tones: [
        { label: "Claro", hex: "#B7B79D" },
        { label: "Intermedio", hex: "#C16D4D" },
        { label: "Intermedio", hex: "#D57555" },
        { label: "Oscuro", hex: "#C96342" },
      ],
    },
    {
      name: "Blush and Gray",
      tones: [
        { label: "Claro", hex: "#EEC9C5" },
        { label: "Intermedio", hex: "#C9C9C9" },
        { label: "Intermedio", hex: "#B9B9B9" },
        { label: "Oscuro", hex: "#8B8B8B" },
      ],
    },
    {
      name: "Just Peachy",
      tones: [
        { label: "Claro", hex: "#F2C3B1" },
        { label: "Intermedio", hex: "#E6B79E" },
        { label: "Intermedio", hex: "#E5A88B" },
        { label: "Oscuro", hex: "#C8C6A8" },
      ],
    },
    {
      name: "Classic Romance",
      tones: [
        { label: "Claro", hex: "#EFEAE6" },
        { label: "Intermedio", hex: "#E7D7D3" },
        { label: "Intermedio", hex: "#B6AFAA" },
        { label: "Oscuro", hex: "#871C2B" },
      ],
    },
    {
      name: "Frosted Winter",
      tones: [
        { label: "Claro", hex: "#C2C4CA" },
        { label: "Intermedio", hex: "#ADB3BB" },
        { label: "Intermedio", hex: "#8F9AA7" },
        { label: "Oscuro", hex: "#245D63" },
      ],
    },
    {
      name: "Rustic Elegance",
      tones: [
        { label: "Claro", hex: "#E0C9C9" },
        { label: "Intermedio", hex: "#C9AFA0" },
        { label: "Intermedio", hex: "#D4CAB0" },
        { label: "Oscuro", hex: "#5A6C48" },
      ],
    },
  ];

  const fontFamilies = [
    "Inter",
    "Helvetica Neue",
    "Arial",
    "Georgia",
    "Times New Roman",
    "Playfair Display",
    "Montserrat",
    "Open Sans",
    "Lato",
    "Roboto",
  ];

  const templates = [
    { id: "elegant", name: "Elegante", description: "Diseño sofisticado y minimalista" },
    { id: "romantic", name: "Romántico", description: "Colores suaves y florales" },
    { id: "modern", name: "Moderno", description: "Diseño contemporáneo y vibrante" },
    { id: "classic", name: "Clásico", description: "Estilo tradicional y atemporal" },
  ];

  /* =================== Helpers =================== */
  const applyPalette = (tones) => {
    // Mapeo: primary = Intermedio 2 (tones[2]), secondary = Oscuro (tones[3]), text = Oscuro (tones[3])
    const primary = tones[2]?.hex || event.colors?.primary || "#8FAF86";
    const secondary = tones[3]?.hex || event.colors?.secondary || "#D4B28A";
    const text = tones[3]?.hex || event.colors?.text || "#2E2E2E";

    handleColorChange("primary", primary);
    handleColorChange("secondary", secondary);
    handleColorChange("text", text);
  };

  const addGift = () =>
    setEvent((p) => ({
      ...p,
      gifts: [...(p.gifts || []), { label: "Mesa de regalos", url: "" }],
    }));

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

  /* =================== Render =================== */
  return (
    <div
      className={
        ui.isMobile
          ? `fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
              ui.showMobilePanel ? "translate-x-0" : "-translate-x-full"
            } overflow-y-auto`
          : "w-80 bg-white border-r border-gray-200 overflow-y-auto"
      }
    >
      {/* Barra superior (solo mobile) con X para cerrar */}
      {ui.isMobile && (
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-200 px-3 py-2">
          <div className="text-sm font-medium">Editor</div>
          <button
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => setShowMobilePanel(false)}
            aria-label="Cerrar panel"
            title="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
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
        <TabsContent value="design" className="space-y-4 px-4 pb-4">
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
                      Aplicar paleta
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {p.tones.map((t, i) => (
                      <div key={t.hex} className="flex flex-col items-center">
                        <button
                          className="w-9 h-9 rounded border-2 border-gray-200 hover:border-gray-400"
                          style={{ backgroundColor: t.hex }}
                          onClick={() => handleColorChange("primary", t.hex)}
                          title={`${t.label} · Usar como primario`}
                        />
                        <span className="text-[10px] text-gray-600 mt-1">
                          {i === 3 ? "Oscuro" : t.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-2">
                    Mapeo al aplicar: <b>Primario</b> = Intermedio 2, <b>Secundario</b> = Oscuro, <b>Texto</b> = Oscuro.
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
              {["primary", "secondary", "text"].map((key) => (
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

        {/* ============ CONTENIDO (BÁSICO + BANCO + REGALOS + TEXTOS) ============ */}
        <TabsContent value="content" className="space-y-4 px-4 pb-4">
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
                    setEvent((p) => ({
                      ...p,
                      couple: { ...p.couple, bride: e.target.value },
                    }))
                  }
                  className="text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Novio</Label>
                <Input
                  value={event.couple?.groom || ""}
                  onChange={(e) =>
                    setEvent((p) => ({
                      ...p,
                      couple: { ...p.couple, groom: e.target.value },
                    }))
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
                    setEvent((p) => ({
                      ...p,
                      ceremony: { ...p.ceremony, venue: e.target.value },
                    }))
                  }
                  className="text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Dirección de Ceremonia</Label>
                <Textarea
                  value={event.ceremony?.address || ""}
                  onChange={(e) =>
                    setEvent((p) => ({
                      ...p,
                      ceremony: { ...p.ceremony, address: e.target.value },
                    }))
                  }
                  className="text-xs mt-1 min-h-[60px]"
                />
              </div>

              <div>
                <Label className="text-xs">Lugar de Recepción</Label>
                <Input
                  value={event.reception?.venue || ""}
                  onChange={(e) =>
                    setEvent((p) => ({
                      ...p,
                      reception: { ...p.reception, venue: e.target.value },
                    }))
                  }
                  className="text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Dirección de Recepción</Label>
                <Textarea
                  value={event.reception?.address || ""}
                  onChange={(e) =>
                    setEvent((p) => ({
                      ...p,
                      reception: { ...p.reception, address: e.target.value },
                    }))
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

          {/* Textos de secciones (para InvitationCanvas) */}
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
        </TabsContent>

        {/* ============ IMÁGENES (usa ImagesPanel) ============ */}
        <TabsContent value="images" className="px-4 pb-4">
          <ImagesPanel event={event} setEvent={setEvent} />
        </TabsContent>

        {/* ============ TEMPLATES ============ */}
        <TabsContent value="layout" className="px-4 pb-4">
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
  );
}
