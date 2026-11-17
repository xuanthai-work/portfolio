"use client";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ButtonLink } from "@/components/ui/Button";
import type { NavigationItem } from "@/types";

interface MobileMenuProps {
  navigation: NavigationItem[];
  resumeUrl: string;
}

export function MobileMenu({ navigation, resumeUrl }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        aria-expanded={open}
        aria-label="Open navigation menu"
        className="inline-flex size-11 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu aria-hidden="true" size={19} strokeWidth={1.8} />
      </button>

      {open
        ? createPortal(
            <div
              aria-label="Mobile navigation"
              aria-modal="true"
              className="fixed inset-0 z-50 bg-[var(--background)] p-5"
              role="dialog"
            >
              <div className="mx-auto flex h-full max-w-lg flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Navigation</span>
                  <button
                    ref={closeButtonRef}
                    aria-label="Close navigation menu"
                    className="inline-flex size-11 items-center justify-center rounded-xl border border-[var(--border)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                    onClick={() => setOpen(false)}
                    type="button"
                  >
                    <X aria-hidden="true" size={19} strokeWidth={1.8} />
                  </button>
                </div>
                <nav className="mt-10" aria-label="Mobile">
                  <ul className="grid gap-1">
                    {navigation.map((item) => (
                      <li key={item.label}>
                        <Link
                          className="font-heading block py-3 text-4xl leading-tight text-[var(--foreground)] transition hover:text-[var(--accent-strong)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                          href={item.href}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <ButtonLink
                  className="mt-auto w-full"
                  download
                  href={resumeUrl}
                  onClick={() => setOpen(false)}
                >
                  <Download aria-hidden="true" size={16} strokeWidth={1.8} />
                  Download résumé
                </ButtonLink>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
