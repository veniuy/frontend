// src/components/templates/WeddingInitialsTemplate.jsx
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
} from "lucide-react";
import { asset, onImgError } from "../../utils/assets";

export default function WeddingInitialsTemplate({ event, ui, setEvent }) {
  if (!event) return null;

  const isOn = (key) => {
    const s = event.sections || {};
    return s[key] !== false;
  };

  const COLORS = useMemo(() => {
    const c = event.colors || {};
    const primary = c.primary || "#8FAF86";
    const secondary = c.secondary || "#D4B28A";
    const text = c.text || "#2E2E2E";
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

  const fontStyles = useMemo(() => {
    return `
      .font-primary { font-family: ${fontPrimary} !important; }
      .font-secondary { font-family: ${fontSecondary} !important; }
      .editable-text { font-family: inherit !important; }
    `;
  }, [fontPrimary, fontSecondary]);

  const heroTexture = event.images?.heroTexture || asset("src/assets/portada.webp");

  // Obtener iniciales
  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "";
  const brideInitial = getInitial(event.couple?.bride || "B");
  const groomInitial = getInitial(event.couple?.groom || "A");

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

      {/* ===== HERO CON INICIALES ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroTexture}
            onError={(e) => onImgError(e, "Textura")}
            alt="Textura"
            className="absolute inset-0 w-full h-full object-cover object-center block"
          />
        </div>

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
          {/* Iniciales grandes estilo R&T */}
          <div className="relative mb-8">
            {/* Fecha en esquinas como en la imagen de referencia */}
            <div className="absolute -top-8 -left-8 text-right">
              <div 
                className="font-primary text-lg font-light tracking-wider"
                style={{ color: COLORS.ink, fontFamily: fontPrimary }}
              >
                JU
              </div>
              <div 
                className="font-primary text-lg font-light tracking-wider"
                style={{ color: COLORS.ink, fontFamily: fontPrimary }}
              >
                NE
              </div>
            </div>
            
            <div className="absolute -top-8 -right-8 text-left">
              <div 
                className="font-primary text-lg font-light tracking-wider"
                style={{ color: COLORS.ink, fontFamily: fontPrimary }}
              >
                20
              </div>
              <div 
                className="font-primary text-lg font-light tracking-wider"
                style={{ color: COLORS.ink, fontFamily: fontPrimary }}
              >
                25
              </div>
            </div>

            {/* Iniciales principales */}
            <div className="flex items-center justify-center">
              <span
                className="font-primary font-light tracking-wider"
                style={{ 
                  color: COLORS.ink, 
                  fontSize: "clamp(8rem, 20vw, 16rem)", 
                  fontFamily: fontPrimary,
                  lineHeight: "0.8"
                }}
              >
                {brideInitial}
              </span>
              
              <div className="mx-8">
                <div
                  className="font-secondary font-light"
                  style={{ 
                    color: COLORS.primary, 
                    fontSize: "clamp(3rem, 8vw, 6rem)", 
                    fontFamily: fontSecondary 
                  }}
                >
                  &
                </div>
              </div>
              
              <span
                className="font-primary font-light tracking-wider"
                style={{ 
                  color: COLORS.ink, 
                  fontSize: "clamp(8rem, 20vw, 16rem)", 
                  fontFamily: fontPrimary,
                  lineHeight: "0.8"
                }}
              >
                {groomInitial}
              </span>
            </div>
          </div>

          {/* Nombres completos más pequeños */}
          <div className="mb-8">
            <h2
              className="font-secondary font-light mb-2 tracking-wider"
              style={{ 
                color: COLORS.muted, 
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)", 
                fontFamily: fontSecondary 
              }}
            >
              <EditableText
                value={event.couple?.bride || "Belén"}
                onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, bride: val } }))}
                ariaLabel="Nombre de la novia"
                className="px-1 editable-text"
                singleLine
                style={{ color: COLORS.muted, fontFamily: fontSecondary }}
              />
            </h2>
            
            <div className="flex items-center justify-center my-3">
              <div className="h-px w-12" style={{ backgroundColor: "#CFCFCF" }} />
              <span 
                className="mx-3 font-secondary text-lg"
                style={{ color: COLORS.primary, fontFamily: fontSecondary }}
              >
                &
              </span>
              <div className="h-px w-12" style={{ backgroundColor: "#CFCFCF" }} />
            </div>
            
            <h2
              className="font-secondary font-light tracking-wider"
              style={{ 
                color: COLORS.muted, 
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)", 
                fontFamily: fontSecondary 
              }}
            >
              <EditableText
                value={event.couple?.groom || "Amadeo"}
                onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, groom: val } }))}
                ariaLabel="Nombre del novio"
                className="px-1 editable-text"
                singleLine
                style={{ color: COLORS.muted, fontFamily: fontSecondary }}
              />
            </h2>
          </div>

          <p
            className="font-primary font-light mb-10 tracking-wide"
            style={{ 
              color: COLORS.muted, 
              fontSize: "clamp(1rem, 3vw, 1.3rem)", 
              fontFamily: fontPrimary 
            }}
          >
            NOS CASAMOS
          </p>

          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto" style={{ color: COLORS.primary }} />
          </div>
        </div>
      </section>

      {/* Resto de secciones igual que WeddingElegantTemplate */}
      {/* ===== COUNTDOWN ===== */}
      <section className="py-20" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="font-primary font-light mb-10 tracking-wide"
            style={{ 
              color: COLORS.primaryText, 
              fontSize: "clamp(1.25rem, 3.5vw, 1.875rem)", 
              fontFamily: fontPrimary 
            }}
          >
            Faltan para nuestro gran día
          </h2>

          <div className="flex items-stretch justify-center gap-6 sm:gap-8">
            <TimeCell value={timeLeft.days} label="días" color={COLORS.primaryText} />
            <TimeSeparator color={COLORS.primaryText} />
            <TimeCell value={timeLeft.hours} label="hs" color={COLORS.primaryText} />
            <TimeSeparator color={COLORS.primaryText} />
            <TimeCell value={timeLeft.minutes} label="min" color={COLORS.primaryText} />
            <TimeSeparator color={COLORS.primaryText} />
            <TimeCell value={timeLeft.seconds} label="seg" color={COLORS.primaryText} />
          </div>
        </div>
      </section>

      {/* ===== CEREMONIA ===== */}
      {isOn("ceremony") && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">
              <DetailCard
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
                <StyledButton
                  colors={COLORS}
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${event.ceremony?.address || "Iglesia San Francisco, Córdoba"}`,
                      "_blank"
                    )
                  }
                >
                  LLEGAR A LA CEREMONIA
                </StyledButton>
              </DetailCard>
            </div>
          </div>
        </section>
      )}

      {/* ===== RECEPCIÓN ===== */}
      {isOn("reception") && (
        <section className="py-20" style={{ backgroundColor: COLORS.secondary }}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">
              <DetailCard
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
                      value={event.reception?.venue || "Salón de Eventos"}
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
                </div>
                <StyledButton
                  colors={COLORS}
                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${event.reception?.address || "Salón de Eventos, Villa Carlos Paz"}`,
                      "_blank"
                    )
                  }
                >
                  LLEGAR A LA RECEPCIÓN
                </StyledButton>
              </DetailCard>
            </div>
          </div>
        </section>
      )}

      {/* ===== RSVP ===== */}
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
          <StyledButton
            colors={COLORS}
            variant="primary-inverse"
            onClick={() => setShowRSVP(true)}
          >
            <Heart className="w-5 h-5 mr-2" />
            CONFIRMAR ASISTENCIA
          </StyledButton>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
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
              <StyledButton
                colors={COLORS}
                variant="outline-dark"
                size="sm"
                onClick={() => navigator.clipboard?.writeText(window.location.href).catch(() => {})}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </StyledButton>
              <StyledButton
                colors={COLORS}
                variant="outline-dark"
                size="sm"
                onClick={() => {}}
              >
                <Download className="w-4 h-4 mr-2" />
                Guardar
              </StyledButton>
            </div>
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
                    Gracias por confirmar tu asistencia. ¡Los esperamos!
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
                      <option value="yes">Sí, asistiré</option>
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
                      placeholder="Déjanos un mensaje..."
                      rows={3}
                      style={{ fontFamily: fontPrimary }}
                    />
                  </div>

                  <StyledButton
                    type="submit"
                    colors={COLORS}
                    className="w-full"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Confirmar Asistencia
                  </StyledButton>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

/* ===== COMPONENTES HELPER (iguales que WeddingElegantTemplate) ===== */

function StyledButton({ 
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
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95";
    
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

function TimeCell({ value, label, color = "#fff" }) {
  return (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
      <div className="font-light leading-none" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", color }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="opacity-90 text-sm sm:text-base mt-2" style={{ color }}>
        {label}
      </div>
    </div>
  );
}

function TimeSeparator({ color = "#fff" }) {
  return (
    <div className="self-center font-light opacity-60" style={{ color, fontSize: "clamp(2rem, 7vw, 4rem)" }}>
      :
    </div>
  );
}

function DetailCard({ icon, title, children, colors, fontPrimary }) {
  return (
    <div className="bg-white p-12 mx-4 rounded-xl shadow-lg">
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
