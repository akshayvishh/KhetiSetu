import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let IconComponent = Info;
        let iconColor = 'var(--color-info)';

        if (toast.type === 'success') {
          IconComponent = CheckCircle2;
          iconColor = 'var(--color-success)';
        } else if (toast.type === 'warning') {
          IconComponent = AlertTriangle;
          iconColor = 'var(--color-warning)';
        } else if (toast.type === 'error') {
          IconComponent = AlertCircle;
          iconColor = 'var(--color-error)';
        }

        return (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <IconComponent size={20} color={iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-primary)' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="btn btn-ghost"
              style={{ padding: '2px', color: 'var(--color-on-surface-muted)' }}
              aria-label="Dismiss toast"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
