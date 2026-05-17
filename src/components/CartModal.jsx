import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import '../styles/CartModal.css';

export default function CartModal({ onNavigate }) {
  const { 
    cart, 
    showCart, 
    setShowCart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    cartCount, 
    checkoutCart,
    triggerToast
  } = useCart();

  if (!showCart) return null;

  const handleCheckout = () => {
    checkoutCart(() => {
      setShowCart(false);
      onNavigate('orders');
      triggerToast('Order Placed Successfully! Your handcrafted treasures are on the way!');
    });
  };

  return (
    <div className="cart-overlay" onClick={() => setShowCart(false)}>
      <div className="cart-sheet" onClick={(e) => e.stopPropagation()}>
        
        {/* Grab Handle */}
        <div className="cart-handle"></div>

        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-left">
            <ShoppingCart size={20} className="header-cart-icon" />
            <h3 className="cart-title">Your Cart</h3>
            <span className="cart-badge-count">{cartCount} items</span>
          </div>
          <button className="cart-close-circle" onClick={() => setShowCart(false)}>
            <X size={16} />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="cart-items-list">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-logo">ⵣ</span>
              <p className="empty-p">Your shopping cart is empty</p>
              <p className="empty-sub-p">Explore the souk to add unique handmade items.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="cart-item-row">
                {/* Product Image */}
                <div className="cart-item-img-wrap">
                  <img 
                    src={item.product.img.startsWith('http') ? item.product.img : (process.env.PUBLIC_URL + '/' + item.product.img)} 
                    alt={item.product.name} 
                  />
                </div>

                {/* Product Info */}
                <div className="cart-item-info">
                  <span className="item-cat">{item.product.category}</span>
                  <p className="item-name">{item.product.name}</p>
                  <p className="item-price">{item.product.price} MAD</p>
                </div>

                {/* Quantity adjustments */}
                <div className="cart-qty-adjuster">
                  <button 
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="cart-qty-num">{item.quantity}</span>
                  <button 
                    className="cart-qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    disabled={item.quantity >= 10}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Trash button */}
                <button 
                  className="cart-trash-btn"
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span className="total-label">Total Amount</span>
              <div className="total-price-wrap">
                <span className="total-price">{cartTotal}</span>
                <span className="total-unit">MAD</span>
              </div>
            </div>

            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Place Order & Pay
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
