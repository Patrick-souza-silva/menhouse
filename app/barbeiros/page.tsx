import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, GraduationCap, ArrowUpRight } from "lucide-react";
import { BARBERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Barbeiros Especialistas em Francisco Beltrão — MenHouse",
  description:
    "Conheça os 6 barbeiros especialistas da MenHouse em Francisco Beltrão. Profissionais em fade, barba, cortes clássicos e grooming premium.",
  alternates: { canonical: "https://menhouse.com.br/barbeiros" },
};

export default function BarbeirosPage() {
  const withCourse = BARBERS.filter((b) => b.hasCourse);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <section className="section-padding border-b border-neutral-100">
        <div className="container-premium">
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 tracking-widest uppercase font-bold mb-10">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span>Barbeiros</span>
          </div>

          <p className="eyebrow mb-4">Nossa equipe</p>
          <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-4">
            Profissionais de <em className="not-italic">Excelência</em>
          </h1>
          <p className="text-neutral-500 text-lg max-w-xl leading-relaxed">
            Seis especialistas que elevaram o padrão da barbearia em Francisco Beltrão.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding border-b border-neutral-100">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100">
            {BARBERS.map((barber) => (
              <Link
                key={barber.id}
                href={`/barbeiros/${barber.slug}`}
                className="group bg-white"
              >
                <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4]">
                  <Image
                    src={barber.image}
                    alt={barber.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/30 transition-all duration-400 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white px-4 py-2">
                      <span className="text-[9px] text-white tracking-widest uppercase font-bold">Ver Perfil</span>
                    </div>
                  </div>
                  {barber.hasCourse && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1.5 bg-white px-2 py-1">
                        <GraduationCap size={10} className="text-neutral-900" />
                        <span className="text-[8px] font-bold tracking-wider uppercase text-neutral-900">Instrutor</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-neutral-900 group-hover:text-neutral-500 transition-colors">
                      {barber.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 tracking-widest uppercase mt-0.5 font-bold">{barber.role}</p>
                  </div>
                  <ArrowUpRight size={15} className="text-neutral-300 group-hover:text-neutral-900 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      {withCourse.length > 0 && (
        <section className="section-padding bg-neutral-50" id="cursos">
          <div className="container-premium">
            <p className="eyebrow mb-4">Formação profissional</p>
            <h2 className="font-serif text-4xl text-neutral-900 mb-12">
              Cursos <em className="not-italic">Profissionais</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
              {withCourse.map((barber) =>
                barber.course ? (
                  <div key={barber.id} className="bg-white p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <GraduationCap size={15} className="text-neutral-400" />
                      <span className="text-[10px] text-neutral-400 tracking-ultra uppercase font-bold">
                        Instrutor: {barber.name}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">{barber.course.name}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-7">{barber.course.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-7">
                      {[
                        { label: "Investimento", value: barber.course.price },
                        { label: "Duração", value: barber.course.duration },
                      ].map((item) => (
                        <div key={item.label} className="bg-neutral-50 border border-neutral-100 p-4 text-center">
                          <p className="text-lg font-bold text-neutral-900">{item.value}</p>
                          <p className="text-[9px] text-neutral-400 tracking-widest uppercase font-bold mt-1">{item.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-7">
                      {barber.course.modules.map((m) => (
                        <span key={m} className="text-[10px] text-neutral-500 border border-neutral-200 px-2.5 py-1 uppercase tracking-wider font-bold">
                          {m}
                        </span>
                      ))}
                    </div>

                    <Link href={`/barbeiros/${barber.slug}#curso`} className="btn-primary text-xs py-3">
                      Saiba Mais sobre o Curso
                    </Link>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
