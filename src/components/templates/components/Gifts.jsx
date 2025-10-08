import React, { useState } from 'react';
import EditableText from '../../EditableText';
import StyledButton from '../../ui/StyledButton';
import { Card, CardContent } from '../../ui/card';
import { Button } from "@/components/ui/button";

// Iconos
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

// Función para renderizar líneas bancarias (exactamente como en WeddingElegantTemplate)
function renderBankLine(label, value) {
  if (!value) return null;
  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

const Gifts = ({ event, setEvent, colors, fontPrimary, fontSecondary, styles = {} }) => {
  const [showGifts, setShowGifts] = useState(false);

  // Funciones para edición (solo para la sección principal, fuera del modal)
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

  return (
    <>
      {/* ===== REGALOS / TRANSFERENCIAS ===== */}
      <section className="py-16 text-center" style={{ backgroundColor: colors.secondary }} dir="ltr">
        <div className="max-w-3xl mx-auto px-4">
          <GiftIcon className="w-10 h-10 mx-auto mb-6" style={{ color: colors.secondaryText }} />
          <p
            className="mb-8 font-primary"
            style={{ 
              color: colors.secondaryText, 
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)", 
              fontFamily: fontPrimary 
            }}
          >
            <EditableText
              value={event.giftsNote || "Si deseás realizarnos un regalo podés colaborar con nuestra Luna de Miel…"}
              onChange={(v) => setEvent((p) => ({ ...p, giftsNote: v }))}
              className="px-1 editable-text"
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

      {/* Sección de edición (fuera del modal) */}
      <section className="py-8" style={{ backgroundColor: colors.paper }}>
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-lg font-medium mb-4 text-center" style={{ color: colors.ink, fontFamily: fontPrimary }}>
            Configurar Datos (Solo visible en edición)
          </h3>
          
          {/* Editar datos bancarios */}
          <div className="mb-6">
            <h4 className="font-medium mb-3" style={{ color: colors.ink }}>Datos Bancarios</h4>
            <div className="space-y-2">
              <EditableText
                value={event.bank?.banco || ""}
                onChange={(v) => updateBankField('banco', v)}
                className="block p-3 rounded-lg w-full"
                style={{
                  backgroundColor: colors.primarySoft,
                  color: colors.primary,
                }}
                singleLine
                placeholder="Nombre del banco"
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
                placeholder="CBU/IBAN"
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
              <EditableText
                value={event.bank?.titular || ""}
                onChange={(v) => updateBankField('titular', v)}
                className="block p-3 rounded-lg w-full"
                style={{
                  backgroundColor: colors.primarySoft,
                  color: colors.primary,
                }}
                singleLine
                placeholder="Titular"
              />
              <EditableText
                value={event.bank?.cuenta || ""}
                onChange={(v) => updateBankField('cuenta', v)}
                className="block p-3 rounded-lg w-full"
                style={{
                  backgroundColor: colors.primarySoft,
                  color: colors.primary,
                }}
                singleLine
                placeholder="Número de cuenta"
              />
              <EditableText
                value={event.bank?.nota || ""}
                onChange={(v) => updateBankField('nota', v)}
                className="block p-3 rounded-lg w-full"
                style={{
                  backgroundColor: colors.primarySoft,
                  color: colors.primary,
                }}
                singleLine
                placeholder="Nota adicional"
              />
            </div>
          </div>

          {/* Editar mesas de regalos */}
          <div>
            <h4 className="font-medium mb-3" style={{ color: colors.ink }}>Mesas de Regalos</h4>
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
                      flexGrow: 1,
                    }}
                    singleLine
                    placeholder="Nombre de la mesa"
                  />
                  <EditableText
                    value={g.url || ""}
                    onChange={(v) => updateGift(i, 'url', v)}
                    className="block p-3 rounded-lg transition-all hover:opacity-80"
                    style={{
                      backgroundColor: colors.primarySoft,
                      color: colors.primary,
                      flexGrow: 1,
                    }}
                    singleLine
                    placeholder="URL"
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
        </div>
      </section>

      {/* Modal de Regalos - EXACTAMENTE IGUAL AL WEDDING ELEGANT TEMPLATE */}
      {showGifts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium font-primary" style={{ color: colors.ink, fontFamily: fontPrimary }}>
                  Datos Bancarios
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowGifts(false)}>
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4 text-sm font-primary" dir="ltr" style={{ fontFamily: fontPrimary }}>
                <div className="text-center mb-2">
                  <CreditCardIcon className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                  <p style={{ color: colors.body }}>
                    Si deseás colaborar con nuestra Luna de Miel:
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.paper }}>
                  <h4 className="font-medium mb-2" style={{ color: colors.ink }}>
                    Transferencia Bancaria
                  </h4>
                  <div className="space-y-1 text-sm" style={{ color: colors.body }}>
                    {renderBankLine("Banco", event.bank?.banco)}
                    {renderBankLine("CBU/IBAN", event.bank?.cbu)}
                    {renderBankLine("Alias", event.bank?.alias)}
                    {renderBankLine("Titular", event.bank?.titular)}
                    {renderBankLine("Cuenta", event.bank?.cuenta)}
                    {event.bank?.nota ? (
                      <p className="text-xs" style={{ color: colors.muted }}>
                        {event.bank?.nota}
                      </p>
                    ) : null}
                  </div>
                </div>

                {(event.gifts || []).length > 0 && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.paper }}>
                    <h4 className="font-medium mb-2" style={{ color: colors.ink }}>
                      Mesas de Regalos
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {event.gifts.map((g, i) => (
                        <li key={i}>
                          {g.url ? (
                            <a
                              href={g.url}
                              target="_blank"
                              rel="noreferrer"
                              className="underline hover:opacity-80"
                              style={{ color: colors.primary }}
                            >
                              {g.label || g.url}
                            </a>
                          ) : (
                            <span>{g.label || "Enlace"}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Gifts;
