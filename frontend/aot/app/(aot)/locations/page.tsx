  "use client";

  import { useEffect, useState, useRef, useCallback } from "react";
  import { api } from "@/services/api";
  import Card from "@/components/Card";
  import { Location } from '@/types/aot';


  export default function LocationsPage() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [nextPage, setNextPage] = useState<string | null>("locations/");
    const [loading, setLoading] = useState(false);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchLocations = useCallback(async () => {
      if (!nextPage || loading) return;

      setLoading(true);

      try {
        const res = await api.get(nextPage);

        setLocations((prev) => {
    const merged = [...prev, ...res.data.results];

    const unique = Array.from(
      new Map(merged.map((loc) => [loc.id, loc])).values()
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
      fetchLocations();
    }, []);


    useEffect(() => {
      if (!observerRef.current) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchLocations();
        }
      });

      observer.observe(observerRef.current);

      return () => observer.disconnect();
    }, [fetchLocations]);

    return (
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-red-400 mb-6">
          Locations
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {locations.map((loc) => (
            <Card key={loc.id} item={loc} href="/locations" type="location" />
          ))}
        </div>



        <div ref={observerRef} className="h-10 mt-10" />
      {loading && (
        <p className="text-center mt-4 text-gray-400 text-center">
              <img
                src="/loading.gif"
                alt="Loading"
                className="w-16 h-16 text-center mx-auto mb-4"
             />
          Loading locations...
        </p>
      )}
      </div>
    );
  }