// src/components/InvitationCanvas.jsx
import React, { useEffect, useMemo, useState } from "react";
import EditableText from "./EditableText.jsx";

/**
 * InvitationCanvas
 * - Apariencia inspirada en "DemoBlack" pero reactiva a event/ui (colores, fuentes, template)
 * - Textos editables al clic (soluciona "escribe al revés": forzamos dir="ltr" y no duplicamos atributos)
 * - Modales nativos (RSVP, Contribución, Preferencias)
 * - Sin dependencias externas a Dialog; solo Tailwind
 *
 * Props esperadas:
 *  - event: {
 *      couple: { bride, groom },
 *      date, time,
 *      ceremony: { venue, address, time },
 *      reception:{ venue, address, time },
 *      hashtag, template,
 *      colors: { primary, secondary, background, text, accent },
 *      fonts:  { primary, secondary },
 *      bank?:  { alias, cbu, cuenta, titular, banco, nota },
 *      gifts?: [{ label, url }]
 *    }
 *  - ui: { isMobile, viewMode, zoom, selectedTemplate }
 *  - setEvent: React.Dispatch
 */

export default function InvitationCanvas({ event, ui, setEvent }) {
  if (!event) return null;

  // === Estado de modales ===
  const [showRSVP, setShowRSVP] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  // === Cuenta regresiva ===
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    // Si hay fecha/hora válida en event, la usamos; si no, una futura por defecto.
    const targetISO = buildTargetISO(event.date, event.time);
    const target = new Date(targetISO || "2026-03-15T17:00:00");
    const timer = setInterval(() => {
      const d = target.getTime() - Date.now();
      if (d > 0) {
        setTimeLeft({
          days: Math.floor(d / 86400000),
          hours: Math.floor((d % 86400000) / 3600000),
          minutes: Math.floor((d % 3600000) / 60000),
          seconds: Math.floor((d % 60000) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [event.date, event.time]);

  // === Estilos por template (gradientes) ===
  const theme = useMemo(() => {
    const c = event.colors || {};
    const templates = {
      elegant: {
        bg: "linear-gradient(135deg,#0f0f0f 0%,#262626 100%)", // oscuro elegante
        card: "bg-white",
        ring: c.accent || c.primary || "#6366f1",
      },
      romantic: {
        bg: "linear-gradient(135deg,#1f2937 0%,#111827 100%)", // base oscura con acentos rosados
        card: "bg-white",
        ring: c.accent || "#e91e63",
      },
      modern: {
        bg: "linear-gradient(135deg,#111827 0%,#0b1220 100%)", // moderno, profundo
        card: "bg-white",
        ring: c.accent || "#22c55e",
      },
      classic: {
        bg: "linear-gradient(135deg,#0b0b0b 0%,#1b1b1b 100%)",
        card: "bg-white",
        ring: c.accent || "#f59e0b",
      },
    };
    return templates[ui?.selectedTemplate || event.template || "elegant"] || templates.elegant;
  }, [ui?.selectedTemplate, event.template, event.colors]);

  const colorPrimary = event.colors?.primary || "#ffffff";
  const colorSecondary = event.colors?.secondary || "#c7c7c7";
  const colorText = event.colors?.text || "#e5e5e5";
  const fontPrimary = event.fonts?.primary || "Inter, system-ui, sans-serif";
  const fontSecondary = event.fonts?.secondary || "Playfair Display, Georgia, serif";

  // Canvas width/zoom: para evitar “vacío por escala”, aplicamos un contenedor y adentro escalamos contenido
  const baseWidth = ui?.viewMode === "mobile" ? 375 : ui?.viewMode === "tablet" ? 768 : 1100;
  const zoom = Math.max(50, Math.min(200, ui?.zoom ?? 100)); // 50% - 200% por seguridad

  // Helpers de edición
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

  return (
    <div className={`${ui?.isMobile ? "p-2" : "p-8"} flex justify-center`}>
      <div
        className="w-full max-w-[1280px] rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: theme.bg }}
      >
        {/* Header simple tipo DemoBlack */}
        <header
          className="px-6 py-4 flex items-center justify-between"
          style={{ color: colorText, fontFamily: fontPrimary }}
          dir="ltr"
          lang="es"
        >
          <div className="text-xs uppercase tracking-widest opacity-80">
            INVITACIÓN DIGITAL
          </div>
          <div className="flex items-center gap-4 text-xs opacity-80">
            <span className="hidden sm:inline">Comparte</span>
            <button
              className="px-3 py-1 rounded border border-white/30 hover:border-white/60"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href).catch(() => {});
              }}
              title="Copiar enlace"
            >
              Copiar enlace
            </button>
          </div>
        </header>

        {/* Lienzo con zoom controlado */}
        <div className="flex justify-center">
          <div
            className="bg-white/0"
            style={{
              width: baseWidth,
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            {/* HERO */}
            <section className="px-6 sm:px-10 pt-10 pb-6 text-center select-none">
              <div
                className="text-sm tracking-[0.2em]"
                style={{ color: colorSecondary, fontFamily: fontPrimary }}
                dir="ltr"
              >
                ¡NOS CASAMOS!
              </div>

              <h1
                className="mt-3 sm:mt-4 text-4xl sm:text-6xl font-light"
                style={{ color: colorPrimary, fontFamily: fontSecondary }}
                dir="ltr"
              >
                <EditableText
                  value={`${event.couple?.bride || "María"} & ${event.couple?.groom || "Juan"}`}
                  onChange={setCoupleFromString}
                  className="px-1"
                  ariaLabel="Nombres de la pareja"
                  singleLine
                  style={{ color: colorPrimary }}
                />
              </h1>

              <div
                className="mt-3 text-base sm:text-lg"
                style={{ color: colorText, fontFamily: fontPrimary }}
                dir="ltr"
              >
                <EditableText
                  value={event.date || "15 de Marzo, 2026"}
                  onChange={(v) => setEvent((p) => ({ ...p, date: v }))}
                  className="px-1"
                  ariaLabel="Fecha"
                  singleLine
                />
                {" · "}
                <EditableText
                  value={event.time || "17:00"}
                  onChange={(v) => setEvent((p) => ({ ...p, time: v }))}
                  className="px-1"
                  ariaLabel="Hora"
                  singleLine
                />
              </div>

              {/* COUNTDOWN */}
              <div className="mt-8 flex items-center justify-center gap-6 sm:gap-10 text-center">
                {[
                  ["DÍAS", timeLeft.days],
                  ["HORAS", timeLeft.hours],
                  ["MIN", timeLeft.minutes],
                  ["SEG", timeLeft.seconds],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div
                      className="text-3xl sm:text-5xl font-light leading-none"
                      style={{ color: colorPrimary, fontFamily: fontSecondary }}
                    >
                      {String(val ?? 0).padStart(2, "0")}
                    </div>
                    <div
                      className="text-[10px] sm:text-xs opacity-80 tracking-widest mt-1"
                      style={{ color: colorText, fontFamily: fontPrimary }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA principales */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  className="px-5 py-2 rounded-md text-sm font-medium border shadow-sm hover:opacity-90"
                  style={{
                    background: colorPrimary,
                    color: "#fff",
                    borderColor: colorPrimary,
                  }}
                  onClick={() => setShowRSVP(true)}
                >
                  Confirmar asistencia
                </button>
                <button
                  className="px-5 py-2 rounded-md text-sm font-medium border border-white/30 hover:border-white/60 text-white"
                  style={{ color: colorText }}
                  onClick={() => setShowGifts(true)}
                >
                  Contribución / Regalos
                </button>
                <button
                  className="px-5 py-2 rounded-md text-sm font-medium border border-white/30 hover:border-white/60 text-white"
                  style={{ color: colorText }}
                  onClick={() => setShowPrefs(true)}
                >
                  Preferencias (comida • alojamiento)
                </button>
              </div>

              {/* Hashtag */}
              <div
                className="mt-3 text-xs opacity-80"
                style={{ color: colorText, fontFamily: fontPrimary }}
                dir="ltr"
              >
                Hashtag:{" "}
                <EditableText
                  value={event.hashtag || "#MariaYJuan2026"}
                  onChange={(v) => setEvent((p) => ({ ...p, hashtag: v }))}
                  className="px-1"
                  ariaLabel="Hashtag"
                  singleLine
                  style={{ color: colorPrimary }}
                />
              </div>
            </section>

            {/* DETALLES */}
            <section className="px-6 sm:px-10 pb-10">
              <div className="grid sm:grid-cols-2 gap-6">
                <DetailCard
                  title="Ceremonia"
                  colorPrimary={colorPrimary}
                  colorText={colorText}
                >
                  <div className="text-sm">
                    <EditableText
                      value={event.ceremony?.venue || "Iglesia San Miguel"}
                      onChange={(v) =>
                        setEvent((p) => ({
                          ...p,
                          ceremony: { ...p.ceremony, venue: v },
                        }))
                      }
                      className="px-1"
                      ariaLabel="Lugar ceremonia"
                      singleLine
                    />
                  </div>
                  <div className="text-xs opacity-80 mt-1">
                    <EditableText
                      value={event.ceremony?.address || "Calle Mayor 123"}
                      onChange={(v) =>
                        setEvent((p) => ({
                          ...p,
                          ceremony: { ...p.ceremony, address: v },
                        }))
                      }
                      className="px-1"
                      ariaLabel="Dirección ceremonia"
                      singleLine={false}
                    />
                  </div>
                  <div className="text-xs opacity-80 mt-1">
                    Hora:{" "}
                    <EditableText
                      value={event.ceremony?.time || event.time || "17:00"}
                      onChange={(v) =>
                        setEvent((p) => ({
                          ...p,
                          ceremony: { ...p.ceremony, time: v },
                        }))
                      }
                      className="px-1"
                      ariaLabel="Hora ceremonia"
                      singleLine
                    />
                  </div>
                </DetailCard>

                <DetailCard
                  title="Recepción"
                  colorPrimary={colorPrimary}
                  colorText={colorText}
                >
                  <div className="text-sm">
                    <EditableText
                      value={event.reception?.venue || "Jardín Botánico"}
                      onChange={(v) =>
                        setEvent((p) => ({
                          ...p,
                          reception: { ...p.reception, venue: v },
                        }))
                      }
                      className="px-1"
                      ariaLabel="Lugar recepción"
                      singleLine
                    />
                  </div>
                  <div className="text-xs opacity-80 mt-1">
                    <EditableText
                      value={event.reception?.address || "Av. Libertador 456"}
                      onChange={(v) =>
                        setEvent((p) => ({
                          ...p,
                          reception: { ...p.reception, address: v },
                        }))
                      }
                      className="px-1"
                      ariaLabel="Dirección recepción"
                      singleLine={false}
                    />
                  </div>
                  <div className="text-xs opacity-80 mt-1">
                    Hora:{" "}
                    <EditableText
                      value={event.reception?.time || "19:30"}
                      onChange={(v) =>
                        setEvent((p) => ({
                          ...p,
                          reception: { ...p.reception, time: v },
                        }))
                      }
                      className="px-1"
                      ariaLabel="Hora recepción"
                      singleLine
                    />
                  </div>
                </DetailCard>
              </div>
            </section>

            {/* MESA DE REGALOS / DATOS BANCARIOS (preview inline editable) */}
            <section className="px-6 sm:px-10 pb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: colorPrimary, fontFamily: fontSecondary }}
                    dir="ltr"
                  >
                    Mesa de Regalos / Links
                  </h3>
                  <p
                    className="text-xs opacity-80 mb-3"
                    style={{ color: colorText, fontFamily: fontPrimary }}
                  >
                    Agrega enlaces a listas o regalos sugeridos.
                  </p>

                  <div className="space-y-2">
                    {(event.gifts || []).map((g, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-white/60 rounded-md p-2"
                      >
                        <input
                          className="flex-1 text-xs border rounded px-2 py-1"
                          placeholder="Nombre (ej: Amazon, Falabella, etc.)"
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
                    <button
                      className="text-xs px-3 py-1 rounded border border-white/30 hover:border-white/60 text-white"
                      onClick={addGift}
                    >
                      + Agregar enlace
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: colorPrimary, fontFamily: fontSecondary }}
                    dir="ltr"
                  >
                    Transferencias / Datos Bancarios
                  </h3>
                  <p
                    className="text-xs opacity-80 mb-3"
                    style={{ color: colorText, fontFamily: fontPrimary }}
                  >
                    Edita los datos. Los invitados verán esta info en el modal.
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

            {/* Footer simple */}
            <footer className="px-6 sm:px-10 pb-12 text-center">
              <div
                className="text-xs opacity-80"
                style={{ color: colorSecondary, fontFamily: fontPrimary }}
                dir="ltr"
              >
                Hecho con cariño por{" "}
                <span style={{ color: colorPrimary }}>la pareja</span>.  
                Comparte tu experiencia con {event.hashtag || "#MariaYJuan2026"}.
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* === MODALES === */}
      <Modal open={showRSVP} onClose={() => setShowRSVP(false)} ring={theme.ring}>
        <ModalHeader title="Confirmar asistencia" ring={theme.ring} />
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            // Aquí podrías llamar a tu API / enviar correo, etc.
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
            <button type="button" className="btn-secondary" onClick={() => setShowRSVP(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" style={{ background: theme.ring }}>
              Enviar
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={showGifts} onClose={() => setShowGifts(false)} ring={theme.ring}>
        <ModalHeader title="Contribución / Transferencias" ring={theme.ring} />
        <div className="space-y-3 text-sm">
          <BankRow label="Titular" value={event.bank?.titular} />
          <BankRow label="Banco" value={event.bank?.banco} />
          <BankRow label="Cuenta" value={event.bank?.cuenta} />
          <BankRow label="Alias" value={event.bank?.alias} />
          <BankRow label="CBU/IBAN" value={event.bank?.cbu} />
          {event.bank?.nota ? (
            <div className="text-xs opacity-80">{event.bank?.nota}</div>
          ) : null}

          {(event.gifts || []).length > 0 && (
            <>
              <div className="mt-4 text-sm font-medium">Enlaces a mesas de regalos</div>
              <ul className="list-disc pl-5 space-y-1">
                {event.gifts.map((g, i) => (
                  <li key={i}>
                    {g.url ? (
                      <a
                        href={g.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:opacity-80"
                        style={{ color: theme.ring }}
                      >
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
            <SelectLabeled
              label="Preferencia de comida"
              options={["Sin preferencia", "Vegetariano/a", "Vegano/a", "Celíaco/a", "Kosher", "Halal"]}
            />
            <SelectLabeled
              label="Alojamiento"
              options={["No necesito", "Hotel sugerido", "Familia/Amigos", "Otro"]}
            />
          </div>
          <TextAreaLabeled label="Observaciones" placeholder="Horarios, movilidad, otras necesidades..." />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setShowPrefs(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" style={{ background: theme.ring }}>
              Enviar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

/* ====================== Subcomponentes UI internos (sin dependencias externas) ====================== */

function DetailCard({ title, children, colorPrimary, colorText }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3
        className="text-lg font-medium mb-2"
        style={{ color: colorPrimary }}
        dir="ltr"
      >
        {title}
      </h3>
      <div className="text-sm" style={{ color: colorText }} dir="ltr">
        {children}
      </div>
    </div>
  );
}

function Modal({ open, onClose, children, ring }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl p-5">
        <div
          className="absolute -inset-[2px] rounded-[14px] pointer-events-none"
          style={{ boxShadow: `0 0 0 1px ${ring} inset` }}
        />
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, ring }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold" style={{ color: "#111" }} dir="ltr">
        {title}
      </h2>
      <div className="h-px w-full mt-2" style={{ background: ring, opacity: 0.3 }} />
    </div>
  );
}

function InputLabeled({ label, type = "text", required = false, min, defaultValue, placeholder }) {
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

function SelectLabeled({ label, options = [] }) {
  return (
    <label className="block text-xs" dir="ltr">
      <span className="mb-1 block text-gray-600">{label}</span>
      <select className="w-full text-sm border rounded px-3 py-2 outline-none focus:ring" dir="ltr">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function BankRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <div className="text-gray-500">{label}</div>
      <div className="font-medium" dir="ltr">
        {value}
      </div>
    </div>
  );
}

function renderBankField(label, key, event, setEvent, multiline = false) {
  const val = event.bank?.[key] || "";
  const setVal = (v) =>
    setEvent((p) => ({
      ...p,
      bank: { ...(p.bank || {}), [key]: v },
    }));

  return (
    <label key={key} className="block text-xs" dir="ltr">
      <span className="mb-1 block text-gray-600">{label}</span>
      {multiline ? (
        <textarea
          className="w-full text-sm border rounded px-3 py-2 min-h-[80px] bg-white"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          dir="ltr"
        />
      ) : (
        <input
          className="w-full text-sm border rounded px-3 py-2 bg-white"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          dir="ltr"
        />
      )}
    </label>
  );
}

/* ====================== Utilidades ====================== */

/** Intenta construir un ISO a partir de fecha (texto) y hora (texto) */
function buildTargetISO(dateStr, timeStr) {
  if (!dateStr) return null;
  // Intentamos parsear "15 de Marzo, 2026" y "17:00"
  try {
    // Normalizamos dd/mm/yyyy si vino así
    const reDDMMYYYY = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/;
    if (reDDMMYYYY.test(dateStr.trim())) {
      const [, d, m, y] = dateStr.trim().match(reDDMMYYYY);
      const hhmm = (timeStr || "00:00").trim();
      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T${padTime(hhmm)}`;
    }
    // Caso "15 de Marzo, 2026"
    const meses = [
      "enero","febrero","marzo","abril","mayo","junio",
      "julio","agosto","septiembre","octubre","noviembre","diciembre",
    ];
    const mIdx = meses.findIndex((m) =>
      dateStr.toLowerCase().includes(m)
    );
    const dMatch = dateStr.match(/\d{1,2}/);
    const yMatch = dateStr.match(/\d{4}/);
    if (mIdx >= 0 && dMatch && yMatch) {
      const d = Number(dMatch[0]);
      const y = Number(yMatch[0]);
      const hhmm = padTime((timeStr || "00:00").trim());
      return `${y}-${String(mIdx + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}T${hhmm}`;
    }
  } catch (_) {
    return null;
  }
  return null;
}

function padTime(hhmm) {
  const [h = "00", m = "00"] = hhmm.split(":");
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
}

/* ====================== Estilos de botones (Tailwind helpers) ====================== */
/* Nota: clases utilitarias para botones; si querés ponerlas en CSS/TW, adelante */
const baseBtn =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const primaryBtn =
  `${baseBtn} text-white px-4 py-2 bg-black`;

const secondaryBtn =
  `${baseBtn} px-4 py-2 border border-gray-300 bg-white`;

const styles = `
.btn-primary{ ${classes(primaryBtn)} }
.btn-secondary{ ${classes(secondaryBtn)} }
`;

function classes(str) {
  // Ayuda a leer en DevTools (no afecta estilos reales, solo informativo)
  return `/* ${str} */`;
}

// Inyectamos estilos mínimos de helper (opcional)
if (typeof document !== "undefined" && !document.getElementById("inv-helpers")) {
  const style = document.createElement("style");
  style.id = "inv-helpers";
  style.innerHTML = styles;
  document.head.appendChild(style);
}
