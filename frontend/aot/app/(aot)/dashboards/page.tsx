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
  Pie,
  PieChart,
} from "recharts";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [topCharacters, setTopCharacters] = useState<any[]>([]);
  const [status, setStatus] = useState<any[]>([]);
  const [gender, setGender] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [c, s, e, g] = await Promise.all([
          api.get("stats/top-characters/"),
          api.get("stats/status-distribution/"),
          api.get("stats/top-episodes/"),
          api.get("stats/gender-distribution/"),
        ]);

        setTopCharacters(c.data);
        setStatus(s.data);
        setEpisodes(e.data);
        setGender(g.data);
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
      <div className="p-8 text-gray-400 opacity-70 text-center">
              <img
                src="/loading.gif"
                alt="Loading"
                className="w-16 h-16 text-center mx-auto mb-4"
             />
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 md:px-8 py-10 space-y-10">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Attack on Titan Analytics
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Characters and episodes insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="col-span-full">
          <h2 className="section-title">Top Characters by appearances</h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCharacters}>
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  hide={isMobile}
                  interval={0}
                  tick={{ fontSize: 12 }}
                  minTickGap={20}
                />
                <YAxis stroke="#9ca3af" />

                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;
                    const data = payload[0].payload;

                    return (
                      <div className="bg-slate-800 p-2 rounded text-sm">
                        <p className="font-bold">{data.name}</p>
                        <p>Appearances: {data.appearances}</p>
                      </div>
                    );
                  }}
                />

                <Bar
                  dataKey="appearances"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="section-title">Character Status</h2>

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
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

        <GlassCard>
          <h2 className="section-title">Gender Distribution</h2>

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gender}
                  dataKey="total"
                  nameKey="gender"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {gender.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        ["#8b5cf6", "#ec4899", "#22c55e", "#f59e0b"][
                          index % 4
                        ]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="col-span-full">
          <h2 className="section-title">Episodes with More Characters</h2>

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={episodes}>
                <XAxis
                  dataKey="episode_code"
                  stroke="#9ca3af"
                  hide={isMobile}
                  interval={0}
                  tick={{ fontSize: 12 }}
                  minTickGap={20}
                />
                <YAxis stroke="#9ca3af" />

                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;
                    const data = payload[0].payload;

                    return (
                      <div className="bg-slate-800 p-2 rounded text-sm">
                        <p className="font-bold">
                          {data.episode_code} - {data.name}
                        </p>
                        <p>{data.total_characters} characters</p>
                      </div>
                    );
                  }}
                />

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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

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

function calculateSurvivalRate(status: any[]) {
  const alive =
    status.find((s) => s.status_clean === "Alive")?.total || 0;

  const total = status.reduce((acc, s) => acc + s.total, 0);

  if (!total) return "-";

  return `${Math.round((alive / total) * 100)}%`;
}