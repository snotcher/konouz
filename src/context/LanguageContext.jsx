import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    splashSubtitle: 'Treasures of Morocco',
    splashTap: 'tap to begin',
    goodMorning: 'Good morning',
    searchPlaceholder: 'Search crafts, artisans, cities…',
    artisanOfWeek: 'ARTISAN OF THE WEEK',
    featuredCrafts: 'FEATURED CRAFTS',
    meetMakers: 'MEET THE MAKERS',
    verified: 'Verified',
    noProducts: 'No products found.',
    navHome: 'Home',
    navExplore: 'Explore',
    navOrders: 'Orders',
    navProfile: 'Profile',
    catAll: 'All',
    catHoney: 'Honey',
    catBelgha: 'Belgha',
    catLeather: 'Leather',
    catArgan: 'Argan',
    catBaskets: 'Baskets',
    catPottery: 'Pottery',
    catSpices: 'Spices',
    catRugs: 'Rugs',
    searchPlaceholderExplore: 'Search crafts, artisans, regions…',
    allRegions: 'All Regions',
    categories: 'Categories',
    searchResults: 'Search Results',
    allProducts: 'All Products',
    clearFilters: 'Clear filters',
    noProductsSelection: 'No products found for this selection.',
    featuredArtisans: 'Featured Artisans',
    verifiedLocal: 'Verified Local'
  },
  fr: {
    splashSubtitle: 'Trésors du Maroc',
    splashTap: 'appuyez pour commencer',
    goodMorning: 'Bonjour',
    searchPlaceholder: 'Rechercher artisanat, artisans, villes…',
    artisanOfWeek: 'ARTISAN DE LA SEMAINE',
    featuredCrafts: 'ARTISANAT EN VEDETTE',
    meetMakers: 'RENCONTREZ LES ARTISANS',
    verified: 'Vérifié',
    noProducts: 'Aucun produit trouvé.',
    navHome: 'Accueil',
    navExplore: 'Explorer',
    navOrders: 'Commandes',
    navProfile: 'Profil',
    catAll: 'Tout',
    catHoney: 'Miel',
    catBelgha: 'Belgha',
    catLeather: 'Cuir',
    catArgan: 'Argan',
    catBaskets: 'Paniers',
    catPottery: 'Poterie',
    catSpices: 'Épices',
    catRugs: 'Tapis',
    searchPlaceholderExplore: 'Rechercher artisanat, artisans, régions…',
    allRegions: 'Toutes les régions',
    categories: 'Catégories',
    searchResults: 'Résultats de recherche',
    allProducts: 'Tous les produits',
    clearFilters: 'Effacer les filtres',
    noProductsSelection: 'Aucun produit trouvé pour cette sélection.',
    featuredArtisans: 'Artisans en Vedette',
    verifiedLocal: 'Local Vérifié'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr'); // Default to French

  const t = (key) => {
    return translations[lang][key] || key;
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'fr' ? 'en' : 'fr');
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
