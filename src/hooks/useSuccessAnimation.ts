import { useState, useCallback } from 'react';

export function useSuccessAnimation(duration: number = 600) {
  const [isAnimating, setIsAnimating] = useState(false);

  const trigger = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), duration);
  }, [duration]);

  return [isAnimating, trigger] as const;
}