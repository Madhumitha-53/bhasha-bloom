import { Globe } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { languages } from "@/i18n/translations";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = languages.find((l) => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="glass px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 hover:glow-primary transition-all"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-foreground">{current?.nativeName}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute right-0 top-full mt-2 z-50 glass rounded-xl p-2 min-w-[200px] max-h-[400px] overflow-y-auto"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <p className="text-xs text-muted-foreground px-3 py-1 uppercase tracking-widest">
                {t.selectLanguage}
              </p>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                    language === lang.code
                      ? "gradient-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <span>{lang.nativeName}</span>
                  <span className="text-xs opacity-60">{lang.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
