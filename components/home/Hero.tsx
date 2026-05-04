"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { BRAND } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

const stats = [
  { value: "6+", label: "Anos" },
  { value: "2", label: "Unidades" },
  { value: "6", label: "Barbeiros" },
  { value: "5★", label: "Google" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex bg-white pt-[72px] overflow-hidden">
      {/* Left — Content */}
      <div className="relative flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 w-full lg:w-[55%] xl:w-1/2">

        {/* Ghost background text */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
          <span
            className="font-serif leading-none whitespace-nowrap text-outline"
            style={{ fontSize: "clamp(8rem, 22vw, 22rem)", opacity: 0.6 }}
          >
            MH
          </span>
        </div>

        {/* Vertical line + establishment */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-6 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 origin-top hidden xl:flex"
        >
          <span
            className="text-[8px] text-neutral-400 tracking-ultra uppercase font-bold"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Est. 2018
          </span>
          <div className="w-px h-16 bg-neutral-200" />
        </motion.div>

        <div className="relative z-10 xl:pl-8">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[10px] text-neutral-400 tracking-ultra uppercase font-bold mb-8"
          >
            Francisco Beltrão · Paraná · Brasil
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(3.5rem,7.5vw,6.5rem)] text-neutral-900 leading-[0.88] tracking-tight mb-8"
          >
            A Arte
            <br />
            do Corte
            <br />
            <span className="relative">
              Perfeito
              <span className="text-neutral-300">.</span>
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-16 h-px bg-neutral-900 mb-8"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-neutral-500 leading-relaxed max-w-sm mb-10 text-base"
          >
            Barbearia premium no coração de Francisco Beltrão. Onde cada detalhe importa e cada corte é feito com precisão.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-16"
          >
            <a
              href={getWhatsAppUrl(BRAND.whatsappRaw, "Olá! Gostaria de agendar um horário.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Agendar Agora
              <ArrowRight size={13} />
            </a>
            <Link href="/unidades" className="btn-outline">
              <MapPin size={13} />
              Ver Unidades
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex items-stretch border-t border-neutral-100 pt-8"
          >
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col flex-1 pr-6 mr-6 border-r border-neutral-100 last:border-0 last:mr-0 last:pr-0">
                <span className="font-serif text-2xl text-neutral-900 font-bold leading-none">{s.value}</span>
                <span className="text-[9px] text-neutral-400 tracking-widest uppercase mt-1.5 font-bold">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right — Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="hidden lg:block relative lg:w-[45%] xl:w-1/2 bg-neutral-100"
      >
        <Image
          src="/images/lojas/loja01-1.jpg"
          alt="MenHouse Barbearia Centro"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-neutral-900/15" />

        {/* Top-right label */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="absolute top-10 right-10 text-right"
        >
          <span className="text-[8px] text-white/50 tracking-ultra uppercase font-bold block">
            Unidade Centro
          </span>
          <span className="text-[8px] text-white/50 tracking-ultra uppercase font-bold block mt-0.5">
            Francisco Beltrão
          </span>
        </motion.div>

        {/* Floating card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="absolute bottom-10 left-10 bg-white p-5 max-w-[220px] border-l-2 border-neutral-900"
        >
          <p className="text-[8px] text-neutral-400 tracking-ultra uppercase font-bold mb-1">Agenda aberta</p>
          <p className="text-sm text-neutral-900 font-bold leading-snug">Seg–Sex 9h–20h</p>
          <p className="text-sm text-neutral-900 font-bold leading-snug">Sáb 8h–18h</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
