"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  sub?: string;
}

/**
 * Accessible custom dropdown. The panel renders in a portal with fixed
 * positioning so it is never clipped by an `overflow-hidden` ancestor.
 */
export default function Dropdown({
  value,
  options,
  onChange,
  triggerClassName = "",
  placeholder = "Pilih",
  renderTrigger,
}: {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  triggerClassName?: string;
  placeholder?: string;
  renderTrigger?: (selected: DropdownOption | undefined) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(
    null,
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const place = () => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ top: r.bottom + 8, left: r.left, width: r.width });
  };

  useLayoutEffect(() => {
    if (open) place();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onScroll = () => setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 ${triggerClassName}`}
      >
        {renderTrigger ? (
          renderTrigger(selected)
        ) : (
          <span className="truncate">{selected?.label ?? placeholder}</span>
        )}
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-mitsu-red transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && pos && (
              <motion.div
                ref={panelRef}
                role="listbox"
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  zIndex: 90,
                }}
                className="max-h-72 overflow-auto rounded-2xl border border-black/5 bg-white p-1.5 shadow-luxe"
              >
                {options.map((o) => {
                  const active = o.value === value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        onChange(o.value);
                        setOpen(false);
                      }}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        active
                          ? "bg-mitsu-red text-white"
                          : "text-mitsu-ink hover:bg-mitsu-silver"
                      }`}
                    >
                      <span className="flex-1">
                        <span className="block text-sm font-bold leading-tight">
                          {o.label}
                        </span>
                        {o.sub && (
                          <span
                            className={`block text-xs ${
                              active ? "text-white/80" : "text-mitsu-gray"
                            }`}
                          >
                            {o.sub}
                          </span>
                        )}
                      </span>
                      {active ? (
                        <Check className="h-4 w-4 shrink-0" />
                      ) : (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-transparent transition-colors group-hover:bg-mitsu-red" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
