// src/components/InvitationCanvas.jsx
import React, { useEffect, useMemo, useState } from "react";
import EditableText from "./EditableText.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  ChevronDown,
  Church,
  PartyPopper,
  Gift,
  Instagram,
  Share2,
  Download,
  CreditCard,
  Music,
  X,
  CheckCircle,
} from "lucide-react";
import { asset, onImgError } from "../utils/assets";

/**
 * InvitationCanvas
 * - Visual tipo DemoBlack (franjas) sin cambiar el layout.
 * - Sincroniza con EditorPanel:
 *   · Colores: event.colors.{primary, secondary, text, dark}
 *   · Tipografías: event.fonts.{primary, secondary}
 *   · Imágenes: event.images.{heroTexture, logo}
 * - Dirección del documento configurable: event.direction ("ltr" | "rtl" | "auto")
 */

export default function InvitationCanvas({ event, ui, setEvent }) {
  if (!event) return null;

  /* =================== Colores / Tipografías =================== */
  const COLORS = useMemo(() => {
    const c = event.colors || {};
    const primary = c.primary || "#8FAF86";      // acentos
    const secondary = c.secondary || "#D4B28A";  // franja regalos
    const text = c.text || "#2E2E2E";            // textos base
    // Fallback "dark": si no viene del panel, lo derivamos de la paleta (secondary → mezcla con negro)
    const darkDerived = mixHex(secondary, "#000000", 0.75);
    const dark = c.dark || darkDerived;
    return {
      primary,
      primaryText: "#FFFFFF",
      secondary,
      secondaryText: "#FFFFFF",
      ink: text,
      body: text,
      muted: "#6B7280",
      paper: "#F8F8F6",
      white: "#FFFFFF",
      primarySoft: toSoft(primary, 0.16),
      secondarySoft: toSoft(secondary, 0.12),
      dark,
      darkText: pickTextColor(dark),
    };
  }, [event.colors]);

const fontPrimary = event.fonts?.primary || "'Playfair Display', serif";
const fontSecondary = event.fonts?.secondary || "'Great Vibes', cursive";


  /* =================== Imágenes =================== */
  const heroTexture = event.images?.heroTexture || asset("src/assets/portada.webp");
  // Logo opcional (decorativo superior): event.images.logo

  /* =================== Countdown =================== */
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const iso = buildTargetISO(event.date, event.time);
    const target = new Date(iso || "2026-11-23T19:00:00");
    const id = setInterval(() => {
      const d = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(d / 86400000),
        hours: Math.floor((d % 86400000) / 3600000),
        minutes: Math.floor((d % 3600000) / 60000),
        seconds: Math.floor((d % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(id);
  }, [event.date, event.time]);

  /* =================== Estado modales =================== */
  const [showRSVP, setShowRSVP] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rsvpData, setRsvpData] = useState({ name: "", email: "", attendance: "", guests: 1, message: "" });

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowRSVP(false);
      setRsvpData({ name: "", email: "", attendance: "", guests: 1, message: "" });
    }, 2200);
  };

  /* =================== Helpers edición =================== */
  const addGift = () =>
    setEvent((p) => ({ ...p, gifts: [...(p.gifts || []), { label: "Mesa de Regalos", url: "" }] }));
  const updateGift = (i, k, v) =>
    setEvent((p) => {
      const arr = [...(p.gifts || [])];
      arr[i] = { ...arr[i], [k]: v };
      return { ...p, gifts: arr };
    });
  const removeGift = (i) =>
    setEvent((p) => {
      const arr = [...(p.gifts || [])];
      arr.splice(i, 1);
      return { ...p, gifts: arr };
    });

  return (
    <div
      className="min-h-screen"
      dir={event?.direction || "ltr"}
      style={{ backgroundColor: COLORS.paper }}
    >
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroTexture}
            onError={(e) => onImgError(e, "Textura")}
            alt="Textura"
            className="absolute inset-0 w-full h-full object-cover object-center block"
          />
        </div>

        {/* Logo (decorativo superior) — solo si existe */}
        {event?.images?.logo && (
          <div className="absolute top-0 left-0 w-[420px] h-[260px] opacity-80 pointer-events-none">
            <img
              src={event.images.logo}
              onError={(e) => onImgError(e, "Logo")}
              alt="Logo"
              className="absolute inset-0 w-full h-full object-contain block"
            />
          </div>
        )}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className="font-display font-light mb-3 tracking-wider"
            style={{ color: COLORS.ink, fontSize: "clamp(2.75rem, 8vw, 6rem)", fontFamily: fontSecondary }}
          >
            <EditableText
              value={(event.couple?.bride || "Belén"}
              onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, bride: val } }))}
              ariaLabel="Nombre 1"
              className="px-1"
              singleLine
              style={{ color: COLORS.ink }}
            />
          </h1>

          <div className="flex items-center justify-center my-6">
            <div className="h-px w-16" style={{ backgroundColor: "#CFCFCF" }} />
            <div
              className="mx-4 font-light"
              style={{ color: COLORS.primary, fontSize: "clamp(1.75rem, 5vw, 3rem)", fontFamily: fontSecondary }}
            >
              ∞
            </div>
            <div className="h-px w-16" style={{ backgroundColor: "#CFCFCF" }} />
          </div>

          <h1
            className="font-display font-light mb-8 tracking-wider"
            style={{ color: COLORS.ink, fontSize: "clamp(2.75rem, 8vw, 6rem)", fontFamily: fontSecondary }}
          >
            <EditableText
              value={(event.couple?.groom || "Amadeo"}
              onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, groom: val } }))}
              ariaLabel="Nombre 2"
              className="px-1"
              singleLine
              style={{ color: COLORS.ink }}
            />
          </h1>

          <p
            className="font-light mb-10 tracking-wide"
            style={{ color: COLORS.muted, fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)", fontFamily: fontPrimary }}
          >
            ¡NOS CASAMOS!
          </p>

          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto" style={{ color: COLORS.primary }} />
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN (franja acento) ===== */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-4xl mx-auto px-4 text-center" dir="ltr">
          <h2
            className="font-light mb-6 sm:mb-8 tracking-wide"
            style={{ color: COLORS.primaryText, fontSize: "clamp(1.25rem, 3.5vw, 1.875rem)", fontFamily: fontPrimary }}
          >
            Bienvenidos a nuestra boda
          </h2>

          <div className="flex items-stretch justify-center gap-5 sm:gap-8 select-none">
            <TimeCell value={timeLeft.days} label="días" color={COLORS.primaryText} />
            <SeparatorDot color={COLORS.primaryText} />
            <TimeCell value={timeLeft.hours} label="hs" color={COLORS.primaryText} />
            <SeparatorDot color={COLORS.primaryText} />
            <TimeCell value={timeLeft.minutes} label="min" color={COLORS.primaryText} />
            <SeparatorDot color={COLORS.primaryText} />
            <TimeCell value={timeLeft.seconds} label="seg" color={COLORS.primaryText} />
          </div>
        </div>
      </section>

      {/* ===== DETALLES (blanco) ===== */}
      <section className="py-16 bg-white" dir="ltr">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Ceremonia */}
            <DetailIconCard
              icon={<Church className="w-8 h-8" style={{ color: COLORS.primary }} />}
              iconBg={COLORS.primarySoft}
              title="CEREMONIA"
              titleColor={COLORS.ink}
              textColor={COLORS.body}
              muted={COLORS.muted}
            >
              <div className="space-y-3 mb-8">
                <p className="text-lg" style={{ color: COLORS.body }}>
                  <EditableText
                    value={event.date || "23 de Noviembre, 2026"}
                    onChange={(v) => setEvent((p) => ({ ...p, date: v }))}
                    className="px-1"
                    singleLine
                  />
                </p>
                <p className="text-lg" style={{ color: COLORS.body }}>
                  <EditableText
                    value={event.ceremony?.time || event.time || "19:00 hs"}
                    onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, time: v } }))}
                    className="px-1"
                    singleLine
                  />
                </p>
                <p className="font-medium" style={{ color: COLORS.body }}>
                  <EditableText
                    value={event.ceremony?.venue || "Iglesia Nuestra Señora del Carmen"}
                    onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, venue: v } }))}
                    className="px-1"
                    singleLine
                  />
                </p>
                <p style={{ color: COLORS.body }}>
                  <EditableText
                    value={event.ceremony?.location || "Villa Allende, Córdoba"}
                    onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, location: v } }))}
                    className="px-1"
                    singleLine
                  />
                </p>
                <p className="text-sm" style={{ color: COLORS.muted }}>
                  Recibí debajo las indicaciones para llegar.
                </p>
              </div>
              <Button
                className="px-8 py-3 rounded-full"
                style={{ backgroundColor: COLORS.primary, color: COLORS.primaryText }}
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${event.ceremony?.address || "Av. San Martín 456, Villa Allende"}`,
                    "_blank"
                  )
                }
              >
                LLEGAR A LA CEREMONIA
              </Button>
            </DetailIconCard>

            {/* Fiesta */}
            <DetailIconCard
              icon={<PartyPopper className="w-8 h-8" style={{ color: COLORS.primary }} />}
              iconBg={COLORS.primarySoft}
              title="FIESTA"
              titleColor={COLORS.ink}
              textColor={COLORS.body}
              muted={COLORS.muted}
            >
              <div className="space-y-3 mb-8">
                <p className="text-lg" style={{ color: COLORS.body }}>
                  <EditableText
                    value={event.reception?.time || "Después de la ceremonia"}
                    onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, time: v } }))}
                    className="px-1"
                    singleLine
                  />
                </p>
                <p className="font-medium" style={{ color: COLORS.body }}>
                  <EditableText
                    value={event.reception?.venue || "Rincón Calina"}
                    onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, venue: v } }))}
                    className="px-1"
                    singleLine
                  />
                </p>
                <p style={{ color: COLORS.body }}>
                  <EditableText
                    value={event.reception?.location || "Unquillo, Córdoba"}
                    onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, location: v } }))}
                    className="px-1"
                    singleLine
                  />
                </p>
                <p className="text-lg font-medium" style={{ color: COLORS.primary }}>
                  ¡Te esperamos!
                </p>
              </div>
              <Button
                className="px-8 py-3 rounded-full"
                style={{ backgroundColor: COLORS.primary, color: COLORS.primaryText }}
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${event.reception?.address || "Ruta Provincial E-53 Km 8, Unquillo"}`,
                    "_blank"
                  )
                }
              >
                LLEGAR A LA FIESTA
              </Button>
            </DetailIconCard>
          </div>
        </div>
      </section>

      {/* ===== REGALOS / TRANSFERENCIAS ===== */}
      <section className="py-16 text-center" style={{ backgroundColor: COLORS.secondary }} dir="ltr">
        <div className="max-w-3xl mx-auto px-4">
          <Gift className="w-10 h-10 mx-auto mb-6" style={{ color: COLORS.secondaryText }} />
          <p
            className="mb-8"
            style={{ color: COLORS.secondaryText, fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontFamily: fontPrimary }}
          >
            <EditableText
              value={event.giftsNote || "Si deseás realizarnos un regalo podés colaborar con nuestra Luna de Miel…"}
              onChange={(v) => setEvent((p) => ({ ...p, giftsNote: v }))}
              className="px-1"
              singleLine={false}
              style={{ color: COLORS.secondaryText }}
            />
          </p>
          <Button
            className="rounded-full px-8 py-3"
            style={{ backgroundColor: COLORS.white, color: COLORS.secondary }}
            onClick={() => setShowGifts(true)}
          >
            VER DATOS BANCARIOS
          </Button>
        </div>
      </section>

      {/* ===== INSTAGRAM ===== */}
      <section className="py-16 bg-white" dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: COLORS.primarySoft }}
          >
            <Instagram className="w-8 h-8" style={{ color: COLORS.primary }} />
          </div>
          <h2 className="text-2xl font-display font-medium mb-4" style={{ color: COLORS.ink, fontFamily: fontSecondary }}>
            @{(event.hashtag || "#beluyamador").replace("#", "")}
          </h2>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
            ¡Preparate para nuestro gran día! Seguinos y etiquetanos en tus fotos y videos.
          </p>
          <Button
            className="px-8 py-3 rounded-full"
            style={{ backgroundColor: COLORS.primary, color: COLORS.primaryText }}
            onClick={() => window.open("https://instagram.com", "_blank")}
          >
            Ver en Instagram
          </Button>
        </div>
      </section>

      {/* ===== DRESS CODE (editable por event.colors.dark) ===== */}
      <section className="py-16" style={{ backgroundColor: COLORS.dark, color: COLORS.darkText }} dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-medium mb-4 tracking-wide" style={{ fontFamily: fontSecondary }}>
            DRESS CODE
          </h2>
          <p className="text-lg">
            <EditableText
              value={event.info?.dresscode || "Vestimenta formal, elegante"}
              onChange={(v) => setEvent((p) => ({ ...p, info: { ...(p.info || {}), dresscode: v } }))}
              className="px-1"
              singleLine
              style={{ color: COLORS.darkText }}
            />
          </p>
        </div>
      </section>

      {/* ===== RSVP ===== */}
      <section className="py-16" style={{ backgroundColor: COLORS.primary, color: COLORS.primaryText }} dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-medium mb-6 tracking-wide" style={{ fontFamily: fontSecondary }}>
            CONFIRMACIÓN DE ASISTENCIA
          </h2>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: fontPrimary }}>
            <EditableText
              value={event.rsvpNote || "Esperamos que seas parte de esta gran celebración. ¡Confirmanos tu asistencia!"}
              onChange={(v) => setEvent((p) => ({ ...p, rsvpNote: v }))}
              className="px-1"
              singleLine={false}
              style={{ color: COLORS.primaryText }}
            />
          </p>
          <Button
            className="px-8 py-3 rounded-full font-medium"
            style={{ backgroundColor: COLORS.white, color: COLORS.primary }}
            onClick={() => setShowRSVP(true)}
          >
            Confirmar asistencia
          </Button>

          <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${COLORS.primarySoft}` }}>
            <p className="text-lg">¡Agendá la fecha en tu calendario!</p>
            <Button
              variant="outline"
              className="mt-4 rounded-full px-8 py-3"
              style={{ borderColor: COLORS.primaryText, color: COLORS.primaryText }}
              onClick={() => {
                /* generar .ics si aplica */
              }}
            >
              AGENDAR EVENTO
            </Button>
          </div>
        </div>
      </section>

      {/* ===== SUGERENCIAS MUSICALES ===== */}
      <section className="py-16 bg-white" dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-medium mb-6 tracking-wide" style={{ color: COLORS.ink, fontFamily: fontSecondary }}>
            ¿QUÉ CANCIONES NO PUEDEN FALTAR?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: COLORS.body }}>
            ¡Ayudanos sugiriendo las canciones que pensás que no pueden faltar!
          </p>
          <Button
            className="px-8 py-3 rounded-full"
            style={{ backgroundColor: COLORS.primary, color: COLORS.primaryText }}
            onClick={() => alert("Abrir formulario de canciones (pendiente)")}
          >
            <Music className="w-4 h-4 mr-2" />
            Sugerir canción
          </Button>
        </div>
      </section>

      {/* ===== INFO ÚTIL ===== */}
      <section className="py-16" style={{ backgroundColor: COLORS.paper }} dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-medium mb-6 tracking-wide" style={{ color: COLORS.ink, fontFamily: fontSecondary }}>
            INFO ÚTIL
          </h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ color: COLORS.body }}>
            <EditableText
              value={event.info?.help || "Te dejamos sugerencias de alojamientos y traslados para ese fin de semana."}
              onChange={(v) => setEvent((p) => ({ ...p, info: { ...(p.info || {}), help: v } }))}
              className="px-1"
              singleLine={false}
              style={{ color: COLORS.body }}
            />
          </p>
          <Button
            variant="outline"
            className="px-8 py-3 rounded-full"
            style={{ borderColor: COLORS.primary, color: COLORS.primary }}
            onClick={() => alert("Ver más (pendiente)")}
          >
            VER MÁS
          </Button>
        </div>
      </section>

      {/* ===== FOOTER (editable por event.colors.dark) ===== */}
      <footer className="py-12" style={{ backgroundColor: COLORS.dark, color: COLORS.darkText }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-8">¡Gracias por acompañarnos en este momento tan importante!</p>
          <div
            className="pt-8"
            style={{
              borderTop:
                pickTextColor(COLORS.dark) === "#FFFFFF" ? "1px solid rgba(255,255,255,.25)" : "1px solid rgba(0,0,0,.25)",
            }}
          >
            <p className="text-sm opacity-70 mb-4">
              Invitación digital creada con ❤️ por{" "}
              <span className="font-medium" style={{ color: COLORS.primary }}>
                Venite
              </span>
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                style={{ borderColor: COLORS.darkText, color: COLORS.darkText }}
                onClick={() => navigator.clipboard?.writeText(window.location.href).catch(() => {})}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                style={{ borderColor: COLORS.darkText, color: COLORS.darkText }}
                onClick={() => {}}
              >
                <Download className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== MODAL RSVP ===== */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium" style={{ color: COLORS.ink }}>
                  Confirmar Asistencia
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRSVP(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {showSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.primary }} />
                  <h4 className="text-lg font-medium mb-2" style={{ color: COLORS.ink }}>
                    ¡Confirmación Recibida!
                  </h4>
                  <p style={{ color: COLORS.body }}>Gracias por confirmar tu asistencia. ¡Te esperamos!</p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-4" dir="ltr">
                  <Labeled label="Nombre completo *">
                    <Input
                      required
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                    />
                  </Labeled>

                  <Labeled label="Email *">
                    <Input
                      type="email"
                      required
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                      placeholder="tu@email.com"
                    />
                  </Labeled>

                  <Labeled label="¿Asistirás? *">
                    <select
                      required
                      value={rsvpData.attendance}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="yes">Sí, asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </Labeled>

                  {rsvpData.attendance === "yes" && (
                    <Labeled label="Número de acompañantes">
                      <Input
                        type="number"
                        min="0"
                        max="5"
                        value={rsvpData.guests}
                        onChange={(e) =>
                          setRsvpData({ ...rsvpData, guests: parseInt(e.target.value || "0", 10) })
                        }
                      />
                    </Labeled>
                  )}

                  <Labeled label="Mensaje (opcional)">
                    <Textarea
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                      placeholder="Déjanos un mensaje..."
                      rows={3}
                    />
                  </Labeled>

                  <Button
                    type="submit"
                    className="w-full"
                    style={{ backgroundColor: COLORS.primary, color: COLORS.primaryText }}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Confirmar Asistencia
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* ===== MODAL DATOS BANCARIOS ===== */}
      {showGifts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium" style={{ color: COLORS.ink }}>
                  Datos Bancarios
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowGifts(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4 text-sm" dir="ltr">
                <div className="text-center mb-2">
                  <CreditCard className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.primary }} />
                  <p style={{ color: COLORS.body }}>Si deseás colaborar con nuestra Luna de Miel:</p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.paper }}>
                  <h4 className="font-medium mb-2" style={{ color: COLORS.ink }}>
                    Transferencia Bancaria
                  </h4>
                  <div className="space-y-1 text-sm" style={{ color: COLORS.body }}>
                    {renderBankLine("Banco", event.bank?.banco)}
                    {renderBankLine("CBU/IBAN", event.bank?.cbu)}
                    {renderBankLine("Alias", event.bank?.alias)}
                    {renderBankLine("Titular", event.bank?.titular)}
                    {renderBankLine("Cuenta", event.bank?.cuenta)}
                    {event.bank?.nota ? (
                      <p className="text-xs" style={{ color: COLORS.muted }}>
                        {event.bank?.nota}
                      </p>
                    ) : null}
                  </div>
                </div>

                {(event.gifts || []).length > 0 && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.paper }}>
                    <h4 className="font-medium mb-2" style={{ color: COLORS.ink }}>
                      Mesas de Regalos
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {event.gifts.map((g, i) => (
                        <li key={i}>
                          {g.url ? (
                            <a
                              href={g.url}
                              target="_blank"
                              rel="noreferrer"
                              className="underline hover:opacity-80"
                              style={{ color: COLORS.primary }}
                            >
                              {g.label || g.url}
                            </a>
                          ) : (
                            <span>{g.label || "Enlace"}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

/* =================== Subcomponentes / helpers =================== */

function TimeCell({ value, label, color = "#fff" }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-light leading-none" style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)", color }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="opacity-90 text-sm sm:text-base" style={{ color }}>
        {label}
      </div>
    </div>
  );
}
function SeparatorDot({ color = "#fff" }) {
  return (
    <div className="self-center font-light" style={{ color, fontSize: "clamp(2rem, 7vw, 4rem)" }}>
      :
    </div>
  );
}

function DetailIconCard({ icon, iconBg, title, titleColor, textColor, muted, children }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <h3 className="text-2xl font-display font-medium mb-6 tracking-wide" style={{ color: titleColor }}>
        {title}
      </h3>
      <div className="text-base" style={{ color: textColor }}>
        {children}
      </div>
    </div>
  );
}
function Labeled({ label, children }) {
  return (
    <label className="block text-sm" dir="ltr">
      <span className="mb-1 block text-gray-700">{label}</span>
      {children}
    </label>
  );
}
function renderBankLine(label, value) {
  if (!value) return null;
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
}

/** Colorea un fondo suave a partir de un hex, con opacidad */
function toSoft(hex, alpha = 0.14) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function hexToRgb(hex) {
  let h = (hex || "#000").replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((ch) => ch + ch).join("");
  const num = parseInt(h, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

/** Mezcla dos colores hex con peso [0..1] hacia hexB */
function mixHex(hexA, hexB, weight = 0.5) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const mix = (x, y) => Math.round(x * (1 - weight) + y * weight);
  const r = mix(a.r, b.r);
  const g = mix(a.g, b.g);
  const bch = mix(a.b, b.b);
  return `#${[r, g, bch].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** Elige color de texto (negro/blanco) según contraste YIQ */
function pickTextColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#111827" : "#FFFFFF";
}

/** Construye ISO a partir de fecha en español y hora "HH:mm" */
function buildTargetISO(dateStr, timeStr) {
  if (!dateStr) return null;
  try {
    const re = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/; // dd/mm/yyyy
    if (re.test(dateStr.trim())) {
      const [, d, m, y] = dateStr.trim().match(re);
      return `${y}-${pad(m)}-${pad(d)}T${padTime(timeStr || "00:00")}`;
    }
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const ds = dateStr.toLowerCase();
    const mIdx = meses.findIndex((m) => ds.includes(m));
    const dMatch = ds.match(/\d{1,2}/);
    const yMatch = ds.match(/\d{4}/);
    if (mIdx >= 0 && dMatch && yMatch) {
      const d = Number(dMatch[0]),
        y = Number(yMatch[0]);
      return `${y}-${pad(mIdx + 1)}-${pad(d)}T${padTime(timeStr || "00:00")}`;
    }
  } catch {
    return null;
  }
  return null;
}
function pad(n) {
  return String(n).padStart(2, "0");
}
function padTime(hhmm) {
  const [h = "00", m = "00"] = (hhmm || "").split(":");
  return `${pad(h)}:${pad(m)}:00`;
}
