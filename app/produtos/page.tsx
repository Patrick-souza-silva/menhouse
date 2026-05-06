import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { PRODUCTS, BRAND } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Produtos de Barbearia Premium — MenHouse Francisco Beltrão",
  description:
    "Linha exclusiva MenHouse: pomadas, óleos de barba, shampoos e kits grooming. Qualidade profissional.",
  alternates: { canonical: "https://menhouse.com.br/produtos" },
};

export default function ProdutosPage() {
  const featured = PRODUCTS.filter((p) => p.featured);
  const regular = PRODUCTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <section className="section-padding border-b border-neutral-100">
        <div className="container-premium">
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 tracking-widest uppercase font-bold mb-10">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <ChevronRight size={11} />
            <span>Produtos</span>
          </div>
          <p className="eyebrow mb-4">Loja MenHouse</p>
          <h1 className="font-serif text-5xl md:text-6xl text-neutral-900 mb-4">
            Produtos <em className="not-italic">Exclusivos</em>
          </h1>
          <p className="text-neutral-500 text-lg max-w-xl leading-relaxed">
            Linha desenvolvida pelos profissionais MenHouse para manter seu estilo em casa.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-premium">
          {/* Featured */}
          {featured.map((product) => (
            <div key={product.id} className="group border-b border-neutral-100 mb-px">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-80 overflow-hidden bg-neutral-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[8px] font-bold tracking-widest uppercase bg-neutral-900 text-white px-2.5 py-1">
                      Destaque
                    </span>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-center border-l border-neutral-100">
                  <span className="eyebrow mb-3">{product.category}</span>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3">{product.name}</h2>
                  <p className="text-neutral-500 leading-relaxed mb-8">{product.description}</p>
                  <div>
                    <a
                      href={getWhatsAppUrl(BRAND.whatsappRaw, `Olá! Quero saber mais sobre: ${product.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs py-3"
                    >
                      <ShoppingBag size={13} />
                      Consultar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-neutral-100">
            {regular.map((product) => (
              <div key={product.id} className="group bg-white">
                <div className="relative h-48 overflow-hidden bg-neutral-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
                <div className="p-4 border-t border-neutral-100">
                  <span className="eyebrow block mb-1">{product.category}</span>
                  <p className="text-sm font-bold text-neutral-900 group-hover:text-neutral-500 transition-colors leading-tight mb-3">
                    {product.name}
                  </p>
                  <div className="mt-1">
                    <a
                      href={getWhatsAppUrl(BRAND.whatsappRaw, `Olá! Quero saber mais sobre: ${product.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[9px] text-neutral-400 hover:text-neutral-900 transition-colors font-bold tracking-wider uppercase"
                    >
                      <ShoppingBag size={10} />
                      Consultar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
