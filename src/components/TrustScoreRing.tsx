import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const TrustScoreRing = ({ score = 87 }: { score?: number }) => {
  const { t } = useLanguage();
  const [animatedScore, setAnimatedScore] = useState(0);
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getColor = () => {
    if (animatedScore >= 70) return "hsl(var(--trust-high))";
    if (animatedScore >= 40) return "hsl(var(--trust-medium))";
    return "hsl(var(--trust-low))";
  };

  const getLabel = () => {
    if (animatedScore >= 70) return t.highTrust;
    if (animatedScore >= 40) return t.mediumTrust;
    return t.highRisk;
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 500);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
        <motion.circle
          cx="100" cy="100" r="80" fill="none" stroke={getColor()} strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          transform="rotate(-90 100 100)"
          style={{ filter: `drop-shadow(0 0 8px ${getColor()})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span className="text-4xl font-bold" style={{ color: getColor() }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {animatedScore}
        </motion.span>
        <span className="text-xs font-semibold tracking-widest text-muted-foreground">{getLabel()}</span>
      </div>
    </div>
  );
};

export default TrustScoreRing;
