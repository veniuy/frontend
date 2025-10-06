import React, { useState } from 'react';
import EditableText from '../../EditableText';
import StyledButton from '../../ui/StyledButton';
import { Card, CardContent } from '../../ui/card';

// Icono X
const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const UsefulInfo = ({ event, setEvent, colors, fontPrimary, fontSecondary, styles = {} }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <section className="py-16" style={{ backgroundColor: colors.paper }} dir="ltr">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-2xl font-medium mb-6 tracking-wide"
            style={{ color: colors.ink, fontFamily: fontSecondary }}
          >
            INFO ÚTIL
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: colors.body, fontFamily: fontPrimary }}>
            <EditableText
              value={event.info?.help || "Te dejamos sugerencias de alojamientos y traslados para ese fin de semana."}
              onChange={(v) => setEvent((p) => ({ ...p, info: { ...(p.info || {}), help: v } }))}
              className="px-1"
              singleLine={false}
              style={{ color: colors.body, fontFamily: fontPrimary }}
            />
          </p>
          <StyledButton
            colors={colors}
            variant="outline"
            onClick={() => setShowInfo(true)}
          >
            VER MÁS
          </StyledButton>
        </div>
      </section>

      {/* Modal de Info Útil */}
      {showInfo && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowInfo(false)}
        >
          <Card 
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium" style={{ color: colors.ink, fontFamily: fontPrimary }}>
                  Información útil
                </h3>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="hover:opacity-70 transition-opacity"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-sm" dir="ltr" style={{ color: colors.body, fontFamily: fontPrimary }}>
                {event.info?.help && <p className="whitespace-pre-wrap">{event.info.help}</p>}

                {(event.info?.lodging || []).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: colors.ink }}>
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
                                    style={{ color: colors.primary }}
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
                    <h4 className="font-medium mb-2" style={{ color: colors.ink }}>
                      Traslados / Transporte
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {event.info.transport.map((item, i) => (
                        <li key={i}>
                          {typeof item === "string" ? item : item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!(event.info?.lodging || []).length && !(event.info?.transport || []).length && (
                  <p className="text-center" style={{ color: colors.muted }}>
                    No hay información adicional disponible.
                  </p>
                )}
              </div>

              <div className="mt-6 text-center">
                <StyledButton
                  colors={colors}
                  variant="outline"
                  onClick={() => setShowInfo(false)}
                >
                  Cerrar
                </StyledButton>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default UsefulInfo;
