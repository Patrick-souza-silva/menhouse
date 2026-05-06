"use client";

import { useState } from "react";
import Image from "next/image";
import { GraduationCap } from "lucide-react";

interface Props {
  images: string[];
  name: string;
  hasCourse: boolean;
}

export default function BarberGallery({ images, name, hasCourse }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-cover transition-opacity duration-300"
          priority
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        {hasCourse && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5">
              <GraduationCap size={11} className="text-neutral-900" />
              <span className="text-[8px] font-bold tracking-wider uppercase text-neutral-900">Instrutor</span>
            </div>
          </div>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4">
            <span className="text-[8px] font-bold tracking-widest uppercase bg-white text-neutral-900 px-2.5 py-1.5">
              {active + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-1 aspect-square overflow-hidden bg-neutral-100 transition-all duration-200 ${
                i === active
                  ? "ring-2 ring-neutral-900 ring-offset-1"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`Foto ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${name} foto ${i + 1}`}
                fill
                className="object-cover"
                sizes="10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
