// src/components/templates/QuinceaneraCreativeTemplate.jsx
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
  Crown,
  Sparkles,
  Star,
} from "lucide-react";
import { asset, onImgError } from "../../utils/assets";

export default function QuinceaneraCreativeTemplate({ event, ui, setEvent }) {
  if (!event) return null;

  const isOn = (key) => {
    const s = event.sections || {};
    return s[key] !== false;
  };

  const COLORS = useMemo(() => {
    const c = event.colors || {};
    const primary = c.primary || "#E91E63"; // Rosa vibrante
    const secondary = c.secondary || "#FCE4EC"; // Rosa muy suave
    const text = c.text || "#2E2E2E";
    const darkDerived = mixHex(secondary, "#000000", 0.75);
    const dark = c.dark || darkDerived;
    return {
      primary,
      primaryText: "#FFFFFF",
      secondary,
      secondaryText: "#2E2E2E",
      ink: text,
      body: text,
      muted: "#6B7280",
      paper: "#FEFEFE",
      white: "#FFFFFF",
      primarySoft: toSoft(primary, 0.16),
      secondarySoft: toSoft(secondary, 0.12),
      dark,
      darkText: pickTextColor(dark),
    };
  }, [event.colors]);

  const fontPrimary = event.fonts?.primary || "'Playfair Display', serif";
  const fontSecondary = event.fonts?.secondary || "'Pacifico', cursive";

  const fontStyles = useMemo(() => {
    return `
      .font-primary { font-family: ${fontPrimary} !important; }
      .font-secondary { font-family: ${fontSecondary} !important; }
      .editable-text { font-family: inherit !important; }
    `;
  }, [fontPrimary, fontSecondary]);

  const heroTexture = event.images?.heroTexture || asset("src/assets/portada.webp");

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

      {/* ===== HERO CREATIVO 2 COLUMNAS ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen">
            
            {/* COLUMNA IZQUIERDA - IMAGEN */}
            <div className="relative overflow-hidden lg:order-1 order-2">
              <div className="absolute inset-0">
                <img
                  src={heroTexture}
                  onError={(e) => onImgError(e, "Textura")}
                  alt="Textura"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              </div>

              {/* Decoraciones flotantes */}
              <div className="absolute top-16 left-16 opacity-40">
                <Star className="w-12 h-12" style={{ color: COLORS.primary }} />
              </div>
              <div className="absolute top-32 right-20 opacity-30">
                <Sparkles className="w-10 h-10" style={{ color: COLORS.primary }} />
              </div>
              <div className="absolute bottom-32 left-20 opacity-35">
                <Crown className="w-14 h-14" style={{ color: COLORS.primary }} />
              </div>
              <div className="absolute bottom-16 right-16 opacity-25">
                <Heart className="w-8 h-8" style={{ color: COLORS.primary }} />
              </div>

              {event?.images?.logo && (
                <div className="absolute top-8 left-8 w-[300px] h-[180px] opacity-90 pointer-events-none">
                  <img
                    src={event.images.logo}
                    onError={(e) => onImgError(e, "Logo")}
                    alt="Logo"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* COLUMNA DERECHA - INFORMACIÓN */}
            <div className="relative flex items-center justify-center lg:order-2 order-1 py-16 lg:py-0" style={{ backgroundColor: COLORS.secondary }}>
              <div className="text-center px-8 max-w-lg mx-auto">
                
                {/* Decoraciones en la información */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Star className="w-6 h-6" style={{ color: COLORS.primary }} />
                  <Crown className="w-8 h-8" style={{ color: COLORS.primary }} />
                  <Star className="w-6 h-6" style={{ color: COLORS.primary }} />
                </div>

                {/* Nombre principal */}
                <h1
                  className="font-secondary font-bold mb-6 tracking-wider"
                  style={{ 
                    color: COLORS.ink, 
                    fontSize: "clamp(3rem, 8vw, 5rem)", 
                    fontFamily: fontSecondary,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  <EditableText
                    value={event.quinceañera?.name || event.couple?.bride || "Valentina"}
                    onChange={(val) => setEvent((p) => ({ 
                      ...p, 
                      quinceañera: { ...p.quinceañera, name: val },
                      couple: { ...p.couple, bride: val }
                    }))}
                    ariaLabel="Nombre de la quinceañera"
                    className="px-1 editable-text"
                    singleLine
                    style={{ color: COLORS.ink, fontFamily: fontSecondary }}
                  />
                </h1>

                {/* Separador creativo */}
                <div className="flex items-center justify-center my-8">
                  <div className="h-1 w-16 rounded-full" style={{ backgroundColor: COLORS.primary }} />
                  <Sparkles className="mx-4 w-6 h-6" style={{ color: COLORS.primary }} />
                  <div className="h-1 w-16 rounded-full" style={{ backgroundColor: COLORS.primary }} />
                </div>

                {/* Título */}
                <p
                  className="font-primary font-bold mb-8 tracking-widest uppercase"
                  style={{ 
                    color: COLORS.primary, 
                    fontSize: "clamp(1.2rem, 3vw, 1.8rem)", 
                    fontFamily: fontPrimary,
                    letterSpacing: "0.2em"
                  }}
                >
                  MIS 15 AÑOS
                </p>

                {/* Fecha dividida en líneas como en la imagen de referencia */}
                <div className="mb-8 space-y-2">
                  <div className="flex items-center justify-center gap-4">
                    <div 
                      className="font-primary font-light text-lg tracking-wider"
                      style={{ color: COLORS.muted, fontFamily: fontPrimary }}
                    >
                      SÁBADO
                    </div>
                    <div className="h-px w-8" style={{ backgroundColor: COLORS.muted }} />
                    <div 
                      className="font-primary font-light text-lg tracking-wider"
                      style={{ color: COLORS.muted, fontFamily: fontPrimary }}
                    >
                      {event.time || "20:00"}
                    </div>
                  </div>
                  
                  <div 
                    className="font-primary font-bold text-2xl tracking-wider"
                    style={{ color: COLORS.ink, fontFamily: fontPrimary }}
                  >
                    <EditableText
                      value={event.date || "15 SEPTIEMBRE 2025"}
                      onChange={(v) => setEvent((p) => ({ ...p, date: v }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ color: COLORS.ink, fontFamily: fontPrimary }}
                    />
                  </div>
                  
                  <div 
                    className="font-primary font-light text-lg tracking-wider"
                    style={{ color: COLORS.muted, fontFamily: fontPrimary }}
                  >
                    <EditableText
                      value={event.celebration?.location || "Salón de Fiestas Princess"}
                      onChange={(v) => setEvent((p) => ({ ...p, celebration: { ...p.celebration, location: v } }))}
                      className="px-1 editable-text"
                      singleLine
                      style={{ color: COLORS.muted, fontFamily: fontPrimary }}
                    />
                  </div>
                </div>

                {/* Mensaje especial */}
                <p
                  className="font-secondary text-xl mb-8 italic"
                  style={{ 
                    color: COLORS.primary, 
                    fontFamily: fontSecondary 
                  }}
                >
                  ¡Quiero que seas parte de mi sueño!
                </p>

                {/* Botón de acción */}
                <CreativeButton
                  colors={COLORS}
                  onClick={() => setShowRSVP(true)}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  CONFIRMAR ASISTENCIA
                </CreativeButton>

                {/* Flecha hacia abajo */}
                <div className="animate-bounce mt-12 lg:hidden">
                  <ChevronDown className="w-8 h-8 mx-auto" style={{ color: COLORS.primary }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN CREATIVO ===== */}
      <section className="py-20" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-8 h-8" style={{ color: COLORS.primaryText }} />
              <Crown className="w-10 h-10" style={{ color: COLORS.primaryText }} />
              <Star className="w-8 h-8" style={{ color: COLORS.primaryText }} />
            </div>
            <h2
              className="font-secondary font-bold tracking-wide"
              style={{ 
                color: COLORS.primaryText, 
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)", 
                fontFamily: fontSecondary 
              }}
            >
              ¡Faltan para mi gran día!
            </h2>
          </div>

          <div className="flex items-stretch justify-center gap-6 sm:gap-10">
            <CreativeTimeCell value={timeLeft.days} label="días" color={COLORS.primaryText} />
            <CreativeSeparator color={COLORS.primaryText} />
            <CreativeTimeCell value={timeLeft.hours} label="hs" color={COLORS.primaryText} />
            <CreativeSeparator color={COLORS.primaryText} />
            <CreativeTimeCell value={timeLeft.minutes} label="min" color={COLORS.primaryText} />
            <CreativeSeparator color={COLORS.primaryText} />
            <CreativeTimeCell value={timeLeft.seconds} label="seg" color={COLORS.primaryText} />
          </div>
        </div>
      </section>

      {/* ===== CELEBRACIÓN ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <CreativeDetailCard
              icon={<PartyPopper className="w-12 h-12" style={{ color: COLORS.primary }} />}
              title="¡A CELEBRAR!"
              colors={COLORS}
              fontPrimary={fontPrimary}
              fontSecondary={fontSecondary}
            >
              <div className="space-y-6 mb-12">
                <p className="text-2xl font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                  <EditableText
                    value={event.celebration?.time || "20:00 hs"}
                    onChange={(v) => setEvent((p) => ({ ...p, celebration: { ...p.celebration, time: v } }))}
                    className="px-1 editable-text"
                    singleLine
                    style={{ fontFamily: fontPrimary }}
                  />
                </p>
                <p className="text-3xl font-bold font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                  <EditableText
                    value={event.celebration?.venue || "Salón de Fiestas Princess"}
                    onChange={(v) => setEvent((p) => ({ ...p, celebration: { ...p.celebration, venue: v } }))}
                    className="px-1 editable-text"
                    singleLine
                    style={{ fontFamily: fontPrimary }}
                  />
                </p>
                <p className="text-xl font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                  <EditableText
                    value={event.celebration?.location || "Córdoba Capital"}
                    onChange={(v) => setEvent((p) => ({ ...p, celebration: { ...p.celebration, location: v } }))}
                    className="px-1 editable-text"
                    singleLine
                    style={{ fontFamily: fontPrimary }}
                  />
                </p>
                <p className="text-2xl font-bold" style={{ color: COLORS.primary, fontFamily: fontSecondary }}>
                  ¡Vamos a bailar toda la noche!
                </p>
              </div>
              <CreativeButton
                colors={COLORS}
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${event.celebration?.address || "Salón de Fiestas Princess, Córdoba"}`,
                    "_blank"
                  )
                }
              >
                LLEGAR A LA FIESTA
              </CreativeButton>
            </CreativeDetailCard>
          </div>
        </div>
      </section>

      {/* ===== INSTAGRAM ===== */}
      {isOn("instagram") && (
        <section className="py-20" style={{ backgroundColor: COLORS.secondary }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Instagram className="w-12 h-12 mx-auto mb-6" style={{ color: COLORS.primary }} />
            <h2
              className="text-2xl font-secondary font-bold mb-6 tracking-wide"
              style={{ color: COLORS.ink, fontFamily: fontSecondary }}
            >
              ¡Compartí tus fotos!
            </h2>
            <p className="mb-8 max-w-2xl mx-auto font-primary text-lg" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
              Usá mi hashtag para que pueda ver todas las fotos de esta noche mágica.
            </p>
            <div className="text-4xl font-bold mb-8" style={{ color: COLORS.primary, fontFamily: fontSecondary }}>
              <EditableText
                value={event.hashtag || "#Valentina15"}
                onChange={(v) => setEvent((p) => ({ ...p, hashtag: v }))}
                className="px-1 editable-text"
                singleLine
                style={{ color: COLORS.primary, fontFamily: fontSecondary }}
              />
            </div>
            <CreativeButton
              colors={COLORS}
              onClick={() => window.open("https://instagram.com", "_blank")}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Ver en Instagram
            </CreativeButton>
          </div>
        </section>
      )}

      {/* ===== FOOTER ===== */}
      <footer className="py-16" style={{ backgroundColor: COLORS.dark, color: COLORS.darkText }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl mb-10 font-primary" style={{ fontFamily: fontPrimary }}>
            ¡Gracias por ser parte de mi sueño de princesa!
          </p>
          <div className="pt-8 border-t border-white/25">
            <p className="text-sm opacity-70 mb-6 font-primary" style={{ fontFamily: fontPrimary }}>
              Invitación digital creada con{" "}
              <span className="font-medium" style={{ color: COLORS.primary }}>
                Venite
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* ===== MODALES ===== */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
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
                    ¡Gracias por confirmar! Te espero para celebrar juntos.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: fontPrimary }}>
                      Nombre completo *
                    </label>
                    <Input
                      required
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                      style={{ fontFamily: fontPrimary }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: fontPrimary }}>
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                      placeholder="tu@email.com"
                      style={{ fontFamily: fontPrimary }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: fontPrimary }}>
                      ¿Asistirás? *
                    </label>
                    <select
                      required
                      value={rsvpData.attendance}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      style={{ fontFamily: fontPrimary }}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="yes">¡Sí, estaré ahí!</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>

                  {rsvpData.attendance === "yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: fontPrimary }}>
                        Número de acompañantes
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="5"
                        value={rsvpData.guests}
                        onChange={(e) => setRsvpData({ ...rsvpData, guests: parseInt(e.target.value || "0", 10) })}
                        style={{ fontFamily: fontPrimary }}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: fontPrimary }}>
                      Mensaje (opcional)
                    </label>
                    <Textarea
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                      placeholder="Déjame un mensaje especial..."
                      rows={3}
                      style={{ fontFamily: fontPrimary }}
                    />
                  </div>

                  <CreativeButton
                    type="submit"
                    colors={COLORS}
                    className="w-full"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Confirmar Asistencia
                  </CreativeButton>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

/* ===== COMPONENTES CREATIVOS ===== */

function CreativeButton({ 
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
    const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl transform hover:rotate-1";
    
    const sizeClasses = {
      sm: "px-8 py-3 text-sm",
      default: "px-12 py-4 text-base",
      lg: "px-16 py-5 text-lg"
    };
    
    const sizeClass = sizeClasses[size] || sizeClasses.default;
    
    switch (variant) {
      case "primary":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.primary, 
            color: colors.primaryText,
            border: `3px solid ${colors.primary}`,
            background: `linear-gradient(45deg, ${colors.primary}, ${colors.primary}dd)`
          }
        };
      case "secondary":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.white, 
            color: colors.primary,
            border: `3px solid ${colors.primary}`
          }
        };
      default:
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.primary, 
            color: colors.primaryText,
            border: `3px solid ${colors.primary}`,
            background: `linear-gradient(45deg, ${colors.primary}, ${colors.primary}dd)`
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

function CreativeTimeCell({ value, label, color = "#fff" }) {
  return (
    <div className="flex flex-col items-center bg-white/20 backdrop-blur-sm p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform">
      <div className="font-bold leading-none" style={{ fontSize: "clamp(3rem, 10vw, 6rem)", color }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="opacity-90 text-base sm:text-lg mt-3 font-bold" style={{ color }}>
        {label}
      </div>
    </div>
  );
}

function CreativeSeparator({ color = "#fff" }) {
  return (
    <div className="self-center font-bold opacity-80" style={{ color, fontSize: "clamp(2.5rem, 9vw, 5rem)" }}>
      ★
    </div>
  );
}

function CreativeDetailCard({ icon, title, children, colors, fontPrimary, fontSecondary }) {
  return (
    <div className="bg-white p-16 mx-4 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform">
      <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg" style={{ backgroundColor: colors.primarySoft }}>
        {icon}
      </div>
      <h3 
        className="text-4xl font-bold mb-10 tracking-wide" 
        style={{ color: colors.ink, fontFamily: fontSecondary }}
      >
        {title}
      </h3>
      {children}
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

function mixHex(color1, color2, weight) {
  const d2h = (d) => d.toString(16);
  const h2d = (h) => parseInt(h, 16);
  
  let color = "#";
  for (let i = 1; i <= 5; i += 2) {
    const v1 = h2d(color1.substr(i, 2));
    const v2 = h2d(color2.substr(i, 2));
    let val = d2h(Math.floor(v2 + (v1 - v2) * weight));
    while (val.length < 2) val = "0" + val;
    color += val;
  }
  return color;
}

function toSoft(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function pickTextColor(bgColor) {
  const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? '#000000' : '#FFFFFF';
}
