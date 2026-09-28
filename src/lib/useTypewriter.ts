import { useEffect, useState } from "react";

type Options = {
  /** Typing speed, in characters per second. */
  charsPerSecond?: number;
  /** Pause before typing starts, in ms. */
  startDelay?: number;
  /** Pause after a line finishes, in ms. */
  linePause?: number;
  /** When false, the full text is returned immediately. */
  enabled?: boolean;
};

/**
 * Types a list of lines one character at a time, sequentially.
 *
 * Returns `typed` (the text revealed so far, per line) plus `activeLine` and
 * `done`, so the caller can render a caret on the line being typed.
 *
 * The caller is expected to reserve the final layout with an invisible copy of
 * the text, otherwise the surrounding content jumps on every character.
 */
export function useTypewriter(lines: string[], options: Options = {}) {
  const { charsPerSecond = 24, startDelay = 700, linePause = 240, enabled = true } = options;

  const [typed, setTyped] = useState<string[]>(() =>
    enabled ? lines.map(() => "") : [...lines],
  );
  const [activeLine, setActiveLine] = useState(0);
  const [done, setDone] = useState(!enabled);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let line = 0;
    let char = 0;

    const step = () => {
      if (cancelled) return;

      if (line >= lines.length) {
        setDone(true);
        return;
      }

      const text = lines[line];
      char += 1;
      const currentLine = line;
      const revealed = text.slice(0, char);

      setTyped((previous) => {
        const next = [...previous];
        next[currentLine] = revealed;
        return next;
      });

      if (char >= text.length) {
        line += 1;
        char = 0;
        // Keep the caret on the last line once everything is typed.
        setActiveLine(Math.min(line, lines.length - 1));
        timer = setTimeout(step, linePause);
      } else {
        timer = setTimeout(step, 1000 / charsPerSecond);
      }
    };

    timer = setTimeout(step, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lines, charsPerSecond, startDelay, linePause, enabled]);

  return { typed, activeLine, done };
}
