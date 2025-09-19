// src/components/EditableText.jsx
import React, { useRef, useState } from "react";

export default function EditableText({
  value,
  onChange,
  as = "span",
  className = "",
  style = {},
  singleLine = true,
  ariaLabel = "Editar texto",
  direction = "auto", // "auto" | "ltr" | "rtl"
}) {
  const Tag = as;
  const ref = useRef(null);
  const [editing, setEditing] = useState(false);

  const beginEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
    setTimeout(() => {
      ref.current?.focus();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }, 0);
  };

  const endEdit = () => {
    setEditing(false);
    window.getSelection?.().removeAllRanges();
  };

  const handleInput = (e) => onChange(e.currentTarget.textContent || "");
  const handleKeyDown = (e) => {
    if ((singleLine && e.key === "Enter") || e.key === "Escape") {
      e.preventDefault();
      ref.current?.blur();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand?.("insertText", false, text);
  };

  // si direction === "auto" no seteamos CSS direction; solo dir="auto"
  const cssDirection =
    direction === "ltr" ? "ltr" : direction === "rtl" ? "rtl" : undefined;

  return (
    <Tag
      ref={ref}
      role="textbox"
      aria-label={ariaLabel}
      contentEditable={editing}
      suppressContentEditableWarning
      onClick={beginEdit}
      onBlur={endEdit}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      dir={direction}                // "auto" | "ltr" | "rtl"
      spellCheck={false}
      className={`${className} outline-none ${
        editing ? "ring-2 ring-blue-400 bg-blue-50 rounded px-1" : "cursor-text"
      }`}
      style={{
        // aísla el contenido del contexto bidi externo
        unicodeBidi: "isolate",
        // solo fijamos CSS direction si es ltr o rtl explícito
        ...(cssDirection ? { direction: cssDirection } : {}),
        whiteSpace: singleLine ? "nowrap" : "pre-wrap",
        ...style,
      }}
    >
      {value}
    </Tag>
  );
}
