"use client";

import type { Student } from "../_types/student";

type Props = {
  students: Student[];
  loading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: Student["ID"]) => void;
};

export function StudentsTable({ students, loading, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium opacity-80">Students</h2>
        {loading ? (
          <span className="text-xs opacity-70">Loading…</span>
        ) : (
          <span className="text-xs opacity-70">{students.length} rows</span>
        )}
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="border-b border-[color:var(--border)] px-3 py-2 font-medium opacity-70">
                ID
              </th>
              <th className="border-b border-[color:var(--border)] px-3 py-2 font-medium opacity-70">
                Name
              </th>
              <th className="border-b border-[color:var(--border)] px-3 py-2 font-medium opacity-70">
                Marks
              </th>
              <th className="border-b border-[color:var(--border)] px-3 py-2 font-medium opacity-70">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr
                  key={String(s.ID)}
                  className="hover:bg-[color:var(--muted)]"
                >
                  <td className="border-b border-[color:var(--border)] px-3 py-2">
                    {s.ID}
                  </td>
                  <td className="border-b border-[color:var(--border)] px-3 py-2">
                    {s.NAME}
                  </td>
                  <td className="border-b border-[color:var(--border)] px-3 py-2">
                    {s.MARKS}
                  </td>
                  <td className="border-b border-[color:var(--border)] px-3 py-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(s)}
                        className="rounded-lg border border-[color:var(--border)] bg-[color:var(--muted)] px-3 py-1.5 text-xs hover:opacity-90"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(s.ID)}
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-600 hover:bg-red-500/15 dark:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-3 py-8 text-center opacity-70" colSpan={4}>
                  {loading ? "Loading…" : "No data found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

