type Props = {
  title: string;
  value: string | number;
};

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}