import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Brain, Fingerprint, Activity, Users, Globe,
  WifiOff, Lock, Heart, BarChart3, AlertTriangle, Eye,
  Smartphone, Zap
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import TrustScoreRing from "@/components/TrustScoreRing";
import FeatureCard from "@/components/FeatureCard";
import SecureCircleVisual from "@/components/SecureCircleVisual";
import LanguageBadges from "@/components/LanguageBadges";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Brain, title: t.aiScamDetection, description: t.aiScamDesc },
    { icon: Eye, title: t.deepfakeLiveness, description: t.deepfakeLivenessDesc },
    { icon: Fingerprint, title: t.behavioralBiometrics, description: t.behavioralBiometricsDesc },
    { icon: BarChart3, title: t.riskDecisionEngine, description: t.riskDecisionEngineDesc },
    { icon: Users, title: t.secureCircle, description: t.secureCircleDesc },
    { icon: Globe, title: t.indianLanguages, description: t.indianLanguagesDesc },
    { icon: WifiOff, title: t.offlineCapable, description: t.offlineCapableDesc },
    { icon: Lock, title: t.privacyFirst, description: t.privacyFirstDesc },
    { icon: Heart, title: t.socialImpact, description: t.socialImpactDesc },
  ];

  const riskLevels = [
    { label: t.highTrust, action: t.autoApprove, color: "var(--trust-high)", threshold: "85–100" },
    { label: t.mediumTrust, action: t.otpVerification, color: "var(--trust-medium)", threshold: "50–84" },
    { label: t.highRisk, action: t.secureCircleTrigger, color: "var(--trust-low)", threshold: "20–49" },
    { label: "Extreme Risk", action: t.blockAlert, color: "var(--destructive)", threshold: "0–19" },
  ];

  const stats = [
    { value: "99.7%", label: t.deepfakeDetection },
    { value: "<200ms", label: t.responseTime },
    { value: "11+", label: t.languagesSupported },
    { value: "0", label: t.rawDataLeaked },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Language selector fixed */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center grid-pattern">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{t.brandBadge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-foreground">{t.heroTitle1}</span>
              <span className="gradient-text">{t.heroTitle2}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/dashboard">
                <motion.button className="gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold glow-primary"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {t.launchDashboard}
                </motion.button>
              </Link>
              <Link to="/dashboard">
                <motion.button className="glass px-8 py-3 rounded-lg font-semibold text-foreground"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {t.tryLiveDemo}
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{t.liveTrustScore}</p>
            <TrustScoreRing score={87} />
            <div className="mt-4 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Fingerprint className="w-3 h-3" /> {t.biometrics} ✓</span>
              <span className="flex items-center gap-1"><Smartphone className="w-3 h-3" /> {t.device} ✓</span>
              <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {t.behavior} ✓</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} className="text-center" initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.featuresTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.featuresSubtitle}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
          </div>
        </div>
      </section>

      {/* Risk Engine */}
      <section className="py-24 px-6 border-y border-border/50">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.riskEngineTitle}</h2>
            <p className="text-muted-foreground">{t.riskEngineSubtitle}</p>
          </motion.div>
          <div className="space-y-4">
            {riskLevels.map((level, i) => (
              <motion.div key={level.label} className="glass rounded-xl p-5 flex items-center justify-between"
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${level.color})`, boxShadow: `0 0 10px hsl(${level.color} / 0.5)` }} />
                  <div>
                    <p className="font-semibold text-foreground">{level.label}</p>
                    <p className="text-sm text-muted-foreground">{t.score}: {level.threshold}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{level.action}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SecureCircle */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.secureCircleSectionTitle}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{t.secureCircleSectionDesc}</p>
            <div className="space-y-3">
              {[t.selectContacts, t.highRiskTrigger, t.worksVia, t.autoFreeze].map((item, i) => (
                <motion.div key={i} className="flex items-center gap-3 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Zap className="w-4 h-4 text-primary flex-shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <SecureCircleVisual />
        </div>
      </section>

      {/* Languages */}
      <section className="py-24 px-6 border-y border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.voiceFirstTitle}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.voiceFirstSubtitle}</p>
          </motion.div>
          <LanguageBadges />
          <motion.div className="glass rounded-xl p-6 mt-10 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-foreground font-semibold text-sm mb-1">{t.scamAlertExample}</p>
                <p className="text-muted-foreground text-sm">{t.scamAlertHindi}</p>
                <p className="text-xs text-muted-foreground/60 mt-2 italic">{t.scamAlertTranslation}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t.corePhilosophy}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.philosophyText3
                .replace("{text1}", "")
                .replace("{text2}", "")
                .split("").length > 0 && (
                <>
                  Shift from <span className="text-foreground font-semibold">{t.philosophyText1}</span> to{" "}
                  <span className="gradient-text font-semibold">{t.philosophyText2}</span> —{" "}
                  {t.philosophyText3.split("{text2}")[1]?.replace(" — ", "") || "combining AI intelligence with social verification to prevent isolation-based fraud."}
                </>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">{t.brandName}</span>
          </div>
          <p className="text-sm text-muted-foreground">{t.footerText}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
