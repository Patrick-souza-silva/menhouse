import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://menhouse.com.br"),
  title: {
    default: "MenHouse Barbearia — Francisco Beltrão, PR",
    template: "%s | MenHouse Barbearia",
  },
  description:
    "Barbearia premium em Francisco Beltrão - PR. Corte masculino, barba e grooming de alto padrão. Duas unidades: Centro e Zona Sul. Agende pelo WhatsApp.",
  keywords: [
    "barbearia francisco beltrao",
    "barbearia francisco beltrão",
    "barbeiro francisco beltrao",
    "corte masculino francisco beltrao",
    "barba francisco beltrao",
    "barbearia centro francisco beltrao",
    "barbearia zona sul francisco beltrao",
    "barbearia premium parana",
    "fade francisco beltrao",
    "menhouse barbearia",
  ],
  authors: [{ name: "MenHouse Barbearia" }],
  creator: "MenHouse Barbearia",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://menhouse.com.br",
    siteName: "MenHouse Barbearia",
    title: "MenHouse Barbearia — Francisco Beltrão, PR",
    description:
      "Barbearia premium em Francisco Beltrão. Corte, barba e grooming de alto padrão. Duas unidades.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MenHouse Barbearia Francisco Beltrão",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MenHouse Barbearia — Francisco Beltrão, PR",
    description: "Barbearia premium em Francisco Beltrão. Corte, barba e grooming de alto padrão.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-token",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "BarberShop",
                name: "MenHouse",
                url: "https://menhouse.com.br/barbearia-centro-francisco-beltrao",
                telephone: "+554699852846",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "R. Ten. Camargo, 1000",
                  addressLocality: "Francisco Beltrão",
                  addressRegion: "PR",
                  postalCode: "85605-090",
                  addressCountry: "BR",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: -26.073339826923824,
                  longitude: -53.04756405678305,
                },
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    opens: "08:30",
                    closes: "20:00",
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: "Saturday",
                    opens: "08:30",
                    closes: "17:00",
                  },
                ],
                sameAs: ["https://instagram.com/menhouse.barbearia"],
                priceRange: "$$",
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "5",
                  reviewCount: "127",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "BarberShop",
                name: "MenHouse Prime",
                url: "https://menhouse.com.br/barbearia-zona-sul-francisco-beltrao",
                telephone: "+554699852846",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Av. Júlio Assis Cavalheiro, 602",
                  addressLocality: "Francisco Beltrão",
                  addressRegion: "PR",
                  postalCode: "85605-320",
                  addressCountry: "BR",
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: -26.077717974168657,
                  longitude: -53.05381921593711,
                },
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    opens: "08:30",
                    closes: "20:00",
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: "Saturday",
                    opens: "08:30",
                    closes: "17:00",
                  },
                ],
                priceRange: "$$",
                sameAs: ["https://instagram.com/menhouse.barbearia"],
              },
            ]),
          }}
        />
      </head>
      <body className="bg-white text-neutral-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
