import React from 'react';
import { Bell, Check } from 'lucide-react';
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


    </div>
  );
}
