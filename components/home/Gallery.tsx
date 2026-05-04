"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";

const galleryImages = [
  { src: "/images/lojas/loja01-2.jpg", alt: "Ambiente MenHouse Centro", span: "col-span-1 row-span-2" },
  { src: "/images/lojas/loja01-3.jpg", alt: "Espaço MenHouse Centro", span: "col-span-1 row-span-1" },
  { src: "/images/lojas/loja02-2.jpg", alt: "MenHouse Zona Sul", span: "col-span-1 row-span-1" },
  { src: "/images/lojas/loja01-4.jpg", alt: "Detalhes MenHouse", span: "col-span-1 row-span-1" },
  { src: "/images/lojas/loja02-3.jpg", alt: "Ambiente Zona Sul", span: "col-span-1 row-span-1" },
  { src: "/images/lojas/loja02-4.jpg", alt: "Espaço Premium", span: "col-span-1 row-span-1" },
];

export default function Gallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="section-padding bg-white border-t border-neutral-100">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeader
            eyebrow="Nosso trabalho"
            title="Galeria de"
            titleItalic="Cortes"
          />
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost shrink-0"
          >
            {BRAND.instagram}
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Editorial grid — first image taller, spanning 2 rows */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 gap-px bg-neutral-200"
          style={{ gridAutoRows: "240px" }}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className={`relative bg-neutral-100 group overflow-hidden ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Dark overlay + label on hover */}
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/50 transition-all duration-400 flex items-end p-5">
                <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] text-white tracking-ultra uppercase font-bold border-b border-white/40 pb-0.5">
                    {img.alt}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
