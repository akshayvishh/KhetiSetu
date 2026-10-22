import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowRight, ShieldCheck, PhoneCall, Mail, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('warning', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }
    showToast('success', 'Subscribed', `You will receive seasonal mandi price bulletins at ${email}.`);
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface-container)',
        borderRadius: '40px 40px 0 0',
        marginTop: '64px',
        borderTop: '1px solid var(--color-border-subtle)',
        paddingTop: '64px',
        paddingBottom: '40px',
      }}
    >
      <div className="app-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Sprout size={20} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                KHETISETU
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.6 }}>
              Direct agricultural trade infrastructure linking verified cultivators with wholesale buyers, food processors, and cold-chain freight networks.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--color-secondary)" />
                <span>Maharashtra Agri-Hub, Shivaji Nagar, Pune</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={16} color="var(--color-secondary)" />
                <span>+91 1800 233 4560 (Kisan Support Desk)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--color-secondary)" />
                <span>contact@khetisetu.in</span>
              </div>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px' }}>Platform Modules</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
              <li>
                <Link to="/marketplace" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>
                  🌾 Fresh Produce Marketplace
                </Link>
              </li>
              <li>
                <Link to="/logistics" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>
                  🚚 Dedicated Logistics & Reefer Haulage
                </Link>
              </li>
              <li>
                <Link to="/jobs" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>
                  👨‍🌾 Agricultural Workforce & Equipment Jobs
                </Link>
              </li>
              <li>
                <Link to="/farmer" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>
                  📊 Farmer Dashboard & Inventory
                </Link>
              </li>
              <li>
                <Link to="/admin" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem' }}>
                  🛡️ Admin Moderation Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Corridors */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px' }}>Direct Supply Corridors</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <div style={{ padding: '8px 12px', background: 'var(--color-surface-lowest)', borderRadius: 'var(--radius-md)' }}>
                <strong>Nashik – Mumbai Express</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>Onions, Table Grapes, Green Chillies</div>
              </div>
              <div style={{ padding: '8px 12px', background: 'var(--color-surface-lowest)', borderRadius: 'var(--radius-md)' }}>
                <strong>Pune – Navi Mumbai Corridor</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>Pomegranates, Greenhouse Veggies</div>
              </div>
              <div style={{ padding: '8px 12px', background: 'var(--color-surface-lowest)', borderRadius: 'var(--radius-md)' }}>
                <strong>Sangli – Kolhapur Basin</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)' }}>Salem Turmeric, Jaggery & Cane</div>
              </div>
            </div>
          </div>

          {/* Newsletter / Bulletin */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px' }}>Kisan Mandi Bulletin</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '14px' }}>
              Get weekly Maharashtra mandi modal prices, rainfall alerts, and wholesale crop demand forecasts.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your phone or email..."
                className="form-input"
                style={{ backgroundColor: 'var(--color-surface-lowest)' }}
                required
              />
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <span>Subscribe Free</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & simulation note */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.825rem',
            color: 'var(--color-on-surface-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} KHETISETU AGRI-DIGITAL PLATFORM. CONNECTING FARMERS DIRECTLY TO BUYERS.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="var(--color-success)" />
              Zero Middleman Commission Policy
            </span>
            <span>•</span>
            <Link to="/auth" style={{ textDecoration: 'underline' }}>
              Account Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
