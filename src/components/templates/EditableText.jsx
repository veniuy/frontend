// src/components/EditableText.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * EditableText (estable)
 * - Mantiene un draft local mientras se escribe (no re-renderiza el children en cada tecla).
 * - onChange se dispara al blur o Enter (si singleLine=true).
 * - Cursor no "salta" al inicio.
 */
export default function EditableText({
  value,
  onChange,
  as = "span",
  className = "",
  style = {},
  singleLine = true,
  ariaLabel = "Editar texto",
  direction = "ltr", // "ltr" | "rtl" | "auto"
}) {
  const Tag = as;
  const ref = useRef(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");

  // Si cambia el value desde afuera y NO estamos editando, sincronizar.
  useEffect(() => {
    if (!editing) setDraft(value || "");
  }, [value, editing]);

  // Mantener el DOM en sync con draft SIN forzar re-render del nodo
  useEffect(() => {
    if (ref.current && editing) {
      // mientras se edita, el DOM ya refleja lo escrito por el usuario,
      // no tocamos textContent para no mover el cursor
      return;
    }
    if (ref.current && !editing && ref.current.textContent !== draft) {
      ref.current.textContent = draft;
    }
  }, [draft, editing]);

  const beginEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
    // Poner el cursor al final
    requestAnimationFrame(() => {
      ref.current?.focus();
      placeCaretAtEnd(ref.current);
    });
  };

  const endEdit = () => {
    setEditing(false);
    // Commit al salir
    if (draft !== (value || "")) onChange?.(draft);
    window.getSelection?.().removeAllRanges();
  };

  const handleInput = (e) => {
    setDraft(e.currentTarget.textContent || "");
    // No llamamos onChange acá para no perder el caret
  };

  const handleKeyDown = (e) => {
    if (singleLine && e.key === "Enter") {
      e.preventDefault();
      ref.current?.blur(); // dispara endEdit -> commit
    } else if (e.key === "Escape") {
      e.preventDefault();
      // cancelar cambios y restaurar
      setDraft(value || "");
      // restaurar en DOM y salir
      if (ref.current) ref.current.textContent = value || "";
      ref.current?.blur();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text/plain");
    insertTextAtCursor(text);
    setDraft(ref.current?.textContent || "");
  };

  // direction (visual) + aislamiento bidi
  const cssDirection = direction === "ltr" || direction === "rtl" ? direction : undefined;

  return (
    <Tag
      ref={ref}
      role="textbox"
      aria-label={ariaLabel}
      contentEditable
      suppressContentEditableWarning
      onClick={beginEdit}
      onFocus={beginEdit}
      onBlur={endEdit}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      dir={direction} // atributo HTML
      spellCheck={false}
      className={`${className} outline-none ${editing ? "ring-2 ring-blue-400 bg-blue-50 rounded px-1" : "cursor-text"}`}
      style={{
        unicodeBidi: "isolate",
        ...(cssDirection ? { direction: cssDirection } : {}),
        whiteSpace: singleLine ? "nowrap" : "pre-wrap",
        ...style,
      }}
    >
      {/* Importante: renderizamos draft SOLO cuando NO se edita, para no romper el caret */}
      {!editing ? draft : null}
    </Tag>
  );
}

/* ==== helpers caret ==== */
function placeCaretAtEnd(node) {
  try {
    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false); // final
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } catch {}
}

function insertTextAtCursor(text) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(text));
  // mover caret al final del texto insertado
  range.setStart(range.endContainer, range.endOffset);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}
