"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/pretext", label: "Pretext" },
  { href: "/makers", label: "Makers" },
  { href: "/submit", label: "Submit" },
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
      <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full border bg-[rgba(10,14,20,0.82)] px-4 backdrop-blur-xl transition-[border-color,box-shadow,background] duration-300 sm:px-5",
            scrolled
              ? "border-white/12 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
              : "border-white/8 shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
          )}
        >
          <Link href="/" onClick={() => setMobileOpen(false)} className="group inline-flex items-center gap-3 text-sm text-white transition hover:text-white">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[13px] font-semibold text-white">
              O
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-[14px] font-medium tracking-[-0.02em] text-white">Open CLI</span>
              <span className="text-[11px] text-white/52">Search by job or tool</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1 sm:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors duration-200",
                    isActive ? "bg-white text-black" : "text-white/62 hover:bg-white/[0.06] hover:text-white"
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
            className="relative z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08] hover:text-white sm:hidden"
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
          <nav className="mobile-menu-enter absolute right-0 top-0 flex h-full w-72 flex-col border-l border-white/10 bg-[#0d141c]/98 pt-20 backdrop-blur-xl">
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
