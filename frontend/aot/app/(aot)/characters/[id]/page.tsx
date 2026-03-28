"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { Character } from "@/types/aot";
import Link from "next/link";


export default function Page() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get(`characters/${id}/`).then((res) => {
      setCharacter(res.data);
    });
  }, [id]);

  if (!character) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="text-white">
      
  
      <div className="relative h-[400px]">
        <img
          src={character.img}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold text-red-400">
            {character.name} 

          </h1>
        <Link href="/characters" className="text-gray-400 hover:text-red-400">
            ← Back
        </Link>
        </div>
        
      </div>
      

      <div className="p-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-2">Info</h2>

       <p className="mt-2">
        <span
            className={`px-2 py-1 rounded text-sm ${
            character.status === "Alive"
                ? "bg-green-800"
                : "bg-red-800"
            }`}
        >
            {character.status}
        </span>
        </p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Height:</strong> {character.height}</p>
          
        </div>
        
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-2">Occupation</h2>

          <ul className="list-disc ml-4">
              <li>{character.occupation}</li>
          </ul>
          </div>
          
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
        <h2 className="text-red-400 font-bold mb-3">Alias</h2>

        <div className="flex flex-wrap gap-2">
          {Array(character.alias).map((a, i) => (
            <span key={i} className="bg-red-800 px-2 py-1 rounded text-sm">
              {a}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
      <h2 className="text-red-400 font-bold mb-3">Species</h2>

      <div className="flex flex-wrap gap-2">
        {Array(character.species).map((s, i) => (
          <span key={i} className="bg-gray-700 px-2 py-1 rounded text-sm">
            {s}
          </span>
        ))}
      </div>
    </div>

    <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
    <h2 className="text-red-400 font-bold mb-3">Roles</h2>

    <ul className="list-disc ml-4">
      {Array(character.roles).map((r, i) => (
        <li key={i}>{r}</li>
      ))}
    </ul>
  </div>

  <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
  <h2 className="text-red-400 font-bold mb-3">Groups</h2>

  {character.groups?.map((group, i) => (
    <div key={i} className="mb-3">
      <p className="font-semibold">{group.name}</p>

      <ul className="ml-4 text-sm text-gray-300">
        {group.sub_groups?.map((sub, j) => (
          <li key={j}>• {sub}</li>
        ))}
      </ul>
    </div>
  ))}
</div>
<div className="bg-slate-900 p-4 rounded-xl border border-red-900">
  <h2 className="text-red-400 font-bold mb-3">Episodes</h2>

  <div className="grid md:grid-cols-2 gap-3">
    {character.episodes?.map((ep) => (
      <div
        key={ep.id}
        className="bg-slate-800 p-3 rounded-lg border border-gray-700"
      >
        <p className="text-sm text-red-400">{ep.episode}</p>
        <p className="text-sm">{ep.name}</p>
      </div>
    ))}
  </div>
</div>


      </div>
    </div>
  );
}