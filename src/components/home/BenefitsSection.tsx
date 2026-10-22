import React from 'react';
import { ShieldCheck, Truck, Users, Coins, ArrowUpRight, Scale, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BenefitsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-surface-container)' }}>
      <div className="app-container">
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 56px auto' }}>
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
            Why KhetiSetu
          </div>
          <h2>Re-architecting Agricultural Trade</h2>
          <p>
            Eliminating the traditional 6-layer supply bottleneck to bring predictability, freshness, and profitability to Indian agriculture.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px',
          }}
        >
          {/* Card 1: Zero Commission */}
          <div
            className="card card-primary"
            style={{
              gridColumn: 'span 12',
              padding: '36px',
              borderRadius: 'var(--radius-2xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Coins size={26} color="#cbead9" />
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '12px' }}>
                Zero Commission. 100% Direct Realization.
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Traditional mandi middlemen claim between 8% to 18% in arhatiya fees, weighbridge cuts, and unrecorded cash deductions. On KhetiSetu, you trade at 0% platform take-rate, keeping full value in farmers’ and buyers’ hands.
              </p>
            </div>
            <div style={{ marginTop: '28px' }}>
              <button
                onClick={() => navigate('/farmer')}
                className="btn btn-sm"
                style={{
                  backgroundColor: '#ffffff',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  padding: '10px 20px',
                }}
              >
                <span>Start Selling as a Farmer</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2: Logistics & Haulage */}
          <div
            className="card bento-half"
            style={{
              gridColumn: 'span 6',
              padding: '32px',
              backgroundColor: 'var(--color-surface-lowest)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-surface-low)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Truck size={24} color="var(--color-primary)" />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Integrated Rural Logistics Fleet</h3>
            <p style={{ fontSize: '0.925rem', marginBottom: '20px', lineHeight: 1.5 }}>
              On-demand booking of verified 1.5-ton tempos, 14ft container trucks, and refrigerated reefer haulers with mock GPS telemetry and digital e-Way bill attachments.
            </p>
            <button
              onClick={() => navigate('/logistics')}
              className="btn btn-outline btn-sm"
            >
              <span>Explore Logistics Hub</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Card 3: Agricultural Workforce & Jobs */}
          <div
            className="card bento-half"
            style={{
              gridColumn: 'span 6',
              padding: '32px',
              backgroundColor: 'var(--color-surface-lowest)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-surface-low)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Users size={24} color="var(--color-secondary)" />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Farm Workforce & Equipment Services</h3>
            <p style={{ fontSize: '0.925rem', marginBottom: '20px', lineHeight: 1.5 }}>
              Connect with seasonal harvest crews, tractor/tempo rentals, and drone spraying technicians during peak harvesting windows when local labor is hard to find.
            </p>
            <button
              onClick={() => navigate('/jobs')}
              className="btn btn-outline btn-sm"
            >
              <span>View Agri Jobs</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .bento-half {
            grid-column: span 12 !important;
          }
        }
        @media (min-width: 821px) {
          .bento-half {
            grid-column: span 6 !important;
          }
        }
      `}</style>
    </section>
  );
};
