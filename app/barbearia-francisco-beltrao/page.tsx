import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Barbearia em Francisco Beltrão, PR — MenHouse",
  description:
    "MenHouse: a melhor barbearia de Francisco Beltrão, PR. Corte masculino, barba e grooming premium. Duas unidades: Centro e Zona Sul.",
  alternates: { canonical: "https://menhouse.com.br/barbearia-francisco-beltrao" },
};

export default function BarbeariaCidadePage() {
  redirect("/unidades");
}
