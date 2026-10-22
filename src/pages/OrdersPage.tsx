import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Package,
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { TrackingMapMock } from '../components/logistics/TrackingMapMock';

export const OrdersPage: React.FC = () => {
  const { orders, deliveries, updateOrderStatus, currentUser } = useApp();
  const [searchParams] = useSearchParams();
  const highlightedOrderId = searchParams.get('orderId');

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'in_transit' | 'delivered'>('all');
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((ord) => {
    if (activeTab === 'all') return true;
    return ord.status === activeTab;
  });

  const getMatchedDelivery = (orderId: string) => {
    return deliveries.find((d) => d.orderId === orderId);
  };

  return (
    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '36px 0 64px 0' }}>
      <div className="app-container">
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: '28px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: 'var(--color-on-surface-muted)',
              marginBottom: '8px',
            }}
          >
            <Link to="/marketplace">Marketplace</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Purchase Orders & Tracking</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <h1 style={{ fontSize: '2.2rem' }}>Procurement Orders & Deliveries</h1>
              <p style={{ marginTop: '4px' }}>
                Track consignments, verify harvest quality milestones, and inspect digital proof of delivery records.
              </p>
            </div>
            <Link to="/marketplace" className="btn btn-outline btn-sm">
              <span>Order More Produce</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Status Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '28px',
            borderBottom: '1px solid var(--color-border-subtle)',
            paddingBottom: '12px',
            overflowX: 'auto',
          }}
        >
          <button
            onClick={() => setActiveTab('all')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'all' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeTab === 'all' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeTab === 'all' ? 700 : 500,
            }}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'pending' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeTab === 'pending' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeTab === 'pending' ? 700 : 500,
            }}
          >
            Pending Acceptance ({orders.filter((o) => o.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('in_transit')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'in_transit' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeTab === 'in_transit' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeTab === 'in_transit' ? 700 : 500,
            }}
          >
            In Transit ({orders.filter((o) => o.status === 'in_transit').length})
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'delivered' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeTab === 'delivered' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeTab === 'delivered' ? 700 : 500,
            }}
          >
            Delivered ({orders.filter((o) => o.status === 'delivered').length})
          </button>
        </div>

        {/* Orders list */}
        {filteredOrders.length === 0 ? (
          <div
            className="card"
            style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--color-surface-lowest)' }}
          >
            <Package size={36} color="var(--color-on-surface-muted)" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ marginBottom: '8px' }}>No orders found</h3>
            <p>There are no procurement orders matching this status filter.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {filteredOrders.map((order) => {
              const matchedDel = getMatchedDelivery(order.id);
              const isHighlighted = order.id === highlightedOrderId;

              return (
                <div
                  key={order.id}
                  className="card"
                  style={{
                    padding: '24px',
                    backgroundColor: 'var(--color-surface-lowest)',
                    border: isHighlighted
                      ? '2px solid var(--color-primary)'
                      : '1px solid var(--color-border-subtle)',
                    boxShadow: isHighlighted ? 'var(--shadow-soil-md)' : 'var(--shadow-soil-sm)',
                  }}
                >
                  {/* Top Bar */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--color-border-subtle)',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            fontSize: '1.15rem',
                            color: 'var(--color-primary)',
                          }}
                        >
                          {order.orderNumber}
                        </span>
                        {order.status === 'in_transit' && (
                          <Badge variant="terracotta">In Transit</Badge>
                        )}
                        {order.status === 'pending' && <Badge variant="warning">Pending Action</Badge>}
                        {order.status === 'delivered' && (
                          <Badge variant="success">Delivered</Badge>
                        )}
                        {order.status === 'accepted' && (
                          <Badge variant="primary">Packed & Ready</Badge>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-muted)', marginTop: '4px' }}>
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • Destination: {order.deliveryAddress.city}, {order.deliveryAddress.district}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: 'var(--color-primary)',
                        }}
                      >
                        ₹{order.grandTotal.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                        {order.paymentStatus}
                      </div>
                    </div>
                  </div>

                  {/* Consignment Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '10px 14px',
                          backgroundColor: 'var(--color-surface-low)',
                          borderRadius: 'var(--radius-md)',
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.cropName}
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: 'var(--radius-sm)',
                            objectFit: 'cover',
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.cropName}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-muted)' }}>
                            Farmer: {item.farmerName} • Qty: {item.quantity} {item.unit} @ ₹{item.pricePerUnit}/{item.unit}
                          </div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-primary)' }}>
                          ₹{item.subtotal.toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Timeline Stepper */}
                  <div
                    style={{
                      padding: '16px 20px',
                      backgroundColor: 'var(--color-surface-container)',
                      borderRadius: 'var(--radius-lg)',
                      marginBottom: '20px',
                    }}
                  >
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', color: 'var(--color-secondary)' }}>
                      Fulfillment Milestones
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.timeline.map((step, sIdx) => (
                        <div key={sIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckCircle2
                            size={16}
                            color={step.completed ? 'var(--color-success)' : 'var(--color-on-surface-muted)'}
                            style={{ marginTop: '2px', flexShrink: 0 }}
                          />
                          <div style={{ fontSize: '0.85rem' }}>
                            <strong style={{ color: step.completed ? 'var(--color-primary)' : 'var(--color-on-surface-muted)' }}>
                              {step.title}
                            </strong>
                            <span style={{ color: 'var(--color-on-surface-muted)', marginLeft: '6px' }}>
                              ({step.timestamp})
                            </span>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
                              {step.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                      <Truck size={16} color="var(--color-primary)" />
                      <span>
                        Carrier:{' '}
                        <strong>
                          {order.deliveryPartnerName || 'Allocating Nearest Maharashtra Hauler...'}
                        </strong>
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {matchedDel && (
                        <button
                          onClick={() => setTrackingOrder(order)}
                          className="btn btn-primary btn-sm"
                        >
                          <Compass size={15} />
                          <span>Track Live GPS Telemetry</span>
                        </button>
                      )}

                      {order.status === 'in_transit' && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, 'delivered', 'Buyer signed digital proof of delivery.')
                          }
                          className="btn btn-secondary btn-sm"
                        >
                          <CheckCircle2 size={15} />
                          <span>Confirm Delivery & Release Escrow</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Live Tracking Modal */}
      {trackingOrder && (
        <Modal
          isOpen={!!trackingOrder}
          onClose={() => setTrackingOrder(null)}
          title={`Transit Telemetry — ${trackingOrder.orderNumber}`}
          subtitle={`Cargo: ${trackingOrder.items.map((i) => i.cropName).join(', ')}`}
          maxWidth="760px"
          footer={
            <button onClick={() => setTrackingOrder(null)} className="btn btn-primary">
              Close Tracking Window
            </button>
          }
        >
          {getMatchedDelivery(trackingOrder.id) ? (
            <TrackingMapMock delivery={getMatchedDelivery(trackingOrder.id)!} />
          ) : (
            <p>No carrier dispatch assigned yet.</p>
          )}
        </Modal>
      )}
    </div>
  );
};
