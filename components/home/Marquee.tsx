"use client";

const itemsDark = [
  "Corte Premium",
  "Barba Completa",
  "Fade Especializado",
  "Grooming",
  "Tratamento Capilar",
  "Combo VIP",
  "Sobrancelha",
  "Francisco Beltrão",
];

const itemsLight = [
  "MenHouse Barbearia",
  "Dois Unidades",
  "Agendamento WhatsApp",
  "Desde 2018",
  "Sudoeste do Paraná",
  "Barbeiros Especialistas",
  "Corte & Estilo",
  "Excelência Premium",
];

function Track({ items, direction, dark }: { items: string[]; direction: "left" | "right"; dark: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`overflow-hidden py-3.5 ${dark ? "bg-neutral-900 border-b border-neutral-800" : "bg-white border-b border-neutral-100"}`}
    >
      <div
        className={`flex gap-14 whitespace-nowrap will-change-transform ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-5 shrink-0">
            <span className={`w-1 h-1 rounded-full ${dark ? "bg-white/20" : "bg-neutral-300"}`} />
            <span
              className={`text-[10px] tracking-ultra uppercase font-bold ${
                dark ? "text-white/50" : "text-neutral-400"
              }`}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="border-t border-neutral-900">
      <Track items={itemsDark} direction="left" dark />
      <Track items={itemsLight} direction="right" dark={false} />
    </div>
  );
}
