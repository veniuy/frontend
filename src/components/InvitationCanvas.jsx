// src/components/InvitationCanvas.jsx
import React, { useEffect, useMemo, useState } from "react";
import EditableText from "./EditableText.jsx";

/**
 * InvitationCanvas (landing estilo "demos" por franjas), totalmente editable y conectado al Panel:
 * - Usa event.colors.{primary,secondary,text,accent,background} y event.fonts.{primary,secondary}
 * - Respeta ui.selectedTemplate (elegant/romantic/modern/classic) para matices/overlays
 * - Usa event.images.{heroTexture,floralTop,floralBottom,countdownBg,giftsBg,footerBg}
 * - Textos editables con click (EditableText). Se fuerza dir="ltr" para evitar inversión.
 * - Modales: RSVP y Datos Bancarios/Regalos.
 *
 * Espera que el Panel (:contentReference[oaicite:1]{index=1}) actualice event/ui via handlers:
 *   handleColorChange("primary"|"secondary"|"text"|...), handleFontChange("primary"|"secondary"), handleTemplateChange(id)
 *   y que la pestaña "Imágenes" escriba rutas en event.images (uploader propio).
 */

export default function InvitationCanvas({ event, ui, setEvent }) {
  if (!event) return null;

  /* ============ Colores/Fuentes desde Panel ============ */
  const COLORS = useMemo(() => {
    const c = event.colors || {};
    return {
      primary:   c.primary   || "#1f2937",   // acentos / títulos
      secondary: c.secondary || "#6b7280",   // textos secundarios
      text:      c.text      || "#374151",   // texto base sobre claro
      accent:    c.accent    || "#8FAF86",   // botones / detalles
      background:c.background|| "#F8F8F6",   // papel
      white:     c.white     || "#ffffff",
      dark:      c.dark      || "#111827",
    };
  }, [event.colors]);

  const FONTS = {
    primary:   event.fonts?.primary   || "Inter, system-ui, sans-serif",
    secondary: event.fonts?.secondary || "Playfair Display, Georgia, serif",
  };

  /* ============ Imágenes provenientes del Panel ============ */
  const IMG = {
    heroTexture:  event.images?.heroTexture  || "/assets/portada.webp",
    floralTop:    event.images?.floralTop    || "/assets/hero_top.png",
    floralBottom: event.images?.floralBottom || "/assets/hero_bottom.png",
    countdownBg:  event.images?.countdownBg  || "",        // opcional
    giftsBg:      event.images?.giftsBg      || "",        // opcional
    footerBg:     event.images?.footerBg     || "",        // opcional
  };

  const onImgError = (e) => { e.currentTarget.style.display = "none"; };

  /* ============ Variantes por plantilla (matices/overlays) ============ */
  const template = ui?.selectedTemplate || event.template || "elegant";
  const THEME = useMemo(() => {
    switch (template) {
      case "romantic":
        return {
          overlay: "rgba(255, 240, 245, 0.85)",
          bandStrong: "#f9e3ea",
          bandDark: "rgba(233, 30, 99, 0.10)",
        };
      case "modern":
        return {
          overlay: "rgba(255, 255, 255, 0.90)",
          bandStrong: "#eef2ff",
          bandDark: "rgba(52, 152, 219, 0.08)",
        };
      case "classic":
        return {
          overlay: "rgba(255,255,255,0.92)",
          bandStrong: "#faf3eb",
          bandDark: "rgba(139, 92, 246, 0.08)",
        };
      default: // elegant
        return {
          overlay: "rgba(255,255,255,0.92)",
          bandStrong: "#edf2ee",
          bandDark: "rgba(143,175,134,0.10)",
        };
    }
  }, [template]);

  /* ============ Cuenta regresiva ============ */
  const [timeLeft, setTimeLeft] = useState({ days:0, hours:0, minutes:0, seconds:0 });
  useEffect(() => {
    const iso = buildTargetISO(event.date, event.time);
    const target = new Date(iso || "2026-11-23T19:00:00");
    const timer = setInterval(() => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [event.date, event.time]);

  /* ============ Modales ============ */
  const [showRSVP, setShowRSVP]   = useState(false);
  const [showGifts, setShowGifts] = useState(false);

  /* ============ Helpers edición ============ */
  const setCoupleFromString = (val) => {
    const [bride="", groom=""] = val.split("&").map(s => s.trim());
    setEvent((p) => ({ ...p, couple:{ bride, groom: groom || p.couple?.groom || "" }}));
  };
  const addGift = () =>
    setEvent((p)=>({ ...p, gifts:[...(p.gifts || []), { label:"Mesa de Regalos", url:"" }] }));
  const updateGift = (i, key, v) =>
    setEvent((p)=>{ const arr=[...(p.gifts||[])]; arr[i]={...arr[i], [key]:v}; return {...p, gifts:arr}; });
  const removeGift = (i) =>
    setEvent((p)=>{ const arr=[...(p.gifts||[])]; arr.splice(i,1); return {...p, gifts:arr}; });

  /* ============ Layout base y franjas ============ */
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      {/* ===== HERO (textura + florales) ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* fondo textura */}
        <img
          src={IMG.heroTexture}
          onError={onImgError}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* overlay templado por plantilla */}
        <div className="absolute inset-0" style={{ background: THEME.overlay }} />

        {/* florales */}
        <img
          src={IMG.floralTop}
          onError={onImgError}
          alt=""
          className="pointer-events-none select-none absolute top-0 left-0 w-[420px] h-[260px] object-cover opacity-80"
        />
        <img
          src={IMG.floralBottom}
          onError={onImgError}
          alt=""
          className="pointer-events-none select-none absolute bottom-0 right-0 w-[460px] h-[280px] object-cover opacity-80"
        />

        {/* Contenido */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" dir="ltr">
          <div
            className="tracking-widest mb-4"
            style={{ color: COLORS.secondary, fontFamily: FONTS.primary, fontSize:"0.9rem" }}
          >
            ¡NOS CASAMOS!
          </div>

          <h1
            className="font-light mb-2"
            style={{
              color: COLORS.primary,
              fontFamily: FONTS.secondary,
              fontSize: "clamp(2.6rem, 8vw, 5.5rem)",
              letterSpacing: "0.04em",
            }}
          >
            <EditableText
              value={`${(event.couple?.bride || "Belén").toUpperCase()} & ${(event.couple?.groom || "Amadeo").toUpperCase()}`}
              onChange={setCoupleFromString}
              ariaLabel="Nombres de la pareja"
              className="px-1"
              singleLine
              style={{ color: COLORS.primary }}
            />
          </h1>

          <p
            className="mt-4"
            style={{ color: COLORS.text, fontFamily: FONTS.primary, fontSize: "clamp(1rem, 3vw, 1.25rem)" }}
          >
            <EditableText
              value={event.date || "23 de Noviembre, 2026"}
              onChange={(v)=>setEvent((p)=>({...p, date:v}))}
              ariaLabel="Fecha"
              className="px-1"
              singleLine
            />
            {" · "}
            <EditableText
              value={event.time || "19:00"}
              onChange={(v)=>setEvent((p)=>({...p, time:v}))}
              ariaLabel="Hora"
              className="px-1"
              singleLine
            />
            {event.location ? (
              <>
                {" · "}
                <EditableText
                  value={event.location}
                  onChange={(v)=>setEvent((p)=>({...p, location:v}))}
                  ariaLabel="Ubicación general"
                  className="px-1"
                  singleLine
                />
              </>
            ) : null}
          </p>

          {/* CTA hero */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              className="px-6 py-2 rounded-full text-sm font-medium shadow-sm hover:opacity-90"
              style={{ background: COLORS.accent, color: COLORS.white }}
              onClick={()=>setShowRSVP(true)}
            >
              Confirmar asistencia
            </button>
            <button
              className="px-6 py-2 rounded-full text-sm font-medium border hover:opacity-90"
              style={{ borderColor: COLORS.primary, color: COLORS.primary, background: COLORS.white }}
              onClick={()=>setShowGifts(true)}
            >
              Regalos / Transferencias
            </button>
          </div>

          <div
            className="mt-4 text-xs"
            style={{ color: COLORS.secondary, fontFamily: FONTS.primary }}
          >
            Hashtag:{" "}
            <EditableText
              value={event.hashtag || "#boda2026"}
              onChange={(v)=>setEvent((p)=>({...p, hashtag:v}))}
              className="px-1"
              ariaLabel="Hashtag"
              singleLine
              style={{ color: COLORS.primary }}
            />
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN (franja fuerte editable por template) ===== */}
      <section
        className="py-12 sm:py-16"
        style={{ background: IMG.countdownBg ? `url(${IMG.countdownBg}) center/cover no-repeat` : THEME.bandStrong }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center" dir="ltr">
          <h2
            className="font-light mb-6 sm:mb-8 tracking-wide"
            style={{ color: COLORS.primary, fontFamily: FONTS.primary, fontSize:"clamp(1.2rem,3vw,1.6rem)" }}
          >
            Cuenta regresiva
          </h2>
          <div className="flex items-stretch justify-center gap-6 sm:gap-10 select-none">
            <TimeCell value={timeLeft.days} label="DÍAS"   color={COLORS.primary}/>
            <Separator color={COLORS.primary}/>
            <TimeCell value={timeLeft.hours} label="HS"    color={COLORS.primary}/>
            <Separator color={COLORS.primary}/>
            <TimeCell value={timeLeft.minutes} label="MIN" color={COLORS.primary}/>
            <Separator color={COLORS.primary}/>
            <TimeCell value={timeLeft.seconds} label="SEG" color={COLORS.primary}/>
          </div>
        </div>
      </section>

      {/* ===== DETALLES (blanco) ===== */}
      <section className="py-16 bg-white" dir="ltr">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <DetailCard title="CEREMONIA" COLORS={COLORS} FONTS={FONTS}>
              <Line big>
                <EditableText
                  value={event.ceremony?.time || event.time || "19:00 hs"}
                  onChange={(v)=>setEvent((p)=>({...p, ceremony:{...p.ceremony, time:v}}))}
                  className="px-1"
                  singleLine
                  style={{ color: COLORS.text }}
                />
              </Line>
              <Line>
                <EditableText
                  value={event.ceremony?.venue || "Parroquia Nuestra Señora del Carmen"}
                  onChange={(v)=>setEvent((p)=>({...p, ceremony:{...p.ceremony, venue:v}}))}
                  className="px-1"
                  singleLine
                  style={{ color: COLORS.text }}
                />
              </Line>
              <Line small>
                <EditableText
                  value={event.ceremony?.address || "Av. Principal 456, Villa Allende"}
                  onChange={(v)=>setEvent((p)=>({...p, ceremony:{...p.ceremony, address:v}}))}
                  className="px-1"
                  singleLine={false}
                  style={{ color: COLORS.secondary }}
                />
              </Line>
              <button
                className="mt-4 px-5 py-2 rounded-full border text-sm"
                style={{ borderColor: COLORS.primary, color: COLORS.primary, background: COLORS.white }}
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.ceremony?.address || "Av. Principal 456, Villa Allende")}`, "_blank")}
              >
                Llegar a la ceremonia
              </button>
            </DetailCard>

            <DetailCard title="FIESTA" COLORS={COLORS} FONTS={FONTS}>
              <Line big>
                <EditableText
                  value={event.reception?.time || "Después de la ceremonia"}
                  onChange={(v)=>setEvent((p)=>({...p, reception:{...p.reception, time:v}}))}
                  className="px-1"
                  singleLine
                  style={{ color: COLORS.text }}
                />
              </Line>
              <Line>
                <EditableText
                  value={event.reception?.venue || "Rincón Calina"}
                  onChange={(v)=>setEvent((p)=>({...p, reception:{...p.reception, venue:v}}))}
                  className="px-1"
                  singleLine
                  style={{ color: COLORS.text }}
                />
              </Line>
              <Line small>
                <EditableText
                  value={event.reception?.address || "Ruta Provincial E-53 Km 8, Unquillo"}
                  onChange={(v)=>setEvent((p)=>({...p, reception:{...p.reception, address:v}}))}
                  className="px-1"
                  singleLine={false}
                  style={{ color: COLORS.secondary }}
                />
              </Line>
              <button
                className="mt-4 px-5 py-2 rounded-full border text-sm"
                style={{ borderColor: COLORS.primary, color: COLORS.primary, background: COLORS.white }}
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.reception?.address || "Ruta Provincial E-53 Km 8, Unquillo")}`, "_blank")}
              >
                Llegar a la fiesta
              </button>
            </DetailCard>
          </div>
        </div>
      </section>

      {/* ===== REGALOS / TRANSFERENCIAS (fondo configurable) ===== */}
      <section
        className="py-16 text-center"
        style={{
          background: IMG.giftsBg ? `url(${IMG.giftsBg}) center/cover no-repeat` : THEME.bandDark,
        }}
        dir="ltr"
      >
        <div className="max-w-3xl mx-auto px-4">
          <p
            className="mb-6"
            style={{ color: COLORS.text, fontFamily: FONTS.primary, fontSize: "clamp(1rem,2.6vw,1.25rem)" }}
          >
            <EditableText
              value={event.giftsNote || "Si deseás realizarnos un regalo podés colaborar con nuestra Luna de Miel…"}
              onChange={(v)=>setEvent((p)=>({...p, giftsNote:v}))}
              className="px-1"
              singleLine={false}
            />
          </p>

          {/* Editor inline de enlaces de regalos (se refleja en modal) */}
          <div className="mx-auto max-w-xl text-left bg-white/70 rounded-xl p-4">
            <div className="text-sm font-medium mb-2" style={{ color: COLORS.primary }}>Mesas de regalos (enlaces)</div>
            <div className="space-y-2">
              {(event.gifts || []).map((g, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    className="flex-1 text-xs border rounded px-2 py-1"
                    placeholder="Nombre (Amazon, Falabella...)"
                    value={g.label || ""}
                    onChange={(e)=>updateGift(idx,"label",e.target.value)}
                    dir="ltr"
                  />
                  <input
                    className="flex-1 text-xs border rounded px-2 py-1"
                    placeholder="URL"
                    value={g.url || ""}
                    onChange={(e)=>updateGift(idx,"url",e.target.value)}
                    dir="ltr"
                  />
                  <button
                    className="text-xs px-2 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50"
                    onClick={()=>removeGift(idx)}
                    title="Quitar"
                  >
                    Quitar
                  </button>
                </div>
              ))}
              <button
                className="text-xs px-3 py-1 rounded border"
                style={{ borderColor: COLORS.primary, color: COLORS.primary, background: COLORS.white }}
                onClick={addGift}
              >
                + Agregar enlace
              </button>
            </div>
          </div>

          <button
            className="mt-6 px-8 py-3 rounded-full text-sm font-medium shadow-sm hover:opacity-90"
            style={{ background: COLORS.accent, color: COLORS.white }}
            onClick={()=>setShowGifts(true)}
          >
            Ver datos bancarios
          </button>
        </div>
      </section>

      {/* ===== INFO ÚTIL ===== */}
      <section className="py-16" style={{ background: COLORS.background }} dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-2xl font-medium mb-6 tracking-wide"
            style={{ color: COLORS.primary, fontFamily: FONTS.secondary }}
          >
            Información útil
          </h2>
          <ul className="space-y-2 text-sm max-w-2xl mx-auto" style={{ color: COLORS.text, fontFamily: FONTS.primary }}>
            <li>
              Dress code:{" "}
              <EditableText
                value={event.info?.dresscode || "Formal (sugerimos tonos neutros)"}
                onChange={(v)=>setEvent((p)=>({...p, info:{...(p.info||{}), dresscode:v}}))}
                className="px-1"
                singleLine
              />
            </li>
            <li>
              Estacionamiento:{" "}
              <EditableText
                value={event.info?.parking || "Disponible en la recepción"}
                onChange={(v)=>setEvent((p)=>({...p, info:{...(p.info||{}), parking:v}}))}
                className="px-1"
                singleLine
              />
            </li>
            <li>
              Niños:{" "}
              <EditableText
                value={event.info?.kids || "Bienvenidos"}
                onChange={(v)=>setEvent((p)=>({...p, info:{...(p.info||{}), kids:v}}))}
                className="px-1"
                singleLine
              />
            </li>
          </ul>
        </div>
      </section>

      {/* ===== FOOTER con fondo configurable ===== */}
      <footer
        className="py-12 text-center"
        style={{
          background: IMG.footerBg ? `url(${IMG.footerBg}) center/cover no-repeat` : COLORS.dark,
          color: COLORS.white,
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg mb-6" style={{ fontFamily: FONTS.primary }}>
            ¡Gracias por acompañarnos en este momento tan importante!
          </p>
          <div className="text-xs opacity-80" style={{ fontFamily: FONTS.primary }}>
            Invitación digital • {event.hashtag || "#boda2026"}
          </div>
        </div>
      </footer>

      {/* =================== MODAL: RSVP =================== */}
      {showRSVP && (
        <Modal onClose={()=>setShowRSVP(false)}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary, fontFamily: FONTS.secondary }}>
            Confirmar asistencia
          </h3>
          <form
            className="space-y-3"
            onSubmit={(e)=>{ e.preventDefault(); setShowRSVP(false); alert("¡Gracias! Recibimos tu confirmación."); }}
            dir="ltr"
          >
            <LabeledInput label="Nombre y apellido *" required />
            <LabeledInput label="Email *" type="email" required />
            <div className="grid grid-cols-2 gap-2">
              <LabeledInput label="Asistentes" type="number" min="1" defaultValue={1} />
              <LabeledInput label="Niños" type="number" min="0" defaultValue={0} />
            </div>
            <LabeledInput label="Restricciones alimentarias" placeholder="Vegetariano, celíaco..." />
            <LabeledTextarea label="Mensaje" placeholder="Escribe un saludo o consulta..." />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="px-4 py-2 rounded-md border" onClick={()=>setShowRSVP(false)}>
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md"
                style={{ background: COLORS.accent, color: COLORS.white }}
              >
                Enviar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* =================== MODAL: DATOS BANCARIOS / REGALOS =================== */}
      {showGifts && (
        <Modal onClose={()=>setShowGifts(false)}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: COLORS.primary, fontFamily: FONTS.secondary }}>
            Transferencias / Regalos
          </h3>
          <div className="space-y-3 text-sm" dir="ltr" style={{ color: COLORS.text }}>
            <InfoRow label="Banco"   value={event.bank?.banco} />
            <InfoRow label="CBU/IBAN" value={event.bank?.cbu} />
            <InfoRow label="Alias"   value={event.bank?.alias} />
            <InfoRow label="Titular" value={event.bank?.titular} />
            <InfoRow label="Cuenta"  value={event.bank?.cuenta} />
            {event.bank?.nota ? (
              <div className="text-xs opacity-80">{event.bank?.nota}</div>
            ) : null}

            {(event.gifts || []).length > 0 && (
              <>
                <div className="mt-4 text-sm font-medium" style={{ color: COLORS.primary }}>Mesas de Regalos</div>
                <ul className="list-disc pl-5 space-y-1">
                  {event.gifts.map((g, i) => (
                    <li key={i}>
                      {g.url ? (
                        <a href={g.url} target="_blank" rel="noreferrer" className="underline hover:opacity-80" style={{ color: COLORS.accent }}>
                          {g.label || g.url}
                        </a>
                      ) : (
                        <span>{g.label || "Enlace"}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="flex justify-end pt-4">
            <button className="px-4 py-2 rounded-md" style={{ background: COLORS.accent, color: COLORS.white }} onClick={()=>setShowGifts(false)}>
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* =================== Subcomponentes UI =================== */
function TimeCell({ value, label, color }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-light leading-none" style={{ fontSize:"clamp(2.2rem,6vw,4rem)", color }}>
        {String(value).padStart(2,"0")}
      </div>
      <div className="opacity-90 text-xs sm:text-sm" style={{ color }}>{label}</div>
    </div>
  );
}
function Separator({ color }) {
  return <div className="self-center font-light" style={{ color, fontSize:"clamp(2rem,6vw,3.6rem)" }}>:</div>;
}

function DetailCard({ title, children, COLORS, FONTS }) {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-medium mb-6 tracking-wide" style={{ color: COLORS.primary, fontFamily: FONTS.secondary }}>
        {title}
      </h3>
      <div className="text-base">{children}</div>
    </div>
  );
}
function Line({ children, big=false, small=false }) {
  return (
    <p className={big ? "text-lg" : small ? "text-sm opacity-80" : ""}>
      {children}
    </p>
  );
}

function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6">
        <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center">×</button>
        {children}
      </div>
    </div>
  );
}
function LabeledInput({ label, type="text", required=false, min, defaultValue, placeholder }) {
  return (
    <label className="block text-xs">
      <span className="mb-1 block text-gray-600">{label}</span>
      <input
        type={type}
        required={required}
        min={min}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full text-sm border rounded px-3 py-2 outline-none focus:ring"
        dir="ltr"
      />
    </label>
  );
}
function LabeledTextarea({ label, placeholder }) {
  return (
    <label className="block text-xs">
      <span className="mb-1 block text-gray-600">{label}</span>
      <textarea
        placeholder={placeholder}
        className="w-full text-sm border rounded px-3 py-2 min-h-[90px] outline-none focus:ring"
        dir="ltr"
      />
    </label>
  );
}
function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="font-medium" dir="ltr">{value}</div>
    </div>
  );
}

/* =================== Utilidades =================== */
function buildTargetISO(dateStr, timeStr) {
  if (!dateStr) return null;
  try {
    const re = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/; // dd/mm/yyyy
    if (re.test(dateStr.trim())) {
      const [, d, m, y] = dateStr.trim().match(re);
      return `${y}-${pad(m)}-${pad(d)}T${padTime(timeStr || "00:00")}`;
    }
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    const s = dateStr.toLowerCase();
    const mIdx = meses.findIndex((m)=>s.includes(m));
    const dMatch = s.match(/\d{1,2}/);
    const yMatch = s.match(/\d{4}/);
    if (mIdx>=0 && dMatch && yMatch) {
      const d = Number(dMatch[0]), y = Number(yMatch[0]);
      return `${y}-${pad(mIdx+1)}-${pad(d)}T${padTime(timeStr || "00:00")}`;
    }
  } catch { return null; }
  return null;
}
function pad(n){ return String(n).padStart(2,"0"); }
function padTime(hhmm){ const [h="00",m="00"]=(hhmm||"").split(":"); return `${pad(h)}:${pad(m)}:00`; }
