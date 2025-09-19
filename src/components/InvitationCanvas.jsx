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
// mismo helper que usan las demos
import { asset, onImgError } from "../utils/assets"; // ajusta la ruta si tu utils está en otro lugar

/**
 * InvitationCanvas (Landing estilo DemoBlack, editable)
 * - Franjas/secciones iguales a los demos (hero, countdown, detalles, regalos, instagram, dress code, rsvp, música, info útil, footer)
 * - Textos editables con EditableText (click para editar)
 * - Colores base tomados de la demo con override desde event.colors
 * - Modales: RSVP y Datos Bancarios
 *
 * Props:
 *  - event: {
 *      couple:{ bride, groom },
 *      date, time, hashtag, location?,
 *      ceremony:{ time, venue, location, address },
 *      reception:{ time, venue, location, address },
 *      info?: { dresscode, parking, kids },
 *      bank?: { banco, cbu, alias, titular, cuenta, nota },
 *      gifts?: [{label, url}],
 *      colors?: { ink, text, muted, sage, sageDark, sageLight, almond, almondDark, almondLight, white, paper },
 *      fonts?: { primary, secondary }
 *    }
 *  - ui (no imprescindible aquí, pero lo respetamos si lo pasás)
 *  - setEvent: fn
 */

export default function InvitationCanvas({ event, ui, setEvent }) {
  if (!event) return null;

  // ===== Paleta base DemoBlack con override desde event.colors =====
  const PALETTE = useMemo(() => {
    const c = event.colors || {};
    return {
      ink: c.ink || "#222222",
      text: c.text || "#2E2E2E",
      muted: c.muted || "#6B7280",
      sage: c.sage || "#8FAF86",
      sageDark: c.sageDark || "#789B70",
      sageLight: c.sageLight || "#E8F0E5",
      almond: c.almond || "#D4B28A",
      almondDark: c.almondDark || "#C59A6A",
      almondLight: c.almondLight || "#F4E7D8",
      white: c.white || "#FFFFFF",
      paper: c.paper || "#F8F8F6",
    };
  }, [event.colors]);

  const fontPrimary = event.fonts?.primary || "Inter, system-ui, sans-serif";
  const fontSecondary =
    event.fonts?.secondary || "Playfair Display, Georgia, serif";

  // ===== Countdown =====
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const targetISO = buildTargetISO(event.date, event.time);
    const targetDate = new Date(targetISO || "2026-11-23T19:00:00");
    const getDiff = () => {
      const now = new Date();
      const diff = Math.max(0, targetDate.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return { days, hours, minutes, seconds };
    };
    setTimeLeft(getDiff());
    const t = setInterval(() => setTimeLeft(getDiff()), 1000);
    return () => clearInterval(t);
  }, [event.date, event.time]);

  // ===== Estado de modales =====
  const [showRSVP, setShowRSVP] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    name: "",
    email: "",
    attendance: "",
    guests: 1,
    message: "",
  });

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowRSVP(false);
      setRsvpData({
        name: "",
        email: "",
        attendance: "",
        guests: 1,
        message: "",
      });
    }, 2500);
  };

  // ===== Helpers de edición =====
  const setCoupleFromString = (val) => {
    const [bride = "", groom = ""] = val.split("&").map((s) => s.trim());
    setEvent((p) => ({
      ...p,
      couple: { bride, groom: groom || p.couple?.groom || "" },
    }));
  };
  const addGift = () =>
    setEvent((p) => ({
      ...p,
      gifts: [...(p.gifts || []), { label: "Mesa de Regalos", url: "" }],
    }));
  const updateGift = (idx, key, v) =>
    setEvent((p) => {
      const arr = [...(p.gifts || [])];
      arr[idx] = { ...arr[idx], [key]: v };
      return { ...p, gifts: arr };
    });
  const removeGift = (idx) =>
    setEvent((p) => {
      const arr = [...(p.gifts || [])];
      arr.splice(idx, 1);
      return { ...p, gifts: arr };
    });

  // ===== Assets como en DemoBlack =====
  const paperTexture = asset("src/assets/portada.webp");
  const floralTop = asset("src/assets/hero_top.png");
  const floralBottom = asset("src/assets/hero_bottom.png");

  return (
    <div className="min-h-screen" style={{ backgroundColor: PALETTE.paper }}>
      {/* ===== HERO con textura + florales ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* textura papel */}
        <div className="absolute inset-0">
          <img
            src={paperTexture}
            onError={(e) => onImgError(e, "Textura papel")}
            alt="Textura papel"
            className="absolute inset-0 w-full h-full object-cover object-center block"
          />
        </div>

        {/* florales decorativos */}
        <div className="absolute top-0 left-0 w-[420px] h-[260px] opacity-80 pointer-events-none">
          <img
            src={floralTop}
            onError={(e) => onImgError(e, "Decorativo superior")}
            alt="Decorativo superior"
            className="absolute inset-0 w-full h-full object-cover block"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-[460px] h-[280px] opacity-80 pointer-events-none">
          <img
            src={floralBottom}
            onError={(e) => onImgError(e, "Decorativo inferior")}
            alt="Decorativo inferior"
            className="absolute inset-0 w-full h-full object-cover block"
          />
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" dir="ltr">
          {/* Nombre 1 */}
          <h1
            className="font-display font-light mb-3 tracking-wider"
            style={{
              color: PALETTE.ink,
              fontSize: "clamp(2.75rem, 8vw, 6rem)",
              fontFamily: fontSecondary,
            }}
          >
            <EditableText
              value={(event.couple?.bride || "Belén").toUpperCase()}
              onChange={(val) =>
                setEvent((p) => ({
                  ...p,
                  couple: { ...p.couple, bride: val },
                }))
              }
              ariaLabel="Nombre de la novia"
              className="px-1"
              singleLine
              style={{ color: PALETTE.ink }}
            />
          </h1>

          {/* separador infinito */}
          <div className="flex items-center justify-center my-6">
            <div className="h-px w-16" style={{ backgroundColor: "#CFCFCF" }} />
            <div
              className="mx-4 font-light"
              style={{
                color: PALETTE.sage,
                fontSize: "clamp(1.75rem, 5vw, 3rem)",
                fontFamily: fontSecondary,
              }}
            >
              ∞
            </div>
            <div className="h-px w-16" style={{ backgroundColor: "#CFCFCF" }} />
          </div>

          {/* Nombre 2 */}
          <h1
            className="font-display font-light mb-8 tracking-wider"
            style={{
              color: PALETTE.ink,
              fontSize: "clamp(2.75rem, 8vw, 6rem)",
              fontFamily: fontSecondary,
            }}
          >
            <EditableText
              value={(event.couple?.groom || "Amadeo").toUpperCase()}
              onChange={(val) =>
                setEvent((p) => ({
                  ...p,
                  couple: { ...p.couple, groom: val },
                }))
              }
              ariaLabel="Nombre del novio"
              className="px-1"
              singleLine
              style={{ color: PALETTE.ink }}
            />
          </h1>

          {/* Subtítulo */}
          <p
            className="font-light mb-10 tracking-wide"
            style={{
              color: PALETTE.muted,
              fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
              fontFamily: fontPrimary,
            }}
          >
            ¡NOS CASAMOS!
          </p>

          {/* Indicador scroll */}
          <div className="animate-bounce">
            <ChevronDown
              className="w-8 h-8 mx-auto"
              style={{ color: PALETTE.sage }}
            />
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN (franja color sage) ===== */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: PALETTE.sage }}>
        <div className="max-w-4xl mx-auto px-4 text-center" dir="ltr">
          <h2
            className="font-light mb-6 sm:mb-8 tracking-wide"
            style={{
              color: PALETTE.white,
              fontSize: "clamp(1.25rem, 3.5vw, 1.875rem)",
              fontFamily: fontPrimary,
            }}
          >
            Bienvenidos a nuestra boda
          </h2>

          <div className="flex items-stretch justify-center gap-5 sm:gap-8 select-none">
            <TimeCell value={timeLeft.days} label="días" />
            <SeparatorDot color={PALETTE.white} />
            <TimeCell value={timeLeft.hours} label="hs" />
            <SeparatorDot color={PALETTE.white} />
            <TimeCell value={timeLeft.minutes} label="min" />
            <SeparatorDot color={PALETTE.white} />
            <TimeCell value={timeLeft.seconds} label="seg" />
          </div>
        </div>
      </section>

      {/* ===== DETALLES (blanco) ===== */}
      <section className="py-16 bg-white" dir="ltr">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Ceremonia */}
            <DetailIconCard
              icon={<Church className="w-8 h-8" style={{ color: PALETTE.sage }} />}
              iconBg={PALETTE.sageLight}
              title="CEREMONIA"
              titleColor={PALETTE.ink}
              textColor={PALETTE.text}
              muted={PALETTE.muted}
            >
              <div className="space-y-3 mb-8">
                <p className="text-lg" style={{ color: PALETTE.text }}>
                  <EditableText
                    value={event.date || "23 de Noviembre, 2026"}
                    onChange={(v) => setEvent((p) => ({ ...p, date: v }))}
                    className="px-1"
                    singleLine
                  />
                </p>
                <p className="text-lg" style={{ color: PALETTE.text }}>
                  <EditableText
                    value={event.ceremony?.time || event.time || "19:00 hs"}
                    onChange={(v) =>
                      setEvent((p) => ({
                        ...p,
                        ceremony: { ...p.ceremony, time: v },
                      }))
                    }
                    className="px-1"
                    singleLine
                  />
                </p>
                <p className="font-medium" style={{ color: PALETTE.text }}>
                  <EditableText
                    value={event.ceremony?.venue || "Iglesia Nuestra Señora del Carmen"}
                    onChange={(v) =>
                      setEvent((p) => ({
                        ...p,
                        ceremony: { ...p.ceremony, venue: v },
                      }))
                    }
                    className="px-1"
                    singleLine
                  />
                </p>
                <p style={{ color: PALETTE.text }}>
                  <EditableText
                    value={event.ceremony?.location || "Villa Allende, Córdoba"}
                    onChange={(v) =>
                      setEvent((p) => ({
                        ...p,
                        ceremony: { ...p.ceremony, location: v },
                      }))
                    }
                    className="px-1"
                    singleLine
                  />
                </p>
                <p className="text-sm" style={{ color: PALETTE.muted }}>
                  Recibí debajo las indicaciones para llegar.
                </p>
              </div>
              <Button
                className="px-8 py-3 rounded-full"
                style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${
                      event.ceremony?.address ||
                      "Av. San Martín 456, Villa Allende"
                    }`,
                    "_blank"
                  )
                }
              >
                LLEGAR A LA CEREMONIA
              </Button>
            </DetailIconCard>

            {/* Fiesta */}
            <DetailIconCard
              icon={
                <PartyPopper
                  className="w-8 h-8"
                  style={{ color: PALETTE.sage }}
                />
              }
              iconBg={PALETTE.sageLight}
              title="FIESTA"
              titleColor={PALETTE.ink}
              textColor={PALETTE.text}
              muted={PALETTE.muted}
            >
              <div className="space-y-3 mb-8">
                <p className="text-lg" style={{ color: PALETTE.text }}>
                  <EditableText
                    value={event.reception?.time || "Después de la ceremonia"}
                    onChange={(v) =>
                      setEvent((p) => ({
                        ...p,
                        reception: { ...p.reception, time: v },
                      }))
                    }
                    className="px-1"
                    singleLine
                  />
                </p>
                <p className="font-medium" style={{ color: PALETTE.text }}>
                  <EditableText
                    value={event.reception?.venue || "Rincón Calina"}
                    onChange={(v) =>
                      setEvent((p) => ({
                        ...p,
                        reception: { ...p.reception, venue: v },
                      }))
                    }
                    className="px-1"
                    singleLine
                  />
                </p>
                <p style={{ color: PALETTE.text }}>
                  <EditableText
                    value={event.reception?.location || "Unquillo, Córdoba"}
                    onChange={(v) =>
                      setEvent((p) => ({
                        ...p,
                        reception: { ...p.reception, location: v },
                      }))
                    }
                    className="px-1"
                    singleLine
                  />
                </p>
                <p className="text-lg font-medium" style={{ color: PALETTE.sage }}>
                  ¡Te esperamos!
                </p>
              </div>
              <Button
                className="px-8 py-3 rounded-full"
                style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${
                      event.reception?.address || "Ruta Provincial E-53 Km 8, Unquillo"
                    }`,
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

      {/* ===== REGALOS (almond) ===== */}
      <section
        className="py-16 text-center"
        style={{ backgroundColor: PALETTE.almond }}
        dir="ltr"
      >
        <div className="max-w-3xl mx-auto px-4">
          <Gift className="w-10 h-10 mx-auto mb-6" style={{ color: PALETTE.white }} />
          <p
            className="mb-8"
            style={{
              color: PALETTE.white,
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              fontFamily: fontPrimary,
            }}
          >
            <EditableText
              value={
                event.giftsNote ||
                "Si deseás realizarnos un regalo podés colaborar con nuestra Luna de Miel…"
              }
              onChange={(v) => setEvent((p) => ({ ...p, giftsNote: v }))}
              className="px-1"
              singleLine={false}
              style={{ color: PALETTE.white }}
            />
          </p>
          <Button
            className="rounded-full px-8 py-3"
            style={{ backgroundColor: PALETTE.white, color: PALETTE.almondDark }}
            onClick={() => setShowGifts(true)}
          >
            VER DATOS BANCARIOS
          </Button>
        </div>
      </section>

      {/* ===== INSTAGRAM (blanco) ===== */}
      <section className="py-16 bg-white" dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: PALETTE.sageLight }}
          >
            <Instagram className="w-8 h-8" style={{ color: PALETTE.sage }} />
          </div>
          <h2
            className="text-2xl font-display font-medium mb-4"
            style={{ color: PALETTE.ink, fontFamily: fontSecondary }}
          >
            @{(event.hashtag || "#beluyamador").replace("#", "")}
          </h2>
          <p
            className="mb-6 max-w-2xl mx-auto"
            style={{ color: PALETTE.text, fontFamily: fontPrimary }}
          >
            ¡Preparate para nuestro gran día! Seguinos y etiquetanos en tus fotos y videos.
          </p>
          <Button
            className="px-8 py-3 rounded-full"
            style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}
            onClick={() => window.open("https://instagram.com", "_blank")}
          >
            Ver en Instagram
          </Button>
        </div>
      </section>

      {/* ===== DRESS CODE (oscuro) ===== */}
      <section
        className="py-16"
        style={{ backgroundColor: "#1F2937", color: PALETTE.white }}
        dir="ltr"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-2xl font-display font-medium mb-4 tracking-wide"
            style={{ fontFamily: fontSecondary }}
          >
            DRESS CODE
          </h2>
          <p className="text-lg">
            <EditableText
              value={event.info?.dresscode || "Vestimenta formal, elegante"}
              onChange={(v) =>
                setEvent((p) => ({ ...p, info: { ...(p.info || {}), dresscode: v } }))
              }
              className="px-1"
              singleLine
              style={{ color: PALETTE.white }}
            />
          </p>
        </div>
      </section>

      {/* ===== RSVP (franja sage) ===== */}
      <section
        className="py-16"
        style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}
        dir="ltr"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-2xl font-display font-medium mb-6 tracking-wide"
            style={{ fontFamily: fontSecondary }}
          >
            CONFIRMACIÓN DE ASISTENCIA
          </h2>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: fontPrimary }}
          >
            <EditableText
              value={
                event.rsvpNote ||
                "Esperamos que seas parte de esta gran celebración. ¡Confirmanos tu asistencia!"
              }
              onChange={(v) => setEvent((p) => ({ ...p, rsvpNote: v }))}
              className="px-1"
              singleLine={false}
              style={{ color: PALETTE.white }}
            />
          </p>
          <Button
            className="px-8 py-3 rounded-full font-medium"
            style={{ backgroundColor: PALETTE.white, color: PALETTE.sage }}
            onClick={() => setShowRSVP(true)}
          >
            Confirmar asistencia
          </Button>

          <div
            className="mt-8 pt-8"
            style={{ borderTop: `1px solid ${PALETTE.sageLight}` }}
          >
            <p className="text-lg">¡Agendá la fecha en tu calendario!</p>
            <Button
              variant="outline"
              className="mt-4 rounded-full px-8 py-3"
              style={{ borderColor: PALETTE.white, color: PALETTE.white }}
              onClick={() => {
                // aquí podrías generar archivo .ics
              }}
            >
              AGENDAR EVENTO
            </Button>
          </div>
        </div>
      </section>

      {/* ===== SUGERENCIAS MUSICALES (blanco) ===== */}
      <section className="py-16 bg-white" dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-2xl font-display font-medium mb-6 tracking-wide"
            style={{ color: PALETTE.ink, fontFamily: fontSecondary }}
          >
            ¿QUÉ CANCIONES NO PUEDEN FALTAR?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: PALETTE.text }}>
            ¡Ayudanos sugiriendo las canciones que pensás que no pueden faltar!
          </p>
          <Button
            className="px-8 py-3 rounded-full"
            style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}
            onClick={() => {
              // acá abrirías un modal de sugerencias o link a formulario
              alert("Abrir formulario de canciones (pendiente)");
            }}
          >
            <Music className="w-4 h-4 mr-2" />
            Sugerir canción
          </Button>
        </div>
      </section>

      {/* ===== INFO ÚTIL (paper) ===== */}
      <section className="py-16" style={{ backgroundColor: PALETTE.paper }} dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-2xl font-display font-medium mb-6 tracking-wide"
            style={{ color: PALETTE.ink, fontFamily: fontSecondary }}
          >
            INFO ÚTIL
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: PALETTE.text }}>
            <EditableText
              value={
                event.info?.help ||
                "Te dejamos sugerencias de alojamientos y traslados para ese fin de semana."
              }
              onChange={(v) =>
                setEvent((p) => ({ ...p, info: { ...(p.info || {}), help: v } }))
              }
              className="px-1"
              singleLine={false}
              style={{ color: PALETTE.text }}
            />
          </p>
          <Button
            variant="outline"
            className="px-8 py-3 rounded-full"
            style={{ borderColor: PALETTE.sage, color: PALETTE.sage }}
            onClick={() => {
              // abrir modal/info ampliada
              alert("Ver más (pendiente)");
            }}
          >
            VER MÁS
          </Button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="py-12"
        style={{ backgroundColor: "#1F2937", color: PALETTE.white }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-8">
            ¡Gracias por acompañarnos en este momento tan importante!
          </p>

          <div className="pt-8" style={{ borderTop: "1px solid #4B5563" }}>
            <p className="text-sm opacity-70 mb-4">
              Invitación digital creada con ❤️ por{" "}
              <span className="font-medium" style={{ color: PALETTE.sage }}>
                Venite
              </span>
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                style={{ borderColor: PALETTE.white, color: PALETTE.white }}
                onClick={() => {
                  navigator.clipboard
                    ?.writeText(window.location.href)
                    .catch(() => {});
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                style={{ borderColor: PALETTE.white, color: PALETTE.white }}
                onClick={() => {
                  // aquí podrías disparar descarga de screenshot/pdf
                }}
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
                <h3 className="text-xl font-medium" style={{ color: PALETTE.ink }}>
                  Confirmar Asistencia
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRSVP(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {showSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle
                    className="w-16 h-16 mx-auto mb-4"
                    style={{ color: PALETTE.sage }}
                  />
                  <h4 className="text-lg font-medium mb-2" style={{ color: PALETTE.ink }}>
                    ¡Confirmación Recibida!
                  </h4>
                  <p style={{ color: PALETTE.text }}>
                    Gracias por confirmar tu asistencia. ¡Te esperamos!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-4" dir="ltr">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: PALETTE.ink }}
                    >
                      Nombre completo *
                    </label>
                    <Input
                      required
                      value={rsvpData.name}
                      onChange={(e) =>
                        setRsvpData({ ...rsvpData, name: e.target.value })
                      }
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: PALETTE.ink }}
                    >
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={rsvpData.email}
                      onChange={(e) =>
                        setRsvpData({ ...rsvpData, email: e.target.value })
                      }
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: PALETTE.ink }}
                    >
                      ¿Asistirás? *
                    </label>
                    <select
                      required
                      value={rsvpData.attendance}
                      onChange={(e) =>
                        setRsvpData({ ...rsvpData, attendance: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="yes">Sí, asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>

                  {rsvpData.attendance === "yes" && (
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: PALETTE.ink }}
                      >
                        Número de acompañantes
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="5"
                        value={rsvpData.guests}
                        onChange={(e) =>
                          setRsvpData({
                            ...rsvpData,
                            guests: parseInt(e.target.value || "0", 10),
                          })
                        }
                      />
                    </div>
                  )}

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: PALETTE.ink }}
                    >
                      Mensaje (opcional)
                    </label>
                    <Textarea
                      value={rsvpData.message}
                      onChange={(e) =>
                        setRsvpData({ ...rsvpData, message: e.target.value })
                      }
                      placeholder="Déjanos un mensaje..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}
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
                <h3 className="text-xl font-medium" style={{ color: PALETTE.ink }}>
                  Datos Bancarios
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowGifts(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4 text-sm" dir="ltr">
                <div className="text-center mb-2">
                  <CreditCard
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: PALETTE.sage }}
                  />
                  <p style={{ color: PALETTE.text }}>
                    Si deseás colaborar con nuestra Luna de Miel:
                  </p>
                </div>

                {/* Transferencia */}
                <div className="p-4 rounded-lg" style={{ backgroundColor: PALETTE.paper }}>
                  <h4 className="font-medium mb-2" style={{ color: PALETTE.ink }}>
                    Transferencia Bancaria
                  </h4>
                  <div className="space-y-1 text-sm" style={{ color: PALETTE.text }}>
                    {renderBankLine("Banco", event.bank?.banco)}
                    {renderBankLine("CBU/IBAN", event.bank?.cbu)}
                    {renderBankLine("Alias", event.bank?.alias)}
                    {renderBankLine("Titular", event.bank?.titular)}
                    {renderBankLine("Cuenta", event.bank?.cuenta)}
                    {event.bank?.nota ? (
                      <p className="text-xs" style={{ color: PALETTE.muted }}>
                        {event.bank?.nota}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Mesa de regalos: links si los hay */}
                {(event.gifts || []).length > 0 && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: PALETTE.paper }}>
                    <h4 className="font-medium mb-2" style={{ color: PALETTE.ink }}>
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
                              style={{ color: PALETTE.sage }}
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

function TimeCell({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="font-light leading-none"
        style={{
          fontSize: "clamp(2.25rem, 7vw, 4.5rem)",
          color: "#FFFFFF",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div className="opacity-90 text-sm sm:text-base" style={{ color: "#FFFFFF" }}>
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
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <h3
        className="text-2xl font-display font-medium mb-6 tracking-wide"
        style={{ color: titleColor }}
      >
        {title}
      </h3>
      <div className="text-base" style={{ color: textColor }}>
        {children}
      </div>
    </div>
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
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
    ];
    const ds = dateStr.toLowerCase();
    const mIdx = meses.findIndex((m) => ds.includes(m));
    const dMatch = ds.match(/\d{1,2}/);
    const yMatch = ds.match(/\d{4}/);
    if (mIdx >= 0 && dMatch && yMatch) {
      const d = Number(dMatch[0]);
      const y = Number(yMatch[0]);
      return `${y}-${pad(mIdx + 1)}-${pad(d)}T${padTime(timeStr || "00:00")}`;
    }
  } catch {
    return null;
  }
  return null;
}
function pad(n) { return String(n).padStart(2, "0"); }
function padTime(hhmm) {
  const [h = "00", m = "00"] = (hhmm || "").split(":");
  return `${pad(h)}:${pad(m)}:00`;
}
