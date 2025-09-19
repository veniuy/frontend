// src/components/ImagesPanel.jsx
import React, { useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Upload, Trash2, Check } from "lucide-react";
import { asset, onImgError } from "../utils/assets";

/**
 * ImagesPanel
 * - Permite elegir 8 fondos predefinidos de /src/assets
 * - Permite subir fondo propio (heroTexture)
 * - Permite subir logo (event.images.logo)
 * - Opcional: elegir/subir decorativos superior/inferior (heroTop / heroBottom)
 * - Escribe en event.images.{heroTexture, heroTop, heroBottom, logo}
 */
export default function ImagesPanel({ event, setEvent }) {
  const [localHero, setLocalHero] = useState(null); // object URL de subida
  const [localLogo, setLocalLogo] = useState(null); // object URL de subida
  const [localTop, setLocalTop] = useState(null);
  const [localBottom, setLocalBottom] = useState(null);

  const heroInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const topInputRef = useRef(null);
  const bottomInputRef = useRef(null);

  const PRESETS = useMemo(
    () => [
      { id: "categoria_boda_grid",   label: "Boda Grid",            src: asset("src/assets/categoria_boda_grid.webp") },
      { id: "categoria_cumpleanos",  label: "Cumpleaños",           src: asset("src/assets/categoria_cumpleanos.webp") },
      { id: "categoria_inv_digit",   label: "Invitaciones Digitales",src: asset("src/assets/categoria_invitaciones_digitales.webp") },
      { id: "categoria_productos",   label: "Productos & Fotos",    src: asset("src/assets/categoria_productos_fotos.webp") },
      { id: "elegant_floral",        label: "Elegant Floral",       src: asset("src/assets/elegant-floral.jpg") },
      { id: "hero_bottom_png",       label: "Hero Pattern",         src: asset("src/assets/hero_bottom.png") },
      { id: "portada",               label: "Portada",              src: asset("src/assets/portada.webp") },
      { id: "portada1",              label: "Portada 1",            src: asset("src/assets/portada1.webp") },
    ],
    []
  );

  const currentHero = event.images?.heroTexture;
  const currentTop = event.images?.heroTop;
  const currentBottom = event.images?.heroBottom;
  const currentLogo = event.images?.logo;

  const setHero = (src) =>
    setEvent((p) => ({ ...p, images: { ...(p.images || {}), heroTexture: src } }));

  const setTop = (src) =>
    setEvent((p) => ({ ...p, images: { ...(p.images || {}), heroTop: src } }));

  const setBottom = (src) =>
    setEvent((p) => ({ ...p, images: { ...(p.images || {}), heroBottom: src } }));

  const setLogo = (src) =>
    setEvent((p) => ({ ...p, images: { ...(p.images || {}), logo: src } }));

  const handleUpload = (e, kind) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (kind === "hero") {
      setLocalHero(url);
      setHero(url);
    } else if (kind === "logo") {
      setLocalLogo(url);
      setLogo(url);
    } else if (kind === "top") {
      setLocalTop(url);
      setTop(url);
    } else if (kind === "bottom") {
      setLocalBottom(url);
      setBottom(url);
    }
  };

  const resetDefaults = () => {
    setLocalHero(null);
    setLocalTop(null);
    setLocalBottom(null);
    setLocalLogo(null);
    setEvent((p) => ({
      ...p,
      images: {
        ...(p.images || {}),
        heroTexture: asset("src/assets/portada.webp"),
        heroTop: asset("src/assets/hero_top.png"),
        heroBottom: asset("src/assets/hero_bottom.png"),
        logo: undefined,
      },
    }));
    // limpiar inputs file
    if (heroInputRef.current) heroInputRef.current.value = "";
    if (logoInputRef.current) logoInputRef.current.value = "";
    if (topInputRef.current) topInputRef.current.value = "";
    if (bottomInputRef.current) bottomInputRef.current.value = "";
  };

  const clearLogo = () => {
    setLocalLogo(null);
    setLogo(undefined);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      {/* Fondo de portada */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Fondo de portada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {PRESETS.map((it) => {
              const selected = currentHero === it.src;
              return (
                <button
                  key={it.id}
                  type="button"
                  className={`relative border rounded-md overflow-hidden text-left hover:shadow ${
                    selected ? "ring-2 ring-blue-500" : "border-gray-200"
                  }`}
                  onClick={() => setHero(it.src)}
                  aria-label={`Elegir ${it.label}`}
                >
                  <img
                    src={it.src}
                    alt={it.label}
                    className="w-full h-24 object-cover"
                    onError={(e) => onImgError(e, it.label)}
                  />
                  <div className="p-2">
                    <div className="text-xs font-medium">{it.label}</div>
                    <div className="text-[10px] text-gray-500 truncate">
                      {it.src}
                    </div>
                  </div>
                  {selected ? (
                    <div className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow">
                      <Check className="w-3 h-3 text-blue-600" />
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-end gap-2">
            <div>
              <Label className="text-xs">Subir imagen propia</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  ref={heroInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, "hero")}
                  className="text-xs"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => heroInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Subir
                </Button>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Recomendado: 1920×1080 o superior. Formato JPG/PNG/WebP.
              </p>
            </div>

            {(localHero || currentHero) && (
              <div className="justify-self-end">
                <div className="text-[11px] text-gray-500 mb-1">Vista previa</div>
                <img
                  src={localHero || currentHero}
                  alt="Fondo seleccionado"
                  className="w-40 h-20 object-cover rounded border"
                  onError={(e) => onImgError(e, "Fondo")}
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={resetDefaults}
              title="Restaurar imágenes por defecto"
            >
              Restaurar por defecto
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logo */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Logo (opcional)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-end gap-2">
            <div>
              <Label className="text-xs">Subir logo</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*,.svg"
                  onChange={(e) => handleUpload(e, "logo")}
                  className="text-xs"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => logoInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Subir
                </Button>
                {(currentLogo || localLogo) && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={clearLogo}
                    title="Quitar logo"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Quitar
                  </Button>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                PNG/SVG con fondo transparente recomendado.
              </p>
            </div>

            {(currentLogo || localLogo) && (
              <div className="justify-self-end col-span-2 sm:col-span-1">
                <div className="text-[11px] text-gray-500 mb-1">Vista previa</div>
                <img
                  src={localLogo || currentLogo}
                  alt="Logo"
                  className="h-16 object-contain border rounded bg-white p-2"
                  onError={(e) => onImgError(e, "Logo")}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Decorativos (opcional) */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Decorativos (opcional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Superior */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-end gap-2">
            <div>
              <Label className="text-xs">Decorativo superior</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTop(asset("src/assets/hero_top.png"))}
                >
                  Usar predeterminado
                </Button>
                <Button type="button" variant="ghost" onClick={() => setTop(undefined)}>
                  Ninguno
                </Button>
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  ref={topInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, "top")}
                  className="text-xs"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => topInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Subir
                </Button>
              </div>
            </div>

            {(localTop || currentTop) && (
              <div className="justify-self-end col-span-2 sm:col-span-1">
                <div className="text-[11px] text-gray-500 mb-1">Vista previa</div>
                <img
                  src={localTop || currentTop}
                  alt="Decorativo superior"
                  className="h-20 object-contain border rounded bg-white p-2"
                  onError={(e) => onImgError(e, "Decorativo superior")}
                />
              </div>
            )}
          </div>

          {/* Inferior */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-end gap-2">
            <div>
              <Label className="text-xs">Decorativo inferior</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setBottom(asset("src/assets/hero_bottom.png"))}
                >
                  Usar predeterminado
                </Button>
                <Button type="button" variant="ghost" onClick={() => setBottom(undefined)}>
                  Ninguno
                </Button>
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  ref={bottomInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, "bottom")}
                  className="text-xs"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => bottomInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Subir
                </Button>
              </div>
            </div>

            {(localBottom || currentBottom) && (
              <div className="justify-self-end col-span-2 sm:col-span-1">
                <div className="text-[11px] text-gray-500 mb-1">Vista previa</div>
                <img
                  src={localBottom || currentBottom}
                  alt="Decorativo inferior"
                  className="h-20 object-contain border rounded bg-white p-2"
                  onError={(e) => onImgError(e, "Decorativo inferior")}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
