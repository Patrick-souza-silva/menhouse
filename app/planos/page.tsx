import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Planos e Assinaturas — MenHouse Barbearia Francisco Beltrão",
  description:
    "Assine um plano MenHouse e tenha sempre o visual impecável. Planos mensais com corte, barba e muito mais. Francisco Beltrão, PR.",
  alternates: { canonical: "https://menhouse.com.br/planos" },
};

const plans = [
  {
    id: "essencial",
    name: "Essencial",
    subtitle: "Para quem quer manter o visual sempre em dia",
    price: "Consulte",
    period: "/ mês",
    highlight: false,
    features: [
      "1 corte por mês",
      "Agendamento prioritário",
      "Desconto em produtos",
      "Válido nas duas unidades",
    ],
    cta: "Quero o Plano Essencial",
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "A experiência completa MenHouse todo mês",
    price: "Consulte",
    period: "/ mês",
    highlight: true,
    features: [
      "2 cortes por mês",
      "1 barba completa por mês",
      "Agendamento prioritário",
      "Desconto exclusivo em produtos",
      "Válido nas duas unidades",
    ],
    cta: "Quero o Plano Premium",
  },
  {
    id: "vip",
    name: "VIP",
    subtitle: "Acesso ilimitado ao padrão MenHouse",
    price: "Consulte",
    period: "/ mês",
    highlight: false,
    features: [
      "Cortes ilimitados",
      "Barba ilimitada",
      "Sobrancelha inclusa",
      "Produtos com desconto máximo",
      "Atendimento VIP sem fila",
      "Válido nas duas unidades",
    ],
    cta: "Quero o Plano VIP",
  },
];

const faqs = [
  {
    q: "Os planos são válidos nas duas unidades?",
    a: "Sim. Todos os planos MenHouse são válidos na unidade MenHouse (Ten. Camargo) e na MenHouse Prime (Av. Júlio Assis Cavalheiro).",
  },
  {
    q: "Como funciona o agendamento para assinantes?",
    a: "Assinantes têm prioridade no agendamento. Entre em contato pelo WhatsApp e informe que é assinante para ter acesso aos horários preferenciais.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim. Não há fidelidade. Você pode cancelar sua assinatura a qualquer momento sem multa.",
  },
  {
    q: "Os créditos acumulam se não usar no mês?",
    a: "Os cortes/serviços são mensais e não acumulam para o mês seguinte. Consulte condições específicas pelo WhatsApp.",
  },
];

export default function PlanosPage() {
  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Header */}
      <section className="section-padding border-b border-neutral-100">
        <div className="container-premium">
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 tracking-widest uppercase font-bold mb-10">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span>Planos</span>
          </div>
          <p className="eyebrow mb-4">Assinatura MenHouse</p>
          <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 leading-tight mb-4">
            Sempre no seu<br />
            <em className="not-italic text-neutral-400">melhor visual.</em>
          </h1>
          <p className="text-neutral-500 text-lg max-w-xl leading-relaxed">
            Assine um plano e tenha acesso a cortes, barba e serviços premium com agendamento prioritário nas duas unidades.
          </p>
        </div>
      </section>

      {/* Plans grid */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col p-10 ${
                  plan.highlight ? "bg-neutral-900 text-white" : "bg-white"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-6 right-6">
                    <span className="text-[8px] font-bold tracking-widest uppercase bg-white text-neutral-900 px-2.5 py-1">
                      Mais popular
                    </span>
                  </div>
                )}

                <p className={`text-[10px] tracking-ultra uppercase font-bold mb-3 ${plan.highlight ? "text-neutral-500" : "text-neutral-400"}`}>
                  {plan.name}
                </p>
                <p className={`text-sm leading-snug mb-8 ${plan.highlight ? "text-neutral-400" : "text-neutral-500"}`}>
                  {plan.subtitle}
                </p>

                <div className={`w-8 h-px mb-8 ${plan.highlight ? "bg-neutral-700" : "bg-neutral-200"}`} />

                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check size={12} className={`mt-0.5 shrink-0 ${plan.highlight ? "text-white" : "text-neutral-900"}`} />
                      <span className={`text-sm ${plan.highlight ? "text-neutral-300" : "text-neutral-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppUrl(BRAND.whatsappRaw, `Olá! Quero assinar o ${plan.name} da MenHouse.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
                    plan.highlight
                      ? "bg-white text-neutral-900 hover:bg-neutral-100"
                      : "bg-neutral-900 text-white hover:bg-black"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-neutral-400 mt-8">
            Valores e condições detalhadas via WhatsApp.{" "}
            <a
              href={getWhatsAppUrl(BRAND.whatsappRaw, "Olá! Quero saber mais sobre os planos MenHouse.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 font-bold hover:underline"
            >
              Fale conosco
            </a>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-neutral-50 border-t border-neutral-100">
        <div className="container-premium max-w-3xl">
          <p className="eyebrow mb-3">Dúvidas frequentes</p>
          <h2 className="font-serif text-3xl text-neutral-900 mb-12">
            Perguntas sobre <em className="not-italic text-neutral-400">os planos</em>
          </h2>
          <div className="divide-y divide-neutral-200">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <p className="text-sm font-bold text-neutral-900 mb-2">{faq.q}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="section-padding bg-neutral-900">
        <div className="container-premium text-center">
          <p className="eyebrow text-neutral-600 mb-4">Ainda tem dúvidas?</p>
          <h2 className="font-serif text-4xl text-white mb-8">
            Fale com a gente<br />
            <em className="not-italic text-neutral-500">pelo WhatsApp</em>
          </h2>
          <a
            href={getWhatsAppUrl(BRAND.whatsappRaw, "Olá! Quero saber mais sobre os planos e assinaturas MenHouse.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 text-xs font-bold tracking-widest uppercase hover:bg-neutral-100 transition-colors duration-200"
          >
            Consultar Planos
            <ArrowRight size={13} />
          </a>
        </div>
      </section>
    </div>
  );
}
