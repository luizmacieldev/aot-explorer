"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import Card from "@/components/Card";
import { Titan } from "@/types/aot";

export default function TitansPage() {
  const [titans, setTitans] = useState<Titan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("titans/")
      .then((res) => {
        setTitans(res.data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto text-center text-gray-400 opacity-70 text-center">
              <img
                src="/loading.gif"
                alt="Loading"
                className="w-16 h-16 text-center mx-auto mb-4"
             />
        Loading titans...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
    {titans.map((titan) => (
      <Card key={titan.id} item={titan} href="/titans" type="titan" />
    ))}
    </div>
  );
}