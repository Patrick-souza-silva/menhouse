"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Minus } from "lucide-react";
import { FAQ as faqData } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white border-t border-neutral-100" id="faq">
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Header */}
          <div>
            <SectionHeader
              eyebrow="Dúvidas Frequentes"
              title="Perguntas"
              titleItalic="Frequentes"
              description="Tudo que você precisa saber sobre a MenHouse em Francisco Beltrão."
            />

            {/* SEO block */}
            <div className="mt-10 p-6 bg-neutral-50 border border-neutral-100">
              <p className="text-xs text-neutral-500 leading-relaxed">
                A <strong className="text-neutral-900">MenHouse Barbearia</strong> é a referência em corte masculino, barba e grooming em{" "}
                <strong className="text-neutral-900">Francisco Beltrão, Paraná</strong>. Com duas unidades — <strong className="text-neutral-900">Centro</strong> e{" "}
                <strong className="text-neutral-900">Zona Sul</strong> — oferecemos o mais alto padrão em barbearia do Sudoeste do PR.
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div ref={ref} className="flex flex-col">
            {faqData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="border-b border-neutral-100"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex items-center justify-between w-full py-5 text-left group"
                >
                  <span
                    className={`text-sm font-bold pr-4 transition-colors duration-200 ${
                      openIndex === i ? "text-neutral-900" : "text-neutral-600 group-hover:text-neutral-900"
                    }`}
                  >
                    {item.question}
                  </span>
                  <div className="shrink-0 text-neutral-400">
                    {openIndex === i ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-sm text-neutral-500 leading-relaxed pb-5">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
    </section>
  );
}
