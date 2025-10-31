import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

export function useInitialText() {
  const [text, setText] = useState("");

  useEffect(() => {
    storageService.getSelectedText().then((selectedText) => {
      if (selectedText) {
        setText(selectedText);
      }
    });
  }, []);

  return [text, setText] as const;
}