"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/services/api";
import { Episode } from "@/types/aot";

export default function Page() {
  const { id } = useParams();
  const [episode, setEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get(`episodes/${id}/`).then((res) => {
      setEpisode(res.data);
    });
  }, [id]);

  if (!episode)
    return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="text-white">

      {/* HERO */}
      <div className="relative h-[300px]">
        <Image
          src={episode.img}
          alt={episode.name}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute bottom-6 left-6">
          <p className="text-red-400">{episode.episode}</p>
          <h1 className="text-3xl font-bold">
            {episode.name}
          </h1>
        </div>
      </div>

      {/* CHARACTERS */}
      <h3 className="text-center text-red-400 text-3xl font-bold p-10">
        Characters on Episode
      </h3>

      <div
        className="
          grid grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          gap-6
        "
      >
        {episode.characters?.map((char) => (
          <Link
            key={char.id}
            href={`/characters/${char.id}`}
            className="text-center group"
          >
            <div className="flex flex-col items-center">

              <div className="relative w-60 h-60 rounded-full overflow-hidden border-3 border-red-900 group-hover:scale-110 group-hover:border-red-500 transition-transform duration-700 ease-out">
                <Image
                  src={char.img}
                  alt={char.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-md mt-4 text-white-300 group-hover:text-white">
                {char.name}
              </p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}