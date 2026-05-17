import React, { useState } from 'react';
import { ChevronLeft, Heart, Share2, Star } from 'lucide-react';
import artisans from '../data/artisans';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetail.css';

export default function ProductDetail({ product, onBack, onNavigate }) {
  const { addToCart, setShowCart, triggerToast } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [quantity, setQuantity] = useState(1);
  const [imgFailed, setImgFailed] = useState(false);

  if (!product) return null;

  // Dynamically find artisan based on city or fallback
  const artisan = artisans.find(a => a.city === product.city) || {
    name: 'Fatima Benali',
    initials: 'FB',
    craft: 'Master Artisan',
    city: product.city,
    verified: true
  };

  // Hardcoded bios for the artisan tab
  const getArtisanBio = (name) => {
    switch (name) {
      case 'Fatima Benali':
        return 'Fatima has been crafting traditional Belgha for over 20 years in the Fès Medina. She learned the craft from her father and now runs her own small family atelier.';
      case 'Hassan Moussaoui':
        return 'Hassan is a legacy leather worker in Marrakech. Using vegetable-tanned leathers from the ancient vats, he hand-stitches each custom leather piece to perfection.';
      case 'Khadija Amazigh':
        return 'Khadija leads a local women’s cooperative in Essaouira, harvesting organic argan nuts by hand to produce pure cosmetic and culinary oils.';
      case 'Youssef Tazi':
        return 'Youssef is a third-generation potter working out of Salé. His pottery represents a modern take on classical Moroccan clay shapes and glazes.';
      case 'Amina Chouikh':
        return 'Amina hand-weaves native wild reeds and palm fibers into premium, durable baskets using ancient Northern Moroccan weaving methods.';
      default:
        return 'A dedicated artisan preserving Moroccan heritage by handcrafting exceptional pieces using authentic methods and natural materials.';
    }
  };

  // Get description based on category
  const getDescription = (category) => {
    switch (category) {
      case 'belgha':
        return 'Handcrafted in the heart of Fès Medina, these traditional Moroccan slippers are made using centuries-old techniques passed down through generations of master cobblers. Each pair is hand-stitched from genuine goat leather and dyed using natural pigments.';
      case 'argan':
        return 'Cold-pressed from wild argan nuts harvested by a women\'s cooperative in Essaouira. This pure culinary oil carries a rich, nutty flavor and is bottled within hours of pressing to preserve its natural nutrients.';
      case 'leather':
        return 'Vegetable-tanned in the famous Chouara tannery of Fès, one of the oldest leather tanneries in the world. Each bag is hand-stitched by a master artisan and will develop a beautiful patina over time.';
      default:
        return 'A genuine piece of Moroccan craftsmanship, made by hand using traditional techniques and natural materials sourced from across the kingdom.';
    }
  };

  const reviews = [
    { initials: 'SA', name: 'Sara A.', stars: 5, date: 'May 2026', text: 'Absolutely beautiful. The craftsmanship is incredible and arrived perfectly wrapped. A true piece of Morocco.' },
    { initials: 'JM', name: 'Jean-Marc', stars: 5, date: 'Apr 2026', text: 'Magnifique qualité, exactement comme sur les photos. Livraison rapide depuis Fès.' },
    { initials: 'LK', name: 'Layla K.', stars: 4, date: 'Mar 2026', text: 'Gorgeous product, very authentic. Slightly smaller than expected but the quality is exceptional.' }
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('Product link copied to clipboard!');
    } else {
      triggerToast(`Sharing: ${product.name}`);
    }
  };

  const handleArtisanClick = () => {
    onBack();
    onNavigate('explore');
  };

  return (
    <div className="pd-screen">
      <div className="pd-scroll">
        
        {/* 1. Hero Section */}
        <div className={`pd-hero ${imgFailed ? 'img-fallback' : ''}`}>
          {imgFailed ? (
            <div className="fallback-content">
              <span className="fallback-title">{product.nameAr || product.name}</span>
            </div>
          ) : (
            <img 
              src={product.img.startsWith('http') ? product.img : (process.env.PUBLIC_URL + '/' + product.img)} 
              alt={product.name}
              onError={() => setImgFailed(true)} 
            />
          )}

          {/* Floating Top Bar */}
          <div className="pd-top-bar">
            <button className="pd-circle-btn" onClick={onBack} aria-label="Back">
              <ChevronLeft size={20} className="icon-ink" />
            </button>
            <div className="pd-top-bar-right">
              <button 
                className={`pd-circle-btn fav-btn ${isFavorite ? 'active' : ''}`} 
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label="Favorite"
              >
                <Heart size={20} className={isFavorite ? 'icon-terracotta fill-terracotta' : 'icon-ink'} />
              </button>
              <button className="pd-circle-btn" onClick={handleShare} aria-label="Share">
                <Share2 size={20} className="icon-ink" />
              </button>
            </div>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="pd-hero-fade"></div>

          {/* Badge over Image */}
          {product.badge && (
            <div className="pd-hero-badge">
              {product.badge.toUpperCase()}
            </div>
          )}
        </div>

        {/* 2. Product Info Section */}
        <div className="pd-info">
          
          {/* Top Row */}
          <div className="pd-info-top-row">
            <span className="pd-category">{product.category}</span>
            <div className="pd-rating">
              <Star size={14} className="star-icon" fill="var(--gold)" color="var(--gold)" />
              <span className="rating-score">4.8</span>
              <span className="rating-count">(24 reviews)</span>
            </div>
          </div>

          {/* Product Names */}
          <h1 className="pd-title">{product.name}</h1>
          <p className="pd-title-ar">{product.nameAr || 'منتج تقليدي فاخر'}</p>

          {/* Price Row */}
          <div className="pd-price-row">
            <span className="pd-price">{product.price}</span>
            <span className="pd-currency">MAD</span>
            {product.badge === 'Bestseller' && (
              <span className="pd-popular-badge">Popular</span>
            )}
          </div>

          {/* 3. Artisan Strip */}
          <div className="pd-artisan" onClick={handleArtisanClick} style={{ cursor: 'pointer' }}>
            <div className="pd-art-avatar">
              <span className="pd-art-initials">{artisan.initials}</span>
            </div>
            <div className="pd-art-middle">
              <span className="pd-art-kicker">crafted by</span>
              <p className="pd-art-name">{artisan.name}</p>
              <p className="pd-art-city">📍 {artisan.city} Medina</p>
            </div>
            {artisan.verified && (
              <div className="pd-art-verified">
                ✓ Verified
              </div>
            )}
          </div>

          {/* 4. Tabs Row */}
          <div className="pd-tabs">
            <div 
              className={`pd-tab-item ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </div>
            <div 
              className={`pd-tab-item ${activeTab === 'artisan' ? 'active' : ''}`}
              onClick={() => setActiveTab('artisan')}
            >
              Artisan
            </div>
            <div 
              className={`pd-tab-item ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </div>
          </div>

          {/* Tab Contents */}
          <div className="pd-tab-content">
            
            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="tab-details">
                <span className="tab-section-label">ABOUT THIS PIECE</span>
                <p className="tab-desc">{getDescription(product.category)}</p>
                <div className="pd-detail-pills">
                  <span className="pd-pill">🌿 Natural Materials</span>
                  <span className="pd-pill">🤲 Handmade</span>
                  <span className="pd-pill">📦 Ships in 3–5 days</span>
                </div>
              </div>
            )}

            {/* Artisan Tab */}
            {activeTab === 'artisan' && (
              <div className="tab-artisan-card">
                <div className="tab-artisan-header">
                  <div className="tab-artisan-avatar-big">
                    {artisan.initials}
                  </div>
                  <div className="tab-artisan-header-right">
                    <p className="tab-artisan-name">{artisan.name}</p>
                    <span className="tab-artisan-craft">{artisan.craft.toUpperCase()}</span>
                    <p className="tab-artisan-city">📍 {artisan.city} Medina</p>
                  </div>
                  {artisan.verified && (
                    <div className="pd-art-verified ver-big">
                      ✓ Verified
                    </div>
                  )}
                </div>
                
                <p className="tab-artisan-bio">{getArtisanBio(artisan.name)}</p>
                
                <div className="tab-artisan-stats">
                  <div className="stat-col">
                    <span className="stat-number">20+</span>
                    <span className="stat-label">Years</span>
                  </div>
                  <div className="stat-col">
                    <span className="stat-number">340</span>
                    <span className="stat-label">Sales</span>
                  </div>
                  <div className="stat-col">
                    <span className="stat-number">4.9 ★</span>
                    <span className="stat-label">Rating</span>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="tab-reviews-list">
                {reviews.map((r, i) => (
                  <div key={i} className="review-row">
                    <div className="review-header">
                      <div className="review-avatar">
                        {r.initials}
                      </div>
                      <div className="review-meta">
                        <span className="review-name">{r.name}</span>
                        <div className="review-stars">
                          {'★'.repeat(r.stars)}
                        </div>
                      </div>
                      <span className="review-date">{r.date}</span>
                    </div>
                    <p className="review-text">"{r.text}"</p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* 5. Fixed Bottom Action Bar */}
      <div className="pd-action-bar">
        <div className="pd-qty-selector">
          <button 
            className="qty-btn" 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="qty-count">{quantity}</span>
          <button 
            className="qty-btn" 
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>

        <button 
          className="pd-cart-btn" 
          onClick={() => {
            addToCart(product, quantity);
            onBack();
            setShowCart(true);
          }}
        >
          Add to Cart · {quantity * product.price} MAD
        </button>
      </div>

    </div>
  );
}
