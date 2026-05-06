"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";
import { BARBERS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Barbers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="section-padding bg-white border-t border-neutral-100" id="barbeiros">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeader
            eyebrow="A nossa equipe"
            title="Profissionais de"
            titleItalic="Excelência"
            description="Seis especialistas apaixonados pela arte da barbearia."
          />
          <Link href="/barbeiros" className="btn-ghost shrink-0">
            Ver todos <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="section-rule mb-10" />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-neutral-100">
          {BARBERS.filter((b) => !b.staffOnly).map((barber, i) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white"
            >
              <Link href={`/barbeiros/${barber.slug}`} className="group block">
                {/* Photo */}
                <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4]">
                  <Image
                    src={barber.image}
                    alt={barber.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 17vw"
                  />

                  {/* Sequential number top-left */}
                  <div className="absolute top-3 left-3">
                    <span className="font-serif text-xs text-white/60 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/60 transition-all duration-400 flex flex-col items-start justify-end p-4">
                    <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center gap-2 border-b border-white/30 pb-1.5 mb-1.5">
                        <span className="text-[9px] text-white tracking-widest uppercase font-bold">Ver Perfil</span>
                        <ArrowUpRight size={10} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {barber.hasCourse && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[8px] font-bold tracking-wider uppercase bg-white text-neutral-900 px-1.5 py-0.5">
                        Curso
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 border-b border-neutral-100 group-hover:bg-neutral-900 transition-colors duration-300">
                  <p className="text-xs font-bold text-neutral-900 group-hover:text-white transition-colors duration-300 leading-snug">
                    {barber.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 group-hover:text-neutral-500 tracking-wider uppercase mt-0.5 leading-snug transition-colors duration-300">
                    {barber.experience}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
