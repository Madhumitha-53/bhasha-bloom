import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { languages } from "@/i18n/translations";

const LanguageBadges = () => {
  const { setLanguage } = useLanguage();

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {languages.filter(l => l.code !== "en").map((lang, i) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className="glass px-4 py-2 rounded-full text-sm text-foreground font-medium cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px hsl(174 72% 50% / 0.3)" }}
        >
          {lang.nativeName}
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageBadges;
