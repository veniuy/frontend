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

export default function InvitationCanvas({ event, ui, setEvent }) {
  if (!event) return null;

  const isOn = (key) => {
    const s = event.sections || {};
    return s[key] !== false; // default visible
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

  // Mejorar la aplicación de fuentes - asegurar que se apliquen consistentemente
  const fontPrimary = event.fonts?.primary || "'Cormorant Garamond', Serif";
  const fontSecondary = event.fonts?.secondary || "'Playfair Display', serif";

  // Crear estilos CSS dinámicos para aplicar fuentes globalmente
  const fontStyles = useMemo(() => {
    return `
      .font-primary { font-family: ${fontPrimary} !important; }
      .font-secondary { font-family: ${fontSecondary} !important; }
      .editable-text { font-family: inherit !important; }
    `;
  }, [fontPrimary, fontSecondary]);

  const heroTexture = event.images?.heroTexture || asset("src/assets/portada.webp");
  const defaultGallery = [
    asset("src/assets/categoria_boda_grid.webp"),
    asset("src/assets/categoria_cumpleanos.webp"),
    asset("src/assets/categoria_invitaciones_digitales.webp"),
    asset("src/assets/categoria_productos_fotos.webp"),
    asset("src/assets/elegant-floral.jpg"),
    asset("src/assets/portada1.webp"),
  ];
  const galleryImages =
    (event.images?.gallery && event.images.gallery.length > 0 ? event.images.gallery : defaultGallery).slice(0, 6);

  // Cuenta regresiva corregida
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

  const handleDietToggle = (key) =>
    setRsvpData((d) => {
      const set = new Set(d.diet || []);
      if (set.has(key)) set.delete(key);
      else set.add(key);
      return { ...d, diet: Array.from(set) };
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

  // Determinar si es quinceaños
  const isQuinceanera = event.template === "quinceanera";

  return (
    <div className="min-h-screen" dir={event?.direction || "ltr"} style={{ backgroundColor: COLORS.paper }}>
      {/* Inyectar estilos de fuente dinámicos */}
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />

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
          {isQuinceanera ? (
            // Layout para Quinceaños - Solo un nombre
            <>
              <h1
                className="font-secondary font-light mb-8 tracking-wider"
                style={{ 
                  color: COLORS.ink, 
                  fontSize: "clamp(3rem, 10vw, 7rem)", 
                  fontFamily: fontSecondary 
                }}
              >
                <EditableText
                  value={event.couple?.bride || event.quinceañera?.name || "Isabella"}
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
              <p
                className="font-primary font-light mb-10 tracking-wide"
                style={{ 
                  color: COLORS.muted, 
                  fontSize: "clamp(1.2rem, 4vw, 2rem)", 
                  fontFamily: fontPrimary 
                }}
              >
                MIS 15 AÑOS
              </p>
            </>
          ) : (
            // Layout para Bodas - Dos nombres
            <>
              <h1
                className="font-secondary font-light mb-3 tracking-wider"
                style={{ 
                  color: COLORS.ink, 
                  fontSize: "clamp(2.75rem, 8vw, 6rem)", 
                  fontFamily: fontSecondary 
                }}
              >
                <EditableText
                  value={event.couple?.bride || "Belén"}
                  onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, bride: val } }))}
                  ariaLabel="Nombre 1"
                  className="px-1 editable-text"
                  singleLine
                  style={{ color: COLORS.ink, fontFamily: fontSecondary }}
                />
              </h1>

              <div className="flex items-center justify-center my-6">
                <div className="h-px w-16" style={{ backgroundColor: "#CFCFCF" }} />
                <div
                  className="mx-4 font-light font-secondary"
                  style={{ 
                    color: COLORS.primary, 
                    fontSize: "clamp(1.75rem, 5vw, 3rem)", 
                    fontFamily: fontSecondary 
                  }}
                >
                  &
                </div>
                <div className="h-px w-16" style={{ backgroundColor: "#CFCFCF" }} />
              </div>

              <h1
                className="font-secondary font-light mb-8 tracking-wider"
                style={{ 
                  color: COLORS.ink, 
                  fontSize: "clamp(2.75rem, 8vw, 6rem)", 
                  fontFamily: fontSecondary 
                }}
              >
                <EditableText
                  value={event.couple?.groom || "Amadeo"}
                  onChange={(val) => setEvent((p) => ({ ...p, couple: { ...p.couple, groom: val } }))}
                  ariaLabel="Nombre 2"
                  className="px-1 editable-text"
                  singleLine
                  style={{ color: COLORS.ink, fontFamily: fontSecondary }}
                />
              </h1>

              <p
                className="font-primary font-light mb-10 tracking-wide"
                style={{ 
                  color: COLORS.muted, 
                  fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)", 
                  fontFamily: fontPrimary 
                }}
              >
                NOS CASAMOS
              </p>
            </>
          )}

          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto" style={{ color: COLORS.primary }} />
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN ===== */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-4xl mx-auto px-4 text-center" dir="ltr">
          <h2
            className="font-primary font-light mb-6 sm:mb-8 tracking-wide"
            style={{ 
              color: COLORS.primaryText, 
              fontSize: "clamp(1.25rem, 3.5vw, 1.875rem)", 
              fontFamily: fontPrimary 
            }}
          >
            {isQuinceanera ? "Bienvenidos a mis 15 años" : "Bienvenidos a nuestra boda"}
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

      {/* ===== DETALLES ===== */}
      {(isOn("ceremony") || isOn("reception")) && (
        <section className="py-16 bg-white" dir="ltr">
          <div className="max-w-4xl mx-auto px-4">
            <div className={`grid ${isQuinceanera ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-12`}>
              
              {/* Ceremonia - Solo para bodas */}
              {!isQuinceanera && isOn("ceremony") && (
                <DetailIconCard
                  icon={<Church className="w-8 h-8" style={{ color: COLORS.primary }} />}
                  iconBg={COLORS.primarySoft}
                  title={event.ceremony?.type === "civil" ? "CEREMONIA CIVIL" : "CEREMONIA"}
                  titleColor={COLORS.ink}
                  textColor={COLORS.body}
                  muted={COLORS.muted}
                  fontPrimary={fontPrimary}
                >
                  <div className="space-y-3 mb-8">
                    <p className="text-lg font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                      <EditableText
                        value={event.date || "23 de Noviembre, 2026"}
                        onChange={(v) => setEvent((p) => ({ ...p, date: v }))}
                        className="px-1 editable-text"
                        singleLine
                        style={{ fontFamily: fontPrimary }}
                      />
                    </p>
                    <p className="text-lg font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                      <EditableText
                        value={event.ceremony?.time || event.time || "19:00 hs"}
                        onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, time: v } }))}
                        className="px-1 editable-text"
                        singleLine
                        style={{ fontFamily: fontPrimary }}
                      />
                    </p>
                    <p className="font-medium font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                      <EditableText
                        value={event.ceremony?.venue || (event.ceremony?.type === "civil" ? "Registro Civil" : "Iglesia Nuestra Señora del Carmen")}
                        onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, venue: v } }))}
                        className="px-1 editable-text"
                        singleLine
                        style={{ fontFamily: fontPrimary }}
                      />
                    </p>
                    <p className="font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                      <EditableText
                        value={event.ceremony?.location || "Villa Allende, Córdoba"}
                        onChange={(v) => setEvent((p) => ({ ...p, ceremony: { ...p.ceremony, location: v } }))}
                        className="px-1 editable-text"
                        singleLine
                        style={{ fontFamily: fontPrimary }}
                      />
                    </p>
                    <p className="text-sm font-primary" style={{ color: COLORS.muted, fontFamily: fontPrimary }}>
                      Recibí debajo las indicaciones para llegar.
                    </p>
                  </div>
                  <StyledButton
                    colors={COLORS}
                    onClick={() =>
                      window.open(
                        `https://maps.google.com/?q=${event.ceremony?.address || "Av. San Martín 456, Villa Allende"}`,
                        "_blank"
                      )
                    }
                  >
                    LLEGAR A LA CEREMONIA
                  </StyledButton>
                </DetailIconCard>
              )}

              {/* Fiesta/Recepción */}
              {isOn("reception") && (
                <DetailIconCard
                  icon={<PartyPopper className="w-8 h-8" style={{ color: COLORS.primary }} />}
                  iconBg={COLORS.primarySoft}
                  title={isQuinceanera ? "CELEBRACIÓN" : "FIESTA"}
                  titleColor={COLORS.ink}
                  textColor={COLORS.body}
                  muted={COLORS.muted}
                  fontPrimary={fontPrimary}
                >
                  <div className="space-y-3 mb-8">
                    <p className="text-lg font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                      <EditableText
                        value={event.reception?.time || (isQuinceanera ? event.time || "20:00 hs" : "Después de la ceremonia")}
                        onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, time: v } }))}
                        className="px-1 editable-text"
                        singleLine
                        style={{ fontFamily: fontPrimary }}
                      />
                    </p>
                    <p className="font-medium font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                      <EditableText
                        value={event.reception?.venue || (isQuinceanera ? "Salón de Fiestas" : "Rincón Calina")}
                        onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, venue: v } }))}
                        className="px-1 editable-text"
                        singleLine
                        style={{ fontFamily: fontPrimary }}
                      />
                    </p>
                    <p className="font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                      <EditableText
                        value={event.reception?.location || "Unquillo, Córdoba"}
                        onChange={(v) => setEvent((p) => ({ ...p, reception: { ...p.reception, location: v } }))}
                        className="px-1 editable-text"
                        singleLine
                        style={{ fontFamily: fontPrimary }}
                      />
                    </p>
                    <p className="text-lg font-medium font-primary" style={{ color: COLORS.primary, fontFamily: fontPrimary }}>
                      {isQuinceanera ? "¡Te espero!" : "¡Te esperamos!"}
                    </p>
                  </div>
                  <StyledButton
                    colors={COLORS}
                    onClick={() =>
                      window.open(
                        `https://maps.google.com/?q=${event.reception?.address || "Ruta Provincial E-53 Km 8, Unquillo"}`,
                        "_blank"
                      )
                    }
                  >
                    {isQuinceanera ? "LLEGAR A LA CELEBRACIÓN" : "LLEGAR A LA FIESTA"}
                  </StyledButton>
                </DetailIconCard>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== GALERÍA (6 fotos) ===== */}
      {isOn("gallery") && (
        <section className="py-16" style={{ backgroundColor: COLORS.paper }} dir="ltr">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((src, idx) => (
                <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={src}
                    onError={(e) => onImgError(e, `Galería ${idx + 1}`)}
                    alt={`Galería ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover block"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== REGALOS / TRANSFERENCIAS ===== */}
      {isOn("bank") && (
        <section className="py-16 text-center" style={{ backgroundColor: COLORS.secondary }} dir="ltr">
          <div className="max-w-3xl mx-auto px-4">
            <Gift className="w-10 h-10 mx-auto mb-6" style={{ color: COLORS.secondaryText }} />
            <p
              className="mb-8 font-primary"
              style={{ 
                color: COLORS.secondaryText, 
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)", 
                fontFamily: fontPrimary 
              }}
            >
              <EditableText
                value={event.giftsNote || (isQuinceanera ? "Si deseás realizarme un regalo podés colaborar con mi fiesta..." : "Si deseás realizarnos un regalo podés colaborar con nuestra Luna de Miel…")}
                onChange={(v) => setEvent((p) => ({ ...p, giftsNote: v }))}
                className="px-1 editable-text"
                singleLine={false}
                style={{ color: COLORS.secondaryText, fontFamily: fontPrimary }}
              />
            </p>
            <StyledButton
              colors={COLORS}
              variant="secondary"
              onClick={() => setShowGifts(true)}
            >
              VER DATOS BANCARIOS
            </StyledButton>
          </div>
        </section>
      )}

      {/* ===== INSTAGRAM ===== */}
      {isOn("instagram") && (
        <section className="py-16 bg-white" dir="ltr">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: COLORS.primarySoft }}
            >
              <Instagram className="w-8 h-8" style={{ color: COLORS.primary }} />
            </div>
            <h2
              className="text-2xl font-secondary font-medium mb-6 tracking-wide"
              style={{ color: COLORS.ink, fontFamily: fontSecondary }}
            >
              COMPARTÍ TUS FOTOS
            </h2>
            <p className="mb-8 max-w-2xl mx-auto font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
              Usá nuestro hashtag para que podamos ver todas las fotos de este día tan especial.
            </p>
            <div className="text-2xl font-medium mb-8" style={{ color: COLORS.primary }}>
              <EditableText
                value={event.hashtag || (isQuinceanera ? "#Mis15Años" : "#NuestraBoda")}
                onChange={(v) => setEvent((p) => ({ ...p, hashtag: v }))}
                className="px-1 editable-text"
                singleLine
                style={{ color: COLORS.primary }}
              />
            </div>
            <StyledButton
              colors={COLORS}
              onClick={() => window.open("https://instagram.com", "_blank")}
            >
              <Instagram className="w-4 h-4 mr-2" />
              Ver en Instagram
            </StyledButton>
          </div>
        </section>
      )}

      {/* ===== RSVP ===== */}
      <section className="py-16 text-center" style={{ backgroundColor: COLORS.primary }} dir="ltr">
        <div className="max-w-3xl mx-auto px-4">
          <Heart className="w-10 h-10 mx-auto mb-6" style={{ color: COLORS.primaryText }} />
          <h2
            className="text-2xl font-secondary font-medium mb-6 tracking-wide"
            style={{ color: COLORS.primaryText, fontFamily: fontSecondary }}
          >
            CONFIRMÁ TU ASISTENCIA
          </h2>
          <p
            className="mb-8 font-primary"
            style={{ 
              color: COLORS.primaryText, 
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)", 
              fontFamily: fontPrimary 
            }}
          >
            <EditableText
              value={event.rsvpNote || "Por favor confirmanos tu asistencia antes del 15 de octubre."}
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
            <Heart className="w-4 h-4 mr-2" />
            CONFIRMAR ASISTENCIA
          </StyledButton>
        </div>
      </section>

      {/* ===== SUGERENCIAS MUSICALES ===== */}
      {isOn("songs") && (
        <section className="py-16 bg-white" dir="ltr">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2
              className="text-2xl font-secondary font-medium mb-6 tracking-wide"
              style={{ color: COLORS.ink, fontFamily: fontSecondary }}
            >
              ¿QUÉ CANCIONES NO PUEDEN FALTAR?
            </h2>
            <p className="mb-8 max-w-2xl mx-auto font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
              {isQuinceanera ? "¡Ayudame sugiriendo las canciones que pensás que no pueden faltar!" : "¡Ayudanos sugiriendo las canciones que pensás que no pueden faltar!"}
            </p>
            <StyledButton
              colors={COLORS}
              onClick={() => alert("Abrir formulario de canciones (pendiente)")}
            >
              <Music className="w-4 h-4 mr-2" />
              Sugerir canción
            </StyledButton>
          </div>
        </section>
      )}

      {/* ===== INFO ÚTIL ===== */}
      {isOn("info") && (
        <section className="py-16" style={{ backgroundColor: COLORS.paper }} dir="ltr">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2
              className="text-2xl font-secondary font-medium mb-6 tracking-wide"
              style={{ color: COLORS.ink, fontFamily: fontSecondary }}
            >
              INFO ÚTIL
            </h2>
            <p className="mb-8 max-w-2xl mx-auto font-primary" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
              <EditableText
                value={event.info?.help || "Te dejamos sugerencias de alojamientos y traslados para ese fin de semana."}
                onChange={(v) => setEvent((p) => ({ ...p, info: { ...(p.info || {}), help: v } }))}
                className="px-1 editable-text"
                singleLine={false}
                style={{ color: COLORS.body, fontFamily: fontPrimary }}
              />
            </p>
            <StyledButton
              colors={COLORS}
              variant="outline"
              onClick={() => setShowInfo(true)}
            >
              VER MÁS
            </StyledButton>
          </div>
        </section>
      )}

      {/* ===== FOOTER ===== */}
      <footer className="py-12" style={{ backgroundColor: COLORS.dark, color: COLORS.darkText }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-8 font-primary" style={{ fontFamily: fontPrimary }}>
            {isQuinceanera ? "¡Gracias por acompañarme en este momento tan importante!" : "¡Gracias por acompañarnos en este momento tan importante!"}
          </p>
          <div
            className="pt-8"
            style={{
              borderTop:
                pickTextColor(COLORS.dark) === "#FFFFFF" ? "1px solid rgba(255,255,255,.25)" : "1px solid rgba(0,0,0,.25)",
            }}
          >
            <p className="text-sm opacity-70 mb-4 font-primary" style={{ fontFamily: fontPrimary }}>
              Invitación digital creada con{" "}
              <span className="font-medium" style={{ color: COLORS.primary }}>
                Venite
              </span>
            </p>
            <div className="flex justify-center gap-3">
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
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
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
                    Gracias por confirmar tu asistencia. {isQuinceanera ? "¡Te espero!" : "¡Te esperamos!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-4" dir="ltr">
                  <Labeled label="Nombre completo *" fontFamily={fontPrimary}>
                    <Input
                      required
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                      style={{ fontFamily: fontPrimary }}
                    />
                  </Labeled>

                  <Labeled label="Email *" fontFamily={fontPrimary}>
                    <Input
                      type="email"
                      required
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                      placeholder="tu@email.com"
                      style={{ fontFamily: fontPrimary }}
                    />
                  </Labeled>

                  <Labeled label="¿Asistirás? *" fontFamily={fontPrimary}>
                    <select
                      required
                      value={rsvpData.attendance}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      style={{ fontFamily: fontPrimary }}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="yes">Sí, asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </Labeled>

                  {rsvpData.attendance === "yes" && (
                    <>
                      <Labeled label="Número de acompañantes" fontFamily={fontPrimary}>
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          value={rsvpData.guests}
                          onChange={(e) =>
                            setRsvpData({ ...rsvpData, guests: parseInt(e.target.value || "0", 10) })
                          }
                          style={{ fontFamily: fontPrimary }}
                        />
                      </Labeled>

                      <div className="space-y-2">
                        <span className="block text-sm text-gray-700" style={{ fontFamily: fontPrimary }}>
                          Preferencias alimentarias (opcional)
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {[
                            ["celiaco", "Celíaco/a"],
                            ["vegetariano", "Vegetariano/a"],
                            ["vegano", "Vegano/a"],
                            ["sin-cerdo", "Sin cerdo"],
                            ["sin-lactosa", "Sin lactosa"],
                          ].map(([key, label]) => (
                            <label key={key} className="inline-flex items-center gap-2" style={{ fontFamily: fontPrimary }}>
                              <input
                                type="checkbox"
                                checked={rsvpData.diet.includes(key)}
                                onChange={() => handleDietToggle(key)}
                              />
                              <span>{label}</span>
                            </label>
                          ))}
                        </div>
                        <Input
                          className="text-sm"
                          placeholder="Otras restricciones (especificar)"
                          value={rsvpData.dietOther}
                          onChange={(e) => setRsvpData({ ...rsvpData, dietOther: e.target.value })}
                          style={{ fontFamily: fontPrimary }}
                        />
                      </div>
                    </>
                  )}

                  <Labeled label="Mensaje (opcional)" fontFamily={fontPrimary}>
                    <Textarea
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                      placeholder="Déjanos un mensaje..."
                      rows={3}
                      style={{ fontFamily: fontPrimary }}
                    />
                  </Labeled>

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

      {showInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                  Información útil
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6 text-sm font-primary" dir="ltr" style={{ color: COLORS.body, fontFamily: fontPrimary }}>
                {event.info?.help && <p className="whitespace-pre-wrap">{event.info.help}</p>}

                {(event.info?.lodging || []).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: COLORS.ink }}>
                      Alojamiento recomendado
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {event.info.lodging.map((item, i) => (
                        <li key={i}>
                          {typeof item === "string" ? (
                            item
                          ) : (
                            <>
                              <span className="font-medium">{item.name}</span>
                              {item.url ? (
                                <>
                                  {" — "}
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline hover:opacity-80"
                                    style={{ color: COLORS.primary }}
                                  >
                                    Ver
                                  </a>
                                </>
                              ) : null}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(event.info?.transport || []).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: COLORS.ink }}>
                      Traslados / Transporte
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {event.info.transport.map((item, i) => (
                        <li key={i}>{typeof item === "string" ? item : `${item.name || ""} ${item.note || ""}`}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showGifts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium font-primary" style={{ color: COLORS.ink, fontFamily: fontPrimary }}>
                  Datos Bancarios
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowGifts(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4 text-sm font-primary" dir="ltr" style={{ fontFamily: fontPrimary }}>
                <div className="text-center mb-2">
                  <CreditCard className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.primary }} />
                  <p style={{ color: COLORS.body }}>
                    {isQuinceanera ? "Si deseás colaborar con mi celebración:" : "Si deseás colaborar con nuestra Luna de Miel:"}
                  </p>
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

/* ===== COMPONENTES MEJORADOS ===== */

// Botón estilizado que respeta los colores del tema - SIN EMOJIS
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
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 hover:opacity-90 active:scale-95";
    
    // Tamaños proporcionados
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      default: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
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
            border: `2px solid ${colors.white}`
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
      case "outline":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: "transparent", 
            color: colors.primary,
            border: `2px solid ${colors.primary}`
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

// Componente de label mejorado
function Labeled({ label, children, fontFamily }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily }}>
        {label}
      </label>
      {children}
    </div>
  );
}

/* ===== subcomponentes / helpers ===== */
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

function DetailIconCard({ icon, iconBg, title, titleColor, textColor, muted, children, fontPrimary }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <h3 
        className="text-2xl font-medium mb-6 tracking-wide font-primary" 
        style={{ color: titleColor, fontFamily: fontPrimary }}
      >
        {title}
      </h3>
      {children}
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

/* ===== HELPERS DE COLOR ===== */
function mixHex(hex1, hex2, ratio) {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function toSoft(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function pickTextColor(bgHex) {
  const r = parseInt(bgHex.slice(1, 3), 16);
  const g = parseInt(bgHex.slice(3, 5), 16);
  const b = parseInt(bgHex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

// Función mejorada para construir fecha objetivo
function buildTargetDate(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  
  try {
    // Intentar diferentes formatos de fecha
    let day, month, year;
    
    // Formato DD/MM/YYYY o DD-MM-YYYY
    if (dateStr.includes('/') || dateStr.includes('-')) {
      const separator = dateStr.includes('/') ? '/' : '-';
      const parts = dateStr.split(separator);
      if (parts.length === 3) {
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
      }
    }
    // Formato "DD de Mes, YYYY"
    else if (dateStr.includes(' de ')) {
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
    
    // Parsear hora
    const timeParts = timeStr.split(':');
    const hours = parseInt(timeParts[0], 10) || 0;
    const minutes = parseInt(timeParts[1], 10) || 0;
    
    return new Date(year, month - 1, day, hours, minutes, 0);
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
}

async function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}
