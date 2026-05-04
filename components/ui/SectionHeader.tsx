import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleItalic?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleItalic,
  description,
  align = "left",
  className,
  dark = false,
}: SectionHeaderProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <div className={cn("flex flex-col gap-4", alignClass, className)}>
      {eyebrow && (
        <span className={`text-[10px] tracking-ultra uppercase font-bold ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-serif text-4xl md:text-5xl leading-tight ${dark ? "text-white" : "text-neutral-900"}`}>
        {title}
        {titleItalic && (
          <>
            {" "}
            <em className="not-italic">{titleItalic}</em>
          </>
        )}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed max-w-xl ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
