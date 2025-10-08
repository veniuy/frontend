import React, { useState } from 'react';
import EditableText from '../../EditableText';
import StyledButton from '../../ui/StyledButton';
import { Card, CardContent } from '../../ui/card';

// Icono de Regalo
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

// Función simple para renderizar líneas bancarias (solo lectura)
const renderBankLine = (label, value, onCopy, copiedField, fieldKey) => {
  if (!value) return null;
  
  return (
    <div className="flex justify-between items-center py-2">
      <span className="font-medium text-gray-600">{label}:</span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-gray-900">{value}</span>
        {onCopy && (
          <button
            onClick={() => onCopy(value, fieldKey)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            style={{
              background: copiedField === fieldKey ? '#10b981' : '#6b7280',
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
        )}
      </div>
    </div>
  );
};

const Gifts = ({ event, setEvent, colors, fontPrimary, fontSecondary, styles = {} }) => {
  const [showGifts, setShowGifts] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  // Funciones para edición FUERA del modal (solo para la sección principal)
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

  return (
    <>
      <section className="py-16 text-center" style={{ backgroundColor: colors.secondary }} dir="ltr">
        <div className="max-w-3xl mx-auto px-4">
          {/* Icono de Regalo */}
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
          
          {/* Sección editable para mesas de regalos FUERA del modal */}
          <div className="mb-8">
            <div className="space-y-2">
              {(event.gifts || []).map((g, i) => (
                <div key={i} className="flex items-center gap-2 max-w-md mx-auto">
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
                className="mt-2"
              >
                Agregar Mesa de Regalos
              </StyledButton>
            </div>
          </div>

          {/* Sección editable para datos bancarios FUERA del modal */}
          <div className="mb-8 max-w-md mx-auto">
            <h3 className="text-lg font-medium mb-4" style={{ color: colors.secondaryText }}>
              Datos Bancarios (Editar)
            </h3>
            <div className="space-y-2">
              <EditableText
                value={event.bank?.name || ""}
                onChange={(v) => updateBankField('name', v)}
                className="block p-3 rounded-lg w-full"
                style={{
                  backgroundColor: colors.primarySoft,
                  color: colors.primary,
                }}
                singleLine
                placeholder="Nombre del banco"
              />
              <EditableText
                value={event.bank?.holder || ""}
                onChange={(v) => updateBankField('holder', v)}
                className="block p-3 rounded-lg w-full"
                style={{
                  backgroundColor: colors.primarySoft,
                  color: colors.primary,
                }}
                singleLine
                placeholder="Titular de la cuenta"
              />
              <EditableText
                value={event.bank?.cbu || ""}
                onChange={(v) => updateBankField('cbu', v)}
                className="block p-3 rounded-lg w-full"
                style={{
                  backgroundColor: colors.primarySoft,
                  color: colors.primary,
                }}
                singleLine
                placeholder="CBU/CVU"
              />
              <EditableText
                value={event.bank?.alias || ""}
                onChange={(v) => updateBankField('alias', v)}
                className="block p-3 rounded-lg w-full"
                style={{
                  backgroundColor: colors.primarySoft,
                  color: colors.primary,
                }}
                singleLine
                placeholder="Alias"
              />
            </div>
          </div>

          <StyledButton
            colors={colors}
            variant="secondary"
            onClick={() => setShowGifts(true)}
          >
            VER DATOS BANCARIOS
          </StyledButton>
        </div>
      </section>

      {/* Modal de Solo Lectura - Basado en WeddingElegantTemplate */}
      {showGifts && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowGifts(false)}
        >
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 
                  className="text-xl font-medium" 
                  style={{ color: colors.ink, fontFamily: fontPrimary }}
                >
                  Datos Bancarios
                </h3>
                <button 
                  onClick={() => setShowGifts(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <XIcon className="w-5 h-5" style={{ color: '#6b7280' }} />
                </button>
              </div>

              <div className="space-y-4 text-sm" dir="ltr" style={{ fontFamily: fontPrimary }}>
                <div className="text-center mb-4">
                  <CreditCard className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                  <p style={{ color: colors.body }}>
                    Si deseás colaborar con nuestra celebración:
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.paper }}>
                  <h4 className="font-medium mb-3" style={{ color: colors.ink }}>
                    Transferencia Bancaria
                  </h4>
                  <div className="space-y-2">
                    {renderBankLine("Banco", event.bank?.name, copyToClipboard, copiedField, 'name')}
                    {renderBankLine("CBU/CVU", event.bank?.cbu, copyToClipboard, copiedField, 'cbu')}
                    {renderBankLine("Alias", event.bank?.alias, copyToClipboard, copiedField, 'alias')}
                    {renderBankLine("Titular", event.bank?.holder, copyToClipboard, copiedField, 'holder')}
                    {renderBankLine("IBAN", event.bank?.iban, copyToClipboard, copiedField, 'iban')}
                    {renderBankLine("SWIFT/BIC", event.bank?.swift, copyToClipboard, copiedField, 'swift')}
                  </div>
                </div>

                {(event.gifts || []).length > 0 && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.paper }}>
                    <h4 className="font-medium mb-3" style={{ color: colors.ink }}>
                      Mesas de Regalos
                    </h4>
                    <ul className="space-y-2">
                      {event.gifts.map((g, i) => (
                        <li key={i}>
                          {g.url ? (
                            <a
                              href={g.url}
                              target="_blank"
                              rel="noreferrer"
                              className="underline hover:opacity-80 block"
                              style={{ color: colors.primary }}
                            >
                              {g.label || g.url}
                            </a>
                          ) : (
                            <span style={{ color: colors.body }}>{g.label || "Enlace"}</span>
                          )}
                        </li>
                      ))}
                    </ul>
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
                {!(event.gifts || []).length && !event.bank?.name && !event.bank?.cbu && (
                  <div 
                    className="text-center p-8 rounded-lg"
                    style={{ backgroundColor: colors.paper, color: colors.muted }}
                  >
                    <GiftIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No hay información de regalos disponible.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
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
