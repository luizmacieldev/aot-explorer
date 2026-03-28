"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Titans", href: "/titans" },
  { name: "Characters", href: "/characters" },
  { name: "Episodes", href: "/episodes" },
  { name: "Locations", href: "/locations" },
  { name: "Organizations", href: "/organizations" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-red-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* 🔥 LOGO */}
        <h1 className="text-red-500 font-bold text-xl tracking-wide">
          AOT Explorer
        </h1>

        {/* 🔥 LINKS */}
        <div className="flex gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative text-sm font-medium transition
                  ${isActive ? "text-red-400" : "text-gray-300"}
                  hover:text-red-400
                `}
              >
                {link.name}

                {/* underline animado */}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] w-full 
                    bg-red-500 transition-all duration-300
                    ${isActive ? "opacity-100" : "opacity-0"}
                  `}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}