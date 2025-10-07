// src/components/EditableTextarea.jsx
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function EditableTextarea({ value, onChange, ...props }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    onChange(e); // Llama a onChange inmediatamente para actualizar el estado global
  };

  return <Textarea {...props} value={localValue} onChange={handleChange} />;
}
