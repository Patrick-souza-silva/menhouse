import Link from "next/link";
import { Instagram, Phone, MapPin, Clock, Mail } from "lucide-react";
import { BRAND, UNITS } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

const footerLinks = {
  Navegação: [
    { label: "Home", href: "/" },
    { label: "Unidades", href: "/unidades" },
    { label: "Barbeiros", href: "/barbeiros" },
    { label: "Serviços", href: "/servicos" },
    { label: "Produtos", href: "/produtos" },
    { label: "Sobre Nós", href: "/sobre" },
  ],
  Serviços: [
    { label: "Corte Premium", href: "/servicos/corte-masculino-francisco-beltrao" },
    { label: "Barba Completa", href: "/servicos/barba-francisco-beltrao" },
    { label: "Combo VIP", href: "/servicos/combo-corte-barba-francisco-beltrao" },
    { label: "Tratamento Capilar", href: "/servicos/tratamento-capilar-masculino" },
    { label: "Sobrancelha", href: "/servicos/design-sobrancelha-masculina" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="container-premium py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col leading-none mb-6">
              <span className="font-sans text-2xl font-black text-white tracking-tight">
                MENHOUSE
              </span>
              <span className="text-[8px] text-neutral-500 tracking-ultra uppercase mt-1 font-medium">
                Barbearia Premium
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 max-w-xs">
              A barbearia premium de Francisco Beltrão. Excelência em corte, barba e grooming desde 2018.
            </p>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
            >
              <Instagram size={14} />
              <span>{BRAND.instagram}</span>
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[9px] text-neutral-500 tracking-ultra uppercase mb-5 font-bold">
                {title}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Unidades */}
          <div>
            <h3 className="text-[9px] text-neutral-500 tracking-ultra uppercase mb-5 font-bold">
              Nossas Unidades
            </h3>
            <div className="flex flex-col gap-6">
              {UNITS.map((unit) => (
                <div key={unit.id}>
                  <p className="text-xs text-white font-bold tracking-wider uppercase mb-2">
                    {unit.shortName}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-start gap-2">
                      <MapPin size={11} className="text-neutral-500 mt-0.5 shrink-0" />
                      <span className="text-xs text-neutral-400 leading-snug">{unit.address}<br />{unit.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={11} className="text-neutral-500 shrink-0" />
                      <a
                        href={getWhatsAppUrl(unit.whatsappRaw)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-neutral-400 hover:text-white transition-colors duration-200"
                      >
                        {unit.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={11} className="text-neutral-500 shrink-0" />
                      <span className="text-xs text-neutral-400">Seg–Sex: 09–20h · Sáb: 08–18h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-premium py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-neutral-600 tracking-wider">
            © {new Date().getFullYear()} MenHouse Barbearia — Francisco Beltrão, PR
          </p>
          <a
            href={`mailto:${BRAND.email}`}
            className="flex items-center gap-1.5 text-[10px] text-neutral-600 hover:text-white transition-colors duration-200"
          >
            <Mail size={10} />
            {BRAND.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
