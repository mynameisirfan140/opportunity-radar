```tsx
import React from 'react';
import './Toast.css';

type ToastType = 'success' | 'error' | 'loading';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose?: () => void;
}

/**
 * Reusable toast component.
 * - `message` – text to display.
 * - `type` – 'success' | 'error' | 'loading'.
 * - `onClose` – optional callback when the toast is dismissed.
 */
const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  // Auto‑close loading toast after 3 seconds
  React.useEffect(() => {
    if (type === 'loading') {
      const timer = setTimeout(() => onClose?.(), 3000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  const style: React.CSSProperties = {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 1000,
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    color: '#fff',
    minWidth: '200px',
    animation: 'slideIn 0.3s ease-out forwards',
  };

  const typeStyle: React.CSSProperties = {
    success: {
      backgroundColor: '#28a745',
    },
    error: {
      backgroundColor: '#dc3545',
    },
    loading: {
      backgroundColor: '#17a2b8,
      opacity: 0.9,
    },
  };

  return (
    <div style={{ ...style, ...typeStyle[type] }} role="alert" aria-live="polite">
      {message}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            marginLeft: '0.5rem',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
          aria-label="Close toast"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Toast;
```