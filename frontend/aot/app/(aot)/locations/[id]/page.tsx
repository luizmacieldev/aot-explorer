"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/services/api";
import { Location } from "@/types/aot";

export default function Page() {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get(`locations/${id}/`).then((res) => {
      setLocation(res.data);
    });
  }, [id]);

  if (!location) return <p className="text-white p-6">Loading...</p>;

  const hasNotable = location.notable_inhabitants?.length > 0;
  const hasFormer = location.notable_former_inhabitants?.length > 0;

  return (
    <div className="text-white">
      {/* HERO */}
      <div className="relative h-[300px]">
        <Image
          src={location.img ==="unknown" || location.img ==="" ? "/no-image.png" : location.img}
          alt={location.name}
          fill
          priority
          loading="eager"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl font-bold text-red-400">
            {location.name}
          </h1>
          
      {/* BACK */}
      <div className="max-w-6xl mx-auto px-6 mt-4">
        <Link href="/locations" className="text-gray-400 hover:text-red-400">
          ← Back
        </Link>
      </div>
      
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* INFO */}
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-3">Info</h2>

          <p><strong>Territory:</strong> {location.territory}</p>
          <p><strong>Region:</strong> {location.region}</p>

          {location.debut && (
            <p>
              <strong>Debut:</strong>{" "}
              <Link
                href={`/episodes/${location.debut.id}`}
                className="text-red-400 hover:underline"
              >
                {location.debut.name}
              </Link>
            </p>
          )}
        </div>

        {/* NOTABLE INHABITANTS */}
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-3">
            Notable Inhabitants
          </h2>

          {hasNotable ? (
            <div className="flex flex-wrap gap-4">
              {location.notable_inhabitants!.map((char) => (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}`}
                  className="text-center hover:scale-105 transition"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto">
                    <Image
                      src={char.img}
                      alt={char.name}
                      fill
                      priority
                      loading="eager"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm mt-1">{char.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No data</p>
          )}
        </div>

        {/* FORMER INHABITANTS */}
        <div className="bg-slate-900 p-4 rounded-xl border border-red-900">
          <h2 className="text-red-400 font-bold mb-3">
            Former Inhabitants
          </h2>

          {hasFormer ? (
            <div className="flex flex-wrap gap-4">
              {location.notable_former_inhabitants!.map((char) => (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}`}
                  className="text-center hover:scale-105 transition"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto">
                    <Image
                      src={char.img}
                      alt={char.name}
                      fill
                      priority
                      loading="eager"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm mt-1">{char.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No data</p>
          )}
        </div>

      </div>
    </div>
  );
}