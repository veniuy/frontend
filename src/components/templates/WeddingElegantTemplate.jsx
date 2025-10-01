// src/components/templates/WeddingElegantTemplate.jsx
import React, { useEffect, useMemo, useState } from "react";
import EditableText from "../EditableText.jsx";
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
  Leaf,
  Crown,
} from "lucide-react";
import { asset, onImgError } from "../../utils/assets";

export default function WeddingElegantTemplate({ event, ui, setEvent }) {
  if (!event) return null;

  const isOn = (key) => {
    const s = event.sections || {};
    return s[key] !== false;
  };

  // Colores específicos para Boda Elegante
  const COLORS = useMemo(() => ({
    primary: "#8FAF86", // Verde salvia elegante
    primaryText: "#FFFFFF",
    secondary: "#D4B28A", // Dorado suave
    secondaryText: "#2E2E2E",
    accent: "#E8DCC6", // Beige cálido
    ink: "#2E2E2E",
    body: "#2E2E2E",
    muted: "#6B7B6B",
    paper: "#FEFEFE", // Blanco puro
    white: "#FFFFFF",
    primarySoft: "rgba(143, 175, 134, 0.16)",
    secondarySoft: "rgba(212, 178, 138, 0.12)",
    dark: "#2C3E2C",
    darkText: "#FFFFFF",
  }), []);

  const fontPrimary = "'Playfair Display', serif";
  const fontSecondary = "'Great Vibes', cursive";

  const fontStyles = useMemo(() => `
    .font-primary { font-family: ${fontPrimary} !important; }
    .font-secondary { font-family: ${fontSecondary} !important; }
    .editable-text { font-family: inherit !important; }
    .elegant-border { 
      border: 2px solid ${COLORS.secondary}; 
      border-radius: 12px;
    }
    .elegant-shadow {
      box-shadow: 0 8px 32px rgba(143, 175, 134, 0.25);
    }
  `, [fontPrimary, fontSecondary, COLORS.secondary]);

  const heroTexture = event.images?.heroTexture || asset("src/assets/portada.webp");
  const defaultGallery = [
    asset("src/assets/categoria_boda_grid.webp"),
    asset("src/assets/categoria_cumpleanos.webp"),
    asset("src/assets/categoria_invitaciones_digitales.webp"),
    asset("src/assets/categoria_productos_fotos.webp"),
    asset("src/assets/elegant-floral.jpg"),
    asset("src/assets/portada1.webp"),
  ];
  const galleryImages = (event.images?.gallery && event.images.gallery.length > 0 ? event.images.gallery : defaultGallery).slice(0, 6);

  // Cuenta regresiva
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const updateCountdown = () => {
      const targetDate = buildTargetDate(event.date, event.time);
      if (!targetDate) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.date, event.time]);

  const [showRSVP, setShowRSVP] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [rsvpData, setRsvpData] = useState({
    name: "",
    email: "",
    attendance: "",
    guests: 1,
    message: "",
    diet: [],
    dietOther: "",
  });

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    try {
      setEvent((p) => ({
        ...p,
        rsvps: [...(p.rsvps || []), { ...rsvpData, createdAt: new Date().toISOString() }],
      }));
    } catch {}
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowRSVP(false);
      setRsvpData({ name: "", email: "", attendance: "", guests: 1, message: "", diet: [], dietOther: "" });
    }, 2200);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.paper }}>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />

      {/* ===== HERO ELEGANTE ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo con overlay elegante */}
        <div className="absolute inset-0">
          <img
            src={heroTexture}
            onError={(e) => onImgError(e, "Textura")}
            alt="Textura"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        </div>

        {/* Decoraciones elegantes */}
        <div className="absolute top-12 left-12 opacity-30">
          <Leaf className="w-16 h-16" style={{ color: COLORS.primary }} />
        </div>
        <div className="absolute top-16 right-16 opacity-25">
          <Crown className="w-12 h-12" style={{ color: COLORS.secondary }} />
        </div>
        <div className="absolute bottom-16 left-16 opacity-30">
          <Heart className="w-14 h-14" style={{ color: COLORS.primary }} />
        </div>
        <div className="absolute bottom-12 right-12 opacity-25">
          <Leaf className="w-18 h-18" style={{ color: COLORS.secondary }} />
        </div>

        {/* Logo */}
        {event?.images?.logo && (
          <div className="absolute top-0 left-0 w-[420px] h-[260px] opacity-90 pointer-events-none">
            <img
              src={event.images.logo}
              onError={(e) => onImgError(e, "Logo")}
              alt="Logo"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        )}

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Marco elegante */}
          <div className="elegant-border elegant-shadow bg-white/95 backdrop-blur-sm p-16 mx-4">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Leaf className="w-8 h-8" style={{ color: COLORS.primary }} />
                <Heart className="w-6 h-6" style={{ color: COLORS.secondary }} />
                <Leaf className="w-8 h-8" style={{ color: COLORS.primary }} />
              </div>
            </div>
            
            <div className="mb-8">
              <h1
                className="font-secondary font-light tracking-wider"
                style={{ 
                  color: COLORS.ink, 
                  fontSize: "clamp(3rem, 10vw, 6rem)", 
                  fontFamily: fontSecondary,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <EditableText
                  value={event.couple?.bride || "Isabella"}
                  onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, bride: val } }))}
                  ariaLabel="Nombre de la novia"
                  className="px-1 editable-text"
                  singleLine
                  style={{ color: COLORS.ink, fontFamily: fontSecondary }}
                />
              </h1>
              
              <div className="flex items-center justify-center my-6">
                <div className="h-px w-16" style={{ backgroundColor: COLORS.secondary }} />
                <span 
                  className="mx-6 font-primary text-2xl font-light tracking-widest"
                  style={{ color: COLORS.secondary, fontFamily: fontPrimary }}
                >
                  &
                </span>
                <div className="h-px w-16" style={{ backgroundColor: COLORS.secondary }} />
              </div>
              
              <h1
                className="font-secondary font-light tracking-wider"
                style={{ 
                  color: COLORS.ink, 
                  fontSize: "clamp(3rem, 10vw, 6rem)", 
                  fontFamily: fontSecondary,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <EditableText
                  value={event.couple?.groom || "Sebastián"}
                  onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, groom: val } }))}
                  ariaLabel="Nombre del novio"
                  className="px-1 editable-text"
                  singleLine
                  style={{ color: COLORS.ink, fontFamily: fontSecondary }}
                />
              </h1>
            </div>

            <p
              className="font-primary font-light mb-8 tracking-wide"
              style={{ 
                color: COLORS.muted, 
                fontSize: "clamp(1.2rem, 4vw, 2rem)", 
                fontFamily: fontPrimary 
              }}
            >
              Nos casamos
            </p>

            <div className="flex items-center justify-center gap-4 text-lg" style={{ color: COLORS.muted, fontFamily: fontPrimary }}>
              <span>{event.date || "15 de Junio, 2025"}</span>
              <Heart className="w-4 h-4" style={{ color: COLORS.primary }} />
              <span>{event.time || "16:00 hs"}</span>
            </div>
          </div>

          <div className="animate-bounce mt-8">
            <ChevronDown className="w-8 h-8 mx-auto" style={{ color: COLORS.primary }} />
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN ELEGANTE ===== */}
      <section className="py-20" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Leaf className="w-8 h-8" style={{ color: COLORS.primaryText }} />
              <Heart className="w-6 h-6" style={{ color: COLORS.primaryText }} />
              <Leaf className="w-8 h-8" style={{ color: COLORS.primaryText }} />
            </div>
            <h2
              className="font-primary font-light tracking-wide"
              style={{ 
                color: COLORS.primaryText, 
                fontSize: "clamp(1.25rem, 3.5vw, 1.875rem)", 
                fontFamily: fontPrimary 
              }}
            >
              Faltan para nuestro gran día
            </h2>
          </div>

          <div className="flex items-stretch justify-center gap-6 sm:gap-8">
            <ElegantTimeCell value={timeLeft.days} label="días" color={COLORS.primaryText} />
            <ElegantSeparator color={COLORS.primaryText} />
            <ElegantTimeCell value={timeLeft.hours} label="hs" color={COLORS.primaryText} />
            <ElegantSeparator color={COLORS.primaryText} />
            <ElegantTimeCell value={timeLeft.minutes} label="min" color={COLORS.primaryText} />
            <ElegantSeparator color={COLORS.primaryText} />
            <ElegantTimeCell value={timeLeft.seconds} label="seg" color={COLORS.primaryText} />
          </div>
        </div>
      </section>

      {/* ===== CEREMONIA ===== */}
      {isOn("ceremony") && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">
              <ElegantDetailCard
                icon={<Church className="w-10 h-10" style={{ color: COLORS.primary }} />}
                title="CEREMONIA"
                colors={COLORS}
                fontPrimary={fontPrimary}
              >
                <div className="space-y-4 mb-10">
                  <p className="text-xl font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.ceremony?.time || "16:00 hs"}
                      onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, time: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-2xl font-medium font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.ceremony?.venue || "Iglesia San Francisco"}
                      onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, venue: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-lg font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.ceremony?.location || "Córdoba Capital"}
                      onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, location: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-lg" style={{ color: COLORS.primary, fontFamily: fontSecondary }}>
                    <EditableText
                      value={event.ceremony?.type || "Ceremonia Religiosa"}
                      onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, type: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ color: COLORS.primary, fontFamily: fontSecondary }}
                    />
                  </p>
                </div>
                <ElegantButton
                  colors={COLORS}
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${event.ceremony?.address || "Iglesia San Francisco, Córdoba"}`,
                      "_blank"
                    )
                  }
                >
                  LLEGAR A LA CEREMONIA
                </ElegantButton>
              </ElegantDetailCard>
            </div>
          </div>
        </section>
      )}

      {/* ===== RECEPCIÓN ===== */}
      {isOn("reception") && (
        <section className="py-20" style={{ backgroundColor: COLORS.accent }}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">
              <ElegantDetailCard
                icon={<PartyPopper className="w-10 h-10" style={{ color: COLORS.primary }} />}
                title="RECEPCIÓN"
                colors={COLORS}
                fontPrimary={fontPrimary}
              >
                <div className="space-y-4 mb-10">
                  <p className="text-xl font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.reception?.time || "19:00 hs"}
                      onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, time: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-2xl font-medium font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.reception?.venue || "Salón de Eventos Elegance"}
                      onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, venue: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-lg font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.reception?.location || "Villa Carlos Paz"}
                      onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, location: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-xl font-medium" style={{ color: COLORS.primary, fontFamily: fontSecondary }}>
                    ¡Los esperamos para celebrar juntos!
                  </p>
                </div>
                <ElegantButton
                  colors={COLORS}
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${event.reception?.address || "Salón Elegance, Villa Carlos Paz"}`,
                      "_blank"
                    )
                  }
                >
                  LLEGAR A LA RECEPCIÓN
                </ElegantButton>
              </ElegantDetailCard>
            </div>
          </div>
        </section>
      )}

      {/* ===== GALERÍA ELEGANTE ===== */}
      {isOn("gallery") && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-secondary font-medium mb-4 tracking-wide"
                style={{ color: COLORS.ink, fontFamily: fontSecondary }}
              >
                Nuestra Historia
              </h2>
              <div className="w-24 h-px mx-auto" style={{ backgroundColor: COLORS.secondary }} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((src, idx) => (
                <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-xl elegant-shadow group">
                  <img
                    src={src}
                    onError={(e) => onImgError(e, `Galería ${idx + 1}`)}
                    alt={`Galería ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== REGALOS ELEGANTE ===== */}
      {isOn("bank") && (
        <section className="py-20 text-center" style={{ backgroundColor: COLORS.secondary }}>
          <div className="max-w-3xl mx-auto px-4">
            <div className="elegant-border bg-white/95 backdrop-blur-sm p-10 mx-4">
              <Gift className="w-12 h-12 mx-auto mb-6" style={{ color: COLORS.primary }} />
              <h2
                className="text-2xl font-secondary font-medium mb-6 tracking-wide"
                style={{ color: COLORS.ink, fontFamily: fontSecondary }}
              >
                Regalos
              </h2>
              <p
                className="mb-8 font-primary text-lg leading-relaxed"
                style={{ color: COLORS.body, fontFamily: fontPrimary }}
              >
                <EditableText
                  value={event.giftsNote || "Si deseás realizarnos un regalo podés colaborar con nuestra luna de miel..."}
                  onChange={(v) => setEvent((p) => ({ ...p, giftsNote: v }))}
                  className="px-1 editable-text"
                  singleLine={false}
                  style={{ color: COLORS.body, fontFamily: fontPrimary }}
                />
              </p>
              <ElegantButton
                colors={COLORS}
                variant="secondary"
                onClick={() => setShowGifts(true)}
              >
                VER DATOS BANCARIOS
              </ElegantButton>
            </div>
          </div>
        </section>
      )}

      {/* ===== INSTAGRAM ELEGANTE ===== */}
      {isOn("instagram") && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="elegant-border bg-gradient-to-br from-green-50 to-yellow-50 p-10 mx-4">
              <Instagram className="w-12 h-12 mx-auto mb-6" style={{ color: COLORS.primary }} />
              <h2
                className="text-2xl font-secondary font-medium mb-6 tracking-wide"
                style={{ color: COLORS.ink, fontFamily: fontSecondary }}
              >
                Compartí tus fotos
              </h2>
              <p className="mb-8 max-w-2xl mx-auto font-primary text-lg" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                Usá nuestro hashtag para que podamos ver todas las fotos de este día tan especial.
              </p>
              <div className="text-3xl font-medium mb-8" style={{ color: COLORS.primary, fontFamily: fontSecondary }}>
                <EditableText
                  value={event.hashtag || "#IsabellaySebastiánSeCasan"}
                  onChange={(v) => setEvent((p) => ({ ...p, hashtag: v }))}
                  className="px-1 editable-text"
                  singleLine
                  style={{ color: COLORS.primary, fontFamily: fontSecondary }}
                />
              </div>
              <ElegantButton
                colors={COLORS}
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <Instagram className="w-5 h-5 mr-2" />
                Ver en Instagram
              </ElegantButton>
            </div>
          </div>
        </section>
      )}

      {/* ===== RSVP ELEGANTE ===== */}
      <section className="py-20 text-center" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-3xl mx-auto px-4">
          <Heart className="w-12 h-12 mx-auto mb-6" style={{ color: COLORS.primaryText }} />
          <h2
            className="text-3xl font-secondary font-medium mb-6 tracking-wide"
            style={{ color: COLORS.primaryText, fontFamily: fontSecondary }}
          >
            Confirmá tu asistencia
          </h2>
          <p
            className="mb-10 font-primary text-lg"
            style={{ 
              color: COLORS.primaryText, 
              fontFamily: fontPrimary 
            }}
          >
            <EditableText
              value={event.rsvpNote || "Por favor confirmanos tu asistencia antes del 1 de junio."}
              onChange={(v) => setEvent((p) => ({ ...p, rsvpNote: v }))}
              className="px-1 editable-text"
              singleLine={false}
              style={{ color: COLORS.primaryText, fontFamily: fontPrimary }}
            />
          </p>
          <ElegantButton
            colors={COLORS}
            variant="primary-inverse"
            onClick={() => setShowRSVP(true)}
          >
            <Heart className="w-5 h-5 mr-2" />
            CONFIRMAR ASISTENCIA
          </ElegantButton>
        </div>
      </section>

      {/* ===== FOOTER ELEGANTE ===== */}
      <footer className="py-16" style={{ backgroundColor: COLORS.dark, color: COLORS.darkText }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl mb-10 font-primary" style={{ fontFamily: fontPrimary }}>
            ¡Gracias por acompañarnos en este momento tan importante!
          </p>
          <div className="pt-8 border-t border-white/25">
            <p className="text-sm opacity-70 mb-6 font-primary" style={{ fontFamily: fontPrimary }}>
              Invitación digital creada con{" "}
              <span className="font-medium" style={{ color: COLORS.primary }}>
                Venite
              </span>
            </p>
            <div className="flex justify-center gap-4">
              <ElegantButton
                colors={COLORS}
                variant="outline-dark"
                size="sm"
                onClick={() => navigator.clipboard?.writeText(window.location.href).catch(() => {})}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </ElegantButton>
              <ElegantButton
                colors={COLORS}
                variant="outline-dark"
                size="sm"
                onClick={() => {}}
              >
                <Download className="w-4 h-4 mr-2" />
                Guardar
              </ElegantButton>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== MODALES (similares a quinceaños pero adaptados para bodas) ===== */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md elegant-shadow">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-medium font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                  Confirmar Asistencia
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRSVP(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {showSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.primary }} />
                  <h4 className="text-lg font-medium mb-2 font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                    ¡Confirmación Recibida!
                  </h4>
                  <p className="font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    Gracias por confirmar tu asistencia. ¡Los esperamos!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-6">
                  <ElegantInput
                    label="Nombre completo *"
                    required
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    placeholder="Tu nombre completo"
                    fontFamily={fontPrimary}
                  />

                  <ElegantInput
                    label="Email *"
                    type="email"
                    required
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                    placeholder="tu@email.com"
                    fontFamily={fontPrimary}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: fontPrimary }}>
                      ¿Asistirás? *
                    </label>
                    <select
                      required
                      value={rsvpData.attendance}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg elegant-border"
                      style={{ fontFamily: fontPrimary }}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="yes">Sí, asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>

                  {rsvpData.attendance === "yes" && (
                    <ElegantInput
                      label="Número de acompañantes"
                      type="number"
                      min="0"
                      max="5"
                      value={rsvpData.guests}
                      onChange={(e) => setRsvpData({ ...rsvpData, guests: parseInt(e.target.value || "0", 10) })}
                      fontFamily={fontPrimary}
                    />
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: fontPrimary }}>
                      Mensaje (opcional)
                    </label>
                    <Textarea
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                      placeholder="Déjanos un mensaje..."
                      rows={3}
                      className="elegant-border"
                      style={{ fontFamily: fontPrimary }}
                    />
                  </div>

                  <ElegantButton
                    type="submit"
                    colors={COLORS}
                    className="w-full"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Confirmar Asistencia
                  </ElegantButton>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de regalos */}
      {showGifts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md elegant-shadow">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-medium font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                  Datos Bancarios
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowGifts(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6 text-sm font-primary" style={{ fontFamily: fontPrimary }}>
                <div className="text-center mb-4">
                  <CreditCard className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.primary }} />
                  <p style={{ color: COLORS.body }}>
                    Si deseás colaborar con nuestra luna de miel:
                  </p>
                </div>

                <div className="elegant-border p-6 rounded-lg" style={{ backgroundColor: COLORS.paper }}>
                  <h4 className="font-medium mb-4" style={{ color: COLORS.ink }}>
                    Transferencia Bancaria
                  </h4>
                  <div className="space-y-2 text-sm" style={{ color: COLORS.body }}>
                    {renderBankLine("Banco", event.bank?.banco)}
                    {renderBankLine("CBU/IBAN", event.bank?.cbu)}
                    {renderBankLine("Alias", event.bank?.alias)}
                    {renderBankLine("Titular", event.bank?.titular)}
                    {renderBankLine("Cuenta", event.bank?.cuenta)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

/* ===== COMPONENTES ELEGANTES ===== */

function ElegantButton({ 
  children, 
  colors, 
  variant = "primary", 
  size = "default", 
  className = "", 
  onClick, 
  type,
  ...props 
}) {
  const getButtonStyles = () => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 elegant-shadow";
    
    const sizeClasses = {
      sm: "px-6 py-2 text-sm",
      default: "px-8 py-3 text-base",
      lg: "px-10 py-4 text-lg"
    };
    
    const sizeClass = sizeClasses[size] || sizeClasses.default;
    
    switch (variant) {
      case "primary":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.primary, 
            color: colors.primaryText,
            border: `2px solid ${colors.primary}`
          }
        };
      case "secondary":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.white, 
            color: colors.secondary,
            border: `2px solid ${colors.secondary}`
          }
        };
      case "primary-inverse":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.white, 
            color: colors.primary,
            border: `2px solid ${colors.white}`
          }
        };
      case "outline-dark":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: "transparent", 
            color: colors.darkText,
            border: `2px solid ${colors.darkText}`
          }
        };
      default:
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.primary, 
            color: colors.primaryText,
            border: `2px solid ${colors.primary}`
          }
        };
    }
  };

  const buttonProps = getButtonStyles();
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonProps.className}
      style={buttonProps.style}
      {...props}
    >
      {children}
    </button>
  );
}

function ElegantTimeCell({ value, label, color = "#fff" }) {
  return (
    <div className="flex flex-col items-center elegant-border bg-white/10 backdrop-blur-sm p-4 rounded-xl">
      <div className="font-light leading-none" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", color }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="opacity-90 text-sm sm:text-base mt-2" style={{ color }}>
        {label}
      </div>
    </div>
  );
}

function ElegantSeparator({ color = "#fff" }) {
  return (
    <div className="self-center font-light opacity-60" style={{ color, fontSize: "clamp(2rem, 7vw, 4rem)" }}>
      :
    </div>
  );
}

function ElegantDetailCard({ icon, title, children, colors, fontPrimary }) {
  return (
    <div className="elegant-border elegant-shadow bg-white p-12 mx-4">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: colors.primarySoft }}>
        {icon}
      </div>
      <h3 
        className="text-3xl font-medium mb-8 tracking-wide font-primary" 
        style={{ color: colors.ink, fontFamily: fontPrimary }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function ElegantInput({ label, fontFamily, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily }}>
        {label}
      </label>
      <Input
        {...props}
        className="elegant-border p-3"
        style={{ fontFamily }}
      />
    </div>
  );
}

function renderBankLine(label, value) {
  if (!value) return null;
  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

function buildTargetDate(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  
  try {
    let day, month, year;
    
    if (dateStr.includes('/') || dateStr.includes('-')) {
      const separator = dateStr.includes('/') ? '/' : '-';
      const parts = dateStr.split(separator);
      if (parts.length === 3) {
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
      }
    } else if (dateStr.includes(' de ')) {
      const monthNames = {
        'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6,
        'julio': 7, 'agosto': 8, 'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
      };
      
      const parts = dateStr.toLowerCase().split(' ');
      if (parts.length >= 4) {
        day = parseInt(parts[0], 10);
        month = monthNames[parts[2]] || 1;
        year = parseInt(parts[3].replace(',', ''), 10);
      }
    }
    
    if (!day || !month || !year) return null;
    
    const timeParts = timeStr.split(':');
    const hours = parseInt(timeParts[0], 10) || 0;
    const minutes = parseInt(timeParts[1], 10) || 0;
    
    return new Date(year, month - 1, day, hours, minutes, 0);
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
}
