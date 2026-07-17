"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animates a leading number in a string from 0 to its target when scrolled
 * into view (e.g. "450+" counts up to 450 and keeps the "+"). Non-numeric
 * strings render as-is.
 */
export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const match = value.match(/^(\d[\d.,]*)(.*)$/);
  const [display, setDisplay] = useState(match ? "0" + match[2] : value);

  useEffect(() => {
    const m = value.match(/^(\d[\d.,]*)(.*)$/);
    if (!m || !inView) return;

    const target = parseFloat(m[1].replace(/[.,]/g, ""));
    const suffix = m[2];
    const duration = 1200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(target * eased);
      setDisplay(current.toLocaleString("id-ID") + suffix);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Settle exactly on the target so it never keeps ticking.
        setDisplay(target.toLocaleString("id-ID") + suffix);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Depend only on stable primitives — `value` is the string prop, `inView`
    // flips once. (Using the `match` array here would restart every render.)
  }, [inView, value]);

  if (!match) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{display}</span>;
}
