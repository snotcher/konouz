import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState(null);
  
  const triggerToast = (message) => {
    setToast(message);
  };

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  // Default active order: Fatima's Belgha slippers
  const [activeOrder, setActiveOrder] = useState({
    id: 'KNZ-2847',
    product: 'Handmade Belgha Slippers',
    productAr: 'بلغة يدوية',
    artisan: 'Fatima Benali',
    city: 'Fès',
    price: '120 MAD',
    date: 'May 14, 2026',
    step: 3 // 'Picked by Courier'
  });

  const [pastOrders, setPastOrders] = useState([
    { name: 'Pure Argan Oil', date: 'Apr 28, 2026', price: '85 MAD', color: '#B8924A' },
    { name: 'Woven Market Basket', date: 'Mar 15, 2026', price: '65 MAD', color: '#C4714A' },
    { name: 'Sidr Wild Honey', date: 'Feb 3, 2026', price: '180 MAD', color: '#D4B06A' }
  ]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const newCart = [...prev];
        newCart[existingIdx].quantity = Math.min(10, newCart[existingIdx].quantity + quantity);
        return newCart;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.min(10, newQty) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  // checkoutCart creates a new active order dynamically and clears the cart!
  const checkoutCart = (onSuccess) => {
    if (cart.length === 0) return;

    // Pick first item in cart as the primary displayed product in Orders
    const primaryItem = cart[0];
    
    // Dynamically match artisan details
    const getArtisanName = (city) => {
      switch (city) {
        case 'Fès': return 'Fatima Benali';
        case 'Marrakech': return 'Hassan Moussaoui';
        case 'Essaouira': return 'Khadija Amazigh';
        case 'Salé': return 'Youssef Tazi';
        case 'Chefchaouen': return 'Amina Chouikh';
        default: return 'Fatima Benali';
      }
    };

    const newOrder = {
      id: `KNZ-${Math.floor(1000 + Math.random() * 9000)}`,
      product: primaryItem.product.name,
      productAr: primaryItem.product.nameAr || 'منتج يدوي',
      artisan: getArtisanName(primaryItem.product.city),
      city: primaryItem.product.city,
      price: `${primaryItem.product.price * primaryItem.quantity} MAD`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      step: 1 // 'Order Placed'
    };

    // Move current active order to past orders list!
    if (activeOrder) {
      setPastOrders((prev) => [
        {
          name: activeOrder.product,
          date: activeOrder.date,
          price: activeOrder.price,
          color: activeOrder.product.includes('Slippers') ? '#B8924A' : '#C4714A'
        },
        ...prev
      ]);
    }

    setActiveOrder(newOrder);
    clearCart();
    if (onSuccess) onSuccess();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        activeOrder,
        pastOrders,
        checkoutCart,
        showCart,
        setShowCart,
        toast,
        triggerToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
