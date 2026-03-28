"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/services/api";

interface Titan {
  id: number;
  name: string;
  img: string;
  height: string;
  abilities: string[];
  allegiance: string;
}

export default function Page() {
  const { id } = useParams();
  const [titan, setTitan] = useState<Titan | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get(`titans/${id}/`).then((res) => {
      setTitan(res.data);
    });
  }, [id]);

  if (!titan) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="text-white">
      {/* 🔥 HERO */}
      <div className="relative h-[400px] w-full">
        <img
          src={titan.img}
          className="w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold text-red-400">
            {titan.name}
          </h1>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="p-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
            <h2 className="text-red-400 font-bold mb-2">Info</h2>
            <p><strong>Height:</strong> {titan.height}</p>
            <p><strong>Allegiance:</strong> {titan.allegiance}</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
            <h2 className="text-red-400 font-bold mb-2">Abilities</h2>
            <ul className="list-disc ml-4">
              {titan.abilities?.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}