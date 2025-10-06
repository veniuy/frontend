import React, { useState } from 'react';
import StyledButton from '../../ui/StyledButton';
import { Card, CardContent } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

// Iconos simples con SVG
const HeartIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CheckCircleIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const RSVP = ({ event, setEvent, colors = {}, fontPrimary, fontSecondary, isQuinceanera, styles = {} }) => {
  const [showRSVP, setShowRSVP] = useState(false);
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

  const Labeled = ({ label, children }) => (
    <div>
      <label className="block text-sm font-medium mb-1" style={{ fontFamily: fontPrimary, color: colors.body || "#333" }}>
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <>
      <section className="py-16 text-center" style={{ backgroundColor: colors.primary }} dir="ltr">
        <div className="max-w-3xl mx-auto px-4">
          <HeartIcon className="w-10 h-10 mx-auto mb-6" style={{ color: colors.primaryText }} />
          <h2
            className="text-2xl font-medium mb-6 tracking-wide"
            style={{ color: colors.primaryText, fontFamily: fontSecondary }}
          >
            CONFIRMÁ TU ASISTENCIA
          </h2>
          <p
            className="mb-8"
            style={{ 
              color: colors.primaryText, 
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)", 
              fontFamily: fontPrimary 
            }}
          >
            {event.rsvpNote || "Por favor confirmanos tu asistencia antes del 15 de octubre."}
          </p>
          <StyledButton
            colors={colors}
            variant="primary-inverse"
            onClick={() => setShowRSVP(true)}
          >
            <HeartIcon className="w-4 h-4 mr-2" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
            CONFIRMAR ASISTENCIA
          </StyledButton>
        </div>
      </section>

      {/* Modal RSVP */}
      {showRSVP && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowRSVP(false)}
        >
          <Card 
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium" style={{ color: colors.ink, fontFamily: fontPrimary }}>
                  Confirmar Asistencia
                </h3>
                <button 
                  onClick={() => setShowRSVP(false)}
                  className="hover:opacity-70 transition-opacity"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              {showSuccess ? (
                <div className="text-center py-8">
                  <CheckCircleIcon className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
                  <h4 className="text-lg font-medium mb-2" style={{ color: colors.ink, fontFamily: fontPrimary }}>
                    ¡Confirmación Recibida!
                  </h4>
                  <p style={{ color: colors.body, fontFamily: fontPrimary }}>
                    Gracias por confirmar tu asistencia. {isQuinceanera ? "¡Te espero!" : "¡Te esperamos!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-4" dir="ltr">
                  <Labeled label="Nombre completo *">
                    <Input
                      required
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                      style={{ fontFamily: fontPrimary }}
                    />
                  </Labeled>

                  <Labeled label="Email *">
                    <Input
                      type="email"
                      required
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                      placeholder="tu@email.com"
                      style={{ fontFamily: fontPrimary }}
                    />
                  </Labeled>

                  <Labeled label="¿Asistirás? *">
                    <select
                      required
                      value={rsvpData.attendance}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ fontFamily: fontPrimary }}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="yes">Sí, asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </Labeled>

                  {rsvpData.attendance === "yes" && (
                    <>
                      <Labeled label="Número de acompañantes">
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
                        <span className="block text-sm" style={{ fontFamily: fontPrimary, color: colors.body }}>
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

                  <Labeled label="Mensaje (opcional)">
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
                    colors={colors}
                    className="w-full"
                  >
                    <HeartIcon className="w-4 h-4 mr-2" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                    Confirmar Asistencia
                  </StyledButton>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default RSVP;
