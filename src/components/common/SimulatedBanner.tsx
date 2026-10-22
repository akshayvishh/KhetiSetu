import React from 'react';
import { Info, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SimulatedBanner: React.FC = () => {
  const { resetToDefaultData } = useApp();

  return (
    <div className="sim-notice">
      <Info size={15} style={{ flexShrink: 0, color: '#fdd2aa' }} />
      <span>
        <strong>Demonstration Mode:</strong> All orders, escrow payments, carrier GPS tracking, and identity verifications operate with local mock data.
      </span>
      <button
        onClick={resetToDefaultData}
        className="btn btn-ghost btn-sm"
        style={{
          color: '#ffdcbd',
          padding: '2px 8px',
          fontSize: '0.75rem',
          marginLeft: '8px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          border: '1px solid rgba(255, 220, 189, 0.3)',
          borderRadius: '4px',
        }}
        title="Reset sample agricultural data in local storage"
      >
        <RotateCcw size={12} />
        Reset Demo Data
      </button>
    </div>
  );
};
