"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight, Clock } from "lucide-react";
import { SERVICES } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white border-t border-neutral-100" id="servicos">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeader
            eyebrow="O que oferecemos"
            title="Serviços"
            titleItalic="Premium"
            description="Do corte clássico ao grooming completo. Cada serviço executado com precisão e os melhores produtos."
          />
          <Link href="/servicos" className="btn-ghost shrink-0">
            Ver todos <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Editorial list */}
        <div ref={ref} className="border-t border-neutral-900">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/servicos/${service.slug}`}
                className="group flex items-center gap-4 md:gap-8 py-6 px-4 md:px-6 border-b border-neutral-200 hover:border-neutral-900 hover:bg-neutral-900 transition-all duration-300 relative"
              >
                {/* Number */}
                <span className="font-serif text-sm text-neutral-300 group-hover:text-neutral-600 transition-colors duration-300 tabular-nums w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Name */}
                <h3 className="font-serif text-xl md:text-2xl text-neutral-900 group-hover:text-white flex-1 transition-colors duration-300 leading-tight">
                  {service.name}
                </h3>

                {/* Short desc — hidden on mobile */}
                <p className="hidden lg:block text-sm text-neutral-400 group-hover:text-neutral-500 transition-colors duration-300 max-w-[280px] leading-snug">
                  {service.shortDesc}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 md:gap-6 shrink-0">
                  {service.featured && (
                    <span className="hidden sm:inline text-[8px] font-bold tracking-widest uppercase bg-neutral-900 text-white group-hover:bg-white group-hover:text-neutral-900 px-2 py-0.5 transition-colors duration-300">
                      Popular
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 group-hover:text-neutral-500 transition-colors duration-300 whitespace-nowrap">
                    <Clock size={11} />
                    {service.duration}
                  </div>
                  <span className="text-sm font-bold text-neutral-900 group-hover:text-white transition-colors duration-300 w-14 text-right tabular-nums">
                    {service.price}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-neutral-300 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
