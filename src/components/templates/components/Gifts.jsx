import React, { useState } from 'react';
import EditableText from '../../EditableText';
import StyledButton from '../../ui/StyledButton';
import { Card, CardContent } from '../../ui/card';

// Nuevo Icono de Regalo (simple)
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

  const updateBankField = (key, value) => {
    setEvent((p) => ({
      ...p,
      bank: {
        ...(p.bank || {}),
        [key]: value,
      },
    }));
  };

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
    // Siempre renderizar el EditableText para permitir la edición, incluso si el valor está vacío
    return (
      <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
        <span className="font-medium" style={{ color: '#374151' }}>{label}:</span>
        <div className="flex items-center gap-2">
          <EditableText
            value={value || ""}
            onChange={(v) => updateBankField(fieldKey, v)}
            className="font-mono font-semibold px-2 py-1 rounded text-sm"
            style={{
              backgroundColor: 'white',
              color: '#1f2937',
              border: '1px solid #d1d5db',
              fontFamily: "'Courier New', monospace",
              minWidth: '50px', // Asegurar que sea visible para editar
            }}
            singleLine
            ariaLabel={`Editar ${label}`}
          />
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
          {/* Icono de Regalo sin animación */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              <GiftIcon className="w-6 h-6" style={{ color: 'white' }} />
            </div>
          </div>
          
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
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: colors.ink }}>
                    <GiftIcon className="w-5 h-5" />
                    Mesas de Regalo
                  </h4>
                  <div className="space-y-2">
                    {(event.gifts || []).map((g, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <EditableText
                          value={g.label || "Mesa de Regalos"}
                          onChange={(v) => updateGift(i, 'label', v)}
                          className="block p-3 rounded-lg transition-all hover:opacity-80"
                          style={{
                            backgroundColor: colors.primarySoft,
                            color: colors.primary,
                            textDecoration: 'none',
                            flexGrow: 1,
                          }}
                          singleLine
                          ariaLabel="Nombre de la mesa de regalos"
                        />
                        <EditableText
                          value={g.url || ""}
                          onChange={(v) => updateGift(i, 'url', v)}
                          className="block p-3 rounded-lg transition-all hover:opacity-80"
                          style={{
                            backgroundColor: colors.primarySoft,
                            color: colors.primary,
                            textDecoration: 'none',
                            flexGrow: 1,
                          }}
                          singleLine
                          ariaLabel="URL de la mesa de regalos"
                        />
                        <button
                          onClick={() => removeGift(i)}
                          className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <StyledButton
                      colors={colors}
                      variant="outline"
                      onClick={addGift}
                      className="w-full mt-2"
                    >
                      Agregar Mesa de Regalos
                    </StyledButton>
                  </div>
                </div>

                {/* Datos Bancarios Mejorados */}
                <div>
                  <h4 className="font-medium mb-4 flex items-center gap-2" style={{ color: colors.ink }}>
                    <CreditCardIcon className="w-5 h-5" />
                    Datos Bancarios
                  </h4>
                  <div className="space-y-3">
                    {renderBankLine("Banco", event.bank?.name, 'name')}
                    {renderBankLine("Titular", event.bank?.holder, 'holder')}
                    {renderBankLine("CBU/CVU", event.bank?.cbu, 'cbu')}
                    {renderBankLine("Alias", event.bank?.alias, 'alias')}
                    {renderBankLine("IBAN", event.bank?.iban, 'iban')}
                    {renderBankLine("SWIFT/BIC", event.bank?.swift, 'swift')}
                  </div>
                </div>

                {/* Mensaje adicional */}
                {event.giftsNote && (
                  <div 
                    className="p-4 rounded-lg text-center italic"
                    style={{ backgroundColor: colors.paper, color: colors.muted }}
                  >
                    <EditableText
                      value={event.giftsNote}
                      onChange={(v) => setEvent((p) => ({ ...p, giftsNote: v }))}
                      className="px-1"
                      singleLine={false}
                      style={{ color: colors.muted, fontFamily: fontPrimary }}
                    />
                  </div>
                )}

                {/* Si no hay información */}
                {!(event.gifts || []).length && !event.bank && (
                  <div 
                    className="text-center p-8 rounded-lg"
                    style={{ backgroundColor: colors.paper, color: colors.muted }}
                  >
                    <GiftIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
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
      `}</style>
    </>
  );
};

export default Gifts;
