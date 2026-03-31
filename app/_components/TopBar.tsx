"use client";

export function TopBar() {
  return (
    <header className="border-b border-[color:var(--border)] bg-[color:var(--card)]/80 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--card)]/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
               Student Dashboard
            </h1>
            <p className="text-sm opacity-70">
              Search, sort, add, edit and analyze student marks.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-2.5 py-1 text-xs">
              Frontend: Next.js
            </span>
            <span className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--muted)] px-2.5 py-1 text-xs">
              Backend: Node API
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

