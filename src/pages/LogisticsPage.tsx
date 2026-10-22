import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Compass,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  UploadCloud,
  Navigation,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DeliveryRequest } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { TrackingMapMock } from '../components/logistics/TrackingMapMock';
import { DocumentUploadModal } from '../components/logistics/DocumentUploadModal';

export const LogisticsPage: React.FC = () => {
  const { deliveries, acceptDelivery, updateDeliveryStatus, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'available' | 'assigned' | 'completed'>('available');
  const [selectedMapDelivery, setSelectedMapDelivery] = useState<DeliveryRequest | null>(null);
  const [selectedDocDelivery, setSelectedDocDelivery] = useState<DeliveryRequest | null>(null);

  // Available requests
  const availableDeliveries = deliveries.filter((d) => d.status === 'available');

  // Assigned / active trips
  const assignedDeliveries = deliveries.filter(
    (d) => d.status === 'accepted' || d.status === 'in_transit'
  );

  // Completed trips
  const completedDeliveries = deliveries.filter((d) => d.status === 'delivered');

  const currentList =
    activeTab === 'available'
      ? availableDeliveries
      : activeTab === 'assigned'
      ? assignedDeliveries
      : completedDeliveries;

  return (
    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '36px 0 64px 0' }}>
      <div className="app-container">
        {/* Header Banner */}
        <div
          className="card"
          style={{
            padding: '28px',
            backgroundColor: 'var(--color-surface-lowest)',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Truck size={32} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Logistics & Freight Hub</h1>
                  <span className="badge badge-verified">Verified Fleet</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                  Carrier Profile: <strong>{currentUser?.name || 'Sachin Jadhav'}</strong> ({currentUser?.vehicleNumber || 'MH 15 GH 4821'})
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', marginTop: '2px' }}>
                  Corridor: Nashik – Kasara Ghat – Thane – Vashi APMC Hub
                </div>
              </div>
            </div>

            {/* Simulated Earnings */}
            <div
              style={{
                padding: '14px 20px',
                backgroundColor: 'var(--color-surface-low)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'right',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                Simulated Freight Earnings
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                }}
              >
                ₹18,400
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--color-success)' }}>
                ● 4 trips cleared this week
              </div>
            </div>
          </div>
        </div>

        {/* Status Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            borderBottom: '1px solid var(--color-border-subtle)',
            paddingBottom: '12px',
          }}
        >
          <button
            onClick={() => setActiveTab('available')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'available' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeTab === 'available' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeTab === 'available' ? 700 : 500,
            }}
          >
            Available Loads ({availableDeliveries.length})
          </button>

          <button
            onClick={() => setActiveTab('assigned')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'assigned' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeTab === 'assigned' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeTab === 'assigned' ? 700 : 500,
            }}
          >
            Active In-Transit ({assignedDeliveries.length})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'completed' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeTab === 'completed' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeTab === 'completed' ? 700 : 500,
            }}
          >
            Delivered Records ({completedDeliveries.length})
          </button>
        </div>

        {/* Delivery Cards Grid */}
        {currentList.length === 0 ? (
          <div
            className="card"
            style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--color-surface-lowest)' }}
          >
            <Truck size={36} color="var(--color-on-surface-muted)" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ marginBottom: '8px' }}>No shipments in this view</h3>
            <p>New consignment pickup requests from farmers and buyers will appear in real time.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {currentList.map((delivery) => (
              <div
                key={delivery.id}
                className="card"
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--color-surface-lowest)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                {/* Header bar */}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.15rem' }}>
                        Load #{delivery.orderNumber}
                      </span>
                      <Badge
                        variant={
                          delivery.vehicleTypeRequired === 'refrigerated'
                            ? 'terracotta'
                            : delivery.vehicleTypeRequired === 'truck'
                            ? 'secondary'
                            : 'primary'
                        }
                      >
                        {delivery.vehicleTypeRequired.toUpperCase()} REQUIRED
                      </Badge>
                      {delivery.status === 'available' && <Badge variant="warning">Open For Haulers</Badge>}
                      {delivery.status === 'accepted' && <Badge variant="primary">Driver Assigned</Badge>}
                      {delivery.status === 'in_transit' && <Badge variant="terracotta">Highway Transit</Badge>}
                      {delivery.status === 'delivered' && <Badge variant="success">Consigned & Paid</Badge>}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--color-on-surface-muted)', marginTop: '4px' }}>
                      Pickup Window: <strong>{delivery.pickupTimeWindow}</strong> • Cargo:{' '}
                      {delivery.cropDetails} (~{delivery.totalWeightKg} kg)
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: 'var(--color-primary)',
                      }}
                    >
                      ₹{delivery.estimatedEarnings.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                      Estimated Freight Payout
                    </div>
                  </div>
                </div>

                {/* Route Visualizer */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: 'var(--color-surface-low)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '20px',
                  }}
                >
                  {/* Origin */}
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                      1. Farm Pickup Origin
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary)', marginTop: '2px' }}>
                      {delivery.pickupLocation.farmerName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
                      {delivery.pickupLocation.address}, {delivery.pickupLocation.district}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>
                      Contact: {delivery.pickupLocation.phone}
                    </div>
                  </div>

                  {/* Mid Distance */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                      Distance: {delivery.distanceKm} km
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>
                      Est Transit Time: ~{Math.round(delivery.distanceKm / 45)} hours
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                      2. Delivery Mandi / Warehouse
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary)', marginTop: '2px' }}>
                      {delivery.dropLocation.buyerName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
                      {delivery.dropLocation.address}, {delivery.dropLocation.district}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>
                      Contact: {delivery.dropLocation.phone}
                    </div>
                  </div>
                </div>

                {/* Actions & Document buttons */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {/* View Map */}
                    <button
                      onClick={() => setSelectedMapDelivery(delivery)}
                      className="btn btn-outline btn-sm"
                    >
                      <Compass size={15} />
                      <span>Simulated GPS Telemetry</span>
                    </button>

                    {/* Documents */}
                    <button
                      onClick={() => setSelectedDocDelivery(delivery)}
                      className="btn btn-outline btn-sm"
                    >
                      <FileText size={15} />
                      <span>Transit Documents ({delivery.documents.lrCopyUploaded ? 'Attached' : 'Pending'})</span>
                    </button>
                  </div>

                  {/* Driver workflow controls */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {delivery.status === 'available' && (
                      <button
                        onClick={() => acceptDelivery(delivery.id)}
                        className="btn btn-primary btn-sm"
                      >
                        <CheckCircle2 size={16} />
                        <span>Accept Load & Lock Schedule</span>
                      </button>
                    )}

                    {delivery.status === 'accepted' && (
                      <button
                        onClick={() => updateDeliveryStatus(delivery.id, 'in_transit')}
                        className="btn btn-terracotta btn-sm"
                      >
                        <Navigation size={16} />
                        <span>Mark Departed Farm Gate</span>
                      </button>
                    )}

                    {delivery.status === 'in_transit' && (
                      <button
                        onClick={() => updateDeliveryStatus(delivery.id, 'delivered')}
                        className="btn btn-secondary btn-sm"
                      >
                        <CheckCircle2 size={16} />
                        <span>Confirm Unloaded at Mandi</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GPS Telemetry Modal */}
      {selectedMapDelivery && (
        <Modal
          isOpen={!!selectedMapDelivery}
          onClose={() => setSelectedMapDelivery(null)}
          title={`Simulated Route Telemetry — ${selectedMapDelivery.orderNumber}`}
          subtitle={`Route: ${selectedMapDelivery.pickupLocation.district} to ${selectedMapDelivery.dropLocation.district} (${selectedMapDelivery.distanceKm} km)`}
          maxWidth="780px"
          footer={
            <button onClick={() => setSelectedMapDelivery(null)} className="btn btn-primary">
              Close Telemetry
            </button>
          }
        >
          <TrackingMapMock delivery={selectedMapDelivery} />
        </Modal>
      )}

      {/* Document Upload Modal */}
      {selectedDocDelivery && (
        <DocumentUploadModal
          isOpen={!!selectedDocDelivery}
          onClose={() => setSelectedDocDelivery(null)}
          delivery={selectedDocDelivery}
        />
      )}
    </div>
  );
};
