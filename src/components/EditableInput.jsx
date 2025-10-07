// src/components/EditableInput.jsx
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function EditableInput({ value, onChange, ...props }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = (e) => {
    if (value !== e.target.value) {
      onChange(e);
    }
  };

  return <Input {...props} value={localValue} onChange={handleChange} onBlur={handleBlur} />;
}

