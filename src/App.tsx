import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { SimulatedBanner } from './components/common/SimulatedBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';

import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { FarmerDashboardPage } from './pages/FarmerDashboardPage';
import { LogisticsPage } from './pages/LogisticsPage';
import { JobsPage } from './pages/JobsPage';
import { AdminPage } from './pages/AdminPage';
import { AuthPage } from './pages/AuthPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Top Demo Simulation Banner */}
          <SimulatedBanner />

          {/* Main Navigation */}
          <Navbar />

          {/* Content Pages */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/farmer" element={<FarmerDashboardPage />} />
              <Route path="/logistics" element={<LogisticsPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Editorial Footer */}
          <Footer />

          {/* Toast Notification Container */}
          <Toast />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
