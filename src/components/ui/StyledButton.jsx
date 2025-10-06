import React from "react";

export default function StyledButton({ 
  children, 
  colors = {}, 
  variant = "default", 
  size = "default", 
  className = "", 
  onClick,
  type = "button",
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const sizeClasses = {
    default: "px-6 py-3 text-base",
    sm: "px-4 py-2 text-sm",
    lg: "px-8 py-4 text-lg"
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.default;
  
  const getButtonStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.white || "#FFFFFF", 
            color: colors.secondary || "#000000",
            border: `2px solid ${colors.white || "#FFFFFF"}`
          }
        };
      case "primary-inverse":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.white || "#FFFFFF", 
            color: colors.primary || "#000000",
            border: `2px solid ${colors.white || "#FFFFFF"}`
          }
        };
      case "outline":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: "transparent", 
            color: colors.primary || "#000000",
            border: `2px solid ${colors.primary || "#000000"}`
          }
        };
      case "outline-dark":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: "transparent", 
            color: colors.darkText || "#FFFFFF",
            border: `2px solid ${colors.darkText || "#FFFFFF"}`
          }
        };
      default:
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.primary || "#000000", 
            color: colors.primaryText || "#FFFFFF",
            border: `2px solid ${colors.primary || "#000000"}`
          }
        };
    }
  };

  const buttonProps = getButtonStyles();
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonProps.className}
      style={buttonProps.style}
      {...props}
    >
      {children}
    </button>
  );
}
