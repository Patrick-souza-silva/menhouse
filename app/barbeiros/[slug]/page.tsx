import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Instagram, GraduationCap, Star, ArrowRight } from "lucide-react";
import { BARBERS, UNITS, BRAND } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";
import BarberGallery from "@/components/barbeiros/BarberGallery";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BARBERS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const barber = BARBERS.find((b) => b.slug === slug);
  if (!barber) return {};
  return {
    title: `${barber.name} — Barbeiro Especialista em Francisco Beltrão | MenHouse`,
    description: `${barber.name}, ${barber.role} na MenHouse em Francisco Beltrão. ${barber.bio.substring(0, 100)}...`,
    alternates: { canonical: `https://menhouse.com.br/barbeiros/${barber.slug}` },
  };
}

export default async function BarberPage({ params }: Props) {
  const { slug } = await params;
  const barber = BARBERS.find((b) => b.slug === slug);
  if (!barber) notFound();
  const unit = UNITS.find((u) => u.id === barber.unit);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <div className="container-premium pt-8 pb-4">
        <div className="flex items-center gap-2 text-[10px] text-neutral-400 tracking-widest uppercase font-bold">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight size={11} />
          <Link href="/barbeiros" className="hover:text-neutral-900 transition-colors">Barbeiros</Link>
          <ChevronRight size={11} />
          <span>{barber.name}</span>
        </div>
      </div>

      <section className="section-padding pt-8">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-2">
              <BarberGallery
                images={barber.images ?? [barber.image]}
                name={barber.name}
                hasCourse={barber.hasCourse}
              />
            </div>

            {/* Info */}
            <div className="lg:col-span-3">
              <p className="eyebrow mb-4">MenHouse — {unit?.shortName}</p>
              <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-2">{barber.name}</h1>
              <p className="text-neutral-400 text-base mb-6 font-medium">{barber.role}</p>

              <div className="w-8 h-px bg-neutral-200 mb-6" />

              <p className="text-neutral-500 text-base leading-relaxed mb-8">{barber.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-neutral-100">
                <div>
                  <p className="font-serif text-2xl text-neutral-900 font-bold">{barber.experience}</p>
                  <p className="text-[9px] text-neutral-400 tracking-widest uppercase mt-1 font-bold">Experiência</p>
                </div>
                <div className="border-x border-neutral-100 px-4">
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-neutral-900 fill-neutral-900" />
                    ))}
                  </div>
                  <p className="text-[9px] text-neutral-400 tracking-widest uppercase font-bold">Avaliação</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-neutral-900 font-bold">{unit?.shortName}</p>
                  <p className="text-[9px] text-neutral-400 tracking-widest uppercase mt-1 font-bold">Unidade</p>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <p className="eyebrow mb-3">Especialidades</p>
                <div className="flex flex-wrap gap-2">
                  {barber.specialties.map((s) => (
                    <span key={s} className="text-xs text-neutral-600 border border-neutral-200 px-3 py-1.5 hover:border-neutral-900 transition-colors duration-200 cursor-default font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={getWhatsAppUrl(
                    unit?.whatsappRaw ?? BRAND.whatsappRaw,
                    `Olá! Quero agendar com o ${barber.name}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Agendar com {barber.name.split(" ")[0]}
                  <ArrowRight size={13} />
                </a>
                <a
                  href={`https://instagram.com/${barber.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <Instagram size={13} />
                  {barber.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course */}
      {barber.hasCourse && barber.course && (
        <section className="section-padding bg-neutral-50 border-t border-neutral-100" id="curso">
          <div className="container-premium">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap size={15} className="text-neutral-400" />
                <p className="eyebrow">Formação Profissional</p>
              </div>

              <h2 className="font-serif text-4xl text-neutral-900 mb-4">{barber.course.name}</h2>
              <p className="text-neutral-500 text-base leading-relaxed mb-10">{barber.course.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 mb-10">
                {[
                  { label: "Investimento", value: barber.course.price },
                  { label: "Duração", value: barber.course.duration },
                  { label: "Módulos", value: `${barber.course.modules.length}` },
                  { label: "Certificado", value: "✓" },
                ].map((item) => (
                  <div key={item.label} className="bg-white p-5 text-center">
                    <p className="text-xl font-bold text-neutral-900">{item.value}</p>
                    <p className="text-[9px] text-neutral-400 tracking-widest uppercase mt-1 font-bold">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-100 mb-8">
                {barber.course.modules.map((m, i) => (
                  <div key={m} className="flex items-center gap-3 bg-white p-4">
                    <span className="font-serif text-neutral-300 text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-neutral-700 font-medium">{m}</span>
                  </div>
                ))}
              </div>

              <a
                href={getWhatsAppUrl(
                  unit?.whatsappRaw ?? BRAND.whatsappRaw,
                  `Olá! Quero me inscrever no curso "${barber.course.name}" com ${barber.name}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Quero Me Inscrever
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
