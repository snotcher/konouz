import React, { useState } from 'react';
import products from '../data/products';
import { homeCats } from '../data/categories';
import artisans from '../data/artisans';
import { User, Check, Search, Globe, ShoppingCart } from 'lucide-react';
import ZelligeBg from './ZelligeBg';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

import '../styles/Home.css';

export default function Home({ onSelectProduct }) {
  const [activeCat, setActiveCat] = useState('');
  const [query, setQuery] = useState('');
  const { lang, t, toggleLanguage } = useLanguage();
  const { addToCart, cartCount, setShowCart } = useCart();

  const filtered = products.filter(p => {
    if (activeCat && p.category !== activeCat) return false;
    if (query) {
      const q = query.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="home-wrapper">
      <div className="home-header">
        <ZelligeBg opacity={0.1} />
        <div className="home-header-inner">
          <div className="home-top-row">
            <div className="home-greeting">
              <span className="greeting-en">{t('goodMorning')}</span>
            </div>
            <div className="home-actions">
              <div className="lang-switcher" onClick={toggleLanguage} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.9, fontSize: '12px', fontWeight: '500', padding: '4px 8px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)'}}>
                <Globe size={14} />
                {lang.toUpperCase()}
              </div>
              <div className="avatar-circle"><User size={16} /></div>
              <div 
                className="cart-trigger-header" 
                onClick={() => setShowCart(true)} 
                style={{ 
                  position: 'relative', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '4px',
                  marginLeft: '4px'
                }}
              >
                <ShoppingCart size={20} className="bell-icon" style={{ color: '#FAF5EC' }} />
                {cartCount > 0 && (
                  <span className="cart-badge-count" style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: 'var(--terracotta)',
                    color: 'white',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    borderRadius: '50%',
                    width: '15px',
                    height: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Tajawal, sans-serif'
                  }}>{cartCount}</span>
                )}
              </div>
            </div>
          </div>
          <h1 className="home-title">KONOUZ</h1>
          <div className="home-search">
            <Search size={16} className="search-icon" />
            <input 
              placeholder={t('searchPlaceholder')} 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
            />
          </div>
        </div>
      </div>

      <div className="home-cats">
        {homeCats.map(c => {
          const active = c.id === activeCat;
          const IconComp = c.Icon;
          return (
            <div 
              key={c.id || 'all'} 
              className={`home-cat ${active ? 'active' : ''}`} 
              onClick={() => setActiveCat(active ? '' : c.id)}
            >
              {IconComp && <IconComp size={16} />}
              <span>{t('cat' + c.label.replace(/\s+/g, ''))}</span>
            </div>
          );
        })}
      </div>

      <div className="banner-card">
        <div className="banner-left">
          <p className="banner-kicker">{t('artisanOfWeek')}</p>
          <p className="banner-name">Fatima Benali</p>
          <p className="banner-city">📍 Fès Medina</p>
        </div>
        <div className="banner-right">
          <ZelligeBg opacity={0.15} />
          <span className="banner-symbol">ⵣ</span>
        </div>
      </div>

      <h2 className="sec-head">{t('featuredCrafts')}</h2>
      <div className="feat-grid">
        {filtered.map(p => (
          <div key={p.id} className="feat-card" onClick={() => onSelectProduct && onSelectProduct(p)} style={{ cursor: 'pointer' }}>
            <div className="feat-img-wrap">
              <img src={p.img.startsWith('http') ? p.img : (process.env.PUBLIC_URL + '/' + p.img)} alt={p.name} />
            </div>
            <div className="feat-body">
              <p className="feat-cat">{p.category}</p>
              <p className="feat-name">{p.name}</p>
              <p className="feat-city">📍 {p.city}</p>
              <div className="feat-bottom">
                <p className="feat-price">{p.price} MAD</p>
                <button 
                  className="feat-add"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p, 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="sec-head">{t('meetMakers')}</h2>
      <div className="artisan-strip">
        {artisans.map((a, i) => (
          <div key={i} className="artisan-card">
            <div className="a-avatar">{a.initials}</div>
            <p className="a-name">{a.name}</p>
            <p className="a-craft">{a.craft}</p>
            <p className="a-city">📍 {a.city}</p>
            {a.verified && <p className="a-verified"><Check size={10} /> {t('verified')}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
