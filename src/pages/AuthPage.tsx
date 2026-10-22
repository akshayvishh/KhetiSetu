import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  ShoppingBag,
  Truck,
  ShieldCheck,
  UserCheck,
  Lock,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  KeyRound,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const AuthPage: React.FC = () => {
  const { registerUser, setCurrentUser, users, showToast } = useApp();
  const navigate = useNavigate();

  // Mode: login | signup | forgot | reset
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | 'reset'>('login');

  // Login state
  const [loginPhone, setLoginPhone] = useState('+91 98220 14829'); // Pre-filled with Ramesh Patil for immediate test ease
  const [loginPassword, setLoginPassword] = useState('kheti123');

  // Role Selection for signup
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | 'delivery'>('farmer');

  // Common Registration Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('Nashik');
  const [password, setPassword] = useState('');

  // Farmer specific fields
  const [farmName, setFarmName] = useState('');
  const [farmSizeAcres, setFarmSizeAcres] = useState<number>(10);
  const [primaryCrops, setPrimaryCrops] = useState('Onions, Tomatoes');

  // Buyer specific fields
  const [businessName, setBusinessName] = useState('');
  const [buyerType, setBuyerType] = useState<'wholesale' | 'retailer' | 'processor' | 'restaurant'>('wholesale');

  // Delivery specific fields
  const [vehicleType, setVehicleType] = useState<'tempo' | 'truck' | 'refrigerated'>('tempo');
  const [vehicleNumber, setVehicleNumber] = useState('MH 15 GH 4821');
  const [operatingDistricts, setOperatingDistricts] = useState('Nashik, Pune, Thane');

  // Forgot password state
  const [forgotPhone, setForgotPhone] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = loginPhone.replace(/\s+/g, '');
    const found = users.find(
      (u) => u.phone.replace(/\s+/g, '') === cleanPhone || u.email.toLowerCase() === loginPhone.toLowerCase()
    );

    if (found) {
      setCurrentUser(found);
      showToast('success', 'Authentication Successful', `Welcome back, ${found.name}! Logged in as ${found.role.toUpperCase()}.`);
      if (found.role === 'farmer') navigate('/farmer');
      else if (found.role === 'buyer') navigate('/marketplace');
      else if (found.role === 'delivery') navigate('/logistics');
      else navigate('/admin');
    } else {
      showToast('error', 'Login Failed', 'No matching demo account found with this phone. Try quick role switcher in navbar or create a new account.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('warning', 'Missing Details', 'Please enter your name and phone number.');
      return;
    }

    const created = registerUser({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@khetisetu.in`,
      role: selectedRole,
      location: location || 'Taluka Center',
      district: district || 'Nashik',
      state: 'Maharashtra',
      farmName: selectedRole === 'farmer' ? farmName || `${name} Krishi Farm` : undefined,
      farmSizeAcres: selectedRole === 'farmer' ? farmSizeAcres : undefined,
      primaryCrops: selectedRole === 'farmer' ? primaryCrops.split(',').map((c) => c.trim()) : undefined,
      businessName: selectedRole === 'buyer' ? businessName || `${name} Agro Trading` : undefined,
      buyerType: selectedRole === 'buyer' ? buyerType : undefined,
      vehicleType: selectedRole === 'delivery' ? vehicleType : undefined,
      vehicleNumber: selectedRole === 'delivery' ? vehicleNumber : undefined,
      operatingDistricts: selectedRole === 'delivery' ? operatingDistricts.split(',').map((d) => d.trim()) : undefined,
    });

    if (created.role === 'farmer') navigate('/farmer');
    else if (created.role === 'buyer') navigate('/marketplace');
    else navigate('/logistics');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPhone.trim()) {
      showToast('warning', 'Phone Required', 'Please enter your registered mobile number.');
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(code);
    setAuthMode('reset');
    showToast('info', 'Simulated SMS Sent', `Demonstration OTP: ${code} sent to ${forgotPhone}.`);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp !== simulatedOtp && enteredOtp !== '123456') {
      showToast('error', 'Invalid Code', 'The verification code does not match.');
      return;
    }
    showToast('success', 'Password Updated', 'Your credentials have been securely updated in local storage.');
    setAuthMode('login');
  };

  return (
    <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', padding: '48px 0 80px 0' }}>
      <div className="app-container" style={{ maxWidth: '640px' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              margin: '0 auto 16px auto',
            }}
          >
            <Sprout size={30} />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>KhetiSetu Portal Access</h1>
          <p style={{ fontSize: '0.925rem' }}>
            Direct agricultural trade infrastructure linking cultivators, wholesale merchants, and carriers.
          </p>
        </div>

        {/* Clear Demonstration Warning */}
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: '#23221c',
            color: '#f6ecd7',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <ShieldCheck size={18} color="#fdd2aa" style={{ flexShrink: 0 }} />
          <span>
            <strong>Simulated Authentication:</strong> Safe local testing mode. No private keys, passwords, or government documents are transferred or exposed.
          </span>
        </div>

        <div className="card" style={{ padding: '32px', backgroundColor: 'var(--color-surface-lowest)' }}>
          {/* Top Auth Mode Tabs */}
          {(authMode === 'login' || authMode === 'signup') && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                padding: '4px',
                backgroundColor: 'var(--color-surface-low)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '24px',
              }}
            >
              <button
                onClick={() => setAuthMode('login')}
                className="btn btn-sm"
                style={{
                  backgroundColor: authMode === 'login' ? 'var(--color-surface-lowest)' : 'transparent',
                  color: authMode === 'login' ? 'var(--color-primary)' : 'var(--color-on-surface-muted)',
                  fontWeight: authMode === 'login' ? 700 : 500,
                  boxShadow: authMode === 'login' ? 'var(--shadow-soil-sm)' : 'none',
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className="btn btn-sm"
                style={{
                  backgroundColor: authMode === 'signup' ? 'var(--color-surface-lowest)' : 'transparent',
                  color: authMode === 'signup' ? 'var(--color-primary)' : 'var(--color-on-surface-muted)',
                  fontWeight: authMode === 'signup' ? 700 : 500,
                  boxShadow: authMode === 'signup' ? 'var(--shadow-soil-sm)' : 'none',
                }}
              >
                Register New Account
              </button>
            </div>
          )}

          {/* 1. LOGIN FORM */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Phone Number or Registered Email</label>
                <div style={{ position: 'relative' }}>
                  <Phone
                    size={16}
                    color="var(--color-on-surface-muted)"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="text"
                    required
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="+91 98220 14829"
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', textDecoration: 'underline' }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    color="var(--color-on-surface-muted)"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="password"
                    required
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '8px' }}>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </button>

              {/* Demo Quick Logins */}
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--color-border-subtle)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-muted)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
                  Or One-Click Demo Role Accounts
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginPhone('+91 98220 14829');
                      showToast('info', 'Farmer Selected', 'Ramesh Patil phone filled.');
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.78rem', background: 'var(--color-surface-low)' }}
                  >
                    Farmer Ramesh
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginPhone('+91 98190 44211');
                      showToast('info', 'Buyer Selected', 'Anand Agrawal phone filled.');
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.78rem', background: 'var(--color-surface-low)' }}
                  >
                    Buyer Anand
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginPhone('+91 97632 99182');
                      showToast('info', 'Delivery Selected', 'Sachin Jadhav phone filled.');
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.78rem', background: 'var(--color-surface-low)' }}
                  >
                    Delivery Sachin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginPhone('admin@khetisetu.gov.in');
                      showToast('info', 'Admin Selected', 'Platform Admin email filled.');
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.78rem', background: 'var(--color-surface-low)' }}
                  >
                    Platform Admin
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* 2. SIGNUP FORM */}
          {authMode === 'signup' && (
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Role Selection Tabs */}
              <div>
                <label className="form-label" style={{ marginBottom: '8px' }}>
                  Select Your Platform Role *
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedRole('farmer')}
                    style={{
                      padding: '12px 8px',
                      borderRadius: 'var(--radius-md)',
                      border:
                        selectedRole === 'farmer'
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border-subtle)',
                      backgroundColor:
                        selectedRole === 'farmer'
                          ? 'var(--color-surface-container)'
                          : 'var(--color-surface-low)',
                      textAlign: 'center',
                    }}
                  >
                    <Sprout size={20} color="var(--color-primary)" style={{ margin: '0 auto 4px auto' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Farmer</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-muted)' }}>Grower / FPO</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('buyer')}
                    style={{
                      padding: '12px 8px',
                      borderRadius: 'var(--radius-md)',
                      border:
                        selectedRole === 'buyer'
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border-subtle)',
                      backgroundColor:
                        selectedRole === 'buyer'
                          ? 'var(--color-surface-container)'
                          : 'var(--color-surface-low)',
                      textAlign: 'center',
                    }}
                  >
                    <ShoppingBag size={20} color="var(--color-secondary)" style={{ margin: '0 auto 4px auto' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Buyer</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-muted)' }}>Wholesale / Retail</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('delivery')}
                    style={{
                      padding: '12px 8px',
                      borderRadius: 'var(--radius-md)',
                      border:
                        selectedRole === 'delivery'
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border-subtle)',
                      backgroundColor:
                        selectedRole === 'delivery'
                          ? 'var(--color-surface-container)'
                          : 'var(--color-surface-low)',
                      textAlign: 'center',
                    }}
                  >
                    <Truck size={20} color="var(--color-terracotta)" style={{ margin: '0 auto 4px auto' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Delivery</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-on-surface-muted)' }}>Fleet / Hauler</div>
                  </button>
                </div>
              </div>

              {/* Common Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dnyaneshwar Shinde"
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 94220 00000"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Village / Taluka Location</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Niphad"
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">District (Maharashtra)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Nashik"
                  />
                </div>
              </div>

              {/* ROLE SPECIFIC FIELDS */}

              {/* Farmer Specific */}
              {selectedRole === 'farmer' && (
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--color-surface-low)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                    Farm Holding Details
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="form-label">Farm / Krishi Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={farmName}
                        onChange={(e) => setFarmName(e.target.value)}
                        placeholder="e.g. Shinde Agro Farms"
                      />
                    </div>
                    <div>
                      <label className="form-label">Total Land Holding (Acres)</label>
                      <input
                        type="number"
                        min={0.5}
                        step={0.5}
                        className="form-input"
                        value={farmSizeAcres}
                        onChange={(e) => setFarmSizeAcres(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Primary Crops Grown</label>
                    <input
                      type="text"
                      className="form-input"
                      value={primaryCrops}
                      onChange={(e) => setPrimaryCrops(e.target.value)}
                      placeholder="e.g. Onion, Pomegranate, Wheat"
                    />
                  </div>
                </div>
              )}

              {/* Buyer Specific */}
              {selectedRole === 'buyer' && (
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--color-surface-low)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-secondary)' }}>
                    Buyer Business Information
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="form-label">Business / Firm Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Vashi Fresh Trading Co."
                      />
                    </div>
                    <div>
                      <label className="form-label">Procurement Type</label>
                      <select
                        className="form-select"
                        value={buyerType}
                        onChange={(e) => setBuyerType(e.target.value as any)}
                      >
                        <option value="wholesale">APMC Wholesale Trader</option>
                        <option value="retailer">Supermarket / Retail Chain</option>
                        <option value="processor">Food Processing Unit</option>
                        <option value="restaurant">Hotel / Commercial Kitchen</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Specific */}
              {selectedRole === 'delivery' && (
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--color-surface-low)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-terracotta)' }}>
                    Commercial Logistics Details
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="form-label">Commercial Vehicle Type</label>
                      <select
                        className="form-select"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value as any)}
                      >
                        <option value="tempo">1.5T to 3T Tempo (Bolero Maxi Truck / Tata Ace)</option>
                        <option value="truck">14ft to 19ft Container Truck</option>
                        <option value="refrigerated">Insulated Reefer Van</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Vehicle Registration No.</label>
                      <input
                        type="text"
                        className="form-input"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        placeholder="MH 15 XX 1234"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Operating Service Corridors</label>
                    <input
                      type="text"
                      className="form-input"
                      value={operatingDistricts}
                      onChange={(e) => setOperatingDistricts(e.target.value)}
                      placeholder="e.g. Nashik, Thane, Mumbai, Pune"
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '6px' }}>
                Complete Registration
              </button>
            </form>
          )}

          {/* 3. FORGOT PASSWORD */}
          {authMode === 'forgot' && (
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Reset Security Credentials</h3>
              <p style={{ fontSize: '0.875rem' }}>
                Enter your mobile number to receive a simulated one-time authentication code.
              </p>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Registered Mobile Number</label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value)}
                  placeholder="+91 98220 14829"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Simulated Reset Code
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="btn btn-ghost btn-sm"
                style={{ alignSelf: 'center', color: 'var(--color-on-surface-muted)' }}
              >
                Back to Sign In
              </button>
            </form>
          )}

          {/* 4. RESET PASSWORD WITH OTP */}
          {authMode === 'reset' && (
            <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Enter Verification Code</h3>
              <div style={{ padding: '10px 14px', background: 'var(--color-surface-container)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                Simulated SMS Code sent: <strong>{simulatedOtp || '492810'}</strong>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">6-Digit Verification Code</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  required
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Verify Code & Set Password
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="btn btn-ghost btn-sm"
                style={{ alignSelf: 'center', color: 'var(--color-on-surface-muted)' }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
