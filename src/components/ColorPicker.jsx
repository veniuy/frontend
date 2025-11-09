import React from 'react';
import { Check } from 'lucide-react';

const APP_COLOR_PRESETS = [
  { name: 'Negro', value: '#000000', category: 'primary' },
  { name: 'Blanco', value: '#ffffff', category: 'primary-foreground' },
  { name: 'Beige Claro', value: '#f4f2ed', category: 'secondary' },
  { name: 'Gris Cálido', value: '#7a746b', category: 'muted-foreground' },
  { name: 'Sage', value: '#9fb2a3', category: 'accent' },
  { name: 'Terracota', value: '#d4a59a', category: 'accent' },
  { name: 'Dorado', value: '#e5c89f', category: 'accent' }
];

export const ColorPicker = ({ value, onChange, label }) => {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {APP_COLOR_PRESETS.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onChange(color.value)}
            className="w-8 h-8 rounded-full border-2 relative transition-all duration-150 ease-in-out"
            style={{
              backgroundColor: color.value,
              borderColor: value === color.value ? '#000' : '#e1ddd6',
              boxShadow: value === color.value ? '0 0 0 3px rgba(0, 0, 0, 0.2)' : 'none'
            }}
            title={color.name}
          >
            {value === color.value && (
              <Check className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" 
                style={{ color: color.value === '#000000' ? '#ffffff' : '#000000' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

