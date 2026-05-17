import React, { useState } from 'react';
import { Heart, MapPin, CreditCard, Info, Users, Map, Bell, Globe, HelpCircle, Shield, ChevronRight } from 'lucide-react';
import ZelligeBg from './ZelligeBg';
import '../styles/Profile.css';

export default function Profile({ onNavigate }) {
  const [activeLanguage, setActiveLanguage] = useState('en');

  // Initials based on activeLanguage
  const getInitials = () => {
    if (activeLanguage === 'ar') return 'أ';
    return 'G';
  };

  // Subtitle based on activeLanguage
  const getSubtitle = () => {
    if (activeLanguage === 'ar') return 'مرحبا بك في كنوز';
    if (activeLanguage === 'fr') return 'Bienvenue chez Konouz';
    return 'Welcome to Konouz';
  };

  return (
    <div className="screen-inner profile-scroll">
      {/* 1. Header */}
      <div className="profile-header">
        <ZelligeBg opacity={0.1} stroke="#FAF5EC" />
        <div className="profile-header-content">
          <div className="profile-avatar-circle">
            <span className="avatar-initials">{getInitials()}</span>
          </div>
          <h2 className="profile-name">Guest</h2>
          <p className="profile-subtitle">{getSubtitle()}</p>
          <span className="gold-pill">Free Member</span>
        </div>
      </div>

      {/* 2. Language Switcher */}
      <div className="lang-switcher-row">
        <button 
          className={`lang-pill ${activeLanguage === 'en' ? 'active' : ''}`}
          onClick={() => setActiveLanguage('en')}
        >
          EN
        </button>
        <button 
          className={`lang-pill ${activeLanguage === 'ar' ? 'active' : ''}`}
          onClick={() => setActiveLanguage('ar')}
        >
          العربية
        </button>
        <button 
          className={`lang-pill ${activeLanguage === 'fr' ? 'active' : ''}`}
          onClick={() => setActiveLanguage('fr')}
        >
          FR
        </button>
      </div>

      {/* 3. Stats Row */}
      <div className="stats-row">
        <div className="stat-col">
          <span className="stat-number">0</span>
          <span className="stat-label">Orders</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-col">
          <span className="stat-number">0</span>
          <span className="stat-label">Favorites</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-col">
          <span className="stat-number">3</span>
          <span className="stat-label">Regions</span>
        </div>
      </div>

      {/* 4. Menu Sections */}
      <div className="menu-section">
        <div className="menu-section-label">ACCOUNT</div>
        
        <div className="menu-row">
          <Heart size={18} className="menu-icon" />
          <span className="menu-label">My Favorites</span>
          <span className="count-badge">0</span>
          <ChevronRight size={16} className="menu-chevron" />
        </div>

        <div className="menu-row">
          <MapPin size={18} className="menu-icon" />
          <span className="menu-label">My Addresses</span>
          <ChevronRight size={16} className="menu-chevron" />
        </div>

        <div className="menu-row">
          <CreditCard size={18} className="menu-icon" />
          <span className="menu-label">Payment Methods</span>
          <ChevronRight size={16} className="menu-chevron" />
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-section-label">DISCOVER</div>
        
        <div className="menu-row">
          <Info size={18} className="menu-icon" />
          <span className="menu-label">About KONOUZ</span>
          <span className="text-pill-badge">كنوز</span>
          <ChevronRight size={16} className="menu-chevron" />
        </div>

        <div className="menu-row">
          <Users size={18} className="menu-icon" />
          <span className="menu-label">Artisan Stories</span>
          <ChevronRight size={16} className="menu-chevron" />
        </div>

        <div className="menu-row">
          <Map size={18} className="menu-icon" />
          <span className="menu-label">Our Regions</span>
          <ChevronRight size={16} className="menu-chevron" />
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-section-label">SETTINGS</div>
        
        <div className="menu-row">
          <Bell size={18} className="menu-icon" />
          <span className="menu-label">Notifications</span>
          <ChevronRight size={16} className="menu-chevron" />
        </div>

        <div className="menu-row">
          <Globe size={18} className="menu-icon" />
          <span className="menu-label">Language</span>
          <span className="lang-value">
            {activeLanguage === 'en' ? 'EN' : activeLanguage === 'ar' ? 'عربي' : 'FR'}
          </span>
          <ChevronRight size={16} className="menu-chevron" />
        </div>

        <div className="menu-row">
          <HelpCircle size={18} className="menu-icon" />
          <span className="menu-label">Help & Support</span>
          <ChevronRight size={16} className="menu-chevron" />
        </div>

        <div className="menu-row">
          <Shield size={18} className="menu-icon" />
          <span className="menu-label">Privacy Policy</span>
          <ChevronRight size={16} className="menu-chevron" />
        </div>
      </div>

      {/* 5. Sign In / Sign Up block */}
      <div className="auth-block">
        <div className="auth-symbol">ⵣ</div>
        <h3 className="auth-title">Join the KONOUZ community</h3>
        <p className="auth-desc">
          Sign in to save favorites, track orders and discover artisans across Morocco
        </p>
        <div className="auth-buttons">
          <button className="btn-primary">Sign In</button>
          <button className="btn-ghost">Create Account</button>
        </div>
      </div>

      {/* 6. Footer */}
      <div className="profile-footer">
        <h4 className="footer-title">KONOUZ · كنوز</h4>
        <p className="footer-subtitle">Treasures of Morocco</p>
      </div>
    </div>
  );
}
