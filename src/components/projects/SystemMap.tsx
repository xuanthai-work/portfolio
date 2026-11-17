"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { ArchitectureMap, ArchitectureNode } from "@/types";

interface SystemMapProps {
  architecture: ArchitectureMap;
  className?: string;
}

export function SystemMap({ architecture, className }: SystemMapProps) {
  const [selectedId, setSelectedId] = useState(architecture.start);

  const cols = Math.max(...architecture.nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...architecture.nodes.map((n) => n.row)) + 1;
  const ordered = [...architecture.nodes].sort(
    (a, b) => a.col - b.col || a.row - b.row,
  );
  const byId = new Map(architecture.nodes.map((n) => [n.id, n]));
  const selected = byId.get(selectedId) ?? architecture.nodes[0];
  const neighbours = architecture.edges
    .filter((e) => e.from === selected.id || e.to === selected.id)
    .map((e) => byId.get(e.from === selected.id ? e.to : e.from))
    .filter((n): n is ArchitectureNode => n !== undefined);

  const center = (n: ArchitectureNode) => ({
    x: ((n.col + 0.5) / cols) * 100,
    y: ((n.row + 0.5) / rows) * 100,
  });

  return (
    <div className={className}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        {/* (a) Sơ đồ, chỉ hiện từ md trở lên */}
        <div
          className="relative hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] bg-[radial-gradient(var(--grid-line)_1px,transparent_1px)] bg-[size:20px_20px] md:block"
          style={{ height: rows * 96 }}
        >
          <svg
            aria-hidden="true"
            className="absolute inset-0 size-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            {architecture.edges.map((edge, index) => {
              const fromNode = byId.get(edge.from);
              const toNode = byId.get(edge.to);
              if (!fromNode || !toNode) return null;
              const cFrom = center(fromNode);
              const cTo = center(toNode);
              const isConnected =
                edge.from === selected.id || edge.to === selected.id;

              return (
                <line
                  key={`${edge.from}-${edge.to}-${index}`}
                  stroke={
                    isConnected ? "var(--accent)" : "var(--border-strong)"
                  }
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                  x1={cFrom.x}
                  x2={cTo.x}
                  y1={cFrom.y}
                  y2={cTo.y}
                />
              );
            })}
          </svg>

          {ordered.map((n) => {
            const isSelected = n.id === selected.id;
            const c = center(n);
            return (
              <button
                aria-pressed={isSelected}
                className={cn(
                  "absolute flex min-h-14 max-w-48 -translate-x-1/2 -translate-y-1/2 flex-col justify-center gap-0.5 rounded-xl border px-3 py-2 text-left transition focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none",
                  isSelected
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--ink)]",
                )}
                key={n.id}
                onClick={() => setSelectedId(n.id)}
                style={{
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: `calc(${100 / cols}% - 1.5rem)`,
                }}
                type="button"
              >
                <span className="text-sm leading-tight font-medium [overflow-wrap:anywhere]">
                  {n.label}
                </span>
                <span className="font-mono text-[11px] leading-tight [overflow-wrap:anywhere] opacity-70">
                  {n.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* (a') Danh sách thay thế, chỉ hiện dưới md */}
        <ol className="grid gap-2 md:hidden">
          {ordered.map((n) => {
            const isSelected = n.id === selected.id;
            return (
              <li key={n.id}>
                <button
                  aria-pressed={isSelected}
                  className={cn(
                    "flex min-h-11 w-full flex-col items-start rounded-xl border px-4 py-2.5 text-left transition focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none",
                    isSelected
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                      : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--ink)]",
                  )}
                  onClick={() => setSelectedId(n.id)}
                  type="button"
                >
                  <span className="text-sm leading-tight font-medium [overflow-wrap:anywhere]">
                    {n.label}
                  </span>
                  <span className="font-mono text-[11px] leading-tight [overflow-wrap:anywhere] opacity-70">
                    {n.sub}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* (b) Khung quyết định */}
        <aside
          aria-live="polite"
          className="flex flex-col gap-4 self-start rounded-2xl border border-[var(--ink)] bg-[var(--surface)] p-5 lg:sticky lg:top-24"
        >
          <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--accent-strong)] uppercase">
            Decision
          </p>
          <div>
            <h3 className="font-heading text-2xl leading-tight">
              {selected.label}
            </h3>
            <p className="mt-1 font-mono text-xs text-[var(--muted-foreground)]">
              {selected.sub}
            </p>
          </div>
          <p className="text-[17px] leading-7">{selected.decision}</p>

          {neighbours.length > 0 ? (
            <div className="mt-2">
              <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
                Connected to
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {neighbours.map((neighbour) => (
                  <button
                    className="min-h-11 rounded-full border border-[var(--border-strong)] px-3.5 text-sm transition hover:border-[var(--ink)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                    key={neighbour.id}
                    onClick={() => setSelectedId(neighbour.id)}
                    type="button"
                  >
                    {neighbour.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>

      <p className="mt-3 font-mono text-xs text-[var(--muted-foreground)]">
        Select a component to read the decision behind it.
      </p>
    </div>
  );
}
