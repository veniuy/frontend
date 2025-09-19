// src/components/InvitationCanvas.jsx
import React, { useEffect, useMemo, useState } from "react";
import EditableText from "./EditableText.jsx";

/**
 * InvitationCanvas (Landing por franjas estilo "DemoBlack", editable)
 * Conectado al EditorPanel:
 *  - Colores: event.colors.{primary,secondary,background,text,accent}
 *  - Tipografías: event.fonts.{primary,secondary}
 *  - Template: ui.selectedTemplate | event.template (elegant|romantic|modern|classic)
 *  - Imágenes: event.images.{hero, floralTop, floralBottom} (desde pestaña Imágenes)
 *
 * Props:
 *  - event, ui, setEvent
 * Notas:
 *  - Evita libs externas (usa tailwind utilitario). Modales simples.
 *  - Forzamos dir="ltr" en campos editables para evitar escritura invertida.
 */

// ---------- Util: parseo de fecha/hora a ISO para countdown ----------
function pad2(n) { return String(n).padStart(2, "0"); }
function padTime(hhmm = "00:00") {
  const [h = "00", m = "00"] = String(hhmm).split(":");
  return `${pad2(h)}:${pad2(m)}:00`;
}
function buildTargetISO(dateStr, timeStr) {
  if (!dateStr) return null;
  try {
    const ddmmyyyy = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/;
    if (ddmmyyyy.test(dateStr.trim())) {
      const [, d, m, y] = dateStr.trim().match(ddmmyyyy);
      return `${y}-${pad2(m)}-${pad2(d)}T${padTime(timeStr)}`;
    }
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    const lower = dateStr.toLowerCase();
    const mi = meses.findIndex((m) => lower.includes(m));
    const dMatch = lower.match(/\d{1,2}/);
    const yMatch = lower.match(/\d{4}/);
    if (mi >= 0 && dMatch && yMatch) {
      const d = Number(dMatch[0]), y = Number(yMatch[0]);
      return `${y}-${pad2(mi+1)}-${pad2(d)}T${padTime(timeStr)}`;
    }
  } catch {}
  return null;
}

export default function InvitationCanvas({ event, ui, setEvent }) {
  if (!event) return null;

  // ====== TEMA: deriva de template + overrides desde event.colors ======
  const theme = useMemo(() => {
    const c = event.colors || {};
    const template = ui?.selectedTemplate || event.template || "elegant";
    const T = {
      elegant: {
        bandHeroOverlay: "rgba(255,255,255,0.6)",
        bandCountdown: c.accent || "#8faF86",
        bandDetails: "#ffffff",
        bandGifts: c.almond || "#D4B28A",
        bandDark: "#1F2937",
        bandInfo: c.background || "#F8F8F6",
      },
      romantic: {
        bandHeroOverlay: "rgba(255,240,245,0.65)",
        bandCountdown: c.accent || "#e91e63",
        bandDetails: "#ffffff",
        bandGifts: c.secondary || "#ffc0cb",
        bandDark: "#5B2245",
        bandInfo: c.background || "#FFF5F7",
      },
      modern: {
        bandHeroOverlay: "rgba(240,248,255,0.6)",
        bandCountdown: c.accent || "#10b981",
        bandDetails: "#ffffff",
        bandGifts: c.secondary || "#f59e0b",
        bandDark: "#0F172A",
        bandInfo: c.background || "#F1F5F9",
      },
      classic: {
        bandHeroOverlay: "rgba(250,250,250,0.6)",
        bandCountdown: c.accent || "#6366f1",
        bandDetails: "#ffffff",
        bandGifts: c.secondary || "#c29a6b",
        bandDark: "#2C2C2C",
        bandInfo: c.background || "#F5F5F0",
      },
    };
    return T[template] || T.elegant;
  }, [ui?.selectedTemplate, event.template, event.colors]);

  // ====== Variables rápidas desde event ======
  const colorPrimary   = event.colors?.primary   || "#222222"; // acentos/botones
  const colorSecondary = event.colors?.secondary || "#6B7280";
  const colorText      = event.colors?.text      || "#2E2E2E";
  const fontPrimary    = event.fonts?.primary    || "Inter, system-ui, sans-serif";
  const fontSecondary  = event.fonts?.secondary  || "Playfair Display, Georgia, serif";

  // ====== Cuenta regresiva ======
  const [timeLeft, setTimeLeft] = useState({ days:0, hours:0, minutes:0, seconds:0 });
  useEffect(() => {
    const iso = buildTargetISO(event.date, event.time);
    const target = new Date(iso || "2026-12-31T23:59:59");
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [event.date, event.time]);

  // ====== Modales ======
  const [showRSVP, setShowRSVP] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  // ====== Gestión de “mesa de regalos” (lista de urls) ======
  const addGift = () =>
    setEvent((p) => ({ ...p, gifts: [...(p.gifts || []), { label: "Enlace", url: "" }] }));
  const updateGift = (i, key, v) =>
    setEvent((p) => {
      const arr = [...(p.gifts || [])];
      arr[i] = { ...arr[i], [key]: v };
      return { ...p, gifts: arr };
    });
  const removeGift = (i) =>
    setEvent((p) => {
      const arr = [...(p.gifts || [])];
      arr.splice(i, 1);
      return { ...p, gifts: arr };
    });

  // ====== HERO: imagen principal editable vía event.images.hero ======
  const heroBg = event.images?.hero || ""; // si está vacío, usamos color/overlay para que no quede vacío
  const floralTop = event.images?.floralTop || "";
  const floralBottom = event.images?.floralBottom || "";

  // ====== Layout: preview con zoom del editor ======
  const baseWidth = ui?.viewMode === "mobile" ? 380 : ui?.viewMode === "tablet" ? 760 : 1100;
  const zoom = Math.max(60, Math.min(180, ui?.zoom ?? 100));

  return (
    <div className={`${ui?.isMobile ? "p-2":"p-8"} flex justify-center`}>
      <div className="w-full max-w-[1280px] rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* ======= HERO ======= */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Fondo: imagen elegida en Panel/Imágenes o color liso */}
          <div
            className="absolute inset-0"
            style={{
              background: heroBg
                ? `url(${heroBg}) center/cover no-repeat`
                : (event.colors?.background || "#f7f7f5"),
            }}
          />
          {/* Overlay para contraste, toma tono según template */}
          <div
            className="absolute inset-0"
            style={{ background: theme.bandHeroOverlay }}
          />

          {/* Decorativos opcionales (también editables desde Panel/Imágenes) */}
          {floralTop ? (
            <img
              src={floralTop}
              alt="decorativo superior"
              className="pointer-events-none absolute top-0 left-0 w-[460px] h-auto opacity-80"
            />
          ) : null}
          {floralBottom ? (
            <img
              src={floralBottom}
              alt="decorativo inferior"
              className="pointer-events-none absolute bottom-0 right-0 w-[520px] h-auto opacity-80"
            />
          ) : null}

          {/* Contenido HERO */}
          <div
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            dir="ltr"
            lang="es"
            style={{ color: colorText }}
          >
            <h1
              className="font-light mb-2 tracking-wide"
              style={{
                color: colorPrimary,
                fontSize: "clamp(2.6rem, 7vw, 5.6rem)",
                fontFamily: fontSecondary,
              }}
            >
              <EditableText
                value={(event.couple?.bride || "Belén").toUpperCase()}
                onChange={(val) =>
                  setEvent((p) => ({ ...p, couple: { ...p.couple, bride: val } }))
                }
                ariaLabel="Nombre 1"
                className="px-1"
                singleLine
                style={{ color: colorPrimary }}
              />
            </h1>

            {/* separador ∞ */}
            <div className="flex items-center justify-center my-5">
              <div className="h-px w-16" style={{ backgroundColor: colorSecondary, opacity: 0.35 }} />
              <div
                className="mx-4 font-light"
                style={{ color: event.colors?.accent || colorPrimary, fontSize: "clamp(1.6rem, 4.5vw, 3rem)", fontFamily: fontSecondary }}
              >
                ∞
              </div>
              <div className="h-px w-16" style={{ backgroundColor: colorSecondary, opacity: 0.35 }} />
            </div>

            <h1
              className="font-light mb-6 tracking-wide"
              style={{
                color: colorPrimary,
                fontSize: "clamp(2.6rem, 7vw, 5.6rem)",
                fontFamily: fontSecondary,
              }}
            >
              <EditableText
                value={(event.couple?.groom || "Amadeo").toUpperCase()}
                onChange={(val) =>
                  setEvent((p) => ({ ...p, couple: { ...p.couple, groom: val } }))
                }
                ariaLabel="Nombre 2"
                className="px-1"
                singleLine
                style={{ color: colorPrimary }}
              />
            </h1>

            <p
              className="font-light tracking-wide"
              style={{ color: colorSecondary, fontSize: "clamp(1.05rem,2.6vw,1.4rem)", fontFamily: fontPrimary }}
            >
              ¡NOS CASAMOS!
            </p>
          </div>
        </section>

        {/* ======= CONTENIDO ESCALADO (editor preview) ======= */}
        <div className="flex justify-center">
          <div style={{ width: baseWidth, transform: `scale(${zoom/100})`, transformOrigin: "top center" }}>
            {/* ===== COUNTDOWN ===== */}
            <section className="py-12 sm:py-16 text-center" style={{ backgroundColor: theme.bandCountdown }}>
              <h2
                className="font-light mb-6 sm:mb-8 tracking-wide"
                style={{ color: "#fff", fontFamily: fontPrimary, fontSize: "clamp(1.2rem,3.2vw,1.8rem)" }}
              >
                Falta muy poco para celebrar juntos
              </h2>
              <div className="flex items-stretch justify-center gap-6 sm:gap-10 select-none">
                {[
                  ["DÍAS", timeLeft.days],
                  ["HORAS", timeLeft.hours],
                  ["MIN", timeLeft.minutes],
                  ["SEG", timeLeft.seconds],
                ].map(([label, val]) => (
                  <div key={label} className="flex flex-col items-center">
                    <div className="font-light leading-none" style={{ color: "#fff", fontFamily: fontSecondary, fontSize: "clamp(2.2rem,6.5vw,4.4rem)" }}>
                      {String(val ?? 0).padStart(2,"0")}
                    </div>
                    <div className="opacity-95 text-xs sm:text-sm mt-1" style={{ color: "#fff", fontFamily: fontPrimary }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== DETALLES (Ceremonia / Fiesta) ===== */}
            <section className="py-16" style={{ backgroundColor: theme.bandDetails }}>
              <div className="max-w-4xl mx-auto px-4" dir="ltr">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Ceremonia */}
                  <DetailCard
                    title="CEREMONIA"
                    colorTitle={colorPrimary}
                    colorText={colorText}
                    colorMuted={colorSecondary}
                  >
                    <p className="text-lg">
                      <EditableText
                        value={event.date || "23 de Noviembre, 2026"}
                        onChange={(v)=>setEvent((p)=>({ ...p, date:v }))}
                        className="px-1"
                        singleLine
                        style={{ color: colorText }}
                      />
                    </p>
                    <p className="text-lg">
                      <EditableText
                        value={event.ceremony?.time || event.time || "19:00 hs"}
                        onChange={(v)=>setEvent((p)=>({ ...p, ceremony:{ ...p.ceremony, time:v } }))}
                        className="px-1"
                        singleLine
                        style={{ color: colorText }}
                      />
                    </p>
                    <p className="font-medium">
                      <EditableText
                        value={event.ceremony?.venue || "Iglesia Nuestra Señora del Carmen"}
                        onChange={(v)=>setEvent((p)=>({ ...p, ceremony:{ ...p.ceremony, venue:v } }))}
                        className="px-1"
                        singleLine
                        style={{ color: colorText }}
                      />
                    </p>
                    <p>
                      <EditableText
                        value={event.ceremony?.location || "Villa Allende, Córdoba"}
                        onChange={(v)=>setEvent((p)=>({ ...p, ceremony:{ ...p.ceremony, location:v } }))}
                        className="px-1"
                        singleLine
                        style={{ color: colorText }}
                      />
                    </p>
                    <p className="text-sm" style={{ color: colorSecondary }}>
                      Recibí debajo las indicaciones para llegar.
                    </p>
                    <div className="mt-6">
                      <button
                        className="px-6 py-3 rounded-full text-sm font-medium shadow-sm hover:opacity-90"
                        style={{ backgroundColor: colorPrimary, color: "#fff", border: `1px solid ${colorPrimary}` }}
                        onClick={() => {
                          const q = event.ceremony?.address || `${event.ceremony?.venue || ""} ${event.ceremony?.location || ""}`;
                          window.open(`https://maps.google.com/?q=${encodeURIComponent(q)}`, "_blank");
                        }}
                      >
                        LLEGAR A LA CEREMONIA
                      </button>
                    </div>
                  </DetailCard>

                  {/* Fiesta */}
                  <DetailCard
                    title="FIESTA"
                    colorTitle={colorPrimary}
                    colorText={colorText}
                    colorMuted={colorSecondary}
                  >
                    <p className="text-lg">
                      <EditableText
                        value={event.reception?.time || "Después de la ceremonia"}
                        onChange={(v)=>setEvent((p)=>({ ...p, reception:{ ...p.reception, time:v } }))}
                        className="px-1"
                        singleLine
                        style={{ color: colorText }}
                      />
                    </p>
                    <p className="font-medium">
                      <EditableText
                        value={event.reception?.venue || "Rincón Calina"}
                        onChange={(v)=>setEvent((p)=>({ ...p, reception:{ ...p.reception, venue:v } }))}
                        className="px-1"
                        singleLine
                        style={{ color: colorText }}
                      />
                    </p>
                    <p>
                      <EditableText
                        value={event.reception?.location || "Unquillo, Córdoba"}
                        onChange={(v)=>setEvent((p)=>({ ...p, reception:{ ...p.reception, location:v } }))}
                        className="px-1"
                        singleLine
                        style={{ color: colorText }}
                      />
                    </p>
                    <div className="mt-6">
                      <button
                        className="px-6 py-3 rounded-full text-sm font-medium shadow-sm hover:opacity-90"
                        style={{ backgroundColor: colorPrimary, color: "#fff", border: `1px solid ${colorPrimary}` }}
                        onClick={() => {
                          const q = event.reception?.address || `${event.reception?.venue || ""} ${event.reception?.location || ""}`;
                          window.open(`https://maps.google.com/?q=${encodeURIComponent(q)}`, "_blank");
                        }}
                      >
                        LLEGAR A LA FIESTA
                      </button>
                    </div>
                  </DetailCard>
                </div>
              </div>
            </section>

            {/* ===== REGALOS / TRANSFERENCIAS ===== */}
            <section className="py-16 text-center" style={{ backgroundColor: theme.bandGifts }}>
              <div className="max-w-3xl mx-auto px-4" dir="ltr">
                <p
                  className="mb-8"
                  style={{ color: "#fff", fontSize: "clamp(1rem,2.5vw,1.25rem)", fontFamily: fontPrimary }}
                >
                  <EditableText
                    value={event.giftsNote || "Si deseás realizarnos un regalo podés colaborar con nuestra Luna de Miel…"}
                    onChange={(v)=>setEvent((p)=>({ ...p, giftsNote:v }))}
                    className="px-1"
                    singleLine={false}
                    style={{ color: "#fff" }}
                  />
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {(event.gifts || []).map((g, idx) => (
                    <a
                      key={idx}
                      href={g.url || "#"}
                      target={g.url ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/70 text-white hover:bg-white/10"
                    >
                      🎁 {g.label || "Enlace"}
                    </a>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    className="px-5 py-2 rounded-full text-sm font-medium border border-white/80 text-white hover:bg-white/10"
                    onClick={() => setShowGifts(true)}
                  >
                    Ver datos bancarios
                  </button>
                  <button
                    className="px-5 py-2 rounded-full text-sm font-medium border border-white/80 text-white hover:bg-white/10"
                    onClick={addGift}
                    title="Agregar enlace de regalo"
                  >
                    + Agregar enlace
                  </button>
                </div>
              </div>
            </section>

            {/* ===== INSTAGRAM / HASHTAG ===== */}
            <section className="py-16 bg-white" dir="ltr">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h2
                  className="text-2xl font-medium mb-4"
                  style={{ color: colorPrimary, fontFamily: fontSecondary }}
                >
                  Comparte tus momentos
                </h2>
                <p className="mb-6 max-w-2xl mx-auto" style={{ color: colorText, fontFamily: fontPrimary }}>
                  Etiquetanos y usá nuestro hashtag:
                </p>
                <p className="text-xl font-medium" style={{ color: colorPrimary }}>
                  <EditableText
                    value={event.hashtag || "#BelenYAmadeo"}
                    onChange={(v)=>setEvent((p)=>({ ...p, hashtag:v }))}
                    className="px-1"
                    singleLine
                    style={{ color: colorPrimary }}
                  />
                </p>
              </div>
            </section>

            {/* ===== DRESS CODE / BLOQUE OSCURO ===== */}
            <section className="py-16 text-center" style={{ backgroundColor: theme.bandDark }}>
              <h2
                className="text-2xl font-medium mb-4 tracking-wide"
                style={{ color: "#fff", fontFamily: fontSecondary }}
              >
                DRESS CODE
              </h2>
              <p className="text-lg" style={{ color: "#fff", fontFamily: fontPrimary }}>
                <EditableText
                  value={event.info?.dresscode || "Vestimenta formal, elegante"}
                  onChange={(v)=>setEvent((p)=>({ ...p, info:{ ...(p.info||{}), dresscode:v } }))}
                  className="px-1"
                  singleLine
                  style={{ color: "#fff" }}
                />
              </p>
            </section>

            {/* ===== RSVP ===== */}
            <section className="py-16 text-center" style={{ backgroundColor: theme.bandCountdown }}>
              <h2
                className="text-2xl font-medium mb-6 tracking-wide"
                style={{ color: "#fff", fontFamily: fontSecondary }}
              >
                CONFIRMACIÓN DE ASISTENCIA
              </h2>
              <p
                className="text-lg mb-8 max-w-2xl mx-auto"
                style={{ color: "#fff", fontFamily: fontPrimary }}
              >
                <EditableText
                  value={event.rsvpNote || "Esperamos que seas parte de esta gran celebración. ¡Confírmanos tu asistencia!"}
                  onChange={(v)=>setEvent((p)=>({ ...p, rsvpNote:v }))}
                  className="px-1"
                  singleLine={false}
                  style={{ color: "#fff" }}
                />
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  className="px-6 py-3 rounded-full text-sm font-medium shadow-sm hover:opacity-90"
                  style={{ backgroundColor: "#fff", color: theme.bandCountdown }}
                  onClick={() => setShowRSVP(true)}
                >
                  Confirmar asistencia
                </button>
                <button
                  className="px-6 py-3 rounded-full text-sm font-medium border border-white/80 text-white hover:bg-white/10"
                  onClick={() => setShowPrefs(true)}
                >
                  Preferencias (comida • alojamiento)
                </button>
              </div>
            </section>

            {/* ===== INFO ÚTIL ===== */}
            <section className="py-16 text-center" style={{ backgroundColor: theme.bandInfo }}>
              <div className="max-w-4xl mx-auto px-4" dir="ltr">
                <h2
                  className="text-2xl font-medium mb-6 tracking-wide"
                  style={{ color: colorPrimary, fontFamily: fontSecondary }}
                >
                  Info útil
                </h2>
                <ul className="space-y-2 text-base" style={{ color: colorText, fontFamily: fontPrimary }}>
                  <li>
                    Estacionamiento:{" "}
                    <EditableText
                      value={event.info?.parking || "Disponible en el lugar de la recepción"}
                      onChange={(v)=>setEvent((p)=>({ ...p, info:{ ...(p.info||{}), parking:v } }))}
                      className="px-1"
                      singleLine
                      style={{ color: colorText }}
                    />
                  </li>
                  <li>
                    Niños:{" "}
                    <EditableText
                      value={event.info?.kids || "Bienvenidos"}
                      onChange={(v)=>setEvent((p)=>({ ...p, info:{ ...(p.info||{}), kids:v } }))}
                      className="px-1"
                      singleLine
                      style={{ color: colorText }}
                    />
                  </li>
                </ul>
              </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="py-12 text-center" style={{ backgroundColor: "#111827", color: "#fff" }}>
              <p className="text-base mb-6" style={{ fontFamily: fontPrimary }}>
                ¡Gracias por acompañarnos!
              </p>
              <div className="text-xs opacity-80" style={{ fontFamily: fontPrimary }}>
                Invitación digital • {event.hashtag || "#BelenYAmadeo"}
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* ================= MODALES ================= */}
      {showRSVP && (
        <Modal onClose={() => setShowRSVP(false)} ariaLabel="Confirmar asistencia">
          <h3 className="text-lg font-semibold mb-4" style={{ color: colorPrimary }}>Confirmar Asistencia</h3>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setShowRSVP(false);
              alert("¡Gracias! Recibimos tu confirmación.");
            }}
            dir="ltr"
          >
            <LabeledInput label="Nombre y apellido *" required />
            <LabeledInput label="Email *" type="email" required />
            <div className="grid grid-cols-2 gap-3">
              <LabeledInput label="Asistentes" type="number" min="1" defaultValue={1} />
              <LabeledInput label="Niños" type="number" min="0" defaultValue={0} />
            </div>
            <LabeledTextarea label="Mensaje (opcional)" rows={3} />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="btn-secondary" onClick={() => setShowRSVP(false)}>Cancelar</button>
              <button type="submit" className="btn-primary" style={{ background: colorPrimary }}>Enviar</button>
            </div>
          </form>
        </Modal>
      )}

      {showPrefs && (
        <Modal onClose={() => setShowPrefs(false)} ariaLabel="Preferencias">
          <h3 className="text-lg font-semibold mb-4" style={{ color: colorPrimary }}>Preferencias</h3>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setShowPrefs(false);
              alert("¡Gracias! Registramos tus preferencias.");
            }}
            dir="ltr"
          >
            <LabeledInput label="Nombre y apellido *" required />
            <LabeledInput label="Email *" type="email" required />
            <LabeledSelect label="Preferencia de comida" options={["Sin preferencia","Vegetariano/a","Vegano/a","Celíaco/a","Kosher","Halal"]} />
            <LabeledSelect label="Alojamiento" options={["No necesito","Hotel sugerido","Familia/Amigos","Otro"]} />
            <LabeledTextarea label="Observaciones" rows={3} />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="btn-secondary" onClick={() => setShowPrefs(false)}>Cancelar</button>
              <button type="submit" className="btn-primary" style={{ background: colorPrimary }}>Enviar</button>
            </div>
          </form>
        </Modal>
      )}

      {showGifts && (
        <Modal onClose={() => setShowGifts(false)} ariaLabel="Datos bancarios">
          <h3 className="text-lg font-semibold mb-4" style={{ color: colorPrimary }}>Contribución / Transferencias</h3>
          <div className="space-y-3 text-sm" dir="ltr">
            <BankRow label="Banco" value={event.bank?.banco} />
            <BankRow label="CBU/IBAN" value={event.bank?.cbu} />
            <BankRow label="Alias" value={event.bank?.alias} />
            <BankRow label="Titular" value={event.bank?.titular} />
            <BankRow label="Cuenta" value={event.bank?.cuenta} />
            {event.bank?.nota ? <p className="text-xs opacity-80">{event.bank?.nota}</p> : null}
          </div>

          {(event.gifts || []).length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2" style={{ color: colorPrimary }}>Mesas de Regalos</h4>
              <ul className="list-disc pl-5 space-y-1">
                {event.gifts.map((g, i) => (
                  <li key={i}>
                    {g.url ? (
                      <a href={g.url} target="_blank" rel="noreferrer" className="underline" style={{ color: colorPrimary }}>
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
          <div className="flex justify-end mt-4">
            <button className="btn-primary" style={{ background: colorPrimary }} onClick={() => setShowGifts(false)}>
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ------------- Subcomponentes sin dependencias externas ------------- */

function DetailCard({ title, children, colorTitle, colorText, colorMuted }) {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-medium mb-6 tracking-wide" style={{ color: colorTitle }}>{title}</h3>
      <div className="space-y-3 text-base" style={{ color: colorText }}>
        {children}
      </div>
      <div className="mt-2 text-xs" style={{ color: colorMuted }} />
    </div>
  );
}

function Modal({ onClose, ariaLabel, children }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" role="dialog" aria-label={ariaLabel}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-5">
        {children}
      </div>
    </div>
  );
}

function LabeledInput({ label, type="text", required=false, min, defaultValue, rows, ...rest }) {
  return (
    <label className="block text-xs" dir="ltr">
      <span className="mb-1 block text-gray-700">{label}</span>
      <input
        type={type}
        required={required}
        min={min}
        defaultValue={defaultValue}
        className="w-full text-sm border rounded px-3 py-2 outline-none focus:ring"
        {...rest}
      />
    </label>
  );
}

function LabeledTextarea({ label, rows=3, ...rest }) {
  return (
    <label className="block text-xs" dir="ltr">
      <span className="mb-1 block text-gray-700">{label}</span>
      <textarea
        rows={rows}
        className="w-full text-sm border rounded px-3 py-2 outline-none focus:ring min-h-[90px]"
        {...rest}
      />
    </label>
  );
}

function LabeledSelect({ label, options=[] }) {
  return (
    <label className="block text-xs" dir="ltr">
      <span className="mb-1 block text-gray-700">{label}</span>
      <select className="w-full text-sm border rounded px-3 py-2 outline-none focus:ring">
        {options.map((o)=> <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function BankRow({ label, value }) {
  if (!value) return null;
  return (
    <p className="text-sm">
      <strong>{label}:</strong> {value}
    </p>
  );
}

/* ---- Helpers visuales para botones (opcionales, sin dependencia CSS adicional) ---- */
const cssHelpers = `
.btn-primary{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;border-radius:9999px;font-size:0.875rem;font-weight:600;padding:0.5rem 1rem;color:#fff}
.btn-secondary{display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;border-radius:9999px;font-size:0.875rem;font-weight:500;padding:0.5rem 1rem;border:1px solid #d1d5db;background:#fff;color:#111827}
`;
if (typeof document !== "undefined" && !document.getElementById("inv-helpers")) {
  const style = document.createElement("style");
  style.id = "inv-helpers";
  style.innerHTML = cssHelpers;
  document.head.appendChild(style);
}
