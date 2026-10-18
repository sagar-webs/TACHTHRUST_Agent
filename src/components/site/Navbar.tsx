import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useCartCount } from "@/lib/shop/cart";
import logoUrl from "@/assets/techthrust-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/ai-products", label: "AI Products" },
  { to: "/presentation", label: "Presentation" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const count = useCartCount();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3 bg-background/70 backdrop-blur-xl border-b border-glass-border" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logoUrl} alt="Tech Thrust" className="h-18 md:h-20 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full"
                activeProps={{ className: "px-4 py-2 text-sm text-foreground rounded-full bg-white/5" }}
                activeOptions={{ exact: true }}
              >
                {l.label}{l.to === "/shop" && count > 0 && <span className="ml-1.5 rounded-full bg-cyan px-1.5 py-0.5 text-[10px] font-bold text-black">{count}</span>}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://velynora.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#ff7a18] to-[#ff4d00] echo-wave"
            >
              VELYNORA
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full btn-glow btn-glow-hover animate-pulse-glow px-5 py-2 text-sm"
            >
              Get a Free Consultation
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-white/5"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl lg:hidden animate-fade-in">
          <div className="flex items-center justify-between p-6">
            <img src={logoUrl} alt="Tech Thrust" className="h-18 w-auto" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-md hover:bg-white/5">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-6 pt-16">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="font-display text-3xl font-semibold">
                {l.label}{l.to === "/shop" && count > 0 && <span className="ml-1.5 rounded-full bg-cyan px-1.5 py-0.5 text-[10px] font-bold text-black">{count}</span>}
              </Link>
            ))}
            <a href="https://velynora.tech/" target="_blank" rel="noopener noreferrer" className="mt-4 rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#ff7a18] to-[#ff4d00]">
              VELYNORA
            </a>
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-full btn-glow btn-glow-hover px-6 py-3 text-sm">
              Get a Free Consultation
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
