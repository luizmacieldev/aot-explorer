import Link from "next/link";
import Image from "next/image";

interface Props {
  item: {
    id: number;
    name: string;
    img: string;
  };
  href: string;
  type: "character" | "location" | "titan" | "episode" | "organization";
}

export default function Card({ item, href, type }: Props) {
  
const getFallbackImage = () => {
  if (type === "location") return "/no-image.png";
  if (type === "character") return "/unknow.png";
  if (type === "episode") return "/unknow.png";
  

  return "/unknow.png";
};

const imageSrc = item.img && item.img !== "unknown" && item.img.trim() !== ""? item.img: getFallbackImage();


  return (
    <Link href={`${href}/${item.id}`}>
      <div className="bg-slate-900 border border-red-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-red-900/40 transition duration-500">
        
        <div className="relative w-full h-[300px]">
          <Image
            src={imageSrc}
            alt={item.name}
            fill
            className="object-cover"
            loading="lazy"

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