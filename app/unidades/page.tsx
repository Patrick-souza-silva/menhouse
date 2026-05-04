import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, ArrowRight, ChevronRight } from "lucide-react";
import { UNITS } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Unidades em Francisco Beltrão — MenHouse Barbearia",
  description:
    "A MenHouse possui duas unidades em Francisco Beltrão - PR: Centro e Zona Sul. Encontre a unidade mais perto de você.",
  alternates: { canonical: "https://menhouse.com.br/unidades" },
};

export default function UnidadesPage() {
  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <section className="section-padding border-b border-neutral-100">
        <div className="container-premium">
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 tracking-widest uppercase font-bold mb-10">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span>Unidades</span>
          </div>

          <p className="eyebrow mb-4">Onde nos encontrar</p>
          <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-4">
            Nossas <em className="not-italic">Unidades</em>
          </h1>
          <p className="text-neutral-500 text-lg max-w-xl leading-relaxed">
            Duas barbearias premium em Francisco Beltrão. Mesmo padrão de excelência, onde quer que esteja.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-neutral-100">
            {UNITS.map((unit) => (
              <div key={unit.id} className="bg-white group">
                <div className="relative h-72 overflow-hidden bg-neutral-100">
                  <Image
                    src={unit.image}
                    alt={unit.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-5 left-5">
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-white text-neutral-900 px-3 py-1.5">
                      {unit.shortName}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">{unit.name}</h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-8">{unit.description}</p>

                  <div className="flex flex-col gap-3 mb-8 pb-8 border-b border-neutral-100">
                    <div className="flex items-start gap-3">
                      <MapPin size={13} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">
                        {unit.address}<br /><span className="text-neutral-400">{unit.city} · CEP {unit.cep}</span>
                      </span>
                    </div>
                    {unit.hours.map((h) => (
                      <div key={h.day} className="flex items-center gap-3">
                        <Clock size={13} className="text-neutral-400 shrink-0" />
                        <span className="text-sm text-neutral-600">
                          <span className="font-bold">{h.day}:</span>{" "}
                          <span className={h.time === "Fechado" ? "text-neutral-400" : ""}>{h.time}</span>
                        </span>
                      </div>
                    ))}
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

                  <div className="flex flex-wrap gap-2 mb-8">
                    {unit.features.map((f) => (
                      <span key={f} className="text-[10px] text-neutral-500 tracking-widest border border-neutral-200 px-3 py-1.5 uppercase font-bold">
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Map */}
                  <div className="overflow-hidden border border-neutral-100 mb-6 h-44">
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

                  <div className="flex gap-3">
                    <a
                      href={getWhatsAppUrl(unit.whatsappRaw, `Olá! Quero agendar na unidade ${unit.shortName}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 justify-center text-[9px] py-3"
                    >
                      Agendar Horário
                    </a>
                    <a
                      href={unit.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex-1 justify-center text-[9px] py-3"
                    >
                      <MapPin size={11} />
                      Traçar Rota
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
