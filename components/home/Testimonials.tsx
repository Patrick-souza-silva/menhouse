"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-neutral-900 relative overflow-hidden">
      {/* Giant decorative quote — uses CSS content to avoid special characters in JS */}
      <div
        className="absolute top-0 right-12 select-none pointer-events-none leading-none font-serif text-white"
        style={{ fontSize: "clamp(12rem, 25vw, 28rem)", opacity: 0.025 }}
        aria-hidden="true"
      >
        66
      </div>

      <div className="container-premium relative z-10">
        <SectionHeader
          eyebrow="Avaliacoes"
          title="O que dizem"
          titleItalic="nossos clientes"
          align="center"
          className="mb-14"
          dark
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-neutral-900 p-8 relative group hover:bg-neutral-800 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(t.rating)].map((_, si) => (
                  <Star key={si} size={12} className="text-white fill-white" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-neutral-300 text-base leading-relaxed mb-8 font-light italic">
                {t.text}
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-800 group-hover:border-neutral-700 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-neutral-800 group-hover:bg-neutral-700 border border-neutral-700 flex items-center justify-center transition-colors duration-300">
                    <span className="text-[10px] text-white font-bold">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-white font-bold">{t.name}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-neutral-400 tracking-widest uppercase font-bold">{t.barber}</p>
                  <p className="text-[10px] text-neutral-600 mt-0.5">
                    {t.unit === "centro" ? "Centro" : "Zona Sul"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-px bg-neutral-800 grid grid-cols-3 divide-x divide-neutral-700"
        >
          {[
            { value: "5.0", label: "Google Rating" },
            { value: "127+", label: "Avaliacoes" },
            { value: "500+", label: "Clientes/mes" },
          ].map((s, i) => (
            <div key={i} className="py-8 text-center">
              <p className="font-serif text-3xl text-white font-bold">{s.value}</p>
              <p className="text-[10px] text-neutral-500 tracking-widest uppercase mt-1.5 font-bold">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
