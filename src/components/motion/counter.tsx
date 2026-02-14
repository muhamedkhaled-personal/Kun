"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useInView, animate } from "framer-motion";

// Map Eastern Arabic numerals to ASCII
const easternToAscii: Record<string, string> = {
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
  "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};

function parseStatValue(value: string): { num: number; prefix: string; suffix: string } | null {
  // Normalize Eastern Arabic numerals to ASCII for parsing
  const normalized = value.replace(/[٠-٩]/g, (ch) => easternToAscii[ch] || ch);
  const match = normalized.match(/^([^\d]*)(\d+)([^\d]*)$/);
  if (!match) return null;
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] };
}

// Convert ASCII digit string back to Eastern Arabic if the original used them
function toEasternArabic(numStr: string): string {
  return numStr.replace(/[0-9]/g, (d) => String.fromCharCode(0x0660 + parseInt(d)));
}

interface CounterProps {
  value: string;
  className?: string;
}

export function Counter({ value, className }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const parsed = useMemo(() => parseStatValue(value), [value]);
  const usesEastern = useMemo(() => /[٠-٩]/.test(value), [value]);

  const [display, setDisplay] = useState(() => {
    if (!parsed) return value;
    const zero = usesEastern ? toEasternArabic("0") : "0";
    return `${parsed.prefix}${zero}${parsed.suffix}`;
  });

  useEffect(() => {
    if (!isInView || !parsed) return;

    const controls = animate(0, parsed.num, {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(latest) {
        const rounded = Math.round(latest).toString();
        const digits = usesEastern ? toEasternArabic(rounded) : rounded;
        setDisplay(`${parsed.prefix}${digits}${parsed.suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, parsed, usesEastern]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
