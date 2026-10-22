import React, { useState } from 'react';
import { Sprout, ShoppingBag, Truck, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'farmers' | 'buyers' | 'logistics'>('farmers');

  const farmerSteps = [
    {
      step: '01',
      title: 'List Your Harvest',
      desc: 'Input crop variety, quantity, harvest date, location, and your desired price in ₹ per quintal or kg.',
    },
    {
      step: '02',
      title: 'Receive Direct Orders',
      desc: 'Connect with verified wholesale traders, supermarket chains, and food processing companies without middleman cuts.',
    },
    {
      step: '03',
      title: 'Farm Gate Loading',
      desc: 'Scheduled pickup vehicle arrives right at your farm shed. Goods weighed and digitally signed for.',
    },
    {
      step: '04',
      title: 'Guaranteed Payout',
      desc: 'Escrow payment released directly to your bank account upon delivery confirmation.',
    },
  ];

  const buyerSteps = [
    {
      step: '01',
      title: 'Source Fresh from Source',
      desc: 'Browse live inventory directly from Nashik, Pune, Baramati, and Sangli growers.',
    },
    {
      step: '02',
      title: 'Quality Grade Transparency',
      desc: 'View detailed crop specs, harvest photos, organic certification badges, and sample reports.',
    },
    {
      step: '03',
      title: 'Protected Escrow Order',
      desc: 'Place orders with transparent simulated escrow payment held secure until you inspect delivery.',
    },
    {
      step: '04',
      title: 'Live Shipment Tracking',
      desc: 'Monitor carrier speed, toll crossings, and estimated time of arrival right to your mandi stall or warehouse.',
    },
  ];

  const logisticsSteps = [
    {
      step: '01',
      title: 'View Open Freight Loads',
      desc: 'Browse pickup requests sorted by vehicle type (Tempo, 14ft Truck, or Refrigerated Reefer).',
    },
    {
      step: '02',
      title: 'Zero Dead-Mileage Trips',
      desc: 'Book return-journey backloads between agricultural centers and major urban consumer hubs.',
    },
    {
      step: '03',
      title: 'Paperless Documentation',
      desc: 'Upload e-Way bill, weighbridge slips, and digital LR (Lorry Receipt) directly through your phone.',
    },
    {
      step: '04',
      title: 'Fast Freight Clearance',
      desc: 'Automated freight settlement triggered as soon as recipient confirms digital proof of delivery.',
    },
  ];

  const currentSteps =
    activeTab === 'farmers' ? farmerSteps : activeTab === 'buyers' ? buyerSteps : logisticsSteps;

  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-surface-low)' }}>
      <div className="app-container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <h2 style={{ marginBottom: '14px' }}>How KhetiSetu Works</h2>
          <p>
            An interconnected agricultural ecosystem bridging growers, buyers, and rural logistics haulers in four simple steps.
          </p>

          {/* Interactive Role Switcher Tabs */}
          <div
            style={{
              display: 'inline-flex',
              padding: '6px',
              backgroundColor: 'var(--color-surface-container)',
              borderRadius: 'var(--radius-full)',
              marginTop: '28px',
              gap: '4px',
            }}
          >
            <button
              onClick={() => setActiveTab('farmers')}
              className="btn btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                backgroundColor: activeTab === 'farmers' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'farmers' ? '#ffffff' : 'var(--color-on-surface-variant)',
              }}
            >
              <Sprout size={16} />
              <span>For Farmers</span>
            </button>
            <button
              onClick={() => setActiveTab('buyers')}
              className="btn btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                backgroundColor: activeTab === 'buyers' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'buyers' ? '#ffffff' : 'var(--color-on-surface-variant)',
              }}
            >
              <ShoppingBag size={16} />
              <span>For Buyers</span>
            </button>
            <button
              onClick={() => setActiveTab('logistics')}
              className="btn btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                backgroundColor: activeTab === 'logistics' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'logistics' ? '#ffffff' : 'var(--color-on-surface-variant)',
              }}
            >
              <Truck size={16} />
              <span>For Logistics Haulers</span>
            </button>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {currentSteps.map((item, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '32px 24px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: 'var(--color-secondary-container)',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  {item.step}
                </span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{item.desc}</p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-secondary)',
                }}
              >
                <CheckCircle2 size={16} color="var(--color-primary)" />
                <span>Verified Workflow</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
