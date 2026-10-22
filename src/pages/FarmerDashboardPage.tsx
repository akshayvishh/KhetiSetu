import React, { useState } from 'react';
import {
  Sprout,
  Plus,
  Edit,
  Trash2,
  Package,
  TrendingUp,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProduceListing, CropCategory, Order } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';

export const FarmerDashboardPage: React.FC = () => {
  const {
    currentUser,
    produceListings,
    orders,
    addProduceListing,
    updateProduceListing,
    deleteProduceListing,
    updateOrderStatus,
    requestLogisticsForOrder,
    showToast,
  } = useApp();

  // Active section tab
  const [activeTab, setActiveTab] = useState<'listings' | 'orders' | 'profile'>('listings');

  // Add/Edit Produce Modal
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [editingListingId, setEditingListingId] = useState<string | null>(null);

  // Form Fields
  const [cropName, setCropName] = useState('');
  const [variety, setVariety] = useState('');
  const [category, setCategory] = useState<CropCategory>('Vegetables');
  const [quantityAvailable, setQuantityAvailable] = useState<number>(1000);
  const [unit, setUnit] = useState<ProduceListing['unit']>('kg');
  const [pricePerUnit, setPricePerUnit] = useState<number>(30);
  const [minOrderQuantity, setMinOrderQuantity] = useState<number>(50);
  const [harvestDate, setHarvestDate] = useState('2026-10-22');
  const [district, setDistrict] = useState(currentUser?.district || 'Nashik');
  const [location, setLocation] = useState(currentUser?.location || 'Pimpalgaon Baswant');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80');
  const [isOrganic, setIsOrganic] = useState(true);
  const [qualityGrade, setQualityGrade] = useState<ProduceListing['qualityGrade']>('Grade A+ (Export)');

  // Request Haulage Modal
  const [logisticsModalOrder, setLogisticsModalOrder] = useState<Order | null>(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState<'tempo' | 'truck' | 'refrigerated'>('tempo');

  // Filter farmer-specific listings
  const farmerListings = produceListings.filter(
    (item) => item.farmerId === (currentUser?.id || 'user-farmer-1')
  );

  // Filter incoming orders for this farmer's produce
  const incomingOrders = orders.filter((order) =>
    order.items.some((item) => item.farmerId === (currentUser?.id || 'user-farmer-1'))
  );

  // Farmer metrics
  const totalSalesRevenue = incomingOrders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + o.totalProduceAmount, 0);

  const pendingOrdersCount = incomingOrders.filter((o) => o.status === 'pending').length;

  const handleOpenAddModal = () => {
    setEditingListingId(null);
    setCropName('');
    setVariety('');
    setCategory('Vegetables');
    setQuantityAvailable(1000);
    setUnit('kg');
    setPricePerUnit(35);
    setMinOrderQuantity(50);
    setHarvestDate(new Date().toISOString().split('T')[0]);
    setDescription('Fresh farm harvest. Graded, sorted and ready for direct pickup at our farm shed.');
    setIsOrganic(true);
    setQualityGrade('Grade A+ (Export)');
    setIsListingModalOpen(true);
  };

  const handleOpenEditModal = (item: ProduceListing) => {
    setEditingListingId(item.id);
    setCropName(item.cropName);
    setVariety(item.variety || '');
    setCategory(item.category);
    setQuantityAvailable(item.quantityAvailable);
    setUnit(item.unit);
    setPricePerUnit(item.pricePerUnit);
    setMinOrderQuantity(item.minOrderQuantity);
    setHarvestDate(item.harvestDate);
    setDescription(item.description);
    setImageUrl(item.imageUrl);
    setIsOrganic(item.isOrganic);
    setQualityGrade(item.qualityGrade);
    setIsListingModalOpen(true);
  };

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName.trim()) {
      showToast('warning', 'Missing Details', 'Please provide a crop name.');
      return;
    }

    if (editingListingId) {
      updateProduceListing(editingListingId, {
        cropName,
        variety,
        category,
        quantityAvailable,
        unit,
        pricePerUnit,
        minOrderQuantity,
        harvestDate,
        description,
        imageUrl,
        isOrganic,
        qualityGrade,
      });
    } else {
      addProduceListing({
        farmerId: currentUser?.id || 'user-farmer-1',
        farmerName: currentUser?.name || 'Ramesh Patil',
        farmerPhone: currentUser?.phone || '+91 98220 14829',
        farmerDistrict: district,
        cropName,
        variety,
        category,
        quantityAvailable,
        unit,
        pricePerUnit,
        minOrderQuantity,
        harvestDate,
        location,
        district,
        description,
        imageUrl,
        isOrganic,
        qualityGrade,
        shelfLifeDays: 30,
        status: 'active',
      });
    }

    setIsListingModalOpen(false);
  };

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'accepted', 'Farmer accepted order and began packing for transit.');
  };

  const handleRejectOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled', 'Farmer declined order due to inventory availability.');
  };

  const handleRequestHaulage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logisticsModalOrder) return;
    requestLogisticsForOrder(logisticsModalOrder.id, selectedVehicleType);
    setLogisticsModalOrder(null);
  };

  return (
    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '36px 0 64px 0' }}>
      <div className="app-container">
        {/* Farmer Header & Overview Card */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Sprout size={34} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '1.8rem', margin: 0 }}>
                    {currentUser?.farmName || 'Patil Agro Organic Farm'}
                  </h1>
                  <span className="badge badge-verified">Verified Grower</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                  Farmer: <strong>{currentUser?.name || 'Ramesh Patil'}</strong> • {currentUser?.location || 'Pimpalgaon Baswant'}, {currentUser?.district || 'Nashik'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', marginTop: '2px' }}>
                  Acreage: {currentUser?.farmSizeAcres || 14} Acres • Primary: Onion, Table Grapes, Tomato
                </div>
              </div>
            </div>

            <button onClick={handleOpenAddModal} className="btn btn-primary">
              <Plus size={18} />
              <span>List New Crop Harvest</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <div style={{ padding: '12px', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                Active Produce Listings
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {farmerListings.length} Crops
              </div>
            </div>

            <div style={{ padding: '12px', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                Pending Buyer Orders
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-terracotta)' }}>
                {pendingOrdersCount} Action Needed
              </div>
            </div>

            <div style={{ padding: '12px', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                Total Delivered Volume
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                {incomingOrders.length} Consignments
              </div>
            </div>

            <div style={{ padding: '12px', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                Direct Realization
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-success)' }}>
                ₹{(totalSalesRevenue || 33600).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
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
            onClick={() => setActiveTab('listings')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'listings' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeTab === 'listings' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeTab === 'listings' ? 700 : 500,
            }}
          >
            My Produce Listings ({farmerListings.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'orders' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeTab === 'orders' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeTab === 'orders' ? 700 : 500,
            }}
          >
            Incoming Buyer Orders ({incomingOrders.length})
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === 'profile' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeTab === 'profile' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeTab === 'profile' ? 700 : 500,
            }}
          >
            Farm Profile & Certifications
          </button>
        </div>

        {/* TAB 1: Produce Listings Management */}
        {activeTab === 'listings' && (
          <div>
            {farmerListings.length === 0 ? (
              <div className="card" style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--color-surface-lowest)' }}>
                <Sprout size={36} color="var(--color-on-surface-muted)" style={{ margin: '0 auto 12px auto' }} />
                <h3>No Harvests Listed Yet</h3>
                <p style={{ margin: '8px 0 20px 0' }}>Add your crops to make them instantly discoverable to wholesale buyers.</p>
                <button onClick={handleOpenAddModal} className="btn btn-primary">
                  <Plus size={16} />
                  <span>List Your First Crop</span>
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '24px',
                }}
              >
                {farmerListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'var(--color-surface-lowest)',
                    }}
                  >
                    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                      <img
                        src={listing.imageUrl}
                        alt={listing.cropName}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                        <Badge variant="primary">{listing.category}</Badge>
                        {listing.isOrganic && <Badge variant="success">Organic</Badge>}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(8, 36, 26, 0.85)',
                          color: '#ffffff',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {listing.qualityGrade}
                      </div>
                    </div>

                    <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>{listing.cropName}</h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-muted)', marginBottom: '12px' }}>
                        Variety: {listing.variety || 'Local Hybrid'} • Harvest: {listing.harvestDate}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>Price</div>
                          <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-primary)' }}>
                            ₹{listing.pricePerUnit} / {listing.unit}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>Available Stock</div>
                          <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-secondary)' }}>
                            {listing.quantityAvailable.toLocaleString()} {listing.unit}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: 'auto',
                          paddingTop: '12px',
                          borderTop: '1px solid var(--color-border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <button
                          onClick={() => handleOpenEditModal(listing)}
                          className="btn btn-outline btn-sm"
                        >
                          <Edit size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteProduceListing(listing.id)}
                          className="btn btn-ghost btn-sm"
                          style={{ color: 'var(--color-error)' }}
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Incoming Buyer Orders */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {incomingOrders.length === 0 ? (
              <div className="card" style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--color-surface-lowest)' }}>
                <Package size={36} color="var(--color-on-surface-muted)" style={{ margin: '0 auto 12px auto' }} />
                <h3>No Buyer Orders Yet</h3>
                <p>New wholesale purchase requests will show here with one-click acceptance.</p>
              </div>
            ) : (
              incomingOrders.map((order) => (
                <div
                  key={order.id}
                  className="card"
                  style={{ padding: '24px', backgroundColor: 'var(--color-surface-lowest)' }}
                >
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
                        <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Order #{order.orderNumber}</span>
                        {order.status === 'pending' && <Badge variant="warning">Requires Acceptance</Badge>}
                        {order.status === 'accepted' && <Badge variant="primary">Accepted / Packing</Badge>}
                        {order.status === 'in_transit' && <Badge variant="terracotta">In Transit</Badge>}
                        {order.status === 'delivered' && <Badge variant="success">Completed</Badge>}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-muted)', marginTop: '4px' }}>
                        Buyer: <strong>{order.buyerName}</strong> ({order.buyerPhone}) • Deliver to: {order.deliveryAddress.city}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--color-primary)' }}>
                        ₹{order.totalProduceAmount.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary)' }}>
                        Payment: {order.paymentStatus}
                      </div>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {order.items.map((i, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          backgroundColor: 'var(--color-surface-low)',
                          borderRadius: 'var(--radius-md)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Package size={18} color="var(--color-primary)" />
                          <span style={{ fontWeight: 600 }}>{i.cropName}</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-muted)' }}>
                            ({i.quantity} {i.unit} @ ₹{i.pricePerUnit}/{i.unit})
                          </span>
                        </div>
                        <span style={{ fontWeight: 700 }}>₹{i.subtotal.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Farmer Actions for this order */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="btn btn-primary btn-sm"
                        >
                          <CheckCircle2 size={16} />
                          <span>Accept Order & Start Packing</span>
                        </button>
                        <button
                          onClick={() => handleRejectOrder(order.id)}
                          className="btn btn-ghost btn-sm"
                          style={{ color: 'var(--color-error)' }}
                        >
                          <XCircle size={16} />
                          <span>Decline Order</span>
                        </button>
                      </>
                    )}

                    {order.status === 'accepted' && (
                      <>
                        <button
                          onClick={() => setLogisticsModalOrder(order)}
                          className="btn btn-terracotta btn-sm"
                        >
                          <Truck size={16} />
                          <span>Request Pickup Hauler (Tempo/Truck)</span>
                        </button>
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, 'in_transit', 'Farmer loaded consignment on hauler vehicle.')
                          }
                          className="btn btn-outline btn-sm"
                        >
                          <FileCheck size={16} />
                          <span>Mark Consignment Dispatched</span>
                        </button>
                      </>
                    )}

                    {order.status === 'in_transit' && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={16} color="var(--color-terracotta)" />
                        <span>En route to buyer destination. Escrow will release automatically on delivery.</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: Farm Profile & Details */}
        {activeTab === 'profile' && (
          <div className="card" style={{ padding: '32px', backgroundColor: 'var(--color-surface-lowest)' }}>
            <h3 style={{ marginBottom: '16px' }}>Farm Profile & Soil Stewardship</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                marginBottom: '28px',
              }}
            >
              <div>
                <label className="form-label">Registered Cultivator</label>
                <div style={{ fontWeight: 600 }}>{currentUser?.name || 'Ramesh Patil'}</div>
              </div>
              <div>
                <label className="form-label">Primary Mobile</label>
                <div style={{ fontWeight: 600 }}>{currentUser?.phone || '+91 98220 14829'}</div>
              </div>
              <div>
                <label className="form-label">Farm Holding</label>
                <div style={{ fontWeight: 600 }}>14 Acres (Black Loam Soil)</div>
              </div>
              <div>
                <label className="form-label">Mandi Cluster</label>
                <div style={{ fontWeight: 600 }}>Pimpalgaon Baswant APMC, Nashik</div>
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-surface-container)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Organic & Quality Certifications</h4>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                Certified under Maharashtra Jaivik Krishi Mission (NPOP-compliant organic standard). Soil health card updated August 2026. Zero synthetic chemical residues on table grape and onion parcels.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Listing Modal */}
      <Modal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
        title={editingListingId ? 'Edit Harvest Listing' : 'List New Crop Harvest'}
        subtitle="Make your produce visible to thousands of retail, wholesale, and supermarket buyers."
        maxWidth="680px"
      >
        <form onSubmit={handleSaveListing} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Crop Name *</label>
              <input
                type="text"
                required
                className="form-input"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="e.g. Nashik Red Onion (Garwa)"
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Variety / Seed Spec</label>
              <input
                type="text"
                className="form-input"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. N-53 / AgriFound Light"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains & Cereals">Grains & Cereals</option>
                <option value="Pulses">Pulses</option>
                <option value="Spices">Spices</option>
                <option value="Cash Crops">Cash Crops</option>
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Quality Grade</label>
              <select
                className="form-select"
                value={qualityGrade}
                onChange={(e) => setQualityGrade(e.target.value as any)}
              >
                <option value="Grade A+ (Export)">Grade A+ (Export)</option>
                <option value="Grade A (Premium)">Grade A (Premium)</option>
                <option value="Grade B (Standard)">Grade B (Standard)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Quantity Available *</label>
              <input
                type="number"
                required
                min={1}
                className="form-input"
                value={quantityAvailable}
                onChange={(e) => setQuantityAvailable(Number(e.target.value))}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Unit *</label>
              <select
                className="form-select"
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
              >
                <option value="kg">kg</option>
                <option value="quintal">quintal (100kg)</option>
                <option value="crate">crate (25kg)</option>
                <option value="tonne">tonne</option>
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Price per Unit (₹) *</label>
              <input
                type="number"
                required
                min={1}
                className="form-input"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Min Order Quantity ({unit})</label>
              <input
                type="number"
                min={1}
                className="form-input"
                value={minOrderQuantity}
                onChange={(e) => setMinOrderQuantity(Number(e.target.value))}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Harvest Date</label>
              <input
                type="date"
                className="form-input"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Produce Description & Packaging</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mention grading, moisture condition, packaging sacks or crates..."
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Photo Image URL</label>
            <input
              type="url"
              className="form-input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isOrganic}
              onChange={(e) => setIsOrganic(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
            />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Organic / Residue-Free Farm Certified</span>
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={() => setIsListingModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingListingId ? 'Update Listing' : 'Publish Produce Listing'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Request Haulage Modal */}
      {logisticsModalOrder && (
        <Modal
          isOpen={!!logisticsModalOrder}
          onClose={() => setLogisticsModalOrder(null)}
          title={`Request Logistics Hauler — Order ${logisticsModalOrder.orderNumber}`}
          subtitle="Broadcast delivery pickup request to verified transport drivers."
          maxWidth="560px"
        >
          <form onSubmit={handleRequestHaulage} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '0.9rem', marginBottom: '14px' }}>
                Consignment: <strong>{logisticsModalOrder.items.map((i) => `${i.cropName} (${i.quantity} ${i.unit})`).join(', ')}</strong>
              </p>
              <label className="form-label">Select Required Vehicle Type</label>
              <select
                className="form-select"
                value={selectedVehicleType}
                onChange={(e) => setSelectedVehicleType(e.target.value as any)}
              >
                <option value="tempo">1.5T to 3T Tempo (Bolero Maxi Truck / Tata Ace)</option>
                <option value="truck">14ft to 19ft Container Truck (Heavy Agri Freight)</option>
                <option value="refrigerated">Insulated Reefer Van (Cold Chain 2°C - 8°C)</option>
              </select>
            </div>

            <div style={{ padding: '12px', background: 'var(--color-surface-low)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
              Pickup: Farm Gate Depot ({currentUser?.district || 'Nashik'}) → Drop: {logisticsModalOrder.deliveryAddress.city}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setLogisticsModalOrder(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Broadcast Haulage Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
