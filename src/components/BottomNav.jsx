import React from 'react';
import { Home, Compass, ShoppingBag, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/BottomNav.css';

export default function BottomNav({ active, onNavigate }) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('navHome'), Icon: Home },
    { id: 'explore', label: t('navExplore'), Icon: Compass },
    { id: 'orders', label: t('navOrders'), Icon: ShoppingBag },
    { id: 'profile', label: t('navProfile'), Icon: User }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(({ id, label, Icon }) => (
        <div
          key={id}
          className={`nav-item ${active === id ? 'active' : ''}`}
          onClick={() => onNavigate(id)}
        >
          <Icon size={24} strokeWidth={2} />
          <span className="nav-label">{label}</span>
        </div>
      ))}
    </nav>
  );
}
