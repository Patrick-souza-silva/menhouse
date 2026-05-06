"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";

const WHATSAPP = "554699852846";

export default function Products() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white border-t border-neutral-100" id="produtos">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeader
            eyebrow="Loja MenHouse"
            title="Produtos"
            titleItalic="Exclusivos"
            description="Linha desenvolvida pelos barbeiros MenHouse para manter o estilo em casa."
          />
          <Link href="/produtos" className="btn-ghost shrink-0">
            Ver catálogo <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="section-rule mb-10" />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-neutral-100">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className={`bg-white group ${product.featured ? "md:col-span-2" : ""}`}
            >
              {/* Image */}
              <div className={`relative bg-neutral-50 overflow-hidden ${product.featured ? "h-64" : "h-48"}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                {product.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="text-[8px] font-bold tracking-widest uppercase bg-neutral-900 text-white px-2 py-0.5">
                      Destaque
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 border-t border-neutral-100">
                <span className="text-[9px] text-neutral-400 tracking-ultra uppercase font-bold block mb-1">
                  {product.category}
                </span>
                <p className="text-sm font-bold text-neutral-900 group-hover:text-neutral-500 transition-colors duration-200 leading-tight mb-1">
                  {product.name}
                </p>
                <div className="mt-3">
                  <a
                    href={getWhatsAppUrl(WHATSAPP, `Olá! Quero saber mais sobre: ${product.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[9px] text-neutral-400 hover:text-neutral-900 transition-colors duration-200 tracking-wider uppercase font-bold"
                  >
                    <ShoppingBag size={10} />
                    Consultar
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
