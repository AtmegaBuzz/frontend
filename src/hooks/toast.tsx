// components/ui/toast.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'danger' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  dismissed?: boolean; // Added dismissed property
}

interface ToastContextType {
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, 'id' | 'dismissed'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = ({ type, message, duration = 3000 }: Omit<ToastProps, 'id' | 'dismissed'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, duration, dismissed: false }]);
  };

  const dismiss = (id: string) => {
    setToasts((prev) => 
      prev.map(toast => 
        toast.id === id 
          ? { ...toast, dismissed: true }
          : toast
      )
    );
    
    // Remove from state after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 500);
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

// Individual Toast component
function ToastItem({ toast, onDismiss }: { toast: ToastProps; onDismiss: () => void }) {
  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        onDismiss();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onDismiss]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          iconColor: 'text-green-500',
          bgColor: 'bg-green-100',
          darkBgColor: 'dark:bg-green-800',
          darkTextColor: 'dark:text-green-200'
        };
      case 'danger':
        return {
          iconColor: 'text-red-500',
          bgColor: 'bg-red-100',
          darkBgColor: 'dark:bg-red-800',
          darkTextColor: 'dark:text-red-200'
        };
      case 'warning':
        return {
          iconColor: 'text-orange-500',
          bgColor: 'bg-orange-100',
          darkBgColor: 'dark:bg-orange-700',
          darkTextColor: 'dark:text-orange-200'
        };
      case 'info':
        return {
          iconColor: 'text-blue-500',
          bgColor: 'bg-blue-100',
          darkBgColor: 'dark:bg-blue-800',
          darkTextColor: 'dark:text-blue-200'
        };
    }
  };

  const getToastIcon = () => {
    const styles = getToastStyles();
    
    switch (toast.type) {
      case 'success':
        return (
          <div className={`inline-flex items-center justify-center shrink-0 w-8 h-8 ${styles.iconColor} ${styles.bgColor} rounded-lg ${styles.darkBgColor} ${styles.darkTextColor}`}>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span className="sr-only">Success icon</span>
          </div>
        );
      case 'danger':
        return (
          <div className={`inline-flex items-center justify-center shrink-0 w-8 h-8 ${styles.iconColor} ${styles.bgColor} rounded-lg ${styles.darkBgColor} ${styles.darkTextColor}`}>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
        );
      case 'warning':
        return (
          <div className={`inline-flex items-center justify-center shrink-0 w-8 h-8 ${styles.iconColor} ${styles.bgColor} rounded-lg ${styles.darkBgColor} ${styles.darkTextColor}`}>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>
            <span className="sr-only">Warning icon</span>
          </div>
        );
      case 'info':
        return (
          <div className={`inline-flex items-center justify-center shrink-0 w-8 h-8 ${styles.iconColor} ${styles.bgColor} rounded-lg ${styles.darkBgColor} ${styles.darkTextColor}`}>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>
            <span className="sr-only">Info icon</span>
          </div>
        );
    }
  };

  return (
    <div 
      className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 transform transition-all duration-500 ease-in-out ${toast.dismissed ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
      role="alert"
    >
      {getToastIcon()}
      <div className="ms-3 text-sm font-normal">{toast.message}</div>
      <button 
        type="button" 
        onClick={onDismiss}
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  );
}

// Toaster component to render all active toasts
function Toaster() {
  const { toasts, dismiss } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {toasts.map((toast) => (
        <ToastItem 
          key={toast.id} 
          toast={toast} 
          onDismiss={() => dismiss(toast.id)} 
        />
      ))}
    </div>,
    document.body
  );
}