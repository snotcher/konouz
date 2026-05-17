import { useState } from 'react';
import '../styles/Explore.css';
import products from '../data/products';
import { exploreCats } from '../data/categories';
import regions from '../data/regions';
import artisans from '../data/artisans';
import { Check, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export default function Explore({ onSelectProduct }) {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const { t } = useLanguage();
  const { cartCount, setShowCart } = useCart();

  const filtered = products.filter(p => {
    if (activeCat && p.category !== activeCat) return false;
    if (activeRegion && p.city !== activeRegion) return false;
    if (query) {
      const q = query.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleCat = id => setActiveCat(activeCat === id ? null : id);

  return (
    <div className="screen-inner explorer">
      <div className="exp-header">
        <svg className="zellige-bg" viewBox="0 0 380 180">
          <defs>
            <pattern id="ze" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#FAF5EC" strokeWidth="0.5" opacity="0.5"/>
              <circle cx="20" cy="20" r="3" fill="#FAF5EC" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="380" height="180" fill="url(#ze)"/>
        </svg>
        <p className="exp-greeting">Marhaba</p>
        <p className="exp-title">KONOUZ</p>
        <div 
          className="cart-trigger-header" 
          onClick={() => setShowCart(true)} 
          style={{ 
            position: 'absolute', 
            top: '52px', 
            right: '20px', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            padding: '8px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            zIndex: 10
          }}
        >
          <ShoppingCart size={18} style={{ color: '#FAF5EC' }} />
          {cartCount > 0 && (
            <span className="cart-badge-count" style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'var(--terracotta)',
              color: 'white',
              fontSize: '8px',
              fontWeight: 'bold',
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Tajawal, sans-serif'
            }}>{cartCount}</span>
          )}
        </div>
        <div className="exp-search">
          <span className="search-icon">⌕</span>
          <input placeholder={t('searchPlaceholderExplore')} value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="region-row">
        <div className={`region-pill ${!activeRegion ? 'active' : ''}`} onClick={() => setActiveRegion(null)}>{t('allRegions')}</div>
        {regions.map(r => (
          <div key={r} className={`region-pill ${activeRegion === r ? 'active' : ''}`} onClick={() => setActiveRegion(activeRegion === r ? null : r)}>{r}</div>
        ))}
      </div>

      <div className="section-header"><h2>{t('categories')}</h2></div>
      <div className="cat-grid">
        {exploreCats.map(c => (
          <div key={c.id} className={`cat-card ${activeCat === c.id ? 'active' : ''}`} onClick={() => toggleCat(c.id)}>
            <div className="cat-card-icon"><c.Icon size={28} /></div>
            <div className="cat-card-label">{t('cat' + c.label.replace(/\s+/g, ''))}</div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>{activeCat || query ? t('searchResults') : t('allProducts')}</h2>
        <span className="see-all" onClick={() => { setActiveCat(null); setActiveRegion(null); setQuery(''); }}>{t('clearFilters')}</span>
      </div>
      <div className="products-grid">
        {filtered.length === 0 && <div className="empty-state">{t('noProductsSelection')}</div>}
        {filtered.map(p => (
          <div key={p.id} className="product-card" onClick={() => onSelectProduct && onSelectProduct(p)} style={{ cursor: 'pointer' }}>
            <div className="p-img-wrap">
              <img src={p.img.startsWith('http') ? p.img : (process.env.PUBLIC_URL + '/' + p.img)} alt={p.name} />
              {p.badge && <span className="p-badge">{p.badge}</span>}
            </div>
            <div className="p-body">
              <p className="p-cat">{t('cat' + p.category.charAt(0).toUpperCase()+p.category.slice(1))}</p>
              <p className="p-name">{p.name}</p>
              <p className="p-city">📍 {p.city}</p>
              <p className="p-price">{p.price} MAD</p>
            </div>
          </div>
        ))}
      </div>

      <div className="section-header"><h2>{t('featuredArtisans')}</h2></div>
      <div className="exp-artisan-strip">
        {artisans.map(a => (
          <div key={a.name} className="exp-art-card">
            <div className="exp-art-avatar">{a.initials}</div>
            <div className="v-badge"><Check size={8} strokeWidth={3} /> {t('verifiedLocal')}</div>
            <p className="ea-name">{a.name}</p>
            <p className="ea-city">📍 {a.city}</p>
            <p className="ea-craft">{a.craft}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
