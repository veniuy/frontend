import React from "react";
import { Input } from "@/components/ui/input";

const EditableInput = ({ value, onChange, ...props }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return <Input {...props} value={value || ""} onChange={handleChange} />;
};

export default React.memo(EditableInput);

