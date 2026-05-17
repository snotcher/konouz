import { useEffect } from 'react';
import ZelligeBg from './ZelligeBg';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Splash.css';

export default function Splash({ onDone }) {
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => onDone(), 1500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="splash" onClick={onDone}>
      <div className="pattern-bg">
        <ZelligeBg opacity={0.15} />
      </div>
      <div className="splash-logo">
        <span className="splash-logo-ar">KONOUZ</span>
        <div className="splash-line"></div>
        <span className="splash-logo-sub">{t('splashSubtitle')}</span>
      </div>
      <div className="splash-tap">{t('splashTap')}</div>
    </div>
  );
}
