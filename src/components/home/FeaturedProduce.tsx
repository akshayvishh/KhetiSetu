import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, MapPin, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const FeaturedProduce: React.FC = () => {
  const { produceListings, addToCart } = useApp();
  const navigate = useNavigate();

  // Show up to 4 featured listings
  const featured = produceListings.slice(0, 4);

  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-surface)' }}>
      <div className="app-container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--color-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px',
              }}
            >
              Direct From Farm Gate
            </div>
            <h2>Featured Fresh Harvests</h2>
          </div>
          <Link to="/marketplace" className="btn btn-secondary">
            <span>View Full Marketplace Catalog ({produceListings.length})</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {featured.map((item) => (
            <div
              key={item.id}
              className="card card-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image banner */}
              <div
                style={{
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-surface-container)',
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.cropName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap',
                  }}
                >
                  <Badge variant="primary">{item.category}</Badge>
                  {item.isOrganic && <Badge variant="success">Organic</Badge>}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(8, 36, 26, 0.85)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {item.qualityGrade.split(' ')[0]} {item.qualityGrade.split(' ')[1]}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    marginBottom: '6px',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/marketplace?item=${item.id}`)}
                >
                  {item.cropName}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    color: 'var(--color-on-surface-variant)',
                    marginBottom: '14px',
                  }}
                >
                  <MapPin size={15} color="var(--color-secondary)" />
                  <span>
                    {item.location}, {item.district}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.825rem',
                    color: 'var(--color-on-surface-muted)',
                    marginBottom: '16px',
                    lineHeight: 1.5,
                  }}
                >
                  Farmer: <strong>{item.farmerName}</strong> • Min Order: {item.minOrderQuantity} {item.unit}
                </div>

                {/* Price & Action */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(114, 121, 116, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: 'var(--color-primary)',
                      }}
                    >
                      ₹{item.pricePerUnit.toLocaleString('en-IN')}
                      <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-on-surface-muted)' }}>
                        {' '}/ {item.unit}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--color-secondary)' }}>
                      {item.quantityAvailable.toLocaleString()} {item.unit} in stock
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(item, item.minOrderQuantity)}
                    className="btn btn-primary btn-sm"
                    title={`Add minimum ${item.minOrderQuantity} ${item.unit} to cart`}
                  >
                    <ShoppingCart size={15} />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
