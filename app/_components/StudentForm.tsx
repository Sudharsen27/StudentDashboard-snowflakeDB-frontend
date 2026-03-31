"use client";

import type { StudentFormState } from "../_types/student";

type Props = {
  form: StudentFormState;
  loading: boolean;
  isEditing: boolean;
  onChange: (next: StudentFormState) => void;
  onSubmit: () => void;
  onCancelEdit: () => void;
};

export function StudentForm({
  form,
  loading,
  isEditing,
  onChange,
  onSubmit,
  onCancelEdit,
}: Props) {
  const canSubmit =
    form.id.trim().length > 0 &&
    form.name.trim().length > 0 &&
    form.marks.trim().length > 0 &&
    !Number.isNaN(Number(form.marks));

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium opacity-80">
          {isEditing ? "Edit student" : "Add student"}
        </h2>
        {isEditing ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs opacity-70 hover:opacity-100"
          >
            Cancel
          </button>
        ) : null}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="grid gap-1">
          <span className="text-xs opacity-70">ID</span>
          <input
            className="h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 outline-none focus:ring-2 focus:ring-indigo-500/30"
            value={form.id}
            onChange={(e) => onChange({ ...form, id: e.target.value })}
            placeholder="e.g. 101"
            inputMode="numeric"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs opacity-70">Name</span>
          <input
            className="h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 outline-none focus:ring-2 focus:ring-indigo-500/30"
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            placeholder="e.g. Sundar"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs opacity-70">Marks</span>
          <input
            className="h-10 rounded-xl border border-[color:var(--border)] bg-transparent px-3 outline-none focus:ring-2 focus:ring-indigo-500/30"
            value={form.marks}
            onChange={(e) => onChange({ ...form, marks: e.target.value })}
            placeholder="e.g. 95"
            inputMode="decimal"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={loading || !canSubmit}
          onClick={onSubmit}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white disabled:opacity-50"
        >
          {isEditing ? "Update" : "Add"}
        </button>

        {!canSubmit ? (
          <p className="text-xs opacity-60">
            Please enter ID, name and numeric marks.
          </p>
        ) : null}
      </div>
    </div>
  );
}

