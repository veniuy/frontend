import React, { useState } from 'react';
import EditableText from '../../EditableText';
import StyledButton from '../../ui/StyledButton';
import { Card, CardContent } from '../../ui/card';

// Iconos simples con SVG
const GiftIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"></polyline>
    <rect x="2" y="7" width="20" height="5"></rect>
    <line x1="12" y1="22" x2="12" y2="7"></line>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
  </svg>
);

const CreditCardIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Gifts = ({ event, setEvent, colors, fontPrimary, fontSecondary, styles = {} }) => {
  const [showGifts, setShowGifts] = useState(false);

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

  const renderBankLine = (label, value) => {
    if (!value) return null;
    return (
      <div className="flex justify-between">
        <span className="font-medium">{label}:</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <>
      <section className="py-16 text-center" style={{ backgroundColor: colors.secondary }} dir="ltr">
        <div className="max-w-3xl mx-auto px-4">
          <GiftIcon className="w-10 h-10 mx-auto mb-6" style={{ color: colors.secondaryText }} />
          <h2
            className="text-2xl font-medium mb-6 tracking-wide"
            style={{ color: colors.secondaryText, fontFamily: fontSecondary }}
          >
            REGALOS
          </h2>
          <p
            className="mb-8"
            style={{ 
              color: colors.secondaryText, 
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)", 
              fontFamily: fontPrimary 
            }}
          >
            <EditableText
              value={event.giftsNote || "Tu presencia es nuestro mejor regalo, pero si deseás obsequiarnos algo más, te dejamos nuestros datos."}
              onChange={(v) => setEvent((p) => ({ ...p, giftsNote: v }))}
              className="px-1"
              singleLine={false}
              style={{ color: colors.secondaryText, fontFamily: fontPrimary }}
            />
          </p>
          <StyledButton
            colors={colors}
            variant="secondary"
            onClick={() => setShowGifts(true)}
          >
            VER DATOS BANCARIOS
          </StyledButton>
        </div>
      </section>

      {/* Modal de Regalos */}
      {showGifts && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowGifts(false)}
        >
          <Card 
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium" style={{ color: colors.ink, fontFamily: fontPrimary }}>
                  Regalos y Datos Bancarios
                </h3>
                <button 
                  onClick={() => setShowGifts(false)}
                  className="hover:opacity-70 transition-opacity"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-sm" dir="ltr" style={{ color: colors.body, fontFamily: fontPrimary }}>
                {/* Mesas de Regalo */}
                {(event.gifts || []).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: colors.ink }}>
                      Mesas de Regalo
                    </h4>
                    <div className="space-y-2">
                      {event.gifts.map((g, i) => (
                        <a
                          key={i}
                          href={g.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block p-3 rounded-md transition-all hover:opacity-80"
                          style={{ 
                            backgroundColor: colors.primarySoft,
                            color: colors.primary,
                            textDecoration: 'none'
                          }}
                        >
                          <GiftIcon className="w-4 h-4 inline mr-2" style={{ verticalAlign: 'middle' }} />
                          {g.label || "Mesa de Regalos"}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Datos Bancarios */}
                {event.bank && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: colors.ink }}>
                      <CreditCardIcon className="w-5 h-5" />
                      Datos Bancarios
                    </h4>
                    <div 
                      className="p-4 rounded-md space-y-2"
                      style={{ backgroundColor: colors.paper }}
                    >
                      {renderBankLine("Banco", event.bank.name)}
                      {renderBankLine("Titular", event.bank.holder)}
                      {renderBankLine("CBU/CVU", event.bank.cbu)}
                      {renderBankLine("Alias", event.bank.alias)}
                      {renderBankLine("IBAN", event.bank.iban)}
                      {renderBankLine("SWIFT/BIC", event.bank.swift)}
                    </div>
                  </div>
                )}

                {/* Mensaje adicional */}
                {event.giftsNote && (
                  <p className="text-center italic" style={{ color: colors.muted }}>
                    {event.giftsNote}
                  </p>
                )}

                {/* Si no hay información */}
                {!(event.gifts || []).length && !event.bank && (
                  <p className="text-center" style={{ color: colors.muted }}>
                    No hay información de regalos disponible.
                  </p>
                )}
              </div>

              <div className="mt-6 text-center">
                <StyledButton
                  colors={colors}
                  variant="outline"
                  onClick={() => setShowGifts(false)}
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

export default Gifts;
