import { useState, useCallback } from 'react';

export const useClipboard = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
      
      setTimeout(() => {
        setCopied(false);
      }, timeout);
      
      return true;
    } catch (err) {
      setError(err);
      setCopied(false);
      console.error('Failed to copy text: ', err);
      return false;
    }
  }, [timeout]);

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
  }, []);

  return {
    copied,
    error,
    copy,
    reset
  };
};
