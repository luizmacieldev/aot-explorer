import StatsCard from "@/components/dashboard/StatsCard";
import {
  TopCharactersChart,
  GenderChart,
  EpisodesChart
} from "@/components/dashboard/Charts";

import {
  getTopCharacters,
  getGenderDistribution,
  getStatusDistribution,
  getTopEpisodes
} from "@/services/api";

export default async function Dashboard() {
  const topCharacters = await getTopCharacters();
  const gender = await getGenderDistribution();
  const status = await getStatusDistribution();
  const episodes = await getTopEpisodes();

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      
      {/* TITLE */}
      <h1 className="text-3xl font-bold">Attack on Titan Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard
          title="Top Character"
          value={topCharacters[0]?.name || "-"}
        />
        <StatsCard
          title="Most Common Gender"
          value={gender[0]?.gender || "-"}
        />
        <StatsCard
          title="Top Episode"
          value={episodes[0]?.name || "-"}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-2">Top Characters</h2>
          <TopCharactersChart data={topCharacters} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-2">Gender Distribution</h2>
          <GenderChart data={gender} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow col-span-2">
          <h2 className="font-semibold mb-2">Top Episodes</h2>
          <EpisodesChart data={episodes} />
        </div>
      </div>
    </div>
  );
}