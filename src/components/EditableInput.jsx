import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const EditableInput = ({ value, onChange, ...props }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInternalValue(e.target.value);
  };

  const handleBlur = () => {
    onChange(internalValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur(); // Trigger blur to save the value
    }
  };

  return (
    <Input
      id={props.id || props.name || Math.random().toString(36).substring(7)}
      {...props}
      value={internalValue || ""}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

export default React.memo(EditableInput);

