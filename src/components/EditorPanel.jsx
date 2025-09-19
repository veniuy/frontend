// src/components/EditorPanel.jsx
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Palette, Type, Image as ImageIcon, Layout } from "lucide-react";

export default function EditorPanel({
  event, ui, setActiveTab, setShowMobilePanel,
  handleColorChange, handleFontChange, handleTemplateChange, setEvent
}) {
  const colorPalettes = [
    { name: "Clásico", colors: ["#1a1a1a", "#ffffff", "#f5f5f5", "#e5e5e5", "#cccccc"] },
    { name: "Elegante", colors: ["#2c3e50", "#ecf0f1", "#e74c3c", "#f39c12", "#9b59b6"] },
    { name: "Moderno", colors: ["#34495e", "#3498db", "#2ecc71", "#f1c40f", "#e67e22"] },
    { name: "Romántico", colors: ["#8e44ad", "#e91e63", "#ffc0cb", "#fff0f5", "#ffe4e1"] },
    { name: "Natural", colors: ["#27ae60", "#2ecc71", "#f39c12", "#e67e22", "#d35400"] }
  ];
  const fontFamilies = ["Inter","Helvetica Neue","Arial","Georgia","Times New Roman","Playfair Display","Montserrat","Open Sans","Lato","Roboto"];
  const templates = [
    { id: "elegant", name: "Elegante", description: "Diseño sofisticado y minimalista" },
    { id: "romantic", name: "Romántico", description: "Colores suaves y florales" },
    { id: "modern", name: "Moderno", description: "Diseño contemporáneo y vibrante" },
    { id: "classic", name: "Clásico", description: "Estilo tradicional y atemporal" },
  ];

  return (
    <div className={
      ui.isMobile
        ? `fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ${ui.showMobilePanel ? "translate-x-0" : "-translate-x-full"} overflow-y-auto`
        : "w-80 bg-white border-r border-gray-200 overflow-y-auto"
    }>
      <Tabs value={ui.activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-4 p-1 m-4">
          <TabsTrigger value="design" className="flex flex-col items-center gap-1 p-2"><Palette className="h-4 w-4"/><span className="text-xs">Diseño</span></TabsTrigger>
          <TabsTrigger value="content" className="flex flex-col items-center gap-1 p-2"><Type className="h-4 w-4"/><span className="text-xs">Contenido</span></TabsTrigger>
          <TabsTrigger value="images" className="flex flex-col items-center gap-1 p-2"><ImageIcon className="h-4 w-4"/><span className="text-xs">Imágenes</span></TabsTrigger>
          <TabsTrigger value="layout" className="flex flex-col items-center gap-1 p-2"><Layout className="h-4 w-4"/><span className="text-xs">Templates</span></TabsTrigger>
        </TabsList>

        {/* Diseño */}
        <TabsContent value="design" className="space-y-4 px-4 pb-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Paletas de Colores</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {colorPalettes.map((p) => (
                <div key={p.name}>
                  <Label className="text-xs font-medium">{p.name}</Label>
                  <div className="flex gap-2 mt-1">
                    {p.colors.map((c) => (
                      <button key={c} className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400"
                        style={{ backgroundColor: c }}
                        onClick={() => handleColorChange("primary", c)} />
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Colores Personalizados</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {["primary","secondary","text"].map((key) => (
                <div key={key}>
                  <Label className="text-xs">Color {key}</Label>
                  <div className="flex gap-2 mt-1">
                    <Input type="color" value={event.colors[key]} onChange={(e)=>handleColorChange(key, e.target.value)} className="w-12 h-8 p-0 border-0"/>
                    <Input value={event.colors[key]} onChange={(e)=>handleColorChange(key, e.target.value)} className="flex-1 text-xs"/>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Tipografía</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {["primary","secondary"].map((t)=>(
                <div key={t}>
                  <Label className="text-xs">Fuente {t}</Label>
                  <select value={event.fonts[t]} onChange={(e)=>handleFontChange(t, e.target.value)} className="w-full mt-1 p-2 border rounded text-sm">
                    {fontFamilies.map((f)=> <option key={f} value={f} style={{fontFamily:f}}>{f}</option>)}
                  </select>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenido */}
        <TabsContent value="content" className="space-y-4 px-4 pb-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Información de la Pareja</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><Label className="text-xs">Novia</Label>
                <Input value={event.couple.bride} onChange={(e)=>setEvent((p)=>({...p, couple:{...p.couple, bride:e.target.value}}))} className="text-xs mt-1"/></div>
              <div><Label className="text-xs">Novio</Label>
                <Input value={event.couple.groom} onChange={(e)=>setEvent((p)=>({...p, couple:{...p.couple, groom:e.target.value}}))} className="text-xs mt-1"/></div>
              <div><Label className="text-xs">Hashtag</Label>
                <Input value={event.hashtag} onChange={(e)=>setEvent((p)=>({...p, hashtag:e.target.value}))} className="text-xs mt-1"/></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Detalles del Evento</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><Label className="text-xs">Fecha</Label>
                <Input value={event.date} onChange={(e)=>setEvent((p)=>({...p, date:e.target.value}))} className="text-xs mt-1"/></div>
              <div><Label className="text-xs">Lugar de Ceremonia</Label>
                <Input value={event.ceremony.venue} onChange={(e)=>setEvent((p)=>({...p, ceremony:{...p.ceremony, venue:e.target.value}}))} className="text-xs mt-1"/></div>
              <div><Label className="text-xs">Dirección de Ceremonia</Label>
                <Textarea value={event.ceremony.address} onChange={(e)=>setEvent((p)=>({...p, ceremony:{...p.ceremony, address:e.target.value}}))} className="text-xs mt-1 min-h-[60px]"/></div>
              <div><Label className="text-xs">Lugar de Recepción</Label>
                <Input value={event.reception.venue} onChange={(e)=>setEvent((p)=>({...p, reception:{...p.reception, venue:e.target.value}}))} className="text-xs mt-1"/></div>
              <div><Label className="text-xs">Dirección de Recepción</Label>
                <Textarea value={event.reception.address} onChange={(e)=>setEvent((p)=>({...p, reception:{...p.reception, address:e.target.value}}))} className="text-xs mt-1 min-h-[60px]"/></div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Imágenes y Templates (igual que ahora)… */}
        <TabsContent value="images" className="px-4 pb-4">
          {/* Deja aquí tu uploader actual */}
        </TabsContent>
        <TabsContent value="layout" className="px-4 pb-4">
          <Card><CardHeader className="pb-3"><CardTitle className="text-sm">Plantillas</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {templates.map((t)=>(
                <div key={t.id}
                  className={`p-3 border-2 rounded-lg cursor-pointer ${ui.selectedTemplate===t.id ? "border-blue-500 bg-blue-50":"border-gray-200 hover:border-gray-300"}`}
                  onClick={()=>handleTemplateChange(t.id)}>
                  <h4 className="font-medium text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{t.description}</p>
                </div>
              ))}
            </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
