"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { BRAND } from "@/lib/data";

const slides = [
  { src: "/images/lojas/loja01-1.jpg", label: "Unidade Centro" },
  { src: "/images/lojas/loja01-2.jpg", label: "Unidade Centro" },
  { src: "/images/lojas/loja01-3.jpg", label: "Logo MenHouse" },
  { src: "/images/lojas/loja01-4.jpg", label: "Unidade Centro" },
  { src: "/images/lojas/loja01-5.jpg", label: "Unidade Centro" },
  { src: "/images/lojas/loja01-6.jpg", label: "Unidade Centro" },
  { src: "/images/lojas/loja01-7.jpg", label: "Unidade Centro" },
  { src: "/images/lojas/loja02-1.jpg", label: "Unidade Zona Sul" },
  { src: "/images/lojas/loja02-2.jpg", label: "Unidade Zona Sul" },
  { src: "/images/lojas/loja02-3.jpg", label: "Unidade Zona Sul" },
  { src: "/images/lojas/loja02-4.jpg", label: "Unidade Zona Sul" },
  { src: "/images/lojas/loja02-5.jpg", label: "Unidade Zona Sul" },
  { src: "/images/lojas/loja02-6.jpg", label: "Unidade Zona Sul" },
  { src: "/images/barbeiros/pedro-caetano.jpg", label: "Pedro G. Caetano" },
  { src: "/images/barbeiros/danilo-teodoro.jpg", label: "Danilo Teodoro" },
  { src: "/images/barbeiros/jeferson-barbosa.webp", label: "Jeferson Barbosa" },
  { src: "/images/barbeiros/victor.webp", label: "Victor" },
  { src: "/images/barbeiros/maria-eduarda-caetano.webp", label: "Maria Eduarda Caetano" },
  { src: "/images/barbeiros/matteus-sauer.webp", label: "Matteus Sauer" },
  { src: "/images/barbeiros/luan-matheus.png", label: "Luan Matheus" },
];

const N = slides.length;

function getPerView() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export default function GalleryCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const isAnimating = useRef(false);

  const [current, setCurrent] = useState(0);
  const [slideW, setSlideW] = useState(0);
  const [perView, setPerView] = useState(3);

  const updateLayout = useCallback(() => {
    if (!containerRef.current) return;
    const pv = getPerView();
    const sw = containerRef.current.offsetWidth / pv;
    setPerView(pv);
    setSlideW(sw);
  }, []);

  const moveTo = useCallback((idx: number, animate = true) => {
    if (!trackRef.current || !containerRef.current) return;
    const pv = getPerView();
    const sw = containerRef.current.offsetWidth / pv;
    const maxIdx = N - pv;
    const clamped = Math.max(0, Math.min(idx, maxIdx));

    currentRef.current = clamped;
    setCurrent(clamped);

    if (animate) {
      isAnimating.current = true;
      gsap.to(trackRef.current, {
        x: -clamped * sw,
        duration: 0.85,
        ease: "power3.inOut",
        onComplete: () => { isAnimating.current = false; },
      });
    } else {
      gsap.set(trackRef.current, { x: -clamped * sw });
    }
  }, []);

  const next = useCallback(() => {
    if (isAnimating.current) return;
    const pv = getPerView();
    const atEnd = currentRef.current >= N - pv;
    if (atEnd) {
      moveTo(0, false);
    } else {
      moveTo(currentRef.current + 1);
    }
  }, [moveTo]);

  const prev = useCallback(() => {
    if (isAnimating.current) return;
    const pv = getPerView();
    if (currentRef.current <= 0) {
      moveTo(N - pv, false);
    } else {
      moveTo(currentRef.current - 1);
    }
  }, [moveTo]);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  // Reposition after layout changes (resize / perView change)
  useEffect(() => {
    if (slideW === 0) return;
    const pv = getPerView();
    moveTo(Math.min(currentRef.current, N - pv), false);
  }, [slideW, moveTo]);

  // Auto-advance
  useEffect(() => {
    if (slideW === 0) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next, slideW]);

  const totalPages = Math.ceil(N / perView);
  const currentPage = Math.floor(current / perView);

  return (
    <section className="section-padding bg-white border-t border-neutral-100">
      <div className="container-premium mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionHeader
            eyebrow="Nosso espaço & equipe"
            title="Galeria"
            titleItalic="MenHouse"
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
      </div>

      {/* Slider */}
      <div ref={containerRef} className="overflow-hidden min-h-[480px]">
        <div ref={trackRef} className="flex h-[480px]">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative shrink-0 h-full bg-neutral-100"
              style={{ width: slideW > 0 ? `${slideW}px` : undefined }}
            >
              {slideW > 0 && (
                <>
                  <Image
                    src={slide.src}
                    alt={slide.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5">
                    <span className="text-[9px] text-white/90 tracking-ultra uppercase font-bold">
                      {slide.label}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="container-premium mt-6 flex items-center justify-between">
        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => moveTo(i * perView)}
              aria-label={`Página ${i + 1}`}
              className={`h-px transition-all duration-300 ${
                i === currentPage ? "w-8 bg-neutral-900" : "w-3 bg-neutral-300"
              }`}
            />
          ))}
        </div>

        {/* Counter + Arrows */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-neutral-400 tracking-widest font-bold tabular-nums hidden sm:block">
            {String(current + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <div className="flex">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="w-10 h-10 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={next}
              aria-label="Próximo"
              className="w-10 h-10 border border-l-0 border-neutral-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
