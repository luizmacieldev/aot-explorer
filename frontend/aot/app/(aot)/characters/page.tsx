"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { api } from "@/services/api";
import Card from "@/components/Card";
import { CharacterBrief } from "@/types/aot";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<CharacterBrief[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("characters/");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerInstance = useRef<IntersectionObserver | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);
  const requestIdRef = useRef(0);

  const fetchCharacters = useCallback(
    async (isSearch = false) => {
      const requestId = ++requestIdRef.current;

      if (!isSearch && !nextPage) return;

      if (!isSearch) setLoading(true);

      try {
        const url = isSearch
          ? `characters/?search=${search}`
          : nextPage;

        if (!url) return;

        const res = await api.get(url);

        // ignore outdated responses
        if (requestId !== requestIdRef.current) return;

        const data = res.data.results || res.data;

        if (isSearch) {
          setCharacters(data);
          setNextPage(null);
        } else {
          setCharacters((prev) => {
            const merged = [...prev, ...data];

            return Array.from(
              new Map(merged.map((char) => [char.id, char])).values()
            );
          });

          setNextPage(res.data.info?.next_page);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (requestId === requestIdRef.current && !isSearch) {
          setLoading(false);
        }
      }
    },
    [nextPage, search]
  );

  // Initial load
  useEffect(() => {
    fetchCharacters();
  }, []);

  // Controlled infinite scroll observer
  useEffect(() => {
    if (!observerRef.current) return;

    // Disconnect previous observer
    if (observerInstance.current) {
      observerInstance.current.disconnect();
    }

    // Disable observer during search
    if (search) return;

    observerInstance.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchCharacters();
      }
    });

    observerInstance.current.observe(observerRef.current);

    return () => {
      observerInstance.current?.disconnect();
    };
  }, [fetchCharacters, search]);

  // Search logic
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    observerInstance.current?.disconnect();

    if (search) {
      fetchCharacters(true);
    } else {
      setNextPage("characters/");
      fetchCharacters();
    }
  }, [search]);

  // Keep input focused
  useEffect(() => {
    inputRef.current?.focus();
  }, [characters]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-red-400 mb-6">
        Characters
      </h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search characters..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {characters.map((char) => (
          <Card key={char.id} item={char} href="/characters" type="character" />
        ))}
      </div>

      <div ref={observerRef} className="h-10 mt-10" />

      {loading && (
        <div className="text-center mt-4 text-gray-400">
          <img
            src="/loading.gif"
            alt="Loading"
            className="w-16 h-16 mx-auto mb-2"
          />
          Loading Characters...
        </div>
      )}

      {!loading && characters.length === 0 && (
        <p className="text-gray-400 text-center mt-6">
          No characters found
        </p>
      )}
    </div>
  );
}