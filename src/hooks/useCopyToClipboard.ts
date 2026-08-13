import { useCallback, useEffect, useRef, useState } from 'react';

const RESET_DELAY_MS = 2000;

export function useCopyToClipboard(resetAfterMs: number = RESET_DELAY_MS) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setCopied(false);
          timerRef.current = null;
        }, resetAfterMs);
        return true;
      } catch {
        return false;
      }
    },
    [resetAfterMs]
  );

  return { copied, copy };
}
