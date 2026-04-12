"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { api } from "@/services/api";
import Card from "@/components/Card";
import { Episode } from "@/types/aot";

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [originalEpisodes, setOriginalEpisodes] = useState<Episode[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("episodes/");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const observerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  const fetchEpisodes = useCallback(
    async (isSearch = false) => {
      if (!isSearch && loading) return;
      if (!isSearch && !nextPage) return;

      setLoading(true);

      try {
        const url = isSearch
          ? `episodes/?search=${search}`
          : nextPage;

        if (!url) {
          setLoading(false);
          return;
        }

        const res = await api.get(url);
        const data = res.data.results || res.data;

        if (isSearch) {
          setEpisodes(data);
          setNextPage(null);
        } else {
          const updateList = (prev: Episode[]) => {
            const merged = [...prev, ...data];

            return Array.from(
              new Map(merged.map((ep) => [ep.id, ep])).values()
            );
          };

          setEpisodes(updateList);
          setOriginalEpisodes(updateList);

          setNextPage(res.data.info?.next_page);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [nextPage, loading, search]
  );

  // Initial load
  useEffect(() => {
    fetchEpisodes();
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (!observerRef.current) return;
    if (search) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchEpisodes();
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchEpisodes, search]);

  // Search handling
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (search) {
      fetchEpisodes(true);
    } else {
      // restore original list without refetch
      setEpisodes(originalEpisodes);
      setNextPage("episodes/");
    }
  }, [search]);

  // Keep input focused
  useEffect(() => {
    inputRef.current?.focus();
  }, [episodes]);

  if (loading && episodes.length === 0) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center text-gray-400 opacity-70">
        Loading episodes...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-red-400 mb-6">
        Episodes
      </h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search episodes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {episodes.map((ep) => (
          <Card key={ep.id} item={ep} href="/episodes" type="episode" />
        ))}
      </div>

      {!loading && episodes.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          No episodes found
        </p>
      )}

      {loading && (
        <div className="grid grid-cols-4 gap-6 mt-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={`loading-${i}`}
              className="bg-slate-800/50 opacity-70 aspect-[16/9] rounded-xl"
            />
          ))}
        </div>
      )}

      <div ref={observerRef} className="h-10 mt-10" />
    </div>
  );
}