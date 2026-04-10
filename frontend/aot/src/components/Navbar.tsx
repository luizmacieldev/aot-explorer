"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { name: "Titans", href: "/titans" },
  { name: "Characters", href: "/characters" },
  { name: "Episodes", href: "/episodes" },
  { name: "Locations", href: "/locations" },
  { name: "Organizations", href: "/organizations" },
  { name: "Dashboards", href: "/dashboards" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black border-b border-red-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <h1 className="text-red-500 font-bold text-xl tracking-wide">
            AOT Explorer
          </h1>

          {/* DESKTOP */}
          <div className="hidden md:flex gap-6">
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

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl text-red-400"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU (NO ANIMATION) */}
      {open && (
        <>
          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setOpen(false)}
          />

          {/* SIDEBAR */}
          <div className="fixed top-0 right-0 h-full w-80 bg-[#020617] z-50 flex flex-col">
            
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-red-900">
              <h2 className="text-red-500 font-semibold text-lg">
                Menu
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-red-400 text-xl"
              >
                ✕
              </button>
            </div>

            {/* LINKS */}
            <div className="flex flex-col mt-6 px-6 gap-6">
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`
                      text-lg font-medium transition
                      ${isActive ? "text-red-400" : "text-gray-300"}
                      hover:text-red-400
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}