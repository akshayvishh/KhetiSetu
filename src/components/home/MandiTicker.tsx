import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MandiTicker: React.FC = () => {
  const { mandiRates } = useApp();

  return (
    <div
      style={{
        backgroundColor: 'var(--color-primary)',
        color: '#ffffff',
        padding: '10px 0',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="app-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-terracotta)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.725rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              flexShrink: 0,
            }}
          >
            APMC Today
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingBottom: '2px',
            }}
          >
            {mandiRates.map((rate, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.825rem',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--color-primary-fixed)' }}>
                  {rate.crop}
                </span>
                <span style={{ opacity: 0.75, fontSize: '0.75rem' }}>({rate.market.split(' ')[0]})</span>
                <span style={{ fontWeight: 700 }}>
                  ₹{rate.modalPrice.toLocaleString('en-IN')}{' '}
                  <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.8 }}>/ Qtl</span>
                </span>
                {rate.trend === 'up' && (
                  <span style={{ color: '#81c784', display: 'inline-flex', alignItems: 'center', fontSize: '0.75rem' }}>
                    <TrendingUp size={14} /> +{rate.changePercent}%
                  </span>
                )}
                {rate.trend === 'down' && (
                  <span style={{ color: '#e57373', display: 'inline-flex', alignItems: 'center', fontSize: '0.75rem' }}>
                    <TrendingDown size={14} /> {rate.changePercent}%
                  </span>
                )}
                {rate.trend === 'stable' && (
                  <span style={{ color: '#fff59d', display: 'inline-flex', alignItems: 'center', fontSize: '0.75rem' }}>
                    <Minus size={14} /> 0.0%
                  </span>
                )}
                <span style={{ opacity: 0.25, marginLeft: '12px' }}>|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
