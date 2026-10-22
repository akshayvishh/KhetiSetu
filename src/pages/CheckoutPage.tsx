import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CheckCircle2, AlertTriangle, ArrowLeft, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotalAmount, createOrder, currentUser } = useApp();
  const navigate = useNavigate();

  // Form State
  const [street, setStreet] = useState(
    currentUser?.businessName
      ? `${currentUser.businessName}, Shop No. 12, APMC Market`
      : 'Plot 45, Agro-Trading Cluster, Sector 19'
  );
  const [city, setCity] = useState(currentUser?.location || 'Navi Mumbai');
  const [district, setDistrict] = useState(currentUser?.district || 'Thane');
  const [pincode, setPincode] = useState('400703');
  const [landmark, setLandmark] = useState('Near Weighbridge Gate 2');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-24');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('Simulated Escrow');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const estimatedFreight = cart.length > 0 ? Math.round(1200 + cartTotalAmount * 0.04) : 0;
  const grandTotal = cartTotalAmount + estimatedFreight;

  if (cart.length === 0) {
    return (
      <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '64px 0', textAlign: 'center' }}>
        <div className="app-container" style={{ maxWidth: '500px' }}>
          <h2>No items to checkout</h2>
          <p style={{ margin: '14px 0 24px 0' }}>Please add crops from the marketplace to proceed with checkout.</p>
          <Link to="/marketplace" className="btn btn-primary">
            Browse Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = createOrder({
        deliveryAddress: {
          street,
          city,
          district,
          pincode,
          landmark,
        },
        paymentMethod,
        deliveryDate,
      });

      setIsSubmitting(false);
      if (created) {
        navigate(`/orders?orderId=${created.id}`);
      }
    }, 600);
  };

  return (
    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '36px 0 64px 0' }}>
      <div className="app-container" style={{ maxWidth: '960px' }}>
        {/* Navigation back */}
        <div style={{ marginBottom: '20px' }}>
          <Link
            to="/cart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-secondary)',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Cart</span>
          </Link>
        </div>

        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Finalize Harvest Procurement</h1>
        <p style={{ marginBottom: '32px' }}>
          Specify your delivery address and simulated settlement terms. A dedicated logistics hauler will be assigned automatically.
        </p>

        {/* Clear Simulation Notice */}
        <div
          style={{
            padding: '14px 18px',
            backgroundColor: '#26241b',
            color: '#f6ecd7',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '32px',
            fontSize: '0.85rem',
          }}
        >
          <AlertTriangle size={18} color="#fdd2aa" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Demonstration Notice:</strong> All order placements, payments, and logistics dispatches are processed in local demonstration mode. No real bank accounts or payment gateways are debited.
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '32px',
            }}
          >
            {/* Left column: Address & Payment */}
            <div style={{ gridColumn: 'span 12' }} className="checkout-main-col">
              {/* 1. Delivery Address */}
              <div
                className="card"
                style={{ padding: '24px', backgroundColor: 'var(--color-surface-lowest)', marginBottom: '24px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Building2 size={20} color="var(--color-primary)" />
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Delivery Destination & Mandi Stall</h3>
                </div>

                <div className="form-group">
                  <label className="form-label">Shop / Stall / Warehouse Street Address</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. Shop 14, APMC Fruit & Veg Section"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">City / APMC Location</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">District (Maharashtra)</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Postal Pincode</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Landmark / Unloading Gate</label>
                    <input
                      type="text"
                      className="form-input"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Gate 3, Near Cold Storage"
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Requested Delivery Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </div>
              </div>

              {/* 2. Simulated Payment Options */}
              <div
                className="card"
                style={{ padding: '24px', backgroundColor: 'var(--color-surface-lowest)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <ShieldCheck size={20} color="var(--color-primary)" />
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Simulated Settlement Method</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Escrow */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border:
                        paymentMethod === 'Simulated Escrow'
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border-subtle)',
                      backgroundColor:
                        paymentMethod === 'Simulated Escrow'
                          ? 'var(--color-surface-low)'
                          : 'var(--color-surface-lowest)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Simulated Escrow'}
                      onChange={() => setPaymentMethod('Simulated Escrow')}
                      style={{ marginTop: '4px', accentColor: 'var(--color-primary)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        Simulated Escrow Hold (Recommended)
                      </div>
                      <div style={{ fontSize: '0.825rem', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                        Funds locked securely in simulated escrow vault. Released to farmer only after produce arrives and is inspected by you at the mandi.
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border:
                        paymentMethod === 'Simulated Cash on Delivery'
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border-subtle)',
                      backgroundColor:
                        paymentMethod === 'Simulated Cash on Delivery'
                          ? 'var(--color-surface-low)'
                          : 'var(--color-surface-lowest)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Simulated Cash on Delivery'}
                      onChange={() => setPaymentMethod('Simulated Cash on Delivery')}
                      style={{ marginTop: '4px', accentColor: 'var(--color-primary)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        Simulated Cash / Bank Transfer on Unloading
                      </div>
                      <div style={{ fontSize: '0.825rem', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                        Pay carrier and farmer upon physical arrival and weighbridge validation.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right column: Order Summary & Confirmation Button */}
            <div style={{ gridColumn: 'span 12' }} className="checkout-summary-col">
              <div
                className="card"
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--color-surface-container)',
                  position: 'sticky',
                  top: '90px',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Consignment Total</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {cart.map((item) => (
                    <div
                      key={item.produce.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                        borderBottom: '1px solid rgba(114, 121, 116, 0.15)',
                        paddingBottom: '8px',
                      }}
                    >
                      <span>
                        {item.produce.cropName} ({item.quantity} {item.produce.unit})
                      </span>
                      <span style={{ fontWeight: 600 }}>
                        ₹{(item.produce.pricePerUnit * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginTop: '4px' }}>
                    <span style={{ color: 'var(--color-on-surface-variant)' }}>Estimated Freight:</span>
                    <span style={{ fontWeight: 600 }}>₹{estimatedFreight.toLocaleString('en-IN')}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-on-surface-variant)' }}>Platform Fee:</span>
                    <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>₹0 (Direct)</span>
                  </div>

                  <div
                    style={{
                      borderTop: '2px solid var(--color-border-subtle)',
                      paddingTop: '12px',
                      marginTop: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-primary)' }}>
                      Total Amount:
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '1.45rem',
                        color: 'var(--color-primary)',
                      }}
                    >
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  {isSubmitting ? (
                    <span>Securing Simulated Escrow...</span>
                  ) : (
                    <span>Confirm Order & Dispatch</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .checkout-main-col {
            grid-column: span 7 !important;
          }
          .checkout-summary-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </div>
  );
};
