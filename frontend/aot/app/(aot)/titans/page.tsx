"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import Card from "@/components/Card";
import { Titan } from "@/types/aot";

export default function TitansPage() {
  const [titans, setTitans] = useState<Titan[]>([]);

  useEffect(() => {
    api.get("titans/").then((res) => {
      setTitans(res.data.results);
    });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {titans.map((titan) => (
      <Card key={titan.id} item={titan} href="/titans" />
    ))}
    </div>
  );
}