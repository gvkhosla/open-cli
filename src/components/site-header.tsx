"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-white/8 bg-[#121212]/85 backdrop-blur-xl transition-colors duration-300",
          scrolled ? "bg-[#121212]/94" : "bg-[#121212]/85"
        )}
      >
        <div className="mx-auto flex h-13 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Homepage" onClick={() => setMobileOpen(false)} className="group inline-flex items-center gap-2.5 text-sm text-white transition hover:text-white">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-[#1E1E1D] transition group-hover:border-[#217EFF]/60">
              <svg width="16" height="16" viewBox="0 0 28 28" fill="none" className="text-white/86">
                <path d="M7 6.5L13 14L7 21.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 20H21" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-[15px] font-medium tracking-[-0.012em] text-white">Open CLI</span>
          </Link>

          <nav className="hidden items-center gap-4 sm:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors duration-200",
                    isActive ? "text-white" : "text-[#868684] hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-9 w-9 items-center justify-center rounded text-[#868684] transition hover:bg-white/[0.06] hover:text-white sm:hidden"
          >
            <div className="flex w-4 flex-col items-center gap-[5px]">
              <span
                className={cn(
                  "block h-[1.5px] w-full bg-current transition-all duration-200",
                  mobileOpen && "translate-y-[3.25px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-full bg-current transition-all duration-200",
                  mobileOpen && "-translate-y-[3.25px] -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="mobile-menu-enter absolute right-0 top-0 flex h-full w-72 flex-col border-l border-white/10 bg-[#151d26]/98 pt-20 backdrop-blur-xl">
            <div className="flex flex-col gap-1 px-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base transition-colors",
                      isActive
                        ? "border border-white/10 bg-white/[0.04] text-white"
                        : "text-white/52 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-auto border-t border-white/8 px-6 py-6">
              <p className="text-xs text-white/28">
                Press <kbd className="kbd">/</kbd> to search
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
