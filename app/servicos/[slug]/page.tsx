import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Check, ArrowRight } from "lucide-react";
import { SERVICES, BRAND } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} em Francisco Beltrão — MenHouse Barbearia`,
    description: `${service.name}: ${service.description.substring(0, 120)} ${service.price}. Agende na MenHouse em Francisco Beltrão.`,
    alternates: { canonical: `https://menhouse.com.br/servicos/${service.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Breadcrumb */}
      <div className="container-premium pt-8 pb-4">
        <div className="flex items-center gap-2 text-[10px] text-neutral-400 tracking-widest uppercase font-bold">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight size={11} />
          <Link href="/servicos" className="hover:text-neutral-900 transition-colors">Serviços</Link>
          <ChevronRight size={11} />
          <span className="truncate max-w-[200px]">{service.name}</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-[45vh] min-h-[350px] overflow-hidden bg-neutral-100">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-neutral-900/40" />
        {service.featured && (
          <div className="absolute top-5 left-8">
            <span className="text-[9px] font-bold tracking-widest uppercase bg-white text-neutral-900 px-3 py-1.5">
              Mais Popular
            </span>
          </div>
        )}
      </div>

      <section className="section-padding pt-10">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-bold">
                  <Clock size={10} />
                  {service.duration}
                </div>
                <span className="font-serif text-2xl text-neutral-900">{service.price}</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 leading-snug mb-8">
                {service.name}
              </h1>

              <p className="text-base text-neutral-500 leading-relaxed mb-12">{service.description}</p>

              {/* Includes */}
              <div className="mb-12">
                <p className="eyebrow mb-5">O que está incluído</p>
                <div className="flex flex-col gap-2">
                  {service.includes.map((inc) => (
                    <div key={inc} className="flex items-center gap-3 border border-neutral-100 p-4">
                      <Check size={13} className="text-neutral-900 shrink-0" />
                      <span className="text-sm text-neutral-600">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other services */}
              <div>
                <p className="eyebrow mb-5">Outros Serviços</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-100">
                  {others.map((s) => (
                    <Link
                      key={s.id}
                      href={`/servicos/${s.slug}`}
                      className="bg-white p-5 group hover:bg-neutral-50 transition-colors duration-200"
                    >
                      <p className="text-sm font-bold text-neutral-900 group-hover:text-neutral-500 transition-colors duration-200">
                        {s.name}
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">{s.price}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="border border-neutral-100 p-6 sticky top-28">
                <h3 className="font-serif text-xl text-neutral-900 mb-2">{service.name}</h3>
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Clock size={11} />
                    {service.duration}
                  </div>
                  <span className="font-serif text-lg text-neutral-900">{service.price}</span>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed mb-6">{service.shortDesc}</p>
                <a
                  href={getWhatsAppUrl(BRAND.whatsappRaw, `Olá! Quero agendar: ${service.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-[9px] py-3 mb-3"
                >
                  Agendar Agora
                  <ArrowRight size={12} />
                </a>
                <Link href="/unidades" className="btn-outline w-full justify-center text-[9px] py-3">
                  Ver Unidades
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
