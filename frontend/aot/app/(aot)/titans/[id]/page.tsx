"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/services/api";
import { Titan } from "@/types/aot";

export default function Page() {
  const { id } = useParams();
  const [titan, setTitan] = useState<Titan | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get(`titans/${id}/`).then((res) => {
      setTitan(res.data);
    });
  }, [id]);

  if (!titan)
    return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="text-white">

      {/* 🔥 HERO */}
      <div className="relative h-[400px] w-full">
        <img
          src={titan.img || "/no-image.png"}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold text-red-400">
            {titan.name}
          </h1>
        </div>
      </div>

      {/* 🔙 BACK */}
      <div className="max-w-6xl mx-auto px-6 mt-4">
        <Link
          href="/titans"
          className="text-gray-400 hover:text-red-400"
        >
          ← Back
        </Link>
      </div>

      {/* 🔥 CONTENT */}
      <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* INFO */}
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-3">Info</h2>

          <p><strong>Height:</strong> {titan.height}</p>
          <p><strong>Allegiance:</strong> {titan.allegiance}</p>
        </div>

        {/* ABILITIES */}
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-3">Abilities</h2>

          <ul className="list-disc ml-4">
            {titan.abilities?.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        {/* CURRENT INHERITOR */}
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-3">
            Current Inheritor
          </h2>

          {titan.current_inheritor ? (
            <Link
              href={`/characters/${titan.current_inheritor.id}`}
              className="flex items-center gap-4 hover:scale-105 transition"
            >
              <img
                src={titan.current_inheritor.img || "/no-image.png"}
                className="w-16 h-16 rounded-full object-cover border border-red-800"
              />

              <p className="font-semibold">
                {titan.current_inheritor.name}
              </p>
            </Link>
          ) : (
            <p className="text-gray-400">Unknown</p>
          )}
        </div>

        {/* FORMER INHERITORS */}
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-3">
            Former Inheritors
          </h2>

          <div className="flex flex-wrap gap-4">
            {titan.former_inheritors?.map((char) => (
              <Link
                key={char.id}
                href={`/characters/${char.id}`}
                className="text-center hover:scale-105 transition"
              >
                <img
                  src={char.img || "/no-image.png"}
                  className="w-16 h-16 rounded-full object-cover border border-gray-700"
                />

                <p className="text-sm mt-1">
                  {char.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}