"use client";
import { useEffect, useMemo, useState } from "react";
import { apiJson } from "./_lib/api";
import type { Student, StudentFormState } from "./_types/student";
import { TopBar } from "./_components/TopBar";
import { StatCard } from "./_components/StatCard";
import { StudentForm } from "./_components/StudentForm";
import { StudentsTable } from "./_components/StudentsTable";
import { StudentsChart } from "./_components/StudentsChart";

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<StudentFormState>({
    id: "",
    name: "",
    marks: "",
  });
  const [editId, setEditId] = useState<Student["ID"] | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("ID");
  const [order, setOrder] = useState("ASC");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const limit = 5;

  /* =========================
     FETCH DATA
  ========================= */
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const qs = new URLSearchParams({
        search,
        page: String(page),
        limit: String(limit),
        sortBy,
        order,
      });
      const data = await apiJson<unknown>(`/students?${qs.toString()}`);

      if (Array.isArray(data)) {
        setStudents(data as Student[]);
      } else {
        setStudents([]);
      }
    } catch (err) {
      console.error(err);
      setStudents([]);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search, page, sortBy, order]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  /* =========================
     STATS
  ========================= */
  const stats = useMemo(() => {
    const total = students.length;
    const marks = students.map((s) => Number(s.MARKS)).filter((n) => !isNaN(n));
    const avg = marks.length
      ? (marks.reduce((sum, n) => sum + n, 0) / marks.length).toFixed(1)
      : "0";
    const max = marks.length ? Math.max(...marks) : 0;
    const min = marks.length ? Math.min(...marks) : 0;
    return { total, avg, max, min };
  }, [students]);

  /* =========================
     FORM
  ========================= */
  const resetForm = () => {
    setForm({ id: "", name: "", marks: "" });
    setEditId(null);
  };

  const submitForm = async () => {
    setLoading(true);
    setError(null);

    const url = editId
      ? `/students/${editId}`
      : "/students";

    const method = editId ? "PUT" : "POST";

    try {
      await apiJson(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      await fetchStudents();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id: Student["ID"]) => {
    if (!confirm("Delete this student?")) return;
    setLoading(true);
    setError(null);

    try {
      await apiJson(`/students/${id}`, { method: "DELETE" });
      await fetchStudents();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (s: Student) => {
    setForm({ id: String(s.ID), name: String(s.NAME), marks: String(s.MARKS) });
    setEditId(s.ID);
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <TopBar />

      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Average" value={stats.avg} hint="marks" />
          <StatCard label="Max" value={stats.max} />
          <StatCard label="Min" value={stats.min} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="min-w-0 space-y-4 lg:col-span-2">
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 shadow-sm">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="grid min-w-0 gap-2 sm:grid-cols-2 xl:grid-cols-3 sm:items-center">
                  <label className="grid gap-1">
                    <span className="text-xs opacity-70">Search</span>
                    <input
                      className="h-10 w-full min-w-0 rounded-xl border border-[color:var(--border)] bg-transparent px-3 outline-none focus:ring-2 focus:ring-indigo-500/30"
                      placeholder="Search by name / id"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>

                  <label className="grid gap-1">
                    <span className="text-xs opacity-70">Sort by</span>
                    <select
                      className="h-10 w-full min-w-0 rounded-xl border border-[color:var(--border)] bg-transparent px-3 outline-none focus:ring-2 focus:ring-indigo-500/30"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="ID">ID</option>
                      <option value="NAME">Name</option>
                      <option value="MARKS">Marks</option>
                    </select>
                  </label>

                  <label className="grid gap-1">
                    <span className="text-xs opacity-70">Order</span>
                    <select
                      className="h-10 w-full min-w-0 rounded-xl border border-[color:var(--border)] bg-transparent px-3 outline-none focus:ring-2 focus:ring-indigo-500/30"
                      value={order}
                      onChange={(e) => setOrder(e.target.value)}
                    >
                      <option value="ASC">Ascending</option>
                      <option value="DESC">Descending</option>
                    </select>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fetchStudents()}
                    disabled={loading}
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--muted)] px-4 text-sm disabled:opacity-50"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {error ? (
                <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              ) : null}
            </div>

            <StudentsTable
              students={students}
              loading={loading}
              onEdit={handleEdit}
              onDelete={deleteStudent}
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm opacity-70">Page {page}</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-black px-4 text-sm text-white disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-black px-4 text-sm text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <StudentForm
              form={form}
              loading={loading}
              isEditing={editId !== null}
              onChange={setForm}
              onSubmit={submitForm}
              onCancelEdit={resetForm}
            />
            <StudentsChart students={students} />
          </div>
        </div>
      </main>
    </div>
  );
}