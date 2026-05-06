"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { BRAND } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

export default function FinalCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-neutral-900 relative overflow-hidden">
      {/* Ghost background text */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
        <span
          className="font-serif leading-none whitespace-nowrap text-outline-dark translate-y-4"
          style={{ fontSize: "clamp(6rem, 16vw, 16rem)" }}
        >
          AGENDE
        </span>
      </div>

      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="text-[10px] text-neutral-600 tracking-ultra uppercase font-bold mb-6"
            >
              Pronto para o corte perfeito?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl text-white leading-tight"
            >
              Agende seu horário
              <br />
              <em className="not-italic text-neutral-500">em Francisco Beltrão.</em>
            </motion.h2>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <p className="text-neutral-400 leading-relaxed text-base">
              Duas unidades disponíveis, agendamento rápido pelo WhatsApp. Sem fila de espera.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <a
                href={getWhatsAppUrl(BRAND.whatsappRaw, "Olá! Quero agendar um horário na MenHouse.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 text-xs font-bold tracking-widest uppercase hover:bg-neutral-100 transition-colors duration-200"
              >
                Agendar Agora
                <ArrowRight size={13} />
              </a>
              <Link
                href="/unidades"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-neutral-700 text-neutral-300 text-xs font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all duration-200"
              >
                <MapPin size={13} />
                Ver Unidades
              </Link>
            </div>

            {/* Trust tags */}
            <div className="flex flex-wrap gap-y-3 mt-4 pt-6 border-t border-neutral-800">
              {["Sem fila de espera", "Confirmação imediata", "2 unidades"].map((item) => (
                <div key={item} className="flex items-center gap-2 pr-6">
                  <span className="w-1 h-1 rounded-full bg-neutral-600 shrink-0" />
                  <span className="text-xs text-neutral-500">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
