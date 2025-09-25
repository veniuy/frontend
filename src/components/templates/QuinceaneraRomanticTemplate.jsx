// src/components/templates/QuinceaneraRomanticTemplate.jsx
import React, { useEffect, useMemo, useState } from "react";
import EditableText from "../EditableText.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  ChevronDown,
  PartyPopper,
  Gift,
  Instagram,
  Share2,
  Download,
  CreditCard,
  Music,
  X,
  CheckCircle,
  Flower,
  Flower2,
} from "lucide-react";
import { asset, onImgError } from "../../utils/assets";

export default function QuinceaneraRomanticTemplate({ event, ui, setEvent }) {
  if (!event) return null;

  const isOn = (key) => {
    const s = event.sections || {};
    return s[key] !== false;
  };

  // Colores específicos para Quinceaños Romántico
  const COLORS = useMemo(() => ({
    primary: "#EEC9C5", // Rosa blush
    primaryText: "#2E2E2E",
    secondary: "#C9C9C9", // Gris perla
    secondaryText: "#2E2E2E",
    accent: "#F4D7D7", // Rosa muy suave
    ink: "#2E2E2E",
    body: "#2E2E2E",
    muted: "#8B7D7D",
    paper: "#FEFEFE", // Blanco puro
    white: "#FFFFFF",
    primarySoft: "rgba(238, 201, 197, 0.16)",
    secondarySoft: "rgba(201, 201, 201, 0.12)",
    dark: "#4A3C3C",
    darkText: "#FFFFFF",
  }), []);

  const fontPrimary = "'Cormorant Garamond', serif";
  const fontSecondary = "'Pinyon Script', cursive";

  const fontStyles = useMemo(() => `
    .font-primary { font-family: ${fontPrimary} !important; }
    .font-secondary { font-family: ${fontSecondary} !important; }
    .editable-text { font-family: inherit !important; }
    .romantic-border { 
      border: 1px solid ${COLORS.accent}; 
      border-radius: 20px;
    }
    .romantic-shadow {
      box-shadow: 0 10px 40px rgba(238, 201, 197, 0.25);
    }
    .romantic-gradient {
      background: linear-gradient(135deg, ${COLORS.paper} 0%, ${COLORS.accent} 100%);
    }
  `, [fontPrimary, fontSecondary, COLORS.accent, COLORS.paper]);

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
    <div className="min-h-screen romantic-gradient">
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />

      {/* ===== HERO ROMÁNTICO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo con overlay suave */}
        <div className="absolute inset-0">
          <img
            src={heroTexture}
            onError={(e) => onImgError(e, "Textura")}
            alt="Textura"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-pink-50/60 to-white/40" />
        </div>

        {/* Decoraciones florales */}
        <div className="absolute top-12 left-12 opacity-20">
          <Flower className="w-20 h-20" style={{ color: COLORS.primary }} />
        </div>
        <div className="absolute top-20 right-16 opacity-25">
          <Flower2 className="w-16 h-16" style={{ color: COLORS.primary }} />
        </div>
        <div className="absolute bottom-16 left-16 opacity-20">
          <Heart className="w-14 h-14" style={{ color: COLORS.primary }} />
        </div>
        <div className="absolute bottom-12 right-12 opacity-25">
          <Flower className="w-18 h-18" style={{ color: COLORS.primary }} />
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
          {/* Marco romántico */}
          <div className="romantic-border romantic-shadow bg-white/90 backdrop-blur-sm p-16 mx-4">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Flower className="w-8 h-8" style={{ color: COLORS.primary }} />
                <Heart className="w-6 h-6" style={{ color: COLORS.primary }} />
                <Flower2 className="w-8 h-8" style={{ color: COLORS.primary }} />
              </div>
            </div>
            
            <h1
              className="font-secondary font-light mb-8 tracking-wider"
              style={{ 
                color: COLORS.ink, 
                fontSize: "clamp(4rem, 14vw, 9rem)", 
                fontFamily: fontSecondary,
                textShadow: "1px 1px 3px rgba(0,0,0,0.1)"
              }}
            >
              <EditableText
                value={event.couple?.bride || event.quinceañera?.name || "Valentina"}
                onChange={(val) => setEvent((p) => ({ 
                  ...p, 
                  couple: { ...p.couple, bride: val },
                  quinceañera: { ...p.quinceañera, name: val }
                }))}
                ariaLabel="Nombre de la quinceañera"
                className="px-1 editable-text"
                singleLine
                style={{ color: COLORS.ink, fontFamily: fontSecondary }}
              />
            </h1>

            <div className="flex items-center justify-center my-10">
              <div className="h-px w-24" style={{ backgroundColor: COLORS.primary }} />
              <div className="mx-8 flex items-center gap-3">
                <Flower2 className="w-5 h-5" style={{ color: COLORS.primary }} />
                <span 
                  className="font-primary text-3xl font-light tracking-widest"
                  style={{ color: COLORS.primary, fontFamily: fontPrimary }}
                >
                  XV AÑOS
                </span>
                <Flower2 className="w-5 h-5" style={{ color: COLORS.primary }} />
              </div>
              <div className="h-px w-24" style={{ backgroundColor: COLORS.primary }} />
            </div>

            <p
              className="font-primary font-light mb-10 tracking-wide"
              style={{ 
                color: COLORS.muted, 
                fontSize: "clamp(1.3rem, 4.5vw, 2.2rem)", 
                fontFamily: fontPrimary 
              }}
            >
              Una celebración especial
            </p>

            <div className="flex items-center justify-center gap-6 text-lg" style={{ color: COLORS.muted, fontFamily: fontPrimary }}>
              <span>{event.date || "20 de Febrero, 2025"}</span>
              <Heart className="w-4 h-4" style={{ color: COLORS.primary }} />
              <span>{event.time || "19:30 hs"}</span>
            </div>
          </div>

          <div className="animate-bounce mt-10">
            <ChevronDown className="w-8 h-8 mx-auto" style={{ color: COLORS.primary }} />
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN ROMÁNTICO ===== */}
      <section className="py-20" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Flower className="w-8 h-8" style={{ color: COLORS.primaryText }} />
              <Heart className="w-6 h-6" style={{ color: COLORS.primaryText }} />
              <Flower className="w-8 h-8" style={{ color: COLORS.primaryText }} />
            </div>
            <h2
              className="font-primary font-light tracking-wide"
              style={{ 
                color: COLORS.primaryText, 
                fontSize: "clamp(1.4rem, 4vw, 2rem)", 
                fontFamily: fontPrimary 
              }}
            >
              Faltan para mi día especial
            </h2>
          </div>

          <div className="flex items-stretch justify-center gap-8 sm:gap-12">
            <RomanticTimeCell value={timeLeft.days} label="días" color={COLORS.primaryText} />
            <RomanticSeparator color={COLORS.primaryText} />
            <RomanticTimeCell value={timeLeft.hours} label="hs" color={COLORS.primaryText} />
            <RomanticSeparator color={COLORS.primaryText} />
            <RomanticTimeCell value={timeLeft.minutes} label="min" color={COLORS.primaryText} />
            <RomanticSeparator color={COLORS.primaryText} />
            <RomanticTimeCell value={timeLeft.seconds} label="seg" color={COLORS.primaryText} />
          </div>
        </div>
      </section>

      {/* ===== CELEBRACIÓN ROMÁNTICA ===== */}
      {isOn("reception") && (
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">
              <RomanticDetailCard
                icon={<PartyPopper className="w-12 h-12" style={{ color: COLORS.primary }} />}
                title="Mi Celebración"
                colors={COLORS}
                fontPrimary={fontPrimary}
              >
                <div className="space-y-6 mb-12">
                  <p className="text-2xl font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.reception?.time || event.time || "19:30 hs"}
                      onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, time: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-3xl font-medium font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.reception?.venue || "Salón Romántico"}
                      onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, venue: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-xl font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.reception?.location || "Villa Carlos Paz"}
                      onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, location: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-2xl font-medium" style={{ color: COLORS.primary, fontFamily: fontSecondary }}>
                    Te espero para compartir este momento único
                  </p>
                </div>
                <RomanticButton
                  colors={COLORS}
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${event.reception?.address || "Salón Romántico, Villa Carlos Paz"}`,
                      "_blank"
                    )
                  }
                >
                  LLEGAR A LA CELEBRACIÓN
                </RomanticButton>
              </RomanticDetailCard>
            </div>
          </div>
        </section>
      )}

      {/* ===== GALERÍA ROMÁNTICA ===== */}
      {isOn("gallery") && (
        <section className="py-24 romantic-gradient">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Flower className="w-8 h-8" style={{ color: COLORS.primary }} />
                <Heart className="w-6 h-6" style={{ color: COLORS.primary }} />
                <Flower2 className="w-8 h-8" style={{ color: COLORS.primary }} />
              </div>
              <h2
                className="text-4xl font-secondary font-medium mb-6 tracking-wide"
                style={{ color: COLORS.ink, fontFamily: fontSecondary }}
              >
                Momentos Preciosos
              </h2>
              <div className="w-32 h-px mx-auto" style={{ backgroundColor: COLORS.primary }} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {galleryImages.map((src, idx) => (
                <div key={idx} className="relative aspect-[4/3] overflow-hidden romantic-border romantic-shadow group">
                  <img
                    src={src}
                    onError={(e) => onImgError(e, `Galería ${idx + 1}`)}
                    alt={`Galería ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Heart className="w-6 h-6" style={{ color: COLORS.primary }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== REGALOS ROMÁNTICO ===== */}
      {isOn("bank") && (
        <section className="py-24 text-center" style={{ backgroundColor: COLORS.secondary }}>
          <div className="max-w-3xl mx-auto px-4">
            <div className="romantic-border romantic-shadow bg-white/95 backdrop-blur-sm p-12 mx-4">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Flower className="w-8 h-8" style={{ color: COLORS.primary }} />
                <Gift className="w-10 h-10" style={{ color: COLORS.primary }} />
                <Flower2 className="w-8 h-8" style={{ color: COLORS.primary }} />
              </div>
              <h2
                className="text-3xl font-secondary font-medium mb-8 tracking-wide"
                style={{ color: COLORS.ink, fontFamily: fontSecondary }}
              >
                Regalos del Corazón
              </h2>
              <p
                className="mb-10 font-primary text-xl leading-relaxed"
                style={{ color: COLORS.body, fontFamily: fontPrimary }}
              >
                <EditableText
                  value={event.giftsNote || "Si deseás realizarme un regalo podés colaborar con mi celebración especial..."}
                  onChange={(v) => setEvent((p) => ({ ...p, giftsNote: v }))}
                  className="px-1 editable-text"
                  singleLine={false}
                  style={{ color: COLORS.body, fontFamily: fontPrimary }}
                />
              </p>
              <RomanticButton
                colors={COLORS}
                variant="secondary"
                onClick={() => setShowGifts(true)}
              >
                VER DATOS BANCARIOS
              </RomanticButton>
            </div>
          </div>
        </section>
      )}

      {/* ===== INSTAGRAM ROMÁNTICO ===== */}
      {isOn("instagram") && (
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="romantic-border romantic-shadow bg-gradient-to-br from-pink-50 to-rose-50 p-12 mx-4">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Flower className="w-8 h-8" style={{ color: COLORS.primary }} />
                <Instagram className="w-10 h-10" style={{ color: COLORS.primary }} />
                <Flower2 className="w-8 h-8" style={{ color: COLORS.primary }} />
              </div>
              <h2
                className="text-3xl font-secondary font-medium mb-8 tracking-wide"
                style={{ color: COLORS.ink, fontFamily: fontSecondary }}
              >
                Compartí tus fotos
              </h2>
              <p className="mb-10 max-w-2xl mx-auto font-primary text-xl" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                Usá nuestro hashtag para que pueda ver todas las fotos de este día tan especial.
              </p>
              <div className="text-4xl font-medium mb-10" style={{ color: COLORS.primary, fontFamily: fontSecondary }}>
                <EditableText
                  value={event.hashtag || "#Mis15Años"}
                  onChange={(v) => setEvent((p) => ({ ...p, hashtag: v }))}
                  className="px-1 editable-text"
                  singleLine
                  style={{ color: COLORS.primary, fontFamily: fontSecondary }}
                />
              </div>
              <RomanticButton
                colors={COLORS}
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <Instagram className="w-5 h-5 mr-2" />
                Ver en Instagram
              </RomanticButton>
            </div>
          </div>
        </section>
      )}

      {/* ===== RSVP ROMÁNTICO ===== */}
      <section className="py-24 text-center" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Flower className="w-8 h-8" style={{ color: COLORS.primaryText }} />
            <Heart className="w-10 h-10" style={{ color: COLORS.primaryText }} />
            <Flower2 className="w-8 h-8" style={{ color: COLORS.primaryText }} />
          </div>
          <h2
            className="text-4xl font-secondary font-medium mb-8 tracking-wide"
            style={{ color: COLORS.primaryText, fontFamily: fontSecondary }}
          >
            Confirmá tu asistencia
          </h2>
          <p
            className="mb-12 font-primary text-xl"
            style={{ 
              color: COLORS.primaryText, 
              fontFamily: fontPrimary 
            }}
          >
            <EditableText
              value={event.rsvpNote || "Por favor confirmame tu asistencia antes del 10 de febrero."}
              onChange={(v) => setEvent((p) => ({ ...p, rsvpNote: v }))}
              className="px-1 editable-text"
              singleLine={false}
              style={{ color: COLORS.primaryText, fontFamily: fontPrimary }}
            />
          </p>
          <RomanticButton
            colors={COLORS}
            variant="primary-inverse"
            onClick={() => setShowRSVP(true)}
          >
            <Heart className="w-5 h-5 mr-2" />
            CONFIRMAR ASISTENCIA
          </RomanticButton>
        </div>
      </section>

      {/* ===== FOOTER ROMÁNTICO ===== */}
      <footer className="py-20" style={{ backgroundColor: COLORS.dark, color: COLORS.darkText }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-2xl mb-12 font-primary" style={{ fontFamily: fontPrimary }}>
            ¡Gracias por acompañarme en este momento tan importante!
          </p>
          <div className="pt-10 border-t border-white/25">
            <p className="text-sm opacity-70 mb-8 font-primary" style={{ fontFamily: fontPrimary }}>
              Invitación digital creada con{" "}
              <span className="font-medium" style={{ color: COLORS.primary }}>
                Venite
              </span>
            </p>
            <div className="flex justify-center gap-6">
              <RomanticButton
                colors={COLORS}
                variant="outline-dark"
                size="sm"
                onClick={() => navigator.clipboard?.writeText(window.location.href).catch(() => {})}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </RomanticButton>
              <RomanticButton
                colors={COLORS}
                variant="outline-dark"
                size="sm"
                onClick={() => {}}
              >
                <Download className="w-4 h-4 mr-2" />
                Guardar
              </RomanticButton>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== MODALES ROMÁNTICOS ===== */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md romantic-shadow">
            <CardContent className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-medium font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                  Confirmar Asistencia
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRSVP(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {showSuccess ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: COLORS.primary }} />
                  <h4 className="text-lg font-medium mb-4 font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                    ¡Confirmación Recibida!
                  </h4>
                  <p className="font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    Gracias por confirmar tu asistencia. ¡Te espero!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-8">
                  <RomanticInput
                    label="Nombre completo *"
                    required
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    placeholder="Tu nombre completo"
                    fontFamily={fontPrimary}
                  />

                  <RomanticInput
                    label="Email *"
                    type="email"
                    required
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                    placeholder="tu@email.com"
                    fontFamily={fontPrimary}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: fontPrimary }}>
                      ¿Asistirás? *
                    </label>
                    <select
                      required
                      value={rsvpData.attendance}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                      className="w-full p-4 border border-gray-300 rounded-xl romantic-border"
                      style={{ fontFamily: fontPrimary }}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="yes">Sí, asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>

                  {rsvpData.attendance === "yes" && (
                    <RomanticInput
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
                    <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: fontPrimary }}>
                      Mensaje (opcional)
                    </label>
                    <Textarea
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                      placeholder="Déjame un mensaje..."
                      rows={4}
                      className="romantic-border"
                      style={{ fontFamily: fontPrimary }}
                    />
                  </div>

                  <RomanticButton
                    type="submit"
                    colors={COLORS}
                    className="w-full"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Confirmar Asistencia
                  </RomanticButton>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de regalos romántico */}
      {showGifts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md romantic-shadow">
            <CardContent className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-medium font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                  Datos Bancarios
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowGifts(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-8 text-sm font-primary" style={{ fontFamily: fontPrimary }}>
                <div className="text-center mb-6">
                  <CreditCard className="w-12 h-12 mx-auto mb-6" style={{ color: COLORS.primary }} />
                  <p style={{ color: COLORS.body }}>
                    Si deseás colaborar con mi celebración:
                  </p>
                </div>

                <div className="romantic-border p-8 rounded-xl" style={{ backgroundColor: COLORS.paper }}>
                  <h4 className="font-medium mb-6" style={{ color: COLORS.ink }}>
                    Transferencia Bancaria
                  </h4>
                  <div className="space-y-3 text-sm" style={{ color: COLORS.body }}>
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

/* ===== COMPONENTES ROMÁNTICOS ===== */

function RomanticButton({ 
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
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 romantic-shadow";
    
    const sizeClasses = {
      sm: "px-8 py-3 text-sm",
      default: "px-10 py-4 text-base",
      lg: "px-12 py-5 text-lg"
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
            color: colors.primary,
            border: `2px solid ${colors.primary}`
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

function RomanticTimeCell({ value, label, color = "#fff" }) {
  return (
    <div className="flex flex-col items-center romantic-border bg-white/15 backdrop-blur-sm p-6 rounded-2xl">
      <div className="font-light leading-none" style={{ fontSize: "clamp(2.8rem, 9vw, 5.5rem)", color }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="opacity-90 text-base sm:text-lg mt-3" style={{ color }}>
        {label}
      </div>
    </div>
  );
}

function RomanticSeparator({ color = "#fff" }) {
  return (
    <div className="self-center font-light opacity-70" style={{ color, fontSize: "clamp(2.2rem, 8vw, 4.5rem)" }}>
      ♡
    </div>
  );
}

function RomanticDetailCard({ icon, title, children, colors, fontPrimary }) {
  return (
    <div className="romantic-border romantic-shadow bg-white p-16 mx-4">
      <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10" style={{ backgroundColor: colors.primarySoft }}>
        {icon}
      </div>
      <h3 
        className="text-4xl font-medium mb-10 tracking-wide font-primary" 
        style={{ color: colors.ink, fontFamily: fontPrimary }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function RomanticInput({ label, fontFamily, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3" style={{ fontFamily }}>
        {label}
      </label>
      <Input
        {...props}
        className="romantic-border p-4"
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
