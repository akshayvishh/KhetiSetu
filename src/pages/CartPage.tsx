import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartTotalAmount, cartTotalItemsCount } = useApp();
  const navigate = useNavigate();

  const estimatedFreight = cart.length > 0 ? Math.round(1200 + cartTotalAmount * 0.04) : 0;
  const grandTotal = cartTotalAmount + estimatedFreight;

  if (cart.length === 0) {
    return (
      <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '64px 0' }}>
        <div className="app-container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-container)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              color: 'var(--color-primary)',
            }}
          >
            <ShoppingBag size={36} />
          </div>
          <h2 style={{ marginBottom: '12px' }}>Your Purchase Cart is Empty</h2>
          <p style={{ marginBottom: '28px', lineHeight: 1.6 }}>
            Browse our fresh agricultural marketplace to procure direct harvests from verified Maharashtra growers.
          </p>
          <Link to="/marketplace" className="btn btn-primary btn-lg">
            <span>Browse Fresh Crops</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '36px 0 64px 0' }}>
      <div className="app-container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem' }}>Procurement Cart</h1>
            <p style={{ marginTop: '4px' }}>
              Review your agricultural harvest quantities and estimated freight before proceeding to checkout.
            </p>
          </div>
          <button onClick={clearCart} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-error)' }}>
            <Trash2 size={15} />
            <span>Clear Cart</span>
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '32px',
          }}
        >
          {/* Cart Items List */}
          <div style={{ gridColumn: 'span 12' }} className="cart-items-col">
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface-lowest)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {cart.map(({ produce, quantity }) => (
                  <div
                    key={produce.id}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      paddingBottom: '20px',
                      borderBottom: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    {/* Item info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 260px' }}>
                      <img
                        src={produce.imageUrl}
                        alt={produce.cropName}
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: 'var(--radius-md)',
                          objectFit: 'cover',
                          backgroundColor: 'var(--color-surface-low)',
                        }}
                      />
                      <div>
                        <h4 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>{produce.cropName}</h4>
                        <div style={{ fontSize: '0.825rem', color: 'var(--color-on-surface-muted)' }}>
                          Farmer: {produce.farmerName} • {produce.district}
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginTop: '2px' }}>
                          ₹{produce.pricePerUnit.toLocaleString('en-IN')} per {produce.unit}
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--color-border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--color-surface-low)',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              produce.id,
                              Math.max(produce.minOrderQuantity, quantity - (produce.unit === 'kg' ? 50 : 1))
                            )
                          }
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '6px 10px', borderRadius: 0 }}
                          title="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span
                          style={{
                            padding: '0 14px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            minWidth: '50px',
                            textAlign: 'center',
                          }}
                        >
                          {quantity} {produce.unit}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              produce.id,
                              Math.min(produce.quantityAvailable, quantity + (produce.unit === 'kg' ? 50 : 1))
                            )
                          }
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '6px 10px', borderRadius: 0 }}
                          title="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(produce.id)}
                        className="btn btn-ghost"
                        style={{ padding: '8px', color: 'var(--color-error)' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Line total */}
                    <div style={{ textAlign: 'right', minWidth: '100px' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: 'var(--color-primary)',
                        }}
                      >
                        ₹{(produce.pricePerUnit * quantity).toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>
                        Excl. transport
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '20px' }}>
                <Link
                  to="/marketplace"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--color-secondary)',
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Continue Browsing Crops</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div style={{ gridColumn: 'span 12' }} className="cart-summary-col">
            <div
              className="card"
              style={{
                padding: '28px',
                backgroundColor: 'var(--color-surface-container)',
                position: 'sticky',
                top: '90px',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>Order Summary</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem' }}>
                  <span style={{ color: 'var(--color-on-surface-variant)' }}>Total Harvest Value:</span>
                  <span style={{ fontWeight: 700 }}>₹{cartTotalAmount.toLocaleString('en-IN')}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem' }}>
                  <span style={{ color: 'var(--color-on-surface-variant)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Truck size={14} /> Estimated Farm Logistics:
                  </span>
                  <span style={{ fontWeight: 700 }}>₹{estimatedFreight.toLocaleString('en-IN')}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem' }}>
                  <span style={{ color: 'var(--color-on-surface-variant)' }}>KhetiSetu Trade Fee (0%):</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>₹0 (FREE)</span>
                </div>

                <div
                  style={{
                    borderTop: '1px solid var(--color-border-subtle)',
                    paddingTop: '14px',
                    marginTop: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                    Total Procurement:
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '1.5rem',
                      color: 'var(--color-primary)',
                    }}
                  >
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Security Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  backgroundColor: 'var(--color-surface-lowest)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '24px',
                  fontSize: '0.8rem',
                  color: 'var(--color-on-surface-variant)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                <ShieldCheck size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
                <span>Simulated Escrow Protection: Funds held in trust until mandi gate inspection.</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .cart-items-col {
            grid-column: span 8 !important;
          }
          .cart-summary-col {
            grid-column: span 4 !important;
          }
        }
      `}</style>
    </div>
  );
};
