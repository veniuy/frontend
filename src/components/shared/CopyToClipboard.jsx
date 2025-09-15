import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Copy, Check } from 'lucide-react';

const CopyToClipboard = ({ 
  text, 
  children, 
  variant = "outline", 
  size = "sm",
  className = "",
  onCopy = () => {},
  timeout = 2000 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy(text);
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          {children || 'Copiado'}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-2" />
          {children || 'Copiar'}
        </>
      )}
    </Button>
  );
};

export default CopyToClipboard;
