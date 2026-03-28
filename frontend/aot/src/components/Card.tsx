import Link from "next/link";
interface Props {
  item: {
    id: number;
    name: string;
    img: string;
  };
  href: string;
}

export default function Card({ item, href }: Props) {
  return (
    <Link href={`${href}/${item.id}`}>
      <div className="bg-slate-900 border border-red-900  rounded-2xl  overflow-hidden  shadow-lg hover:scale-105 hover:shadow-red-900/40 transition duration-300">
        <div className="relative">
          <img
          src={item.img || "/unknow.png"}
          className="w-full aspect-[16/9] object-cover"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>

        <div className="p-3">
          <h2 className="text-red-400 font-bold text-lg">
            {item.name}
          </h2>
        </div>
      </div>
    </Link>
  );
}