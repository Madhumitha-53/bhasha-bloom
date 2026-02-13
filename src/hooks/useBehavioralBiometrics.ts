import { useState, useCallback, useEffect } from "react";

interface BiometricData {
  typingSpeed: number;
  typingConsistency: number;
  keyPressIntervals: number[];
  sessionDuration: number;
  mouseMovements: number;
  scrollPatterns: number;
  deviceTrust: number;
}

const useBehavioralBiometrics = () => {
  const [biometrics, setBiometrics] = useState<BiometricData>({
    typingSpeed: 0, typingConsistency: 100, keyPressIntervals: [],
    sessionDuration: 0, mouseMovements: 0, scrollPatterns: 0, deviceTrust: 85,
  });

  const [lastKeyTime, setLastKeyTime] = useState<number | null>(null);
  const [startTime] = useState(Date.now());

  const recordKeystroke = useCallback(() => {
    const now = Date.now();
    if (lastKeyTime) {
      const interval = now - lastKeyTime;
      setBiometrics((prev) => {
        const intervals = [...prev.keyPressIntervals.slice(-20), interval];
        const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const variance = intervals.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / intervals.length;
        const consistency = Math.max(0, 100 - Math.sqrt(variance) / 2);
        return { ...prev, keyPressIntervals: intervals, typingSpeed: Math.round(60000 / avg), typingConsistency: Math.round(consistency) };
      });
    }
    setLastKeyTime(now);
  }, [lastKeyTime]);

  const recordMouseMove = useCallback(() => {
    setBiometrics((prev) => ({ ...prev, mouseMovements: prev.mouseMovements + 1 }));
  }, []);

  const recordScroll = useCallback(() => {
    setBiometrics((prev) => ({ ...prev, scrollPatterns: prev.scrollPatterns + 1 }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBiometrics((prev) => ({ ...prev, sessionDuration: Math.round((Date.now() - startTime) / 1000) }));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const getBehaviorScore = useCallback((): number => {
    const typingScore = Math.min(100, biometrics.typingConsistency);
    const activityScore = Math.min(100, biometrics.mouseMovements / 2);
    const deviceScore = biometrics.deviceTrust;
    return Math.round(typingScore * 0.4 + activityScore * 0.3 + deviceScore * 0.3);
  }, [biometrics]);

  return { biometrics, recordKeystroke, recordMouseMove, recordScroll, getBehaviorScore };
};

export default useBehavioralBiometrics;
