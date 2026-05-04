"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Clock, ArrowUpRight, Phone } from "lucide-react";
import { UNITS } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Units() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-neutral-50 border-t border-neutral-100" id="unidades">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeader
            eyebrow="Onde nos encontrar"
            title="Nossas"
            titleItalic="Unidades"
            description="Duas unidades em Francisco Beltrão para estar sempre perto de você."
          />
          <Link href="/unidades" className="btn-ghost shrink-0">
            Ver unidades <ArrowUpRight size={13} />
          </Link>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-neutral-200">
          {UNITS.map((unit, i) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-neutral-100">
                <Image
                  src={unit.image}
                  alt={unit.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-neutral-900/20" />
                <div className="absolute top-5 left-5">
                  <span className="text-[9px] font-bold tracking-widest uppercase bg-white text-neutral-900 px-3 py-1.5">
                    {unit.shortName}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{unit.name}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-7">{unit.description}</p>

                <div className="flex flex-col gap-3 mb-7 pb-7 border-b border-neutral-100">
                  <div className="flex items-start gap-3">
                    <MapPin size={13} className="text-neutral-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600">
                      {unit.address}<br /><span className="text-neutral-400">{unit.city}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={13} className="text-neutral-400 shrink-0" />
                    <span className="text-sm text-neutral-600">Seg–Sex: 09–20h · Sáb: 08–18h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={13} className="text-neutral-400 shrink-0" />
                    <span className="text-sm text-neutral-600">{unit.phone}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={getWhatsAppUrl(unit.whatsappRaw, `Olá! Quero agendar na unidade ${unit.shortName}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 justify-center text-[9px] py-3"
                  >
                    Agendar
                  </a>
                  <a
                    href={unit.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex-1 justify-center text-[9px] py-3"
                  >
                    <MapPin size={11} />
                    Rota
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
