import React from 'react';
import { MandiTicker } from '../components/home/MandiTicker';
import { HeroSection } from '../components/home/HeroSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { FeaturedProduce } from '../components/home/FeaturedProduce';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { Link } from 'react-router-dom';
import { Truck, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* 1. Mandi Ticker */}
      <MandiTicker />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Featured Produce Showcase */}
      <FeaturedProduce />

      {/* 4. How It Works (For Farmers, Buyers, Haulers) */}
      <HowItWorks />

      {/* 5. Core Benefits Bento Grid */}
      <BenefitsSection />

      {/* 6. Dual Platform Teasers: Logistics Fleet & Farm Jobs */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-surface)' }}>
        <div className="app-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {/* Logistics Card */}
            <div
              className="card"
              style={{
                padding: '36px',
                backgroundColor: 'var(--color-surface-low)',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-surface-container)',
                    color: 'var(--color-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  <Truck size={15} />
                  Freight & Reefer Services
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
                  Need to Transport 50 Crates to Vashi Mandi?
                </h3>
                <p style={{ lineHeight: 1.6, marginBottom: '20px' }}>
                  Avoid high spot rates with local middlemen brokers. Match directly with verified tempo owners and refrigerated containers moving on daily Maharashtra agricultural corridors.
                </p>
              </div>

              <Link to="/logistics" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <span>Access Logistics Fleet</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Farm Jobs Card */}
            <div
              className="card"
              style={{
                padding: '36px',
                backgroundColor: 'var(--color-surface-low)',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-surface-container)',
                    color: 'var(--color-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  <Users size={15} />
                  Rural Workforce Hub
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
                  Looking for Skilled Harvesters or Equipment?
                </h3>
                <p style={{ lineHeight: 1.6, marginBottom: '20px' }}>
                  Post seasonal labor requirements, hire tractor and rotavator operators, or apply for verified rural driving positions with clear daily wage terms.
                </p>
              </div>

              <Link to="/jobs" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
                <span>Browse Agricultural Jobs</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Trust & Action Banner */}
      <section
        style={{
          padding: '64px 0',
          backgroundColor: 'var(--color-primary)',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div className="app-container" style={{ maxWidth: '780px' }}>
          <ShieldCheck size={40} color="#cbead9" style={{ margin: '0 auto 16px auto' }} />
          <h2 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '14px' }}>
            Ready to experience fair, direct agricultural trade?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', marginBottom: '28px' }}>
            Join over 1,200 growers and wholesale merchants who have eliminated middleman commissions across Maharashtra.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/marketplace" className="btn btn-sm" style={{ backgroundColor: '#ffffff', color: 'var(--color-primary)', fontWeight: 700, padding: '12px 24px' }}>
              Browse Fresh Produce
            </Link>
            <Link to="/auth" className="btn btn-secondary btn-sm" style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)', padding: '12px 24px' }}>
              Create Account Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
