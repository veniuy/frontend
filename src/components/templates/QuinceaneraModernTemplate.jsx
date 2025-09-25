// src/components/templates/QuinceaneraModernTemplate.jsx
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
  Zap,
  Star,
  Sparkles,
  Crown,
} from "lucide-react";
import { asset, onImgError } from "../../utils/assets";

export default function QuinceaneraModernTemplate({ event, ui, setEvent }) {
  if (!event) return null;

  const isOn = (key) => {
    const s = event.sections || {};
    return s[key] !== false;
  };

  // Colores específicos para Quinceaños Moderno
  const COLORS = useMemo(() => ({
    primary: "#B7B79D", // Verde oliva moderno
    primaryText: "#FFFFFF",
    secondary: "#C16D4D", // Terracota vibrante
    secondaryText: "#FFFFFF",
    accent: "#E8D5B7", // Beige cálido
    ink: "#2E2E2E",
    body: "#2E2E2E",
    muted: "#6B6B6B",
    paper: "#FAFAFA", // Gris muy claro
    white: "#FFFFFF",
    primarySoft: "rgba(183, 183, 157, 0.16)",
    secondarySoft: "rgba(193, 109, 77, 0.12)",
    dark: "#1A1A1A",
    darkText: "#FFFFFF",
    neon: "#FFD700", // Dorado neón
  }), []);

  const fontPrimary = "Montserrat, sans-serif";
  const fontSecondary = "'Alex Brush', cursive";

  const fontStyles = useMemo(() => `
    .font-primary { font-family: ${fontPrimary} !important; }
    .font-secondary { font-family: ${fontSecondary} !important; }
    .editable-text { font-family: inherit !important; }
    .modern-border { 
      border: 3px solid ${COLORS.secondary}; 
      border-radius: 16px;
    }
    .modern-shadow {
      box-shadow: 0 12px 48px rgba(193, 109, 77, 0.25);
    }
    .modern-gradient {
      background: linear-gradient(135deg, ${COLORS.paper} 0%, ${COLORS.accent} 50%, ${COLORS.paper} 100%);
    }
    .neon-glow {
      box-shadow: 0 0 20px ${COLORS.neon}, 0 0 40px ${COLORS.neon}, 0 0 60px ${COLORS.neon};
    }
  `, [fontPrimary, fontSecondary, COLORS.secondary, COLORS.paper, COLORS.accent, COLORS.neon]);

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
    <div className="min-h-screen modern-gradient">
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />

      {/* ===== HERO MODERNO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo con overlay moderno */}
        <div className="absolute inset-0">
          <img
            src={heroTexture}
            onError={(e) => onImgError(e, "Textura")}
            alt="Textura"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
        </div>

        {/* Elementos geométricos modernos */}
        <div className="absolute top-16 left-16 opacity-20">
          <div className="w-24 h-24 border-4 border-yellow-400 rotate-45 neon-glow" />
        </div>
        <div className="absolute top-24 right-20 opacity-25">
          <Zap className="w-20 h-20" style={{ color: COLORS.neon }} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full neon-glow" />
        </div>
        <div className="absolute bottom-16 right-16 opacity-25">
          <Star className="w-18 h-18" style={{ color: COLORS.neon }} />
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
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Marco moderno */}
          <div className="modern-border modern-shadow bg-white/90 backdrop-blur-sm p-16 mx-4 relative overflow-hidden">
            {/* Elementos decorativos internos */}
            <div className="absolute top-4 right-4 opacity-30">
              <Sparkles className="w-8 h-8" style={{ color: COLORS.secondary }} />
            </div>
            <div className="absolute bottom-4 left-4 opacity-30">
              <Crown className="w-8 h-8" style={{ color: COLORS.primary }} />
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                <Zap className="w-8 h-8" style={{ color: COLORS.secondary }} />
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
              </div>
            </div>
            
            <h1
              className="font-secondary font-bold mb-8 tracking-wider"
              style={{ 
                color: COLORS.ink, 
                fontSize: "clamp(4.5rem, 16vw, 10rem)", 
                fontFamily: fontSecondary,
                textShadow: "3px 3px 6px rgba(0,0,0,0.2)"
              }}
            >
              <EditableText
                value={event.couple?.bride || event.quinceañera?.name || "Sophia"}
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
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500" />
              <div className="mx-8 flex items-center gap-4">
                <Star className="w-6 h-6" style={{ color: COLORS.secondary }} />
                <span 
                  className="font-primary text-4xl font-bold tracking-widest"
                  style={{ color: COLORS.secondary, fontFamily: fontPrimary }}
                >
                  15
                </span>
                <Star className="w-6 h-6" style={{ color: COLORS.secondary }} />
              </div>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-500" />
            </div>

            <p
              className="font-primary font-bold mb-10 tracking-wide uppercase"
              style={{ 
                color: COLORS.primary, 
                fontSize: "clamp(1.4rem, 5vw, 2.4rem)", 
                fontFamily: fontPrimary 
              }}
            >
              MY SWEET FIFTEEN
            </p>

            <div className="flex items-center justify-center gap-8 text-xl font-bold" style={{ color: COLORS.muted, fontFamily: fontPrimary }}>
              <span>{event.date || "25 de Marzo, 2025"}</span>
              <Zap className="w-5 h-5" style={{ color: COLORS.secondary }} />
              <span>{event.time || "21:00 hs"}</span>
            </div>
          </div>

          <div className="animate-bounce mt-10">
            <ChevronDown className="w-10 h-10 mx-auto" style={{ color: COLORS.secondary }} />
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN MODERNO ===== */}
      <section className="py-20" style={{ backgroundColor: COLORS.secondary }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Zap className="w-10 h-10" style={{ color: COLORS.secondaryText }} />
              <div className="w-4 h-4 bg-yellow-400 rounded-full neon-glow" />
              <Sparkles className="w-8 h-8" style={{ color: COLORS.secondaryText }} />
            </div>
            <h2
              className="font-primary font-bold tracking-wide uppercase"
              style={{ 
                color: COLORS.secondaryText, 
                fontSize: "clamp(1.6rem, 4.5vw, 2.2rem)", 
                fontFamily: fontPrimary 
              }}
            >
              COUNTDOWN TO MY PARTY
            </h2>
          </div>

          <div className="flex items-stretch justify-center gap-6 sm:gap-10">
            <ModernTimeCell value={timeLeft.days} label="DÍAS" color={COLORS.secondaryText} />
            <ModernSeparator color={COLORS.secondaryText} />
            <ModernTimeCell value={timeLeft.hours} label="HRS" color={COLORS.secondaryText} />
            <ModernSeparator color={COLORS.secondaryText} />
            <ModernTimeCell value={timeLeft.minutes} label="MIN" color={COLORS.secondaryText} />
            <ModernSeparator color={COLORS.secondaryText} />
            <ModernTimeCell value={timeLeft.seconds} label="SEG" color={COLORS.secondaryText} />
          </div>
        </div>
      </section>

      {/* ===== CELEBRACIÓN MODERNA ===== */}
      {isOn("reception") && (
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center">
              <ModernDetailCard
                icon={<PartyPopper className="w-14 h-14" style={{ color: COLORS.secondary }} />}
                title="THE PARTY"
                colors={COLORS}
                fontPrimary={fontPrimary}
              >
                <div className="space-y-6 mb-12">
                  <p className="text-3xl font-bold font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.reception?.time || event.time || "21:00 hs"}
                      onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, time: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-4xl font-bold font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.reception?.venue || "MODERN VENUE"}
                      onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, venue: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-2xl font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    <EditableText
                      value={event.reception?.location || "Buenos Aires"}
                      onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, location: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ fontFamily: fontPrimary }}
                    />
                  </p>
                  <p className="text-3xl font-bold" style={{ color: COLORS.secondary, fontFamily: fontSecondary }}>
                    Let's celebrate together!
                  </p>
                </div>
                <ModernButton
                  colors={COLORS}
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${event.reception?.address || "Modern Venue, Buenos Aires"}`,
                      "_blank"
                    )
                  }
                >
                  <Zap className="w-5 h-5 mr-2" />
                  GET DIRECTIONS
                </ModernButton>
              </ModernDetailCard>
            </div>
          </div>
        </section>
      )}

      {/* ===== GALERÍA MODERNA ===== */}
      {isOn("gallery") && (
        <section className="py-24" style={{ backgroundColor: COLORS.paper }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full neon-glow" />
                <Sparkles className="w-10 h-10" style={{ color: COLORS.secondary }} />
                <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full neon-glow" />
              </div>
              <h2
                className="text-5xl font-bold font-primary mb-8 tracking-wide uppercase"
                style={{ color: COLORS.ink, fontFamily: fontPrimary }}
              >
                MY MOMENTS
              </h2>
              <div className="w-40 h-1 mx-auto bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {galleryImages.map((src, idx) => (
                <div key={idx} className="relative aspect-[4/3] overflow-hidden modern-border modern-shadow group">
                  <img
                    src={src}
                    onError={(e) => onImgError(e, `Galería ${idx + 1}`)}
                    alt={`Galería ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Star className="w-6 h-6" style={{ color: COLORS.neon }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== REGALOS MODERNO ===== */}
      {isOn("bank") && (
        <section className="py-24 text-center" style={{ backgroundColor: COLORS.primary }}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="modern-border modern-shadow bg-white/95 backdrop-blur-sm p-12 mx-4">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Zap className="w-10 h-10" style={{ color: COLORS.secondary }} />
                <Gift className="w-12 h-12" style={{ color: COLORS.secondary }} />
                <Sparkles className="w-10 h-10" style={{ color: COLORS.secondary }} />
              </div>
              <h2
                className="text-4xl font-bold font-primary mb-8 tracking-wide uppercase"
                style={{ color: COLORS.ink, fontFamily: fontPrimary }}
              >
                GIFTS & WISHES
              </h2>
              <p
                className="mb-10 font-primary text-xl leading-relaxed"
                style={{ color: COLORS.body, fontFamily: fontPrimary }}
              >
                <EditableText
                  value={event.giftsNote || "Si querés colaborar con mi celebración podés hacerlo aquí..."}
                  onChange={(v) => setEvent((p) => ({ ...p, giftsNote: v }))}
                  className="px-1 editable-text"
                  singleLine={false}
                  style={{ color: COLORS.body, fontFamily: fontPrimary }}
                />
              </p>
              <ModernButton
                colors={COLORS}
                variant="secondary"
                onClick={() => setShowGifts(true)}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                VIEW BANK INFO
              </ModernButton>
            </div>
          </div>
        </section>
      )}

      {/* ===== INSTAGRAM MODERNO ===== */}
      {isOn("instagram") && (
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="modern-border modern-shadow bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-12 mx-4">
              <div className="flex items-center justify-center gap-4 mb-8">
                <Sparkles className="w-10 h-10" style={{ color: COLORS.secondary }} />
                <Instagram className="w-12 h-12" style={{ color: COLORS.secondary }} />
                <Zap className="w-10 h-10" style={{ color: COLORS.secondary }} />
              </div>
              <h2
                className="text-4xl font-bold font-primary mb-8 tracking-wide uppercase"
                style={{ color: COLORS.ink, fontFamily: fontPrimary }}
              >
                SHARE THE MOMENT
              </h2>
              <p className="mb-10 max-w-3xl mx-auto font-primary text-xl font-medium" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                Usá nuestro hashtag para que pueda ver todas las fotos de este día tan especial.
              </p>
              <div className="text-5xl font-bold mb-10" style={{ color: COLORS.secondary, fontFamily: fontSecondary }}>
                <EditableText
                  value={event.hashtag || "#Sophia15"}
                  onChange={(v) => setEvent((p) => ({ ...p, hashtag: v }))}
                  className="px-1 editable-text"
                  singleLine
                  style={{ color: COLORS.secondary, fontFamily: fontSecondary }}
                />
              </div>
              <ModernButton
                colors={COLORS}
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <Instagram className="w-5 h-5 mr-2" />
                VIEW ON INSTAGRAM
              </ModernButton>
            </div>
          </div>
        </section>
      )}

      {/* ===== RSVP MODERNO ===== */}
      <section className="py-24 text-center" style={{ backgroundColor: COLORS.secondary }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Zap className="w-10 h-10" style={{ color: COLORS.secondaryText }} />
            <Heart className="w-12 h-12" style={{ color: COLORS.secondaryText }} />
            <Sparkles className="w-10 h-10" style={{ color: COLORS.secondaryText }} />
          </div>
          <h2
            className="text-5xl font-bold font-primary mb-8 tracking-wide uppercase"
            style={{ color: COLORS.secondaryText, fontFamily: fontPrimary }}
          >
            CONFIRM YOUR ATTENDANCE
          </h2>
          <p
            className="mb-12 font-primary text-xl font-medium"
            style={{ 
              color: COLORS.secondaryText, 
              fontFamily: fontPrimary 
            }}
          >
            <EditableText
              value={event.rsvpNote || "Por favor confirmame tu asistencia antes del 15 de marzo."}
              onChange={(v) => setEvent((p) => ({ ...p, rsvpNote: v }))}
              className="px-1 editable-text"
              singleLine={false}
              style={{ color: COLORS.secondaryText, fontFamily: fontPrimary }}
            />
          </p>
          <ModernButton
            colors={COLORS}
            variant="primary-inverse"
            onClick={() => setShowRSVP(true)}
          >
            <Heart className="w-5 h-5 mr-2" />
            CONFIRM NOW
          </ModernButton>
        </div>
      </section>

      {/* ===== FOOTER MODERNO ===== */}
      <footer className="py-20" style={{ backgroundColor: COLORS.dark, color: COLORS.darkText }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-2xl mb-12 font-bold font-primary" style={{ fontFamily: fontPrimary }}>
            ¡GRACIAS POR ACOMPAÑARME EN ESTE MOMENTO TAN IMPORTANTE!
          </p>
          <div className="pt-10 border-t border-white/25">
            <p className="text-sm opacity-70 mb-8 font-primary" style={{ fontFamily: fontPrimary }}>
              Invitación digital creada con{" "}
              <span className="font-bold" style={{ color: COLORS.neon }}>
                Venite
              </span>
            </p>
            <div className="flex justify-center gap-6">
              <ModernButton
                colors={COLORS}
                variant="outline-dark"
                size="sm"
                onClick={() => navigator.clipboard?.writeText(window.location.href).catch(() => {})}
              >
                <Share2 className="w-4 h-4 mr-2" />
                SHARE
              </ModernButton>
              <ModernButton
                colors={COLORS}
                variant="outline-dark"
                size="sm"
                onClick={() => {}}
              >
                <Download className="w-4 h-4 mr-2" />
                SAVE
              </ModernButton>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== MODALES MODERNOS ===== */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md modern-shadow">
            <CardContent className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                  CONFIRM ATTENDANCE
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRSVP(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {showSuccess ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: COLORS.secondary }} />
                  <h4 className="text-lg font-bold mb-4 font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                    ¡CONFIRMACIÓN RECIBIDA!
                  </h4>
                  <p className="font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                    Gracias por confirmar tu asistencia. ¡Te espero!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-8">
                  <ModernInput
                    label="NOMBRE COMPLETO *"
                    required
                    value={rsvpData.name}
                    onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                    placeholder="Tu nombre completo"
                    fontFamily={fontPrimary}
                  />

                  <ModernInput
                    label="EMAIL *"
                    type="email"
                    required
                    value={rsvpData.email}
                    onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                    placeholder="tu@email.com"
                    fontFamily={fontPrimary}
                  />

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase" style={{ fontFamily: fontPrimary }}>
                      ¿ASISTIRÁS? *
                    </label>
                    <select
                      required
                      value={rsvpData.attendance}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                      className="w-full p-4 border-2 border-gray-300 rounded-lg modern-border font-bold"
                      style={{ fontFamily: fontPrimary }}
                    >
                      <option value="">SELECCIONA UNA OPCIÓN</option>
                      <option value="yes">SÍ, ASISTIRÉ</option>
                      <option value="no">NO PODRÉ ASISTIR</option>
                    </select>
                  </div>

                  {rsvpData.attendance === "yes" && (
                    <ModernInput
                      label="NÚMERO DE ACOMPAÑANTES"
                      type="number"
                      min="0"
                      max="5"
                      value={rsvpData.guests}
                      onChange={(e) => setRsvpData({ ...rsvpData, guests: parseInt(e.target.value || "0", 10) })}
                      fontFamily={fontPrimary}
                    />
                  )}

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase" style={{ fontFamily: fontPrimary }}>
                      MENSAJE (OPCIONAL)
                    </label>
                    <Textarea
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                      placeholder="Déjame un mensaje..."
                      rows={4}
                      className="modern-border font-medium"
                      style={{ fontFamily: fontPrimary }}
                    />
                  </div>

                  <ModernButton
                    type="submit"
                    colors={COLORS}
                    className="w-full"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    CONFIRM ATTENDANCE
                  </ModernButton>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de regalos moderno */}
      {showGifts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md modern-shadow">
            <CardContent className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                  BANK INFO
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowGifts(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-8 text-sm font-primary" style={{ fontFamily: fontPrimary }}>
                <div className="text-center mb-6">
                  <CreditCard className="w-12 h-12 mx-auto mb-6" style={{ color: COLORS.secondary }} />
                  <p className="font-bold" style={{ color: COLORS.body }}>
                    Si deseás colaborar con mi celebración:
                  </p>
                </div>

                <div className="modern-border p-8 rounded-lg" style={{ backgroundColor: COLORS.paper }}>
                  <h4 className="font-bold mb-6 uppercase" style={{ color: COLORS.ink }}>
                    TRANSFERENCIA BANCARIA
                  </h4>
                  <div className="space-y-3 text-sm font-medium" style={{ color: COLORS.body }}>
                    {renderBankLine("BANCO", event.bank?.banco)}
                    {renderBankLine("CBU/IBAN", event.bank?.cbu)}
                    {renderBankLine("ALIAS", event.bank?.alias)}
                    {renderBankLine("TITULAR", event.bank?.titular)}
                    {renderBankLine("CUENTA", event.bank?.cuenta)}
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

/* ===== COMPONENTES MODERNOS ===== */

function ModernButton({ 
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
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 modern-shadow";
    
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
            backgroundColor: colors.secondary, 
            color: colors.secondaryText,
            border: `3px solid ${colors.secondary}`
          }
        };
      case "secondary":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.white, 
            color: colors.secondary,
            border: `3px solid ${colors.secondary}`
          }
        };
      case "primary-inverse":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.white, 
            color: colors.secondary,
            border: `3px solid ${colors.white}`
          }
        };
      case "outline-dark":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: "transparent", 
            color: colors.darkText,
            border: `3px solid ${colors.darkText}`
          }
        };
      default:
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.secondary, 
            color: colors.secondaryText,
            border: `3px solid ${colors.secondary}`
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

function ModernTimeCell({ value, label, color = "#fff" }) {
  return (
    <div className="flex flex-col items-center modern-border bg-white/20 backdrop-blur-sm p-6 rounded-lg">
      <div className="font-bold leading-none" style={{ fontSize: "clamp(3rem, 10vw, 6rem)", color }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="opacity-90 text-base sm:text-lg mt-3 font-bold" style={{ color }}>
        {label}
      </div>
    </div>
  );
}

function ModernSeparator({ color = "#fff" }) {
  return (
    <div className="self-center font-bold opacity-80" style={{ color, fontSize: "clamp(2.5rem, 9vw, 5rem)" }}>
      :
    </div>
  );
}

function ModernDetailCard({ icon, title, children, colors, fontPrimary }) {
  return (
    <div className="modern-border modern-shadow bg-white p-16 mx-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 opacity-20">
        <Sparkles className="w-8 h-8" style={{ color: colors.secondary }} />
      </div>
      <div className="w-28 h-28 rounded-lg flex items-center justify-center mx-auto mb-10" style={{ backgroundColor: colors.primarySoft }}>
        {icon}
      </div>
      <h3 
        className="text-4xl font-bold mb-10 tracking-wide font-primary uppercase" 
        style={{ color: colors.ink, fontFamily: fontPrimary }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function ModernInput({ label, fontFamily, ...props }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase" style={{ fontFamily }}>
        {label}
      </label>
      <Input
        {...props}
        className="modern-border p-4 font-medium"
        style={{ fontFamily }}
      />
    </div>
  );
}

function renderBankLine(label, value) {
  if (!value) return null;
  return (
    <div className="flex justify-between">
      <span className="font-bold">{label}:</span>
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
