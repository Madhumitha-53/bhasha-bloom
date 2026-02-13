import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, MessageSquareWarning, Eye, Activity, ArrowLeft, Brain, Fingerprint, Users } from "lucide-react";
import SecureCircleVisual from "@/components/SecureCircleVisual";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/i18n/LanguageContext";
import TrustScoreRing from "@/components/TrustScoreRing";
import useBehavioralBiometrics from "@/hooks/useBehavioralBiometrics";
import { useEffect } from "react";
import { Keyboard, Mouse, Clock, Smartphone } from "lucide-react";

type Tab = "scam" | "deepfake" | "biometrics" | "securecircle";

const Dashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("scam");

  const tabs: { id: Tab; label: string; icon: typeof Shield; desc: string }[] = [
    { id: "scam", label: t.scamDetector, icon: MessageSquareWarning, desc: t.scamDetectorDesc },
    { id: "deepfake", label: t.deepfakeAnalyzer, icon: Eye, desc: t.deepfakeAnalyzerDesc },
    { id: "biometrics", label: t.liveBiometricsLabel, icon: Activity, desc: t.liveBiometricsDesc },
    { id: "securecircle", label: t.secureCircleLabel, icon: Users, desc: t.secureCircleDashDesc },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">{t.dashboardTitle}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">{t.systemActive}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {tabs.map(({ id, label, icon: Icon, desc }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`rounded-xl p-4 text-left transition-all ${
                activeTab === id ? "gradient-primary text-primary-foreground glow-primary" : "glass text-foreground hover:border-primary/50"
              }`}>
              <Icon className="w-5 h-5 mb-2" />
              <p className="text-sm font-semibold">{label}</p>
              <p className={`text-xs mt-0.5 ${activeTab === id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{desc}</p>
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === "scam" && <ScamTab />}
          {activeTab === "deepfake" && <DeepfakeTab />}
          {activeTab === "biometrics" && <BiometricsTab />}
          {activeTab === "securecircle" && <SecureCircleTab />}
        </motion.div>
      </div>
    </div>
  );
};

// Inline simplified tabs to avoid complex component imports with Supabase deps

const ScamTab = () => {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState("");
  
  const sampleMessages = [
    "Dear customer, your IOB account will be blocked in 24 hours. Share OTP to verify: 8XXX-XXXX",
    "Congratulations! You won ₹50,000 lottery. Click here to claim: bit.ly/xxx",
    "Your KYC has expired. Update now or face account suspension. Call 9876543210",
    "Hi, your IOB fixed deposit maturity is due on 15th March. Visit nearest branch.",
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-4">
        <textarea value={inputText} onChange={(e) => setInputText(e.target.value)}
          placeholder={t.pasteSms}
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 resize-none h-32 outline-none text-sm" />
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-muted-foreground">{inputText.length} {t.characters}</span>
          <button disabled={!inputText.trim()}
            className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
            {t.analyze}
          </button>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">{t.trySampleMessages}</p>
        <div className="space-y-2">
          {sampleMessages.map((msg, i) => (
            <button key={i} onClick={() => setInputText(msg)}
              className="w-full text-left glass rounded-lg p-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {msg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const DeepfakeTab = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-all">
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-3">
          <Eye className="w-8 h-8 text-primary" />
        </div>
        <p className="text-foreground font-semibold">{t.dropImage}</p>
        <p className="text-xs text-muted-foreground mt-1">{t.supportsFormats}</p>
      </div>
    </div>
  );
};

const BiometricsTab = () => {
  const { t } = useLanguage();
  const { biometrics, recordKeystroke, recordMouseMove, recordScroll, getBehaviorScore } = useBehavioralBiometrics();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKey = () => recordKeystroke();
    const handleMouse = () => recordMouseMove();
    const handleScrollEvt = () => recordScroll();
    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScrollEvt);
    return () => { window.removeEventListener("keydown", handleKey); window.removeEventListener("mousemove", handleMouse); window.removeEventListener("scroll", handleScrollEvt); };
  }, [recordKeystroke, recordMouseMove, recordScroll]);

  useEffect(() => {
    const interval = setInterval(() => setScore(getBehaviorScore()), 1000);
    return () => clearInterval(interval);
  }, [getBehaviorScore]);

  const metrics = [
    { icon: Keyboard, label: t.typingSpeed, value: `${biometrics.typingSpeed} ${t.wpm}`, sub: `${biometrics.typingConsistency}% ${t.consistent}` },
    { icon: Mouse, label: t.mouseActivity, value: `${biometrics.mouseMovements}`, sub: t.movementsTracked },
    { icon: Clock, label: t.sessionDuration, value: `${biometrics.sessionDuration}s`, sub: t.activeSession },
    { icon: Smartphone, label: t.deviceTrustLabel, value: `${biometrics.deviceTrust}%`, sub: t.fingerprintMatch },
    { icon: Activity, label: t.scrollPatterns, value: `${biometrics.scrollPatterns}`, sub: t.scrollEvents },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6 flex flex-col items-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{t.liveBehavioralScore}</p>
        <TrustScoreRing score={score} />
        <p className="text-sm text-muted-foreground mt-4">{t.interactToSee}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map(({ icon: Icon, label, value, sub }, i) => (
          <motion.div key={label} className="glass rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </motion.div>
        ))}
      </div>
      <div className="glass rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">{t.tryTyping}</p>
        <textarea placeholder={t.typeAnything} onKeyDown={recordKeystroke}
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 resize-none h-20 outline-none text-sm" />
      </div>
    </div>
  );
};

const SecureCircleTab = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">{t.humanVerification}</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">{t.secureCircleDashText}</p>
        <SecureCircleVisual />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> {t.howItWorks}
          </h4>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-primary font-bold">1.</span> {t.step1}</li>
            <li className="flex gap-2"><span className="text-primary font-bold">2.</span> {t.step2}</li>
            <li className="flex gap-2"><span className="text-primary font-bold">3.</span> {t.step3}</li>
            <li className="flex gap-2"><span className="text-primary font-bold">4.</span> {t.step4}</li>
          </ol>
        </div>
        <div className="glass rounded-xl p-5">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" /> {t.keyFeatures}
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Fingerprint className="w-3 h-3 text-primary" /> {t.offlineBluetooth}</li>
            <li className="flex items-center gap-2"><Fingerprint className="w-3 h-3 text-primary" /> {t.smsFallback}</li>
            <li className="flex items-center gap-2"><Fingerprint className="w-3 h-3 text-primary" /> {t.autoFreezeDetection}</li>
            <li className="flex items-center gap-2"><Fingerprint className="w-3 h-3 text-primary" /> {t.timeBoxed}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
