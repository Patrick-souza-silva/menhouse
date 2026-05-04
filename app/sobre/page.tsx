import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sobre Nós — A História da MenHouse Barbearia em Francisco Beltrão",
  description:
    "A história da MenHouse: como uma barbearia premium transformou o padrão do setor em Francisco Beltrão, PR.",
  alternates: { canonical: "https://menhouse.com.br/sobre" },
};

const timeline = [
  { year: "2018", title: "O Início", desc: "Lucas Silva abre a primeira unidade MenHouse no Centro de Francisco Beltrão com a missão de elevar o padrão da barbearia no Sudoeste do PR." },
  { year: "2019", title: "Consolidação", desc: "A MenHouse se torna referência premium na cidade. Equipe cresce para 4 profissionais." },
  { year: "2021", title: "Expansão", desc: "Abertura da segunda unidade na Zona Sul de Francisco Beltrão, levando a experiência premium para toda a cidade." },
  { year: "2022", title: "Educação", desc: "Lançamento dos primeiros cursos profissionais, formando novos barbeiros com o padrão MenHouse." },
  { year: "2023", title: "Linha Própria", desc: "Criação da linha de produtos exclusivos MenHouse: pomadas, óleos de barba e kits grooming." },
  { year: "2024", title: "Referência Regional", desc: "A MenHouse se consolida como a barbearia premium líder do Sudoeste do Paraná." },
];

const values = [
  { title: "Excelência", desc: "Cada corte, cada serviço, cada interação é executada com o máximo de qualidade." },
  { title: "Personalização", desc: "Não existe corte padrão. Cada cliente tem sua individualidade respeitada." },
  { title: "Ambiente", desc: "O ambiente premium é respeito pelo tempo e pela experiência do cliente." },
  { title: "Comunidade", desc: "Somos parte de Francisco Beltrão. Investir localmente é parte da nossa missão." },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Header */}
      <section className="section-padding border-b border-neutral-100">
        <div className="container-premium">
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 tracking-widest uppercase font-bold mb-10">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span>Sobre</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Nossa história</p>
              <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-6 leading-tight">
                A Barbearia que Mudou o Padrão de Francisco Beltrão.
              </h1>
              <p className="text-neutral-500 text-base leading-relaxed mb-5">
                Em 2018, Lucas Silva tinha uma visão clara: Francisco Beltrão merecia uma barbearia que não fosse só um local de corte, mas uma experiência premium — onde o homem se sentisse valorizado e saísse melhor do que entrou.
              </p>
              <p className="text-neutral-500 text-base leading-relaxed">
                Essa visão se tornou a MenHouse. Hoje, com duas unidades, seis profissionais e uma linha própria de produtos, somos a referência em barbearia premium no Sudoeste do Paraná.
              </p>
            </div>

            {/* Manifesto */}
            <div className="bg-neutral-900 p-10">
              <blockquote className="font-serif text-2xl text-white leading-snug mb-8">
                &ldquo;Não cortamos apenas cabelo. Construímos a imagem de homens que prezam pela excelência.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-neutral-700 flex items-center justify-center">
                  <span className="font-serif text-white text-xs font-bold">LS</span>
                </div>
                <div>
                  <p className="text-sm text-white font-bold">Lucas Silva</p>
                  <p className="text-xs text-neutral-500">Fundador — MenHouse Barbearia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding border-b border-neutral-100">
        <div className="container-premium">
          <p className="eyebrow mb-12">Nossa trajetória</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100">
            {timeline.map((item) => (
              <div key={item.year} className="bg-white p-7">
                <span className="font-serif text-4xl text-neutral-200 font-bold block mb-3">{item.year}</span>
                <h3 className="text-base font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding border-b border-neutral-100 bg-neutral-50">
        <div className="container-premium">
          <p className="eyebrow mb-4">Missão e valores</p>
          <h2 className="font-serif text-4xl text-neutral-900 mb-12">
            O que nos <em className="not-italic">Guia</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
            {values.map((v, i) => (
              <div key={v.title} className="bg-white p-8">
                <span className="font-serif text-4xl text-neutral-100 font-bold block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-900">
        <div className="container-premium text-center">
          <h2 className="font-serif text-4xl text-white mb-4">
            Faça Parte da Nossa História.
          </h2>
          <p className="text-neutral-400 max-w-sm mx-auto mb-8 leading-relaxed text-base">
            Agende sua visita e experimente o padrão MenHouse.
          </p>
          <a
            href={getWhatsAppUrl(BRAND.whatsappRaw, "Olá! Quero agendar um horário na MenHouse.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 text-xs font-bold tracking-widest uppercase hover:bg-neutral-100 transition-colors"
          >
            Agendar Horário
            <ArrowRight size={13} />
          </a>
        </div>
      </section>
    </div>
  );
}
