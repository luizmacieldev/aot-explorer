    "use client";

    import { useEffect, useState, useRef, useCallback } from "react";
    import { api } from "@/services/api";
    import Card from "@/components/Card";
    import { Organization } from "@/types/aot";

    export default function OrganizationsPage() {
      const [orgs, setOrgs] = useState<Organization[]>([]);
      const [nextPage, setNextPage] = useState<string | null>("organizations/");
      const [loading, setLoading] = useState(false);

      const observerRef = useRef<HTMLDivElement | null>(null);

      const fetchOrgs = useCallback(async () => {
        if (!nextPage || loading) return;

        setLoading(true);

        try {
          const res = await api.get(nextPage);

          setOrgs((prev) => {
    const merged = [...prev, ...res.data.results];

    const unique = Array.from(
      new Map(merged.map((org) => [org.id, org])).values()
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
        fetchOrgs();
      }, []);

      useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            fetchOrgs();
          }
        });

        observer.observe(observerRef.current);

        return () => observer.disconnect();
      }, [fetchOrgs]);

      return (
        <div className="p-8 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-red-400 mb-6">
            Organizations
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
            {orgs.map((org) => (
              <Card key={org.id} item={org} href="/organizations" type="organization" />
            ))}
          </div>


          <div ref={observerRef} className="h-10 mt-10" />
        </div>
      );
    }