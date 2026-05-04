"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { UNITS } from "@/lib/data";
import { getWhatsAppUrl } from "@/lib/utils";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-neutral-200 shadow-xl w-72 p-5"
          >
            <p className="text-[9px] text-neutral-400 tracking-ultra uppercase font-bold mb-4">
              Escolha sua unidade
            </p>
            <div className="flex flex-col gap-2">
              {UNITS.map((unit) => (
                <a
                  key={unit.id}
                  href={getWhatsAppUrl(
                    unit.whatsappRaw,
                    `Olá! Gostaria de agendar um horário na unidade ${unit.shortName}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-3 border border-neutral-100 hover:border-neutral-900 hover:bg-neutral-50 transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-sm text-neutral-900 font-bold group-hover:text-neutral-600 transition-colors duration-200">
                    {unit.name}
                  </span>
                  <span className="text-xs text-neutral-400 mt-0.5">{unit.address}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20b558] flex items-center justify-center shadow-lg transition-all duration-200"
        aria-label="WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} color="white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
