import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Sprout,
  Truck,
  Briefcase,
  Package,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Search,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Badge } from '../components/common/Badge';

export const AdminPage: React.FC = () => {
  const {
    users,
    produceListings,
    orders,
    deliveries,
    jobs,
    toggleUserVerification,
    deleteProduceListing,
    resetToDefaultData,
    showToast,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'users' | 'listings' | 'deliveries'>('overview');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');
  const [userSearch, setUserSearch] = useState('');

  // Metrics
  const totalFarmers = users.filter((u) => u.role === 'farmer').length;
  const totalBuyers = users.filter((u) => u.role === 'buyer').length;
  const totalDelivery = users.filter((u) => u.role === 'delivery').length;

  const totalCommodityValue = produceListings.reduce(
    (sum, p) => sum + p.pricePerUnit * p.quantityAvailable,
    0
  );

  const completedOrders = orders.filter((o) => o.status === 'delivered').length;

  // Filtered users
  const filteredUsers = users.filter((u) => {
    if (userRoleFilter !== 'all' && u.role !== userRoleFilter) return false;
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q) ||
        u.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '36px 0 64px 0' }}>
      <div className="app-container">
        {/* Admin Header */}
        <div
          className="card"
          style={{
            padding: '24px 28px',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={28} color="#cbead9" />
              </div>
              <div>
                <h1 style={{ fontSize: '1.6rem', color: '#ffffff', margin: 0 }}>
                  KhetiSetu Platform Administration
                </h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', marginTop: '2px' }}>
                  State Agri-Operations Portal • User Verification & Trade Moderation
                </p>
              </div>
            </div>

            <button
              onClick={resetToDefaultData}
              className="btn btn-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              title="Reset all localStorage records to defaults"
            >
              <RotateCcw size={15} />
              <span>Reset Demo Database</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
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
            onClick={() => setActiveAdminTab('overview')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeAdminTab === 'overview' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeAdminTab === 'overview' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeAdminTab === 'overview' ? 700 : 500,
            }}
          >
            Operations Overview
          </button>

          <button
            onClick={() => setActiveAdminTab('users')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeAdminTab === 'users' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeAdminTab === 'users' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeAdminTab === 'users' ? 700 : 500,
            }}
          >
            User Verification ({users.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('listings')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeAdminTab === 'listings' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeAdminTab === 'listings' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeAdminTab === 'listings' ? 700 : 500,
            }}
          >
            Produce Catalog Moderation ({produceListings.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('deliveries')}
            className="btn btn-sm"
            style={{
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeAdminTab === 'deliveries' ? 'var(--color-primary)' : 'var(--color-surface-low)',
              color: activeAdminTab === 'deliveries' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: activeAdminTab === 'deliveries' ? 700 : 500,
            }}
          >
            Freight & Logistics Oversight ({deliveries.length})
          </button>
        </div>

        {/* SECTION 1: Operations Overview */}
        {activeAdminTab === 'overview' && (
          <div>
            {/* Stat Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginBottom: '32px',
              }}
            >
              <div className="card" style={{ padding: '20px', backgroundColor: 'var(--color-surface-lowest)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Users size={18} color="var(--color-primary)" />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                    Cultivator Network
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800 }}>
                  {totalFarmers} Farmers
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '4px' }}>
                  Nashik, Pune, Sangli belts
                </div>
              </div>

              <div className="card" style={{ padding: '20px', backgroundColor: 'var(--color-surface-lowest)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Package size={18} color="var(--color-secondary)" />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                    Active Wholesale Buyers
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800 }}>
                  {totalBuyers} Accounts
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', marginTop: '4px' }}>
                  Vashi APMC & Supermarket chains
                </div>
              </div>

              <div className="card" style={{ padding: '20px', backgroundColor: 'var(--color-surface-lowest)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Truck size={18} color="var(--color-terracotta)" />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                    Haulage Drivers
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800 }}>
                  {totalDelivery} Carriers
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', marginTop: '4px' }}>
                  Tempos, Trucks & Reefer vans
                </div>
              </div>

              <div className="card" style={{ padding: '20px', backgroundColor: 'var(--color-surface-lowest)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Sprout size={18} color="var(--color-primary)" />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
                    Listed Trade Volume
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  ₹{(totalCommodityValue / 100000).toFixed(2)} Lakhs
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', marginTop: '4px' }}>
                  {produceListings.length} distinct harvests
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface-lowest)', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Live Order Pipeline</h3>
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Buyer</th>
                      <th>Crops</th>
                      <th>Amount</th>
                      <th>Escrow Status</th>
                      <th>Fulfillment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td style={{ fontWeight: 700 }}>{o.orderNumber}</td>
                        <td>{o.buyerName}</td>
                        <td>{o.items.map((i) => i.cropName).join(', ')}</td>
                        <td style={{ fontWeight: 700 }}>₹{o.grandTotal.toLocaleString('en-IN')}</td>
                        <td>
                          <Badge variant="primary">{o.paymentStatus}</Badge>
                        </td>
                        <td>
                          <Badge
                            variant={
                              o.status === 'delivered'
                                ? 'success'
                                : o.status === 'in_transit'
                                ? 'terracotta'
                                : 'warning'
                            }
                          >
                            {o.status.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: User Verification Management */}
        {activeAdminTab === 'users' && (
          <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface-lowest)' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.2rem' }}>Registered Agricultural Participants</h3>
                <p style={{ fontSize: '0.85rem' }}>
                  Verify grower farm holdings and commercial driver licenses to uphold platform trust.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Search user..."
                  className="form-input"
                  style={{ width: '180px', padding: '6px 10px', fontSize: '0.85rem' }}
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
                <select
                  className="form-select"
                  style={{ width: 'auto', padding: '6px 10px', fontSize: '0.85rem' }}
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="farmer">Farmers</option>
                  <option value="buyer">Buyers</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Participant</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Holding / Vehicle</th>
                    <th>Verification</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{u.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>
                          {u.phone} • {u.email}
                        </div>
                      </td>
                      <td>
                        <Badge variant={u.role === 'farmer' ? 'primary' : u.role === 'buyer' ? 'secondary' : 'terracotta'}>
                          {u.role.toUpperCase()}
                        </Badge>
                      </td>
                      <td>
                        {u.location}, {u.district}
                      </td>
                      <td style={{ fontSize: '0.825rem' }}>
                        {u.role === 'farmer' && `${u.farmSizeAcres || 10} Acres (${u.farmName || 'Farm'})`}
                        {u.role === 'buyer' && (u.businessName || 'Wholesale Buyer')}
                        {u.role === 'delivery' && (u.vehicleNumber || 'Commercial Tempo')}
                        {u.role === 'admin' && 'State Authority'}
                      </td>
                      <td>
                        {u.isVerified ? (
                          <span className="badge badge-verified">Verified</span>
                        ) : (
                          <span className="badge badge-warning">Pending Review</span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => toggleUserVerification(u.id)}
                          className="btn btn-outline btn-sm"
                        >
                          {u.isVerified ? 'Revoke Status' : 'Grant Verified Badge'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 3: Produce Catalog Moderation */}
        {activeAdminTab === 'listings' && (
          <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface-lowest)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Marketplace Produce Listings</h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '20px' }}>
              Remove reported spam, out-of-stock lots, or misleading pricing entries.
            </p>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Farmer</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Available Stock</th>
                    <th>Quality</th>
                    <th>Moderate</th>
                  </tr>
                </thead>
                <tbody>
                  {produceListings.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 700 }}>{p.cropName}</td>
                      <td>
                        {p.farmerName} ({p.district})
                      </td>
                      <td>
                        <Badge variant="primary">{p.category}</Badge>
                      </td>
                      <td style={{ fontWeight: 700 }}>₹{p.pricePerUnit} / {p.unit}</td>
                      <td>{p.quantityAvailable.toLocaleString()} {p.unit}</td>
                      <td>{p.qualityGrade}</td>
                      <td>
                        <button
                          onClick={() => deleteProduceListing(p.id)}
                          className="btn btn-ghost btn-sm"
                          style={{ color: 'var(--color-error)' }}
                        >
                          Delete Entry
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 4: Logistics Oversight */}
        {activeAdminTab === 'deliveries' && (
          <div className="card" style={{ padding: '24px', backgroundColor: 'var(--color-surface-lowest)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Freight Corridors Oversight</h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '20px' }}>
              Monitor active transit dispatches, driver assignments, and document uploads.
            </p>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Delivery #</th>
                    <th>Consignment</th>
                    <th>Origin → Destination</th>
                    <th>Distance</th>
                    <th>Vehicle</th>
                    <th>LR & Weighbridge</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((d) => (
                    <tr key={d.id}>
                      <td style={{ fontWeight: 700 }}>{d.orderNumber}</td>
                      <td>{d.cropDetails}</td>
                      <td>
                        {d.pickupLocation.district} → {d.dropLocation.district}
                      </td>
                      <td>{d.distanceKm} km</td>
                      <td>{d.vehicleTypeRequired.toUpperCase()}</td>
                      <td>
                        {d.documents.lrCopyUploaded ? (
                          <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Attached</span>
                        ) : (
                          <span style={{ color: 'var(--color-warning)' }}>Pending</span>
                        )}
                      </td>
                      <td>
                        <Badge
                          variant={
                            d.status === 'delivered'
                              ? 'success'
                              : d.status === 'in_transit'
                              ? 'terracotta'
                              : 'warning'
                          }
                        >
                          {d.status.toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
