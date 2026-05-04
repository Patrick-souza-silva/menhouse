import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, ChevronRight, ArrowRight } from "lucide-react";
import { UNITS, BARBERS } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return UNITS.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const unit = UNITS.find((u) => u.slug === slug);
  if (!unit) return {};
  return {
    title: `${unit.name} — Barbearia em Francisco Beltrão, PR`,
    description: `${unit.name}: ${unit.description} ${unit.address}, ${unit.city}.`,
    alternates: { canonical: `https://menhouse.com.br/unidades/${unit.slug}` },
  };
}

export default async function UnitPage({ params }: Props) {
  const { slug } = await params;
  const unit = UNITS.find((u) => u.slug === slug);
  if (!unit) notFound();

  const unitBarbers = BARBERS.filter((b) => b.unit === unit.id);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Breadcrumb */}
      <div className="container-premium pt-8 pb-4">
        <div className="flex items-center gap-2 text-[10px] text-neutral-400 tracking-widest uppercase font-bold">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight size={11} />
          <Link href="/unidades" className="hover:text-neutral-900 transition-colors">Unidades</Link>
          <ChevronRight size={11} />
          <span>{unit.shortName}</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-[45vh] min-h-[350px] overflow-hidden bg-neutral-100">
        <Image
          src={unit.image}
          alt={unit.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-neutral-900/30" />
        <div className="absolute top-5 left-8">
          <span className="text-[9px] font-bold tracking-widest uppercase bg-white text-neutral-900 px-3 py-1.5">
            {unit.shortName}
          </span>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding pt-10">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-snug mb-3">
                {unit.name}
              </h1>
              <p className="text-sm text-neutral-400 mb-8">{unit.address}, {unit.city}</p>
              <p className="text-base text-neutral-500 leading-relaxed mb-12">{unit.description}</p>

              {/* Map */}
              <div className="overflow-hidden border border-neutral-100 h-64 mb-12">
                <iframe
                  src={unit.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={`Mapa ${unit.name}`}
                />
              </div>

              {/* Barbers of this unit */}
              {unitBarbers.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl text-neutral-900 mb-6">
                    Equipe — <em className="not-italic text-neutral-500">{unit.shortName}</em>
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-neutral-100">
                    {unitBarbers.map((b) => (
                      <Link
                        key={b.id}
                        href={`/barbeiros/${b.slug}`}
                        className="bg-white p-5 group hover:bg-neutral-50 transition-colors duration-200"
                      >
                        <p className="text-sm font-bold text-neutral-900 group-hover:text-neutral-500 transition-colors duration-200">
                          {b.name}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-widest font-bold">{b.role}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {/* Hours */}
              <div className="border border-neutral-100 p-6">
                <p className="eyebrow mb-5">Horários de Funcionamento</p>
                {unit.hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between py-2.5 border-b border-neutral-100 last:border-0">
                    <span className="text-xs text-neutral-600 font-bold">{h.day}</span>
                    <span className={`text-xs font-bold ${h.time === "Fechado" ? "text-neutral-300" : "text-neutral-900"}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="border border-neutral-100 p-6">
                <p className="eyebrow mb-5">Contato</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={13} className="text-neutral-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600">{unit.address}<br /><span className="text-neutral-400">{unit.city}</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={13} className="text-neutral-400 shrink-0" />
                    <a
                      href={getWhatsAppUrl(unit.whatsappRaw)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {unit.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href={getWhatsAppUrl(unit.whatsappRaw, `Olá! Quero agendar na ${unit.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center text-[9px] py-3"
              >
                Agendar Horário
                <ArrowRight size={12} />
              </a>
              <a
                href={unit.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline justify-center text-[9px] py-3"
              >
                <MapPin size={11} />
                Traçar Rota
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
