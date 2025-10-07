import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

const EditableTextarea = ({ value, onChange, ...props }) => {
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line on Enter
      e.target.blur(); // Trigger blur to save the value
    }
  };

  return (
    <Textarea
      id={props.id || props.name || Math.random().toString(36).substring(7)}
      {...props}
      value={internalValue || ""}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

export default React.memo(EditableTextarea);

