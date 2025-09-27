      case "secondary":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.white, 
            color: colors.secondary,
            border: `2px solid ${colors.white}`
          }
        };
      case "primary-inverse":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.white, 
            color: colors.primary,
            border: `2px solid ${colors.white}`
          }
        };
      case "outline":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: "transparent", 
            color: colors.primary,
            border: `2px solid ${colors.primary}`
          }
        };
      case "outline-dark":
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: "transparent", 
            color: colors.darkText,
            border: `2px solid ${colors.darkText}`
          }
        };
      default:
        return {
          className: `${baseStyles} ${sizeClass} ${className}`,
          style: { 
            backgroundColor: colors.primary, 
            color: colors.primaryText,
            border: `2px solid ${colors.primary}`
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

// Componente de label mejorado
function Labeled({ label, children, fontFamily }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily }}>
        {label}
      </label>
      {children}
    </div>
  );
}

/* ===== subcomponentes / helpers ===== */
function TimeCell({ value, label, color = "#fff" }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-light leading-none" style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)", color }}>
        {String(value).padStart(2, "0")}
      </div>
      <div className="opacity-90 text-sm sm:text-base" style={{ color }}>
        {label}
      </div>
    </div>
  );
}

function SeparatorDot({ color = "#fff" }) {
  return (
    <div className="self-center font-light" style={{ color, fontSize: "clamp(2rem, 7vw, 4rem)" }}>
      :
    </div>
  );
}

function DetailIconCard({ icon, iconBg, title, titleColor, textColor, muted, children, fontPrimary }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <h3 
        className="text-2xl font-medium mb-6 tracking-wide font-primary" 
        style={{ color: titleColor, fontFamily: fontPrimary }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function renderBankLine(label, value) {
  if (!value) return null;
  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

/* ===== HELPERS DE COLOR ===== */
function mixHex(hex1, hex2, ratio) {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function toSoft(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function pickTextColor(bgHex) {
  const r = parseInt(bgHex.slice(1, 3), 16);
  const g = parseInt(bgHex.slice(3, 5), 16);
  const b = parseInt(bgHex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

// Función mejorada para construir fecha objetivo
function buildTargetDate(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  
  try {
    // Intentar diferentes formatos de fecha
    let day, month, year;
    
    // Formato DD/MM/YYYY o DD-MM-YYYY
    if (dateStr.includes('/') || dateStr.includes('-')) {
      const separator = dateStr.includes('/') ? '/' : '-';
      const parts = dateStr.split(separator);
      if (parts.length === 3) {
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
      }
    }
    // Formato "DD de Mes, YYYY"
    else if (dateStr.includes(' de ')) {
      const monthNames = {
        'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6,
        'julio': 7, 'agosto': 8, 'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
      };
      
      const parts = dateStr.toLowerCase().split(' ');
      if (parts.length >= 4) {
        day = parseInt(parts[0], 10);
        month = monthNames[parts[2]] || 1;
        year = parseInt(parts[3].replace(',', ''), 10);
      }
    }
    
    if (!day || !month || !year) return null;
    
    // Parsear hora
    const timeParts = timeStr.split(':');
    const hours = parseInt(timeParts[0], 10) || 0;
    const minutes = parseInt(timeParts[1], 10) || 0;
    
    return new Date(year, month - 1, day, hours, minutes, 0);
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
}

async function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}
