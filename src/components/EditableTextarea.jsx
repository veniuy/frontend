import React from "react";
import { Textarea } from "@/components/ui/textarea";

const EditableTextarea = ({ value, onChange, ...props }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

    return <Textarea id={props.id || props.name || Math.random().toString(36).substring(7)} {...props} value={value || ""} onChange={handleChange} />;

};

export default React.memo(EditableTextarea);

