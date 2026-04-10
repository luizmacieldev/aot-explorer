"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [topCharacters, setTopCharacters] = useState<any[]>([]);
  const [status, setStatus] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [c, s, e] = await Promise.all([
          api.get("stats/top-characters/"),
          api.get("stats/status-distribution/"),
          api.get("stats/top-episodes/"),
        ]);

        setTopCharacters(c.data);
        setStatus(s.data);
        setEpisodes(e.data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-gray-400 animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-8 py-10 space-y-10">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Attack on Titan Analytics
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Character and episode insights
        </p>
      </div>

      {/* HERO STATS */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Top Characters by appearances"
          value={topCharacters[0]?.name}
          sub={`${topCharacters[0]?.appearances} appearances`}
        />

        <StatCard
          title="Survival Rate"
          value={calculateSurvivalRate(status)}
          sub="Characters alive"
        />

        <StatCard
          title="Top Episode with more characters"
          value={episodes[0]?.episode_code}
          sub={episodes[0]?.name}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2 gap-6">

        {/* TOP CHARACTERS */}
        <GlassCard className="col-span-2">
          <h2 className="section-title">Top Characters by appearances</h2>

          <div className="h-[320px]">
            <ResponsiveContainer>
              <BarChart data={topCharacters}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar
                  dataKey="appearances"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* STATUS */}
        <GlassCard>
          <h2 className="section-title">Character Status</h2>

          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={status}>
                <XAxis dataKey="status_clean" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                  {status.map((entry: any, index: number) => (
                    <Cell
                      key={index}
                      fill={
                        entry.status_clean === "Alive"
                          ? "#10b981"
                          : entry.status_clean === "Deceased"
                          ? "#ef4444"
                          : "#6b7280"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* EPISODES */}
        <GlassCard>
          <h2 className="section-title">Episodes with More Characters</h2>

          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={episodes}>
                <XAxis dataKey="episode_code" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar
                  dataKey="total_characters"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, sub }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow"
    >
      <p className="text-xs text-gray-400 uppercase">{title}</p>
      <p className="text-lg font-semibold mt-1">{value || "-"}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </motion.div>
  );
}

function GlassCard({ children, className = "" }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        bg-white/5 backdrop-blur-lg border border-white/10 
        rounded-2xl p-6 shadow 
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- HELPERS ---------------- */

function calculateSurvivalRate(status: any[]) {
  const alive =
    status.find((s) => s.status_clean === "Alive")?.total || 0;

  const total = status.reduce((acc, s) => acc + s.total, 0);

  if (!total) return "-";

  return `${Math.round((alive / total) * 100)}%`;
}