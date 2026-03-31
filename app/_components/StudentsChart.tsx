"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Student } from "../_types/student";

type Props = {
  students: Student[];
};

export function StudentsChart({ students }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const chartData = useMemo(() => {
    return students
      .slice()
      .sort((a, b) => Number(b.MARKS) - Number(a.MARKS))
      .slice(0, 10)
      .map((s) => ({
        name: String(s.NAME),
        marks: Number(s.MARKS),
      }));
  }, [students]);

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium opacity-80">Top 10 by marks</h2>
        <p className="text-xs opacity-60">Showing current page results</p>
      </div>

      <div className="mt-3 h-64 w-full min-w-0">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={240}>
            <BarChart data={chartData} margin={{ left: 8, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="marks" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--muted)] text-xs opacity-70">
            Loading chart…
          </div>
        )}
      </div>
    </div>
  );
}

