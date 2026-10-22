import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sprout,
  ShoppingCart,
  Menu,
  X,
  Truck,
  Briefcase,
  Store,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { currentUser, switchRole, logout, cartTotalItemsCount } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: 'rgba(253, 249, 240, 0.96)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div
        className="app-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          paddingBottom: '14px',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Sprout size={22} />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--color-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                display: 'block',
              }}
            >
              KHETISETU
            </span>
            <span
              style={{
                fontSize: '0.675rem',
                color: 'var(--color-secondary)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
              }}
            >
              Connecting Farmers to Buyers
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          <Link
            to="/marketplace"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.925rem',
              color: isActive('/marketplace') ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              borderBottom: isActive('/marketplace') ? '2px solid var(--color-primary)' : '2px solid transparent',
              paddingBottom: '4px',
            }}
          >
            <Store size={17} />
            Marketplace
          </Link>

          <Link
            to="/logistics"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.925rem',
              color: isActive('/logistics') ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              borderBottom: isActive('/logistics') ? '2px solid var(--color-primary)' : '2px solid transparent',
              paddingBottom: '4px',
            }}
          >
            <Truck size={17} />
            Logistics Fleet
          </Link>

          <Link
            to="/jobs"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.925rem',
              color: isActive('/jobs') ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
              borderBottom: isActive('/jobs') ? '2px solid var(--color-primary)' : '2px solid transparent',
              paddingBottom: '4px',
            }}
          >
            <Briefcase size={17} />
            Agri Jobs
          </Link>

          {/* Role-Specific quick link */}
          {currentUser?.role === 'farmer' && (
            <Link
              to="/farmer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
                fontSize: '0.925rem',
                color: isActive('/farmer') ? 'var(--color-primary)' : 'var(--color-secondary)',
                borderBottom: isActive('/farmer') ? '2px solid var(--color-primary)' : '2px solid transparent',
                paddingBottom: '4px',
              }}
            >
              <LayoutDashboard size={17} />
              Farmer Portal
            </Link>
          )}

          {currentUser?.role === 'admin' && (
            <Link
              to="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
                fontSize: '0.925rem',
                color: isActive('/admin') ? 'var(--color-primary)' : 'var(--color-terracotta)',
                borderBottom: isActive('/admin') ? '2px solid var(--color-primary)' : '2px solid transparent',
                paddingBottom: '4px',
              }}
            >
              <ShieldCheck size={17} />
              Admin
            </Link>
          )}
        </nav>

        {/* Right Actions: Cart & Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="btn btn-outline"
            style={{
              position: 'relative',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-md)',
            }}
            title="View Purchase Order Cart"
          >
            <ShoppingCart size={19} color="var(--color-primary)" />
            {cartTotalItemsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  backgroundColor: 'var(--color-terracotta)',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartTotalItemsCount}
              </span>
            )}
          </Link>

          {/* Role Switcher & User Profile Pill */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="btn btn-outline"
              style={{
                padding: '6px 12px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: currentUser ? 'var(--color-surface-low)' : 'var(--color-surface-lowest)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: currentUser ? 'var(--color-success)' : 'var(--color-on-surface-muted)',
                }}
              />
              <span style={{ fontWeight: 600 }}>
                {currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : 'Select Role'}
              </span>
              <ChevronDown size={14} />
            </button>

            {/* Dropdown Menu */}
            {roleDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '270px',
                  backgroundColor: 'var(--color-surface-lowest)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-soil-lg)',
                  border: '1px solid var(--color-border-subtle)',
                  padding: '12px',
                  zIndex: 999,
                }}
              >
                <div
                  style={{
                    fontSize: '0.725rem',
                    textTransform: 'uppercase',
                    color: 'var(--color-on-surface-muted)',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    padding: '4px 8px 8px 8px',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}
                >
                  Quick Demo Role Switcher
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                  <button
                    onClick={() => handleRoleSelect('farmer')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: currentUser?.role === 'farmer' ? 'var(--color-surface-container)' : 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Farmer (Ramesh)</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>Nashik Onion & Crop Grower</div>
                    </div>
                    {currentUser?.role === 'farmer' && <UserCheck size={16} color="var(--color-primary)" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('buyer')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: currentUser?.role === 'buyer' ? 'var(--color-surface-container)' : 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Buyer (Anand)</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>Vashi Wholesale Trader</div>
                    </div>
                    {currentUser?.role === 'buyer' && <UserCheck size={16} color="var(--color-primary)" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('delivery')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: currentUser?.role === 'delivery' ? 'var(--color-surface-container)' : 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Delivery (Sachin)</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>MH-15 Tempo Driver</div>
                    </div>
                    {currentUser?.role === 'delivery' && <UserCheck size={16} color="var(--color-primary)" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('admin')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: currentUser?.role === 'admin' ? 'var(--color-surface-container)' : 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Platform Admin</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>State Agri Operations</div>
                    </div>
                    {currentUser?.role === 'admin' && <UserCheck size={16} color="var(--color-primary)" />}
                  </button>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border-subtle)', marginTop: '8px', paddingTop: '8px' }}>
                  <Link
                    to="/auth"
                    onClick={() => setRoleDropdownOpen(false)}
                    style={{
                      display: 'block',
                      padding: '6px 10px',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      color: 'var(--color-primary)',
                    }}
                  >
                    Custom Login / Sign Up Form →
                  </Link>
                  {currentUser && (
                    <button
                      onClick={() => {
                        logout();
                        setRoleDropdownOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        width: '100%',
                        padding: '6px 10px',
                        fontSize: '0.825rem',
                        color: 'var(--color-error)',
                        marginTop: '4px',
                      }}
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost mobile-toggle"
            style={{ padding: '8px' }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface-lowest)',
            borderBottom: '1px solid var(--color-border-subtle)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Link
            to="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '8px', fontWeight: 600 }}
          >
            🛒 Marketplace
          </Link>
          <Link
            to="/logistics"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '8px', fontWeight: 600 }}
          >
            🚚 Logistics Fleet
          </Link>
          <Link
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '8px', fontWeight: 600 }}
          >
            💼 Agricultural Jobs
          </Link>
          <Link
            to="/farmer"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '8px', fontWeight: 600 }}
          >
            🌾 Farmer Dashboard
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '8px', fontWeight: 600 }}
          >
            🛡️ Admin Panel
          </Link>
          <Link
            to="/auth"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '8px', fontWeight: 600, color: 'var(--color-terracotta)' }}
          >
            🔐 Auth & Registration
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
