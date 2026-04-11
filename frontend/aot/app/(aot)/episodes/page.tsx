  "use client";

  import { useEffect, useState, useRef, useCallback } from "react";
  import { api } from "@/services/api";
  import Card from "@/components/Card";
  import { Episode } from "@/types/aot";


  export default function EpisodesPage() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [nextPage, setNextPage] = useState<string | null>("episodes/");
    const [loading, setLoading] = useState(false);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchEpisodes = useCallback(async () => {
      if (!nextPage || loading) return;

      setLoading(true);

      try {
        const res = await api.get(nextPage);

        setEpisodes((prev) => {
      const merged = [...prev, ...res.data.results];

    const unique = Array.from(
      new Map(merged.map((ep) => [ep.id, ep])).values()
    );

    return unique;
  });
        setNextPage(res.data.info.next_page);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, [nextPage, loading]);

    useEffect(() => {
      fetchEpisodes();
    }, []);

    useEffect(() => {
      if (!observerRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchEpisodes();
        }
      });

      observer.observe(observerRef.current);

      return () => observer.disconnect();
    }, [fetchEpisodes]);

    if (loading && episodes.length === 0) {
      return (
        <div className="p-8 max-w-7xl mx-auto text-center text-gray-400 animate-pulse">
          Loading episodes...
        </div>
      );
    }

    return (
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-red-400 mb-6">
          Episodes
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {episodes.map((ep) => (
            <Card key={ep.id} item={ep} href="/episodes" type="episode" />
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-4 gap-6 mt-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={`loading-${i}`}
                className="bg-slate-800/50 animate-pulse aspect-[16/9] rounded-xl"
              />
            ))}
          </div>
        )}

        <div ref={observerRef} className="h-10 mt-10" />
      </div>
    );
  }