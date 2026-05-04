import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Services from "@/components/home/Services";
import Units from "@/components/home/Units";
import Manifesto from "@/components/home/Manifesto";
import Barbers from "@/components/home/Barbers";
import GalleryCarousel from "@/components/home/GalleryCarousel";
import Products from "@/components/home/Products";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "MenHouse Barbearia — Corte Masculino Premium em Francisco Beltrão, PR",
  description:
    "A barbearia premium de Francisco Beltrão. Corte masculino, barba e grooming de alto padrão. Duas unidades: Centro e Zona Sul. Agende pelo WhatsApp.",
  alternates: {
    canonical: "https://menhouse.com.br",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Units />
      <Manifesto />
      <Barbers />
      <GalleryCarousel />
      <Products />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
