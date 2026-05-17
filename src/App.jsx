import React, { useState } from 'react';
import Splash from './components/Splash';
import Home from './components/Home';
import Explore from './components/Explore';
import Orders from './components/Orders';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';
import ProductDetail from './components/ProductDetail';
import CartModal from './components/CartModal';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import './styles/App.css';

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('splash');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { toast } = useCart();

  if (activeTab === 'splash') {
    return (
      <div className="phone-frame">
        <div className="dynamic-island"></div>
        <Splash onDone={() => setActiveTab('home')} />
        <div className="home-indicator"></div>
      </div>
    );
  }

  return (
    <div className="phone-frame">
      <div className="dynamic-island"></div>

      {/* Inside-the-phone Custom Toast Alert */}
      {toast && (
        <div className="custom-toast-notification">
          <span className="toast-icon">✨</span>
          <span className="toast-text">{toast}</span>
        </div>
      )}

      <div className="screen-inner">
        {activeTab === 'home' && <Home onSelectProduct={setSelectedProduct} />}
        {activeTab === 'explore' && <Explore onSelectProduct={setSelectedProduct} />}
        {activeTab === 'orders' && <Orders onNavigate={setActiveTab} />}
        {activeTab === 'profile' && <Profile />}
      </div>
      <BottomNav active={activeTab} onNavigate={setActiveTab} />
      
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
          onNavigate={setActiveTab} 
        />
      )}

      <CartModal onNavigate={setActiveTab} />

      <div className="home-indicator"></div>
    </div>
  );
}
