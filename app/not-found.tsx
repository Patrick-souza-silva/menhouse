import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6">
        <span className="font-serif text-[20vw] text-neutral-100 leading-none select-none block">
          404
        </span>
        <div className="-mt-8 relative">
          <h1 className="font-serif text-3xl text-neutral-900 mb-4">Página não encontrada</h1>
          <p className="text-neutral-500 mb-8">Esta página não existe ou foi movida.</p>
          <Link href="/" className="btn-primary">
            Voltar ao Início
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
