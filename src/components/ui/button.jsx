import React from "react";

export function Button({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  onClick,
  type = "button",
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-primary text-white border-2 border-primary",
    secondary: "bg-white text-secondary border-2 border-white",
    "primary-inverse": "bg-white text-primary border-2 border-white",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
    "outline-dark": "bg-transparent border-2",
    ghost: "hover:bg-gray-100"
  };
  
  const sizes = {
    default: "px-6 py-3 text-base",
    sm: "px-4 py-2 text-sm",
    lg: "px-8 py-4 text-lg"
  };
  
  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.default;
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
