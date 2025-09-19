// src/components/InvitationCanvas.jsx
import React, { useEffect, useMemo, useState } from "react";
import EditableText from "./EditableText.jsx";

/**
 * Landing "DemoBlack" editable
 * - Hero oscuro con nombres/fecha/hora/lugar (editable)
 * - Countdown
 * - Agenda (Ceremonia / Recepción)
 * - Botones y modales: RSVP, Preferencias (comida/alojamiento), Transferencias/Regalos
 * - Respeta event.colors, event.fonts, ui.selectedTemplate
 *
 * Props esperadas:
 *  event: {
 *    couple:{ bride, groom },
 *    date, time,
 *    location?: string, // ubicación general (ej: "Melo, Uruguay")
 *    ceremony:{ venue, address, time },
 *    reception:{ venue, address, time },
 *    hashtag, template,
 *    colors:{ primary, secondary, background, text, accent },
 *    fonts:{ primary, secondary },
 *    bank?:{ titular, banco, cuenta, alias, cbu, nota },
 *    gifts?: [{ label, url }]
 *  }
 *  ui:{ isMobile, viewMode, zoom, selectedTemplate }
 *  setEvent: fn
 */

export default function InvitationCanvas({ event, ui, setEvent }) {
  if (!event) return null;

  // ======== Estado de modales ========
  const [showRSVP, setShowRSVP] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [showGifts, setShowGifts] = useState(false);

  // ======== Cuenta regresiva ========
  const [timeLeft, setTimeLeft] = useState({ days:0, hours:0, minutes:0, seconds:0 });
  useEffect(() => {
    const iso = buildTargetISO(event.date, event.time);
    const target = new Date(iso || "2026-03-15T17:00:00");
    const id = setInterval(() => {
      const d = target.getTime() - Date.now();
      if (d > 0) {
        setTimeLeft({
          days: Math.floor(d / 86400000),
          hours: Math.floor((d % 86400000) / 3600000),
          minutes: Math.floor((d % 3600000) / 60000),
          seconds: Math.floor((d % 60000) / 1000),
        });
      } else setTimeLeft({ days:0, hours:0, minutes:0, seconds:0 });
    }, 1000);
    return () => clearInterval(id);
  }, [event.date, event.time]);

  // ======== Tema tipo DemoBlack (fondo oscuro con acentos) ========
  const theme = useMemo(() => {
    const c = event.colors || {};
    const t = ui?.selectedTemplate || event.template || "black";
    const base = {
      black:   { bg:"linear-gradient(180deg,#0B0B0B 0%,#171717 100%)", ring:c.accent || c.primary || "#6366f1" },
      rose:    { bg:"linear-gradient(180deg,#0B0B0B 0%,#1a0f14 100%)", ring:c.accent || "#e91e63" },
      emerald: { bg:"linear-gradient(180deg,#0B0B0B 0%,#0f1a14 100%)", ring:c.accent || "#10b981" },
      gold:    { bg:"linear-gradient(180deg,#0B0B0B 0%,#1a140f 100%)", ring:c.accent || "#f59e0b" },
    };
    return base[t] || base.black;
  }, [ui?.selectedTemplate, event.template, event.colors]);

  const colorPrimary   = event.colors?.primary   || "#ffffff"; // títulos/acentos claros
  const colorSecondary = event.colors?.secondary || "#c7c7c7"; // textos secundarios
  const colorText      = event.colors?.text      || "#e5e5e5"; // textos generales
  const fontPrimary    = event.fonts?.primary    || "Inter, system-ui, sans-serif";
  const fontSecondary  = event.fonts?.secondary  || "Playfair Display, Georgia, serif";

  // ======== Utilidades de edición ========
  const setCoupleFromString = (val) => {
    const [bride="", groom=""] = val.split("&").map(s => s.trim());
    setEvent(p => ({ ...p, couple:{ bride, groom: groom || p.couple?.groom || "" }}));
  };

  const addGift = () =>
    setEvent(p => ({ ...p, gifts:[...(p.gifts || []), { label:"Mesa de regalos", url:"" }] }));

  const updateGift = (i, key, v) =>
    setEvent(p => {
      const arr = [...(p.gifts || [])];
      arr[i] = { ...arr[i], [key]: v };
      return { ...p, gifts: arr };
    });

  const removeGift = (i) =>
    setEvent(p => {
      const arr = [...(p.gifts || [])];
      arr.splice(i, 1);
      return { ...p, gifts: arr };
    });

  // ======== Layout / zoom ========
  const baseWidth = ui?.viewMode === "mobile" ? 380 : ui?.viewMode === "tablet" ? 760 : 1100;
  const zoom = Math.max(60, Math.min(180, ui?.zoom ?? 100));

  return (
    <div className={`${ui?.isMobile ? "p-2":"p-8"} flex justify-center`}>
      <div className="w-full max-w-[1280px] rounded-2xl shadow-2xl overflow-hidden" style={{ background: theme.bg }}>
        {/* ===== HERO ===== */}
        <section className="px-6 sm:px-12 pt-12 pb-10 text-center" dir="ltr" lang="es" style={{ color: colorText }}>
          <div className="text-[11px] tracking-[0.28em] opacity-80" style={{ fontFamily: fontPrimary }}>
            INVITACIÓN WEB
          </div>

          <h1 className="mt-3 sm:mt-4 text-4xl sm:text-6xl font-light" style={{ color: colorPrimary, fontFamily: fontSecondary }}>
            <EditableText
              value={`${event.couple?.bride || "María"} & ${event.couple?.groom || "Juan"}`}
              onChange={setCoupleFromString}
              ariaLabel="Nombres de la pareja"
              className="px-1"
              singleLine
              style={{ color: colorPrimary }}
            />
          </h1>

          <div className="mt-3 text-base sm:text-lg" style={{ fontFamily: fontPrimary }}>
            <EditableText
              value={event.date || "15 de Marzo, 2026"}
              onChange={v => setEvent(p => ({ ...p, date:v }))}
              ariaLabel="Fecha"
              className="px-1"
              singleLine
            />
            {" · "}
            <EditableText
              value={event.time || "17:00"}
              onChange={v => setEvent(p => ({ ...p, time:v }))}
              ariaLabel="Hora"
              className="px-1"
              singleLine
            />
            {event.location ? (
              <>
                {" · "}
                <EditableText
                  value={event.location}
                  onChange={v => setEvent(p => ({ ...p, location:v }))}
                  ariaLabel="Ubicación general"
                  className="px-1"
                  singleLine
                />
              </>
            ) : null}
          </div>

          {/* Countdown */}
          <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10 text-center select-none">
            {[
              ["DÍAS", timeLeft.days],
              ["HORAS", timeLeft.hours],
              ["MIN", timeLeft.minutes],
              ["SEG", timeLeft.seconds],
            ].map(([label, val]) => (
              <div key={label}>
                <div className="text-3xl sm:text-5xl font-light leading-none" style={{ color: colorPrimary, fontFamily: fontSecondary }}>
                  {String(val ?? 0).padStart(2,"0")}
                </div>
                <div className="text-[10px] sm:text-xs opacity-80 tracking-widest mt-1" style={{ fontFamily: fontPrimary }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA principal */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              className="px-5 py-2 rounded-md text-sm font-medium shadow-sm hover:opacity-90"
              style={{ background: colorPrimary, color: "#0b0b0b" }}
              onClick={() => setShowRSVP(true)}
            >
              Confirmar asistencia
            </button>
            <button
              className="px-5 py-2 rounded-md text-sm font-medium border border-white/30 hover:border-white/60"
              onClick={() => setShowPrefs(true)}
            >
              Preferencias (comida • alojamiento)
            </button>
            <button
              className="px-5 py-2 rounded-md text-sm font-medium border border-white/30 hover:border-white/60"
              onClick={() => setShowGifts(true)}
            >
              Transferencias / Regalos
            </button>
          </div>

          {/* Hashtag */}
          <div className="mt-3 text-xs opacity-80" style={{ fontFamily: fontPrimary }}>
            Hashtag:{" "}
            <EditableText
              value={event.hashtag || "#MariaYJuan2026"}
              onChange={v => setEvent(p => ({ ...p, hashtag:v }))}
              className="px-1"
              ariaLabel="Hashtag"
              singleLine
              style={{ color: colorPrimary }}
            />
          </div>
        </section>

        {/* ===== CONTENIDO ESCALADO (para vista previa en editor) ===== */}
        <div className="flex justify-center">
          <div style={{ width: baseWidth, transform: `scale(${zoom/100})`, transformOrigin: "top center" }}>
            {/* ===== AGENDA / DETALLES ===== */}
            <section className="px-6 sm:px-12 pb-12">
              <div className="grid sm:grid-cols-2 gap-6">
                <CardSection title="Ceremonia" colorPrimary={colorPrimary} colorText={colorText}>
                  <Field label="Lugar">
                    <EditableText
                      value={event.ceremony?.venue || "Iglesia San Miguel"}
                      onChange={v => setEvent(p => ({ ...p, ceremony:{ ...p.ceremony, venue:v } }))}
                      ariaLabel="Lugar ceremonia"
                      className="px-1"
                      singleLine
                    />
                  </Field>
                  <Field label="Dirección" small>
                    <EditableText
                      value={event.ceremony?.address || "Calle Mayor 123"}
                      onChange={v => setEvent(p => ({ ...p, ceremony:{ ...p.ceremony, address:v } }))}
                      ariaLabel="Dirección ceremonia"
                      className="px-1"
                      singleLine={false}
                    />
                  </Field>
                  <Field label="Hora" small>
                    <EditableText
                      value={event.ceremony?.time || event.time || "17:00"}
                      onChange={v => setEvent(p => ({ ...p, ceremony:{ ...p.ceremony, time:v } }))}
                      ariaLabel="Hora ceremonia"
                      className="px-1"
                      singleLine
                    />
                  </Field>
                </CardSection>

                <CardSection title="Recepción" colorPrimary={colorPrimary} colorText={colorText}>
                  <Field label="Lugar">
                    <EditableText
                      value={event.reception?.venue || "Salón / Jardín Botánico"}
                      onChange={v => setEvent(p => ({ ...p, reception:{ ...p.reception, venue:v } }))}
                      ariaLabel="Lugar recepción"
                      className="px-1"
                      singleLine
                    />
                  </Field>
                  <Field label="Dirección" small>
                    <EditableText
                      value={event.reception?.address || "Av. Libertador 456"}
                      onChange={v => setEvent(p => ({ ...p, reception:{ ...p.reception, address:v } }))}
                      ariaLabel="Dirección recepción"
                      className="px-1"
                      singleLine={false}
                    />
                  </Field>
                  <Field label="Hora" small>
                    <EditableText
                      value={event.reception?.time || "19:30"}
                      onChange={v => setEvent(p => ({ ...p, reception:{ ...p.reception, time:v } }))}
                      ariaLabel="Hora recepción"
                      className="px-1"
                      singleLine
                    />
                  </Field>
                </CardSection>
              </div>
            </section>

            {/* ===== MESA DE REGALOS / TRANSFERENCIAS (preview editable inline) ===== */}
            <section className="px-6 sm:px-12 pb-12">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Regalos: lista de links */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-medium mb-2" style={{ color: colorPrimary, fontFamily: fontSecondary }} dir="ltr">
                    Mesa de Regalos
                  </h3>
                  <p className="text-xs opacity-80 mb-3" style={{ color: colorText, fontFamily: fontPrimary }}>
                    Agregá enlaces a listas o regalos sugeridos.
                  </p>
                  <div className="space-y-2">
                    {(event.gifts || []).map((g, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white/60 rounded-md p-2">
                        <input
                          className="flex-1 text-xs border rounded px-2 py-1"
                          placeholder="Nombre (Amazon, Falabella...)"
                          value={g.label || ""}
                          onChange={(e) => updateGift(idx, "label", e.target.value)}
                          dir="ltr"
                        />
                        <input
                          className="flex-1 text-xs border rounded px-2 py-1"
                          placeholder="URL"
                          value={g.url || ""}
                          onChange={(e) => updateGift(idx, "url", e.target.value)}
                          dir="ltr"
                        />
                        <button
                          className="text-xs px-2 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50"
                          onClick={() => removeGift(idx)}
                          title="Quitar"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <button className="text-xs px-3 py-1 rounded border border-white/30 hover:border-white/60 text-white" onClick={addGift}>
                      + Agregar enlace
                    </button>
                  </div>
                </div>

                {/* Transferencias: datos bancarios */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-medium mb-2" style={{ color: colorPrimary, fontFamily: fontSecondary }} dir="ltr">
                    Transferencias
                  </h3>
                  <p className="text-xs opacity-80 mb-3" style={{ color: colorText, fontFamily: fontPrimary }}>
                    Editá los datos. Los invitados verán esto en el modal.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {renderBankField("Titular", "titular", event, setEvent)}
                    {renderBankField("Banco", "banco", event, setEvent)}
                    {renderBankField("Cuenta", "cuenta", event, setEvent)}
                    {renderBankField("Alias", "alias", event, setEvent)}
                    {renderBankField("CBU/IBAN", "cbu", event, setEvent)}
                  </div>
                  <div className="mt-2">
                    {renderBankField("Nota", "nota", event, setEvent, true)}
                  </div>
                </div>
              </div>
            </section>

            {/* ===== INFO ÚTIL / DRESS CODE (editable) ===== */}
            <section className="px-6 sm:px-12 pb-12">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-medium mb-2" style={{ color: colorPrimary, fontFamily: fontSecondary }} dir="ltr">
                  Información útil
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: colorText, fontFamily: fontPrimary }}>
                  <li>
                    Dress code:{" "}
                    <EditableText
                      value={event.info?.dresscode || "Formal (sugerimos tonos neutros)"}
                      onChange={v => setEvent(p => ({ ...p, info:{ ...(p.info||{}), dresscode:v } }))}
                      className="px-1"
                      singleLine
                    />
                  </li>
                  <li>
                    Estacionamiento:{" "}
                    <EditableText
                      value={event.info?.parking || "Disponible en el lugar de la recepción"}
                      onChange={v => setEvent(p => ({ ...p, info:{ ...(p.info||{}), parking:v } }))}
                      className="px-1"
                      singleLine
                    />
                  </li>
                  <li>
                    Niños:{" "}
                    <EditableText
                      value={event.info?.kids || "Bienvenidos"}
                      onChange={v => setEvent(p => ({ ...p, info:{ ...(p.info||{}), kids:v } }))}
                      className="px-1"
                      singleLine
                    />
                  </li>
                </ul>
              </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="px-6 sm:px-12 pb-14 text-center" style={{ color: colorSecondary, fontFamily: fontPrimary }}>
              <div className="text-xs opacity-80" dir="ltr">
                Gracias por acompañarnos • {event.hashtag || "#MariaYJuan2026"}
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* ===== MODALES ===== */}
      <Modal open={showRSVP} onClose={() => setShowRSVP(false)} ring={theme.ring}>
        <ModalHeader title="Confirmar asistencia" ring={theme.ring} />
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setShowRSVP(false);
            alert("¡Gracias! Recibimos tu confirmación.");
          }}
        >
          <div className="grid sm:grid-cols-2 gap-2">
            <InputLabeled label="Nombre y apellido" required />
            <InputLabeled label="Email" type="email" required />
          </div>
          <div className="grid sm:grid-cols-3 gap-2">
            <InputLabeled label="Asistentes" type="number" min="1" defaultValue={1} required />
            <InputLabeled label="Niños" type="number" min="0" defaultValue={0} />
            <InputLabeled label="Restricciones alim." placeholder="Vegetariano, celíaco..." />
          </div>
          <TextAreaLabeled label="Mensaje" placeholder="Escribe un saludo o consulta..." />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setShowRSVP(false)}>Cancelar</button>
            <button type="submit" className="btn-primary" style={{ background: theme.ring }}>Enviar</button>
          </div>
        </form>
      </Modal>

      <Modal open={showPrefs} onClose={() => setShowPrefs(false)} ring={theme.ring}>
        <ModalHeader title="Preferencias: comida y alojamiento" ring={theme.ring} />
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setShowPrefs(false);
            alert("¡Gracias! Registramos tus preferencias.");
          }}
        >
          <div className="grid sm:grid-cols-2 gap-2">
            <InputLabeled label="Nombre y apellido" required />
            <InputLabeled label="Email" type="email" required />
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <SelectLabeled label="Preferencia de comida" options={["Sin preferencia","Vegetariano/a","Vegano/a","Celíaco/a","Kosher","Halal"]} />
            <SelectLabeled label="Alojamiento" options={["No necesito","Hotel sugerido","Familia/Amigos","Otro"]} />
          </div>
          <TextAreaLabeled label="Observaciones" placeholder="Horarios, movilidad, otras necesidades..." />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setShowPrefs(false)}>Cancelar</button>
            <button type="submit" className="btn-primary" style={{ background: theme.ring }}>Enviar</button>
          </div>
        </form>
      </Modal>

      <Modal open={showGifts} onClose={() => setShowGifts(false)} ring={theme.ring}>
        <ModalHeader title="Transferencias / Regalos" ring={theme.ring} />
        <div className="space-y-3 text-sm">
          <BankRow label="Titular" value={event.bank?.titular} />
          <BankRow label="Banco" value={event.bank?.banco} />
          <BankRow label="Cuenta" value={event.bank?.cuenta} />
          <BankRow label="Alias" value={event.bank?.alias} />
          <BankRow label="CBU/IBAN" value={event.bank?.cbu} />
          {event.bank?.nota ? <div className="text-xs opacity-80">{event.bank?.nota}</div> : null}

          {(event.gifts || []).length > 0 && (
            <>
              <div className="mt-4 text-sm font-medium">Enlaces a mesas de regalos</div>
              <ul className="list-disc pl-5 space-y-1">
                {event.gifts.map((g, i) => (
                  <li key={i}>
                    {g.url ? (
                      <a href={g.url} target="_blank" rel="noreferrer" className="underline hover:opacity-80" style={{ color: theme.ring }}>
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
        <div className="flex justify-end gap-2 pt-4">
          <button className="btn-primary" style={{ background: theme.ring }} onClick={() => setShowGifts(false)}>
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
}

/* ====================== Subcomponentes ====================== */

function CardSection({ title, children, colorPrimary, colorText }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-medium mb-2" style={{ color: colorPrimary }} dir="ltr">
        {title}
      </h3>
      <div className="text-sm" style={{ color: colorText }} dir="ltr">{children}</div>
    </div>
  );
}

function Field({ label, small=false, children }) {
  return (
    <div className={`${small ? "mt-2":"mt-1"}`}>
      <div className={`mb-1 ${small ? "text-xs opacity-80":"text-sm"} text-gray-200`} dir="ltr">{label}</div>
      {children}
    </div>
  );
}

function Modal({ open, onClose, children, ring }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl p-5">
        <div className="absolute -inset-[2px] rounded-[14px] pointer-events-none" style={{ boxShadow: `0 0 0 1px ${ring} inset` }} />
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, ring }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-900" dir="ltr">{title}</h2>
      <div className="h-px w-full mt-2" style={{ background: ring, opacity: 0.3 }} />
    </div>
  );
}

function InputLabeled({ label, type="text", required=false, min, defaultValue, placeholder }) {
  return (
    <label className="block text-xs" dir="ltr">
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

function TextAreaLabeled({ label, placeholder }) {
  return (
    <label className="block text-xs" dir="ltr">
      <span className="mb-1 block text-gray-600">{label}</span>
      <textarea
        placeholder={placeholder}
        className="w-full text-sm border rounded px-3 py-2 min-h-[90px] outline-none focus:ring"
        dir="ltr"
      />
    </label>
  );
}

function SelectLabeled({ label, options=[] }) {
  return (
    <label className="block text-xs" dir="ltr">
      <span className="mb-1 block text-gray-600">{label}</span>
      <select className="w-full text-sm border rounded px-3 py-2 outline-none focus:ring" dir="ltr">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function BankRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="font-medium" dir="ltr">{value}</div>
    </div>
  );
}

function renderBankField(label, key, event, setEvent, multiline=false) {
  const val = event.bank?.[key] || "";
  const setVal = (v) => setEvent(p => ({ ...p, bank:{ ...(p.bank||{}), [key]: v } }));
  return (
    <label key={key} className="block text-xs" dir="ltr">
      <span className="mb-1 block text-gray-200">{label}</span>
      {multiline ? (
        <textarea className="w-full text-sm border rounded px-3 py-2 min-h-[80px] bg-white" value={val} onChange={(e)=>setVal(e.target.value)} dir="ltr" />
      ) : (
        <input className="w-full text-sm border rounded px-3 py-2 bg-white" value={val} onChange={(e)=>setVal(e.target.value)} dir="ltr" />
      )}
    </label>
  );
}

/* ====================== Utilidades ====================== */
function buildTargetISO(dateStr, timeStr) {
  if (!dateStr) return null;
  try {
    const re = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/; // dd/mm/yyyy
    if (re.test(dateStr.trim())) {
      const [, d, m, y] = dateStr.trim().match(re);
      return `${y}-${pad(m)}-${pad(d)}T${padTime(timeStr || "00:00")}`;
    }
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    const mIdx = meses.findIndex(m => dateStr.toLowerCase().includes(m));
    const dMatch = dateStr.match(/\d{1,2}/);
    const yMatch = dateStr.match(/\d{4}/);
    if (mIdx >= 0 && dMatch && yMatch) {
      const d = Number(dMatch[0]), y = Number(yMatch[0]);
      return `${y}-${pad(mIdx+1)}-${pad(d)}T${padTime(timeStr || "00:00")}`;
    }
  } catch { return null; }
  return null;
}
function pad(n){ return String(n).padStart(2,"0"); }
function padTime(hhmm){ const [h="00",m="00"]=hhmm.split(":"); return `${pad(h)}:${pad(m)}:00`; }

/* ====================== Helpers de botones (clases) ====================== */
const baseBtn = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
const primaryBtn = `${baseBtn} text-white px-4 py-2 bg-black`;
const secondaryBtn = `${baseBtn} px-4 py-2 border border-gray-300 bg-white`;
const cssHelpers = `.btn-primary{/*${primaryBtn}*/}.btn-secondary{/*${secondaryBtn}*/}`;
if (typeof document!=="undefined" && !document.getElementById("inv-helpers")) {
  const style = document.createElement("style"); style.id="inv-helpers"; style.innerHTML=cssHelpers; document.head.appendChild(style);
}
