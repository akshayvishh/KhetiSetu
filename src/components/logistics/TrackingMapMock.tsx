import React from 'react';
import { Truck, MapPin, Navigation, Compass, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import { DeliveryRequest } from '../../types';

interface TrackingMapMockProps {
  delivery: DeliveryRequest;
}

export const TrackingMapMock: React.FC<TrackingMapMockProps> = ({ delivery }) => {
  const { mockGps, pickupLocation, dropLocation, distanceKm, status } = delivery;

  // Visual position calculation
  const progress = Math.min(Math.max(mockGps.progressPercentage, 5), 95);

  return (
    <div
      className="card"
      style={{
        overflow: 'hidden',
        border: '1px solid var(--color-border-subtle)',
        backgroundColor: 'var(--color-surface-lowest)',
      }}
    >
      {/* Simulation disclaimer header */}
      <div
        style={{
          backgroundColor: '#23221c',
          color: '#f6ecd7',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '0.8rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
          <Compass size={16} color="#fdd2aa" />
          <span>SIMULATED GPS TELEMETRY (LIVE VEHICLE LOCATION MOCK)</span>
        </div>
        <div
          style={{
            backgroundColor: 'rgba(255, 220, 189, 0.2)',
            color: '#ffdcbd',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.725rem',
            fontWeight: 700,
          }}
        >
          DEMO GPS ACTIVE
        </div>
      </div>

      {/* Interactive Map Visual (Styled vector topography) */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          backgroundColor: '#e9ece6',
          backgroundImage:
            'radial-gradient(#bcc7b9 1.5px, transparent 1.5px), linear-gradient(to right, rgba(160, 175, 155, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px, 48px 48px',
          overflow: 'hidden',
        }}
      >
        {/* Curving Highway representation */}
        <svg
          viewBox="0 0 800 240"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
          preserveAspectRatio="none"
        >
          {/* Elevation / River organic contour */}
          <path
            d="M 0,160 Q 200,80 400,140 T 800,90"
            fill="none"
            stroke="#d3ded0"
            strokeWidth="32"
          />
          {/* Main Highway Route */}
          <path
            d="M 50,180 Q 250,60 500,160 T 750,80"
            fill="none"
            stroke="#8c9c8a"
            strokeWidth="8"
            strokeDasharray="6,4"
          />
          {/* Traveled portion highlight */}
          <path
            d="M 50,180 Q 250,60 500,160 T 750,80"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="8"
            strokeDasharray={`${(progress / 100) * 800}, 800`}
          />
        </svg>

        {/* Start Point Pin (Farmer Gate) */}
        <div
          style={{
            position: 'absolute',
            left: '8%',
            top: '65%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              margin: '0 auto',
            }}
          >
            <MapPin size={16} />
          </div>
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: 700,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              marginTop: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            {pickupLocation.district}
          </div>
        </div>

        {/* Current Moving Vehicle Pin */}
        <div
          style={{
            position: 'absolute',
            left: `${progress}%`,
            top: `${progress < 50 ? 55 - (progress / 50) * 15 : 40 + ((progress - 50) / 50) * 20}%`,
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            transition: 'left 0.5s ease',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-terracotta)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(200, 106, 61, 0.5)',
              margin: '0 auto',
              border: '2px solid #ffffff',
            }}
          >
            <Truck size={20} />
          </div>
          <div
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.7rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              marginTop: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            {mockGps.speedKmH > 0 ? `${mockGps.speedKmH} km/h` : 'At Bay'}
          </div>
        </div>

        {/* End Point Pin (Buyer Mandi) */}
        <div
          style={{
            position: 'absolute',
            right: '8%',
            top: '30%',
            transform: 'translate(50%, -50%)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-secondary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              margin: '0 auto',
            }}
          >
            <Navigation size={15} />
          </div>
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: 700,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              marginTop: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            {dropLocation.district}
          </div>
        </div>
      </div>

      {/* Telemetry Stats Panel */}
      <div
        style={{
          padding: '18px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px',
          borderTop: '1px solid var(--color-border-subtle)',
          backgroundColor: 'var(--color-surface-low)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
            Current Landmark
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)', marginTop: '2px' }}>
            {mockGps.currentLocationName}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
            Estimated Arrival
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-terracotta)', marginTop: '2px' }}>
            {mockGps.etaMinutes > 0 ? `In ~${mockGps.etaMinutes} mins` : 'Completed'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
            Total Transit Distance
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-on-surface)', marginTop: '2px' }}>
            {distanceKm} km (Corridor Route)
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase' }}>
            Consignment Status
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)', marginTop: '2px' }}>
            {status.toUpperCase().replace('_', ' ')}
          </div>
        </div>
      </div>
    </div>
  );
};
