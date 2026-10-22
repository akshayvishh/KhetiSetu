import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Truck, Users, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?query=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/marketplace');
    }
  };

  const handleCropTagClick = (tag: string) => {
    navigate(`/marketplace?query=${encodeURIComponent(tag)}`);
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-surface)',
        paddingTop: '64px',
        paddingBottom: '80px',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      {/* Background Subtle Gradient & Agricultural Motif */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          backgroundImage:
            'radial-gradient(circle at 70% 30%, rgba(203, 234, 217, 0.45) 0%, rgba(253, 249, 240, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="app-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
          {/* Badge Tagline */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-fixed)',
              color: 'var(--color-primary)',
              fontSize: '0.825rem',
              fontWeight: 700,
              marginBottom: '20px',
              boxShadow: 'var(--shadow-soil-sm)',
            }}
          >
            <Sparkles size={16} />
            <span>Farm Gate to Market — Zero Middlemen</span>
          </div>

          {/* Main Display Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 5.2vw, 3.8rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              color: 'var(--color-primary)',
              marginBottom: '20px',
              letterSpacing: '-0.025em',
            }}
          >
            Connecting Farmers Directly to Buyers
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--color-on-surface-variant)',
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto 36px auto',
            }}
          >
            Empowering Maharashtra growers with direct wholesale price realization, verified APMC buyers, scheduled farm-gate logistics pickups, and agricultural labor services.
          </p>

          {/* Unified Search Bar */}
          <div
            className="card"
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-soil-md)',
              maxWidth: '680px',
              margin: '0 auto 28px auto',
              backgroundColor: 'var(--color-surface-lowest)',
            }}
          >
            <form
              onSubmit={handleSearchSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Search size={22} color="var(--color-primary)" style={{ marginLeft: '6px', flexShrink: 0 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops e.g. Nashik Onion, Bhagwa Pomegranate, Sharbati Wheat..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  padding: '8px 4px',
                  fontSize: '1rem',
                  backgroundColor: 'transparent',
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 22px' }}>
                <span>Search</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Quick Filter Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
                marginTop: '10px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(114, 121, 116, 0.15)',
                fontSize: '0.825rem',
              }}
            >
              <span style={{ color: 'var(--color-on-surface-muted)', fontWeight: 600 }}>Popular:</span>
              {['Nashik Onion', 'Bhagwa Pomegranate', 'Plum Tomatoes', 'Sharbati Wheat', 'Green Chillies', 'Salem Turmeric'].map(
                (crop) => (
                  <button
                    key={crop}
                    onClick={() => handleCropTagClick(crop)}
                    className="btn btn-ghost btn-sm"
                    style={{
                      padding: '3px 9px',
                      fontSize: '0.78rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-surface-low)',
                    }}
                  >
                    {crop}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '14px',
            }}
          >
            <button onClick={() => navigate('/marketplace')} className="btn btn-primary btn-lg">
              Explore Produce Marketplace
            </button>
            <button onClick={() => navigate('/farmer')} className="btn btn-secondary btn-lg">
              Farmer Inventory Portal
            </button>
            <button onClick={() => navigate('/logistics')} className="btn btn-outline btn-lg">
              <Truck size={18} />
              <span>Book Haulage</span>
            </button>
          </div>
        </div>

        {/* Highlight Stats Bar */}
        <div
          className="card"
          style={{
            marginTop: '56px',
            padding: '24px 32px',
            backgroundColor: 'var(--color-surface-container)',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                }}
              >
                100% Direct
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                Direct Kisan-to-Buyer Dealings
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: 'var(--color-secondary)',
                }}
              >
                ₹0 Commission
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                Zero Cuts on Farmer Realization
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                }}
              >
                185+ km
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                Cold-Chain & Tempo Network
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: 'var(--color-terracotta)',
                }}
              >
                100% Escrow
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                Secured Payout on Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
