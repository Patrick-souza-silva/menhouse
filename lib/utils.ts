import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWhatsAppUrl(number: string, message?: string) {
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${number}${encoded ? `?text=${encoded}` : ""}`;
}

export function formatWhatsApp(number: string, message: string) {
  return getWhatsAppUrl(number, message);
}
