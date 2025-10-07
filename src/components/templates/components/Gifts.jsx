import React, { useState } from 'react';
import EditableText from '../../EditableText';
import StyledButton from '../../ui/StyledButton';
import { Card, CardContent } from '../../ui/card';

// Icono de Fiesta (Party) - Cambiado desde Gift
const PartyIcon = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
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

const CopyIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const Gifts = ({ event, setEvent, colors, fontPrimary, fontSecondary, styles = {} }) => {
  const [showGifts, setShowGifts] = useState(false);
  const [copiedField, setCopiedField] = useState('');

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

  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const renderBankLine = (label, value, fieldKey) => {
    if (!value) return null;
    return (
      <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
        <span className="font-medium" style={{ color: '#374151' }}>{label}:</span>
        <div className="flex items-center gap-2">
          <span 
            className="font-mono font-semibold px-2 py-1 rounded text-sm"
            style={{ 
              backgroundColor: 'white', 
              color: '#1f2937',
              border: '1px solid #d1d5db',
              fontFamily: "'Courier New', monospace"
            }}
          >
            {value}
          </span>
          <button
            onClick={() => copyToClipboard(value, fieldKey)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            style={{ 
              background: copiedField === fieldKey ? '#10b981' : colors.primary,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem'
            }}
            title="Copiar"
          >
            {copiedField === fieldKey ? '✓' : <CopyIcon className="w-3 h-3" />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="py-16 text-center" style={{ backgroundColor: colors.secondary }} dir="ltr">
        <div className="max-w-3xl mx-auto px-4">
          {/* Cambio de icono a Fiesta */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                animation: 'bounce 2s infinite'
              }}
            >
              <PartyIcon className="w-6 h-6" style={{ color: 'white' }} />
            </div>
          </div>
          
          <h2
            className="text-2xl font-medium mb-6 tracking-wide"
            style={{ color: colors.secondaryText, fontFamily: fontSecondary }}
          >
            FIESTA
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

      {/* Modal de Regalos Mejorado */}
      {showGifts && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setShowGifts(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxHeight: '90vh', 
              overflowY: 'auto',
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            {/* Header del Modal */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 
                className="text-xl font-semibold" 
                style={{ color: colors.ink, fontFamily: fontPrimary }}
              >
                Regalos y Datos Bancarios
              </h3>
              <button 
                onClick={() => setShowGifts(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <XIcon className="w-5 h-5" style={{ color: '#6b7280' }} />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              <div className="space-y-6" dir="ltr" style={{ color: colors.body, fontFamily: fontPrimary }}>
                
                {/* Mesas de Regalo */}
                {(event.gifts || []).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: colors.ink }}>
                      <PartyIcon className="w-5 h-5" />
                      Mesas de Regalo
                    </h4>
                    <div className="space-y-2">
                      {event.gifts.map((g, i) => (
                        <a
                          key={i}
                          href={g.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block p-3 rounded-lg transition-all hover:opacity-80"
                          style={{ 
                            backgroundColor: colors.primarySoft,
                            color: colors.primary,
                            textDecoration: 'none'
                          }}
                        >
                          <PartyIcon className="w-4 h-4 inline mr-2" style={{ verticalAlign: 'middle' }} />
                          {g.label || "Mesa de Regalos"}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Datos Bancarios Mejorados */}
                {event.bank && (
                  <div>
                    <h4 className="font-medium mb-4 flex items-center gap-2" style={{ color: colors.ink }}>
                      <CreditCardIcon className="w-5 h-5" />
                      Datos Bancarios
                    </h4>
                    <div className="space-y-3">
                      {renderBankLine("Banco", event.bank.name, 'bank_name')}
                      {renderBankLine("Titular", event.bank.holder, 'bank_holder')}
                      {renderBankLine("CBU/CVU", event.bank.cbu, 'bank_cbu')}
                      {renderBankLine("Alias", event.bank.alias, 'bank_alias')}
                      {renderBankLine("IBAN", event.bank.iban, 'bank_iban')}
                      {renderBankLine("SWIFT/BIC", event.bank.swift, 'bank_swift')}
                    </div>
                  </div>
                )}

                {/* Mensaje adicional */}
                {event.giftsNote && (
                  <div 
                    className="p-4 rounded-lg text-center italic"
                    style={{ backgroundColor: colors.paper, color: colors.muted }}
                  >
                    {event.giftsNote}
                  </div>
                )}

                {/* Si no hay información */}
                {!(event.gifts || []).length && !event.bank && (
                  <div 
                    className="text-center p-8 rounded-lg"
                    style={{ backgroundColor: colors.paper, color: colors.muted }}
                  >
                    <PartyIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No hay información de regalos disponible.</p>
                  </div>
                )}
              </div>

              {/* Footer del Modal */}
              <div className="mt-8 text-center">
                <StyledButton
                  colors={colors}
                  variant="outline"
                  onClick={() => setShowGifts(false)}
                >
                  Cerrar
                </StyledButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos adicionales para animaciones */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
};

export default Gifts;

