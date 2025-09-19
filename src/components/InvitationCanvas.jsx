// src/components/InvitationCanvas.jsx
import React, { useEffect, useState } from "react";
import EditableText from "./EditableText.jsx";

export default function InvitationCanvas({ event, ui, setEvent }) {
  if (!event) return null;

  const [timeLeft, setTimeLeft] = useState({ days:0, hours:0, minutes:0, seconds:0 });

  // Cuenta regresiva simple (si querés, cámbialo a tu fecha real)
  useEffect(() => {
    const target = new Date("2025-12-31T23:59:59");
    const t = setInterval(() => {
      const d = target - Date.now();
      if (d <= 0) return;
      setTimeLeft({
        days: Math.floor(d/86400000),
        hours: Math.floor((d%86400000)/3600000),
        minutes: Math.floor((d%3600000)/60000),
        seconds: Math.floor((d%60000)/1000),
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Estilos por template (muy básicos)
  const styles = {
    elegant: { bg: "linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)" },
    romantic:{ bg: "linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)" },
    modern:  { bg: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)" },
    classic: { bg: "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)" },
  };
  const current = styles[event.template] || styles.elegant;

  // Evito transform/scale por ahora para descartar problemas de tamaño
  const canvasStyle = {
    width: ui?.viewMode === "mobile" ? "375px" : "900px",
    minHeight: "620px",
    background: current.bg,
    fontFamily: event.fonts?.primary || "Inter, system-ui, sans-serif",
    color: event.colors?.text || "#333",
  };

  const colorPrimary = event.colors?.primary || "#1a1a1a";
  const colorSecondary = event.colors?.secondary || "#777";

  return (
    <div className={`${ui?.isMobile ? "p-2":"p-8"} flex justify-center`}>
      <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full max-w-[980px]">
        <div className="p-6 sm:p-10" style={canvasStyle}>
          {/* HERO / TITULAR */}
          <div className="text-center mt-6">
            <div className="text-sm tracking-widest" style={{color: colorSecondary}}>¡Nos Casamos!</div>

            <h1 className="mt-2 text-3xl sm:text-5xl font-light">
              <EditableText
                value={`${event.couple?.bride || "María"} & ${event.couple?.groom || "Juan"}`}
                onChange={(val) => {
                  const [bride="", rest=""] = val.split("&").map(s=>s.trim());
                  setEvent((p)=>({...p, couple:{ bride, groom: rest || p.couple?.groom || ""}}));
                }}
                className="px-1"
                ariaLabel="Nombres de la pareja"
                singleLine
                style={{color: colorPrimary}}
              />
            </h1>

            <div className="mt-3 text-base sm:text-lg">
              <EditableText
                value={event.date || "15 de Marzo, 2026"}
                onChange={(v)=>setEvent((p)=>({...p, date:v}))}
                className="px-1"
                ariaLabel="Fecha"
                singleLine
              />
              {" · "}
              <EditableText
                value={event.time || "17:00"}
                onChange={(v)=>setEvent((p)=>({...p, time:v}))}
                className="px-1"
                ariaLabel="Hora"
                singleLine
              />
            </div>
          </div>

          {/* COUNTDOWN */}
          <div className="mt-8 flex items-center justify-center gap-6 text-center">
            {[
              ["Días", timeLeft.days],
              ["Horas", timeLeft.hours],
              ["Min", timeLeft.minutes],
              ["Seg", timeLeft.seconds],
            ].map(([label, val])=>(
              <div key={label}>
                <div className="text-3xl sm:text-4xl font-light" style={{color: colorPrimary}}>
                  {String(val ?? 0).padStart(2,"0")}
                </div>
                <div className="text-xs opacity-80">{label}</div>
              </div>
            ))}
          </div>

          {/* DETALLES */}
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg border p-4">
              <div className="text-sm font-medium mb-1" style={{color: colorPrimary}}>Ceremonia</div>
              <div className="text-sm">
                <EditableText
                  value={event.ceremony?.venue || "Iglesia San Miguel"}
                  onChange={(v)=>setEvent((p)=>({...p, ceremony:{...p.ceremony, venue:v}}))}
                  className="px-1"
                  ariaLabel="Lugar ceremonia"
                  singleLine
                />
              </div>
              <div className="text-xs opacity-80 mt-1">
                <EditableText
                  value={event.ceremony?.address || "Calle Mayor 123"}
                  onChange={(v)=>setEvent((p)=>({...p, ceremony:{...p.ceremony, address:v}}))}
                  className="px-1"
                  ariaLabel="Dirección ceremonia"
                  singleLine={false}
                />
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-lg border p-4">
              <div className="text-sm font-medium mb-1" style={{color: colorPrimary}}>Recepción</div>
              <div className="text-sm">
                <EditableText
                  value={event.reception?.venue || "Jardín Botánico"}
                  onChange={(v)=>setEvent((p)=>({...p, reception:{...p.reception, venue:v}}))}
                  className="px-1"
                  ariaLabel="Lugar recepción"
                  singleLine
                />
              </div>
              <div className="text-xs opacity-80 mt-1">
                <EditableText
                  value={event.reception?.address || "Av. Libertador 456"}
                  onChange={(v)=>setEvent((p)=>({...p, reception:{...p.reception, address:v}}))}
                  className="px-1"
                  ariaLabel="Dirección recepción"
                  singleLine={false}
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <button
              type="button"
              className="px-5 py-2 rounded-md border shadow-sm text-sm font-medium hover:opacity-90"
              style={{ background: colorPrimary, color: "#fff", borderColor: colorPrimary }}
            >
              Confirmar asistencia
            </button>
            <div className="mt-3 text-xs opacity-80">
              Hashtag:{" "}
              <EditableText
                value={event.hashtag || "#MariaYJuan2026"}
                onChange={(v)=>setEvent((p)=>({...p, hashtag:v}))}
                className="px-1"
                ariaLabel="Hashtag"
                singleLine
                style={{color: colorPrimary}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
