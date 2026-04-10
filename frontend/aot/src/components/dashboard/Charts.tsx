"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"];

export function TopCharactersChart({ data }: any) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="name" stroke="#333" />
      <YAxis stroke="#333" />
      <Tooltip />
      <Bar dataKey="appearances" fill="#ef4444" />
    </BarChart>
  );
}

export function GenderChart({ data }: any) {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="total"
        nameKey="gender"
        outerRadius={100}
      >
        {data.map((_: any, index: number) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

export function EpisodesChart({ data }: any) {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="episode_code" stroke="#333" />
      <YAxis stroke="#333" />
      <Tooltip />
      <Bar dataKey="total_characters" fill="#3b82f6" />
    </BarChart>
  );
}