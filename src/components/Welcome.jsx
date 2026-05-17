import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Globe } from 'lucide-react';
import '../styles/Welcome.css';

export default function Welcome({ onDone }) {
  const { lang, t, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger smooth fade-in after mount
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`welcome-screen ${mounted ? 'active' : ''}`}>
      {/* Background Image Container with Ken Burns effect */}
      <div className="welcome-bg-wrap">
        <img 
          src={process.env.PUBLIC_URL + '/jeanne-pelegrin-GMTVvfVLJDk-unsplash.jpg'} 
          alt="Moroccan Medina Artisan" 
          className="welcome-bg-image"
        />
        <div className="welcome-bg-overlay"></div>
      </div>

      {/* Floating Language Selector */}
      <div className="welcome-lang-trigger" onClick={toggleLanguage}>
        <Globe size={14} />
        <span>{lang.toUpperCase()}</span>
      </div>

      {/* Content Layout */}
      <div className="welcome-content">
        {/* Elegant top ornament */}
        <div className="welcome-header">
          <div className="welcome-ornament">
            {/* Custom SVG Moroccan Star Ornament */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="welcome-brand">KONOUZ</span>
        </div>

        {/* Glassmorphic card */}
        <div className="welcome-glass-card">
          <h2 className="welcome-title">{t('welcomeTitle')}</h2>
          <div className="welcome-card-divider">
            <span className="divider-star">ⵣ</span>
          </div>
          <p className="welcome-subtitle">{t('welcomeSubtitle')}</p>
          
          <button className="welcome-cta-btn" onClick={onDone}>
            <span>{t('welcomeCTA')}</span>
            <div className="cta-icon-circle">
              <ArrowRight size={16} />
            </div>
          </button>

          <button className="welcome-secondary-btn">
            <span>{t('welcomeSecondaryCTA')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
