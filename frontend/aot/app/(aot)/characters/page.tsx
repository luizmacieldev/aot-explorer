"use client";

import { useEffect, useState, useRef } from "react";
import { api } from "@/services/api";
import Card from "@/components/Card";
import { CharacterBrief } from "@/types/aot";


export default function CharactersPage() {
  const [characters, setCharacters] = useState<CharacterBrief[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("characters/");
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // 🔥 fetch data
  const fetchCharacters = async () => {
    if (!nextPage || loading) return;

    setLoading(true);

    const res = await api.get(nextPage);

    setCharacters((prev) => [...prev, ...res.data.results]);
    setNextPage(res.data.info.next_page);

    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  // observer (scroll)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchCharacters();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [observerRef.current, nextPage]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-red-400 mb-6">
        Characters
      </h1>
      
      <div className="
        grid grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6
        auto-rows-fr
      ">
        {characters.map((char) => (
          <Card key={char.id} item={char} href="/characters" type="character" />
        ))}
      </div>

      {/*  trigger do scroll */}
      <div ref={observerRef} className="h-10 mt-10" />

      {loading && (
        <p className="text-center mt-4 text-gray-400">
          Loading...
        </p>
      )}
    </div>
  );
}