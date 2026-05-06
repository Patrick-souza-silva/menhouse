"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { BRAND, UNITS } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Unidades",
    href: "/unidades",
    children: UNITS.map((u) => ({
      label: u.name,
      href: `/unidades/${u.slug}`,
      desc: u.address,
    })),
  },
  { label: "Barbeiros", href: "/barbeiros" },
  { label: "Serviços", href: "/servicos" },
  { label: "Planos", href: "/planos" },
  { label: "Produtos", href: "/produtos" },
  { label: "Sobre", href: "/sobre" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-neutral-200 py-3"
            : "bg-white py-5 border-b border-neutral-100"
        }`}
      >
        <div className="container-premium flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-sans text-xl font-black text-neutral-900 tracking-tight group-hover:text-neutral-600 transition-colors duration-200">
              MENHOUSE
            </span>
            <span className="text-[8px] text-neutral-400 tracking-ultra uppercase font-medium">
              Barbearia Premium
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-[10px] text-neutral-500 tracking-widest uppercase font-bold hover:text-neutral-900 transition-colors duration-200"
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={10}
                      className={`transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-3 w-60 bg-white border border-neutral-200 shadow-lg"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex flex-col px-5 py-3.5 hover:bg-neutral-50 transition-colors duration-150 group border-b border-neutral-100 last:border-0"
                        >
                          <span className="text-[10px] text-neutral-900 tracking-widest uppercase font-bold group-hover:text-neutral-500 transition-colors duration-150">
                            {child.label}
                          </span>
                          {"desc" in child && (
                            <span className="text-[10px] text-neutral-400 mt-0.5">{child.desc}</span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={getWhatsAppUrl(BRAND.whatsappRaw, "Olá! Gostaria de agendar um horário.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-[9px] px-5 py-2.5"
            >
              Agendar
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-neutral-900 p-1"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 pb-10 px-8 overflow-y-auto"
          >
            <nav className="flex flex-col gap-0">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-5 text-2xl text-neutral-900 font-serif border-b border-neutral-100 hover:text-neutral-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4 py-1 mb-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-neutral-400 hover:text-neutral-900 transition-colors duration-200 tracking-wider uppercase"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto pt-8">
              <a
                href={getWhatsAppUrl(BRAND.whatsappRaw, "Olá! Gostaria de agendar um horário.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-center"
                onClick={() => setMobileOpen(false)}
              >
                Agendar pelo WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
