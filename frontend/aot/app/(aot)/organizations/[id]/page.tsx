"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/services/api";
import {  Organization  } from "@/types/aot";


export default function Page() {
  const { id } = useParams();
  const [org, setOrg] = useState<Organization | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get(`organizations/${id}/`).then((res) => {
      setOrg(res.data);
    });
  }, [id]);

  if (!org) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="text-white">

      {/* HERO */}
      <div className="relative h-[300px]">
        <Image
          src={org.img || "/no-image.png"}
          alt={org.name}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl font-bold text-red-400">
            {org.name}
          </h1>
        </div>
      </div>

      {/* BACK */}
      <div className="max-w-6xl mx-auto px-6 mt-4">
        <Link href="/organizations" className="text-gray-400 hover:text-red-400">
          ← Back
        </Link>
      </div>

      {/* CONTENT */}
      <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* INFO */}
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-3">Info</h2>

          <p><strong>Affiliation:</strong> {org.affiliation}</p>

          {org.debut && (
            <p>
              <strong>Debut:</strong>{" "}
              <Link
                href={`/episodes/${org.debut.id}`}
                className="text-red-400 hover:underline"
              >
                {org.debut.name}
              </Link>
            </p>
          )}
        </div>

        {/* OCCUPATIONS */}
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-3">Occupations</h2>

          {org.occupations?.length > 0 ? (
            <ul className="list-disc ml-4">
              {org.occupations.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No data</p>
          )}
        </div>

        {/* NOTABLE MEMBERS */}
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-3">
            Notable Members
          </h2>

          <div className="flex flex-wrap gap-4">
            {org.notable_members?.map((char) => (
              <Link
                key={char.id}
                href={`/characters/${char.id}`}
                className="text-center hover:scale-105 transition"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto">
                  <Image
                    src={char.img || "/no-image.png"}
                    alt={char.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm mt-1">{char.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}