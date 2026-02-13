import { motion } from "framer-motion";
import { Shield, User, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const SecureCircleVisual = () => {
  const { t } = useLanguage();
  const contacts = [
    { name: t.amma, angle: 0 },
    { name: t.bhai, angle: 120 },
    { name: t.friend, angle: 240 },
  ];

  return (
    <div className="relative w-72 h-72 mx-auto">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full gradient-primary flex items-center justify-center z-10"
        animate={{ boxShadow: ["0 0 20px hsl(174 72% 50% / 0.3)", "0 0 40px hsl(174 72% 50% / 0.6)", "0 0 20px hsl(174 72% 50% / 0.3)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Shield className="w-10 h-10 text-primary-foreground" />
      </motion.div>

      <div className="absolute inset-4 rounded-full border border-border/50" />

      {contacts.map((contact, i) => {
        const rad = (contact.angle * Math.PI) / 180;
        const x = 50 + 38 * Math.cos(rad);
        const y = 50 + 38 * Math.sin(rad);
        return (
          <motion.div
            key={contact.name}
            className="absolute flex flex-col items-center gap-1"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.2 }}
          >
            <div className="w-12 h-12 rounded-full glass flex items-center justify-center relative">
              <User className="w-5 h-5 text-foreground" />
              <CheckCircle className="w-4 h-4 text-success absolute -bottom-0.5 -right-0.5" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">{contact.name}</span>
          </motion.div>
        );
      })}

      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        {contacts.map((contact, i) => {
          const rad = (contact.angle * Math.PI) / 180;
          const x = 50 + 38 * Math.cos(rad);
          const y = 50 + 38 * Math.sin(rad);
          return (
            <motion.line key={i} x1="50" y1="50" x2={x} y2={y}
              stroke="hsl(174 72% 50% / 0.3)" strokeWidth="0.5" strokeDasharray="3 3"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default SecureCircleVisual;
