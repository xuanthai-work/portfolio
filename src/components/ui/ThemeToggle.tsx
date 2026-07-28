"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      aria-label="Toggle color theme"
      className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] transition hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none active:translate-y-px"
      onClick={toggleTheme}
      type="button"
    >
      <Sun
        aria-hidden="true"
        className="hidden dark:block"
        size={18}
        strokeWidth={1.8}
      />
      <Moon
        aria-hidden="true"
        className="block dark:hidden"
        size={18}
        strokeWidth={1.8}
      />
    </button>
  );
}
