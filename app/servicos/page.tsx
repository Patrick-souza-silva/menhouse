import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, ArrowUpRight } from "lucide-react";
import { SERVICES, BRAND } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Serviços — Corte, Barba e Grooming em Francisco Beltrão | MenHouse",
  description:
    "Corte masculino, barba completa, combo VIP, tratamento capilar e mais. Serviços premium em Francisco Beltrão, PR.",
  alternates: { canonical: "https://menhouse.com.br/servicos" },
};

export default function ServicosPage() {
  const featured = SERVICES.find((s) => s.featured);
  const rest = SERVICES.filter((s) => !s.featured);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <section className="section-padding border-b border-neutral-100">
        <div className="container-premium">
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 tracking-widest uppercase font-bold mb-10">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span>Serviços</span>
          </div>
          <p className="eyebrow mb-4">O que oferecemos</p>
          <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-4">
            Serviços <em className="not-italic">Premium</em>
          </h1>
          <p className="text-neutral-500 text-lg max-w-xl leading-relaxed">
            Do corte mais simples ao grooming completo — cada serviço com precisão, produtos de alto padrão e dedicação.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          {/* Featured */}
          {featured && (
            <div className="mb-px group border-b border-neutral-100">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-80 overflow-hidden bg-neutral-100">
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[8px] font-bold tracking-widest uppercase bg-neutral-900 text-white px-2.5 py-1">
                      Mais Popular
                    </span>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center border-l border-neutral-100">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-neutral-500 transition-colors">
                    {featured.name}
                  </h2>
                  <p className="text-neutral-500 leading-relaxed mb-7">{featured.description}</p>
                  <div className="flex items-center gap-6 mb-7">
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                      <Clock size={13} />
                      {featured.duration}
                    </div>
                    <span className="text-xl font-bold text-neutral-900">{featured.price}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {featured.includes.map((inc) => (
                      <span key={inc} className="text-[10px] text-neutral-500 border border-neutral-200 px-2.5 py-1 font-bold">
                        {inc}
                      </span>
                    ))}
                  </div>
                  <a
                    href={getWhatsAppUrl(BRAND.whatsappRaw, `Olá! Quero agendar: ${featured.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary self-start"
                  >
                    Agendar Agora
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100">
            {rest.map((service) => (
              <Link
                key={service.id}
                href={`/servicos/${service.slug}`}
                className="group bg-white"
              >
                <div className="relative h-48 overflow-hidden bg-neutral-100">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-neutral-900 mb-1 group-hover:text-neutral-500 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-5">{service.shortDesc}</p>
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Clock size={11} />
                      {service.duration}
                    </div>
                    <span className="text-sm font-bold text-neutral-900">{service.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
