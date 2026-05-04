"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

export default function Manifesto() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="bg-neutral-900 py-24 md:py-32 overflow-hidden relative border-t border-neutral-800">
      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
        <span
          className="font-serif leading-none whitespace-nowrap text-outline-dark"
          style={{ fontSize: "clamp(6rem, 18vw, 18rem)" }}
        >
          ARTE
        </span>
      </div>

      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="text-[10px] text-neutral-600 tracking-ultra uppercase font-bold mb-10"
            >
              — Nossa filosofia
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif leading-[1.05] tracking-tight text-white"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
            >
              Não é só um corte.
              <br />
              <em className="not-italic text-neutral-500">
                É como você se apresenta ao mundo.
              </em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0, originX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-16 h-px bg-neutral-700 mt-12 mb-12"
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl"
            >
              {[
                { n: "01", label: "Precisão", desc: "Cada detalhe pensado." },
                { n: "02", label: "Estilo",   desc: "Tendências e técnica." },
                { n: "03", label: "Confiança", desc: "Você, no seu melhor." },
              ].map((item) => (
                <div key={item.n} className="flex flex-col">
                  <span className="font-serif text-xs text-neutral-700 mb-2">{item.n}</span>
                  <span className="text-sm font-bold text-white tracking-wider uppercase mb-1">{item.label}</span>
                  <span className="text-xs text-neutral-500 leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — sub logo (in-store logo photo) */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative aspect-[3/4]"
          >
            <Image
              src="/images/lojas/loja01-3.jpg"
              alt="Logo MenHouse"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-neutral-900/10" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[8px] text-white/50 tracking-ultra uppercase font-bold">
                MenHouse Barbearia
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
