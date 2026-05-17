import React, { useState } from 'react';
import { Bell, Phone, ChevronRight, Check, MessageCircle } from 'lucide-react';
import ZelligeBg from './ZelligeBg';
import { useCart } from '../context/CartContext';
import '../styles/Orders.css';

const timelineSteps = [
  { id: 1, title: 'Order Placed', titleAr: 'الطلب تدار', color: '#F5A623' },
  { id: 2, title: 'Confirmed by Seller', titleAr: 'البائع وافق', color: '#9B59B6' },
  { id: 3, title: 'Picked by Courier', titleAr: 'التوصيل خدا السعلعة', color: '#E91E8C' },
  { id: 4, title: 'On the Way', titleAr: 'فطريق', color: '#27AE60' },
  { id: 5, title: 'Delivered', titleAr: 'توصل', color: '#27AE60' },
];

export default function Orders({ onNavigate }) {
  const { activeOrder, pastOrders } = useCart();
  const [showCourier, setShowCourier] = useState(false);

  const activeStep = activeOrder ? activeOrder.step : 3;
  const hasOrders = !!activeOrder;

  return (
    <div className="screen-inner orders-scroll">
      <div className="orders-header">
        <ZelligeBg opacity={0.1} stroke="#FAF5EC" />
        <div className="orders-header-inner">
          <div className="orders-top-row">
            <div className="orders-greeting">
              <span className="greeting-en">Your Orders</span>
            </div>
            <Bell size={20} className="bell-icon" />
          </div>
          <h1 className="orders-title">KONOUZ</h1>
        </div>
      </div>

      {!hasOrders ? (
        <div className="orders-empty">
          <div className="empty-symbol">ⵣ</div>
          <p className="empty-title">No orders yet</p>
          <p className="empty-sub">Your purchases will appear here</p>
          <button className="empty-btn" onClick={() => onNavigate('explore')}>Explore the Souk →</button>
        </div>
      ) : (
        <>
          <div className="active-order-card">
            <div className="card-top">
              <div className="pill-belgha">{(activeOrder.city || 'MEDINA').toUpperCase()}</div>
              <p className="product-name">{activeOrder.product}</p>
              <p className="artisan-name">{activeOrder.artisan} · {activeOrder.city}</p>
              <div className="price-row">
                <span className="order-price">{activeOrder.price}</span>
                <span className="order-id">ID: {activeOrder.id}</span>
              </div>
            </div>

            <div className="timeline-container">
              {timelineSteps.map((step, index) => {
                const isCompleted = step.id <= activeStep;
                const isCurrent = step.id === activeStep;
                const isUpcoming = step.id > activeStep;
                const isLast = index === timelineSteps.length - 1;
                
                return (
                  <div key={step.id} className="step-row">
                    <div className="step-left">
                      <div 
                        className={`step-circle ${isCurrent ? 'current' : ''}`} 
                        style={{ backgroundColor: isCompleted ? step.color : '#E8D5B0' }}
                      >
                        {step.id === 5 && isCompleted && <Check size={10} color="#fff" strokeWidth={3} />}
                      </div>
                      {!isLast && (
                        <div 
                          className="step-connector"
                          style={{ 
                            borderLeft: isUpcoming ? '2px dashed #E8D5B0' : `2px solid ${step.color}`
                          }}
                        ></div>
                      )}
                    </div>
                    <div className="step-text-row">
                      <span 
                        className="step-title-en" 
                        style={{ color: isUpcoming ? 'rgba(92, 68, 51, 0.4)' : (isCompleted && step.id === activeStep ? step.color : 'var(--ink)') }}
                      >
                        {step.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="contact-row" onClick={() => setShowCourier(true)}>
              <div className="contact-left">
                <Phone size={16} className="contact-icon" />
                <span className="contact-text">Contact Courier</span>
              </div>
              <ChevronRight size={16} className="contact-arrow" />
            </div>
          </div>

          <div className="past-orders-section">
            <p className="past-orders-label">PAST ORDERS</p>
            <div className="past-orders-list">
              {pastOrders.map((order, i) => (
                <div key={i} className="past-order-row">
                  <div className="past-color-square" style={{ backgroundColor: order.color }}></div>
                  <div className="past-middle">
                    <p className="past-name">{order.name}</p>
                    <p className="past-date">{order.date}</p>
                  </div>
                  <div className="past-right">
                    <p className="past-price">{order.price}</p>
                    <span className="delivered-badge">Delivered</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {showCourier && (
        <div className="courier-overlay" onClick={() => setShowCourier(false)}>
          <div className="courier-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle-bar"></div>
            
            <div className="courier-header">
              <div className="courier-header-left">
                <span className="courier-kicker">YOUR COURIER</span>
                <h3 className="courier-name">Mohammed Idrissi</h3>
                <span className="courier-city">📍 Currently in {activeOrder.city} Medina</span>
              </div>
              <div className="courier-avatar">
                <span className="courier-initials">MI</span>
              </div>
            </div>

            <div className="courier-status-pill">
              <div className="pulse-dot"></div>
              <span className="status-text">
                {activeOrder.step === 1 ? 'Order placed · Preparing your items' : 'Picked up your order · On the way'}
              </span>
            </div>

            <div className="courier-contact-options">
              <div className="contact-row" onClick={() => setShowCourier(false)}>
                <div className="contact-icon-circle phone-tint">
                  <Phone size={20} className="icon-terracotta" />
                </div>
                <div className="contact-row-middle">
                  <p className="contact-action">Call Courier</p>
                  <p className="contact-detail">+212 6 12 34 56 78</p>
                </div>
                <ChevronRight size={16} className="chevron-tint" />
              </div>

              <div className="contact-row" onClick={() => setShowCourier(false)}>
                <div className="contact-icon-circle gold-tint">
                  <MessageCircle size={20} className="icon-gold" />
                </div>
                <div className="contact-row-middle">
                  <p className="contact-action">Send Message</p>
                  <p className="contact-detail">Write to your courier</p>
                </div>
                <ChevronRight size={16} className="chevron-tint" />
              </div>
            </div>

            <div className="delivery-info-strip">
              <div className="info-strip-row">
                <span className="strip-label">Estimated arrival</span>
                <span className="strip-value-garamond">
                  {activeOrder.step === 1 ? '3–5 Business Days' : 'Today, 4:30 PM'}
                </span>
              </div>
              <div className="strip-divider"></div>
              <div className="info-strip-row">
                <span className="strip-label">Order ID</span>
                <span className="strip-value-tajawal">{activeOrder.id}</span>
              </div>
            </div>

            <button className="courier-close-btn" onClick={() => setShowCourier(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
